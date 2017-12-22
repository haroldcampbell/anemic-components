import {
    $id,
    $data,
    $x,
    $y,
    $arcRadius,
    $arcRadiusOffset,
    $arcRotateBy,
    $arcSpanUnit,
    $arcSpanOffset,
    $arcRenderFn,
    container,
  } from '../../lib/ancui.js'


let exArcData1 = $data([40, 30, 20, 15, 10], "arc");
let colorsData = ["#DAF7A6", "#FFC300", "#FF5733", "#C70039", "#900C3F"];

container("arc-1", _ => {
  _.arcs(exArcData1, [$x(100), $y(100), $arcSpanUnit(60), $arcRadius(50), $arcRadiusOffset(5)])
  _.arcs(exArcData1, [$x(250), $y(100), $arcSpanUnit(60), $arcSpanOffset(10), $arcRadius(50)])
}, $id("example-arc-1"));

container("arc-2", _ => {
  _.arcs(exArcData1, [$x(100), $y(100), $arcSpanUnit(60), $arcSpanOffset(10), $arcRadius(50), $arcRadiusOffset(5)])
}, $id("example-arc-2"));

container("arc-3", _ => {
  _.arcs(exArcData1, [$x(100), $y(100), $arcSpanUnit(60), $arcRadius(50), $arcRadiusOffset(5), $arcRotateBy(30)])
  _.arcs(exArcData1, [$x(250), $y(100), $arcSpanUnit(60), $arcSpanOffset(10), $arcRadius(50), $arcRotateBy(30)])
  _.arcs(exArcData1, [$x(400), $y(100), $arcSpanUnit(60), $arcSpanOffset(10), $arcRadius(50), $arcRadiusOffset(5), $arcRotateBy(30)])
}, $id("example-arc-3"));

/**
 * Utility function to calculate the hsl based on a base offset.
 * @param {Numbe} base - hue offset
 * @return {String} hsl value
 */
function hsl(base) {
  let h = 220.8 * 0.6 * (1 + base);
  let l = 69.2 * 0.5 * (1 + base);
  return "hsl("+h+", 100%, "+l+"%)";
}

container("arc-4", _ => {
  _.arcs(exArcData1, [
    $x(80), $y(100), $arcSpanUnit(60), $arcSpanOffset(10),
    $arcRenderFn({radius: 50, maxWidth: 3}, (intent, v, i)=>{
      let base = i / (exArcData1.data.length * 1.0);
      v.$strokeColor(hsl(base));
      v.$strokeWidth(intent.data.maxWidth);
      v.$radius(intent.data.radius + intent.data.maxWidth * v._dataValue/2.0 + 5);
    }),
  ]);

  _.arcs(exArcData1, [
    $x(250), $y(100), $arcSpanUnit(60), $arcSpanOffset(10),
    $arcRenderFn({radius: 50, maxWidth: 3}, (intent, v, i)=>{
      let base = i / (exArcData1.data.length * 1.0);
      v.$strokeColor(hsl(base));
      v.$radius(intent.data.radius + intent.data.maxWidth * v._dataValue/2.0 + 5);
      v.$strokeWidth(intent.data.maxWidth + intent.data.maxWidth * base * 10);
    }),
  ]);

  _.arcs(exArcData1, [
    $x(400), $y(100), $arcSpanUnit(60), $arcSpanOffset(0),
    $arcRenderFn({radius: 50, maxWidth: 5, colors: colorsData}, (intent, v, i)=>{
      let strokeWidth = intent.data.maxWidth / v._dataValue;
      v.$attr("stroke-linecap", "butt");
      v.$strokeWidth(strokeWidth);
      v.$strokeColor(intent.data.colors[i]);
      v.$radius(intent.data.radius + intent.data.maxWidth * v._dataValue/2.0 + 5);
    }),
  ]);
}, $id("example-arc-4"));