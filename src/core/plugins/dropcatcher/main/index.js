var fs = require('fs')
var extract = require('extract-zip')
var db = require('../../../main/core/db').default
var dateHelper = require('../../../main/helpers/dateHelper').default
var downloadHelper = require('../../../main/helpers/downloadHelper').default
var store = require('../../../renderer/store').default
var dropCatcherSync = 0

var dropCatcherMain = {
  dropCatchUrl: 'https://downloads.dropcatch.com/DC/downloads/Dropping_Domains_{date}.csv.zip',
  startDownload () {
    var database = db.init()
    database.get('SELECT date FROM dropcatcher ORDER BY date DESC LIMIT 1;', (err, rows) => {
      if (err) {
        throw err
      }
      var currentTime = new Date().getTime()
      var days = 4
      if (typeof rows !== 'undefined') {

      }
      store.dispatch('percent_done', 5)
      store.dispatch('set_drop_days', days)
      store.dispatch('set_drop_downloads', days)
      for (var i = 1; i <= days; i++) {
        var future = currentTime + ((5-i)*86400000)
        var fetchDate = dateHelper.formatDate(future)
        var url = this.dropCatchUrl.replace('{date}', fetchDate)
        downloadHelper.saveUrlToFile(url, '/tmp/' + i + '.zip', function() {
          store.dispatch('remove_one_drop_download')
          store.dispatch('add_to_percent_done', 5)
        })
      }
    })
  },
  startUnpacking (days) {
    store.dispatch('percent_done', 25)
    for (var i = 1; i <= days; i++) {
      extract('/tmp/' + i + '.zip', {dir: '/tmp'}, function (err) {
        store.dispatch('add_to_percent_done', 5)
      })
    }
  }
}

store.watch(
  (state) => {
    return store.state.Dropcatcher
  },
  (newValue, oldValue) => {
    // Finished Downloading
    if (dropCatcherSync === 1 && !newValue.downloads) {
      dropCatcherSync = 2
      dropCatcherMain.startUnpacking(newValue.drop_days)
    }
    // Start Donwloading
    if (newValue.fetch_domains && !dropCatcherSync) {
      dropCatcherSync = 1
      dropCatcherMain.startDownload()
    }
  },
  {
    deep: true
  }
)

module.exports = dropCatcherMain
