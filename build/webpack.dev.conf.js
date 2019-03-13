/**
 * Created by kingj on 2019/2/15
 */

// 严格模式
'use strict'

// 必要引用
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const portfinder = require('portfinder')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

const utils = require('./utils')
const config = require('../config/index.js')
const baseWebpackConfig = require('./webpack.base.conf')

const devConfig = {
  mode: 'development',
  // 模块
  module: {
    rules: utils.cssRules(['css', 'less'])
  },
  optimization: {
    runtimeChunk: false,
    minimize: false,
    noEmitOnErrors: true,
    splitChunks: false
  },
  // devServer
  devServer: {
    // 只有在你想要提供静态文件时才需要
    contentBase: config.dev.useContentBase ? path.resolve(__dirname, '../dist') : false,
    // 是否启用 gzip 压缩
    compress: config.dev.useCompress,

    // 惰性模式
    // lazy: true,
    // 某个文件被请求时编译
    // filename: 'bundle.js',

    // 任意的 404 响应都可能需要被替代为 index.html
    historyApiFallback: config.dev.isHistoryApiFallback
      ? {
        rewrites: [
          { from: /.*/, to: utils.pathPosix('/', 'index.html') }
        ]
      } : false,
    // host
    host: config.dev.host,
    // 启动端口
    port: config.dev.port,
    // 热更新
    hot: config.dev.useHot,
    // 是否会打开浏览器
    open: config.dev.isOpen,
    // 是否显示编译器错误或警告
    overlay: config.dev.useOverlay
      ? { warning: false, errors: true }
      : false,
    // 公共访问目录
    publicPath: config.dev.assetsPublicPath,
    // webpack 的错误或警告在控制台是否可见
    quiet: config.dev.isQuiet,
    // 统计信息
    stats: config.dev.useStats
      ? 'errors-only'
      : false
  },
  // devtool
  devtool: config.dev.devtool,
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
}

const devWebpackConfig = merge(baseWebpackConfig, devConfig)

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = devConfig.devServer.port
  // 校验端口是否可用
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      process.env.PORT = port
      devWebpackConfig.devServer.port = port
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`]
        },
        onErrors: utils.createNotifierCallback()
      }))

      resolve(devWebpackConfig)
    }
  })
})
