import expressGraphql from 'express-graphql'

import indexRoutes from '../http/index'
import graphqlSchema from '../graphql'

const graphqlRoutes = expressGraphql(req => ({
  schema: graphqlSchema,
  context: req.session,
  graphiql: true,
}))

export default function(app) {
  app.use('/', indexRoutes)
  app.use('/data', graphqlRoutes)
}
