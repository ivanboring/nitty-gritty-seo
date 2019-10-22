import fs from 'fs'

const files = require.context('.', false, /\.js$/)
const modules = {}

files.keys().forEach(key => {
  if (key === './index.js') return
  modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default
})

let pluginDir = './src/core/plugins'
if (fs.existsSync(pluginDir)) {
  var plugins = fs.readdirSync(pluginDir)
  for (var plugin of plugins) {
    var storeDir = pluginDir + '/' + plugin + '/store'
    if (fs.existsSync(storeDir)) {
      var stores = fs.readdirSync(storeDir)
      for (var store of stores) {
        var name = store.replace(/(\.\/|\.js)/g, '')
        modules[name] = require('../../../plugins/' + plugin + '/store/' + name).default
      }
    }
  }
}

export default modules
