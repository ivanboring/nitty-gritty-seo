import store from '../../renderer/store'
import db from '../core/db'

store.watch(
  (state) => {
    return store.state.Project
  },
  (newValue, oldValue) => {
    if (store.getters.projectQueue) {
      var database = db.init()
      var getValues = store.getters.projectQueue
      database.serialize(function () {
        database.run('INSERT INTO `projects` (name, domain, icon, local, rendering, concurrency, automation) VALUES (?, ?, ? ,? ,? ,? ,?)', [
          getValues.name,
          getValues.domain,
          getValues.icon,
          getValues.local,
          getValues.rendering,
          getValues.concurrency,
          getValues.automation
        ])
        // Fake loading
        setTimeout(function () {
          store.dispatch('remove_project_from_queue')
        }, 2000)
      })
    }
  },
  {
    deep: true
  }
)
