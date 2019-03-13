/**
 * Created by kingj on 2019/2/19
 */

// 严格模式
'use strict'

// 必要引用
const webpack = require('webpack')
const AutoDllPlugin = require('autodll-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const isProduction = process.env.NODE_ENV === 'production'

// 预设配置
const configuration = {
  // 公共配置
  base: {
    // 入口
    entry: './src/index.js',
    // 输出
    outputPath: 'dist',
    // 静态文件目录
    assetsPaht: 'static',
    // plugins
    minifyOptions: isProduction
      ? {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
      : {}
  },
  // 开发环境
  dev: {
    // 只有在你想要提供静态文件时才需要
    useContentBase: true,
    // 是否启用 gzip 压缩
    useCompress: true,
    // 是否开启 historyApiFallback
    isHistoryApiFallback: true,
    // host
    host: '0.0.0.0',
    // port
    port: '9000',
    // 热更新
    useHot: true,
    // 是否会打开浏览器
    isOpen: true,
    useOverlay: true,
    // 公共访问目录
    assetsPublicPath: '/',
    // webpack 的错误或警告在控制台是否可见
    isQuiet: true,
    // 统计信息
    useStats: true,
    // devtool
    devtool: 'cheap-module-eval-source-map'
  },
  // 生产环境
  prod: {
    assetsPublicPath: '',
    // 生产环境打包优化
    optimization: {
      runtimeChunk: {
        name: 'manifest'
      },
      noEmitOnErrors: true,
      splitChunks: {
        chunks: 'async',
        minSize: 30000,
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        name: true,
        cacheGroups: {
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true
          },
          vendors: {
            name: 'vendor',
            chunks: 'all',
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            reuseExistingChunk: true
          }
        }
      },
      minimizer: [
        new UglifyJsPlugin({
          cache: true,
          parallel: true, // 平行压缩
          sourceMap: false, // set to true if you want JS source maps
          uglifyOptions: {
            compress: {
              warnings: false,
              drop_debugger: true,
              drop_console: false
            }
          }
        }),
        // 将一些不太可能改动的第三方库单独打包，会通过缓存极大提升打包速度
        new AutoDllPlugin({
          // will inject the DLL bundle to index.html
          // default false
          inject: true,
          debug: false,
          filename: '[name]_[hash].js',
          path: 'static/js',
          entry: {
            // [name] = vue, 在这里会将entry里的每个item(vue,jquery)都打包成一个js
            vue: [
              'vue',
              'vue-router'
            ]
          }
        }),
        // 全局引入对象
        new webpack.ProvidePlugin({
          // $: 'jquery'
        }),
        new OptimizeCSSAssetsPlugin({})
      ]
    },
    // devtool
    useDevtool: false
  }
}

module.exports = configuration
