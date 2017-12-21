import * as utils from "./utils"
// import {$data} from "../../lib/ancui-data"
// import {container} from "../../lib/ancui-pipeline"
// import "../../lib/ancui-visuals"
// import {$noop} from "../../lib/ancui-intents"

import {arc} from "../../lib/ancui-core"
import {$degreesToRadians} from "../../lib/utils"

describe("arc shape", () => {
    let visual = null;
    let parentElement = null;

    beforeEach(() => {
        parentElement = new utils.MockNode();
        visual = arc(parentElement, "child");
    });

    it("should generate path with M and A commands", ()=>{
        visual.__renderPath();
        expect(visual.$d()).toBe("M 0 0 A 0 0 0 0 1 0 0");

        let [cx, cy, r] = [5, 5, 30];
        visual.$x(cx);
        visual.$y(cy);
        visual.$radius(r);
        visual.$arcSpan(120);
        let {start, end, largeArcFlag} = visual.__calcRenderData();

        let _path = [
            "M", start.x, start.y,
            "A", r, r, 0, largeArcFlag, 1, end.x, end.y,
          ].join(" ");

        visual.__renderPath();

        expect(visual.$d()).toBe(_path);
    });

    describe("__calcRenderData", () =>{
        let cx, cy, r;

        beforeEach(() =>{
            [cx, cy, r] = [5, 5, 30];
            visual.$radius(r);
        })

        it("should calculate the arc's end.y", () => {
            visual.$y(cy);
            visual.$arcSpan(120); /** The span of the arc is 120 degrees*/

            let alpha = visual.$endAngle() - 90; /** Need to rotate anti-clockwise by 90 degrees to align with y-axis */
            let alphaInRadians = $degreesToRadians(alpha)

            let y = cy + r * Math.sin(alphaInRadians);
            let {start, end, _} = visual.__calcRenderData();
            
            expect(end.y).toBe(y);
        });

        it("should calculate the arc's end.x", () => {
            visual.$x(cx);
            visual.$arcSpan(120); /** The span of the arc is 120 degrees*/

            let alpha = visual.$endAngle() - 90; /** Need to rotate anti-clockwise by 90 degrees to align with y-axis */
            let alphaInRadians = $degreesToRadians(alpha)

            let x = cx + r * Math.cos(alphaInRadians);
            let {start, end, _} = visual.__calcRenderData();
            
            expect(end.x).toBe(x);
        });

        it("should calculate the arc's start.y", () => {
            visual.$y(cy);

            let alpha = visual.$startAngle() - 90; /** Need to rotate anti-clockwise by 90 degrees to align with y-axis */
            let alphaInRadians = $degreesToRadians(alpha)
            
            let y = cy + r * Math.sin(alphaInRadians);
            let {start, _} = visual.__calcRenderData();

            expect(start.y).toBe(y);
        });

        it("should calculate the arc's start.x", () => {
            visual.$x(cx);

            let alpha = visual.$startAngle() - 90; /** Need to rotate anti-clockwise by 90 degrees to align with y-axis */
            let alphaInRadians = $degreesToRadians(alpha)

            let x = cx + r * Math.cos(alphaInRadians);
            let {start, _} = visual.__calcRenderData();
            
            expect(start.x).toBe(x);
        });
    });

    it("$endAngle should be equal to arcSpan + startAngle", ()=>{
        expect(visual.$endAngle()).toBe(0);

        visual.$arcSpan(100);
        visual.$startAngle(50);

        expect(visual.$endAngle()).toBe(150);
    });

    it("$arcSpan should set the arc's span", ()=>{
        expect(visual.$arcSpan()).toBe(0);

        visual.$arcSpan(100);

        expect(visual.$arcSpan()).toBe(100);
    });

    it("$startAngle should set the arc's starting angle", ()=>{
        expect(visual.$startAngle()).toBe(0);

        visual.$startAngle(100);

        expect(visual.$startAngle()).toBe(100);
    });

    it("$radius() should set the rx and ry for the A command", () => {
        visual.$radius(5);
        visual.__renderPath();
        let d = visual.$d(); /** Get the d attribute */

        expect(d.includes("A 5 5")).toBe(true); /** Check that x and y are the same as the radius */
    });

    it("default __renderPath() should set the <path> element's, d attribute's content to all zeros", () => {
        visual.__renderPath();
        expect(visual.$d()).toBe("M 0 0 A 0 0 0 0 1 0 0");
    });

    it("should set defaults", () => {
        expect(visual.$radius()).toBe(0);
        expect(visual.$startAngle()).toBe(0);
        expect(visual.$attr("stroke-linecap")).toBe("round");
    });
})
