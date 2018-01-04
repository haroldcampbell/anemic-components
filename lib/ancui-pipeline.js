import {
  $isTruthy
} from './utils.js'
import {
  _$,
  getIntents
} from './ancui-core.js'

let __intents = getIntents();

export function __createVisual(__$visuals, currentContainer) {
  return {
    svgNodes: [],
    __$visuals: __$visuals,
    container: currentContainer,

    __data: null,
    withData(newData) {
      this.__data = newData;
      return this;
    },

    __intents: null,
    getEffects() {
      return this.__intents;
    },

    withIntents(intentsCallback) {
      if (!$isTruthy(intentsCallback)) {
        return this;
      }

      let localIntents = __intents.newIntents()
      intentsCallback(localIntents)

      this.__intents = localIntents.getIntents();

      return this;
    },

    __createSVGShapeCallabck: null, // Callback
    withSVGShapeCreator(newSVGShapeCreatorCallback) {
      this.__createSVGShapeCallabck = newSVGShapeCreatorCallback;
      return this;
    },

    __saveSVGShape(dataValue, visual) {
      visual._dataValue = dataValue;
      visual._dataProperty = this.__data.target;

      this.svgNodes.push(visual);
    },

    createShapes() {
      this.svgNodes = [];
      this.__data.asNormalized().forEach(d => {
        let svgShape = this.__createSVGShapeCallabck(this);
        this.__saveSVGShape(d, svgShape);
      });
    },

    removeExistingShapes() {
      this.svgNodes.forEach(s => {
        s.remove();
      });
    },

    applyIntents(intentsCallback) {
      let intentItems = this.__intents;

      if ($isTruthy(intentsCallback)) {
        let localIntents = __intents.newIntents()

        intentsCallback(localIntents)
        intentItems = localIntents.getIntents();
      }

      for (let intent of intentItems) {
        intent.action(this);
      }
    },

    onDataDidChange() {
      this.removeExistingShapes();
      this.createShapes();
      this.applyIntents();
    },

    visibleNode(numVisibleNodes) {

    },

    viewDataFrom(startIndex, visibleDataSet) {

    },
  }
};

let __$visuals = {
  name: "visuals",
  nodes: {},
  currentContainer: null,
  __postRenderCallback: null,
  getCurrentContainer() {
    return this.currentContainer;
  },
};

__$visuals.registerVisual = function (data, intentsCallback, callback) {
  let visual = __createVisual(this, this.currentContainer);

  visual.withSVGShapeCreator(callback);
  visual.withData(data);
  visual.withIntents(intentsCallback);

  this.updatePipeline(visual);

  return visual;
}

/**
 * Adds a new rendering element to the pipeline.
 * A rendering element is the tuple of visual and related effects
 * that will be applied to the shapes that make up the visual.
 *
 * @function updatePipeline
 * @param {Object} visual - An object that has the shapes {svgNodes:[], __data: {...}}.
 */
__$visuals.updatePipeline = function (visual) {
  this.currentContainer.pipleline.push(visual);
}

/**
 * Internal function used to actually render a pipleline.
 *
 * @function __renderPipleline
 * @param {Array} pipeline
 */
function __renderPipleline(pipeline) {
  pipeline.forEach((visual) => {
    visual.createShapes();
    visual.applyIntents();
  });
}

/**
 * Defines a callback that is called after rendering is completed.
 *
 * @function onRenderCompleted
 * @param {Callback} callback
 * @return {Object} the __$visuals object
 */
__$visuals.onRenderCompleted = function (callback) {
  __$visuals.currentContainer.__postRenderCallback = callback;

  return this;
}

/**
 * Returns the internal visuals object
 *
 * @function getVisuals
 * @return {Object} the __$visuals object
 */
export function getVisuals() {
  return __$visuals;
}

/**
 * Creates a container that contains the visuals defined in the block.
 *
 * @function container
 * @param {string} id - The id of the container.
 * @param {Callback} callback -
 * @param {Node} parentElm -
 * @return {Object} The __$visuals object that is a collection of visuals
 */
export function container(id, callback, parentElm) {
  if ($isTruthy(__$visuals.nodes[id])) {
    __$visuals.currentContainer = __$visuals.nodes[id];

    return __$visuals;
  }

  let pipleline = [];
  let node = document.createElementNS("http://www.w3.org/2000/svg", "svg");

  node.$id = _$._id(node);
  node.$class = _$._class(node);
  node.$style = _$._style(node);
  node.$height = _$._height(node);
  node.$width = _$._width(node);
  node.$attr = _$._attr(node);
  node.$id(id);

  if ($isTruthy(parentElm)) {
    parentElm.appendChild(node);
  } else {
    document.body.appendChild(node);
  }

  __$visuals.nodes[id] = node;
  __$visuals.currentContainer = node;
  __$visuals.currentContainer.pipleline = pipleline;

  if ($isTruthy(callback)) {
    window.$maxHeight = (x) => {}
    // var foo = callback.bind(window.ancui, __$visuals)
    // exportAll(foo)

    // foo();
    // this.apply()
    callback.call(window.ancui, __$visuals); // callback(__$visuals);
  }

  __renderPipleline(pipleline);

  if ($isTruthy(__$visuals.currentContainer.__postRenderCallback)) {
    __$visuals.currentContainer.__postRenderCallback();
  }

  __$visuals.currentContainer = null;

  return __$visuals;
}