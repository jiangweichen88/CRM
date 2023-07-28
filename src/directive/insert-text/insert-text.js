export default {
  bind(el, binding) {
    el.addEventListener('click', () => {
      const input = binding.value
      const textarea = document.querySelector('textarea') // 获取textarea元素
      textarea.focus() // 聚焦到textarea
      const range = document.createRange() // 创建一个Range对象
      range.selectNodeContents(textarea) // 设置Range的范围，包含整个textarea的内容
      range.collapse(false) // 设置Range的范围，使其包含整个textarea的最后一个子元素（即光标所在位置）
      const selection = window.getSelection() // 创建一个Selection对象，用于控制和获取用户的选择内容
      selection.removeAllRanges() // 清除用户的选择内容
      selection.addRange(range) // 将创建的Range对象添加到Selection对象中，从而设置选区的范围为该Range对象所定义的范围
      document.execCommand('insertHTML', false, input) // 插入内容到选区中
      selection.removeRange(range) // 移除选区，释放对用户选择的限制
    })
  },
  inserted(el, binding) {
    // 可选：在指令被插入到DOM后执行一些其他操作
  },
  update(el, binding) {
    // 可选：在绑定值发生改变后执行一些其他操作
  }
}
