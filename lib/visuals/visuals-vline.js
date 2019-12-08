import * as nodes from '../nodes/ancui-nodes';

import {
  createVisual,
} from './create-visual'

/**
  Creates a vertical line visual.

  @method vLine

  @param {Array} effectsArray - array of intents

  @return {Object}
*/
export const vLine = function (effectsArray) {
  let visual = createVisual()

  visual.withCreateShapesCallback(visual.__defaultSingleShapeCreator)
    .registerVisual(effectsArray, (container) => {
      return nodes.vLine(container)
        .$x(0)
        .$y(0)
        .$class("line");
    });

  return visual;
}

