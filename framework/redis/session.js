import session from 'express-session'
import connRedis from 'connect-redis'
import {
  longConnection,
} from './index'

const RedisStore = connRedis(session)

/**
 * register the redis-session-storage middleware for the server application
 * @type {*|Function}
 */
exports.registry = session({
  name: 's',
  store: new RedisStore({
    client: longConnection,
    prefix: 'RS',
  }),
  secret: 'fxxk ti7',
  resave: true,
  saveUninitialized: false,
})
