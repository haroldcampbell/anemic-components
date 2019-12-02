import {
  $x,
  $y
} from '../../lib/intents/intents-core'
import {
  $rx,
  $ry
} from '../../lib/intents/intents-ellipses'
import {
  $data
} from "../../lib/ancui-data"
import {
  createMockedVisual
} from "../utils"
import {
  ellipse
} from "../../lib/nodes/nodes-ellipse"

import test from "tape"

const setupFixture = () => {
  const data = $data([10, 20, 0, 10]);
  const visual = createMockedVisual(ellipse, data);

  return {
    data: data,
    visual: visual
  };
};


test("Position Intents", testCase => {
  testCase.test("$x", t => {
    const visual = setupFixture().visual;

    $x(1).action(visual);
    t.equal(visual.svgNodes[0].$x(), 1, "should set x value with $x");
    t.end()
  });

  testCase.test("$y", t => {
    const visual = setupFixture().visual;

    $y(1).action(visual);
    t.equal(visual.svgNodes[0].$y(), 1, "should set y value with $y");
    t.end()
  });

  testCase.test("$rx should update visual.$rx", t => {
    const visual = setupFixture().visual;

    $rx(10).action(visual);
    let svgNodes = visual.svgNodes
    const expectedValues = [10, 10, 10, 10];
    const actualValues = [
      svgNodes[0].$rx(),
      svgNodes[1].$rx(),
      svgNodes[2].$rx(),
      svgNodes[3].$rx(),
    ];
    t.deepEqual(actualValues, expectedValues, "$rx should update visual.$rx");
    t.end()
  });

  testCase.test("$ry should update visual.$ry", t => {
    const visual = setupFixture().visual;
    $ry(10).action(visual);

    let svgNodes = visual.svgNodes
    const expectedValues = [10, 10, 10, 10];
    const actualValues = [
      svgNodes[0].$ry(),
      svgNodes[1].$ry(),
      svgNodes[2].$ry(),
      svgNodes[3].$ry(),
    ];
    t.deepEqual(actualValues, expectedValues, "$ry should update visual.$ry");
    t.end()
  });
});