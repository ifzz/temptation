import * as dialogActions from './dialogActions'

import userApis from '../../apis/users'

export const FETCH_USER_INFO_STARTED = 'FETCH_USER_INFO_STARTED'
export const FETCH_USER_INFO_FINISHED = 'FETCH_USER_INFO_FINISHED'
export const FETCH_USER_INFO_FAILED = 'FETCH_USER_INFO_FAILED'
export const USER_LOG_OUT = 'USER_LOG_OUT'

/**
 * 登录
 * @param {string} username 用户名
 * @param {string} pwd 密码
 * @param {string} code 验证码
 * @param {function} succFunc 成功的回调函数
 */
export function login(username, pwd, code, succFunc) {
  return (dispatch, getState) => {
    dispatch({ type: FETCH_USER_INFO_STARTED })
    userApis.login(username, pwd, code)
      .then((data) => {
        dispatch({ type: FETCH_USER_INFO_FINISHED, userInfo: data })
        succFunc && succFunc(data)
      })
      .catch((err) => {
        dispatch({ type: FETCH_USER_INFO_FAILED })
        dispatch(dialogActions.alert({ title: '错误', msg: err.message }))
      })
  }
}

export function logout() {
  return (dispatch) => {
    dispatch({ type: USER_LOG_OUT })
  }
}
