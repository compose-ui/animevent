var cssAnimEventTypes = require('css-animation-event-types');
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
