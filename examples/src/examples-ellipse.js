
let ellipsesData1 = ancui.$data([10, 60, 30, 40, 50], "diameter");

ancui.container("ellipses-1", _ => {
  _.ellipses(ellipsesData1, i => i.$group("c4-e1").$y(50).$x(30).$xOffset(70).$max(30));
}, ancui.$id("example-ellipses-1"));

let ex4EllipsesData2 = ancui.$data([50, 25, 60, 10, 100], "diameter");
let ex4EllipsesData3 = ancui.$data([15, 80, 20, 60, 70], "diameter");
let ex4EllipsesData4 = ancui.$data([30, 40, 40, 30, 50], "diameter");

ancui.container("ellipses-2", _ => {
  _.ellipses(ellipsesData1, i => i.$group("c5-e1").$y(50).$x(40).$xOffset(80).$max(20));
  _.ellipses(ex4EllipsesData2, i => i.$group("c5-e2").$y(50).$x(40).$xOffset(80).$max(40));
  _.ellipses(ex4EllipsesData3, i => i.$group("c5-e3").$y(50).$x(40).$xOffset(80).$max(30));
  _.ellipses(ex4EllipsesData4, i => i.$group("c5-e4").$y(50).$x(40).$xOffset(80).$max(15));
}, ancui.$id("example-ellipses-2"));