'use strict'
import fs from 'fs'

var pluginloader = {
  pluginDir: './src/plugins',
  start () {

  },
  loadMenu () {
    if (fs.existsSync(this.pluginDir)) {
      // Itterate through all plugins.
      for (x in fs.readdirSync(this.pluginDir)) {
        console.log(x)
      }
    }
  }
}

export default pluginloader
