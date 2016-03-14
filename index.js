var EventEmitter = require('events')
var util = require('util')

var ExpirableHashTable = function (defaultTimeout) {
  this.defaultTimeout = defaultTimeout

  this.table = {}
  this.timers = {}
  this.size = 0
}

util.inherits(ExpirableHashTable, EventEmitter)

ExpirableHashTable.prototype.get = function (hash) {
  return this.table[hash]
}

ExpirableHashTable.prototype.set = function (hash, value, timeout) {
  timeout = timeout != null ? timeout : this.defaultTimeout
  var notifyChange = false

  if (!this.has(hash)) {
    this.size = this.size + 1
  } else {
    clearTimeout(this.timers[hash])
  }

  if (this.has(hash)) {
    var currentVal = this.table[hash]
    if (JSON.stringify(currentVal) !== JSON.stringify(value)) {
      notifyChange = true
    }
  } else {
    notifyChange = true
  }

  this.table[hash] = value
  this.timers[hash] = setTimeout(this.remove.bind(this), timeout, hash)

  if (notifyChange) {
    this.emit('change')
  }

  return this
}

ExpirableHashTable.prototype.has = function (hash) {
  return this.table[hash] != null
}

ExpirableHashTable.prototype.size = function () {
  return this.size
}

ExpirableHashTable.prototype.remove = function (hash) {
  if (this.has(hash)) {
    clearTimeout(this.timers[hash])
    delete this.table[hash]
    delete this.timers[hash]
    this.size = this.size - 1
    this.emit('change')
    this.emit(hash + ':expired')
  }

  return this
}

ExpirableHashTable.prototype.purge = function () {
  for (var timer in this.timers) {
    if (this.timers.hasOwnProperty(timer)) {
      clearTimeout(timer)
    }
  }

  this.table = {}
  this.timers = {}
  this.size = 0
  this.emit('change')

  return this
}

ExpirableHashTable.prototype.toArray = function () {
  var targets = []

  Object.keys(this.table).forEach(function (key) {
    var val = this.table[key]
    targets.push(val)
  }.bind(this))

  return targets
}

module.exports = ExpirableHashTable
