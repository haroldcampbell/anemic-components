import {
    addShapeNode,
} from './ancui-core.js'

/**
 * Creates a group SVG element.
 *
 * @function group
 *
 * @param {String} parentId - The id or element that the group element
 *  will be added to.
 * @param {String} id
 *
 * @return {Object} - The newly created group element.
 */
export function group(parentId, id) {
  return addShapeNode(parentId, id, "g");
}