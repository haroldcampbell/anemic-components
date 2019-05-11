/**
 * Tests the truthiness of the specified object
 *
 * @function $isTruthy
 *
 * @param {Object} obj
 *
 * @return {boolean}
 */
export function $isTruthy(obj) {
  return !(obj === null) && !(obj == null);
}

export function $isEmpty(obj) {
  return !$isTruthy(obj);
}
/**
 * Wrapper around console.log
 *
 * @function $log
 *
 * @param {String} message - The message to log to the console.
 * @param {boolean} trace - Show trace if truthy.
 */
export function $log(message, trace) {
  console.log(message);
  if (trace) {
    console.trace()
  }
}

/**
 * Returns the specified angles in radians.
 *
 * @function degreesToRadians
 *
 * @param {Number} angleInDegrees - The angle to convert.
 *
 * @return {Number} - The angle in radians.
 */
export function $degreesToRadians(angleInDegrees) {
  return angleInDegrees * Math.PI / 180.0;
}

/**
 * Based on http://jsbin.com/sokacelaga/edit?html,js,output
 *
 * @function $polarToCartesian
 *
 * @param {Number} centerX
 * @param {Number} centerY
 * @param {Number} radius
 * @param {Number} angleInDegrees
 *
 * @return {Number}
 */
export function $polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  var angleInRadians = $degreesToRadians(angleInDegrees);

  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
}

export function copyProps(srcObj, targetObj, exclude=null) {
  for (let id in srcObj) {
    if (exclude != null && exclude.indexOf(id) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(srcObj, id)) continue;

    targetObj[id] = srcObj[id]
  }
}