import {MockNode} from "./utils"
import {$data} from "../../lib/ancui-data"
import {_$} from "../../lib/ancui-core"
import {$alignBottom, $maxHeight} from "../../lib/ancui-intents"

describe("Alignment Intents", () => {
  let visuals = {};
  let data = $data([10, 15, 5, 20, 0]);
  let normalizedData = data.asNormalized();

  beforeEach(() => {
    visuals.$data = data;
    visuals.svgNodes = [].pumpFn(data.itemCount(), () => {
      return new MockNode();
    });

    visuals.svgNodes.forEach((v, index) => {
      v.$y = _$._y(v);
      v.$height = _$._height(v);
      v._dataProperty = "height";
      v._dataValue = normalizedData[index];
    });
  });

  it("$align should set $y to null if height was not set", () => {
    $alignBottom().action(visuals);

    let svgNodes = visuals.svgNodes;
    expect(svgNodes[0].$y()).toBe(null);
    expect(svgNodes[1].$y()).toBe(null);
    expect(svgNodes[2].$y()).toBe(null);
    expect(svgNodes[3].$y()).toBe(null);
    expect(svgNodes[4].$y()).toBe(null);
  });

  it("$align should use max height to update $y", () => {
    $maxHeight(20).action(visuals);
    $alignBottom().action(visuals);

    let svgNodes = visuals.svgNodes;
    expect(svgNodes[0].$y()).toBe(10);
    expect(svgNodes[1].$y()).toBe(5);
    expect(svgNodes[2].$y()).toBe(15);
    expect(svgNodes[3].$y()).toBe(0);
    expect(svgNodes[4].$y()).toBe(20);
  });

  it("$align should use supplied height to update $y when set", () => {
    $maxHeight(20).action(visuals);
    $alignBottom(50).action(visuals);

    let svgNodes = visuals.svgNodes;
    expect(svgNodes[0].$y()).toBe(40);
    expect(svgNodes[1].$y()).toBe(35);
    expect(svgNodes[2].$y()).toBe(45);
    expect(svgNodes[3].$y()).toBe(30);
    expect(svgNodes[4].$y()).toBe(50);
  });
});
