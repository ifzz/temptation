import * as dialogActions from './dialog'

import {
  login as doLogin,
  register as doRegister,
  logout as doLogout,
} from '../../apis/users'

export const FETCH_USER_INFO_STARTED = 'FETCH_USER_INFO_STARTED'
export const FETCH_USER_INFO_FINISHED = 'FETCH_USER_INFO_FINISHED'
export const FETCH_USER_INFO_FAILED = 'FETCH_USER_INFO_FAILED'
export const USER_LOG_OUT = 'USER_LOG_OUT'

/**
 * 登录
 * @param {string} username 用户名
 * @param {string} pwd 密码
 * @param {function} succFunc 成功的回调函数
 */
export function login(username, pwd, succFunc) {
  return (dispatch, getState) => {
    dispatch({ type: FETCH_USER_INFO_STARTED })

    doLogin(username, pwd)
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

/**
 * 注册
 * @param {string} username 用户名
 * @param {string} pwd 密码
 * @param {string} confirmPwd 确认密码
 * @param {function} succFunc 成功的回调函数
 */
export function register(username, pwd, confirmPwd, succFunc) {
  return (dispatch, getState) => {
    dispatch({ type: FETCH_USER_INFO_STARTED })

    doRegister(username, pwd, confirmPwd)
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

export function logout(succCallback) {
  return (dispatch, getState) => {
    doLogout()
      .then(() => {
        dispatch({ type: USER_LOG_OUT })
        typeof succCallback === 'function' && succCallback()
      })
      .catch((err) => {
        dispatch(dialogActions.alert({ title: '错误', msg: err.message }))
      })
  }
}
