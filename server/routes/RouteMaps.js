import indexRoutes from './http/index'
import graphqlRoutes from './graphql/index'
import notFound from '../errors/notFound'

export default function(app) {
  // --authentication valid routers--
  app.use('/', indexRoutes)
  app.use('/graphql', graphqlRoutes)

  // --error handler--
  app.use('/', notFound)
}
