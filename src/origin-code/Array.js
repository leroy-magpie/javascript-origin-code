/*
push
pop
unshift
shift
splice
reverse
sort
indexOf
lastIndexOf
concat
join
slice
foreach
filter
map
some
every
reduce
reduceRight
find
findIndex
includes

from
*/

//push
Array.prototype.myPush = function() {
  for (var i = 0; i < arguments.length; i++) {
    this[this.length] = arguments[i]
  }
  return this.length
}

//pop
Array.prototype.myPop = function() {
  if (this.length > 0) {
    var num = this[this.length - 1]
    this.length--
  }
  return num
}

//unshift
Array.prototype.myUnshift = function() {
  var arglen = arguments.length,
    len = this.length
  for (var i = len - 1; i >= 0; i--) {
    this[i + arglen] = this[i]
  }
  for (i = 0; i < arglen; i++) {
    this[i] = arguments[i]
  }
  return this.length
}

//shift
Array.prototype.myShift = function() {
  var len = this.length,
    first = this[0]
  if (len > 0) {
    for (var i = 0; i < len; i++) {
      this[i] = this[i + 1]
    }
    this.length--
  }
  return first
}

Array.prototype.mySplice = function(start, num) {
  var arglen = arguments.length - 2, //插入组长
    len = this.length, //原数组长
    rearr = [], //截取数组
    backarr = [], //剩余数组
    backlen = 0, //剩余数组长
    move, //剩余数组移动位
    i, //截取开始位
    j //截取结束位

  //验证开始位
  start = +start ? start : 0
  if (start > len) {
    start = len
  }
  i = start
  move = start + arglen

  //验证结束位
  num = num || len
  j = start + num
  if (j > len) {
    j = len
  }

  //取
  for (; i < j; i++) {
    rearr[rearr.length] = this[i]
  }

  //后面还有剩
  if (j < len) {
    for (; j < len; j++) {
      backarr[backarr.length] = this[j]
    }
    backlen = backarr.length
  }

  //放入插入组
  for (i = start; i < move; i++) {
    this[i] = arguments[i - start + 2]
  }

  //放入剩余组
  for (i = move; i < move + backlen; i++) {
    this[i] = backarr[i - move]
  }
  //剪去多余
  if (move + backlen < len) {
    this.length -= len - move - backlen
  }
  return rearr
}

//reverse
Array.prototype.myReverse = function() {
  var len = this.length,
    temp
  if (len < 2) {
    return this
  }
  for (var i = 0; i < len / 2; i++) {
    temp = this[i]
    this[i] = this[len - 1 - i]
    this[len - 1 - i] = temp
  }
}

//sort
Array.prototype.mySort = function(fn) {
  fn =
    typeof fn == 'function'
      ? fn
      : function(a, b) {
          return String(a) > String(b)
        }
  for (var i = this.length - 1; i >= 0; i--) {
    for (var j = 0; j < i; j++) {
      if (fn(this[j], this[j + 1])) {
        var temp = this[j]
        this[j] = this[j + 1]
        this[j + 1] = temp
      }
    }
  }
  return this
}

//indexOf
Array.prototype.myIndexOf = function(item, index) {
  var len = this.length
  index = index || 0
  for (var i = index; i < len; i++) {
    if (this[i] === item) {
      return i
    }
  }
  return -1
}

//lastIndexOf
Array.prototype.myLastIndexOf = function(item, index) {
  index = index || this.length
  for (var i = index; i >= 0; i--) {
    if (this[i] === item) {
      return i
    }
  }
  return -1
}

//concat
Array.prototype.myConcat = function() {
  var str = Object.prototype.toString,
    len = this.length,
    newArr = [],
    item,
    l

  //浅克隆自己
  for (var i = 0; i < len; i++) {
    newArr[i] = this[i]
  }

  //遍历实参列表
  for (i = 0, len = arguments.length; i < len; i++) {
    item = arguments[i]
    //判断是否是数组
    if (str.call(item) == '[object Array]') {
      for (var j = 0, l = item.length; j < l; j++) {
        newArr[newArr.length] = item[j]
      }
    } else {
      newArr[newArr.length] = item
    }
  }
  return newArr
}

//join
Array.prototype.myJoin = function(str) {
  var len = this.length,
    strs = this[0]
  str = typeof str === 'undefined' ? ',' : str + ''
  for (var i = 1; i < len; i++) {
    strs += str + this[i]
  }
  return strs
}

