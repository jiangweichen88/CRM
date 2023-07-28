/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (typeof time === 'string') {
      if (/^[0-9]+$/.test(time)) {
        // support "1548221490638"
        time = parseInt(time)
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }

    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function getQueryObject(url) {
  url = url == null ? window.location.href : url
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}

/**
 * @param {string} input value
 * @returns {number} output value
 */
export function byteLength(str) {
  // returns the byte length of an utf8 string
  let s = str.length
  for (var i = str.length - 1; i >= 0; i--) {
    const code = str.charCodeAt(i)
    if (code > 0x7f && code <= 0x7ff) s++
    else if (code > 0x7ff && code <= 0xffff) s += 2
    if (code >= 0xdc00 && code <= 0xdfff) i--
  }
  return s
}

/**
 * @param {Array} actual
 * @returns {Array}
 */
export function cleanArray(actual) {
  const newArray = []
  for (let i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i])
    }
  }
  return newArray
}

/**
 * @param {Object} json
 * @returns {Array}
 */
export function param(json) {
  if (!json) return ''
  return cleanArray(
    Object.keys(json).map((key) => {
      if (json[key] === undefined) return ''
      return encodeURIComponent(key) + '=' + encodeURIComponent(json[key])
    })
  ).join('&')
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
  if (!search) {
    return {}
  }
  const obj = {}
  const searchArr = search.split('&')
  searchArr.forEach((v) => {
    const index = v.indexOf('=')
    if (index !== -1) {
      const name = v.substring(0, index)
      const val = v.substring(index + 1, v.length)
      obj[name] = val
    }
  })
  return obj
}

/**
 * @param {string} val
 * @returns {string}
 */
export function html2Text(val) {
  const div = document.createElement('div')
  div.innerHTML = val
  return div.textContent || div.innerText
}

/**
 * Merges two objects, giving the last one precedence
 * @param {Object} target
 * @param {(Object|Array)} source
 * @returns {Object}
 */
export function objectMerge(target, source) {
  if (typeof target !== 'object') {
    target = {}
  }
  if (Array.isArray(source)) {
    return source.slice()
  }
  Object.keys(source).forEach((property) => {
    const sourceProperty = source[property]
    if (typeof sourceProperty === 'object') {
      target[property] = objectMerge(target[property], sourceProperty)
    } else {
      target[property] = sourceProperty
    }
  })
  return target
}

/**
 * @param {HTMLElement} element
 * @param {string} className
 */
export function toggleClass(element, className) {
  if (!element || !className) {
    return
  }
  let classString = element.className
  const nameIndex = classString.indexOf(className)
  if (nameIndex === -1) {
    classString += '' + className
  } else {
    classString = classString.substr(0, nameIndex) + classString.substr(nameIndex + className.length)
  }
  element.className = classString
}

/**
 * @param {string} type
 * @returns {Date}
 */
export function getTime(type) {
  if (type === 'start') {
    return new Date().getTime() - 3600 * 1000 * 24 * 90
  } else {
    return new Date(new Date().toDateString())
  }
}

