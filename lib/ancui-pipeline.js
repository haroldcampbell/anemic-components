import {
  $isTruthy
} from './utils'

import {
  _$,
  $svgNode,
} from './ancui-dom'

/**
 * @param {Object} currentNode
 * @return {Object} Returns an object {x, y, width, height}
 */
export function containerBoundingBox(currentNode) {
  return currentNode.currentContainer.getBBox();
}

/**
 * Creates a container that contains the visuals defined in the block.
 *
 * @function container
 *
 * @param {string} id - The id of the container.
 * @param {Callback} visualsCallback -
 * @param {Node} parentElm -
 *
 * @return {Object}
 */
export function container(id, visualsCallback, parentElm) {
  const domContainer = $svgNode("svg", parentElm);

  domContainer.$id(id);
  domContainer.containerName = `context[${id}]`
  domContainer.$height = _$._height(domContainer);
  domContainer.$width = _$._width(domContainer);
  domContainer.visuals = [];

  domContainer.addVisuals = (visualArray) => {
    __addVisuals(domContainer, visualArray);
  };

  domContainer.onRenderCompleted = (callback) => {
    __onRenderCompleted(domContainer, callback);
  };

  if ($isTruthy(visualsCallback)) {
    visualsCallback(domContainer);
  }

  __renderVisuals(domContainer.visuals);
  __raiseRenderCompletedEvent(domContainer);

  return domContainer;
}

const __addVisuals = function (domContainer, visualsArray) {
  visualsArray.forEach(visual => {
    visual.setContainer(domContainer)
    domContainer.visuals.push(visual);
  });
}

/**
 * Internal function used to actually render all of the visuals that were added.
 *
 * @function __renderVisuals
 *
 * @param {Array} visuals
 */
function __renderVisuals(visuals) {
  visuals.forEach((visual) => {
    visual.createShapes();
    visual.applyIntents();
  });
}

/**
 * Raises the renderCompleted callback.
 *
 * This method will be called after the renderVisual method
 *
 * @function __raiseRenderCompletedEvent
 *
 * @param {Object} domContainer
 * @param {callback} callback
 */
function __raiseRenderCompletedEvent(domContainer) {
  if ($isTruthy(domContainer.__postRenderCallback)) {
    domContainer.__postRenderCallback();
  }
}

/**
 * Defines a callback that is called after rendering is completed.
 *
 * @function __onRenderCompleted
 *
 * @param {Object} domContainer
 * @param {callback} callback
 */
function __onRenderCompleted(domContainer, callback) {
  domContainer.__postRenderCallback = callback;
}