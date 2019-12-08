import {
    addEmptyShape,
} from '../ancui-dom'
import {
    createVisual,
} from './create-visual'

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
            return addEmptyShape();
        });
}