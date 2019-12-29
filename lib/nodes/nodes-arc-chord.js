import {
  addArcShapeNode
} from "./nodes-utils"

/**
 * Creates an segment SVG element.
 *
 * @function chord
 *
 * @param {String} parentId - The id or element that is the chord node
 *  will be added to.
 * @param {String} id
 *
 * @return {Object} - The newly created chord node.
 */
export function chord(parentId, id) {
  const a = addArcShapeNode(parentId, id)

  a.__renderPath = (currentNodeIndex, preRenderCallback) => __renderPath(a, currentNodeIndex, preRenderCallback);

  // Set the defaults
  a.$radius(0);
  a.$startAngle(0);
  a.$attr("stroke-linecap", "round");

  return a;
}

/**
 * Renders the actual path for the segment
 *
 * @param {Object} a - The segment node
 * @param {Callback} currentNodeIndex - The index of the node that is being rendered
 * @param {Callback} preRenderCallback - A function that will be called before the final
 * path is rendered
 * */
const __renderPath = (a, currentNodeIndex = null, preRenderCallback = null) => {
  a.$calcRenderData();

  if (preRenderCallback != null) {
    preRenderCallback(a, currentNodeIndex)
  }

  /* More about arcs here: https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths */
  let _path = [
    "M", a.__arcStartX(), a.__arcStartY(),
    "L", a.__arcEndX(), a.__arcEndY(),
  ].join(" ");

  a.$d(_path);
};