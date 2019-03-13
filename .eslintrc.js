module.exports = {
  root: true,
  parserOptions: {
    parser: require.resolve('babel-eslint'),
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      'experimentalObjectRestSpread': true,
      'jsx': true
    },
  },
  env: {
    es6: true,
    node: true,
    browser: true
  },
  plugins: [
    // "flowtype"    flow
    'vue' ,
    "html",
    "json"
  ],
  extends: [
    'plugin:vue/essential',
    'standard'
  ],
  globals: {
    // "__WEEX__": true,
    // "WXEnvironment": true
    "expect": true,
    "sinon": true
  },
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}
