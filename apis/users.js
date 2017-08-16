import { graphql } from './base'

export default {
  userList: () => graphql('{ userList { id,nickname,avatar } }'),
  userInfo: id => graphql(`{ userInfo(id:"${id}"){ username,nickname,age,gender,city,hometown,phone,email,birthday,address } }`),
  /**
   * 编辑个人信息
   * @param {Object} terms 编辑的条目
   */
  updateUserProfile: terms => graphql(`mutation { updateUserProfile(terms:"${terms.replace(/"/g, '\\"')}") }`),
}
