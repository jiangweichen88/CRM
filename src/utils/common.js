// const initConfig = {}
// // 用户访问BaseURL
// initConfig.originBaseURL = window.location.origin + '/'
// // Java请求地址
// initConfig.configJavaServer = typeof window.configJavaServer === 'undefined' ? (initConfig.originBaseURL + 'ams/') : window.configJavaServer
// // ai请求地址
// initConfig.configAiServer = typeof window.configAiServer === 'undefined' ? (initConfig.originBaseURL + 'aig/') : window.configAiServer
// // 录音地址
// initConfig.recordUrlIP = typeof window.configrecordUrlIP === 'undefined' ? (initConfig.originBaseURL.slice(0, -1)) : window.configrecordUrlIP
// // sping-boot集成，请以 / 结尾
// initConfig.springBase = typeof window.springBase === 'undefined' ? initConfig.originBaseURL : window.springBase
// // initConfig.springBase = 'http://192.168.16.62/'

// // 客户端部署配置，请以 / 结尾
// initConfig.clientBase = initConfig.originBaseURL + getClientBase()
// // 集成管理安装请求地址
// initConfig.configIntegration = typeof window.configIntegration === 'undefined' ? (initConfig.originBaseURL + 'integration/') : window.configIntegration
// // 默认语言版本，可选配置
// initConfig.langType = 'zh'
// // 是否启用多语言 1 开启 0 关闭
// initConfig.langEnabled = 1

// function getClientBase() {
//   var pathname = window.location.pathname.split('/')
//   var pathArr = []
//   for (var i = 0; i < pathname.length; i++) {
//     pathname[i] && pathname[i] !== 'index.html' && pathArr.push(pathname[i])
//   }
//   if (pathArr.length > 0) {
//     return pathArr.join('/') + '/'
//   } else {
//     return ''
//   }
// }

// window.initConfig = initConfig
// window.sessionStorage.setItem('ini', JSON.stringify(initConfig))
const ini = window.sessionStorage.getItem('ini')
console.log(ini, 'ini')

class Common {
  constructor() {
    this.defaultExpired = 3
    this.rememberExpired = 60 * 60 * 24 * 7
  }
  // 获取java接口url
  getJavaServerURI() {
    try {
      var obj = JSON.parse(ini)
      return obj.configJavaServer
    } catch (err) {
      return ''
    }
  }
  /**
 * 可以根据转入的天数获取前面某天的开始与结束时间戳
 * @param {number} num 前面几天
 */
  getStartEndTime(num = 1) {
    // 一天的毫秒数
    const MillisecondsADay = 24 * 60 * 60 * 1000 * num
    // 今日开始时间戳
    const todayStartTime = new Date(new Date().setHours(0, 0, 0, 0)).getTime()
    // 今日结束时间戳
    const todayEndTime = new Date(new Date().setHours(23, 59, 59, 999)).getTime()
    // 昨日开始时间戳
    const yesterdayStartTime = todayStartTime - MillisecondsADay
    // 昨日结束时间戳
    const yesterdayEndTime = todayEndTime - MillisecondsADay
    // console.log(`
    //   ${todayStartTime} =>今日时间戳
    //   ${todayEndTime} => 结束时间戳
    //   ${yesterdayStartTime} =>  昨日开始时间戳
    //   ${yesterdayEndTime} =>  昨日结束时间戳
    // `)
    return [yesterdayStartTime, yesterdayEndTime]
  }
  // getThisWeek() {
  //   let date = new Date()
  //   // 本周第一天
  //   let start = new Date(date.getTime() - (3600 * 1000 * 24 * (date.getDay() === 0 ? 6 : date.getDay() - 1)))
  //   // 本周最后一天
  //   let end = new Date(date.getTime() + (3600 * 1000 * 24 * (date.getDay() === 0 ? 0 : 7 - date.getDay())))
  //   console.log(start.getTime(), end.getTime())
  //   return [start.getTime(), end.getTime()]
  // }
  // getThisMonth() {
  //   var date = new Date()
  //   var year = date.getFullYear()
  //   var month = date.getMonth()
  //   var startMonth = new Date(year, month, 1)
  //   var endMonth = new Date(year, month + 1, 0)
  //   console.log(startMonth.getTime(), endMonth.getTime())
  //   return [startMonth.getTime(), endMonth.getTime()]
  // }
  // getLastWeek() {
  //   var oneDayTime = 24 * 60 * 60 * 1000 // 一天的总ms
  //   let date = new Date()
  //   // 本周第一天
  //   let start = new Date(date.getTime() - (3600 * 1000 * 24 * (date.getDay() === 0 ? 6 : date.getDay() - 1)))
  //   // 本周最后一天
  //   let end = new Date(date.getTime() + (3600 * 1000 * 24 * (date.getDay() === 0 ? 0 : 7 - date.getDay())))
  //   console.log(start.getTime(), end.getTime())
  //   var lastWeekMondayTime = start.getTime() - 7 * oneDayTime // 上周一
  //   var lastWeekSundayTime = start.getTime() - oneDayTime // 上周日
  //   console.log(lastWeekMondayTime, lastWeekSundayTime)
  // }
}

export default new Common()
