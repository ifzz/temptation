import connection from '../framework/dbProviders/mongoProvider'
import users from './schemas/users'
import chatRecords from './schemas/chatRecords'

const schemaMapper = {
  users: () => connection.model('users', users),
  chatRecords: () => connection.model('chatRecords', chatRecords),
}

export default schemaMapper
