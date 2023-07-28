<template>
  <el-dropdown trigger="click" class="international" @command="handleSetLanguage">
    <!-- <div>
      <svg-icon class-name="international-icon" icon-class="language" />
    </div> -->
    <div>
      <span v-show="isShow" class="drop-item">
        <img src="@/assets/login/english.png" alt="" class="drop-img">
        <span class="drop-text">English</span>
      </span>
      <span v-show="!isShow" class="drop-item">
        <img src="@/assets/login/chinese.png" alt="" class="drop-img">
        <span class="drop-text">中文</span>
      </span>
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item :disabled="language==='en'" command="en" class="drop-item">
        <img src="@/assets/login/english.png" alt="" class="drop-img">
        <span class="drop-text">English</span>
      </el-dropdown-item>
      <el-dropdown-item :disabled="language==='zh'" command="zh" class="drop-item">
        <img src="@/assets/login/chinese.png" alt="" class="drop-img">
        <span class="drop-text">中文</span>
      </el-dropdown-item>

      <!-- <el-dropdown-item :disabled="language==='en'" command="en">
        English
      </el-dropdown-item>
      <el-dropdown-item :disabled="language==='zh'" command="zh">
        中文
      </el-dropdown-item>
      <el-dropdown-item :disabled="language==='es'" command="es">
        Español
      </el-dropdown-item>
      <el-dropdown-item :disabled="language==='ja'" command="ja">
        日本語
      </el-dropdown-item> -->
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  data() {
    return {
      isShow: true
    }
  },
  computed: {
    language() {
      return this.$store.getters.language
    }
  },
  mounted() {
    if (this.language === 'en') {
      this.isShow = true
    } else {
      this.isShow = false
    }
  },
  methods: {
    handleSetLanguage(lang) {
      if (lang === 'en') {
        this.isShow = true
      } else {
        this.isShow = false
      }

      this.$i18n.locale = lang
      this.$store.dispatch('app/setLanguage', lang)
      this.$message({
        message: 'Switch Language Success',
        type: 'success'
      })
    }
  }
}
</script>

<style scoped>
.drop-item {
  display: flex;
  align-items: center;
}
.drop-img {
  width: 25px;
  height: 30px;
}
.drop-text {
  margin-left: 20px;
  font-size: 14px
}
</style>