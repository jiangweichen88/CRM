<template>
  <div>
    <el-checkbox class="check-all" v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">
      <!--自定义插槽方式定义多选组-->
      <template v-if="$slots.all">
        <slot name="all"></slot>
      </template>
    </el-checkbox>
    <!-- <div style="margin: 15px 0;"></div> -->
    <el-checkbox-group v-model="checkData" @change="handleCheckedChange">
      <!--自定义插槽方式定义多选组-->
      <template v-if="$slots.default">
        <slot></slot>
      </template>
      <!--默认方式,数据格式为{value: '', label: ''}-->
      <template v-else>
        <el-checkbox v-for="(item, index) in options" :key="index" :label="item[value]">{{ item[label] }}</el-checkbox>
      </template>
    </el-checkbox-group>
  </div>
</template>
<script>

/** @Description 带全选的多选择控件 */
export default {
  name: 'AllSelectCheckbox',
  model: {
    prop: 'data',
    event: 'change'
  },
  props: {
    data: {
      type: Array,
      default: () => []
    },
    options: {
      type: Array,
      default: () => []
    },
    value: {
      type: String,
      default: 'value'
    },
    label: {
      type: String,
      default: 'label'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      checkData: [],
      checkAll: false
    }
  },
  computed: {
    /** @Description 自动计算isIndeterminate */
    isIndeterminate() {
      const checkedCount = this.checkData.length
      const isIndeterminate = checkedCount > 0 && checkedCount < this.options.length

      return isIndeterminate
    },
    /** @Description 全选择的所有value */
    allOptionsValue() {
      return this.options.map(r => r[this.value])
    }
  },
  watch: {
    data() {
      this.checkData = this.data
    }
  },
  created() {
    this.checkData = this.data
  },
  mounted() {

  },
  methods: {
    /** @Description 全选 */
    doSelectAll() {
      this.$emit('change', [...this.allOptionsValue])
    },
    /** @Description 取消全选 */
    undoSelectAll() {
      this.$emit('change', [])
    },
    /** @Description 选择框变化 */
    handleCheckedChange(value) {
      const checkedCount = value.length
      this.checkAll = checkedCount === this.options.length

      this.$emit('change', value)
    },
    /** @Description 全选框变化 */
    handleCheckAllChange(val) {
      this.$emit('change', val ? [...this.allOptionsValue] : [])
    }
  }
}
</script>
<style lang="css" scoped></style>
