describe("Postion Intents", () => {
  var newValue = null;

  beforeEach(() => {
    newValue = 0;
  });

  it("should set x value with $x ", () => {
    var visuals = [].pump(1, {
      $x(value) {
        newValue = value;
      }
    });

    $x(1).action(visuals);
    expect(newValue).toBe(1);
  });

  it("should set y value with $y", () => {
    var visuals = [].pump(1, {
      $y(value) {
        newValue = value;
      }
    });

    $y(1).action(visuals);
    expect(newValue).toBe(1);
  });
});
