/**
 * Sets the cx value of the visuals
 * @function $cx
 * @param {Number} data - sets the $cx amount for the shape
 * @return {Object} Intent meta-data
 */
export function $cx(data) {
    return {
        type: "effect",
        name: "cx",
        data,
        action(visuals) {
            visuals.svgNodes.forEach(v => {
                // if (v._dataProperty != "diameter") {
                //   console.log('$rx requires dataProperty: "diameter"')
                //   return;
                // }
                v.$cx(this.data);
            });
        }
    };
}

/**
 * Sets the cy value of the visuals
 * @function $cy
 * @param {Number} data - sets the $cy amount for the shape
 * @return {Object} Intent meta-data
 */
export function $cy(data) {
    return {
        type: "effect",
        name: "cy",
        data,
        action(visuals) {
            visuals.svgNodes.forEach(v => {
                // if (v._dataProperty != "diameter") {
                //   console.log('$rx requires dataProperty: "diameter"')
                //   return;
                // }
                v.$cy(this.data);
            });
        }
    };
}

/**
 * Sets the rx value of the visuals
 * @function $rx
 * @param {Number} data - sets the $rx amount for the shape
 * @return {Object} Intent meta-data
 */
export function $rx(data) {
    return {
        type: "effect",
        name: "rx",
        data,
        action(visuals) {
            visuals.svgNodes.forEach(v => {
                // if (v._dataProperty != "diameter") {
                //   console.log('$rx requires dataProperty: "diameter"')
                //   return;
                // }
                v.$rx(this.data);
            });
        }
    };
}

/**
 * Sets the ry value of the visuals
 * @function $ry
 * @param {Number} data - the $ry amount
 * @return {Object} Intent meta-data
 */
export function $ry(data) {
    return {
        type: "effect",
        name: "ry",
        data,
        action(visuals) {
            visuals.svgNodes.forEach(v => {
                // if (v._dataProperty != "diameter") {
                // console.log('$ry requires dataProperty: "diameter"')
                // return;
                // }
                v.$ry(this.data);
            });
        }
    };
}

/**
 * Sets the horizontal offset of the ellipses.
 * @function $cxOffset
 * @param {Number} data
 * @return {Object} Intent meta-data
 */
export function $cxOffset(data) {
    return {
        type: "effect",
        name: "cxOffset",
        data,
        action(visuals) {
            let x = visuals.svgNodes[0].$cx()
            for (let v of visuals.svgNodes) {
                // if (v._dataProperty != "diameter") {
                // console.log('$cxOffset requires dataProperty: "diameter"')
                // return;
                // }
                v.$cx(x + v.$rx());
                x = x + this.data + v.$rx() * 2.0
            }
        }
    };
}

/**
 * Sets the vertical offset of the ellipses.
 *
 * @function $cyOffset
 * @param {Number} data
 * @return {Object} Intent meta-data
 */
export function $cyOffset(data) {
    return {
        type: "effect",
        name: "cyOffset",
        data,
        action(visuals) {
            let y = visuals.svgNodes[0].$cy();

            for (let v of visuals.svgNodes) {
                // if (v._dataProperty != "diameter") {
                // console.log('$cyOffset requires dataProperty: "diameter"')
                // return;
                // }
                v.$cy(y + v.$ry());
                y = y + this.data + v.$ry() * 2.0;
            }
        }
    };
}

/**
 * Sets the cx-distance between the visuals
 * Is independent of the width of the visual
 * @function $cxIncrement
 * @param {Number} data
 * @return {Object} Intent meta-data
 */
export function $cxIncrement(data) {
    return {
        type: "effect",
        name: "cxIncrement",
        data,
        action(visuals) {
            let [first, ...rest] = visuals.svgNodes;
            let x = first.$cx() + this.data;

            rest.forEach(v => {
                v.$cx(x);
                x = x + this.data;
            });
        }
    };
}

/**
 * Sets the cy-distance between the visuals
 * Is independent of the width of the visual
 * @function $cxIncrement
 * @param {Number} data
 * @return {Object} Intent meta-data
 */
export function $cyIncrement(data) {
    return {
        type: "effect",
        name: "cyIncrement",
        data,
        action(visuals) {
            let [first, ...rest] = visuals.svgNodes;
            let y = first.$cy() + this.data;

            rest.forEach(v => {
                v.$cy(y);
                y = y + this.data;
            });
        }
    };
}

/**
 * Aligns all visuals along the bottom of the "y-axis".
 *
 * @function $alignCYBottom
 * @param {number} cyBaseline - an optional yBaseline that is used to determine the position the
 * visuals. If this value is not supplied, then the visuals.__data.max() is used.
 * @return {Object} Intent meta-data
 */
export function $alignCYBottom(cyBaseline) {
    return {
        type: "effect",
        name: "alignCYBottom",
        action(visuals) {
            let baselineValue = cyBaseline || visuals.__data.max();

            for (let v of visuals.svgNodes) {
                //   if ($isTruthy(v.$cy())) {
                v.$cy(baselineValue - v.$cy());
                //   }
            }
        }
    }
}

/**
 * Sets the width and height.
 *
 * @function $diameter
 * @param {Number} data - the maximum width and height to which visuals will be scaled
 * @return {Object} Intent meta-data
 */
export function $diameter(data) {
    return {
        type: "effect",
        name: "diameter",
        data,
        action(visuals) {
            visuals.svgNodes.forEach(v => {
                // if (v._dataProperty != "diameter") {
                // console.log('$maxDiameter requires dataProperty: "diameter"')
                // return;
                // }
                let dd = this.data / 2.0;
                // let d = this.data * dd;
                v.$height(dd)
                v.$width(dd)
            })
        }
    };
}

/**
 * Scales the width and height based on the value of the largest ellipse.
 * This is constrained to data with the diameter targetAttr.
 *
 * @function $maxDiameter
 * @param {Number} data - the maximum width and height to which visuals will be scaled
 * @return {Object} Intent meta-data
 */
export function $maxDiameter(data) {
    return {
        type: "effect",
        name: "maxDiameter",
        data,
        action(visuals) {
            visuals.svgNodes.forEach(v => {
                // if (v._dataProperty != "diameter") {
                // console.log('$maxDiameter requires dataProperty: "diameter"')
                // return;
                // }
                let dd = v._dataValue / 2.0;
                let d = this.data * dd;
                v.$height(d)
                v.$width(d)
            })
        }
    };
}