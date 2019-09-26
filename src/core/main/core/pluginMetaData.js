'use strict'
import fs from 'fs'
import yaml from 'js-yaml'

var pluginMetaData = {
  pluginDir: './src/core/plugins',
  modules: [],
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

export default pluginMetaData
