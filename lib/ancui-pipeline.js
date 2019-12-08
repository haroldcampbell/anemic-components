import {
  $isTruthy
} from './utils'
import {
  _$,
  $svgNode,
} from './ancui-dom'
// import __createVisual from './ancui-pipeline-create-visual'

/**
 * @param {Object} currentNode
 * @return {Object} Returns an object {x, y, width, height}
 */
export function containerBoundingBox(currentNode) {
  return currentNode.currentContainer.getBBox();
}

/**
  Creates a container that contains the visuals defined in the block.

  @function container

  @param {string} id - The id of the container.
  @param {Callback} visualsCallback -
  @param {Node} parentElm -

  @return {Object}
*/
export function container(id, visualsCallback, parentElm) {
  let __$visuals = {
    name: "visuals",
    nodes: {},
    currentContainer: null,
    __postRenderCallback: null,
    addVisuals: null, // Defined below
    onRenderCompleted,
  };

  if ($isTruthy(__$visuals.nodes[id])) {
    __$visuals.currentContainer = __$visuals.nodes[id];

    return __$visuals;
  }

  __$visuals.addVisuals = (visualArray) => {
    return __addVisuals(__$visuals, visualArray);
  };

  let pipeline = [];
  const node = $svgNode("svg", parentElm);

  node.$height = _$._height(node);
  node.$width = _$._width(node);
  node.$id(id);

  __$visuals.nodes[id] = node;
  __$visuals.currentContainer = node;
  __$visuals.currentContainer.pipeline = pipeline;

  if ($isTruthy(visualsCallback)) {
    visualsCallback(__$visuals);
  }

  __renderPipeline(pipeline);

  if ($isTruthy(__$visuals.currentContainer.__postRenderCallback)) {
    __$visuals.currentContainer.__postRenderCallback();
  }

  __$visuals.currentContainer = null;

  return __$visuals;
}

const __addVisuals = function (__$visuals, visualsArray) {
  visualsArray.forEach(visual => {
    visual.applyContainer(__$visuals.currentContainer)
    __$visuals.currentContainer.pipeline.push(visual);
  });
}

/**
  Internal function used to actually render a pipeline.

  @function __renderPipeline
  @param {Object} pipeline
*/
function __renderPipeline(pipeline) {
  pipeline.forEach((visual) => {
    visual.createShapes();
    visual.applyIntents();
  });
}

/**
  Defines a callback that is called after rendering is completed.
  @function onRenderCompleted

  @param {Object} __$visuals
  @param {callback} callback

  @return {object}
*/
const onRenderCompleted = function (__$visuals, callback) {
  __$visuals.currentContainer.__postRenderCallback = callback;

  return __$visuals;
}

