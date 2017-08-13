/**
 * 404 not found 的错误处理
 * @returns {Function}
 */

export default (req, res, next) => {
  console.log('404,not found!')
  res.status(404)
  res.send('404 not found')
}
