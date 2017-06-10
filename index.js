var nanologger = require('nanologger')
var nanobeacon = require('nanobeacon')
var assert = require('assert')
var xtend = require('xtend')

module.exports = MicroAnalytics

function MicroAnalytics (url, defaultData) {
  defaultData = defaultData || {}

  assert.equal(typeof url, 'string', 'microanalytics: url should be type string')
  assert.equal(typeof defaultData, 'object', 'microanalytics: defaultData should be type object')

  this.log = nanologger('microanalytics')
  this.defaultData = defaultData
  this.url = url
}

MicroAnalytics.prototype.append = function (data) {
  assert.equal(typeof data, 'object', 'microanalytics.append: data should be type object')
  var _data = xtend(this.defaultData, data)
  var ok = nanobeacon(this.url, _data)
  if (!ok) this.log.error('append: could not send data', _data)
}

MicroAnalytics.prototype.batch = function () {
  var self = this
  var cache = []
  return {
    append: function (data) {
      assert.equal(typeof data, 'object', 'microanalytics.batch.append: data should be type object')
      var _data = xtend(self.defaultData, data)
      cache.push(_data)
    },
    flush: function () {
      var ok = nanobeacon(self.url, cache)
      if (!ok) self.log.error('batch.flush: could not send data', cache)
    }
  }
}
