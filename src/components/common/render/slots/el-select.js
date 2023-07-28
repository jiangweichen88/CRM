export default {
  options(h, conf, key) {
    const list = []
    conf.__slot__.options.forEach((item) => {
      list.push(<el-option key={item.value} label={item.label} value={item.value} disabled={item.disabled}></el-option>)
    })
    return list
  }
}
