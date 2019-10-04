import shell from 'shelljs'
import store from '../../renderer/store'
import chromiumCrawler from '../jobs/chromiumCrawler'
import fs from 'fs'

store.watch(
  (state) => {
    return store.state.ScreenshotActions
  },
  (newValue, oldValue) => {
    if (store.getters.screenshotToTake.constructor !== Object || Object.keys(store.getters.screenshotToTake).length !== 0) {
      var mode = 'desktop'
      if (typeof store.getters.screenshotToTake.type !== 'undefined') {
        mode = store.getters.screenshotToTake.type
      }
      var config = {
        website: 'https://' + store.getters.screenshotToTake.website,
        screenshot: true,
        type: mode
      }
      chromiumCrawler.runUrl(config, function (response, tmpImage) {
        // Make sure all directories exists
        shell.mkdir('-p', store.getters.screenshotToTake.dir)
        fs.renameSync(tmpImage, store.getters.screenshotToTake.dir + store.getters.screenshotToTake.fileName)
        console.log(tmpImage)
        console.log(store.getters.screenshotToTake.fileName)
      })
    }
  },
  {
    deep: true
  }
)
