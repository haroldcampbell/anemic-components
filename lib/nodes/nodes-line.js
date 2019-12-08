import {
  _$,
  addShapeNode,
} from '../ancui-dom'

/**
 * Creates a line SVG element that runs from (x1, y1) to (x2, y2).
 *
 * @function line
 *
 * @param {String} parentId - The id or element that the line element
 *  will be added to.
 * @param {String} id
 * @param {Number} x1 - specifies the x-coordinate of first point.
 * @param {Number} y1 - specifies the y-coordinate of first point.
 * @param {Number} x2 - specifies the x-coordinate of second point.
 * @param {Number} y2 - specifies the y-coordinate of second point.
 *
 * @return {Object} - The newly created line element
 */
export function line(parentId, id, x1, y1, x2, y2) {
  let l = addShapeNode(parentId, id, "line");

  l.$x1 = _$.__attr(l, "x1");
  l.$x2 = _$.__attr(l, "x2");
  l.$y1 = _$.__attr(l, "y1");
  l.$y2 = _$.__attr(l, "y2");

  l.$x1(x1);
  l.$y1(y1);
  l.$x2(x2);
  l.$y2(y2);

  return l;
}