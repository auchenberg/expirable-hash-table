expirable-hash-table
---------------------------

Expirable HashTable to enable timeout-based item removal from HashTable.

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)
[![Build status](https://travis-ci.org/auchenberg/expirable-hash-table.svg?branch=master)](https://travis-ci.org/auchenberg/expirable-hash-table)


## Install
`npm install expirable-hash-table`

## Use

```javascript
var ExpirableHashTable = require('expirable-hash-table')

var myTable = new ExpirableHashTable(1000) // default timeout in miliseconds

myTable.set('key', 'value', 3000) // optional timeout in miliseconds

myTable.get('key') // -> value
myTable.remove('key') // -> ExpirableHashTable
myTable.has('key') // -> true/false
myTable.purge() // -> ExpirableHashTable
myTable.toArray() // -> Array
myTable.size() // -> Integer

myTable.on('change', function() {
  // A change event is emitted ever time an item is added, updated or removed
})

myTable.once('<key>:expired', function() {
   // A expired event is emitted when a given item expires. Useful if a specific item wants to be monitored. 
})
```

## License
MIT

