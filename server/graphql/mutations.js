import {
  GraphQLObjectType as Obj,
} from 'graphql'

import {
  register,
  updateUserProfile,
} from './fields/users'

export default new Obj({
  name: 'Mutations',
  fields: {
    register,
    updateUserProfile,
  },
})
