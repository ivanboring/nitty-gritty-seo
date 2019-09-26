'use strict'

var markupChecker = {
  curlCheckerPostRun (res) {
    for (var i in res) {
      console.log(i)
    }
    console.log(res.httpVersion)
  }
}

export default markupChecker
