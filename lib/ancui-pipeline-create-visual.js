import {
    $isTruthy,
    copyProps
} from "./utils"

const bindIntentsActions = (visual) => {
    const intents = {
        __intents: null,

        getIntents() {
            return this.__intents;
        },

        withIntents(newIntents) {
            this.__intents = newIntents;
            return this;
        },

        applyIntents(intents) {
            if (this.svgNodes.length == 0) {
                return;
            }

            if (intents === undefined || intents === null) {
                intents = this.__intents;
            }

            for (let intent of intents) {
                intent.action(this);
            }
        }
    }

    copyProps(intents, visual);
}

const bindShapeActions = (visual) => {
    const shapes = {
        /* Used to store the shapes that are created */
        svgNodes: [],

        /* The callback must be of the form callback(container) */
        __createSVGShapeCallback: null,

        /* Callback that is used determine how shapes are create */
        __createShapesCallback: null,

        __saveSVGShape(svgShape) {
            this.svgNodes.push(svgShape);
        },

        __saveSVGShapeData(svgShape, dataIndex, dataValue, rawDataValue) {
            svgShape._dataValue = dataValue;
            svgShape._rawDataValue = rawDataValue;
            svgShape._dataIndex = dataIndex;
            svgShape._dataProperty = visual.__data.target;
        },

        __defaultMultipleShapesCreator() {
            this.__data.activeDataItems().forEach((d, index) => {
                let svgShape = this.__createSVGShapeCallback(visual.container);
                this.__saveSVGShape(svgShape);
                this.__saveSVGShapeData(svgShape, index, d, this.__data.rawDataItem(index));
            });
        },

        __defaultSingleShapeCreator() {
            let svgShape = this.__createSVGShapeCallback(visual.container);
            this.__saveSVGShape(svgShape);
        },

        createShapes() {
            this.svgNodes = [];
            this.__createShapesCallback(this);
        },

        /* The callback that will be used to create the actual shape.
         * The function will be called as callback(container) */
        withSVGShapeCreator(callback) {
            if (typeof callback !== 'function') {
                throw new Error('Invalid callback parameter.' +
                    'The callback must be of the form callback(container)')
            }

            this.__createSVGShapeCallback = callback;
            return this;
        },

        removeExistingShapes() {
            this.svgNodes.forEach(shape => {
                shape.remove();
            });
        }
    }

    copyProps(shapes, visual);
}

export default function __createVisual() {
    const visual = {
        // __$visuals: __$visuals,
        container: null,
        // __isSingularVisual: false, // This visual will not have several visual.
        __totalVisualsCreated: 0,
        __data: null,

        applyContainer(newContainer) {
            this.container = newContainer;
        },

        withData(newData) {
            /* TODO: Add test to check that the event handlers are wired */
            this.__data = newData;
            if ($isTruthy(this.__data)) {
                this.__data.withDataChangedCallback(() => this.onDataDidChange());
            }
            return this;
        },

        onDataDidChange() {
            this.removeExistingShapes();
            this.createShapes();
            this.applyIntents();
        },

        /**
         * Creates and adds the newly created visual to the pipeline.
         *
         * @param {Array} intents - an array of intents
         * @param {Function} callback - used to create the actual shape. The function
         *  will be called as callback(container)
         *
         * @return {Object} the newly created visual
         */
        registerVisual(intents, callback) {
            this.__isSingularVisual = false;
            this.withIntents(intents);
            this.withSVGShapeCreator(callback);

            return this;
        },

        /**
         * Sets the callback that will be used to control how rendering happens
         * for a particular visuals
         *
         * @param {Function} callback - the render. Typically this will be something
         * that has a functionality similar to __defaultMultipleShapesCreator
         *
         * @return {Object} the newly created visual
         */
        withCreateShapesCallback(callback) {
            this.__createShapesCallback = callback;

            return this;
        }
    };

    bindIntentsActions(visual)
    bindShapeActions(visual)

    visual.withCreateShapesCallback(visual.__defaultMultipleShapesCreator);

    return visual;
};