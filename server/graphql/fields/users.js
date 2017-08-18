import {
  GraphQLString,
  GraphQLBoolean,
  GraphQLInt,
} from 'graphql'

import Models from '../../../core/models'
import { UserType, UserListType } from '../types/users'
import securityPass from '../../../framework/security/pass'

const UserModel = Models.users()

export const userInfo = {
  type: UserType,
  description: '查询用户详细信息',
  args: {
    id: {
      type: GraphQLString,
    },
  },
  resolve(root, params, session) {
    let id
    if (params.id) {
      id = params.id
    } else if (session.user) {
      id = session.user._id
    } else {
      return new Error('缺失参数：id')
    }
    return UserModel.findById(id)
  },
}

export const register = {
  type: UserType,
  description: '创建用户',
  args: {
    username: {
      type: GraphQLString,
    },
    password: {
      type: GraphQLString,
    },
    confirmPassword: {
      type: GraphQLString,
    },
  },
  resolve(root, params, session) {
    let {
      username,
      password,
      confirmPassword,
    } = params

    return new Promise((resolve, reject) => {
      let handler = (err, user) => {
        if (!err && user) {
          session.user = user
          session.save(() => {
            resolve(user)
          })
        } else {
          reject(err.message)
        }
      }

      if (password !== confirmPassword) {
        handler(new Error('两次密码输入不一致!'))
      } else if (!username || !password) {
        handler(new Error('用户名/密码不能为空!'))
      } else {
        // 校验用户是否已注册
        UserModel.findOne({
          username: username,
        }, (err, user) => {
          if (err) {
            handler(err)
          }
          if (user) {
            handler(new Error('用户名已存在.'))
          } else {
            // 用户尚未注册
            securityPass.hash(password, (err, salt, hash) => {
              if (err) {
                // 加密密码失败
                handler(err)
              } else {
                // 加密成功 存储用户数据
                let user = {
                  username,
                  salt,
                  hash,
                  profiles: {
                    nickname: username,
                  },
                }

                let userModel = UserModel(user)

                userModel.save((err, newUser) => {
                  if (!err) {
                    handler(null, newUser)
                  } else {
                    handler(new Error('用户创建失败.'))
                  }
                })
              }
            })
          }
        })
      }
    })
  },
}

export const login = {
  type: UserType,
  description: '用户登录',
  args: {
    username: {
      type: GraphQLString,
    },
    password: {
      type: GraphQLString,
    },
  },
  resolve(root, params, session) {
    let {
      username,
      password,
    } = params

    return new Promise((resolve, reject) => {
      let handler = (err, user) => {
        if (!err && user) {
          session.user = user
          session.save(() => {
            resolve(user)
          })
        } else {
          reject(err.message)
        }
      }

      if (!username || !password) {
        handler(new Error('用户名/密码不能为空!'))
      } else {
        // 校验用户是否已注册
        UserModel.findOne({
          username: username,
        }, (err, user) => {
          if (err) {
            handler(err)
          } else if (user) {
            securityPass.hash(password, user.salt, (err, salt, hash) => {
              if (err) {
                // 加密密码失败
                handler(err)
              } else if (hash === user.hash) {
                handler(null, user)
              } else {
                handler(new Error('用户名或密码错误'))
              }
            })
          } else {
            // 用户尚未注册
            handler(new Error('用户未注册'))
          }
        })
      }
    })
  },
}

export const userList = {
  type: UserListType,
  description: '查询用户列表',
  args: {
    pageIndex: {
      type: GraphQLInt,
      description: '页码',
      defaultValue: 1,
    },
    pageSize: {
      type: GraphQLInt,
      description: '每页容量',
      defaultValue: 10,
    },
  },
  resolve(root, params, session) {
    let {
      pageIndex,
      pageSize,
    } = params

    return UserModel
      .find()
      .skip(pageSize * (pageIndex - 1))
      .limit(pageSize)
  },
}

export const updateUserProfile = {
  type: GraphQLBoolean,
  description: '修改用户个人资料',
  args: {
    terms: {
      type: GraphQLString,
      require: true,
    },
  },
  resolve(root, params, session) {
    let newModel = JSON.parse(params.terms)
    if (!session.user) {
      return new Error('You need to login first.')
    }
    return UserModel
      .findOneAndUpdate({
        _id: session.user._id,
      }, newModel)
      .then(_d => !!_d)
  },
}
