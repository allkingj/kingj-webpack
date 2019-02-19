/**
 * Created by kingj on 2019/2/15
 */
// 严格模式
'use strict'

// 必要引用
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const packageConfig = require('../package.json')

const isProduction = process.env.NODE_ENV === 'production'

// 公共 loader
const commonLoader = [
  isProduction ? MiniCssExtractPlugin.loader : 'vue-style-loader',
  {
    loader: 'css-loader',
    options: {

      // source map
      sourceMap: isProduction
      // 开启 CSS Modules
      // modules: true,
      // 自定义生成的类名
      // localIdentName: '[local]_[hash:base64:8]'
    }
  },
  'postcss-loader'
]

const cssLoaders = {
  css: {
    test: /\.css$/,
    use: commonLoader
  },
  less: {
    test: /\.less$/,
    use: commonLoader.concat({
      loader: 'less-loader',
      options: {
        // 开启 less Modules
        // modules: true,
        // 自定义生成的类名
        // localIdentName: '[local]_[hash:base64:8]'
      }
    })
  },
  sass: {
    test: /\.sass$/,
    use: commonLoader.concat({
      loader: 'sass-loader',
      options: {
        // 使用基于缩进的 sass 语法
        indentedSyntax: true
        // 开启 sass Modules
        // modules: true,
        // 自定义生成的类名
        // localIdentName: '[local]_[hash:base64:8]'
      }
    })
  },
  stylus: {
    test: /\.styl(us)?$/,
    use: commonLoader.concat({
      loader: 'stylus-loader',
      options: {
        // 开启 styl Modules
        // modules: true,
        // 自定义生成的类名
        // localIdentName: '[local]_[hash:base64:8]'
      }
    })
  }
}

// cssRules
exports.cssRules = function (options) {
  const output = []
  options.forEach((v) => {
    output.push(cssLoaders[v])
  })
  return output
}

exports.createNotifierCallback = () => {
  const notifier = require('node-notifier')

  return (severity, errors) => {
    if (severity !== 'error') return

    const error = errors[0]
    const filename = error.file && error.file.split('!').pop()

    notifier.notify({
      title: packageConfig.name,
      message: severity + ': ' + error.name,
      subtitle: filename || '',
      icon: path.join(__dirname, 'logo.png')
    })
  }
}

exports.resolve = (dir) => {
  return path.join(__dirname, '..', dir)
}

exports.pathPosix = (assetsPaht, name) => {
  return path.posix.join(assetsPaht, name)
}
