import {
  $multiData
} from "../../lib/data/ancui-data"

import test from "tape"

const setupFixture = () => {
  return {
    rawData: [
      [10, 25],
      [15, 5],
      [5, 8],
      [20, 10]
    ],
  };
};

test("$multiData", testCase => {
  testCase.test("core features", t => {
    const rawData = setupFixture().rawData
    let data = $multiData(rawData);

    t.equal(data.itemCount(), 4, "itemCount() should return the total number of dataItems")
    t.equal(data.dataArity(), 2, "dataArity() should be identify length of shortest n-tuple")
    t.deepEqual(data.max(), [20, 25], "max() should return the max values");
    t.deepEqual(data.min(), [5, 5], "min() should return the min values");
    t.deepEqual(data._asNormalized(), [
      [0.5, 1],
      [0.75, 0.2],
      [0.25, 0.32],
      [1, 0.4]
    ], "_asNormalized should normalize the array values");
    t.deepEqual(data.rawData(), rawData, "$multiData() should not mutate data");

    t.end()
  });

  testCase.test("max()", t => {
    const fixture = setupFixture();
    const data = $multiData(fixture.rawData);

    t.deepEqual(data.max(), [20, 25], "max() should return max item");
    t.end();
  });

  testCase.test("min()", t => {
    const fixture = setupFixture();
    const data = $multiData(fixture.rawData);

    t.deepEqual(data.min(), [5, 5], "min() should return smallest items");
    t.end();
  });

  testCase.test("summedData()", t => {
    const fixture = setupFixture();
    const data = $multiData(fixture.rawData);

    t.deepEqual(data.summedData(), [50, 48], "summedData() should return sum of all the items");
    t.end();
  });

  testCase.test("appendDataStart()", t => {
    const newData = [
      [15, 5]
    ];
    const rawData = [
      [10, 25],
      [5, 8],
      [20, 10]
    ];

    let data = $multiData(rawData);
    data.appendDataStart(newData)

    t.deepEqual(data._asNormalized(), [
      [0.75, 0.2],
      [0.5, 1],
      [0.25, 0.32],
      [1, 0.4]
    ], "new data should added to the start of the existing data");
    t.equal(data.itemCount(), 4, "itemCount() should increase after append")

    t.end()
  });

  testCase.test("appendDataEnd()", t => {
    const newData = [
      [15, 5]
    ];
    const rawData = [
      [10, 25],
      [5, 8],
      [20, 10]
    ];

    let data = $multiData(rawData);
    data.appendDataEnd(newData)

    t.deepEqual(data._asNormalized(), [
      [0.5, 1],
      [0.25, 0.32],
      [1, 0.4],
      [0.75, 0.2],
    ], "new data should be added to the tail of the existing data");
    t.equal(data.itemCount(), 4, "itemCount() should increase after append")

    t.end()
  });
});