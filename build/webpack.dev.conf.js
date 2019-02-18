/**
 * Created by kingj on 2019/2/15
 */

// 严格模式
'use strict'

// 必要引用
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')
const utils = require('./utils')
const baseWebpackConfig = require('./webpack.base.conf')

const devConfig = {

  // 模块
  module: {
    rules: utils.cssRules(['css']),
  },

  optimization: {
    runtimeChunk: {
      name: 'manifest'
    }
  },

  // devServer
  devServer: {

    // 只有在你想要提供静态文件时才需要
    contentBase: path.resolve(__dirname, '../dist'),

    // 是否启用 gzip 压缩
    compress: true,

    // 惰性模式
    // lazy: true,
    // 某个文件被请求时编译
    // filename: 'bundle.js',

    // 任意的 404 响应都可能需要被替代为 index.html
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join('/', 'index.html') },
      ],
    },

    // host
    host: '0.0.0.0',

    // 启动端口
    port: 9000,

    // 热更新
    hot: true,

    // 是否会打开浏览器
    open: true,

    // 是否显示编译器错误或警告
    overlay: {warning: false, errors: true},

    // 公共访问目录
    publicPath: '/',

    // webpack 的错误或警告在控制台是否可见
    quiet: true,

    // 统计信息
    stats: 'errors-only'
  },

  // devtool
  devtool: 'cheap-module-eval-source-map',

  plugins:[
    new webpack.HotModuleReplacementPlugin(),
  ]
}

const devWebpackConfig = merge(baseWebpackConfig,devConfig)

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = devConfig.devServer.port;
  // 校验端口是否可用
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      process.env.PORT = port
      devWebpackConfig.devServer.port = port
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: utils.createNotifierCallback()
      }))

      resolve(devWebpackConfig)
    }
  })
})
