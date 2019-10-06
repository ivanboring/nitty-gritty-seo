import store from '../../renderer/store'
import projectHelper from '../helpers/projectHelper'

var startupLoader = {
  init () {
    store.dispatch('remove_all_projects_from_list')
    for (var config of projectHelper.getAllProjects()) {
      store.dispatch('add_project_to_list', config)
    }
  }
}

export default startupLoader
