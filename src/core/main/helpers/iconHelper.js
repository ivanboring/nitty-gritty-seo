import store from '../../renderer/store'
import projectHelper from './projectHelper'
import downloadHelper from './downloadHelper'
import getFavicons from 'get-website-favicon'

store.watch(
  (state) => {
    return store.state.Icon
  },
  (newValue, oldValue) => {
    if (store.getters.iconWebsiteToLoad) {
      getFavicons(store.getters.iconWebsiteToLoad).then(data => {
        if (typeof data.icons[0] !== 'undefined') {
          store.dispatch('add_icon_to_queue', data.icons[0].src)
        } else {
          getFavicons('https://' + store.getters.iconWebsiteToLoad).then(data => {
            if (typeof data.icons[0] !== 'undefined') {
              store.dispatch('add_icon_to_queue', data.icons[0].src)
            } else {
              store.dispatch('add_icon_to_queue', 'https://icon-library.net/images/user-icon-jpg/user-icon-jpg-13.jpg')
            }
          })
        }
      })
      store.dispatch('remove_icon_website_from_queue')
    }
  },
  {
    deep: true
  }
)

var iconHelper = {
  saveIcon (url, project, callback) {
    var dir = projectHelper.getResourcesDir(project)
    downloadHelper.saveUrlToFile(url, dir + 'icon.ico', callback)
  }
}

export default iconHelper
