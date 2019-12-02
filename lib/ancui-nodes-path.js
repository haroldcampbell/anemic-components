import {
  _$,
  addShapeNode,
} from './ancui-core.js'

/**
 * Creates a path SVG element.
 *
 * @function path
 *
 * @param {String} parentId - The id of the parent or the parent element itself
 *  that the path element will be added to.
 * @param {String} id - The id of the new path element.
 *
 * @return {Object} - The newly created path element.
 */
export function path(parentId, id) {
  let p = addShapeNode(parentId, id, "path");

  p.$d = _$.__attr(p, "d");
  p.$strokeWidth = _$.__attr(p, "stroke-width");
  p.$attr("stroke-linecap", "round");
  p.$path = (p1, p2, isSmooth) => pathRenderer(p, p1, p2, isSmooth);

  return p;
}

// draws a path
const pathRenderer = (p, p1, p2, isSmooth) => {
  if (isSmooth == null || !isSmooth) {
    pathDirect(p, p1, p2);

    return p;
  }

  let w = p2.x - p1.x;
  let h = p2.y - p1.y;
  let w2 = w / 2;
  let h2 = h / 2;

  if (w2 > h2) {
    pathSmoothX(p, p1, w, h, w2);
  } else {
    pathSmoothY(p, p1, w, h, h2);
  }

  return p;
};

// path between two points
const pathDirect = (p, p1, p2) => {
  const _path = `M${p1.x}, ${p1.y} L${p2.x}, ${p2.y}`;
  p.$d(_path);
};

// Smooth along x-axis
const pathSmoothX = (p, p1, w, h, w2) => {
  const _path = `M${p1.x},${p1.y} c${w2},${0} ${w2},${h} ${w},${h}`;
  p.$d(_path);
};

// Smooth along y-axis
const pathSmoothY = (p, p1, w, h, h2) => {
  const _path = `M${p1.x},${p1.y} c${0},${h2} ${w},${h2} ${w},${h}`;
  p.$d(_path);
};