import {$isTruthy} from './utils.js'
import {_$} from './ancui-core.js'

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
  Adds a new rendering element to the pipeline.
  A rendering element is the tuple of visuals and related effects
  that will be applied to the visuals.
  @function updatePipeline

  @param {Object} visuals - An object that consists has the shape {svgNodes:[], $data: {...}}.
  @param {Array} effects - An array of effects that will be appled to the visuals
*/
__$visuals.updatePipeline = function(visuals, effects) {
  this.currentContainer.pipleline.push({
    visuals: visuals,
    effects: effects
  });
}

/**
  Defines a callback that is called after rendering is completed.
  @function onRenderCompleted
*/
__$visuals.onRenderCompleted = function(callback) {
  __$visuals.currentContainer.__postRenderCallback = callback;

  return this;
}

/**
  @function __renderPipleline
  Internal function used to actually render a pipleline.
*/
function __renderPipleline(pipleline) {
  pipleline.forEach(({visuals,effects}) => {
    for (let effect of effects) {
      effect.action(visuals)
    }
  });
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
