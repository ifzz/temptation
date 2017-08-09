import Express from 'express'
import webpack from 'webpack'
import devMiddleware from 'webpack-dev-middleware'
import hotMiddleware from 'webpack-hot-middleware'

import config from '../config/index'
import webpackClientConfig from '../config/webpack.config'

const app = new Express()
const paths = config.utils_paths

app.use(Express.static(paths.dist('client')))

// use any view engine if you like to
const renderLayout = () => `<!doctype html>
    <html lang="zh-cn">
    <head>
        <title>Temptation!</title>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
    </head>
    <body>
        <div id="root" style="height: 100%"></div>
        <script src="/static/main.min.js"></script>
    </body>
    </html>`

if (config.globals.__DEV__) {
  let compiler = webpack(webpackClientConfig)
  app.use(devMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackClientConfig.output.publicPath,
  }))
  app.use(hotMiddleware(compiler))
} else {
  app.use('/static', Express.static(paths.dist()))
}

app.use('/', (req, res, next) => {
  res.set('content-type', 'text/html')
  res.send(renderLayout())
  res.end()
})

app.listen(config.server_port, () => {
  console.log(`Server is listening on port ${config.server_port}`)
})
