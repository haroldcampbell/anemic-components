import {
    connectedPoints,
    path,
    arc,
} from '../nodes/ancui-nodes';

import {
    addShapeNode,
} from '../ancui-dom';

import {
    addPointNode,
} from '../nodes/nodes-utils';

import {
    createVisual,
} from './create-visual'

/**
 *  Creates a polygon with a series of points.
 *
 *  The Polygon is a group of  points radiating from the center.
 *  The radius or span can be represented by the data.
 *
 *  Note: The style intents don't currently work on this visual.
 *
 *  @method polygon
 *
 *  @param {Object} data
 *  @param {Array} effectsArray - array of intents
 *
 *  @return {Object}
 */
export const polygon = function (data, effectsArray) {
    let visual = createVisual();

    // change the shape creator for the visual to a custom shape creator
    visual.withCreateShapesCallback(vis => { // vis is an alias for the visual
        const data = visual.getData();

        if (data.activeDataItems().length < 3) {
            return;
        }

        data.activeDataItems().forEach((d, index) => {
            const rawDataItem = data.rawDataItem(index);
            let svgShape = visual.__createSVGShapeCallback(visual.container);

            visual.__saveSVGShape(svgShape);
            visual.__saveSVGShapeData(svgShape, index, d, rawDataItem);
        });
    });

    visual.onFinalizeRender = () => {
        const node = path(visual.container, "")
        const [first, ...rest] = visual.svgNodes

        let _path = [
            `M ${first.__arcEnd().x},${first.__arcEnd().y}`,
        ];

        rest.forEach(s => {
            const point = s.__arcEnd();
            _path.push(`${point.x},${point.y}`);
        });

        _path.push("z")
        _path = _path.join(" ");

        node.$d(_path);
        node.$class("polygon");
    };

    visual.withData(data)
        .registerVisual(effectsArray, (container) => {
            const node = addPointNode();
            /* We only need the point nodes so that we can
            apply the calculations based on the effects. */
            node.$x(0);
            node.$y(0);

            return node
        });

    return visual;
}