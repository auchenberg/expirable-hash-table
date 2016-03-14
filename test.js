var ExpirableHashTable = require('./index')
var tape = require('tape')

var table = new ExpirableHashTable(1000)

tape('Should add item and allow it get by get by key', function (t) {
  table.set('key', 'value')
  t.same(table.get('key'), 'value')
  t.end()
})

tape('Should remove item after expirety', function (t) {
  table.set('key', 'value')
  setTimeout(function () {
    t.same(table.get('key'), undefined)
    t.end()
  }, 1000)

})

tape('Should not remove item before expirery', function (t) {
  table.set('key', 'value')
  setTimeout(function () {
    t.same(table.get('key'), 'value')
    t.end()
  }, 900)
})

tape('Should support custom expirery', function (t) {
  table.set('key', 'value', 500)
  setTimeout(function () {
    t.same(table.get('key'), undefined)
    t.end()
  }, 550)
})

tape('Should trigger callback function when expired', function (t) {
  table.set('key2', 'value', 500)
  table.once('key2:expired', function() {
    console.log('key2:expired in callback function')
  })
  setTimeout(function () {
    t.same(table.get('key2'), undefined)
    t.end()
  }, 550)
})
