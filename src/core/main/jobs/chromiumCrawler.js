'use strict'
import pluginMetaData from '../core/pluginMetaData'
import puppeteer from 'puppeteer'
import crypto from 'crypto'
const { app } = require('electron')

var curlCrawler = {
  alreadyQueued: {'/': 0},
  currentQueue: 0,
  maxQueue: 10,
  hostname: null,
  crawler: null,
  page: null,
  renderType: 'desktop',
  async init (config, callback) {
    if (typeof config.type !== 'undefined') {
      this.renderType = config.type
    }
    if (typeof config.follow === 'undefined') {
      config.follow = false
    }
    if (typeof config.screenshot === 'undefined') {
      config.screenshot = false
    }
    this.hostname = config.website
    this.crawler = await puppeteer.launch()
    this.page = await this.crawler.newPage()
    this.setSize()
    this.crawlPage('/', config, callback)
    // this.crawler.close()
  },
  setSize () {
    switch (this.renderType) {
      case 'desktop':
        this.page.setViewport({width: 1920, height: 1080})
        break
      case 'mobile':
        this.page.setViewport({width: 640, height: 400})
        break
    }
  },
  async crawlPage (path, config, callback) {
    var url = this.hostname + path
    await this.page.goto(url, {timeout: 20000, waitUntil: 'load'})
    var imagePath = ''
    if (config.screenshot) {
      imagePath = app.getPath('temp') + '/' + crypto.createHash('md5').update(url).digest('hex') + '.png'
      await this.page.screenshot({path: imagePath})
    }
    const body = await this.page.content()

    callback(body, imagePath)
    this.currentQueue++
    if (config.follow) {
      let links = await this.page.$$eval('a', as => as.map(a => [a.href, a.innerText.trim()]))
      for (var x in links) {
        if (this.hostname === links[x][0].substr(0, this.hostname.length)) {
          var newPath = links[x][0].substr(this.hostname.length)
          if (!this.alreadyQueued.hasOwnProperty(newPath)) {
            this.alreadyQueued[newPath] = 1
            await this.crawlPage(newPath, config, callback)
          }
        }
      }
    }
  },
  loadHooks () {
    var plugins = pluginMetaData.loadMetaData()
    for (var info of plugins) {
      // Load the implements
      if (Array.isArray(info.implements) && info.implements.length > 0) {
        for (var implement of info.implements) {
          // Check for hooks
          if (implement === 'chromiumCheckerPostRun') {
            this.affectedPlugins.push(info.id)
          }
        }
      }
    }
  },
  runUrl (config, callback) {
    this.init(config, callback)
  }
}

export default curlCrawler
