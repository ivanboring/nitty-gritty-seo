import Vue from 'vue'
import Router from 'vue-router'
import pluginloader from '../../main/helpers/pluginloader'

Vue.use(Router)

var routes = pluginloader.loadRoutes()

export default new Router({
  routes: routes
})
