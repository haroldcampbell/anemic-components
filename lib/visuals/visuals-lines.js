import {
  connectedPoints,
} from '../nodes/ancui-nodes';

import {
  createVisual,
} from './create-visual'

/**
  Creates a series of lines.

  @method lines

  @param {Object} data
  @param {Array} effectsArray - array of intents

  @return {Object}
*/
export const lines = function (data, effectsArray) {
  let visual = createVisual();

  // change the shape creator for the visual to a custom shape creator
  visual.withCreateShapesCallback(vis => { // vis is an alias for the visual
    if (vis.getDataTarget() != "y" && vis.getDataTarget() != "x") {
        console.log("vis.getDataTarget():", vis.getDataTarget());
        throw new Error("$data() targetAttr not set. Must be 'y' or 'x'.");
    }

    if (vis.getData().activeDataItems().length <= 1) {
      return
    }

    let pairs = vis.getData().collectTuples(2);
    pairs.forEach((pair, index) => {
      let svgShape = vis.__createSVGShapeCallback(vis.container, pair);
      vis.__saveSVGShape(svgShape);
      vis.__saveSVGShapeData(svgShape, index, pair, pair.map(p => p.rawValue));
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
