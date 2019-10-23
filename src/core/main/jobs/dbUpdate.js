import fs from 'fs'
import db from '../core/db'
import projectHelper from '../helpers/projectHelper'

var dbUpdate = {
  userDataDir: null,
  database: null,
  dbFiles: {},
  databaseDir: './src/core/main/database',
  init () {
    this.getDbFiles()
    this.checkUpdates('global')
    for (var config of projectHelper.getAllProjects()) {
      this.checkUpdates(config.domain)
    }
  },
  checkUpdates (domain) {
    var database = db.init(domain)
    database.serialize(function () {
      database.all('SELECT name FROM sqlite_master WHERE type="table" AND name="variables";', (err, rows) => {
        if (err) {
          throw err
        }
        database.serialize(function () {
          if (rows.length === 0) {
            database.run('CREATE TABLE `variables` (`name` TEXT,`variable` BLOB)')
          }
          database.get('SELECT variable FROM variables WHERE name="db_version"', (err, row) => {
            if (err) {
              throw err
            }
            if (typeof row === 'undefined') {
              row = {variable: 'db0'}
            } else if (row.variable === null) {
              row = {variable: 'db0'}
            }
            // Run all updates
            database.serialize(function () {
              var run = row.variable === 'db0'
              var modified = false
              for (var file in dbUpdate.dbFiles) {
                if (run) {
                  modified = true
                  var dbRunner = require('../database/' + file.replace('.js', '')).default
                  if (typeof domain === 'undefined' || domain === 'global') {
                    for (var sqlGlobal of dbRunner.commandsGlobal()) {
                      database.run(sqlGlobal)
                    }
                  } else {
                    for (var sqlProject of dbRunner.commandsProject()) {
                      database.run(sqlProject)
                    }
                  }
                } else if (file === row.variable) {
                  run = true
                }
              }
              if (row.variable === 'db0') {
                database.run('INSERT INTO `variables` (name, variable) VALUES ("db_version",?)', [file])
              } else if (modified) {
                database.run('UPDATE `variables` SET variable=? WHERE name="db_version"', [file])
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
