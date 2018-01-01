import {
  $id,
  $data,
  $x,
  $y,
  $arcRadius,
  $arcRadiusOffset,
  $arcSpanUnit,
  $arcSpanOffset,
  $maxWidth,
  $alignRight,
  $alignBottom,
  $yOffset,
  $xOffset,
  $width,
  $height,
  $maxHeight,
  $max,
  container,
} from '../../lib/ancui.js'
import {
  setInterval
} from 'timers';


import {
  rect,
  ellipse,
  path,
  arc
} from '../../lib/ancui-core.js'

let arcs1;
let arcs2;

let exArcData1 = $data([40, 30, 20, 15, 10], "arc");

// container("arc-1", _ => {
//   arcs1 = _.arcs(exArcData1, [$x(100), $y(100), $arcSpanUnit(60), $arcRadius(50), $arcRadiusOffset(5)])
//   arcs2 = _.arcs(exArcData1, [$x(250), $y(100), $arcSpanUnit(60), $arcSpanOffset(10), $arcRadius(50)])
// }, $id("example-arc-1"));

let bars1;
let barsData = $data([10, 20, 30, 40, 50], "height");
// let ellipsesData1 = $data([50, 20, 30, 10, 50], "diameter");

container("bar-1", _ => {
  // _.bars($data(barsData.rawData(), "width"), [$maxHeight(50), $alignBottom(100), $xOffset(30), $width(15)]);
  // _.ellipses(ellipsesData1, [$y(50), $x(30), $xOffset(70), $max(15)]);
  // bars1 = _.bars(barsData, [$maxHeight(50), $alignBottom(100), $width(15), $xOffset(20)]);

  bars1 = _.empty()
  .withData(barsData)
  .withEffects([$maxHeight(50), $alignBottom(100), $width(15), $xOffset(20)])
  .withSVGShapeCreator((visual) => {
    return rect(visual.container)
      .$x(0)
      .$y(0)
      .$class("bar");
  })
}, $id("example-bar-1"));


window.onload = function () {
  // console.log("onload", hslider)

  let slider = hslider.getSliderById("s1");
  slider.knob.onRangeChanged = function (s) {
    // arcs1.applyEffects([$arcRadius(50 + 25 * s.knob.range), $arcRadiusOffset(5)])
    // arcs2.applyEffects([$arcSpanOffset(10 + 25 * s.knob.range), $arcRadius(50)])
    bars1.applyEffects([$xOffset(20 + 10 * s.knob.range)])
    console.log("slider:s1", (20 + 10 * s.knob.range))
  }
}

let addDataButton = document.getElementById('add-data');
addDataButton.onclick = () => {
  let dataItem = (base) => {
    return base + Math.random() * 60;
  };

  // barsData.appendDataStart([dataItem(10)]);
  barsData.appendDataEnd([dataItem(20)])//, dataItem(5), dataItem(15)]);
  bars1.onDataDidChange();
}
// let handle = setInterval(()=>{
//   // console.log(1)
//   let dataItem = 25 + Math.random() * 25;

//   barsData.appendData([dataItem]);
//   bars1.onDataDidChange();
// }, 1000)