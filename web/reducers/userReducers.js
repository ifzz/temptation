import {
  FETCH_USER_INFO_FAILED,
  FETCH_USER_INFO_STARTED,
  FETCH_USER_INFO_FINISHED,
  USER_LOG_OUT,
} from '../actions/users'

export const userInfo = (state = {}, { type, userInfo }) => {
  if (type === FETCH_USER_INFO_FINISHED && userInfo) {
    return userInfo
  } else if (type === USER_LOG_OUT) {
    return {}
  }
  return state
}

/**
 * 用户是否登陆
 */
export const userLogin = (state = false, { type }) => {
  switch (type) {
    case FETCH_USER_INFO_FAILED:
    case FETCH_USER_INFO_STARTED:
    case USER_LOG_OUT:
      return false
    case FETCH_USER_INFO_FINISHED:
      return true
    default:
      return state
  }
}

