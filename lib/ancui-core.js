import * as utils from './utils'

/**
  Returns the node specified by the name.

  @method $id
  @param {Object} name - either a string with the Id of the Node that we are
  looking for or a node.
  @return {DOMNode} returns the DOM node if found, or null it it doesn't exit.
  Alternatively, if name is a DOM node, then name is simply returned.
*/
export function $id(name) {
  if (typeof name === 'string') {
    return document.getElementById(name);
  }

  if (name.setAttributeNode != null) {
    /* name is an element */
    return name;
  }

  /* No clue */
  return null;
}

export function $moveBelow(nodeName, referenceNodeName) {
  let node = $id(nodeName);
  let referenceNode = $id(referenceNodeName);

  /* Positions the node at the bottom of the render tree. */
  node.parentElement.insertBefore(node, referenceNode);
}

export let _$ = {
  __attr: function(node, name, setterCallback) {
    return function(val) {
      if (arguments.length == 0 || typeof val === 'undefined' || val == null) {
        /*
         Allows the function to be used as a getter.
         */
        let val = node.getAttribute(name);
        if (val == null) {
          return null;
        }

        let number = parseFloat(val);
        if (typeof number === 'number' && !isNaN(number)) {
          return number;
        }
        return val;
      }

      let att = document.createAttribute(name);
      if (setterCallback == null || typeof setterCallback === 'undefined') {
        att.value = val;
      } else {
        att.value = setterCallback(val);
      }
      node.setAttributeNode(att);

      return node;
    }
  },
  _id: function(node) {
    return this.__attr(node, 'id');
  },
  _x: function(node) {
    return this.__attr(node, 'x');
  },
  _y: function(node, setterCallback) {
    return this.__attr(node, 'y');
  },
  _style: function(node) {
    return this.__attr(node, 'style');
  },
  _class: function(node) {
    return this.__attr(node, 'class');
  },
  _height: function(node) {
    return this.__attr(node, 'height');
  },
  _width: function(node) {
    return this.__attr(node, 'width');
  },
  _attr: function(node) {
    return function(attrName, val) {
      if (arguments.length == 1) {
        /** If there is no value being set, try to
         *  return the current value of the attribute
         */
        return node.getAttribute(attrName);
      }

      let att = document.createAttribute(attrName);
      att.value = val;
      node.setAttributeNode(att);
      return node;
    }
  },
}

export function $node(tag, parentElm) {
  let node = document.createElementNS("http://www.w3.org/2000/svg", tag);

  node.$class = _$._class(node);
  node.$style = _$._style(node);
  node.$height = _$._height(node);
  node.$width = _$._width(node);
  node.$attr = _$._attr(node);

  if (utils.$isTruthy(parentElm)) {
    parentElm.appendChild(node);
  }

  return node;
}

export function addShape(parentId, id, shape) {
  let parentElm = $id(parentId);

  if (!utils.$isTruthy(parentElm)) {
    /* Fail silently */
    utils.$log("[addShape] Can't find element parent with id:" + parentId)
    return null;
  }

  return $node(shape, parentElm)
    .$attr("id", id);
}

export function rect(parentId, id, x, y) {
  let r = addShape(parentId, id, "rect");

  r.$x = _$._x(r)
  r.$y = _$._y(r)

  r.$xy = function(_x, _y) {
    r.$x(_x);
    r.$y(_y);

    return r;
  }

  if (utils.$isTruthy(x)) {
    r.$x(x)
  }
  if (utils.$isTruthy(y)) {
    r.$y(y)
  }

  return r;
}

export function group(parentId, id) {
  return addShape(parentId, id, "g");
}

export function hline(parentId, id, x, y, width) {
  return addShape(parentId, id, "line")
    .$attr("x1", x)
    .$attr("y1", y)
    .$attr("x2", x + width)
    .$attr("y2", y);
}

export function vline(parentId, id, x, y, height) {
  return addShape(parentId, id, "line")
    .$attr("x1", x)
    .$attr("y1", y)
    .$attr("x2", x)
    .$attr("y2", y + height);
}

export function line(parentId, id, x1, y1, x2, y2) {
  return addShape(parentId, id, "line")
    .$attr("x1", x1)
    .$attr("y1", y1)
    .$attr("x2", x2)
    .$attr("y2", y2);
}

