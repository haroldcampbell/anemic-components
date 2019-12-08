import {
    lines,
} from "../../lib/visuals/ancui-visuals"
import {
    $data
} from "../../lib/data/ancui-data"
import {
    container
} from "../../lib/ancui-pipeline"

import * as intents from "../../lib/intents/ancui-intents"
import * as utils from "../utils"

import test from "tape"

const setupFixtures = () => {
    const offset = 20;
    const rawData = [10, 20, 15, 25]
    const parentElement = new utils.MockHTMLNode();

    return {
        offset,
        rawData,
        parentElement: parentElement,
        // These are affect the specified data target
        // e.g. $data(..., "y") or $data(..., "x")
        dependentValues: [
            [rawData[0], rawData[1]], // Line 1
            [rawData[1], rawData[2]], // Line 2
            [rawData[2], rawData[3]] // Line 3
        ],

        // These are the values being offset by $width() or $height()
        independentValues: [
            [offset * 0, offset * 1], // Line 1, e.g. [x1, x2] where x2: x1 + width
            [offset * 1, offset * 2], // Line 2
            [offset * 2, offset * 3], // Line 3
        ]
    };
};

test("lines visual", testCase => {
    testCase.test("add paths to svgNode", t => {
        const fixture = setupFixtures();

        const visuals = [
            lines($data(fixture.rawData, "y"), [])
        ];

        const visualsCallback = _ => {
            _.addVisuals(visuals)
        }

        container("test", visualsCallback, fixture.parentElement)
        const svgNode = fixture.parentElement.childNodes[0];
        const expectedValue = fixture.rawData.length - 1;

        t.equal(svgNode.childNodes.length, expectedValue, "the number of lines visuals should be less than the number of data points");
        t.end();
    });

    testCase.test("y-properties lines connected", t => {
        const fixture = setupFixtures();

        /** Intents are order-aware */
        const visuals = [
            lines($data(fixture.rawData, "y"), [
                intents.$x(0),
                intents.$xIncrement(fixture.offset), // x1 and x2 are both incremented
                intents.$width(fixture.offset), // x2 is then updated
                intents.$maxHeight(25) // scales the max y to this value, which is itself 25 :)
            ])
        ];

        const visualsCallback = _ => {
            _.addVisuals(visuals)
        }

        container("test", visualsCallback, fixture.parentElement)
        const svgNode = fixture.parentElement.childNodes[0];
        const expectedYValues = fixture.dependentValues // Pairs of y1 and y2 values
        const actualYValues = Array.from(svgNode.childNodes).map(l => [l.$y1(), l.$y2()])

        const expectedXValues = fixture.independentValues // Pairs of x1 and x2 values
        const actualXValues = Array.from(svgNode.childNodes).map(l => [l.$x1(), l.$x2()])

        t.deepEqual(actualYValues, expectedYValues, "y values should be set")
        t.deepEqual(actualXValues, expectedXValues, "x values should be set")
        t.end();
    });

    testCase.test("x-properties lines connected", t => {
        const fixture = setupFixtures();

        /** Intents are order-aware */
        const visuals = [
            lines($data(fixture.rawData, "x"), [
                intents.$y(0),
                intents.$yIncrement(fixture.offset), // y1 and y2 are both incremented
                intents.$height(fixture.offset), // y2 is then updated
                intents.$maxWidth(25) // scales the max x to this value, which is itself 25 :)
            ])
        ];

        const visualsCallback = _ => {
            _.addVisuals(visuals)
        }

        container("test", visualsCallback, fixture.parentElement)
        const svgNode = fixture.parentElement.childNodes[0];
        const expectedYValues = fixture.dependentValues // Pairs of x1 and x2 values
        const actualYValues = Array.from(svgNode.childNodes).map(l => [l.$x1(), l.$x2()])

        const expectedXValues = fixture.independentValues // Pairs of y1 and y2 values
        const actualXValues = Array.from(svgNode.childNodes).map(l => [l.$y1(), l.$y2()])

        t.deepEqual(actualYValues, expectedYValues, "y values should be set")
        t.deepEqual(actualXValues, expectedXValues, "x values should be set")
        t.end();
    });
});