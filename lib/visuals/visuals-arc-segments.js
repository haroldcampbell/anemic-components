import {
    segment,
} from '../nodes/ancui-nodes';

import {
    createVisual,
} from './create-visual'

/**
  Creates a series of disjoint segments.

  @method arcs

  @param {Object} data
  @param {Array} effectsArray - array of intents

  @return {Object}
*/
export const segments = function (data, effectsArray) {
    return createVisual()
        .withData(data)
        .registerVisual(effectsArray, (container) => {
            return segment(container)
                .$class("segment");
        });
}