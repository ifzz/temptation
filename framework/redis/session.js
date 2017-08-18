import session from 'express-session'
import connRedis from 'connect-redis'
import config from '../../config'
import {
  longConnection,
} from './index'

const RedisStore = connRedis(session)

/**
 * register the redis-session-storage middleware for the server application
 * @type {*|Function}
 */
export default session({
  name: 's',
  store: new RedisStore({
    client: longConnection,
    prefix: 'RS',
  }),
  secret: 'fxxk ti7',
  resave: true,
  saveUninitialized: false,
  cookie: {
    secure: false,
    domain: config.domain,
  },
})