export function ellipse(parentId, id) {
  let e = addShape(parentId, id, "ellipse")

  e.$cx = _$.__attr(e, "cx");
  e.$cy = _$.__attr(e, "cy");
  e.$rx = _$.__attr(e, "rx");
  e.$ry = _$.__attr(e, "ry");

  e.$x = function(_x) {
    return e.$cx(_x);
  }
  e.$y = function(_y) {
    return e.$cy(_y);
  }

  e.$height = function(_h) {
    return e.$ry(_h);
  }
  e.$width = function(_w) {
    return e.$rx(_w);
  }

  return e;
}

export function path(parentId, id) {
  let p = addShape(parentId, id, "path");

  p.$d = _$.__attr(p, "d");
  p.$strokeWidth = _$.__attr(p, "stroke-width");
  p.$attr("stroke-linecap", "round");
  p.$path = function(p1, p2, isSmooth) {
    if (isSmooth == null || !isSmooth) {
      let _path = `M${p1.x}, ${p1.y} L${p2.x}, ${p2.y}`;
      p.$d(_path);
      return;
    }

    let w = p2.x - p1.x;
    let h = p2.y - p1.y;
    let w2 = w / 2;
    let h2 = h / 2;
    let _path = `M${p1.x},${p1.y} c${w2},${0} ${w2},${h} ${w},${h}`;
    p.$d(_path);
  }

  return p;
}

/**
 * Creates an arc shape using the SVG path element.
 */
export function arc(parentId, id) {
  let a = addShape(parentId, id, "path")

  a.$d = _$.__attr(a, "d");
  a.$x = _$.__attr(a, "x");
  a.$y = _$.__attr(a, "y");
  a.$strokeWidth = _$.__attr(a, "stroke-width");

  a.$radius = _$.__attr(a, "radius");
  a.$startAngle = _$.__attr(a, "start-angle"); /* Sets/Gets the starting angle of Arc in degrees */

  a.__arcSpan = _$.__attr(a, "arc-span"); /* Sets/Gets the lenght of the Arc in degrees */
  a.$arcSpan = function(val) {
    let result = a.__arcSpan(val);
    if (result === 'undefined' || result === null) {
      return 0;
    }

    return result
  }

  a.$strokeColor = function(color) {
    a.$style("stroke:" + color)
  }

  a.$endAngle = function() {
    return this.$startAngle() + this.$arcSpan();
  }

  /** Calculates the core data elements used to render the path
   * @return {Object} TODO
  */
  a.__calcRenderData = function() {
    /* Originally based on http://jsbin.com/sokacelaga/edit?html,js,output */
    let [x, y, radius, startAngle, endAngle] = [a.$x(), a.$y(), a.$radius(), a.$startAngle(), a.$endAngle()];

    /** Rotate anti-clockwise by 90 degree in order to get the arcs starting
     * from the y-axis * */
    let start = utils.$polarToCartesian(x, y, radius, startAngle - 90); /** contains the M attributes x and y */
    let end = utils.$polarToCartesian(x, y, radius, endAngle - 90);
    let largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    return {start, end, largeArcFlag};
  }

  /** Renders the actual path for the arc */
  a.__renderPath = function() {
    let {start, end, largeArcFlag} = a.__calcRenderData();

    /* More about arcs here: https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths */
    let _path = [
      "M", start.x, start.y,
      "A", a.$radius(), a.$radius(), 0, largeArcFlag, 1, end.x, end.y,
    ].join(" ");

    a.$d(_path);
  }

  // Set the defaults
  a.$radius(0);
  a.$startAngle(0);
  a.$attr("stroke-linecap", "round");

  return a;
}

/*
 * Creates an axes group element
 */
export function axes(parentId) {
  let parentNode = $id(parentId);
  let _g = g(parentId);

  _g.$class("axes")

  _g.xaxis = function(yOffset) {
    _g.yOffset = yOffset;
    hline(_g, "x-axis", 1, yOffset, "100%");
    return _g;
  }

  _g.yaxis = function(xOffset) {
    _g.xOffset = xOffset;
    vline(_g, "y-axis", xOffset, 1, "100%");
    return _g;
  }

  parentNode._axis_g = _g;
  return _g;
}
