import express from 'express'
import HashMapping from '../../HashMapping.json'
import config from '../../config/index'

const router = express.Router()
let mainFilePath = HashMapping.main

const RENDER_INDEX = INIT_DATA => `<!doctype html>
    <html lang="zh-cn">
    <head>
        <title>Temptation!</title>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
    </head>
    <body>
        <div id="root" style="height: 100%"></div>
        <script>
          window.__INIT_STATE=${JSON.stringify(INIT_DATA)}
        </script>
        <script src="${config.globals.__DEV__ ? '/static/main.min.js' : mainFilePath}"></script>
        <link href="//cdn.bootcss.com/animate.css/3.5.2/animate.min.css" rel="stylesheet">
    </body>
    </html>`

router.get(['/', '/index'], (req, res) => {
  let user = req.session.user
  if (req.session.user) {
    let { _id, username, profiles } = user
    let { avatar, age, nickname, phone, email } = profiles
    res.send(RENDER_INDEX({
      userInfo: {
        id: _id,
        username,
        avatar,
        age,
        phone,
        email,
        nickname,
      },
    }))
  } else {
    res.send(RENDER_INDEX({ userInfo: {} }))
  }
})

export default router
