import Combinatorics from 'js-combinatorics'
import synonyms from 'synonyms'
import whois from 'whois'
import queue from 'queue'
import dns from 'dns'
import stemmer from 'stemmer'
import request from 'request'
const shell = require('electron').shell

export default {
  props: {
    source: String
  },
  data: () => ({
    domainLength: 15,
    minScore: 50,
    tldItems: ['.com', '.org', '.net', '.edu', '.io', '.test'],
    tldValue: ['.com'],
    valid: true,
    lazy: false,
    loadingKey: false,
    allowEmd: true,
    useSynonyms: false,
    usePrefixes: false,
    useSuffixes: false,
    useWebSuffixes: false,
    useDashes: false,
    usePrefixNumber: false,
    useStemming: true,
    keywords: 'search',
    headers: [
      {text: 'Domain', value: 'domain'},
      {text: 'Availability', value: 'availability'},
      {text: 'Has History', value: 'history'},
      {text: 'Tools', value: 'tools'},
      {text: 'Score', value: 'score'}
    ],
    domains: [],
    statuses: {
      taken: 'Not Free'
    },
    q: null
  }),
  methods: {
    submit () {
      if (this.q !== null) {
        this.q.end()
        this.q = null
      }
      this.loadingKey = true
      var words = this.keywords.split(' ')
      var wordGroups = []
      for (var word of words) {
        var groupedWords = [word]
        if (this.useStemming) {
          groupedWords = this.assignStemming(groupedWords, word)
        }
        if (this.useSynonyms) {
          groupedWords = this.assignSynonyms(groupedWords)
        }
        wordGroups.push(groupedWords)
      }
      var wordCases = this.allPossibleCases(wordGroups)
      var allScrambles = this.allScrambles(wordCases)
      var allDomains = this.allDomains(allScrambles)
      var scoredDomains = this.scoreDomains(allDomains)
      this.renderInitialDomains(scoredDomains)
      this.checkDomains(scoredDomains)
    },
    tableLoading (loadingKey) {
      return loadingKey
    },
    assignSynonyms (groupedWords) {
      var stateGroup = [...groupedWords]
      for (var word of stateGroup) {
        var synonymWords = synonyms(word)

        if (typeof synonymWords !== 'undefined' && typeof synonymWords['n'] !== 'undefined') {
          for (var synonymNoun of synonymWords['n']) {
            if (synonymNoun.length > 2) {
              groupedWords.push(synonymNoun)
            }
          }
        }
        if (typeof synonymWords !== 'undefined' && typeof synonymWords['s'] !== 'undefined') {
          for (var synonymSubject of synonymWords['s']) {
            if (synonymSubject.length > 2) {
              groupedWords.push(synonymSubject)
            }
          }
        }
        if (typeof synonymWords !== 'undefined' && typeof synonymWords['v'] !== 'undefined') {
          for (var synonymVerb of synonymWords['v']) {
            if (synonymVerb.length > 2) {
              groupedWords.push(synonymVerb)
            }
          }
        }
      }
      return groupedWords
    },
    assignStemming (groupedWords, word) {
      var version = stemmer(word)
      if (word !== version) {
        groupedWords.push(version)
      }
      return groupedWords
    },
    getColor (availability) {
      if (availability === this.statuses.taken) return 'error'
      else return 'success'
    },
    getDisabled (availability) {
      if (availability === 'Working') return true
      else return false
    },
    getTooltip (availability) {
      switch (availability) {
        case this.statuses.taken:
          var text = 'This domain is not available, but if you like it you can click here and we '
          text += 'will parse through the auction sites to check for sales prices and check if it\'s expiring soon'
          return text
      }
    },
    getLoading (availability) {
      if (availability === 'Working') return true
      else return false
    },
    getScoreColor (score) {
      if (score > 90) {
        return 'green'
      } else if (score > 65) {
        return 'primary'
      } else if (score > 40) {
        return 'orange'
      } else {
        return 'red'
      }
    },
    openUrl (url) {
      shell.openExternal(url)
    },
    openWindow (domain, availability) {
      if (availability !== 'Working') {
        shell.openExternal('https://www.godaddy.com/domainsearch/find?isc=gdbbe2470&checkAvail=1&tmskey=&domainToCheck=' + domain)
      }
    },
    getHistoryDisabled (history) {
      if (history === 'Working' || history === 'No review') return true
      else return false
    },
    getHistoryLoading (history) {
      if (history === 'Working') return true
      else return false
    },
    getHistoryColor (history) {
      if (history === 'None') return 'success'
      else return 'orange'
    },
    openHistoryWindow (domain, history) {
      if (history !== 'Working') {
        shell.openExternal('https://web.archive.org/web/*/' + domain)
      }
    },
    openAdvancedHistoryWindow (domain, history) {
      if (history !== 'Working') {
        shell.openExternal('https://domainreport.domaintools.com/' + domain)
      }
    },
    exportStatus (domains) {
      if (domains.length !== 0 && !this.loadingKey) {
        return false
      }
      return true
    },
    exportCsv (domains) {
      var rows = [['Domain Name', 'Availability', 'History', 'Score']]
      for (var domain of domains) {
        rows.push([domain.domain, domain.availability, domain.history, domain.score])
      }

      let csvContent = rows.map(e => e.join(',')).join('\n')
      this.$store.dispatch('add_file_context_to_save', {fileName: 'report.csv', fileData: csvContent})
    },
    exportPdf (domains) {

    },
    allPossibleCases (words) {
      var r = []
      var arg = words
      var max = arg.length - 1
      function helper (arr, i) {
        for (var j = 0, l = arg[i].length; j < l; j++) {
          var a = arr.slice(0)
          a.push(arg[i][j])
          if (i === max) {
            r.push(a)
          } else {
            helper(a, i + 1)
          }
        }
      }
      helper([], 0)
      return r
    },
    allScrambles (wordCases) {
      var allScrambles = []
      for (var wordCase of wordCases) {
        var comb = Combinatorics.permutationCombination(wordCase)
        allScrambles.push(comb.toArray())
      }
      return allScrambles
    },
    allDomains (combinations) {
      var allDomains = []
      var returnDomains = {}
      if (this.useWebSuffixes || this.useSuffixes) {
        combinations = this.assignSuffix(combinations)
      }

      if (this.usePrefixes) {
        combinations = this.assignPrefix(combinations)
      }

      for (var combs of combinations) {
        for (var endComb of combs) {
          returnDomains[endComb.join('')] = 1
          if (this.useDashes) {
            returnDomains[endComb.join('-')] = 1
          }
        }
      }

      if (this.usePrefixNumber) {
        for (var i = 1; i <= 10; i++) {
          for (var tmpDomain in returnDomains) {
            returnDomains[i + tmpDomain] = 1
          }
        }
      }

      for (var domain in returnDomains) {
        for (var tld of this.tldValue) {
          if (domain.length <= this.domainLength) {
            allDomains.push(domain + tld)
          }
        }
      }

      return allDomains
    },
    assignPrefix (combinations) {
      var rules = this.prefixes()
      for (var i in combinations) {
        for (var webSuffixComb of combinations[i]) {
          for (var rule of rules) {
            for (var match of rule['matches']) {
              var strLength = match.length
              var firstElement = webSuffixComb[0]
              var newElement = [...webSuffixComb]
              if (firstElement.substr(0, strLength) === match) {
                newElement.unshift(rule['prefix'])
                combinations.push([newElement])
              } else if (match === '*') {
                newElement.unshift(rule['prefix'])
                combinations.push([newElement])
              }
            }
          }
        }
      }
      return combinations
    },
    assignSuffix (combinations) {
      var rules = this.webify()
      for (var i in combinations) {
        for (var webSuffixComb of combinations[i]) {
          for (var rule of rules) {
            for (var match of rule['matches']) {
              var strLength = -match.length
              var lastElement = webSuffixComb[webSuffixComb.length - 1]
              var newElement = [...webSuffixComb]
              if (match !== '*' && lastElement.substr(strLength) === match && this.useWebSuffixes) {
                if (rule['replace']) {
                  let newLength = lastElement.length + strLength
                  newElement[newElement.length - 1] = lastElement.substr(0, newLength) + rule['suffix']
                  combinations.push([newElement])
                } else {
                  newElement[newElement.length - 1] = lastElement + rule['suffix']
                  combinations.push([newElement])
                }
              } else if (match === '*' && this.useSuffixes) {
                newElement[newElement.length - 1] = lastElement + rule['suffix']
                combinations.push([newElement])
              }
            }
          }
        }
      }
      return combinations
    },
    scrapLongDomains (domains) {
      var keptDomains = []
      for (var domain of domains) {
        if (domain.length <= this.domainLength) {
          keptDomains.push(domain)
        }
      }
      return keptDomains
    },
    scoreDomains (domains) {
      var scoredDomains = []
      for (var domain of domains) {
        let value = 0
        let parts = domain.split('.')
        // Value .com higher
        if (parts[1] === 'com') {
          value = value + 30
        }
        if (parts[1] === 'org' || parts[2] === 'net') {
          value = value + 12
        }

        // Value hyphens lower
        if (parts[0].includes('-')) {
          value = value - 10
        }

        // Value numbers lower
        if (/\d/.test(parts[0])) {
          value = value - 40
        }
        // Value shorter domains higher
        if (parts[0].length <= 10) {
          value = value + ((10 - parts[0].length) * (8 + (10 - parts[0].length)))
        }

        // Value domains with the exact keywords higher
        let found = false
        let all = true
        for (var word of this.keywords.split(' ')) {
          if (parts[0].includes(word)) {
            found = true
          } else {
            all = false
          }
        }
        if (found && all) {
          value = value + 40
        } else if (found) {
          value = value + 15
        }

        if (parts[0] === this.keywords) {
          value = value + 50
        }

        if (value > 100) {
          value = 100
        }

        if (value >= this.minScore) {
          scoredDomains.push({domainName: domain, score: value})
        }
      }
      return scoredDomains
    },
    renderInitialDomains (domains) {
      this.domains = []
      for (var domain of domains) {
        this.domains.push({
          'domain': domain.domainName,
          'availability': 'Working',
          'history': 'Working',
          'tools': 'Working',
          'score': domain.score
        })
      }
    },
    checkDomains (domains) {
      this.q = queue({concurrency: 1})
      var fullObject = this

      this.q.push(async function (cb) {
        await fullObject.checkDomainsPing(domains)
        cb()
      })

      this.q.push(async function (cb) {
        await fullObject.checkDomainsDns(domains)
        cb()
      })

      this.q.push(async function (cb) {
        await fullObject.checkHistories(domains)
        cb()
      })

      this.q.start(function () {})
      this.q.on('end', function () {
        fullObject.loadingKey = false
      })
    },
    checkDomainsPing (domains) {
      return new Promise(resolve => {
        var q = queue({concurrency: 5})
        var fullObject = this
        for (var i in domains) {
          var pushJobs = function (domains, i) {
            q.push(async function (cb) {
              await fullObject.checkDomainPing(domains[i], i)
              cb()
            })
          }
          pushJobs(domains, i)
        }
        q.start(function () {})
        q.on('end', function () {
          return resolve('done')
        })
      })
    },
    checkDomainPing (domain, i) {
      var fullObject = this
      return new Promise(resolve => {
        dns.resolve4(domain.domainName, function (err, addresses) {
          if (!err && typeof fullObject.domains[i] !== 'undefined') {
            fullObject.domains[i].availability = fullObject.statuses.taken
            fullObject.domains[i].history = 'No review'
          }
          return resolve('done')
        })
      })
    },
    checkDomainsDns (domains) {
      return new Promise(resolve => {
        var q = queue({concurrency: 1})
        var fullObject = this
        // Wait and then check domains over dns 10 at max
        for (var i in domains) {
          var pushJobs = function (domains, i) {
            q.push(async function (cb) {
              await fullObject.checkDomainDns(domains[i], i)
              cb()
            })
          }
          pushJobs(domains, i)
        }
        q.start(function () {})
        q.on('end', function () {
          return resolve('done')
        })
      })
    },
    checkDomainDns (domain, i) {
      var fullObject = this

      return new Promise(resolve => {
        if (this.domains[i].availability === 'Working') {
          whois.lookup(domain.domainName, {timeout: 5000}, function (err, data) {
            if (err || !data.includes('Creation Date') || !data.includes('Registrar')) {
              fullObject.domains[i].availability = 'Is free (click to test)'
            } else {
              fullObject.domains[i].availability = fullObject.statuses.taken
              fullObject.domains[i].history = 'No review'
            }
            // Don't spam whois
            setTimeout(function () {
              return resolve('done')
            }, 2000)
          })
        } else {
          return resolve('done')
        }
      })
    },
    checkHistories (domains) {
      return new Promise(resolve => {
        var q = queue({concurrency: 2})
        var fullObject = this
        // Wait and then check histories
        for (var i in domains) {
          var pushJobs = function (domains, i) {
            q.push(async function (cb) {
              await fullObject.checkHistory(domains[i], i)
              cb()
            })
          }
          pushJobs(domains, i)
        }
        q.start(function () {})
        q.on('end', function () {
          return resolve('done')
        })
      })
    },
    checkHistory (domain, i) {
      var fullObject = this

      return new Promise(resolve => {
        if (this.domains[i].history === 'Working') {
          request('http://archive.org/wayback/available?url=' + domain.domainName, function (error, response, body) {
            if (error) {
              fullObject.domains[i].history = 'Error checking :('
            } else {
              var info = JSON.parse(body)
              if (typeof info.archived_snapshots.closest === 'undefined') {
                fullObject.domains[i].history = 'None'
              } else {
                fullObject.domains[i].history = 'Found (click to review)'
              }
            }
            return resolve('done')
          })
        } else {
          return resolve('done')
        }
      })
    },
    webify () {
      return [
        {
          'matches': ['a', 'i'],
          'suffix': 'fy',
          'replace': false
        },
        {
          'matches': ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
          'suffix': 'ify',
          'replace': false
        },
        {
          'matches': ['e'],
          'suffix': 'ify',
          'replace': true
        },
        {
          'matches': ['b', 'c', 'g', 'k', 'm', 'p', 't'],
          'suffix': 'ly',
          'replace': false
        },
        {
          'matches': ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'z'],
          'suffix': 'ably',
          'replace': false
        },
        {
          'matches': ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'z'],
          'suffix': 'oid',
          'replace': false
        },
        {
          'matches': ['o'],
          'suffix': 'oid',
          'replace': true
        },
        {
          'matches': ['er'],
          'suffix': ['r'],
          'replace': true
        },
        {
          'matches': ['bed'],
          'suffix': ['bd'],
          'replace': true
        },
        {
          'matches': ['s'],
          'suffix': ['z'],
          'replace': true
        },
        {
          'matches': ['*'],
          'suffix': ['only'],
          'replace': false
        },
        {
          'matches': ['tips'],
          'suffix': ['z'],
          'replace': false
        },
        {
          'matches': ['*'],
          'suffix': ['tool'],
          'replace': false
        },
        {
          'matches': ['*'],
          'suffix': ['pro'],
          'replace': false
        }
      ]
    },
    prefixes () {
      return [
        {
          'matches': ['a', 'e', 'i', 'o', 'u', 'y'],
          'prefix': 'an'
        },
        {
          'matches': ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'z'],
          'prefix': 'a'
        },
        {
          'matches': ['*'],
          'prefix': 'the'
        },
        {
          'matches': ['*'],
          'prefix': 'one'
        }
      ]
    }
  }
}
