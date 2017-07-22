'use strict';

/**
  Returns the node specified by the name.

  @method $id
  @param {Object} name - either a string with the Id of the Node that we are looking for
  or a node.
  @returns {DOMNode} returns the DOM node if found, or null it it doesn't exit.
  Alternatively, if name is a DOM node, then name is simply returned.
*/
function $id(name) {
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

function $moveBelow(nodeName, referenceNodeName) {
  let node = $id(nodeName);
  let referenceNode = $id(referenceNodeName);

  /* Positions the node at the bottom of the render tree. */
  node.parentElement.insertBefore(node, referenceNode);
}


let _$ = {
  __attr: function (node, name, setterCallback) {
    return function (val) {
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
      if(setterCallback == null || typeof setterCallback === 'undefined') {
        att.value = val;
      } else {
        att.value = setterCallback(val);
      }
      node.setAttributeNode(att);

      return node;
    }
  },
  _id: function (node) {
    return this.__attr(node, "id");
  },
  _x: function (node) {
    return this.__attr(node, "x");
  },
  _y: function (node, setterCallback) {
    return this.__attr(node, "y");
  },
  _style: function (node) {
    return this.__attr(node, "style");
  },
  _class: function (node) {
    return this.__attr(node, "class");
  },
  _height: function (node) {
    return this.__attr(node, "height");
  },
  _width: function (node) {
    return this.__attr(node, "width");
  },
  _attr: function (node) {
    return function (attrName, val) {

      if (typeof val === 'undefined' || val == null) {
        /* we only create the attribute if the val is not nil*/
        return node;
      }

      var att = document.createAttribute(attrName);
      att.value = val;
      node.setAttributeNode(att);
      return node;
    }
  }
}

function $node(tag, parentElm) {
  let node = document.createElementNS("http://www.w3.org/2000/svg", tag);

  node.$class = _$._class(node);
  node.$style = _$._style(node);
  node.$height = _$._height(node);
  node.$width = _$._width(node);
  node.$attr = _$._attr(node);

  if ($isTruthy(parentElm)) {
    parentElm.appendChild(node);
  }

  return node;
}

function addShape(parentId, id, shape) {
  let parentElm = $id(parentId);

  if (!$isTruthy(parentElm)) {
    /* Fail silently */
    $log("[addShape] Can't find element parent with id:" + parentId)
    return null;
  }

  return $node(shape, parentElm)
    .$attr("id", id);
}

function rect(parentId, id, x, y) {
  let r = addShape(parentId, id, "rect");

  r.$x = _$._x(r)
  r.$y = _$._y(r)

  r.$xy = function (_x, _y) {
    r.$x(_x);
    r.$y(_y);

    return r;
  }

  if ($isTruthy(x)) {
    r.$x(x)
  }
  if ($isTruthy(y)) {
    r.$y(y)
  }

  return r;
}

function group(parentId, id) {
  return addShape(parentId, id, "g");
}

function hline(parentId, id, x, y, width) {
  return addShape(parentId, id, "line")
    .$attr("x1", x)
    .$attr("y1", y)
    .$attr("x2", x + width)
    .$attr("y2", y);
}

function vline(parentId, id, x, y, height) {
  return addShape(parentId, id, "line")
    .$attr("x1", x)
    .$attr("y1", y)
    .$attr("x2", x)
    .$attr("y2", y + height);
}

function line(parentId, id, x1, y1, x2, y2) {
  return addShape(parentId, id, "line")
    .$attr("x1", x1)
    .$attr("y1", y1)
    .$attr("x2", x2)
    .$attr("y2", y2);
}

function ellipse(parentId, id) {
  let e = addShape(parentId, id, "ellipse")

  e.$cx = _$.__attr(e, "cx");
  e.$cy = _$.__attr(e, "cy");
  e.$rx = _$.__attr(e, "rx");
  e.$ry = _$.__attr(e, "ry");

  e.$x = function (_x) {
    return e.$cx(_x);
  }
  e.$y = function (_y) {
    return e.$cy(_y);
  }

  e.$height = function (_h) {
    return e.$ry(_h);
  }
  e.$width = function (_w) {
    return e.$rx(_w);
  }

  return e;
}

function path(parentId, id) {
  let p = addShape(parentId, id, "path");

  p.$d = _$.__attr(p, "d");
  p.$strokeWidth = _$.__attr(p, "stroke-width");
  p.$attr("stroke-linecap", "round");
  p.$path = function(p1, p2, isSmooth) {
    if(isSmooth == null || !isSmooth) {
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

/*
 * Creates an axes group element
 */
function axes(parentId) {
  let parentNode = $id(parentId);
  let _g = g(parentId);

  _g.$class("axes")

  _g.xaxis = function (yOffset) {
    _g.yOffset = yOffset;
    hline(_g, "x-axis", 1, yOffset, "100%");
    return _g;
  }

  _g.yaxis = function (xOffset) {
    _g.xOffset = xOffset;
    vline(_g, "y-axis", xOffset, 1, "100%");
    return _g;
  }

  parentNode._axis_g = _g;
  return _g;
}

/** --- */
