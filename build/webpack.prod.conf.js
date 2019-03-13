/**
 * Created by kingj on 2019/2/15
 */
// 严格模式
'use strict'
// 必要引用
const path = require('path')
const merge = require('webpack-merge')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const utils = require('./utils')
const config = require('../config/index.js')
const baseWebpackConfig = require('./webpack.base.conf')

const prodConfig = {
  mode: 'production',
  output: {
    path: utils.resolve(config.base.outputPath),
    filename: utils.pathPosix(config.base.assetsPaht, 'js/[name].[hash].js'),
    chunkFilename: utils.pathPosix(config.base.assetsPaht, 'js/[name].[hash].js'),
    publicPath: '/'
  },
  // 模块
  module: {
    rules: utils.cssRules(['css', 'less'])
  },
  optimization: config.prod.optimization,
  // source map
  devtool: config.prod.useDevtool,
  plugins: [
    // css 提取
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[hash].css',
      chunkFilename: 'static/css/[name].[hash].css'
    }),
    // 复制文件到目标文件夹。在开发时使用热模替换，（没有生成dist 文件夹，都在内存中），
    // 如果想引用某一个js文件，直接写script标签是找不到的，因为服务器内存中没有这个文件。
    // 所以复制这个文件，到dist中。
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.prod.assetsPublicPath,
        ignore: ['.*']
      }
    ])
    // 清除文件 暂不使用该插件
    // new CleanWebpackPlugin(['dist/'], {
    //   root: path.resolve(__dirname, '../')
    // })
  ]
}

const prodWebpackConfig = merge(baseWebpackConfig, prodConfig)

module.exports = prodWebpackConfig
