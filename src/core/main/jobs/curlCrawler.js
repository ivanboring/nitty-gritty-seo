'use strict'
import pluginMetaData from '../core/pluginMetaData'
import Crawler from 'crawler'

var curlCrawler = {
  pluginDir: './src/core/plugins',
  affectedPlugins: [],
  crawler: null,
  runId: '',
  alreadyQueued: {},
  followLinks: false,
  init (url) {
    console.log(url)
    this.loadHooks()
    this.crawler = new Crawler({
      maxConnections: 5,
      callback: function (error, res, done) {
        if (!error) {
          for (var plugin of curlCrawler.affectedPlugins) {
            var loader = require('../../plugins/' + plugin).default
            loader.curlCrawlerPostRun(res, curlCrawler.runId)
          }
          if (curlCrawler.followLinks) {
            var $ = res.$
            $('a').each(function () {
              var path = $(this).attr('href')
              if (path.substr(0, 1) === '/' && !curlCrawler.alreadyQueued.hasOwnProperty(path)) {
                curlCrawler.alreadyQueued[path] = 0
                curlCrawler.crawler.queue(url + path)
              }
            })
          }
        }
        curlCrawler.alreadyQueued[res.req.path] = 1
        done()
      }
    })
  },
  loadHooks () {
    var plugins = pluginMetaData.loadMetaData()
    for (var info of plugins) {
      // Load the implements
      if (Array.isArray(info.implements) && info.implements.length > 0) {
        for (var implement of info.implements) {
          // Check for hooks
          if (implement === 'curlCrawlerPostRun') {
            this.affectedPlugins.push(info.id)
          }
        }
      }
    }
  },
  runSingleUrl (url, runId) {
    this.runId = runId
    this.init(url)
    this.crawler.queue(url)
  }
}

export default curlCrawler
