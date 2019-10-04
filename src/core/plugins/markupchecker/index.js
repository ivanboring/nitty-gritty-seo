'use strict'

var markupChecker = {
  curlCrawlerPostRun (res) {
    for (var i in res) {
      console.log(i)
    }
    console.log(res.httpVersion)
  }
}

export default markupChecker
