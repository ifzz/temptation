import expressGraphql from 'express-graphql'

import schema from './schema/default'

const graphqlRoutes = expressGraphql(req => ({
  schema: schema,
  context: req.session,
  graphiql: true,
}))

export default graphqlRoutes
