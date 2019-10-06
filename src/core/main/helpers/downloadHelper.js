import fs from 'fs'
import request from 'request'

var downloadHelper = {
  saveUrlToFile (url, fileName, callback) {
    request.head(url, function (err, res, body) {
      if (err) {

      }
      if (typeof callback === 'undefined') {
        callback = function () {}
      }
      request(url).pipe(fs.createWriteStream(fileName)).on('close', callback)
    })
  }
}

export default downloadHelper
