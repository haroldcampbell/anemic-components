import {
  _$,
  addShapeNode,
} from '../ancui-dom'

import * as utils from '../utils'

/**
 * Creates a text SVG element
 *
 * @function text
 *
 * @param {String} parentId - The id or element that the group element
 *  will be added to.
 * @param {String} id
 * @param {*} x
 * @param {*} y
 *
 * @return {Object} - The newly created group element.
 */
export function text(parentId, id = null, x = 0, y = 0) {
  let r = addShapeNode(parentId, id, "text");

  r.$x = _$._x(r)
  r.$y = _$._y(r)
  r.$height = _$._height(r)
  r.$width = _$._width(r)

  r.$height(0)
  r.$width(0)

  r.$xy = function (_x, _y) {
    r.$x(_x);
    r.$y(_y);

    return r;
  }

  r.$fontSize = function (size) {
    r.$attr("font-size", size);

    return r;
  }

  if (utils.$isTruthy(x)) {
    r.$x(x)
  }
  if (utils.$isTruthy(y)) {
    r.$y(y)
  }

  r.$text = function (_text) {
    if (!utils.$isTruthy(_text)) {
      return r.textContent;
    }

    r.textContent = _text;
    return r;
  }

  return r;
}