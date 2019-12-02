import {
    _$,
    addShapeNode,
} from '../ancui-core.js'

import * as utils from '../utils'

/**
 * Creates a line SVG element that is vertical at the specified (x, y) point.
 *
 * @function vLine
 *
 * @param {String} parentId - The id or element that the line element
 *  will be added to.
 * @param {String} id
 * @param {Number} x - specifies the x-coordinate of the shape.
 * @param {Number} y - specifies the y-coordinate of the shape.
 * @param {Number} height - specifies the height of the line in pixels.
 *
 * @return {Object} - The newly created vertical element
 */
export function vLine(parentId, id, x, y, height) {
  let l = addShapeNode(parentId, id, "line");

  l.$x1 = _$.__attr(l, "x1");
  l.$x2 = _$.__attr(l, "x2");
  l.$y1 = _$.__attr(l, "y1");
  l.$y2 = _$.__attr(l, "y2");
  l._$height = _$._height(l);

  l.$x = _x => vLineX(l, _x)
  l.$y = _y => vLineY(l, _y);
  l.$height = _h => hLineHeight(l, _h);

  l.$x(x);
  l.$y(y);
  l.$height(height);

  return l;
}

const vLineX = (l, _x) => {
  if (!utils.$isTruthy(_x)) {
    return l.$x1();
  }

  l.$x1(_x);
  l.$x2(_x);

  return l;
}

const vLineY = (l, _y) => {
  if (!utils.$isTruthy(_y)) {
    return l.$y1();
  }

  l.$y1(_y);
  l.$y2(_y);

  return l;
}

const hLineHeight = (l, _h) => {
  if (!utils.$isTruthy(_h)) {
    return l._$height();
  }

  const y2 = `${_h}`.endsWith("%") ? _h : (l.$y1() + _h);

  l._$height(_h)
  l.$y2(y2);

  return l;
}