import connection from '../framework/dbProviders/mongoProvider'

const SCHEMAS = ['user', 'chatRecord']

/**
 * 根据SCHEMAS中的key生成对应的schema映射
 * 映射生成的是获取对应model的connection创建方法
 * 这样只会在调用时去构建数据库连接
 */
const schemaMapper = {}
SCHEMAS.forEach((key) => {
  /* eslint-disable */
  schemaMapper[key] = () => connection.model(key, require(`./schemas/${key}`))
}, this)

export default schemaMapper
