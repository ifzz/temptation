const path = require('path')
const webpack = require('webpack')
const fs = require('fs')

const pkg = require('../package.json')
const config = require('./index')

const paths = config.utils_paths
const __DEV__ = config.globals.__DEV__

module.exports = {
  name: 'client',
  target: 'web',
  entry: __DEV__ ? [
    'react-hot-loader/patch',
    'webpack-hot-middleware/client',
    'webpack/hot/only-dev-server',
    paths.web('main.js'),
  ] : [
    paths.web('main.js'),
  ],
  output: {
    path: paths.dist(),
    publicPath: '/static',
    filename: 'main.min.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: [
          paths.web(),
        ],
        exclude: /node_modules/,
        query: {
          babelrc: false,
          presets: [
            [
              'env',
              {
                targets: {
                  browsers: pkg.browserList,
                },
                modules: false,
                useBuiltIns: false,
                debug: false,
              },
            ],
            'stage-2',
            'react',
          ],
          plugins: __DEV__ ? [
            'react-hot-loader/babel',
          ] : [],
        },
      },
      {
        test: /\.s?css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              // CSS Loader https://github.com/webpack/css-loader
              importLoaders: 1,
              sourceMap: false,
              // CSS Modules https://github.com/css-modules/css-modules
              modules: true,
              localIdentName: __DEV__ ? '[name]-[local]-[hash:base64:5]' : '[hash:base64:5]',
              minimize: !__DEV__,
              discardComments: { removeAll: true },
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                require('postcss-global-import')(),
                require('postcss-import')(),
                require('postcss-custom-properties')(),
                require('postcss-custom-media')(),
                require('postcss-media-minmax')(),
                require('postcss-custom-selectors')(),
                require('postcss-calc')(),
                require('postcss-nesting')(),
                require('postcss-nested')(),
                require('postcss-color-function')(),
                require('pleeease-filters')(),
                require('pixrem')(),
                require('postcss-selector-matches')(),
                require('postcss-selector-not')(),
                require('postcss-flexbugs-fixes')(),
                require('autoprefixer')(pkg.browserList),
              ],
            },
          },
        ],
      },
      {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        loader: 'file-loader',
        query: {
          name: __DEV__ ? '[path][name].[ext]?[hash:8]' : '[hash:8].[ext]',
        },
      },
    ],
  },
  devtool: __DEV__ ? 'cheap-module-source-map' : false,
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': __DEV__ ? '"development"' : '"production"',
      'process.env.BROWSER': true,
      __DEV__: __DEV__,
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    ...__DEV__ ? [
      new webpack.HotModuleReplacementPlugin(),
    ] : [
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: false,
        compress: {
          screw_ie8: true, // React doesn't support IE8
          unused: true,
          dead_code: true,
        },
        mangle: {
          screw_ie8: true,
        },
        output: {
          comments: false,
          screw_ie8: true,
        },
      }),
      // write the file hash mapping into a json file in the root of the server path
      function() {
        this.plugin('done', (stats) => {
          let _stats = stats.toJson()
          fs.writeFileSync(
            path.join(__dirname, '../HashMapping.json'),
            JSON.stringify(_stats.assetsByChunkName))
        })
      },
    ],
  ],
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
}
