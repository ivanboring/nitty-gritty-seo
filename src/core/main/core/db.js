var sqlite3 = require('sqlite3').verbose()
const electron = require('electron')

var db = {
  database: null,
  init (database) {
    if (typeof database === 'undefined') {
      database = 'global'
    }
    var userDataDir = (electron.app || electron.remote.app).getPath('userData')
    this.database = new sqlite3.Database(userDataDir + '/' + database + '.sql3', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE)
    return this.database
  }
}

export default db
