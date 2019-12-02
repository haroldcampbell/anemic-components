import {
  createMockedVisual
} from "../utils"
import {
  ellipse
} from "../../lib/nodes/nodes-ellipse"
import {
  $xOffset,
  $yOffset,
  $width,
  $height,
} from "../../lib/intents/intents-core"
import {
  $rx,
  $ry,
  $cxOffset,
  $cyOffset,
} from '../../lib/intents/intents-ellipses'

import {
  $data
} from "../../lib/ancui-data"

import test from "tape"

const setupFixture = t => {
  const data = $data([10, 20, 0, 10]);
  const visual = createMockedVisual(ellipse, data);

  return {
    data: data,
    visual: visual
  };
};

test("$ry() causes $cxOffset to update $cx", t => {
  const visual = setupFixture().visual;

  $rx(10).action(visual); // $cxOffset depends on rx being set
  $cxOffset(10).action(visual);

  let svgNodes = visual.svgNodes
  let expectedCXValues = [10, 40, 70, 100]
  let actualCXValues = [
    svgNodes[0].$cx(),
    svgNodes[1].$cx(),
    svgNodes[2].$cx(),
    svgNodes[3].$cx()
  ];

  t.deepEqual(actualCXValues, expectedCXValues, "$cxOffset should update $cx when $rx is set");
  t.end()
});

test("$ry() causes $cyOffset should update $cy", t => {
  const visual = setupFixture().visual;

  $ry(10).action(visual); // $cyOffset depends on ry being set
  $cyOffset(10).action(visual);

  let svgNodes = visual.svgNodes
  let expectedCYValues = [10, 40, 70, 100]
  let actualCYValues = [
    svgNodes[0].$cy(),
    svgNodes[1].$cy(),
    svgNodes[2].$cy(),
    svgNodes[3].$cy()
  ];

  t.deepEqual(actualCYValues, expectedCYValues, "$cyOffset should update $cy when $ry is set");
  t.end()
});

test("Unset $rx() causes $cxOffset() to update $cx()", t => {
  const visual = setupFixture().visual;

  $cxOffset(10).action(visual);

  let svgNodes = visual.svgNodes
  let expectedCXValues = [0, 10, 20, 30];
  let actualCXValues = [
    svgNodes[0].$cx(),
    svgNodes[1].$cx(),
    svgNodes[2].$cx(),
    svgNodes[3].$cx(),
  ];

  t.deepEqual(actualCXValues, expectedCXValues, "$cxOffset() should update $cx() when $rx() is NOT set");
  t.end()
});

test("Unset $ry() causes $cyOffset() to update $cy()", t => {
  const visual = setupFixture().visual;

  $cyOffset(10).action(visual);

  let svgNodes = visual.svgNodes
  let expectedCYValues = [0, 10, 20, 30];
  let actualCYValues = [
    svgNodes[0].$cy(),
    svgNodes[1].$cy(),
    svgNodes[2].$cy(),
    svgNodes[3].$cy(),
  ];

  t.deepEqual(actualCYValues, expectedCYValues, "$cyOffset should update $cy when $ry is NOT set");
  t.end()
});

test("$xOffset() should update $x() when $width() is set", t => {
  const visual = setupFixture().visual;

  $width(10).action(visual); // $xOffset depends on the width to be set
  $xOffset(10).action(visual);

  let svgNodes = visual.svgNodes
  const expectedXValues = [null, 20, 40, 60];
  const actualXValues = [
    svgNodes[0].$x(),
    svgNodes[1].$x(),
    svgNodes[2].$x(),
    svgNodes[3].$x(),
  ];

  t.deepEqual(actualXValues, expectedXValues);
  t.end()
});

test("$yOffset() should update $y() when $height() is set", t => {
  const visual = setupFixture().visual;

  $height(10).action(visual); // $yOffset depends on the height to be set
  $yOffset(10).action(visual);

  let svgNodes = visual.svgNodes
  const expectedYValues = [null, 20, 40, 60];
  const actualYValues = [
    svgNodes[0].$y(),
    svgNodes[1].$y(),
    svgNodes[2].$y(),
    svgNodes[3].$y(),
  ];

  t.deepEqual(actualYValues, expectedYValues);
  t.end()
});

test("$xOffset should update $x when $width is NOT set", t => {
  const visual = setupFixture().visual;

  $xOffset(10).action(visual);

  let svgNodes = visual.svgNodes
  const expectedXValues = [null, 10, 20, 30];
  const actualXValues = [
    svgNodes[0].$x(),
    svgNodes[1].$x(),
    svgNodes[2].$x(),
    svgNodes[3].$x(),
  ];

  t.deepEqual(actualXValues, expectedXValues);
  t.end()
});

test("$yOffset should update $y when $height is NOT set", t => {
  const visual = setupFixture().visual;

  $yOffset(10).action(visual);

  let svgNodes = visual.svgNodes
  const expectedYValues = [null, 10, 20, 30];
  const actualYValues = [
    svgNodes[0].$y(),
    svgNodes[1].$y(),
    svgNodes[2].$y(),
    svgNodes[3].$y(),
  ];

  t.deepEqual(actualYValues, expectedYValues);
  t.end()
});