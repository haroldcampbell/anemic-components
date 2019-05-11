import {
    _$,
    addShape,
} from './ancui-core.js'

import * as utils from './utils'

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
    let r = addShape(parentId, id, "rect");

    r._$x = _$._x(r)
    r._$y = _$._y(r)
    r._$height = _$._height(r);
    r._$width = _$._width(r);
    r.$strokeWidth = _$.__attr(r, "stroke-width");

    r.$x = _x => rectX(r, _x);
    r.$y = _y => rectY(r, _y);
    r.$width = _w => rectWidth(r, _w);
    r.$height = _h => rectHeight(r, _h);
    r.$xy = (_x, _y) => rectXY(r, _x, _y);

    if (utils.$isTruthy(x)) {
        r.$x(x)
    }
    if (utils.$isTruthy(y)) {
        r.$y(y)
    }

    return r;
}

function rectX(r, _x) {
    if (!utils.$isTruthy(_x)) {
        return r._$x();
    }

    if (utils.$isEmpty(r._$width()) || r._$width() == 0) {
        // If there is no width, then just set the x
        r._$x(_x);

        return r;
    }

    /*
     * I want the rect to remain centered around the x, regardless of
     * the changes to the width. Shift x to take width into consideration.
     */
    // let w = r._$width() // / 2.0
    r._$x(_x);

    return r;
}

function rectY(r, _y) {
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
    // let h = r._$height() / 2.0
    r._$y(_y)// - h);

    return r;
}

function rectXY(r, _x, _y) {
    r.$x(_x);
    r.$y(_y);

    return r;
}

function rectWidth(r, _w) {
    if (!utils.$isTruthy(_w)) {
        return r._$width();
    }

    if (utils.$isEmpty(r._$x()) || r._$x() == 0) {
        // If there is no x, then just set the width
        r._$width(_w);

        return r;
    }

    /*
     * I want the rect to remain centered around the x, regardless of
     * the changes to the width. Shift x to take width into consideration.
     */

    let x = r._$x();
    let w = utils.$isEmpty(r._$width()) ? _w : (r._$width() - _w);
    let dw = w / 2.0;

    r._$x(x - dw);
    r._$width(_w);

    return r;
}

function rectHeight(r, _h) {
    if (!utils.$isTruthy(_h)) {
        return r._$height();
    }

    if (utils.$isEmpty(r._$y()) || r._$y() == 0) {
        // If there is no y, then just set the height
        r._$height(_h);

        return r;
    }

    /*
     * I want the rect to remain centered around the y, regardless of
     * the changes to the height. Shift y to take height into consideration
     */

    let y = r._$y();
    let h = utils.$isEmpty(r._$height()) ? _h : (r._$height() - _h);
    let dh = h / 2.0;

    r._$y(y - dh);
    r._$height(_h);

    return r;
}