export const TOAST_MESSAGE = 'TOAST_MESSAGE'
export const CLOSE_TOAST = 'CLOSE_TOAST'

export function toast(msg = '') {
  return {
    type: TOAST_MESSAGE,
    msg,
  }
}

export function closeToast() {
  return {
    type: CLOSE_TOAST,
  }
}
