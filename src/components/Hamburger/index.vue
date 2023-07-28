<template>
  <div style="padding: 0 15px;" @click="toggleClick">
    <svg :class="{'is-active':!isActive}" class="hamburger" aria-hidden="true">
      <use xlink:href="#icon-shouqi"></use>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'Hamburger',
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    toggleClick() {
      this.$emit('toggleClick')
    }
  }
}
</script>

<style scoped>
.hamburger {
  display: inline-block;
  vertical-align: middle;
  width: 22px;
  height: 19px;
}

.hamburger.is-active {
  transform: rotate(180deg);
}
</style>
