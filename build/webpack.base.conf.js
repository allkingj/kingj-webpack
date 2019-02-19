/**
 * Created by kingj on 2019/2/14
 */
// 严格模式
'use strict'

// 必要引用
const os = require('os')
const path = require('path')
const HappyPack = require('happypack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const StyleLintPlugin = require('stylelint-webpack-plugin')
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })

const config = require('../config/index.js')
const utils = require('./utils.js')
const vueLoaderConfig = require('./vue-loader.conf.js')

const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [utils.resolve('src')],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: true
  }
})

module.exports = {
  // 基础目录
  context: path.resolve(__dirname, '../'),
  // 入口
  entry: {
    // app: './src/index.js'
    app: config.base.entry
  },
  // 输出
  output: {
    path: utils.resolve(config.base.outputPath),
    filename: utils.pathPosix(config.base.assetsPaht, 'js/[name].[hash].js'),
    chunkFilename: utils.pathPosix(config.base.assetsPaht, 'js/[name].[hash].js'),
    publicPath: 'http://0.0.0.0:9000/'
  },
  // 模块
  module: {
    // 匹配规则
    rules: [
      // eslint
      ...([createLintingRule()]),
      // vue
      {
        test: /\.vue$/,
        include: [utils.resolve('src')],
        exclude: [utils.resolve('node_modules')],
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      // js
      {
        test: /\.js$/,
        include: [utils.resolve('src')],
        exclude: [utils.resolve('node_modules')],
        loader: 'happypack/loader?id=happyBabel'
      },
      // pic
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        include: [utils.resolve('src/assets')],
        loader: 'url-loader',
        options: {
          // 低于这个limit就直接转成base64插入到style里，不然以name的方式命名存放
          // 这里的单位时bit
          limit: 10000,
          name: utils.pathPosix(config.base.assetsPaht, 'images/[name].[hash:7].[ext]')
        }
      },
      // video
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.pathPosix(config.base.assetsPaht, 'media/[name].[hash:7].[ext]')

        }
      },
      // font
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.pathPosix(config.base.assetsPaht, 'fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  // 解析
  resolve: {
    // 在import这些拓展名的文件时，可以省略拓展名 (尽量引用时添加扩展名减少查询时间)
    extensions: ['.js', '.vue', '.json'],

    alias: {
      // 配置别名'vue$'，不然import 'vue'时，webpack找不到
      'vue$': 'vue/dist/vue.esm.js',
      // 这个为src配置别名，非必需，为方便而已
      '@': utils.resolve('src')
    }
  },
  // 插件
  plugins: [
    // vue-loader 必要插件
    new VueLoaderPlugin(),
    // 处理 html 模板插件
    new HtmlWebpackPlugin(
      {
        filename: 'index.html',
        template: './public/index.html',
        favicon: './public/favicon.ico',
        minify: config.base.minifyOptions
      }
    ),
    new StyleLintPlugin(
      {
        // 正则匹配想要lint监测的文件
        files: ['src/**/*.vue', 'src/assets/styles/*.l?(e|c)ss']
      }
    ),
    new HappyPack({
      // 用id来标识 happypack 处理类文件
      id: 'happyBabel',
      // 如何处理 用法和loader 的配置一样
      loaders: [
        {
          loader: 'babel-loader?cacheDirectory=true'
        }
      ],
      // 共享进程池
      threadPool: happyThreadPool,
      // 允许 HappyPack 输出日志
      verbose: true
    }),
    new HappyPack({
      id: 'vue',
      loaders: ['vue-loader']
    })
  ],

  // target
  target: 'web',

  // externals 暂不做处理
  // externals

  // 性能
  // performance

  // node
  node: {
    setImmediate: false,
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }

  // 统计信息 暂不做处理
  // stats

}
