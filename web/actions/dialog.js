/**
 * 弹出提示对话框
 */
export const ALERT_MESSAGE = 'ALERT_MESSAGE'

/**
 * 弹出确认对话框
 */
export const CONFIRM_MESSAGE = 'CONFIRM_MESSAGE'

/**
 * 关闭对话框
 */
export const CLOSE_DIALOG = 'CLOSE_DIALOG'

export function alert({
  title,
  msg = '',
  callback,
  btnText = '确定',
}) {
  return {
    type: ALERT_MESSAGE,
    title,
    msg,
    callback,
    btnText,
  }
}

export function confirm({
  title,
  msg = '',
  confirmCallback,
  cancelCallback,
  confirmText = '确定',
  cancelText = '取消',
}) {
  return {
    type: CONFIRM_MESSAGE,
    title,
    msg,
    confirmCallback,
    cancelCallback,
    confirmText,
    cancelText,
  }
}

export function closeDialog() {
  return {
    type: CLOSE_DIALOG,
  }
}
