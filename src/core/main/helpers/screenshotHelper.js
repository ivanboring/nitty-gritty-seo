import store from '../../renderer/store'
import chromiumCrawler from '../jobs/chromiumCrawler'
import projectHelper from '../helpers/projectHelper'
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
        website: 'http://' + store.getters.screenshotToTake.website,
        screenshot: true,
        type: mode
      }
      chromiumCrawler.runUrl(config, function (response, tmpImage) {
        // Make sure all directories exists
        var screenshotDirectory = projectHelper.getResourcesDir(store.getters.screenshotToTake.website)
        fs.renameSync(tmpImage, screenshotDirectory + store.getters.screenshotToTake.fileName)
      })
    }
  },
  {
    deep: true
  }
)
