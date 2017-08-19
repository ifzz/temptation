import path from 'path'
import Express from 'express'
import webpack from 'webpack'
import devMiddleware from 'webpack-dev-middleware'
import hotMiddleware from 'webpack-hot-middleware'
import bodyParser from 'body-parser'
import cors from 'cors'
import http from 'http'

import config from '../config/index'
import webpackClientConfig from '../config/webpack.config'
import sessionRegistry from '../framework/redis/session'
import routeMapsInit from './routes/RouteMaps'
import initChatroom from './socketServices/chatroom'

// init chatroom socket service
const app = new Express()
const server = http.createServer(app)
const paths = config.utils_paths

initChatroom(server)
// static resource
app.use(Express.static(path.resolve(__dirname, '../public')))
app.use('/static', Express.static(paths.dist()))

app.use(cors({
  origin: 'localhost:8001',
  credentials: true,
  optionsSuccessStatus: 200,
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false,
}))
app.use(sessionRegistry)

routeMapsInit(app)

if (config.globals.__DEV__) {
  let compiler = webpack(webpackClientConfig)
  app.use(devMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackClientConfig.output.publicPath,
  }))
  app.use(hotMiddleware(compiler))
}

server.listen(config.server_port, () => {
  console.log(`Server is listening on port ${config.server_port}`)
})
