import path from 'path'
import Express from 'express'
import webpack from 'webpack'
import devMiddleware from 'webpack-dev-middleware'
import hotMiddleware from 'webpack-hot-middleware'
import bodyParser from 'body-parser'

import config from '../config/index'
import webpackClientConfig from '../config/webpack.config'
import sessionModule from '../framework/redis/session'
import routeMapsInit from './routes/RouteMaps'

const app = new Express()
const paths = config.utils_paths

// static resource
app.use(Express.static(path.resolve(__dirname, '../public')))
app.use('/static', Express.static(paths.dist()))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false,
}))
app.use(sessionModule.registry)

routeMapsInit(app)

if (config.globals.__DEV__) {
  let compiler = webpack(webpackClientConfig)
  app.use(devMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackClientConfig.output.publicPath,
  }))
  app.use(hotMiddleware(compiler))
}

app.listen(config.server_port, () => {
  console.log(`Server is listening on port ${config.server_port}`)
})
