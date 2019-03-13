/* eslint-disable */

import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import '@/assets/style/normalize.less';

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  // store,
  render: h => h(App)
})
