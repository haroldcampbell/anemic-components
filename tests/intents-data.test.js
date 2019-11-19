import {
  $data
} from "../lib/ancui-data"

import test from "tape"

const setupFixture = () => {
  return {
    rawData: [10, 15, 5, 20],
    appendData: $data([10, 20]),
    longData: $data([10, 20, 30, 40, 50, 40, 30, 20, 10, 50])
  };
};

test("$data", testCase => {
  testCase.test("core features", t => {
    const data = $data(setupFixture().rawData);

    t.equal(data.max(), 20, "max() should return max value");
    t.equal(data.min(), 5, "min() should return min value");
    t.equal(data.itemCount(), 4, "itemCount() should return the total number of dataItems")
    t.deepEqual(data._asNormalized(), [
      0.5,
      0.75,
      0.25,
      1
    ], "_asNormalized should normalize the array values");
    t.deepEqual(data.rawData(), setupFixture().rawData, "$data() should not mutate data");
    t.end()
  });

  testCase.test("appendDataStart() add data to front of list", t => {
    const data = setupFixture().appendData;

    let actual = data.activeDataItems()

    t.equal(actual[0], 0.5)
    t.equal(actual[1], 1)

    data.appendDataStart([15])
    actual = data.activeDataItems()

    t.equal(actual[0], 0.75, "appendDataStart() should add data to the front of the data")
    t.equal(actual[1], 0.5)
    t.equal(actual[2], 1)
    t.end()
  });

  testCase.test("appendDataStart() re-normalizes data", t => {
    const data = setupFixture().appendData;

    data.appendDataStart([40])

    let actual = data.activeDataItems()

    t.equal(actual[0], 1, "appendDataStart() should re-normalize data when it contains bigger values")
    t.equal(actual[1], 0.25)
    t.equal(actual[2], 0.5)
    t.end()
  });

  testCase.test("appendDataEnd() add data to tail of the list", t => {
    const data = setupFixture().appendData;

    let actual = data.activeDataItems()

    t.equal(actual[0], 0.5)
    t.equal(actual[1], 1)

    data.appendDataEnd([15])
    actual = data.activeDataItems()

    t.equal(actual[0], 0.5)
    t.equal(actual[1], 1)
    t.equal(actual[2], 0.75, "appendDataEnd() should add data to the tail of the data")
    t.end()
  });

  testCase.test("appendDataEnd() re-normalize data", t => {
    const data = setupFixture().appendData;

    data.appendDataEnd([40])

    let actual = data.activeDataItems()

    t.equal(actual[0], 0.25)
    t.equal(actual[1], 0.5)
    t.equal(actual[2], 1, "appendDataEnd() should re-normalize when new data contains bigger values")
    t.end()
  });

  testCase.test("activeDataItems() normalize non-clipped data", t => {
    const data = setupFixture().longData;
    const actual = data.activeDataItems()
    const expected = data._asNormalized()

    t.equal(actual, expected, "activeDataItems() should be set to _asNormalized() when not clipped")
    t.end()
  });

  testCase.test("activeDataItems() clipping data", t => {
    const data = setupFixture().longData;
    // By setting visibleItems to less than the
    // data.itemCount() we are clipping the data
    const numVisibleItems = data.itemCount() / 2

    data.withVisibleItems(numVisibleItems)
    const actual = data.activeDataItems()
    const expected = data._asClipped()

    t.equal(actual, expected, "activeDataItems() should call _asClipped() when clipping")
    t.end()
  });

  testCase.test("withVisibleItems() calls onDataChanged()", t => {
    let wasCalled = false;
    const data = setupFixture().longData;

    data.onDataChanged = () => {
      wasCalled = true;
    }
    data.withVisibleItems(2)

    t.equal(wasCalled, true, "withVisibleItems() should trigger onDataChanged() when called")
    t.end()
  });

  testCase.test("onDataChanged() triggers _onDataChangedCallback()", t => {
    let wasCalled = false;
    const data = setupFixture().longData;

    data.withDataChangedCallback(() => {
      wasCalled = true;
    })
    data.onDataChanged()

    t.equal(wasCalled, true, "onDataChanged() should trigger _onDataChangedCallback() when called")
    t.end()
  });

  testCase.test("withVisibleItems() triggers _onDataChangedCallback()", t => {
    let wasCalled = false;
    const data = setupFixture().longData;

    data.withDataChangedCallback(() => {
      wasCalled = true;
    })
    data.withVisibleItems(2)

    t.equal(wasCalled, true, "withVisibleItems() should trigger _onDataChangedCallback() when called")
    t.end()
  });
});