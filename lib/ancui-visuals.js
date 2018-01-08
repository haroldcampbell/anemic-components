import {
  rect,
  ellipse,
  path,
  arc
} from './ancui-core.js';

import {
  getVisuals
} from './ancui-pipeline.js'

export let __$visuals = getVisuals();
/**
  An empty, noop visual.

  @method empty

  @param {Object} data
  @param {Array} effectsArray - array of intents

  @return {Object}
*/
__$visuals.empty = function (data, effectsArray) {
  return this.registerVisual(data, effectsArray, (container) => {
    return {};
  });
}

/**
  Describes the bar visuals.

  @method bars

  @param {Object} data
  @param {Array} effectsArray - array of intents

  @return {Object}
 */
__$visuals.bars = function (data, effectsArray) {
  return this.registerVisual(data, effectsArray, (container) => {
    return rect(container)
      .$x(0)
      .$y(0)
      .$class("bar");
  });
}

/**
  Describes the ellipse visuals.

  @method ellipses

  @param {Object} data
  @param {Array} effectsArray - array of intents

  @return {Object}
*/
__$visuals.ellipses = function (data, effectsArray) {
  return this.registerVisual(data, effectsArray, (container) => {
    return ellipse(container)
      .$x(0)
      .$y(0)
      .$class("ellipse");
  });
}

/**
  Creates a series of lines that's connected to other visuals.

  @method connectingLines

  @param {Object} data
  @param {Array} effectsArray - array of intents

  @return {Object}
*/
__$visuals.connectingLines = function (data, effectsArray) {
  return this.registerVisual(data, effectsArray, (container) => {
    return path(container)
      .$class("path");
  });
}

/**
  Creates a series of disjoint arcs.

  @method arcs

  @param {Object} data
  @param {Array} effectsArray - array of intents

  @return {Object}
*/
__$visuals.arcs = function (data, effectsArray) {
  return this.registerVisual(data, effectsArray, (container) => {
    return arc(container)
      .$class("arc");
  });
}