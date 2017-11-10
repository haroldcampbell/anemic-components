import {$x, $y} from '../../lib/ancui-intents.js'

describe("Position Intents", () => {
  var newValue = null;
  var visuals = {};

  beforeEach(() => {
    newValue = 0;
  });

  it("should set x value with $x ", () => {
    visuals.svgNodes = [].pump(1, {
      $x(value) {
        newValue = value;
      }
    });

    $x(1).action(visuals);
    expect(newValue).toBe(1);
  });

  it("should set y value with $y", () => {
    visuals.svgNodes = [].pump(1, {
      $y(value) {
        newValue = value;
      }
    });

    $y(1).action(visuals);
    expect(newValue).toBe(1);
  });
});
