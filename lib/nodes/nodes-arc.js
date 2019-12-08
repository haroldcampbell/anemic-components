import {
  _$,
  addShapeNode,
} from '../ancui-dom'

import * as utils from '../utils'

/**
 * Creates an arc SVG element.
 *
 * @function arc
 *
 * @param {String} parentId - The id or element that the ellipse element
 *  will be added to.
 * @param {String} id
 *
 * @return {Object} - The newly created arc element.
 */
export function arc(parentId, id) {
  let a = addShapeNode(parentId, id, "path")

  a.$d = _$.__attr(a, "d");
  a.$x = _$.__attr(a, "x");
  a.$y = _$.__attr(a, "y");
  a.$strokeWidth = _$.__attr(a, "stroke-width");

  a.$radius = _$.__attr(a, "radius");
  a.$startAngle = _$.__attr(a, "start-angle"); /* Sets/Gets the starting angle of Arc in degrees */
  a.__arcSpan = _$.__attr(a, "arc-span"); /* Sets/Gets the length of the Arc in degrees */

  a.$arcSpan = (val) => $arcSpan(a, val);
  a.$strokeColor = (color) => $strokeColor(a, color);
  a.$endAngle = () => $endAngle(a);
  a.__calcRenderData = () => __calcRenderData(a);
  a.__renderPath = () => __renderPath(a);

  // Set the defaults
  a.$radius(0);
  a.$startAngle(0);
  a.$attr("stroke-linecap", "round");

  return a;
}

const $arcSpan = (a, val) => {
  let result = a.__arcSpan(val);
  if (result === 'undefined' || result === null) {
    return 0;
  }

  return result
}


const $strokeColor = (a, color) => {
  a.$style("stroke:" + color)
}

const $endAngle = (a) => {
  return a.$startAngle() + a.$arcSpan();
}

/**
 * Calculates the core data elements used to render the path
 *
 * @return {Object} TODO
 */
const __calcRenderData = (a) => {
  /* Originally based on http://jsbin.com/sokacelaga/edit?html,js,output */
  let [x, y, radius, startAngle, endAngle] = [a.$x(), a.$y(), a.$radius(), a.$startAngle(), a.$endAngle()];

  /** Rotate anti-clockwise by 90 degree in order to get the arcs starting
   * from the y-axis * */
  let start = utils.$polarToCartesian(x, y, radius, startAngle - 90); /** contains the M attributes x and y */
  let end = utils.$polarToCartesian(x, y, radius, endAngle - 90);
  let largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  return {
    start,
    end,
    largeArcFlag
  };
}

/**
 * Renders the actual path for the arc
 * */
const __renderPath = (a) => {
  let {
    start,
    end,
    largeArcFlag
  } = a.__calcRenderData();

  /* More about arcs here: https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths */
  let _path = [
    "M", start.x, start.y,
    "A", a.$radius(), a.$radius(), 0, largeArcFlag, 1, end.x, end.y,
  ].join(" ");

  a.$d(_path);
};