import * as utils from './utils'

/**
 * Append the specified classname to the html dom node.
 *
 * @param {DOMNode} node - the element that will be modified
 * @param {string} classname - the class that we want to append
 *
 * @return {Object} The DOMNode node
 */
function _$appendCSS(node, classname) {
  if (node.$hasClass(classname)) {
    return node;
  }

  let newClassList = node.$class() + ` ${classname}`;
  /** Remove consecutive spaces */
  newClassList = newClassList.split(" ").filter(e => {
    return e.length > 0;
  });

  newClassList = newClassList.join(" ")
  node.$class(newClassList)

  return node;
}

/**
 * Remove the specified classname from the html dom node.
 *
 * @param {DOMNode} node  - the element that will be modified
 * @param {string} classname - the class name that will be removed

 * @return {Object} The DOMNode node
 */
function _$removeCSS(node, classname) {
  let arrNames = node.$class().split(" ").filter(css => {
    const cname = css.trim();
    return (cname === classname) ? false : true;
  })

  const newClassList = arrNames.join(" ")
  node.$class(newClassList)

  return node;
}

function _$hasClass(node, classname) {
  let existingClassnames = node.$class();

  if (existingClassnames == null) {
    node.$class("");

    return false;
  }

  return existingClassnames.toLowerCase().includes(classname.toLowerCase());
}

/**
 * Returns the node specified by the name.
 *
 * @function $id
 *
 * @param {Object} name - either a string with the Id of the Node that we are
 *  looking for or a node.
 *
 * @return {DOMNode} returns the DOM node if found, or null it it doesn't exit.
 * Alternatively, if name is a DOM node, then name is simply returned.
 */
export function $id(name) {
  if (typeof name === 'string') {
    return document.getElementById(name);
  }

  if (name.setAttributeNode != null) {
    /* name is an element. Add helper methods */
    name.$id = _$._id(name);
    name.$class = _$._class(name);
    name.$style = _$._style(name);
    name.$attr = _$._attr(name);
    name.$appendCSS = classname => _$appendCSS(name, classname);
    name.$removeCSS = classname => _$removeCSS(name, classname);
    name.$hasClass = classname => _$hasClass(name, classname);

    return name;
  }

  /* Bail! No clue */
  return null;
}

/**
 * Returns the nodes specified by the class.
 *
 * @function $id
 *
 * @param {Object} parentOrClassname - If parentOrClassname is a string then
 * get the getElementsByClassName from the document.
 *
 * If parentOrClassname is an object, then getElementsByClassName from that
 * object that match classname parameter.
 *
 * @param {string} classname
 *
 * @return {DOMNode} returns the DOM nodes if found, or null it it doesn't exit.
 */
export function $class(parentOrClassname, classname) {
  if (typeof parentOrClassname === 'string') {
    return document.getElementsByClassName(parentOrClassname);
  }

  if (parentOrClassname.setAttributeNode != null) {
    /* parentOrClassname is an element */
    return parentOrClassname.getElementsByClassName(classname);
  }

  /* Bail! No clue */
  return null;
}

/**
 * Positions the 'nodeName' node at the bottom of the render tree.
 *
 * @function $moveBelow
 *
 * @param {String} nodeName - The node that will be placed at the bottom
 * @param {String} referenceNodeName - The node that 'nodeName' should be
 *  placed below.
 */
export function $moveBelow(nodeName, referenceNodeName) {
  let node = $id(nodeName);
  let referenceNode = $id(referenceNodeName);

  /* Positions the node at the bottom of the render tree. */
  node.parentElement.insertBefore(node, referenceNode);
}

