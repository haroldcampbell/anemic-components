import {MockNode, createMockedVisual} from "./utils"
import {$data} from "../../lib/ancui-data"
import {_$} from "../../lib/ancui-core"
import {rect} from "../../lib/ancui-core"

import {
  $alignBottom,
  $alignRight,
  $maxHeight,
  $maxWidth,
} from "../../lib/ancui-intents"

describe("Alignment Intents", () => {
  let visual = null;
  let data = $data([10, 20, 0]);

  beforeEach(() => {
    visual = createMockedVisual(rect, data)
  });

  describe("$alignBottom", () => {
    beforeEach(() => {
      visual.svgNodes.forEach((v, index) => {
        v._dataProperty = "height";
      });
    });

    it("should set $y to null if height was not set", () => {
      $alignBottom().action(visual);

      let svgNodes = visual.svgNodes;
      expect(svgNodes[0].$y()).toBe(null);
      expect(svgNodes[1].$y()).toBe(null);
      expect(svgNodes[2].$y()).toBe(null);
    });

    it("should use max height to update $y", () => {
      $maxHeight(20).action(visual);
      $alignBottom().action(visual);

      let svgNodes = visual.svgNodes;
      expect(svgNodes[0].$y()).toBe(10);
      expect(svgNodes[1].$y()).toBe(0);
      expect(svgNodes[2].$y()).toBe(20);
    });

    it("should use supplied yBaseline to update $y when set", () => {
      $maxHeight(20).action(visual);
      $alignBottom(50).action(visual);

      let svgNodes = visual.svgNodes;
      expect(svgNodes[0].$y()).toBe(40);
      expect(svgNodes[1].$y()).toBe(30);
      expect(svgNodes[2].$y()).toBe(50);
    });
  }); /*End of alginBottom*/

  describe("$alignRight", () => {
    beforeEach(() => {
      visual.svgNodes.forEach((v, index) => {
        v._dataProperty = "width";
      });
    });

    it("should set $x to null if width was not set", () => {
      $alignRight().action(visual);

      let svgNodes = visual.svgNodes;
      expect(svgNodes[0].$x()).toBe(null);
      expect(svgNodes[1].$x()).toBe(null);
      expect(svgNodes[2].$x()).toBe(null);
    });

    it("should use max width to update $x", () => {
      $maxWidth(20).action(visual);
      $alignRight().action(visual);

      let svgNodes = visual.svgNodes;
      expect(svgNodes[0].$x()).toBe(10);
      expect(svgNodes[1].$x()).toBe(0);
      expect(svgNodes[2].$x()).toBe(20);
    });

    it("should use supplied xBaseline to update $x when set", () => {
      $maxWidth(20).action(visual);
      $alignRight(50).action(visual);

      let svgNodes = visual.svgNodes;
      expect(svgNodes[0].$x()).toBe(40);
      expect(svgNodes[1].$x()).toBe(30);
      expect(svgNodes[2].$x()).toBe(50);
    });
  });
});
