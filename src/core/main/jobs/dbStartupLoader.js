import store from '../../renderer/store'
import db from '../core/db'

var dbStartupLoader = {
  init () {
    store.dispatch('remove_all_projects_from_list')
    var database = db.init()
    database.serialize(function () {
      database.all('SELECT * FROM projects;', (err, rows) => {
        if (err) {
          throw err
        }
        for (var row of rows) {
          store.dispatch('add_project_to_list', row)
        }
      })
    })
  }
}

export default dbStartupLoader
