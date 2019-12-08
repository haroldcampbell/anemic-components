import * as nodes from '../nodes/ancui-nodes';

import {
    createVisual,
} from './create-visual'

/**
  Creates a horizontal line visual.

  @method hLine

  @param {Array} effectsArray - array of intents

  @return {Object}
*/
export const hLine = function(effectsArray) {
    let visual = createVisual();

    visual.withCreateShapesCallback(visual.__defaultSingleShapeCreator)
        .registerVisual(effectsArray, (container) => {
            return nodes.hLine(container)
                .$x(0)
                .$y(0)
                .$class("line");
        });

    return visual;
}