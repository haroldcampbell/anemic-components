import {
  $id,
  $data,
  $x,
  $y,
  $arcRadius,
  $arcRadiusOffset,
  $arcSpanUnit,
  $arcSpanOffset,
  container,
} from '../../lib/ancui.js'


let exArcData1 = $data([40, 30, 20, 15, 10], "arc");
let arcs1;
let arcs2

container("arc-1", _ => {
  arcs1 = _.arcs(exArcData1, [$x(100), $y(100), $arcSpanUnit(60), $arcRadius(50), $arcRadiusOffset(5)])
  arcs2 = _.arcs(exArcData1, [$x(250), $y(100), $arcSpanUnit(60), $arcSpanOffset(10), $arcRadius(50)])
}, $id("example-arc-1"));

window.onload = function() {
  // console.log("onload", hslider)

  let slider = hslider.getSliderById("s1");
  slider.knob.onRangeChanged = function(s) {
    arcs1.applyEffects([$arcRadius(50 + 25*s.knob.range), $arcRadiusOffset(5)])
    arcs2.applyEffects([$arcSpanOffset(10 + 25*s.knob.range), $arcRadius(50)])
    // console.log("slider:s1", s.knob.range)
  }
}