import {
  createMockedVisual
} from "../utils"
import {
  $data
} from "../../lib/ancui-data"
import {
  rect
} from "../../lib/nodes/nodes-rect"

import {
  $width,
  $height,
  $max,
  $maxWidth,
  $maxHeight,
  $maxY,
  $maxStrokeWidth
} from "../../lib/intents/intents-core"

import {
  $maxDiameter,
} from "../../lib/intents/intents-ellipses"

import test from "tape"

const setupShapedFixture = t => {
  const data = $data([1, 2, 4]);
  const visual = createMockedVisual(rect, data);

  return {
    data: data,
    visual: visual,
  };
};

test("Size intents", testCase => {
  testCase.test("$width() visual", t => {
    const visual = setupShapedFixture().visual;

    $width(100).action(visual);

    const expectedValues = [100, 100, 100];
    const actualValues = [
      visual.svgNodes[0].$width(),
      visual.svgNodes[1].$width(),
      visual.svgNodes[2].$width(),
    ];

    t.deepEqual(actualValues, expectedValues, "should set the $width()");
    t.end();
  });

  testCase.test("$height() visual", t => {
    const visual = setupShapedFixture().visual;

    $height(100).action(visual);

    const expectedValues = [100, 100, 100];
    const actualValues = [
      visual.svgNodes[0].$height(),
      visual.svgNodes[1].$height(),
      visual.svgNodes[2].$height(),
    ];

    t.deepEqual(actualValues, expectedValues, "should set the $height()");
    t.end();
  });

  testCase.test("Size intents: $max() visual", t => {
    const visual = setupShapedFixture().visual;

    $max(100).action(visual);

    const svgNodes = visual.svgNodes;
    const expectedWidths = [25, 50, 100];
    const actualWidths = [
      svgNodes[0].$width(),
      svgNodes[1].$width(),
      svgNodes[2].$width(),
    ];

    const expectedHeights = [25, 50, 100];
    const actualHeights = [
      svgNodes[0].$height(),
      svgNodes[1].$height(),
      svgNodes[2].$height(),
    ];
    t.deepEqual(expectedWidths, actualWidths, "$max() should set $width()");
    t.deepEqual(actualHeights, expectedHeights, "$max() should set $height()");

    t.end();
  });

  testCase.test("Size intents: $maxY() visual", t => {
    const visual = setupShapedFixture().visual;

    $maxY(100).action(visual);

    t.equal(visual.svgNodes[0].$y(), 25);
    t.equal(visual.svgNodes[1].$y(), 50);
    t.equal(visual.svgNodes[2].$y(), 100);
    t.end();
  });

  testCase.test("Size intents: $maxDiameter() visual", t => {
    const visual = setupShapedFixture().visual;

    $maxDiameter(100).action(visual);

    let svgNodes = visual.svgNodes;
    t.equal(svgNodes[0].$width(), 12.5);
    t.equal(svgNodes[0].$height(), 12.5);

    t.equal(svgNodes[1].$width(), 25);
    t.equal(svgNodes[1].$height(), 25);

    t.equal(svgNodes[2].$width(), 50);
    t.equal(svgNodes[2].$height(), 50);
    t.end();
  });

  testCase.test("Size intents: $maxStrokeWidth() visual", t => {
    const visual = setupShapedFixture().visual;

    $maxStrokeWidth(30).action(visual);

    t.equal(visual.svgNodes[0].$strokeWidth(), 7.5);
    t.equal(visual.svgNodes[1].$strokeWidth(), 15);
    t.equal(visual.svgNodes[2].$strokeWidth(), 30);
    t.end();
  });

  testCase.test("Size intents: $maxHeight visual", t => {
    const visual = setupShapedFixture().visual;

    $maxHeight(30).action(visual);

    t.equal(visual.svgNodes[0].$height(), 7.5);
    t.equal(visual.svgNodes[1].$height(), 15);
    t.equal(visual.svgNodes[2].$height(), 30);
    t.end();
  });

  testCase.test("Size intents: $maxWidth visual", t => {
    const visual = setupShapedFixture().visual;

    $maxWidth(30).action(visual);

    t.equal(visual.svgNodes[0].$width(), 7.5);
    t.equal(visual.svgNodes[1].$width(), 15);
    t.equal(visual.svgNodes[2].$width(), 30);
    t.end();
  });
});