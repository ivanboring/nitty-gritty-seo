'use strict'
import fs from 'fs'
import yaml from 'js-yaml'

var routerLoader = {
  pluginDir: './src/core/plugins',
  modules: [],
  loadRoutes () {
    var modules = this.loadMetaData(true)

    var newRoutes = []

    newRoutes.push({
      path: '/',
      name: 'landing-page',
      component: require('../../renderer/components/LandingPage').default
    })

    for (var info of modules) {
      // Load the routes
      if (Array.isArray(info.routes) && info.routes.length > 0) {
        for (var route of info.routes) {
          var newRoute = {
            path: '/' + route.path,
            name: route.path,
            component: require('../../plugins/' + info.id + '/templates/' + route.template).default
          }
          newRoutes.push(newRoute)
        }
      }
    }
    return newRoutes
  },
  loadMetaData (cache) {
    if ((typeof cache === 'undefined' || !cache) && this.modules.length > 0) {
      return this.modules
    }
    if (fs.existsSync(this.pluginDir)) {
      // Iterate through all plugins.
      var plugins = fs.readdirSync(this.pluginDir)
      for (var plugin of plugins) {
        var infoFile = this.pluginDir + '/' + plugin + '/info.yml'
        if (fs.existsSync(infoFile)) {
          // Read the info file.
          this.modules.push(yaml.safeLoad(fs.readFileSync(infoFile)))
        }
      }
    }
    return this.modules
  }
}

export default routerLoader
