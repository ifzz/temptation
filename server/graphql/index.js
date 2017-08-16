import {
  GraphQLSchema as GSchema,
} from 'graphql'

import query from './queries'
import mutation from './mutations'

const schema = new GSchema({
  query,
  mutation,
})

export default schema
