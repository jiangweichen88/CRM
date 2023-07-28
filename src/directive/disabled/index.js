import disabled from './disabled'

const install = function (Vue) {
  Vue.directive('disabled', disabled)
}

if (window.Vue) {
  window['disabled'] = disabled
  Vue.use(install) // eslint-disable-line
}

disabled.install = install
export default disabled
