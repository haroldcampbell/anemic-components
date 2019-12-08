import {
    createVisual,
} from './create-visual'

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