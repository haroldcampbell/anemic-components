import {
  _$,
  addShapeNode,
} from './ancui-core.js'

import * as utils from './utils'

/**
 * Creates a line SVG element that is horizontal at the specified (x, y) point.
 *
 * @function hLine
 *
 * @param {String} parentId - The id or element that the line element
 *  will be added to.
 * @param {String} id
 * @param {Number} x - specifies the x-coordinate of the shape.
 * @param {Number} y - specifies the y-coordinate of the shape.
 * @param {Number} width - specifies the width of the line in pixels.
 *
 * @return {Object} - The newly created horizontal element
 */
export function hLine(parentId, id, x, y, width) {
  let l = addShapeNode(parentId, id, "line");

  l.$x1 = _$.__attr(l, "x1");
  l.$x2 = _$.__attr(l, "x2");
  l.$y1 = _$.__attr(l, "y1");
  l.$y2 = _$.__attr(l, "y2");
  l._$width = _$._width(l);

  l.$x = _x => hLineX(l, _x)
  l.$y = _y => hLineY(l, _y);
  l.$width = _w => hLineWidth(l, _w);

  l.$x(x);
  l.$y(y);
  l.$width(width);

  return l;
}

const hLineX = (l, _x) => {
  if (!utils.$isTruthy(_x)) {
    return l.$x1();
  }

  l.$x1(_x);
  l.$x2(_x);

  return l;
}

const hLineY = (l, _y) => {
  if (!utils.$isTruthy(_y)) {
    return l.$y1();
  }

  l.$y1(_y);
  l.$y2(_y);

  return l;
}

const hLineWidth = (l, _w) => {
  if (!utils.$isTruthy(_w)) {
    return l._$width();
  }

  const x2 = `${_w}`.endsWith("%") ? _w : (l.$x1() + _w);

  l.$x2(x2);
  l._$width(_w)

  return l;
}