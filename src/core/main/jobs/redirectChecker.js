'use strict'
import puppeteer from 'puppeteer'
import Crawler from 'crawler'

var redirectChecker = {
  async checkAllRedirects (url, id) {
    var results = []
    var crawler = new Crawler({
      maxConnections: 5,
      callback: function (error, res, done) {
        if (error) {

        }
        results.push(res.request.uri)
        done()
      }
    })
    crawler.queue('http://www.' + url)
    crawler.queue('https://www.' + url)
    crawler.queue('http://' + url)
    crawler.queue('https://' + url)
    crawler.on('drain', function () {
      console.log(results)
    })
    /* const allEqual = arr => arr.every(v => v === arr[0])

    var results = []
    results.push(await this.checkRedirect('http://' + url))
    results.push(await this.checkRedirect('https://' + url))
    results.push(await this.checkRedirect('http://www.' + url))
    results.push(await this.checkRedirect('https://www.' + url))

    if (allEqual(results)) {
      auditHelper.addSuccessAudit(id, url, 'Redirection of www and non-www and http and https are correctly working')
    } else {

    } */
  },
  async checkRedirect (url) {
    this.crawler = await puppeteer.launch()
    this.page = await this.crawler.newPage()
    this.response = await this.page.goto(url, {timeout: 20000, waitUntil: 'load'})
    const returnUrl = await this.response.url()
    this.crawler.close()
    return returnUrl
  }
}

export default redirectChecker
