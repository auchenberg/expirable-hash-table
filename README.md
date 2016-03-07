expirable-hash-table
---------------------------

Expirable HashTable to enable timeout-based item removal from HashTable.

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
```

## Events

