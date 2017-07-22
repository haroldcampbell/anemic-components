'use strict';

/**
 * Tests the truthiness of the specified object
 * @param obj
 * @returns {boolean}
 */
function $isTruthy(obj) {
  return !!obj
}


function $log(message, trace) {
  console.log(message);
  if (trace)
    console.trace()
}
