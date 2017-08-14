import * as ActionTypes from '../actions/toast'

export default function toastMessage(state = null, { type, msg }) {
  if (type === ActionTypes.TOAST_MESSAGE) {
    return msg
  } else if (type === ActionTypes.CLOSE_TOAST) {
    return null
  }
  return state
}
