import {$data} from "../../lib/ancui-data"

describe("Data Intents", () => {
  it("max() should return max value", () => {
    let data = $data([10, 15, 5, 20]);

    expect(data.max()).toBe(20);
  });
});

describe("Data Intents", () => {
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
    const numVisibleItems = data.itemCount()/2

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
