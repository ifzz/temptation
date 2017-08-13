import express from 'express'

import avatarGen from '../../../framework/utils/avatarGenerator'
import securityPass from '../../../framework/security/pass'
import Models from '../../../core/models'

let UserModel = Models.user()

const router = express.Router()

router.post((req, res) => {
  let name = req.body.username
  let pass = req.body.password
  let confirm_password = req.body.confirmpwd
  let sess = req.session
  let handler = (err, user) => {
    if (!err && user) {
      sess.regenerate(() => {
        req.session.user = user
        // resDispatcher('registerSuccess', req, res, user)
      })
    } else {
      // resDispatcher('registerFailed', req, res, err.message)
    }
  }

  if (pass !== confirm_password) {
    handler(new Error('两次密码输入不一致!'))
  } else if (name === '' || pass === '') {
    handler(new Error('用户名/密码不能为空!'))
  } else {
    // 校验用户是否已注册
    UserModel.findOne({
      username: name,
    }, (err, user) => {
      if (err) {
        handler(err)
      }
      if (user) {
        handler(new Error('用户名已存在.'))
      } else {
        // 用户尚未注册 使用用户名作为盐加密密码
        securityPass.hash(pass, (err, salt, hash) => {
          if (err) {
            // 加密密码失败
            handler(err)
          } else {
            // 加密成功 存储用户数据
            let user = {
              username: name,
              salt: salt,
              hash: hash,
              nickname: name,
              avatar: `/avatars/${name}.png`,
            }
            let userModel = UserModel(user)
            userModel.save((err, newUser) => {
              if (!err) {
                avatarGen(name, 'male', () => {
                  handler(null, newUser)
                })
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

export default router
