import {MockNode} from "./utils"
import {$data} from "../../lib/ancui-data"
import {_$} from "../../lib/ancui-core"

import {
  $alignBottom,
  $alignRight,
  $maxHeight,
  $maxWidth,
} from "../../lib/ancui-intents"

describe("Alignment Intents", () => {
  let visuals = {};
  let data = $data([10, 20, 0]);
  let normalizedData = data.asNormalized();

  beforeEach(() => {
    visuals.$data = data;
    visuals.svgNodes = [].pumpFn(data.itemCount(), () => {
      return new MockNode();
    });
  });

  describe("$alignBottom", () => {
    beforeEach(() => {
      visuals.svgNodes.forEach((v, index) => {
        v.$y = _$._y(v);
        v.$height = _$._height(v);
        v._dataProperty = "height";
        v._dataValue = normalizedData[index];
      });
    });

    it("should set $y to null if height was not set", () => {
      $alignBottom().action(visuals);

      let svgNodes = visuals.svgNodes;
      expect(svgNodes[0].$y()).toBe(null);
      expect(svgNodes[1].$y()).toBe(null);
      expect(svgNodes[2].$y()).toBe(null);
    });

    it("should use max height to update $y", () => {
      $maxHeight(20).action(visuals);
      $alignBottom().action(visuals);

      let svgNodes = visuals.svgNodes;
      expect(svgNodes[0].$y()).toBe(10);
      expect(svgNodes[1].$y()).toBe(0);
      expect(svgNodes[2].$y()).toBe(20);
    });

    it("should use supplied yBaseline to update $y when set", () => {
      $maxHeight(20).action(visuals);
      $alignBottom(50).action(visuals);

      let svgNodes = visuals.svgNodes;
      expect(svgNodes[0].$y()).toBe(40);
      expect(svgNodes[1].$y()).toBe(30);
      expect(svgNodes[2].$y()).toBe(50);
    });
  }); /*End of alginBottom*/

  describe("$alignRight", () => {
    beforeEach(() => {
      visuals.svgNodes.forEach((v, index) => {
        v.$x = _$._x(v);
        v.$width = _$._width(v);
        v._dataProperty = "width";
        v._dataValue = normalizedData[index];
      });
    });

    it("should set $x to null if width was not set", () => {
      $alignRight().action(visuals);

      let svgNodes = visuals.svgNodes;
      expect(svgNodes[0].$x()).toBe(null);
      expect(svgNodes[1].$x()).toBe(null);
      expect(svgNodes[2].$x()).toBe(null);
    });

    it("should use max width to update $x", () => {
      $maxWidth(20).action(visuals);
      $alignRight().action(visuals);

      let svgNodes = visuals.svgNodes;
      expect(svgNodes[0].$x()).toBe(10);
      expect(svgNodes[1].$x()).toBe(0);
      expect(svgNodes[2].$x()).toBe(20);
    });

    it("should use supplied xBaseline to update $x when set", () => {
      $maxWidth(20).action(visuals);
      $alignRight(50).action(visuals);

      let svgNodes = visuals.svgNodes;
      expect(svgNodes[0].$x()).toBe(40);
      expect(svgNodes[1].$x()).toBe(30);
      expect(svgNodes[2].$x()).toBe(50);
    });
  });
});
