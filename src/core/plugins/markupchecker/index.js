'use strict'

var markupChecker = {
  curlCrawlerPostRun (res, runId) {
    console.log(res.httpVersion)
    console.log(runId)
  }
}

export default markupChecker
