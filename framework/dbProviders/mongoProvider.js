import mongoose from 'mongoose'
import propReader from 'properties-reader'
import bluebird from 'bluebird'

let reader = propReader('server.properties')

const db = mongoose.createConnection(reader.get('dbServer.ip'), reader.get('dbServer.name'))

mongoose.Promise = bluebird

// 成功链接数据库
db.once('open', () => console.log('mongodb has open!'))

// 链接数据库失败
db.on('error', err => console.log(`mongodb connect error ${err}`))

export default db
