import {
  $data
} from "../../lib/ancui-data"

describe("Data max()", () => {
  it("should return max value", () => {
    let data = $data([10, 15, 5, 20]);

    expect(data.max()).toBe(20);
  });
});

describe("Data appendDataStart()", () => {
  let data;

  beforeEach(() => {
    data = $data([10, 20]);
  });

  it("should to tail of the data", () => {
    let actual = data.activeDataItems()

    expect(actual[0]).toBe(0.5)
    expect(actual[1]).toBe(1)

    data.appendDataStart([15])
    actual = data.activeDataItems()

    expect(actual[0]).toBe(0.5)
    expect(actual[1]).toBe(1)
    expect(actual[2]).toBe(0.75)
  });

  it("should re-normalize data when it contains bigger values", () => {
    data.appendDataStart([40])

    let actual = data.activeDataItems()

    expect(actual[0]).toBe(0.25)
    expect(actual[1]).toBe(0.5)
    expect(actual[2]).toBe(1)
  });
});

describe("Data appendDataEnd()", () => {
  let data;

  beforeEach(() => {
    data = $data([10, 20]);
  });

  it("should appendDataEnd() to head of the data", () => {
    let actual = data.activeDataItems()

    expect(actual[0]).toBe(0.5)
    expect(actual[1]).toBe(1)

    data.appendDataEnd([15])
    actual = data.activeDataItems()

    expect(actual[0]).toBe(0.75)
    expect(actual[1]).toBe(0.5)
    expect(actual[2]).toBe(1)
  });

  it("should re-normalize data when appendDataEnd() contains bigger values", () => {
    data.appendDataEnd([40])

    let actual = data.activeDataItems()

    expect(actual[0]).toBe(1)
    expect(actual[1]).toBe(0.25)
    expect(actual[2]).toBe(0.5)
  });
});

describe("Data", () => {
  let data;

  beforeEach(() => {
    data = $data([10, 20, 30, 40, 50, 40, 30, 20, 10, 50]);
  });

  it("should set activeDataItems() to _asNormalized() when not clipped", () => {
    const actual = data.activeDataItems()
    const expected = data._asNormalized()

    expect(actual).toBe(expected)
  });

  it("should set activeDataItems() to _asClipped() when clipped", () => {
    // By setting visibleItems to less than the
    // data.itemCount() we are clipping the data
    const numVisibleItems = data.itemCount() / 2

    data.withVisibleItems(numVisibleItems)
    const actual = data.activeDataItems()
    const expected = data._asClipped()

    expect(actual).toBe(expected)
  });

  it("should call onDataChanged() when withVisibleItems() is called", () => {
    let wasCalled = false;
    data.onDataChanged = () => {
      wasCalled = true;
    }
    data.withVisibleItems(2)

    expect(wasCalled).toBe(true)
  });

  it("should call _onDataChangedCallback when its set and when onDataChanged() is called", () => {
    let wasCalled = false;
    data.withDataChangedCallback(() => {
      wasCalled = true;
    })
    data.onDataChanged()

    expect(wasCalled).toBe(true)
  });

  it("should call _onDataChangedCallback() when withVisibleItems() is called", () => {
    let wasCalled = false;
    data.withDataChangedCallback(() => {
      wasCalled = true;
    })
    data.withVisibleItems(2)

    expect(wasCalled).toBe(true)
  });
});