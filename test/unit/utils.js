import {
  getVisuals,
  __createVisual
} from '../../lib/ancui-pipeline.js'

/**
 * Saves the current childNodes of the document.body
 *
 * @function captureDocumentBodyChildNodes
 *
 * @return {Array} the nodes that are currently in the document.body.
 */
export function captureDocumentBodyChildNodes() {
  const initialChildren = [];
  document.body.childNodes.forEach(node => {
    initialChildren.push(node);
  });

  return initialChildren;
}

/**
 * Sets the document.body with the specified nodes.
 *
 * @function resetDocumentBody
 *
 * @param {Arrray} initialChildrenNodes - the nodes that should be in the document.body
 */
export function resetDocumentBody(initialChildrenNodes) {
  document.body.childNodes.forEach(node => {
    document.body.removeChild(node);
  });

  initialChildrenNodes.forEach(node => {
    document.body.appendChild(node);
  });
}

/**
 * Resets the visuals by removing all of the stored nodes.
 * The method also sets currentContainer and __postRenderCallback to null.
 *
 * @function resetVisuals
 */
export function resetVisuals() {
  const visuals = getVisuals();
  visuals.nodes = {};
  visuals.currentContainer = null;
  visuals.__postRenderCallback = null;
}

/**
 * Pushes the specified callback into the array n amount of times as specified
 * by @times.
 *
 * @method pump
 *
 * @param {number} times - the number of times to push the callback into the
 *  Array.
 * @param {function} callback - the callback being pushed into the Array.
 *
 * @return {Object} - The array itself.
 */
Array.prototype.pump = function (times, callback) {
  for (let i = 0; i < times; i++) {
    this.push(callback)
  }
  return this;
}

/**
 * Pushes the result of specified callback into the array n amount of times as
 * specified by @times
 *
 * @method pumpFn
 *
 * @param {number} times - the number of times to push the callback into the
 *  Array.
 * @param {function} callback - the callback whose result will be pushed into
 *  the Array.
 *
 * @return {Object} - the array itself
 */
Array.prototype.pumpFn = function (times, callback) {
  for (let i = 0; i < times; i++) {
    this.push(callback())
  }
  return this;
}

/**
 * Represents an Mocked HTML attribute used for testing.
 *
 * @class MockAttribute
 */
export class MockAttribute {
  constructor() {
    this._name = null;
    this._value = null;
  }

  get name() {
    return this._name;
  }

  set name(name) {
    this._name = name;
  }

  get value() {
    return this._value;
  }

  set value(val) {
    this._value = val;
  }
}

/**
 * Represents an Mocked HTML node used for testing.
 *
 * @class MockNode
 */
export class MockNode {
  constructor() {
    this._attributes = {};
    this._children = [];
  }

  getAttribute(name) {
    if (this._attributes[name] == null) {
      return null;
    }
    return this._attributes[name].value;
  }

  setAttributeNode(mockAttribute) {
    this._attributes[mockAttribute.name] = mockAttribute
  }

  get childNodes() {
    return this._children;
  }

  appendChild(childNode) {
    this._children.push(childNode);
  }
}

export function createMockedVisual(shape, data) {
  let parentNode = new MockNode();
  let visual = __createVisual(null, parentNode)
  visual.withData(data);
  visual.withSVGShapeCreator((visual) => {
    return shape(visual.container)
  });
  visual.createShapes();

  return visual
}

export function extendIntentObj(intentsObject) {
  let localIntents = intentsObject.newIntents()

  localIntents.intentAtIndex = function(index) {
    if (index >= 0 || this.items.length < index) {
      return this.items[index];
    }
    return null;
  }

  localIntents.actionAtIndex = function(index, visual) {
    this.intentAtIndex(index).action(visual);
  }

  localIntents.action = function(visual) {
    if (this.items.length == 0) {
      throw "Can't call an action before an Intent. Try something similar to '$x(...).action(visual)'";
    }

    let lastAction = this.items.slice(-1)[0];

    lastAction.action(visual)
  }

  return localIntents;
}