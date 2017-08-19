import connection from '../framework/dbProviders/mongoProvider'

import users from './schemas/users'
import platforms from './schemas/platforms'

export default {
  users: () => connection.model('users', users),
  platforms: () => connection.model('platforms', platforms),
}
