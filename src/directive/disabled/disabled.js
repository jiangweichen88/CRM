let mask = null
let display = 'unset'
let cursor = 'unset'
export default {
  bind: function (el, binding, vnode) {
    console.log(el, binding, vnode, 'el, binding, vnode')
    const { value } = binding
    display = el.style.display
    cursor = el.style.cursor
    // 创建并添加透明遮罩元素
    // mask = document.createElement('div')
    // mask.style.cssText = 'position: absolute; z-index: 10000;  width: 100%; height: 100%;top:0;display:none;'
    // el.appendChild(mask)
  },
  // 当传进来的值更新的时候触发
  componentUpdated(el, { value }) {
    // console.log(value, 'value')
    if (value) {
      // el.style.pointerEvents = 'none'
      el.style['pointer-events'] = 'none'
      el.parentNode.style.cursor = 'not-allowed'
      el.parentNode.style.opacity = '0.5'
      // mask.style.display = 'block'
      // el.style.position = 'relative'
      // background-color: rgba(0, 0, 0, 0.1);
      // 添加事件监听器，监听鼠标移入事件
      // el.addEventListener('mouseover', function () {
      //   // 显示禁用图标和透明遮罩
      //   el.style.cursor = 'not-allowed'
      //   mask.style.display = 'block'
      // })
      // 添加事件监听器，监听鼠标移出事件
      // el.addEventListener('mouseout', function () {
      //   // 隐藏禁用图标和透明遮罩
      //   el.style.cursor = ''
      //   mask.style.display = 'none'
      // })
    } else {
      el.style.pointerEvents = 'unset'
      el.parentNode.style.cursor = cursor
      el.parentNode.style.opacity = 'unset'
      // mask.style.display = 'none'
    }
  }
}
