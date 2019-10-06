import store from '../../renderer/store'
import projectHelper from '../helpers/projectHelper'

var startupLoader = {
  init () {
    store.dispatch('remove_all_projects_from_list')
    projectHelper.getAllProjects()
  }
}

export default startupLoader
