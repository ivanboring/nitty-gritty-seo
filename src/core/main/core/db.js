import projectHelper from '../helpers/projectHelper'
var sqlite3 = require('sqlite3').verbose()
const electron = require('electron')

var db = {
  database: null,
  init (domain) {
    var dbPath = ''
    if (typeof domain === 'undefined' || domain === 'global') {
      var userDataDir = (electron.app || electron.remote.app).getPath('userData')
      dbPath = userDataDir + '/db.sql3'
    } else {
      dbPath = projectHelper.getDatabasesDir(domain) + 'db.sql3'
    }
    this.database = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE)
    return this.database
  }
}

export default db