export let _$ = {
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

        if (`${val}`.endsWith("%")) {
          return val;
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
  _id: function (node) {
    return this.__attr(node, 'id');
  },
  _x: function (node) {
    return this.__attr(node, 'x');
  },
  _y: function (node, setterCallback) {
    return this.__attr(node, 'y');
  },
  _cx: function (node) {
    return this.__attr(node, 'cx');
  },
  _cy: function (node, setterCallback) {
    return this.__attr(node, 'cy');
  },
  _rx: function (node) {
    return this.__attr(node, 'rx');
  },
  _ry: function (node, setterCallback) {
    return this.__attr(node, 'ry');
  },
  _style: function (node) {
    return this.__attr(node, 'style');
  },
  _class: function (node) {
    return this.__attr(node, 'class');
  },
  _height: function (node) {
    return this.__attr(node, 'height');
  },
  _width: function (node) {
    return this.__attr(node, 'width');
  },
  _attr: function (node) {
    return function (attrName, val) {
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

/**
 * Creates an node described by the specific tag. If the @parentElm is
 * given, then the node will be appended to the parent.
 *
 * @function node
 *
 * @param {String} namespace - type of node being created.
 *  HTML    -> http://www.w3.org/1999/xhtml
 *  SVG     -> http://www.w3.org/2000/svg
 *  MathML  -> http://www.w3.org/1998/mathml
 *
 * @param {String} tag - tag type that will be created. E.g. rect, path, etc.
 * @param {Object} parentElm - the parent to which the node will be added.
 *
 * @return {Object} The newly created node.
 */
function $node(namespace, tag, parentElm) {
  let node = document.createElementNS(namespace, tag);

  node.$id = _$._id(node);
  node.$class = _$._class(node);
  node.$style = _$._style(node);
  node.$attr = _$._attr(node);

  node.$appendCSS = classname => _$appendCSS(node, classname);
  node.$removeCSS = classname => _$removeCSS(node, classname);
  node.$hasClass = classname => _$hasClass(node, classname);

  if (utils.$isTruthy(parentElm)) {
    parentElm.appendChild(node);
  } else {
    document.body.appendChild(node);
  }

  return node;
}

/**
 * Creates an html node described by the specific tag. If the @parentElm is
 * given, then the node will be appended to the parent.
 *
 * @function $htmlNode
 *
 * @param {String} tag - svg tag type that will be created. E.g. rect, path, etc.
 * @param {Object} parentElm - the parent to which the node will be added.
 *
 * @return {Object} The newly created node.
 */
export function $htmlNode(tag, parentElm) {
  return $node("http://www.w3.org/1999/xhtml", tag, parentElm);
}

/**
 * Creates an svg node described by the specific tag. If the @parentElm is
 * given, then the node will be appended to the parent.
 *
 * @function $svgNode
 *
 * @param {String} tag - svg tag type that will be created. E.g. rect, path, etc.
 * @param {Object} parentElm - the parent to which the node will be added.
 *
 * @return {Object} The newly created node.
 */
export function $svgNode(tag, parentElm) {
  return $node("http://www.w3.org/2000/svg", tag, parentElm);
}

/**
 * @function addShape
 *
 * @param {String} parentId - is the id or actual object of parent. The method
 *  fails if the parent can't be found.
 *
 * @param {String} id - is the ID of the SVG element being added.
 * @param {String} shape - the type of SVG element to create. E.g. rect, path, etc.
 *
 * @return {Object} The newly created SVG child shape.
 */
export function addShapeNode(parentId, id, shape) {
  let parentElm = $id(parentId);

  if (!utils.$isTruthy(parentElm)) {
    // console.log("parentId>>", parentId)
    throw new Error(`[addShape] Can't find element parent with id: "${parentId}"`);
  }

  let node = $svgNode(shape, parentElm)

  if (utils.$isTruthy(id)) {
    node.$attr("id", id);
  }

  node.bindData = (data) => shapeBindData(node, data);
  // This should be overridden to provide specific post data-binding behaviour
  node.onDataBound = shapeOnDataBound;

  return node;
}

export function addEmptyShape() {
  let node = {};

  node.bindData = (data) => shapeBindData(node, data);
  // This should be overridden to provide specific post data-binding behaviour
  node.onDataBound = shapeOnDataBound;

  return node;
}

const shapeOnDataBound = () => {};

const shapeBindData = (node, data) => {
  node._dataValue = data.dataValue;
  node._rawDataValue = data.rawDataValue;
  node._dataIndex = data.dataIndex;
  node._dataProperty = data.target;
  node.onDataBound();
}