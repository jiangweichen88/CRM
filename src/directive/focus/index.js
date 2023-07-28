import focus from './focus'

const install = function (Vue) {
  Vue.directive('focus1', focus)
}

if (window.Vue) {
  window['focus1'] = focus
  Vue.use(install) // eslint-disable-line
}

focus.install = install
export default focus
