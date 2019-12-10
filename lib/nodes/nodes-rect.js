import {
    _$,
    addShapeNode,
} from '../ancui-dom'

import * as utils from '../utils'

/**
 * Creates a rect SVG element at the specifed (x, y) point.
 *
 * @function rect
 *
 * @param {String} parentId - The id or element that the rect element
 *  will be added to.
 * @param {String} id
 * @param {Number} x - specifies the x-coordinate of the shape.
 * @param {Number} y - specifies the y-coordinate of the shape.
 *
 * @return {Object} - The newly created rect element.
 */
export function rect(parentId, id = null, x = 0, y = 0) {
    let r = addShapeNode(parentId, id, "rect");

    r._$x = _$._x(r)
    r._$y = _$._y(r)
    r._$width = _$._width(r);
    r._$height = _$._height(r);
    r.$strokeWidth = _$.__attr(r, "stroke-width");

    r.$x = _x => rectX(r, _x);
    r.$y = _y => rectY(r, _y);
    r.$xy = (_x, _y) => rectXY(r, _x, _y);

    r.$width = (_w, autoCenter) => rectWidth(r, _w, autoCenter);
    r.$height = (_h, autoCenter) => rectHeight(r, _h, autoCenter);

    if (utils.$isTruthy(x)) {
        r.$x(x)
    }
    if (utils.$isTruthy(y)) {
        r.$y(y)
    }

    return r;
}

const rectX = (r, _x) => {
    if (!utils.$isTruthy(_x)) {
        return r._$x();
    }

    /*
     * I want the rect to remain centered around the x, regardless of
     * the changes to the width. Shift x to take width into consideration.
     */
    r._$x(_x);

    return r;
}

const rectY = (r, _y) => {
    if (!utils.$isTruthy(_y)) {
        return r._$y();
    }

    if (utils.$isEmpty(r._$height()) || r._$height() == 0) {
        // If there is no width, then just set the y
        r._$y(_y);

        return r;
    }

    /*
     * I want the rect to remain centered around the y, regardless of
     * the changes to the height. Shift y to take width into consideration.
     */
    r._$y(_y)

    return r;
}

const rectXY = (r, _x, _y) => {
    r.$x(_x);
    r.$y(_y);

    return r;
}

const rectWidth = (r, _w, autoCenter) => {
    if (!utils.$isTruthy(_w)) {
        return r._$width();
    }

    if (!autoCenter) {
        r._$width(_w);

        return r;
    }

    /*
     * I want the rect to remain centered around the x, regardless of
     * the changes to the width. Shift x to take width into consideration.
     */

    let w;

    if (utils.$isEmpty(r._$width())) {
        w = _w
    } else {
        w = r._$width() == 0 ? _w : (r._$width() - _w);
    }
    let dw = w / 2.0;

    let x = r._$x();
    let xCenter = x - dw;

    r._$x(xCenter);
    r._$width(_w);

    return r;
}

const rectHeight = (r, _h, autoCenter) => {
    if (!utils.$isTruthy(_h)) {
        return r._$height();
    }

    if (!autoCenter) {
        r._$height(_h);

        return r;
    }

    /*
     * I want the rect to remain centered around the y, regardless of
     * the changes to the height. Shift y to take height into consideration
     */

    let h;

    if (utils.$isEmpty(r._$height())) {
        h = _h
    } else {
        h = r._$height() == 0 ? _h : (r._$height() - _h);
    }

    let dh = h / 2.0;

    let y = r._$y();
    let yCenter = y - dh;

    r._$y(yCenter);
    r._$height(_h);

    return r;
}