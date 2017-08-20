import * as ActionTypes from '../actions/global'

export const title = (state = '', { type, title }) => {
  if (type === ActionTypes.SET_TITLE) {
    return title
  }
  return state
}

/**
 * 侧滑菜单
 */
export const sideMenu = (state = false, { type }) => {
  if (type === ActionTypes.OPEN_SIDE_MENU) {
    return true
  } else if (type === ActionTypes.CLOSE_SIDE_MENU) {
    return false
  } else {
    return state
  }
}

/**
 * 登录对话框的开启状态
 */
export function loginDialog(state = false, { type }) {
  if (type === ActionTypes.OPEN_LOGIN_DIALOG) {
    return true
  } else if (type === ActionTypes.CLOSE_LOGIN_DIALOG) {
    return false
  } else {
    return state
  }
}

/**
 * 用户信息对话框的开启状态
 */
export function userInfoDialog(state = false, { type }) {
  if (type === ActionTypes.OPEN_USER_INFO_DIALOG) {
    return true
  } else if (type === ActionTypes.CLOSE_USER_INFO_DIALOG) {
    return false
  } else {
    return state
  }
}
