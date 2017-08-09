const path = require('path')
const pkg = require('../package.json')
const ip = require('ip')
const debug = require('debug')('app:config')
const PORT = 80

let config = {
  env: process.env.NODE_ENV || 'development',
  path_base: path.resolve(__dirname, '..'),
  dir_web: 'web',
  dir_dist: 'dist',
  dir_server: 'server',
  server_host: ip.address(),
  server_port: process.env.PORT || PORT,
  compiler_babel: {
    cacheDirecotry: true,
    plugins: ['transform-runtime'],
    presets: [
      ['env', {
        targets: {
          browsers: [
            '>1%',
            'last 4 versions',
            'Firefox ESR',
            'not ie < 9'
          ]
        },
        modules: false,
        useBuiltIns: false,
        debug: false
      }],
      'stage-2',
      'react'
    ]
  },
  compiler_hash_type: 'hash',
  compiler_fail_on_warning: false,
  compiler_quiet: false,
  compiler_public_path: '/',
  compiler_stats: {
    chunks: false,
    chunkModules: false,
    colors: true
  },
  compiler_vendors: [
    'react',
    'redux',
    'react-redux',
    'react-router-dom',
  ]
}

function base() {
  const args = [config.path_base].concat([].slice.call(arguments))
  return path.resolve.apply(path, args)
}

config.utils_paths = {
  base: base,
  web: base.bind(null, config.dir_web),
  dist: base.bind(null, config.dir_dist)
}

config.globals = {
  'process.env': {
    'NODE_ENV': JSON.stringify(config.env)
  },
  'NODE_ENV': config.env,
  '__DEV__': config.env === 'development',
  '__PROD__': config.env === 'production',
  '__TEST__': config.env === 'test'
}

// ------------------------------------
// Validate Vendor Dependencies
// ------------------------------------

config.compiler_vendors = config.compiler_vendors
  .filter((dep) => {
    if (pkg.dependencies[dep]) return true

    debug(
      `Package '${dep}' was not found as an npm dependency in package.json; ` +
      `it won't be included in the webpack vendor bundle.
       Consider removing it from compiler_vendors in ~/config/index.js`
    )
  })



// ========================================================
// Environment Configuration
// ========================================================
debug(`Looking for environment overrides for NODE_ENV '${config.env}'.`)
const environments = require('./environments')
const overrides = environments[config.env]
if (overrides) {
  debug('Found overrides, applying to default configuration.')
  Object.assign(config, overrides(config))
} else {
  debug('No environment overrides found, defaults will be used.')
}

module.exports = config
