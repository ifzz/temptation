export const SET_TITLE = 'SET_TITLE'

export function setTitle(title) {
  return {
    type: SET_TITLE,
    title,
  }
}

/*
  侧滑菜单
*/
export const OPEN_SIDE_MENU = 'OPEN_SIDE_MENU'
export const CLOSE_SIDE_MENU = 'CLOSE_SIDE_MENU'

export function toggleSideMenu(flag) {
  return { type: flag ? OPEN_SIDE_MENU : CLOSE_SIDE_MENU }
}

/*
  全局的登录对话框
*/
export const OPEN_LOGIN_DIALOG = 'OPEN_LOGIN_DIALOG'
export const CLOSE_LOGIN_DIALOG = 'CLOSE_LOGIN_DIALOG'

export function toggleLoginDialog(flag) {
  return { type: flag ? OPEN_LOGIN_DIALOG : CLOSE_LOGIN_DIALOG }
}
