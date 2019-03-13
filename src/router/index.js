/**
 * Created by kingj on 2019/3/4
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/view/home/home-template.vue'
Vue.use(VueRouter)

// const router = new VueRouter({
//   mode: 'hash',
//   routes: [
//     {
//       path: '/',
//       name: 'hmoe',
//       component: Home
//     }
//   ]
// })

const routes = [
  {
    path: '/',
    name: 'main',
    component: Home
  }
]

export default new VueRouter({ routes: routes })
