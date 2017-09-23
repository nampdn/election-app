// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import TranslatePlugin from './localization'

Vue.config.productionTip = false

Vue.use(TranslatePlugin, {
  default: 'en',
  req: require.context('./lang', true, /\.js$/)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
