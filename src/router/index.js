import Vue from 'vue'
import Router from 'vue-router'
import Electron from '@/components/pages/Election'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Electron
    }
  ]
})
