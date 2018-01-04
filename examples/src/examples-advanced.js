/* Advanced example */
// let barsData = ancui.$data([50, 20, 30, 10, 50], "height");
let ex6EllipsesData1 = ancui.$data([50, 20, 30, 10, 50], "diameter");
let ex6EllipsesData2 = ancui.$data([20, 10, 30], "diameter");
let linesData1 = ancui.$data([
  1, 1, 4,
  2, 1, 5,
  1, 1, 7,
  2, 1, 2,
  5, 1, 1,
], "strokeWidth");

ancui.container("advanced-1", _ => {
  _.bars(barsData, i => i.$group("c6-be").$maxHeight(50).$y(50).$yOffset(30).$width(150));
  _.ellipses(ex6EllipsesData1, i => i.$group("c6-e1").$maxDiameter(50).$y(50).$ryOffset(30).$x(150));
  _.ellipses(ex6EllipsesData2, i => i.$group("c6-e2").$maxDiameter(60).$y(55).$ryOffset(80).$x(400));
  _.connectingLines(linesData1, i => i.$joinGroupItems(["c6-e1", "c6-e2"]).$group("c6-e3").$maxStrokeWidth(15));
  _.onRenderCompleted(() => {
    ancui.$moveBelow("c6-e3", "c6-be")
  });
}, ancui.$id("example-advanced-1"));
