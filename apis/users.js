import { graphql } from './base'

const USER_PROPERTIES = 'id,username,nickname,avatar,age,phone,email'

export const userList = () => graphql('userList', `{ userList { ${USER_PROPERTIES} } }`)
export const userInfo = id => graphql('userInfo', `{ userInfo(id:"${id}"){ ${USER_PROPERTIES} } }`)
/**
 * 编辑个人信息
 * @param {Object} terms 编辑的条目
 */
export const updateUserProfile = terms => graphql('updateUserProfile', `mutation { updateUserProfile(terms:"${terms.replace(/"/g, '\\"')}") }`)

export const register = (
  username,
  pwd,
  confirmPwd,
) => graphql('register', `mutation { register(username:"${username}",password:"${pwd}",confirmPassword:"${confirmPwd}"){ ${USER_PROPERTIES} } }`)

export const login = (
  username,
  pwd,
) => graphql('login', `{ login(username:"${username}",password:"${pwd}"){ ${USER_PROPERTIES} }}`)

export const logout = () => graphql('logout', '{ logout }')
