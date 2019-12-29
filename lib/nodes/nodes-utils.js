import {
    _$,
    addShapeNode,
    addEmptyShape,
} from '../ancui-dom'

import * as utils from '../utils'

export function addPointNode(parentId, id) {
    let a = addEmptyShape();

    // a.$d = _$.__attr(a, "d");
    a.$x = _$.__attr(a, "x"); // segment center x
    a.$y = _$.__attr(a, "y"); // segment center y

    a.$strokeWidth = _$.__attr(a, "stroke-width");

    a.__arcSpan = _$.__attr(a, "arc-span"); /* The length of the Arc in degrees */
    a.__arcStartX = _$.__attr(a, "arc-start-x");
    a.__arcStartY = _$.__attr(a, "arc-start-y");
    a.__arcEndX = _$.__attr(a, "arc-end-x");
    a.__arcEndY = _$.__attr(a, "arc-end-y");
    a.__largeArcFlag = _$.__attr(a, "large-arc-flag");

    a.__arcStart = () => __arcStart(a);
    a.__arcEnd = () => __arcEnd(a);
    a.$radialCenter = (radius) => __radialCenter(a, radius);

    a.$radius = _$.__attr(a, "radius");
    a.$startAngle = _$.__attr(a, "start-angle"); /* Sets/Gets the starting angle of Arc in degrees */
    a.$endAngle = () => __endAngle(a);
    a.$arcSpan = (val) => __arcSpan(a, val);

    a.$strokeColor = (color) => __strokeColor(a, color);
    a.$calcRenderData = () => __calcRenderData(a);

    a.__renderPath = (currentNodeIndex, preRenderCallback) => {
        a.$calcRenderData();
    };

    return a;
}

export function addArcShapeNode(parentId, id) {
    let a = addShapeNode(parentId, id, "path")

    a.$d = _$.__attr(a, "d");
    a.$x = _$.__attr(a, "x"); // segment center x
    a.$y = _$.__attr(a, "y"); // segment center y

    a.$strokeWidth = _$.__attr(a, "stroke-width");

    a.__arcSpan = _$.__attr(a, "arc-span"); /* The length of the Arc in degrees */
    a.__arcStartX = _$.__attr(a, "arc-start-x");
    a.__arcStartY = _$.__attr(a, "arc-start-y");
    a.__arcEndX = _$.__attr(a, "arc-end-x");
    a.__arcEndY = _$.__attr(a, "arc-end-y");
    a.__largeArcFlag = _$.__attr(a, "large-arc-flag");

    a.__arcStart = () => __arcStart(a);
    a.__arcEnd = () => __arcEnd(a);
    a.$radialCenter = (radius) => __radialCenter(a, radius);

    a.$radius = _$.__attr(a, "radius");
    a.$startAngle = _$.__attr(a, "start-angle"); /* Sets/Gets the starting angle of Arc in degrees */
    a.$endAngle = () => __endAngle(a);
    a.$arcSpan = (val) => __arcSpan(a, val);

    a.$strokeColor = (color) => __strokeColor(a, color);
    a.$calcRenderData = () => __calcRenderData(a);

    return a;
}

/**
 * Creates a Hash with the {x,y} as keys for the arcStart coords
 *
 * WARNING: The __arcStartX and __arcStartY are only evaluated and set in  $calcRenderData().
 *
 * @param {ArcShapeNode} node
 *
 * @return {Object} - Hash with the {x,y} as keys.
 */
function __arcStart(node) {
    return {
        x: node.__arcStartX(),
        y: node.__arcStartY()
    }
}

/**
 * Creates a Hash with the {x,y} as keys for the arcEnd coords
 *
 * WARNING: The __arcEndX and __arcEndY are only evaluated and set in  $calcRenderData().
 *
 * @param {ArcShapeNode} node
 *
 * @return {Object} - Hash with the {x,y} as keys.
 */
function __arcEnd(node) {
    return {
        x: node.__arcEndX(),
        y: node.__arcEndY()
    }
}

/**
 * Creates a Hash with the {x,y} as keys along the radial.
 *
 * WARNING: Depends on $startAngle() and $arcSpan() being set first.
 *
 * @param {ArcShapeNode} node
 * @param {Number} radius - radial center along specified radius
 *
 * @return {Object} - Hash with the {x,y} as keys.
 */
function __radialCenter(node, radius) {
    const startAngle = node.$startAngle();
    const deltaArcSpan = node.$arcSpan() / 2.0;
    const newStartAngle = startAngle + deltaArcSpan;
    const radialCenter = utils.$polarToCartesian(node.$x(), node.$y(), radius, newStartAngle - 90);

    return radialCenter;
}

function __arcSpan(a, val) {
    let result = a.__arcSpan(val);
    if (result === 'undefined' || result === null) {
        a.__arcSpan(0);
        return 0;
    }

    return result
}

function __strokeColor(a, color) {
    a.$style("stroke:" + color)
}

function __endAngle(a) {
    return a.$startAngle() + a.$arcSpan();
}

/**
 * Calculates the core data elements used to render the path
 *
 * @param {Object} a - The segment node
 */
function __calcRenderData(a) {
    /* Originally based on http://jsbin.com/sokacelaga/edit?html,js,output */
    let [x, y, radius, startAngle, endAngle] = [a.$x(), a.$y(), a.$radius(), a.$startAngle(), a.$endAngle()];

    /** Rotate anti-clockwise by 90 degree in order to get the arcs starting
     * from the y-axis * */
    let start = utils.$polarToCartesian(x, y, radius, startAngle - 90); /** contains the M attributes x and y */
    let end = utils.$polarToCartesian(x, y, radius, endAngle - 90);
    let largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    a.__arcStartX(start.x)
    a.__arcStartY(start.y)
    a.__arcEndX(end.x)
    a.__arcEndY(end.y)
    a.__largeArcFlag(largeArcFlag)
}