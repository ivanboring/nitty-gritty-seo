import store from '../../renderer/store'
import iconHelper from './iconHelper'
import shell from 'shelljs'
import filenamify from 'filenamify'
import fs from 'fs'
const electron = require('electron')

var projectHelper = {
  create (project, callback) {
    this.createProjectDir(project)
    this.createMetaDataFile(project)
    this.createScreenshot(project)
    this.createIcon(project, callback)
    this.createDatabas(project)
  },
  createMetaDataFile (project) {
    fs.writeFileSync(this.getProjectDir(project.domain) + '/project.json', JSON.stringify(project))
  },
  createScreenshot (project) {
    store.dispatch('add_screenshot_to_take', {
      website: project.domain,
      fileName: 'screenshot.png'
    })
  },
  createIcon (project, callback) {
    iconHelper.saveIcon(project.icon, project.domain, callback)
  },
  createDatabase (project) {

  },
  createProjectDir (project) {
    // Database dir
    shell.mkdir('-p', this.getProjectDir(project.domain) + '/databases/')
    // Resources dir
    shell.mkdir('-p', this.getProjectDir(project.domain) + '/resources/')
  },
  getProjectDir (domain) {
    var userDataDir = (electron.app || electron.remote.app).getPath('userData')
    return userDataDir + '/projects/' + filenamify(domain)
  },
  getResourcesDir (domain) {
    var userDataDir = (electron.app || electron.remote.app).getPath('userData')
    return userDataDir + '/projects/' + filenamify(domain) + '/resources/'
  },
  getDatabasesDir (domain) {
    var userDataDir = (electron.app || electron.remote.app).getPath('userData')
    return userDataDir + '/projects/' + filenamify(domain) + '/databases/'
  },
  getProjectsDir () {
    var userDataDir = (electron.app || electron.remote.app).getPath('userData')
    return userDataDir + '/projects/'
  },
  getAllProjects () {
    var projects = []
    // Check so project dir is created otherwise create it
    var projectDir = this.getProjectsDir()
    if (!fs.existsSync(projectDir)) {
      shell.mkdir('-p', projectDir)
    }
    for (var possibleProject of fs.readdirSync(projectDir)) {
      if (fs.existsSync(projectDir + possibleProject + '/project.json')) {
        var config = JSON.parse(fs.readFileSync(projectDir + possibleProject + '/project.json'))
        projects.push(config)
      }
    }
    return projects
  }
}

store.watch(
  (state) => {
    return store.state.Project
  },
  (newValue, oldValue) => {
    if (typeof store.getters.projectQueue.domain !== 'undefined') {
      var getValues = store.getters.projectQueue
      projectHelper.create(getValues, function () {
        store.dispatch('remove_project_from_queue')
        store.dispatch('add_project_to_list', getValues)
      })
    }
  },
  {
    deep: true
  }
)

export default projectHelper
