// import store from '@/store'
import { get } from 'lodash-es'

export default {
  data() {
    return {
      tableMaxH: 200
    }
  },
  mounted() {
    this.$nextTick(() => {
      //   console.log(this.$refs.tableParentBox.offsetHeigh, 'this.$refs222')
      // console.log(this.$refs.tableParentBox.clientHeight, 'this.$refs222')
      let tableMaxH = get(this.$refs, 'tableParentBox.clientHeight', 260)
      this.tableMaxH = tableMaxH - 34
    })
  },
  methods: {
    clearAllCommon(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    }
  }
}
