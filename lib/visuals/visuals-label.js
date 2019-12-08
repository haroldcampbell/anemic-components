import {
    text,
} from '../nodes/ancui-nodes';

import {
    createVisual,
} from './create-visual'

/**
 * Describes a visual that contains a single label.
 *
 * @method label
 *
 * @param {String} textContent - The text that will be displayed
 * @param {*} effectsArray
 *
 * @return {Object} the newly created visual
 */
export const label = function (textContent, effectsArray) {
    let visual = createVisual();

    visual.withCreateShapesCallback(visual.__defaultSingleShapeCreator)
        .registerVisual(effectsArray, (container) => {
            return text(container)
                .$x(0)
                .$y(0)
                .$text(textContent)
                .$class("text label");
        });

    return visual
}