'use strict';

/*
 Modules not yet supported natively by browsers. See more at link.

 https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import
 This feature is only beginning to be implemented in browsers natively at this
 time. It is implemented in many transpilers, such as the Traceur Compiler,
 Babel, Rollup, and Webpack
 */
// import * as core from "anemic-core"
// import * as util from "anemic-utils"

let __$visuals = {
  name: "visuals",
  nodes: {},
  currentContainer: null,
  getCurrentContainer() {
    return this.currentContainer;
  }
};

__$visuals.__renderPipleline = function () {
  let pipleline = this.currentContainer.pipleline;
  let effects = this.currentContainer.effects;

  /*
   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
   Destructuring Assignment
   */
  pipleline.forEach(({data, visuals, effects}) => {
    // let suspendedEffects = [];

    for (let effect of effects) {
      effect.action(visuals)
    }
  });
}

__$visuals.commonEffects = function (effects) {
  // for (let effect in effects) {
  //   $log(effect)
  //   // effects[effectName].action(visuals)
  // }
}

/**
  Describes ellipse visuals
  @method bars

  XXX Speaker notes
 New method notation for the definition object properties.
 OLD:
 {
  foo: function(array) {...},
  bars: function(array) {...}
 }
 NEW:
 {
  foo(array) {...},
  bars(array) {...}
 }
 */
__$visuals.bars = function (data, effectsArray) {
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

  this.currentContainer.pipleline.push({data:data, visuals: visuals, effects: effectsArray});

  return this;
}

/**
  Describes ellipse visuals
  @method ellipses
*/
__$visuals.ellipses = function (data, effectsArray) {
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

  this.currentContainer.pipleline.push({data:data, visuals: visuals, effects: effectsArray});

  return this;
}

/**
  Creates a series of lines
*/
__$visuals.lines = function () {

  return this;
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
  __$visuals.currentContainer.pipleline = [];

  /*
   https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/Arrow_functions
   An arrow function does not create its own this context, so this has its original meaning
   from the enclosing context.
   */
  if ($isTruthy(callback)) {
    callback(__$visuals);
  }

  __$visuals.__renderPipleline();

  return __$visuals;
}
