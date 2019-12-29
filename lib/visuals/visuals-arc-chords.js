
import {
    chord,
} from '../nodes/ancui-nodes';

import {
    createVisual,
} from './create-visual'

/**
  Creates a series of disjoint chords.

  @method chords

  @param {Object} data
  @param {Array} effectsArray - array of intents

  @return {Object}
*/
export const chords = function (data, effectsArray) {
    return createVisual()
        .withData(data)
        .registerVisual(effectsArray, (container) => {
            return chord(container)
                .$class("chord");
        });
}