import {
    $id,
} from '../ancui-core.js'

import {
    group,
} from './nodes-group.js'


import {
    vLine,
} from './nodes-vline.js'

import {
    hLine,
} from './nodes-hline.js'

/**
 * Creates an axes group element.
 *
 * @function axes
 * @param {string} parentId - the id of the parent element
 *
 * @return {object}
 */
export function axes(parentId) {
    let parentNode = $id(parentId);
    let _g = group(parentId);

    _g.$class("axes")

    _g.xaxis = function (yOffset) {
        _g.yOffset = yOffset;
        hLine(_g, "x-axis", 1, yOffset, "100%");
        return _g;
    }

    _g.yaxis = function (xOffset) {
        _g.xOffset = xOffset;
        vLine(_g, "y-axis", xOffset, 1, "100%");
        return _g;
    }

    parentNode._axis_g = _g;

    return _g;
}