import * as ActionTypes from '../actions/dialog'

export function alertMessage(
  state = null,
  {
    type,
    title,
    msg,
    callback,
    btnText,
  },
) {
  if (type === ActionTypes.ALERT_MESSAGE) {
    return {
      title,
      msg,
      callback,
      btnText,
    }
  } else if (type === ActionTypes.CLOSE_DIALOG) {
    return null
  }
  return state
}

export function confirmMessage(
  state = null,
  {
    type,
    title,
    msg,
    confirmCallback,
    cancelCallback,
    confirmText,
    cancelText,
  },
) {
  if (type === ActionTypes.CONFIRM_MESSAGE) {
    return {
      title,
      msg,
      confirmCallback,
      cancelCallback,
      confirmText,
      cancelText,
    }
  } else if (type === ActionTypes.CLOSE_DIALOG) {
    return null
  }
  return state
}
