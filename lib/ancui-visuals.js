import {
  ellipse,
  path,
  rect,
  text,
  vLine,
  hLine,
  arc,
  connectedPoints,

} from './nodes/ancui-nodes';

import {
  createVisual,
} from './ancui-pipeline'

/**
  An empty, noop visual.

  @method empty

  @param {Object} data
  @param {Array} effectsArray - array of intents

  @return {Object}
*/
export const empty = function (data, effectsArray) {
  return createVisual()
    .withData(data)
    .registerVisual(effectsArray, (container) => {
      return {};
    });
}

/**
  Creates an wrapper visual around the specified shape.

  @method wrappedShape

  @param {Object} shape - an Ancui shape that will be initialized
  @param {Object} data
  @param {Array} effectsArray - array of intents

  @return {Object}
 */

export const wrappedShape = function (shape, data, effectsArray) {
  return createVisual()
    .withData(data)
    .registerVisual(effectsArray, (container) => {
      return shape(container);
    });
}

/**
  Describes the bar visuals.

  @method bars

  @param {Object} data
  @param {Array} effectsArray - array of intents

  @return {Object}
 */
export const bars = function (data, effectsArray) {
  return createVisual()
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
export const ellipses = function (data, effectsArray) {
  return createVisual()
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
export const connectingLines = function (data, effectsArray) {
  return createVisual()
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
export const arcs = function (data, effectsArray) {
  return createVisual()
    .withData(data)
    .registerVisual(effectsArray, (container) => {
      return arc(container)
        .$class("arc");
    });
}

// __$visuals.globalSettings = function (effectsArray) {
//   return this.registerGlobalSetting(effectsArray, (container) => {
//     return {};
//   });
// }

// export const label = function (textContent, effectsArray) {
//   let visual = createVisual()

//   visual.withCreateShapesCallback(visual.__defaultSingleShapeCreator)
//     .registerVisual(effectsArray, (container) => {
//       return text(container)
//         .$x(0)
//         .$y(0)
//         .$text(textContent)
//         .$class("text label");
//     });

//   return visual
// }

// export const labels = function (data, effectsArray) {
//   return createVisual()
//     .withData(data)
//     .registerVisual(effectsArray, (container) => {
//       return text(container)
//         .$x(0)
//         .$y(0)
//         .$class("text labels");
//     });
// }

// /**
//   Creates a series of lines.

//   @method lines

//   @param {Object} data
//   @param {Array} effectsArray - array of intents

//   @return {Object}
// */
// __$visuals.lines = function (data, effectsArray) {
//   let visual = this.createVisual();

//   // change the shape creator for the visual to a custom shape creator
//   visual.withCreateShapesCallback(vis => { // vis is an alias for the visual
//     if (vis.__data.activeDataItems().length <= 1) {
//       return
//     }

//     // console.log("sssss", vis.__data)
//     let pairs = [];
//     //let currentPair = [];

//     /*vis.__data.activeDataItems().forEach((d, index) => {
//       let pairData = {
//         d: d,
//         index: index,
//         rawValue: vis.__data.rawDataItem(index),
//         _dataProperty: vis.__data.target,
//       };
//       currentPair.push(pairData)

//       if (currentPair.length == 2) {
//         pairs.push(currentPair)
//         currentPair = []
//         currentPair.push(pairData)
//       }
//     });*/
//     pairs = vis.__data.collectTuples(2);
//     pairs.forEach((pair, index) => {
//       // console.log("xxx>")
//       let svgShape = vis.__createSVGShapeCallback(__$visuals.currentContainer, pair);
//       // console.log("xxx<")
//       vis.__saveSVGShape(svgShape);
//       //vis.__saveSVGShapeData(svgShape, index, pair, [pair.rawValue, pair.rawValue]);
//       vis.__saveSVGShapeData(svgShape, index, pair, pair.map(p => p.rawValue));
//     });
//   });

//   visual.withData(data)
//     .registerVisual(effectsArray, (container, _d) => {
//       return connectedPoints(container, _d)
//         .$x(0)
//         .$y(0)
//         .$class("line");
//     });

//   return visual;
// }

// /**
//   Creates a horizontal line visual.

//   @method hLine

//   @param {Object} data
//   @param {Array} effectsArray - array of intents

//   @return {Object}
// */
// __$visuals.hLine = function (effectsArray) {
//   let visual = this.createVisual()

//   visual.withCreateShapesCallback(visual.__defaultSingleShapeCreator)
//     .registerVisual(effectsArray, (container) => {
//       return hLine(container)
//         .$x(0)
//         .$y(0)
//         .$class("line");
//     });

//   return visual;
// }

// /**
//   Creates a vertical line visual.

//   @method hLine

//   @param {Array} effectsArray - array of intents

//   @return {Object}
// */
// __$visuals.vLine = function (effectsArray) {
//   let visual = this.createVisual()

//   visual.withCreateShapesCallback(visual.__defaultSingleShapeCreator)
//     .registerVisual(effectsArray, (container) => {
//       return vLine(container)
//         .$x(0)
//         .$y(0)
//         .$class("line");
//     });

//   return visual;
// }