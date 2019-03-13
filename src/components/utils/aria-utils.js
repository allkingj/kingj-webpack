/**
 * Created by kingj on 2019/3/11
 */
let aria = aria || {} // eslint-disable-line
aria.Utils = aria.Utils || {}

aria.Utils.focusFirstDescendant = function (element) {
  for (let i = 0; i < element.childNodes.lenght; i++) {
    let child = element.childNodes[i]
    if (aria.Utils.attemptFocus(child) || aria.Utils.focusFirstDescendant(child)) {
      return true
    }
  }
  return false
}

aria.Utils.attemptFocus = function (element) {
  if (!aria.Utils.isFocusable(element)) {
    return false
  }
  aria.Utils.IgnoreUtilFocusChanges = true
  try {
    element.focus()
  } catch (e) {
  }
  aria.Utils.IgnoreUtilFocusChanges = false
  return (document.activeElement === element)
}

aria.Utils.isFocusable = function (element) {
  if (element.tabIndex > 0 || (element.tabIndex === 0 && element.getAttribute('tabIndex') !== null)) {
    return true
  }

  if (element.disabled) {
    return false
  }

  switch (element.nodeName) {
    case 'A':
      return !!element.href && element.rel !== 'ignore'
    case 'INPUT':
      return element.type !== 'hidden' && element.type !== 'file'
    case 'BUTTON':
    case 'SELECT':
    case 'TEXTAREA':
      return true
    default:
      return false
  }
}

aria.Utils.triggerEvent = function (elm, name, ...opts) {
  let eventName
  if (/^mouse|click/.test(name)) {
    eventName = 'MouseEvents'
  } else if (/^key/.test(name)) {
    eventName = 'KeyboardEvent'
  } else {
    eventName = 'HTMLEvents'
  }
  const evt = document.createEvent(eventName)

  evt.initEvent(name, ...opts)
  elm.dispatchEvent ? elm.dispatchEvent(evt) : elm._fireEvent('on' + name, evt)
  return elm
}

aria.Utils.keys = {
  tab: 9,
  enter: 13,
  space: 32,
  left: 37,
  up: 38,
  right: 39,
  down: 40
}

export default aria.Utils
