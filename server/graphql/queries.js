import {
  GraphQLObjectType as Obj,
} from 'graphql'

import {
  userInfo,
  userList,
} from './fields/users'

export default new Obj({
  name: 'Queries',
  fields: {
    userInfo,
    userList,
  },
})

