'use strict'
import fs from 'fs'
import yaml from 'js-yaml'
import store from '../../renderer/store'

var pluginloader = {
  pluginDir: './src/core/plugins',
  modules: [],
  loadMenu () {
    var modules = this.loadMetaData()
    for (var info of modules) {
    // Load the menus
      if (Array.isArray(info.menu) && info.menu.length > 0) {
        for (var menu of info.menu) {
          // Set the state
          store.dispatch('add_menu_item', menu)
        }
      }
    }
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

export default pluginloader
