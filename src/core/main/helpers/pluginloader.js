'use strict'
import pluginMetaData from '../core/pluginMetaData'
import store from '../../renderer/store'

var pluginloader = {
  modules: [],
  loadMenu () {
    var modules = pluginMetaData.loadMetaData()
    for (var info of modules) {
    // Load the menus
      if (Array.isArray(info.menu) && info.menu.length > 0) {
        for (var menu of info.menu) {
          // Set the state
          store.dispatch('add_menu_item', menu)
        }
      }
    }
  }
}

export default pluginloader
