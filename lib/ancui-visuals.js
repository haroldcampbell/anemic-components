import {
  ellipse,
  path,
  arc,
  text,
  vLine,
  hLine,

} from './ancui-core.js';

import {
  rect
} from './ancui-core-rect.js';

import {
  connectedPoints,
} from './ancui-core-connected-points.js';

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
  return this.createVisual()
    .withData(data)
    .registerVisual(effectsArray, (container) => {
      return {};
    });
}

// __$visuals.globalSettings = function (effectsArray) {
//   return this.registerGlobalSetting(effectsArray, (container) => {
//     return {};
//   });
// }

__$visuals.label = function (textContent, effectsArray) {
  let visual = this.createVisual()

  visual.withCreateShapesCallback(visual.__defaultSingleShapeCreator)
    .registerVisual(effectsArray, (container) => {
      return text(container)
        .$x(0)
        .$y(0)
        .$text(textContent)
        .$class("text label");
    });

  return visual
}

__$visuals.labels = function (data, effectsArray) {
  return this.createVisual()
    .withData(data)
    .registerVisual(effectsArray, (container) => {
      return text(container)
        .$x(0)
        .$y(0)
        .$class("text labels");
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
  return this.createVisual()
    .withData(data)
    .registerVisual(effectsArray, (container) => {
      return rect(container)
        .$x(0)
        .$y(0)
        .$width(0)
        .$height(0)
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
  return this.createVisual()
    .withData(data)
    .registerVisual(effectsArray, (container) => {
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
  return this.createVisual()
    .withData(data)
    .registerVisual(effectsArray, (container) => {
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
  return this.createVisual()
    .withData(data)
    .registerVisual(effectsArray, (container) => {
      return arc(container)
        .$class("arc");
    });
}

/**
  Creates a series of lines.

  @method lines

  @param {Object} data
  @param {Array} effectsArray - array of intents

  @return {Object}
*/
__$visuals.lines = function (data, effectsArray) {
  let visual = this.createVisual();

  visual.withCreateShapesCallback(vis => { // vis is an alias for the visual
    // console.log("sssss", vis.__data)
    let pairs = [];
    let currentPair = [];

    vis.__data.activeDataItems().forEach((d, index) => {
      let pairData = {
        d: d,
        index: index,
        rawValue: vis.__data.rawDataItem(index),
        _dataProperty: vis.__data.target,
      };
      currentPair.push(pairData)

      if (currentPair.length == 2) {
        pairs.push(currentPair)
        currentPair = []
        currentPair.push(pairData)
      }
    });

    pairs.forEach((pair, index) => {
      // console.log("xxx>")
      let svgShape = vis.__createSVGShapeCallback(__$visuals.currentContainer, pair);
      // console.log("xxx<")
      vis.__saveSVGShape(svgShape);
      vis.__saveSVGShapeData(svgShape, index, pair, [pair.rawValue, pair.rawValue]);
    });
  });

  visual.withData(data)
    .registerVisual(effectsArray, (container, _d) => {
      return connectedPoints(container, _d)
        .$x(0)
        .$y(0)
        .$class("line");
    });

  return visual;
}

/**
  Creates a horizontal line visual.

  @method hLine

  @param {Object} data
  @param {Array} effectsArray - array of intents

  @return {Object}
*/
__$visuals.hLine = function (effectsArray) {
  let visual = this.createVisual()

  visual.withCreateShapesCallback(visual.__defaultSingleShapeCreator)
    .registerVisual(effectsArray, (container) => {
      return hLine(container)
        .$x(0)
        .$y(0)
        .$class("line");
    });

  return visual;
}

/**
  Creates a vertical line visual.

  @method hLine

  @param {Array} effectsArray - array of intents

  @return {Object}
*/
__$visuals.vLine = function (effectsArray) {
  let visual = this.createVisual()

  visual.withCreateShapesCallback(visual.__defaultSingleShapeCreator)
    .registerVisual(effectsArray, (container) => {
      return vLine(container)
        .$x(0)
        .$y(0)
        .$class("line");
    });

  return visual;
}