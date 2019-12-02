import {
  createMockedVisual
} from "../utils"
import {
  $data
} from "../../lib/ancui-data"
import {
  _$
} from "../../lib/ancui-core"
import {
  rect
} from "../../lib/nodes/nodes-rect"

import {
  $alignBottom,
  $alignRight,
  $maxHeight,
  $maxWidth,
} from "../../lib/intents/ancui-intents"

import test from "tape"

const setupFixture = () => {
  const data = $data([10, 20, 0]);
  const visual = createMockedVisual(rect, data);

  return {
    data: data,
    visual: visual
  };
};

test("Alignment intents", testCase => {
  testCase.test("$alignBottom() to update $y()", t => {
    const visual = setupFixture().visual;

    $alignBottom().action(visual);

    let svgNodes = visual.svgNodes;
    const actualValues = [20, 20, 20];
    const expectedValues = [
      svgNodes[0].$y(),
      svgNodes[1].$y(),
      svgNodes[2].$y(),
    ];
    t.deepEqual(expectedValues, actualValues, "$alignBottom should set $y to be max data value 0 if baseline height was not set");
    t.end();
  });

  test("$alignRight() to update $x()", t => {
    const visual = setupFixture().visual;

    $alignRight().action(visual);

    let svgNodes = visual.svgNodes;
    const actualValues = [20, 20, 20];
    const expectedValues = [
      svgNodes[0].$x(),
      svgNodes[1].$x(),
      svgNodes[2].$x(),
    ];
    t.deepEqual(expectedValues, actualValues, "$alignRight should set $x to be max data value if baseline width was not set");
    t.end();
  });
});

test("Alignment Intents $alignBottom", testCase => {
  testCase.test("$maxHeight() to update $y()", t => {
    const visual = setupFixture().visual;

    $maxHeight(20).action(visual);
    $alignBottom().action(visual);

    let svgNodes = visual.svgNodes;
    const actualValues = [10, 0, 20];
    const expectedValues = [
      svgNodes[0].$y(),
      svgNodes[1].$y(),
      svgNodes[2].$y(),
    ];
    t.deepEqual(expectedValues, actualValues, "should use max height to update $y");
    t.end();
  });

  testCase.test("yBaseline to update $y()", t => {
    const visual = setupFixture().visual;

    $maxHeight(20).action(visual);
    $alignBottom(50).action(visual);

    let svgNodes = visual.svgNodes;
    const actualValues = [40, 30, 50];
    const expectedValues = [
      svgNodes[0].$y(),
      svgNodes[1].$y(),
      svgNodes[2].$y(),
    ];
    t.deepEqual(expectedValues, actualValues, "should use supplied yBaseline to update $y when set");
    t.end();
  });
});

test("Alignment Intents $alignRight", testCase => {
  testCase.test("$maxWidth() to update $x()", t => {
    const visual = setupFixture().visual;

    $maxWidth(20).action(visual);
    $alignRight().action(visual);

    let svgNodes = visual.svgNodes;
    t.equal(svgNodes[0].$x(), 10);
    t.equal(svgNodes[1].$x(), 0);
    t.equal(svgNodes[2].$x(), 20);
    const actualValues = [10, 0, 20];
    const expectedValues = [
      svgNodes[0].$x(),
      svgNodes[1].$x(),
      svgNodes[2].$x(),
    ];
    t.deepEqual(expectedValues, actualValues, "should use max width to update $x");
    t.end();
  });

  testCase.test("xBaseline to update $x()", t => {
    const visual = setupFixture().visual;

    $maxWidth(20).action(visual);
    $alignRight(50).action(visual);

    let svgNodes = visual.svgNodes;
    const actualValues = [40, 30, 50];
    const expectedValues = [
      svgNodes[0].$x(),
      svgNodes[1].$x(),
      svgNodes[2].$x(),
    ];
    t.deepEqual(expectedValues, actualValues, "should use supplied xBaseline to update $x when set");
    t.end();
  });
});