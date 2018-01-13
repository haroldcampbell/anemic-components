import {
  $isTruthy
} from './utils.js'
import {
  _$
} from './ancui-core.js'
import
  __createVisual
 from './ancui-create-visual.js'

let __$visuals = {
  name: "visuals",
  nodes: {},
  currentContainer: null,
  __postRenderCallback: null,
  getCurrentContainer() {
    return this.currentContainer;
  },
};

/**
 * Creates and adds the newly created visual to the pipeline.
 *
 * @param {Object} data - a $data object
 * @param {Array} intents - an array of intents
 * @param {Function} callback - used to create the actual shape. The function
 *  will be called as callback(container)
 *
 * @return {Object} the newly created visual
 */
__$visuals.registerVisual = function (data, intents, callback) {
  let visual = __createVisual(this, this.currentContainer);

  visual.withData(data);
  visual.withIntents(intents);
  visual.withSVGShapeCreator(callback);

  this.updatePipeline(visual);

  return visual;
}

/**
  Adds a new rendering element to the pipeline.
  A rendering element is the tuple of visual and related effects
  that will be applied to the shapes that make up the visual.
  @function updatePipeline

  @param {Object} visual - An object that has the shapes {svgNodes:[], __data: {...}}.
*/
__$visuals.updatePipeline = function (visual) {
  this.currentContainer.pipleline.push(visual);
}

/**
  Internal function used to actually render a pipleline.

  @function __renderPipleline
*/
function __renderPipleline(pipleline) {
  pipleline.forEach((visual) => {
    visual.createShapes();
    visual.applyIntents();
  });
}

/**
  Defines a callback that is called after rendering is completed.
  @function onRenderCompleted
*/
__$visuals.onRenderCompleted = function (callback) {
  __$visuals.currentContainer.__postRenderCallback = callback;

  return this;
}

/**
  Returns the internal visuals object
  @function getVisuals
  @return {Object} the __$visuals object
*/
export function getVisuals() {
  return __$visuals;
}

/**
  Creates a container that contains the visuals defined in the block.
  @function container
  @param {string} id - The id of the container.
  @param {Callback} callback -
  @param {Node} parentElm -
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
    callback(__$visuals);
  }

  __renderPipleline(pipleline);

  if ($isTruthy(__$visuals.currentContainer.__postRenderCallback)) {
    __$visuals.currentContainer.__postRenderCallback();
  }

  __$visuals.currentContainer = null;

  return __$visuals;
}