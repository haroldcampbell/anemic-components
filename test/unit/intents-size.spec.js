import {createMockedVisual} from "./utils"
import {$data} from "../../lib/ancui-data"
import {rect} from "../../lib/ancui-core-rect"

import {
  $width,
  $height,
  $max,
  $maxWidth,
  $maxHeight,
  $maxY,
  $maxStrokeWidth
} from "../../lib/ancui-intents"

import {
  $maxDiameter,
} from "../../lib/ancui-intents-ellipses"

describe("Size Intents", () => {
  let visual = null;
  let data = $data([1]);

  beforeEach(() => {
    visual = createMockedVisual(rect, data);
  });

  it("should set $width on visual", () => {
    $width(150).action(visual);

    expect(visual.svgNodes[0].$width()).toBe(150);
  });

  it("should set $height visual", () => {
    $height(150).action(visual);

    expect(visual.svgNodes[0].$height()).toBe(150);
  });

  describe("[that use a dataValue]", () => {
    data = $data([1, 2, 4]);

    beforeEach(() => {
      visual.withData(data);
      visual.createShapes();
    });

    it("should set the $maxHeight", () => {
      $height(100).action(visual);

      expect(visual.svgNodes[0].$height()).toBe(100);
      expect(visual.svgNodes[1].$height()).toBe(100);
      expect(visual.svgNodes[2].$height()).toBe(100);
    });

    it("should set the $maxWidth", () => {
      $width(100).action(visual);

      expect(visual.svgNodes[0].$width()).toBe(100);
    });

    it("should set $max size", () => {
      $max(100).action(visual);

      const svgNodes = visual.svgNodes;
      expect(svgNodes[0].$width()).toBe(25);
      expect(svgNodes[0].$height()).toBe(25);

      expect(svgNodes[1].$width()).toBe(50);
      expect(svgNodes[1].$height()).toBe(50);

      expect(svgNodes[2].$width()).toBe(100);
      expect(svgNodes[2].$height()).toBe(100);
    });

    it("should set $maxY", () => {
      visual.svgNodes.forEach((v) => {
        v._dataProperty = "y";
      });

      $maxY(100).action(visual);

      expect(visual.svgNodes[0].$y()).toBe(25);
      expect(visual.svgNodes[1].$y()).toBe(50);
      expect(visual.svgNodes[2].$y()).toBe(100);
    });

    it("$maxDiameter", () => {
      visual.svgNodes.forEach((v) => {
        v._dataProperty = "diameter";
      });

      $maxDiameter(100).action(visual);

      let svgNodes = visual.svgNodes;
      expect(svgNodes[0].$width()).toBe(12.5);
      expect(svgNodes[0].$height()).toBe(12.5);

      expect(svgNodes[1].$width()).toBe(25);
      expect(svgNodes[1].$height()).toBe(25);

      expect(svgNodes[2].$width()).toBe(50);
      expect(svgNodes[2].$height()).toBe(50);
    });

    it("$maxStrokeWidth", () => {
      visual.svgNodes.forEach((v) => {
        v._dataProperty = "strokeWidth";
      });

      $maxStrokeWidth(30).action(visual);

      expect(visual.svgNodes[0].$strokeWidth()).toBe(7.5);
      expect(visual.svgNodes[1].$strokeWidth()).toBe(15);
      expect(visual.svgNodes[2].$strokeWidth()).toBe(30);
    });

    it("$maxHeight", () => {
      visual.svgNodes.forEach((v) => {
        v._dataProperty = "height";
      });

      $maxHeight(30).action(visual);

      expect(visual.svgNodes[0].$height()).toBe(7.5);
      expect(visual.svgNodes[1].$height()).toBe(15);
      expect(visual.svgNodes[2].$height()).toBe(30);
    });

    it("$maxWidth", () => {
      visual.svgNodes.forEach((v) => {
        v._dataProperty = "width";
      });

      $maxWidth(30).action(visual);

      expect(visual.svgNodes[0].$width()).toBe(7.5);
      expect(visual.svgNodes[1].$width()).toBe(15);
      expect(visual.svgNodes[2].$width()).toBe(30);
    });
  });
});
