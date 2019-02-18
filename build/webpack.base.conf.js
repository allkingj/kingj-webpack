/**
 * Created by kingj on 2019/2/14
 */

// 严格模式
'use strict'

// 必要引用
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const vueLoaderConfig = require('./vue-loader.conf.js')
const StyleLintPlugin = require('stylelint-webpack-plugin')
const HappyPack = require('happypack');
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src'), resolve('test')],
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
    app: './src/index.js'
  },

  //输出
  output: {
    path: resolve('dist'),
    filename: path.posix.join('static', 'js/[name].[hash].js'),
    chunkFilename: path.posix.join('static', 'js/[id].[hash].js'),
  },

  // 模块
  module: {

    //匹配规则
    rules: [

      // eslint
      ...([createLintingRule()]),

      // vue
      {
        test: /\.vue$/,
        include: [resolve('src')],
        exclude:[resolve('node_modules')],
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      // js
      {
        test: /\.js$/,
        include: [resolve('src')],
        exclude:[resolve('node_modules')],
        loader: 'happypack/loader?id=happyBabel',
      },
      // pic
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        include: [resolve('src/assets')],
        loader: 'url-loader',
        options: {
          // 低于这个limit就直接转成base64插入到style里，不然以name的方式命名存放
          // 这里的单位时bit
          limit: 10000,
          name: path.posix.join('static', 'images/[name].[hash:7].[ext]')
        }
      },
      // video
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: path.posix.join('static', 'media/[name].[hash:7].[ext]')

        }
      },
      // font
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: path.posix.join('static', 'fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },

  // 解析
  resolve: {

    // 在import这些拓展名的文件时，可以省略拓展名 (尽量引用时添加扩展名减少查询时间)
    extensions: ['.js', '.vue', '.json'],

    alias:{
      // 配置别名'vue$'，不然import 'vue'时，webpack找不到
      'vue$': 'vue/dist/vue.esm.js',
      // 这个为src配置别名，非必需，为方便而已
      '@': resolve('src'),
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
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true,
        }
      }
    ),

    new StyleLintPlugin(
      {
        // 正则匹配想要lint监测的文件
        files: ['src/**/*.vue', 'src/assets/styles/*.l?(e|c)ss']
      }
    ),

    new HappyPack({
      //用id来标识 happypack处理类文件
      id: "happyBabel",
      //如何处理 用法和loader 的配置一样
      loaders: [
        {
          loader: "babel-loader?cacheDirectory=true"
        }
      ],
      //共享进程池
      threadPool: happyThreadPool,
      //允许 HappyPack 输出日志
      verbose: true
    }),
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
  },

  // 统计信息 暂不做处理
  // stats

}
