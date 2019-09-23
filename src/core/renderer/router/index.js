import Vue from 'vue'
import Router from 'vue-router'
import routeLoader from '../helpers/routeLoader'

Vue.use(Router)

var routes = routeLoader.loadRoutes()

export default new Router({
  routes: routes
})
