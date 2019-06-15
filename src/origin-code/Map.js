function myMap(arr) {
  this.bucket = []
  this._init(arr)
}
myMap.prototype = {
  len: 8,
  _init: function(arr) {
    for (let i = 0; i < this.len; i++) {
      this.bucket[i] = { next: null }
    }
    arr && arr.forEach(item => this.set(item[0], item[1]))
  },
  makeHash: function(key) {
    var hash = 0
    if (typeof key === 'string') {
      let len = key.length > 3 ? key.length : 3
      for (let i = len - 3; i < len; i++) {
        hash += key[i] !== undefined ? key[i].charCodeAt() : 0
      }
    } else {
      hash = +key
    }
    return hash
  },
  _findStartNode: function(key) {
    var hash = this.makeHash(key)
    return this.bucket[hash % this.len]
  },
  set: function(key, value) {
    var startNode = this._findStartNode(key)
    var nodeList = startNode
    while (nodeList.next) {
      nodeList = nodeList.next
      if (nodeList.key === key) {
        console.log('repeat')
        nodeList.value = value
        return
      }
    }
    nodeList.next = { key, value, next: null }
  },
  get: function(key) {
    var start = this._findStartNode(key)
    var nodeList = start.next
    while (nodeList) {
      if (nodeList.key === key) {
        return nodeList.value
      } else {
        nodeList = nodeList.next
      }
    }
    return
  },

  has: function(key) {
    var start = this._findStartNode(key)
    var nodeList = start.next
    while (nodeList) {
      if (nodeList.key === key) {
        return true
      } else {
        nodeList = nodeList.next
      }
    }
    return false
  },

  delete: function(key) {
    var nodeList = this._findStartNode(key)

    while (nodeList.next) {
      if (nodeList.next.key === key) {
        var ret = nodeList.next
        nodeList.next = nodeList.next.next
        return ret
      } else {
        nodeList = nodeList.next
      }
    }
    return false
  },

  clear: function() {
    this._init()
  }
}

var map = new myMap([['a', 'd'], ['a', 'e']])
console.log(map)
