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
  let barsData = $data([10, 20, 30, 40, 50, 40, 30, 20, 10, 50, 60, 10, 30, 80], "height");
  barsData.withVisibleItems(5)

  let barsData2 = $data([10, 20, 30, 40, 50, 40, 30, 20, 10, 50, 60, 10, 30, 80], "height");

  container("w-experiment-2", _ => {
    bars1 = _.empty()
    .withData(barsData)
    .withIntents([$maxHeight(50), $alignBottom(100), $width(15), $xOffset(20)])
    .withSVGShapeCreator((container) => {
      return rect(container)
        .$x(0)
        .$y(0)
        .$class("bar");
    });
  }, $id("window-experiment-2"));

  container("u-experiment-2", _ => {
    _.bars(barsData2, [$maxHeight(50), $alignBottom(100), $width(15), $xOffset(20)]);
  }, $id("unwindowed-experiment-2"));


  window.onload = function () {
    let slider = hslider.getSliderById("s2");

    slider.knob.onRangeChanged = function (s) {
      let index = Math.floor(s.knob.range * barsData.itemCount());
      barsData.withVisibleItems(5, index);
      barsData

      let labelElm = document.getElementById('slider-text-2');
      labelElm.innerText = `index: ${index}`;
    }
  }

//   let addDataButton = document.getElementById('add-data');
//   addDataButton.onclick = () => {
//     let dataItem = (base) => {
//       return base + Math.random() * 60;
//     };

//     barsData.appendDataEnd([dataItem(20)])
//     bars1.onDataDidChange();
//   }