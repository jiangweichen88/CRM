import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import { getLanguage } from '@/lang/index'

var baseConfig = {}
try {
  baseConfig = window.sessionStorage.getItem('ini')
  if (baseConfig) {
    baseConfig = JSON.parse(baseConfig)
  } else {
    initBaseConfig()
    baseConfig = window.sessionStorage.getItem('ini')
    baseConfig = JSON.parse(baseConfig)
    // baseConfig = {}
  }
} catch (err) {
  baseConfig = {}
}
/* 初始化基本配置 */
function initBaseConfig() {
  var initConfig = {}
  // 用户访问BaseURL
  initConfig.originBaseURL = window.location.origin + '/'
  // Java请求地址
  initConfig.configJavaServer = typeof window.configJavaServer === 'undefined' ? initConfig.originBaseURL + 'nebula/' : window.configJavaServer
  window.initConfig = initConfig
  window.sessionStorage.setItem('ini', JSON.stringify(initConfig))
}
// console.log(baseConfig.configJavaServer, 'baseConfig.configJavaServer')
// create an axios instance
const service = axios.create({
  // baseURL: baseConfig.configJavaServer, // url = base url + request url
  baseURL: process.env.VUE_APP_BASE_API,
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})
// request interceptor
service.interceptors.request.use(
  (config) => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      // config.headers['X-Token'] = getToken()
      config.headers['X-Access-Token'] = getToken()
    }
    const lang = getLanguage()
    config.headers['lang'] = lang === 'zh' ? 'zh-CN' : lang
    if (store.getters.imToken) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      // config.headers['X-Token'] = getToken()
      config.headers['X-IM-ACCESS-TOKEN'] = store.getters.imToken
    }

    // console.log(config, 'config=======================')
    return config
  },
  (error) => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  (response) => {
    const res = response.data
    // console.log(res, '4444444')
    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 200) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      // console.log(res.code)
      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 401) {
        console.log('token失效')
        store.dispatch('user/resetToken').then(() => {
          location.reload()
        })
        // to re-login
        // MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
        //   confirmButtonText: 'Re-Login',
        //   cancelButtonText: 'Cancel',
        //   type: 'warning'
        // }).then(() => {
        //   store.dispatch('user/resetToken').then(() => {
        //     location.reload()
        //   })
        // })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  (error) => {
    console.log('err' + error) // for debug
    if (error.message === 'Request failed with status code 401') {
      Message({
        message: 'token 失效',
        type: 'error',
        duration: 5 * 1000
      })
      store.dispatch('user/resetToken').then(() => {
        location.reload()
      })
    }
    return Promise.reject(error)
  }
)

export default service
