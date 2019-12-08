import {
    $isTruthy,
} from "../utils"

export function createVisual() {
    const visual = {
        container: null,
        // __isSingularVisual: false, // This visual will not have several visual.
        __totalVisualsCreated: 0,
        __data: null,

        __intents: null,

        /* Used to store the shapes that are created */
        svgNodes: [],
        /* The callback must be of the form callback(container) */
        __createSVGShapeCallback: null,
        /* Callback that is used determine how shapes are create */
        __createShapesCallback: null,
    };
    visual.getData = () => getData(visual);
    visual.getDataTarget = () => getDataTarget(visual);
    visual.getIntents = () => getIntents(visual);

    visual.setContainer = newContainer => setContainer(visual, newContainer);
    visual.withData = newData => withData(visual, newData);
    visual.onDataDidChange = () => onDataDidChange(visual);
    visual.registerVisual = (intents, callback) => registerVisual(visual, intents, callback);
    visual.withCreateShapesCallback = (callback) => withCreateShapesCallback(visual, callback);

    visual.withIntents = newIntents => withIntents(visual, newIntents);
    visual.applyIntents = intents => applyIntents(visual, intents);

    visual.__saveSVGShape = svgShape => __saveSVGShape(visual, svgShape);
    visual.__saveSVGShapeData = (svgShape, dataIndex, dataValue, rawDataValue) => __saveSVGShapeData(visual, svgShape, dataIndex, dataValue, rawDataValue);
    visual.__defaultMultipleShapesCreator = () => __defaultMultipleShapesCreator(visual);
    visual.__defaultSingleShapeCreator = () => __defaultSingleShapeCreator(visual);
    visual.createShapes = () => createShapes(visual);
    visual.withSVGShapeCreator = callback => withSVGShapeCreator(visual, callback);
    visual.removeExistingShapes = () => removeExistingShapes(visual);

    visual.withCreateShapesCallback(visual.__defaultMultipleShapesCreator);

    return visual;
};

function getData(visual) {
    return visual.__data;
}

function getDataTarget(visual) {
    if (visual.__data == null) {
        return null;
    }
    return visual.__data.target
}

function getIntents(visual) {
    return visual.__intents;
}

function setContainer(visual, newContainer) {
    visual.container = newContainer;
}

function withData(visual, newData) {
    /* TODO: Add test to check that the event handlers are wired */
    visual.__data = newData;
    if ($isTruthy(visual.__data)) {
        visual.__data.withDataChangedCallback(() => visual.onDataDidChange());
    }

    return visual;
}

function onDataDidChange(visual) {
    visual.removeExistingShapes();
    visual.createShapes();
    visual.applyIntents();
}

/**
 * Creates and adds the newly created visual to the pipeline.
 *
 * @param {Object} visual - the visual object
 * @param {Array} intents - an array of intents
 * @param {Function} callback - used to create the actual shape. The function
 *  will be called as callback(container)
 *
 * @return {Object} the newly created visual
 */
function registerVisual(visual, intents, callback) {
    visual.__isSingularVisual = false;
    visual.withIntents(intents);
    visual.withSVGShapeCreator(callback);

    return visual;
}

/**
 * Sets the callback that will be used to control how rendering happens
 * for a particular visuals
 *
 * @param {Object} visual - the visual object
 * @param {Function} callback - the render. Typically this will be something
 * that has a functionality similar to __defaultMultipleShapesCreator
 *
 * @return {Object} the newly created visual
 */
function withCreateShapesCallback(visual, callback) {
    visual.__createShapesCallback = callback;

    return visual;
}

function withIntents(visual, newIntents) {
    visual.__intents = newIntents;

    return visual;
}

function applyIntents(visual, intents) {
    if (visual.svgNodes.length == 0) {
        return;
    }

    if (intents === undefined || intents === null) {
        intents = visual.__intents;
    }

    for (let intent of intents) {
        intent.action(visual);
    }
}

function __saveSVGShape(visual, svgShape) {
    visual.svgNodes.push(svgShape);
}

function __saveSVGShapeData(visual, svgShape, dataIndex, dataValue, rawDataValue) {
    svgShape.bindData({
        dataValue,
        rawDataValue,
        dataIndex,
        target: visual.getDataTarget()
    });
}

function __defaultMultipleShapesCreator(visual) {
    const data = visual.getData();

    data.activeDataItems().forEach((d, index) => {
        const rawDataItem = data.rawDataItem(index);
        let svgShape = visual.__createSVGShapeCallback(visual.container);

        visual.__saveSVGShape(svgShape);
        visual.__saveSVGShapeData(svgShape, index, d, rawDataItem);
    });
}

function __defaultSingleShapeCreator(visual) {
    let svgShape = visual.__createSVGShapeCallback(visual.container);
    visual.__saveSVGShape(svgShape);
}

function createShapes(visual) {
    visual.svgNodes = [];
    visual.__createShapesCallback(visual);
}

/* The callback that will be used to create the actual shape.
 * The function will be called as callback(container) */
function withSVGShapeCreator(visual, callback) {
    if (typeof callback !== 'function') {
        throw new Error('Invalid callback parameter.' +
            'The callback must be of the form callback(container)')
    }

    visual.__createSVGShapeCallback = callback;

    return visual;
}

function removeExistingShapes(visual) {
    visual.svgNodes.forEach(shape => {
        shape.remove();
    });
}