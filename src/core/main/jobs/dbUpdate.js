import fs from 'fs'
var sqlite3 = require('sqlite3').verbose()
const electron = require('electron')

var dbUpdate = {
  userDataDir: null,
  database: null,
  dbFiles: {},
  databaseDir: './src/core/main/database',
  init () {
    this.userDataDir = (electron.app || electron.remote.app).getPath('userData')
    this.checkInstalled()
  },
  checkInstalled () {
    this.database = new sqlite3.Database(this.userDataDir + '/global.sql3', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, this.checkUpdates)
  },
  checkUpdates () {
    dbUpdate.getDbFiles()
    dbUpdate.database.serialize(function () {
      dbUpdate.database.all('SELECT name FROM sqlite_master WHERE type="table" AND name="variables";', (err, rows) => {
        if (err) {
          throw err
        }
        dbUpdate.database.serialize(function () {
          if (rows.length === 0) {
            dbUpdate.database.run('CREATE TABLE `variables` (`name` TEXT,`variable` BLOB)')
          }
          dbUpdate.database.get('SELECT variable FROM variables WHERE name="db_version"', (err, row) => {
            if (err) {
              throw err
            }
            if (typeof row === 'undefined') {
              row = 'db0'
            }
            // Run all updates
            dbUpdate.database.serialize(function () {
              var run = row === 'db0'
              var modified = false
              for (var file in dbUpdate.dbFiles) {
                if (run) {
                  modified = true
                  var dbRunner = require('../database/' + file.replace('.js', '')).default
                  for (var sql of dbRunner.commands()) {
                    dbUpdate.database.run(sql)
                  }
                } else if (file === row) {
                  run = true
                }
              }
              if (row === 'db0') {
                dbUpdate.database.run('INSERT INTO `variables` (name, variable) VALUES ("db_version",?)', [file])
              } else if (modified) {
                dbUpdate.database.run('UPDATE `variables` SET variable=? WHERE name="db_version"', [file])
              }
            })
          })
        })
      })
    })
  },
  getDbFiles () {
    if (fs.existsSync(this.databaseDir)) {
      var databaseFiles = fs.readdirSync(this.databaseDir)
      for (var file of databaseFiles) {
        this.dbFiles[file] = file
      }
    }
  }
}

export default dbUpdate
