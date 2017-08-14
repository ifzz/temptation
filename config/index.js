const path = require('path')
const ip = require('ip')

const PORT = 8001

let config = {
  env: process.env.NODE_ENV || 'development',
  path_base: path.resolve(__dirname, '..'),
  dir_web: 'web',
  dir_dist: 'dist',
  dir_server: 'server',
  server_host: ip.address(),
  server_port: process.env.PORT || PORT,
  image_magic_install_path: 'C:\\Program Files\\ImageMagick\\magick',
}

function base(...args) {
  return path.resolve(config.path_base, ...args)
}

config.utils_paths = {
  base: base,
  web: base.bind(null, config.dir_web),
  dist: base.bind(null, config.dir_dist),
}

config.globals = {
  'process.env': {
    'NODE_ENV': JSON.stringify(config.env),
  },
  'NODE_ENV': config.env,
  '__DEV__': config.env === 'development',
  '__PROD__': config.env === 'production',
  '__TEST__': config.env === 'test',
}

module.exports = config
