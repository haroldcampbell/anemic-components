import {
    arc,
} from '../nodes/ancui-nodes';

import {
    createVisual,
} from './create-visual'

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