/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function () {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function (...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 * @param {Object} source
 * @returns {Object}
 */
export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'deepClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach((keys) => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

/**
 * @param {Array} arr
 * @returns {Array}
 */
export function uniqueArr(arr) {
  return Array.from(new Set(arr))
}

/**
 * @returns {string}
 */
export function createUniqueString() {
  const timestamp = +new Date() + ''
  const randomNum = parseInt((1 + Math.random()) * 65536) + ''
  return (+(randomNum + timestamp)).toString(32)
}

/**
 * Check if an element has a class
 * @param {HTMLElement} elm
 * @param {string} cls
 * @returns {boolean}
 */
export function hasClass(ele, cls) {
  return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}

/**
 * Add class to element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function addClass(ele, cls) {
  if (!hasClass(ele, cls)) ele.className += ' ' + cls
}

/**
 * Remove class from element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function removeClass(ele, cls) {
  if (hasClass(ele, cls)) {
    const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
    ele.className = ele.className.replace(reg, ' ')
  }
}
// 秒转时间(HH:mm:ss)
export function secondsToHours(sec) {
  var hrs = Math.floor(sec / 3600)
  var min = Math.floor((sec % 3600) / 60)
  sec = sec % 60
  sec = sec < 10 ? '0' + sec : sec
  min = min < 10 ? '0' + min : min
  hrs = hrs < 10 ? '0' + hrs : hrs
  return hrs + ':' + min + ':' + sec
}

// 时间戳转月日年(June 19, 2023)
export function formatDateEng (timeStamp) {
  const date = new Date(timeStamp) // 创建Date对象
  const year = date.getFullYear() // 获取年份
  const month = date.getMonth() + 1 // 获取月份，记得+1
  const day = date.getDate() // 获取日期
  let monthEng = ''
  if (month === 1) {
    monthEng = 'January'
  } else if (month === 2) {
    monthEng = 'February'
  } else if (month === 3) {
    monthEng = 'March'
  } else if (month === 4) {
    monthEng = 'April'
  } else if (month === 5) {
    monthEng = 'May'
  } else if (month === 6) {
    monthEng = 'June'
  } else if (month === 7) {
    monthEng = 'July'
  } else if (month === 8) {
    monthEng = 'August'
  } else if (month === 9) {
    monthEng = 'September'
  } else if (month === 10) {
    monthEng = 'October'
  } else if (month === 11) {
    monthEng = 'November'
  } else if (month === 12) {
    monthEng = 'December'
  }
  return `${monthEng} ${day}, ${year}` // 返回格式化后的日期字符串
}

// 时间戳转年月日(dd/mm/yyyy)
export function formatDate(timeStamp) {
  const date = new Date(timeStamp) // 创建Date对象
  const year = date.getFullYear() // 获取年份
  const month = date.getMonth() + 1 // 获取月份，记得+1
  const day = date.getDate() // 获取日期
  // return `${year}-${month}-${day}`; // 返回格式化后的日期字符串
  return `${day}/${month}/${year}` // 返回格式化后的日期字符串
}

// 时间戳转换成格林尼治时间
export function formatDateT(dataTime) {
  var newDate = new Date(dataTime)
  return newDate.toUTCString()
}

// 获取时区
export function getTimeZone(dataTime) {
  var newDate = -new Date(dataTime).getTimezoneOffset() / 60
  return 'GMT ' + newDate
}

// 处理 path， path有三种形式：'a[0].b.c'、'a.0.b.c' 和 ['a','0','b','c']，需要统一处理成数组，便于后续使用
function _basePath(path) {
  // 若是数组，则直接返回
  if (Array.isArray(path)) return path
  // 若有 '[',']'，则替换成将 '[' 替换成 '.',去掉 ']'
  return path.replace(/\[/g, '.').replace(/\]/g, '').split('.')
}
export function get(object, path, defaultValue) {
  // 判断 object 是否是数组或者对象，否则直接返回默认值 defaultValue
  if (typeof object !== 'object') return defaultValue
  // 沿着路径寻找到对应的值，未找到则返回默认值 defaultValue
  return _basePath(path).reduce((o, k) => (o || {})[k], object) || defaultValue
}
export function set(object, path, value) {
  if (typeof object !== 'object') return object
  _basePath(path).reduce((o, k, i, _) => {
    if (i === _.length - 1) {
      // 若遍历结束直接赋值
      o[k] = value
      return null
    } else if (k in o) {
      // 若存在对应路径，则返回找到的对象，进行下一次遍历
      return o[k]
    } else {
      // 若不存在对应路径，则创建对应对象，若下一路径是数字，新对象赋值为空数组，否则赋值为空对象
      o[k] = /^[0-9]{1,}$/.test(_[i + 1]) ? [] : {}
      return o[k]
    }
  }, object)
  // 返回object
  return object
}
export function getIsCalling(wsType) {
  const arr = ['locked', 'startCall', 'ring', 'answer', 'bridge']
  console.log(wsType, 'wsType')
  return arr.indexOf(wsType) > -1
}
//获取最近n天的开始时间和结束时间的时间戳
export function getNdaysAgoStartAndEndTime(n) {
  const now = new Date()
  const daysAgo = n || 7 // 如果未指定n，默认获取最近7天
  const start = now.getTime() + 1000 - daysAgo * 24 * 60 * 60 * 1000
  const end = now.getTime()
  return { start: start, end: end }
}
export function isValidateErrorMsg(formData, rules) {
  let validateMsg = []
  Object.keys(rules).forEach((key) => {
    let val = formData[key]
    const validate = rules[key].every((v) => {
      if (!v.validator(val)) {
        validateMsg.push(v.errorMsg || '')
      }
      return v.validator(val)
    })
  })
  return validateMsg
}
//随机整数
export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
