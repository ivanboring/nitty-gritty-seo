import Vue from 'vue'
import axios from 'axios'

import App from './App'
import store from './store'
import router from './router'
import vuetify from './styling/vuetify'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  vuetify,
  store,
  router,
  template: '<App/>'
}).$mount('#app')