//slice
Array.prototype.mySlice = function(start, end) {
  var arr = [],
    len = this.length
  start = +start ? start : 0
  end = typeof end === 'undefined' ? len : end
  if (start < 0) {
    start += len
  }
  if (end < 0) {
    end += len
  }
  if (end > len) {
    end = len
  }
  for (var i = start; i < end; i++) {
    arr[arr.length] = this[i]
  }
  return arr
}

//foreach
Array.prototype.myForeach = function(fn, that) {
  var that = that || window,
    _arr = this

  for (var i = 0, len = _arr.length; i < len; i++) {
    fn.call(that, _arr[i], i, _arr)
  }
}

//filter
Array.prototype.myFilter = function(fn, that) {
  var that = that || window,
    _arr = this,
    newArr = []

  for (var i = 0, len = _arr.length; i < len; i++) {
    if (fn.call(that, _arr[i], i, _arr)) {
      newArr.push(_arr[i])
    }
  }
  return newArr
}

//深度克隆filter
Array.prototype.myFilter = function(fn, that) {
  var that = that || window,
    _arr = this,
    newArr = []

  for (var i = 0, len = _arr.length; i < len; i++) {
    if (fn.call(that, _arr[i], i, _arr)) {
      if (typeof (_arr[i] == 'object')) {
        newArr.push(deepClone(_arr[i], {}))
      } else {
        newArr.push(_arr[i])
      }
    }
  }
  return newArr
}

//map
Array.prototype.myMap = function(fn, that) {
  var that = that || window,
    _arr = this,
    newArr = []

  for (var i = 0, len = _arr.length; i < len; i++) {
    newArr.push(fn.call(that, _arr[i], i, _arr))
  }
  return newArr
}

//some
Array.prototype.mySome = function(fn, that) {
  var that = that || window,
    _arr = this,
    newArr = []

  for (var i = 0, len = _arr.length; i < len; i++) {
    if (fn.call(that, _arr[i], i, _arr)) {
      return true
    }
  }
  return false
}

//every
Array.prototype.myEvery = function(fn, that) {
  var that = that || window,
    _arr = this,
    newArr = []
  for (var i = 0, len = _arr.length; i < len; i++) {
    if (!fn.call(that, _arr[i], i, _arr)) {
      return false
    }
  }
  return true
}

//reduce
Array.prototype.myReduce = function(fn, init, that) {
  var that = that || window,
    _arr = this,
    prev = this[0],
    i = 1,
    len = this.length

  if (String(init)) {
    prev = init
    i = 0
  }

  for (; i < len; i++) {
    prev = fn.call(that, prev, _arr[i], i, _arr)
  }
  return prev
}

//reduceRight
Array.prototype.myReduceRight = function(fn, init, that) {
  var that = that || window,
    len = this.length,
    prev = this[len - 1],
    j = 2
  if (String(init)) {
    prev = init
    j = 1
  }
  for (var i = len - j; i >= 0; i--) {
    prev = fn.call(that, prev, this[i], i, this)
  }
  return prev
}

//find
Array.prototype.myFind = function(fn, that) {
  var that = that || window,
    _arr = this

  for (var i = 0, len = _arr.length; i < len; i++) {
    if (fn.call(that, _arr[i], i, _arr)) {
      return _arr[i]
    }
  }
}

//findIndex
Array.prototype.myFindIndex = function(fn, that) {
  var that = that || window,
    _arr = this

  for (var i = 0, len = _arr.length; i < len; i++) {
    if (fn.call(that, _arr[i], i, _arr)) {
      return i
    }
  }
  return -1
}

//includes
Array.prototype.myIncludes = function(target, that) {
  var that = that || window,
    _arr = this,
    temp

  if (isNaN(target)) {
    for (var i = 0, len = _arr.length; i < len; i++) {
      if (isNaN(_arr[i])) {
        return true
      }
    }
  } else {
    for (var i = 0, len = _arr.length; i < len; i++) {
      if (_arr[i] === target) {
        return true
      }
    }
  }

  return false
}

//from
Array.myFrom = function(origin) {
  var res = []
  for (var i = 0, len = origin.length; i < len; i++) {
    res[i] = origin[i]
  }
  return res
}

//myIsArray
Array.myIsArray = function(arr) {
  return Object.prototype.toString.call(arr) === '[object Array]'
}

//Of
Array.myOf = function() {
  var len = arguments.length
  arr = []

  for (var i = 0; i < len; i++) {
    arr[i] = arguments[i]
  }
  return arr
}
