import {
  $id,
  $data,
  $alignBottom,
  $xOffset,
  $width,
  $maxHeight,
  container,
  rect,
} from './../../assets/dist/ancui.js'

let bars1;
let barsData = $data([10, 20, 30, 40, 50], "height");

container("c-experiment-1", _ => {
  bars1 = _.empty()
  .withData(barsData)
  .withIntents([$maxHeight(50), $alignBottom(100), $width(15), $xOffset(20)])
  .withSVGShapeCreator((container) => {
    return rect(container)
      .$x(0)
      .$y(0)
      .$class("bar");
  });
}, $id("experiment-1"));


window.onload = function () {
  let slider = hslider.getSliderById("s1");
  slider.knob.onRangeChanged = function (s) {
    bars1.applyIntents([$xOffset(20 + 10 * s.knob.range)])
    console.log("slider:s1", (20 + 10 * s.knob.range))
  }
}

let addDataButton = document.getElementById('add-data');
addDataButton.onclick = () => {
  let dataItem = (base) => {
    return base + Math.random() * 60;
  };

  barsData.appendDataEnd([dataItem(20)]) // , dataItem(5), dataItem(15)]);
  bars1.onDataDidChange();
}