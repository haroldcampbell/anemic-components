// Example 1
// Note that all the examples use the data below.
let exArcData1 = ancui.$data([40, 30, 20, 15, 10], "arc");

ancui.container("arc-1", _ => {
  _.arcs(exArcData1, i => i.$x(100).$y(100).$arcSpanUnit(60).$arcRadius(50).$arcRadiusOffset(5))
  _.arcs(exArcData1, i => i.$x(250).$y(100).$arcSpanUnit(60).$arcSpanOffset(10).$arcRadius(50))
}, ancui.$id("example-arc-1"));

// Example 2
ancui.container("arc-2", _ => {
  _.arcs(exArcData1, i => i.$x(100).$y(100).$arcSpanUnit(60).$arcSpanOffset(10).$arcRadius(50).$arcRadiusOffset(5))
}, ancui.$id("example-arc-2"));

// Example 3
ancui.container("arc-3", _ => {
  _.arcs(exArcData1, i => i.$x(100).$y(100).$arcSpanUnit(60).$arcRadius(50).$arcRadiusOffset(5).$arcRotateBy(30))
  _.arcs(exArcData1, i => i.$x(250).$y(100).$arcSpanUnit(60).$arcSpanOffset(10).$arcRadius(50).$arcRotateBy(30))
  _.arcs(exArcData1, i => i.$x(400).$y(100).$arcSpanUnit(60).$arcSpanOffset(10).$arcRadius(50).$arcRadiusOffset(5).$arcRotateBy(30))
}, ancui.$id("example-arc-3"));

// Example 4

/**
 * Utility function to calculate the hsl based on a base offset.
 * @param {Numbe} base - hue offset
 * @return {String} hsl value
 */
function hsl(base) {
  let h = 220.8 * 0.6 * (1 + base);
  let l = 69.2 * 0.5 * (1 + base);
  return "hsl(" + h + ", 100%, " + l + "%)";
}

ancui.container("arc-4", _ => {
  /* 1 */
  _.arcs(exArcData1,
    i => i.$x(80).$y(100).$arcSpanUnit(60).$arcSpanOffset(10)
    .$arcRenderFn({radius: 50, maxWidth: 3}, (intent, v, i) => {
      let base = i / (exArcData1.data.length * 1.0);
      v.$strokeColor(hsl(base));
      v.$strokeWidth(intent.data.maxWidth);
      v.$radius(intent.data.radius + intent.data.maxWidth * v._dataValue / 2.0 + 5);
    })
  );

  /* 2 */
  _.arcs(exArcData1,
    i => i.$x(250).$y(100).$arcSpanUnit(60).$arcSpanOffset(10)
    .$arcRenderFn({radius: 50, maxWidth: 3}, (intent, v, i) => {
      let base = i / (exArcData1.data.length * 1.0);
      v.$strokeColor(hsl(base));
      v.$radius(intent.data.radius + intent.data.maxWidth * v._dataValue / 2.0 + 5);
      v.$strokeWidth(intent.data.maxWidth + intent.data.maxWidth * base * 10);
    })
  );

  /* 3 */
  // Additional color data
  let colorsData = ["#DAF7A6", "#FFC300", "#FF5733", "#C70039", "#900C3F"];

  _.arcs(exArcData1,
    i => {
        i.$x(400).$y(100).$arcSpanUnit(60).$arcSpanOffset(0)
        .$arcRenderFn({radius: 50, maxWidth: 5, colors: colorsData}, (intent, v, i) => {
          let strokeWidth = intent.data.maxWidth / v._dataValue;
          v.$attr("stroke-linecap", "butt");
          v.$strokeWidth(strokeWidth);
          v.$strokeColor(intent.data.colors[i]);
          v.$radius(intent.data.radius + intent.data.maxWidth * v._dataValue / 2.0 + 5);
        })
    });
}, ancui.$id("example-arc-4"));