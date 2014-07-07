var cssAnimEventTypes = getAnimationEventTypes();
var bean = require('bean')
var supported = cssAnimEventTypes.start !== undefined

module.exports = {
  on: on,
  off: off,
  one: one
}

function setEvent(type, element, eventType, callback) {
  if(!supported) return callback()

  if (eventType = cssAnimEventTypes[eventType]) {
      bean[type](element, eventType, callback)
  } else {
    console.error("cssAnimEventTypes does not support event: " + eventType)
    return false
  }
}

function on(element, eventType, callback) {
  setEvent('on', element, eventType, callback)
}

function one(element, eventType, callback) {
  setEvent('one', element, eventType, callback)
}

function off(element, eventType, callback) {
  setEvent('off', element, eventType, callback)
}

function camelCaseEventTypes(prefix) {
  prefix = prefix || '';

  return {
    start: prefix + 'AnimationStart',
    end: prefix + 'AnimationEnd',
    iteration: prefix + 'AnimationIteration'
  };
}

function lowerCaseEventTypes(prefix) {
  prefix = prefix || '';

  return {
    start: prefix + 'animationstart',
    end: prefix + 'animationend',
    iteration: prefix + 'animationiteration'
  };
}

/**
 * @return {Object} Animation event types {start, end, iteration}
 */

function getAnimationEventTypes() {
  var prefixes = ['webkit', 'Moz', 'O', ''];
  var style = document.documentElement.style;

  // browser compliant
  if (undefined !== style.animationName) {
    return lowerCaseEventTypes();
  }

  for (var i = 0, len = prefixes.length, prefix; i < len; i++) {
    prefix = prefixes[i];

    if (undefined !== style[prefix + 'AnimationName']) {
      // Webkit
      if (0 === i) {
        return camelCaseEventTypes(prefix.toLowerCase());
      }
      // Mozilla
      else if (1 === i) {
        return lowerCaseEventTypes();
      }
      // Opera
      else if (2 === i) {
        return lowerCaseEventTypes(prefix.toLowerCase());
      }
    }
  }

  return {};
}
