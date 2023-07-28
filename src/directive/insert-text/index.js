import insertText from './insert-text'

const install = function (Vue) {
  Vue.directive('insert-text', insertText)
}

if (window.Vue) {
  window['insert-text'] = insertText
  Vue.use(install) // eslint-disable-line
}

insertText.install = install
export default insertText
