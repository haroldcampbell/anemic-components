import {$data} from "../../lib/ancui-data"

describe("Data Intents", () => {
  it("max() should return max value", () => {
    let data = $data([10, 15, 5, 20]);

    expect(data.max()).toBe(20);
  });
});
