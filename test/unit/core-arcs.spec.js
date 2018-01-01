import * as utils from "./utils"

import {arc} from "../../lib/ancui-core"
import {$degreesToRadians} from "../../lib/utils"

describe("arc shape", () => {
    let shape = null;
    let parentElement = null;

    beforeEach(() => {
        parentElement = new utils.MockNode();
        shape = arc(parentElement, "child");
    });

    it("should generate path with M and A commands", ()=>{
        shape.__renderPath();
        expect(shape.$d()).toBe("M 0 0 A 0 0 0 0 1 0 0");

        let [cx, cy, r] = [5, 5, 30];
        shape.$x(cx);
        shape.$y(cy);
        shape.$radius(r);
        shape.$arcSpan(120);
        let {start, end, largeArcFlag} = shape.__calcRenderData();

        let _path = [
            "M", start.x, start.y,
            "A", r, r, 0, largeArcFlag, 1, end.x, end.y,
          ].join(" ");

        shape.__renderPath();

        expect(shape.$d()).toBe(_path);
    });

    describe("__calcRenderData", () =>{
        let cx, cy, r;

        beforeEach(() =>{
            [cx, cy, r] = [5, 5, 30];
            shape.$radius(r);
        })

        it("should calculate the arc's end.y", () => {
            shape.$y(cy);
            shape.$arcSpan(120); /** The span of the arc is 120 degrees*/

            let alpha = shape.$endAngle() - 90; /** Need to rotate anti-clockwise by 90 degrees to align with y-axis */
            let alphaInRadians = $degreesToRadians(alpha)

            let y = cy + r * Math.sin(alphaInRadians);
            let {start, end, _} = shape.__calcRenderData();

            expect(end.y).toBe(y);
        });

        it("should calculate the arc's end.x", () => {
            shape.$x(cx);
            shape.$arcSpan(120); /** The span of the arc is 120 degrees*/

            let alpha = shape.$endAngle() - 90; /** Need to rotate anti-clockwise by 90 degrees to align with y-axis */
            let alphaInRadians = $degreesToRadians(alpha)

            let x = cx + r * Math.cos(alphaInRadians);
            let {start, end, _} = shape.__calcRenderData();

            expect(end.x).toBe(x);
        });

        it("should calculate the arc's start.y", () => {
            shape.$y(cy);

            let alpha = shape.$startAngle() - 90; /** Need to rotate anti-clockwise by 90 degrees to align with y-axis */
            let alphaInRadians = $degreesToRadians(alpha)

            let y = cy + r * Math.sin(alphaInRadians);
            let {start, _} = shape.__calcRenderData();

            expect(start.y).toBe(y);
        });

        it("should calculate the arc's start.x", () => {
            shape.$x(cx);

            let alpha = shape.$startAngle() - 90; /** Need to rotate anti-clockwise by 90 degrees to align with y-axis */
            let alphaInRadians = $degreesToRadians(alpha)

            let x = cx + r * Math.cos(alphaInRadians);
            let {start, _} = shape.__calcRenderData();

            expect(start.x).toBe(x);
        });
    });

    it("$endAngle should be equal to arcSpan + startAngle", ()=>{
        expect(shape.$endAngle()).toBe(0);

        shape.$arcSpan(100);
        shape.$startAngle(50);

        expect(shape.$endAngle()).toBe(150);
    });

    it("$arcSpan should set the arc's span", ()=>{
        expect(shape.$arcSpan()).toBe(0);

        shape.$arcSpan(100);

        expect(shape.$arcSpan()).toBe(100);
    });

    it("$startAngle should set the arc's starting angle", ()=>{
        expect(shape.$startAngle()).toBe(0);

        shape.$startAngle(100);

        expect(shape.$startAngle()).toBe(100);
    });

    it("$radius() should set the rx and ry for the A command", () => {
        shape.$radius(5);
        shape.__renderPath();
        let d = shape.$d(); /** Get the d attribute */

        expect(d.includes("A 5 5")).toBe(true); /** Check that x and y are the same as the radius */
    });

    it("default __renderPath() should set the <path> element's, d attribute's content to all zeros", () => {
        shape.__renderPath();
        expect(shape.$d()).toBe("M 0 0 A 0 0 0 0 1 0 0");
    });

    it("should set defaults", () => {
        expect(shape.$radius()).toBe(0);
        expect(shape.$startAngle()).toBe(0);
        expect(shape.$attr("stroke-linecap")).toBe("round");
    });
})
