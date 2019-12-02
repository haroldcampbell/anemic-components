import {
  $isTruthy
} from './utils.js'
import {
  _$,
  // $id,
} from './ancui-core.js'
import __createVisual from './ancui-pipeline-create-visual.js'

/**
 * @param {Object} currentNode
 * @return {Object} Returns an object {x, y, width, height}
 */
export function containerBoundingBox(currentNode) {
  return currentNode.currentContainer.getBBox();
}

// const getCurrentContainer = function () {
//   return this.currentContainer;
// }

export const createVisual = function () {
  let visual = __createVisual();

  // __$visuals.updatePipeline(visual);

  return visual;
}

const __addVisuals = function (__$visuals, visualsArray) {
  visualsArray.forEach(visual => {
    visual.applyContainer(__$visuals.currentContainer)
    __$visuals.currentContainer.pipeline.push(visual);
    // __$visuals.updatePipeline(visual);
  });
}

// /**
//   Adds a new rendering element to the pipeline.
//   A rendering element is the tuple of visual and related effects
//   that will be applied to the shapes that make up the visual.
//   @function updatePipeline

//   @param {Object} visual - An object that has the shapes {svgNodes:[], __data: {...}}.
// */
// const __updatePipeline = function (__$visuals, visual) {
//     visual.applyContainer(__$visuals.currentContainer)
//   __$visuals.currentContainer.pipeline.push(visual);
// }

/**
  Internal function used to actually render a pipeline.

  @function __renderPipeline
  @param {Object} pipeline
*/
function __renderPipeline(pipeline) {
  pipeline.forEach((visual) => {
    visual.createShapes();
    visual.applyIntents(); // defined in ancui-pipeline-create-visual.js
  });
}

/**
  Defines a callback that is called after rendering is completed.
  @function onRenderCompleted
  @param {callback} callback
  @return {object}
*/
// console.log(">>", this)
const onRenderCompleted = function (__$visuals, callback) {
  __$visuals.currentContainer.__postRenderCallback = callback;

  return __$visuals;
}

// /**
//   Returns the internal visuals object
//   @function getVisuals
//   @return {Object} the __$visuals object
// */
// export function getVisuals() {
//   return __$visuals;
// }

// export function removeChildNodes(parentElementId) {
//   let targetNodes = [];
//   let parent = $id(parentElementId)

//   Object.keys(__$visuals.nodes).forEach(id => {
//     const node = __$visuals.nodes[id];
//     const result = parent.contains(node);

//     if (result) {
//       targetNodes.push(id)
//     }
//   })

//   targetNodes.forEach(id => {
//     delete __$visuals.nodes[id];
//   });

//   while (parent.firstChild) {
//     parent.firstChild.remove();
//   }

//   return __$visuals;
// }

/**
  Creates a container that contains the visuals defined in the block.
  @function container
  @param {string} id - The id of the container.
  @param {Callback} callback -
  @param {Node} parentElm -

  @return {Object}
*/
export function container(id, callback, parentElm) {
  let __$visuals = {
    name: "visuals",
    nodes: {},
    currentContainer: null,
    __postRenderCallback: null,
    // createVisual,
    addVisuals: null, // Defined below
    // updatePipeline: null, // Defined below
    onRenderCompleted,
  };

  if ($isTruthy(__$visuals.nodes[id])) {
    __$visuals.currentContainer = __$visuals.nodes[id];

    return __$visuals;
  }

  __$visuals.addVisuals = (visualArray) => {
    return __addVisuals(__$visuals, visualArray);
  };

  // __$visuals.updatePipeline = (visual) => {
  //   return __updatePipeline(__$visuals, visual);
  // };


  let pipeline = [];
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
  __$visuals.currentContainer.pipeline = pipeline;

  if ($isTruthy(callback)) {
    callback(__$visuals);
  }

  __renderPipeline(pipeline);

  if ($isTruthy(__$visuals.currentContainer.__postRenderCallback)) {
    __$visuals.currentContainer.__postRenderCallback();
  }

  __$visuals.currentContainer = null;

  return __$visuals;
}