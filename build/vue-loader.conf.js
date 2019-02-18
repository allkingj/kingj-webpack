/**
 * Created by kingj on 2019/2/15
 */

// 严格模式
'use strict'

// 必要引用


// 判断环境
const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  // 将某些特性转换为 require 调用
  transformAssetUrls: {
    video: ['src', 'poster'],
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
}


