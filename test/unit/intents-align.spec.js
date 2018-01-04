import {createMockedVisual, extendIntentObj} from "./utils"
import {$data} from "../../lib/ancui-data"
import {rect, getIntents} from "../../lib/ancui-core"

/* Explicity called to force the binding of __intents.internal */
export * from "../../lib/ancui-intents"

describe("Alignment Intents", () => {
  let visual;
  let localIntents;
  let data = $data([10, 20, 0]);

  beforeEach(() => {
    visual = createMockedVisual(rect, data)
  });

  describe("$alignBottom", () => {
    beforeEach(() => {
      localIntents = extendIntentObj(getIntents())
      visual.svgNodes.forEach((v, index) => {
        v._dataProperty = "height";
      });
    });

    it("should set $y to null if height was not set", () => {
      localIntents.$alignBottom().action(visual);

      let svgNodes = visual.svgNodes;
      expect(svgNodes[0].$y()).toBe(null);
      expect(svgNodes[1].$y()).toBe(null);
      expect(svgNodes[2].$y()).toBe(null);
    });

    it("should use max height to update $y", () => {
      localIntents.$maxHeight(20).action(visual);
      localIntents.$alignBottom().action(visual);

      let svgNodes = visual.svgNodes;
      expect(svgNodes[0].$y()).toBe(10);
      expect(svgNodes[1].$y()).toBe(0);
      expect(svgNodes[2].$y()).toBe(20);
    });

    it("should use supplied yBaseline to update $y when set", () => {
      localIntents.$maxHeight(20).action(visual);
      localIntents.$alignBottom(50).action(visual);

      let svgNodes = visual.svgNodes;
      expect(svgNodes[0].$y()).toBe(40);
      expect(svgNodes[1].$y()).toBe(30);
      expect(svgNodes[2].$y()).toBe(50);
    });
  }); /*End of alginBottom*/

  describe("$alignRight", () => {
    beforeEach(() => {
      localIntents = extendIntentObj(getIntents())
      visual.svgNodes.forEach((v, index) => {
        v._dataProperty = "width";
      });
    });

    it("should set $x to null if width was not set", () => {
      localIntents.$alignRight().action(visual);

      let svgNodes = visual.svgNodes;
      expect(svgNodes[0].$x()).toBe(null);
      expect(svgNodes[1].$x()).toBe(null);
      expect(svgNodes[2].$x()).toBe(null);
    });

    it("should use max width to update $x", () => {
      localIntents.$maxWidth(20).action(visual);
      localIntents.$alignRight().action(visual);

      let svgNodes = visual.svgNodes;
      expect(svgNodes[0].$x()).toBe(10);
      expect(svgNodes[1].$x()).toBe(0);
      expect(svgNodes[2].$x()).toBe(20);
    });

    it("should use supplied xBaseline to update $x when set", () => {
      localIntents.$maxWidth(20).action(visual);
      localIntents.$alignRight(50).action(visual);

      let svgNodes = visual.svgNodes;
      expect(svgNodes[0].$x()).toBe(40);
      expect(svgNodes[1].$x()).toBe(30);
      expect(svgNodes[2].$x()).toBe(50);
    });
  });
});
