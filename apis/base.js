import fetch from 'isomorphic-fetch'

export const SERVER = 'http://127.0.0.1:8001'

const BASE_API = `${SERVER}/api`
const GRAPHQL_API = `${SERVER}/data`
const DEFAULT_HEADERS = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
}

let errConsumer
let errQueue = []

/**
 * 尝试消费错误,如果没有指定消费函数,则加入队列
 * @param err
 */
var tryConsumeErr = function (err) {
  if (!!errConsumer && typeof errConsumer === 'function') {
    if (err) {
      errConsumer(err)
    } else if (errQueue.length > 0) {
      errQueue.map(errConsumer)
    }
  } else {
    errQueue[errQueue.length] = err
  }
}

/**
 * 设置错误队列消费函数,唯一
 * @param consumeFunc
 */
export function setErrConsumeFunction(consumeFunc) {
  errConsumer = consumeFunc
  tryConsumeErr()
}

/**
 * 发送get请求
 * @param {string} action action地址
 * @returns {Promise.<T>}
 */
export function getData(action) {
  return fetch(`${BASE_API}/${action}`, {
    method: 'GET',
    headers: DEFAULT_HEADERS,
  })
    .then(res => res.json())
    .catch((err) => {
      tryConsumeErr(err)
    })
}

/**
 * 发送post请求
 * @param {string} action action地址
 * @param {object} params 参数
 * @returns {Promise.<T>} ?
 */
export function postData(action, params) {
  return fetch(`${BASE_API}/${action}`, {
    method: 'POST',
    headers: DEFAULT_HEADERS,
    body: JSON.stringify(params),
  })
    .then(res => res.json())
    .catch((err) => {
      tryConsumeErr(err)
    })
}

/**
 * graphql 查询
 * @param {string} actionName 接口名称
 * @param {string} query 查询语句
 * @param {object} varibles 变量
 * @param {string} operationName 操作类型名称
 */
export function graphql(actionName, query, varibles, operationName) {
  return fetch(GRAPHQL_API, {
    method: 'POST',
    headers: DEFAULT_HEADERS,
    body: JSON.stringify({
      query: query,
      varibles: varibles || null,
      operationName: operationName || null,
    }, (k, v) => {
      if (typeof v === 'string') {
        return v.replace(/(\s+|\n) /g, ' ')
      }
      return v
    }),
  })
    .then(res => res.json())
    .catch((err) => {
      tryConsumeErr(err) // 请求异常交给系统注册的errorHandler处理
    })
    .then(({ errors, data }) => {
      if (errors) {
        throw new Error(errors[0].message)
      } else {
        return data[actionName] || {}
      }
    })
}
