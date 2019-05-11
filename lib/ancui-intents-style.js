/**
 * Sets the css class value of the visuals
 * @function $css
 * @param {number} data
 * @return {Object} Intent meta-data
 */
export function $css(data) {
    return {
        type: "effect",
        name: "css",
        data,
        action(visuals) {
            visuals.svgNodes.forEach(v => {
                v.$class(this.data);
            });
        }
    };
}

/**
 * Appends the css class value to the existing values of the visuals
 * @function $appendCSS
 * @param {number} data
 * @return {Object} Intent meta-data
 */
export function $appendCSS(data) {
    return {
        type: "effect",
        name: "appendCSS",
        data,
        action(visuals) {
            visuals.svgNodes.forEach(v => {
                v.$class(`${v.$class()} ${this.data}`);
            });
        }
    };
}