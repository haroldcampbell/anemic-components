import {
    text,
} from '../nodes/ancui-nodes';

import {
    createVisual,
} from './create-visual'

/**
 * A visual that is a series of labels.
 *
 * @method label
 *
 * @param {*} data - The text that will be displayed
 * @param {*} effectsArray
 *
 * @return {Object} the newly created visual
 */
export const labels = function (data, effectsArray) {
    return createVisual()
        .withData(data)
        .registerVisual(effectsArray, (container) => {
            return text(container)
                .$x(0)
                .$y(0)
                .$class("text labels");
        });
}