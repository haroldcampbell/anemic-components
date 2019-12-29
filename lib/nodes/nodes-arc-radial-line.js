import {
    addArcShapeNode
} from "./nodes-utils"

/**
 * Creates an line SVG element radiating out from a central point.
 *
 * @function radial-line
 *
 * @param {String} parentId - The id or element that is the radial-line node
 *  will be added to.
 * @param {String} id
 *
 * @return {Object} - The newly created radial-line node.
 */
export function radialLine(parentId, id) {
    const a = addArcShapeNode(parentId, id)

    a.__renderPath = (currentNodeIndex, preRenderCallback) => __renderPath(a, currentNodeIndex, preRenderCallback);

    // Set the defaults
    a.$radius(0);
    a.$startAngle(0);
    a.$attr("stroke-linecap", "round");

    return a;
}

/**
 * Renders the actual path for the radial line
 *
 * @param {Object} a - The radial line node
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
        "M", a.$x(), a.$y(),
        "L", a.__arcEndX(), a.__arcEndY(),
    ].join(" ");

    a.$d(_path);
};