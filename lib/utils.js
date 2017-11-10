/**
 * Tests the truthiness of the specified object
 * @param obj
 * @returns {boolean}
 */
export function $isTruthy(obj) {
  return !(obj === null) && !(obj == null);
}

function $log(message, trace) {
  console.log(message);
  if (trace)
    console.trace()
}
