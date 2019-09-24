import store from '../../renderer/store'
import { app, shell } from 'electron'
import fs from 'fs'

store.watch(
  (state) => {
    return store.state.FileActions
  },
  (newValue, oldValue) => {
    if (store.getters.fileToLoad.constructor !== Object || Object.keys(store.getters.fileToLoad).length !== 0) {
      var file = app.getPath('temp') + '/' + store.getters.fileToLoad.fileName
      // Store the file temporary
      fs.writeFileSync(file, store.getters.fileToLoad.fileData)
      shell.openItem(file)
      store.dispatch('remove_file_context_to_save')
    }
  },
  {
    deep: true
  }
)
