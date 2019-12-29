import {
  radialLine,
} from '../nodes/ancui-nodes';

import {
  createVisual,
} from './create-visual'

/**
  Creates a series of lines with a common center

  @method radialLines

  @param {Object} data
  @param {Array} effectsArray - array of intents

  @return {Object}
*/
export const radialLines = function (data, effectsArray) {
  return createVisual()
  .withData(data)
    .registerVisual(effectsArray, (container) => {
      return radialLine(container)
        .$x(0)
        .$y(0)
        .$class("radial-line")
    });
}
