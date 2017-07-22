'use strict';

let __$visuals = {
  name: "visuals",
  nodes: {},
  currentContainer: null,
  __postRenderCallback: null,
  getCurrentContainer() {
    return this.currentContainer;
  }
};

/**
  Defines a callback that is called after rendering is completed.
  @method onRenderCompleted
*/
__$visuals.onRenderCompleted = function(callback) {
  __$visuals.currentContainer.__postRenderCallback = callback;

  return this;
}


/**
  An empty, noop visual
  @method empty
 */
__$visuals.empty = function(data, effectsArray) {
  let visuals = [];

  data.asNormalized().forEach(d => {
    let r = {};

    r._dataValue = d;
    r._dataProperty = data.target;
    visuals.push(r);
  });

  this.currentContainer.pipleline.push({
    visuals: visuals,
    effects: effectsArray
  });

  return this;
}

/**
  Describes the bar visuals
  @method bars
 */
__$visuals.bars = function(data, effectsArray) {
  let visuals = [];

  data.asNormalized().forEach(d => {
    let r = rect(this.currentContainer)
      .$x(0)
      .$y(0)
      .$class("bar");

    r._dataValue = d;
    r._dataProperty = data.target;
    visuals.push(r);
  });

  this.currentContainer.pipleline.push({
    visuals: visuals,
    effects: effectsArray
  });

  return this;
}

/**
  Describes the ellipse visuals
  @method ellipses
*/
__$visuals.ellipses = function(data, effectsArray) {
  let visuals = [];

  data.asNormalized().forEach(d => {
    let e = ellipse(this.currentContainer)
      .$x(0)
      .$y(0)
      .$rx(d)
      .$ry(d)
      .$class("ellipse");

    e._dataValue = d;
    e._dataProperty = data.target;
    visuals.push(e);
  });

  this.currentContainer.pipleline.push({
    visuals: visuals,
    effects: effectsArray
  });

  return this;
}

/**
  Creates a series of lines that's connected to other visuals.
  @method connectingLines
*/
__$visuals.connectingLines = function(data, effectsArray) {
  let visuals = [];

  data.asNormalized().forEach(d => {
    let p = path(this.currentContainer)
      .$class("path");

    p._dataValue = d;
    p._dataProperty = data.target;
    visuals.push(p);
  });

  this.currentContainer.pipleline.push({
    visuals: visuals,
    effects: effectsArray
  });

  return this;
}

/**
  Returns the internal visuals object
  @method getVisuals
  @returns {Object} the __$visuals object
*/
function getVisuals() {
  return __$visuals;
}

function __renderPipleline(pipleline) {
  pipleline.forEach(({visuals,effects}) => {
    for (let effect of effects) {
      effect.action(visuals)
    }
  });
}

/**
  Creates a container that contains the visuals defined in the block.
  @method container
  @param {string} id - The id of the container.
  @param {Callback} callback -
  @param {Node} parentElm -
*/
function container(id, callback, parentElm) {
  if ($isTruthy(__$visuals.nodes[id])) {
    __$visuals.currentContainer = __$visuals.nodes[id];

    return __$visuals;
  }

  let pipleline = [];
  let node = document.createElementNS("http://www.w3.org/2000/svg", "svg");

  node.$id = _$._id(node);
  node.$class = _$._class(node);
  node.$style = _$._style(node);
  node.$height = _$._height(node);
  node.$width = _$._width(node);
  node.$attr = _$._attr(node);
  node.$id(id);

  if ($isTruthy(parentElm)) {
    parentElm.appendChild(node);
  } else {
    document.body.appendChild(node);
  }

  __$visuals.nodes[id] = node;
  __$visuals.currentContainer = node;
  __$visuals.currentContainer.pipleline = pipleline;

  if ($isTruthy(callback)) {
    callback(__$visuals);
  }

  __renderPipleline(pipleline);

  if ($isTruthy(__$visuals.currentContainer.__postRenderCallback)) {
    __$visuals.currentContainer.__postRenderCallback();
  }

  __$visuals.currentContainer = null;

  return __$visuals;
}
