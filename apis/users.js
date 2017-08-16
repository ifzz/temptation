import { graphql } from './base'

export default {
  userList() {
    return graphql('{ userList { id,username,avatar } }')
  },
  userInfo(id) {
    return graphql(`{ userInfo(id:"${id}"){ age,gender,city,hometown,phone,email,birthday,address } }`)
  },
  /**
   * 编辑个人信息
   * @param {Object} terms 编辑的条目
   */
  updateUserProfile(terms) {
    return graphql(`mutation { 
            updateUserProfile(terms:"${terms.replace(/\"/g, '\\"')}") 
        }`)
  },
}
