/**
 * Created by kingj on 2019/2/14
 */
module.exports = {
  "plugins": {
    "postcss-import": {},
    "postcss-url": {},

    // 使用在 package.json 中设置的参数
    "autoprefixer": {}

    // 后期按需要开启
    // cssnext 可以让你写 CSS4 的语言，并能配合
    // "postcss-cssnext": {}
    // 压缩优化css代码
    // "cssnano" : {}
    // "postcss-px2rem": { remUnit: 16, baseDpr: 2 },
    // "postcss-plugins-px2rem" : { remUnit: 16, baseDpr: 2 }

  }
}
