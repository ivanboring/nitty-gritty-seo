import filenamify from 'filenamify'
const electron = require('electron')

var projectLoader = {
  getProjectDir (domain) {
    var userDataDir = (electron.app || electron.remote.app).getPath('userData')
    return userDataDir + '/projects/' + filenamify(domain)
  },
  getProjectsDir () {
    var userDataDir = (electron.app || electron.remote.app).getPath('userData')
    return userDataDir + '/projects/'
  },
  getResource (domain, file) {
    return 'file://' + this.getProjectDir(domain) + '/resources/' + file
  }
}

export default projectLoader
