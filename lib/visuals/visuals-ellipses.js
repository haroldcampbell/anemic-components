import {
  ellipse,
} from '../nodes/ancui-nodes';

import {
  createVisual,
} from './create-visual'

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