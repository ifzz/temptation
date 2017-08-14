import indexRoutes from './http/index'
import graphqlRoutes from './graphql/index'

export default function(app) {
  // --authentication valid routers--
  app.use('/', indexRoutes)
  app.use('/graphql', graphqlRoutes)
}
