/**
 * Created by kingj on 2019/2/15
 */

// 严格模式
'use strict'

// 必要引用
const path = require('path')
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const merge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const AutoDllPlugin = require('autodll-webpack-plugin')
const utils = require('./utils')
const baseWebpackConfig = require('./webpack.base.conf')

const prodConfig = {

  mode: 'production',

  // 模块
  module: {
    rules: utils.cssRules(['css']),
  },

  optimization: {
    splitChunks: {
      chunks: "async",
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: true,
      cacheGroups: {
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
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
            // 'vue-router'
          ],
        }
      }),

      // 全局引入对象
      new webpack.ProvidePlugin({
        // $: 'jquery'
      }),

      new OptimizeCSSAssetsPlugin({})
    ]
  },

  // source map
  devtool: false,

  plugins: [

    // css 提取
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[hash].css',
      chunkFilename: 'static/css/[name].[hash].css'
    }),

    // 清除文件
    new CleanWebpackPlugin(['dist/'], {
      root: path.resolve(__dirname, '../')
    })
  ]
}

const prodWebpackConfig = merge(baseWebpackConfig,prodConfig)

module.exports = prodWebpackConfig
