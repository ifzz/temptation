import {
  GraphQLObjectType as Obj,
} from 'graphql'

import {
  login,
  userInfo,
  userList,
} from './fields/users'

export default new Obj({
  name: 'Queries',
  fields: {
    login,
    userInfo,
    userList,
  },
})

