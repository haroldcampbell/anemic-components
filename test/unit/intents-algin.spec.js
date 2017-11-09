describe("Alginment Intents", () => {
  let visuals = {};
  let data = $data([10, 15, 5, 20]);
  let normalizedData = data.asNormalized();

  beforeEach(() => {
    visuals.$data = data;
    visuals.svgNodes = [].pumpFn(4, () => {
      return new MockNode();
    });

    visuals.svgNodes.forEach((v, index) => {
      v._dataValue = normalizedData[index];
    });
  });

  it("$algin should update $y when $y is set", () => {
    visuals.svgNodes.forEach((v, index) => {
      v.$y = _$._y(v);
    })

    $alignBottom(100).action(visuals);

    svgNodes = visuals.svgNodes
    expect(svgNodes[0].$y()).toBe(10);
    expect(svgNodes[1].$y()).toBe(5);
    expect(svgNodes[2].$y()).toBe(15);
    expect(svgNodes[3].$y()).toBe(0);
  });
});
