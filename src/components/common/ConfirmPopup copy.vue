<template>
  <el-popconfirm model="isShow" confirm-button-text="Confirm" cancel-button-text="Cancel" @onConfirm="confirm" title="Are you sure to continue with this operation?">
    <template slot="reference" v-if="$slots.default">
      <slot></slot>
    </template>
  </el-popconfirm>
</template>
<script>
export default {
  name: '',
  mixins: [],
  components: {},
  props: {},
  data () {
    return {
      isShow:false
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  destroyed () {},
  methods: {
    confirm () {
      this.$emit('onConfirm')
    }
  }
}
</script>
