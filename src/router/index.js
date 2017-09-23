import Vue from 'vue'
import Router from 'vue-router'
const Election = () => import('@/components/pages/Election')

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Election
    }
  ]
})
