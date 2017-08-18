import {
  GraphQLObjectType as Obj,
} from 'graphql'

import {
  login,
  logout,
  userInfo,
  userList,
} from './fields/users'

export default new Obj({
  name: 'Queries',
  fields: {
    login,
    logout,
    userInfo,
    userList,
  },
})

