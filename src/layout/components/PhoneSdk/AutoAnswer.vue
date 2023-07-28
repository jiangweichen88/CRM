<template>
  <el-tooltip effect="light" :content="isAutoAnswer?'Auto Answer':'Answer Manually'">
    <svg @click="AutoAnswer" class="icon" aria-hidden="true">
      <template v-if="!isAutoAnswer">
        <use xlink:href="#icon-zidongjieting"></use>
      </template>
      <template v-else>
        <use xlink:href="#icon-zidongjietingkaiqi"></use>
      </template>
    </svg>
  </el-tooltip>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: '',
  mixins: [],
  components: {},
  props: {},
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters(['isAutoAnswer']),
  },
  watch: {},
  mounted () {},
  destroyed () {},
  methods: {
    AutoAnswer() {
      const _isAutoAnswer = !this.isAutoAnswer;
      this.$store.dispatch('sdk/setIsAutoAnswer', _isAutoAnswer)
    }
  }
}
</script>
<style scoped>
.icon {
  width: 26px;
}
</style>
