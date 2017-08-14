import redis from 'redis'
import redisWrapper from 'redis-conn-wrapper'
import propReader from 'properties-reader'

let reader = propReader('server.properties')
let ip = reader.get('redisServer.ip')
let port = reader.get('redisServer.port')
let client = redis.createClient(port, ip, {})
let wrapper = redisWrapper(redis, {
  host: ip,
  port,
})

client
  .on('ready', () => {
    console.log('redis connected successfully.')
  })
  .on('reconnecting', () => {
    console.log('redis reconnecting...')
  })
  .on('error', (err) => {
    console.error(`redis connect error:${err}`)
  })

export const longConnection = client
export const tempConnection = wrapper
