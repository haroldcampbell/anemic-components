import {
    rect
} from '../nodes/ancui-nodes';

import {
    createVisual,
} from './create-visual'

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