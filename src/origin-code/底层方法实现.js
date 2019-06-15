/*isNaN
parseInt
trim
trimLeft
trimRight
trimCenter
call
apply*/

//isNaN
function myIsNaN(num) {
  num = Number(num)
  return num == num
}

//parseInt
function myParseInt(str, radix) {
  //判断类型
  var str_type = typeof str
  if (str_type !== 'string' && str_type !== 'number') {
    return NaN
  }

  //判断基数
  if (!radix) {
    radix = 10
  }
  if (typeof radix !== 'number' || radix < 2 || radix > 36) {
    return NaN
  }

  //操作字符串
  str = str.toString().trim()
  var len = str.length,
    needSpli = false,
    spli

  function isSplit(str) {
    var code = str.toLowerCase().charCodeAt()
    if (code > 96 && code < 123) {
      code -= 87
    }
    if (code > 47 && code < 58) {
      code -= 48
    }
    if (code < radix && typeof code === 'number') {
      return code
    } else {
      needSpli = true
    }
  }

  for (var i = 0; i < len; i++) {
    isSplit(str[i])
    if (needSpli) {
      spli = str[i]
      break
    }
  }

  if (spli) {
    str = str.split(spli)[0]
    len = str.length
  }

  if (!len) {
    return NaN
  }

  //转换成10进制
  str = str
    .split('')
    .reverse()
    .join('')
  var res = 0,
    num

  for (i = len - 1; i >= 0; i--) {
    num = isSplit(str[i]) * Math.pow(radix, i)
    res += num
  }
  return res
}

//trim
String.prototype.myTrim = function() {
  return this.replace(/^\s+|\s+$/g, '')
}

//trimLeft
String.prototype.myTrimLeft = function() {
  return this.replace(/^\s+/g, '')
}

//trimRight
String.prototype.myTrimRight = function() {
  return this.replace(/\s+$/g, '')
}

//trimCenter
String.prototype.myTrimCenter = function() {
  return this.replace(/(\S)\s+(\b)/g, '$1')
}

//call
Function.prototype.myCall = function() {
  var obj = arguments[0] || window
  obj.fn = this
  var arg = []
  for (var i = 1; i < arguments.length; i++) {
    arg.push('arguments[' + i + ']')
  }
  var result = eval('obj.fn(' + arg.join() + ')')
  delete obj.fn
  return result
}

//apply
Function.prototype.myApply = function(obj, arr) {
  var obj = obj || window
  obj.fn = this
  if (!arr) {
    var result = obj.fn()
  } else {
    var arg = []
    for (var i = 0; i < arr.length; i++) {
      arg.push('arr[' + i + ']')
    }
    var result = eval('obj.fn(' + arg.join() + ')')
  }
  delete obj.fn
  return result
}
