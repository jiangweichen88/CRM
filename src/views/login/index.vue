<template>
  <div class="login-container">
    <div class="login-left">
      <div class="login-logo">
        <img src="@/assets/login/login-logo.png" alt="">
      </div>
      <div class="big-title">
        <div>Welcome</div>
        <div style="font-size: 46px;">Back!</div>
      </div>
      <div class="login-text">We dont want to push our ideas on to customers.</div>
      <div class="login-text">We simply want to make what they want.</div>
    </div>
    <div class="login-right">
      <lang-select class="set-language" />
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">
        <div class="title-container">
          <div class="title" style="font-size: 30px; font-weight: 700;">{{ $t('login.logIn') }}</div>
          <div class="title">
            {{ $t('login.welcome') }}
          </div>
        </div>

        <el-form-item>
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input
            ref="username"
            v-model="loginForm.username"
            :placeholder="$t('login.username')"
            name="username"
            type="text"
            tabindex="1"
            autocomplete="on"
          />
        </el-form-item>

        <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
          <el-form-item prop="password">
            <span class="svg-container">
              <svg-icon icon-class="password" />
            </span>
            <el-input
              :key="passwordType"
              ref="password"
              v-model="loginForm.password"
              :type="passwordType"
              :placeholder="$t('login.password')"
              name="password"
              tabindex="2"
              autocomplete="on"
              @keyup.native="checkCapslock"
              @blur="capsTooltip = false"
              @keyup.enter.native="handleLogin"
            />
            <span class="show-pwd" @click="showPwd">
              <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
            </span>
          </el-form-item>
        </el-tooltip>

        <div class="func-row">
          <div class="func-item">
            <el-checkbox v-model="rememberPassword" class="remember-password">{{ $t('login.rememberPassword') }}</el-checkbox>
            <el-tooltip class="item" effect="dark" :content="$t('login.forgotPasswordTip')" placement="bottom">
              <div class="fogot-password">{{ $t('login.forgotPassword') }}</div>
            </el-tooltip>
          </div>
          <el-checkbox v-model="isAgree" class="agree-item">
            {{ $t('login.agreeText') }}
            <span style="color: #2C74ED;">{{ $t('login.ServiceAgreement') }}</span>
            {{ $t('login.and') }}
            <span style="color: #2C74ED;">{{ $t('login.PrivacyPolicy') }}</span>
          </el-checkbox>
        </div>

        <el-button :loading="loading" class="login-btn" @click.native.prevent="handleLogin">
          {{ $t('login.logIn') }}
        </el-button>

        <!-- <div style="position:relative">
  <div class="tips">
    <span>{{ $t('login.username') }} : admin</span>
    <span>{{ $t('login.password') }} : {{ $t('login.any') }}</span>
  </div>
  <div class="tips">
    <span style="margin-right:18px;">
      {{ $t('login.username') }} : editor
    </span>
    <span>{{ $t('login.password') }} : {{ $t('login.any') }}</span>
  </div>

  <el-button class="thirdparty-button" type="primary" @click="showDialog=true">
    {{ $t('login.thirdparty') }}
  </el-button>
</div> -->
      </el-form>
      <div class="right-bottom">
        <div>{{ $t('login.CustomerService') }}</div>
        <div>{{ $t('login.TechnicalSupport') }}</div>
        <div>{{ $t('login.Version') }}</div>
      </div>
    </div>

    <el-dialog :title="$t('login.thirdparty')" :visible.sync="showDialog">
      {{ $t('login.thirdpartyTips') }}
      <br>
      <br>
      <br>
      <social-sign />
    </el-dialog>
  </div>
</template>

<script>
// import { validUsername } from '@/utils/validate'
import LangSelect from '@/components/LangSelect'
import SocialSign from './components/SocialSignin'

export default {
  name: 'Login',
  components: { LangSelect, SocialSign },
  data() {
    // const validateUsername = (rule, value, callback) => {
    //   if (!validUsername(value)) {
    //     callback(new Error('Please enter the correct user name'))
    //   } else {
    //     callback()
    //   }
    // }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        const btn = document.getElementsByClassName('login-btn')
        btn[0].style.backgroundColor = '#3f51b566'
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        const btn = document.getElementsByClassName('login-btn')
        btn[0].style.backgroundColor = '#3f51b5'
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        // username: [{ required: true, trigger: 'change', validator: validateUsername }],
        password: [{ required: true, trigger: 'change', validator: validatePassword }]
      },
      passwordType: 'password',
      rememberPassword: false,
      isAgree: false,
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {}
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    checkCapslock(e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && (key >= 'A' && key <= 'Z')
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
    // afterQRScan() {
    //   if (e.key === 'x-admin-oauth-code') {
    //     const code = getQueryObject(e.newValue)
    //     const codeMap = {
    //       wechat: 'code',
    //       tencent: 'code'
    //     }
    //     const type = codeMap[this.auth_type]
    //     const codeName = code[type]
    //     if (codeName) {
    //       this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
    //         this.$router.push({ path: this.redirect || '/' })
    //       })
    //     } else {
    //       alert('第三方登录失败')
    //     }
    //   }
    // }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $bg)) {
  .login-container .el-input input {
    color: $bg;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $bg;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    margin-bottom: 20px;
    border: 1px solid #DAE1E9;
    background: #fff;
    color: #454545;
  }
  .el-form-item:focus {
    border: 2px solid #3248d4 !important;
  }

  .el-form-item__error {
    font-size: 14px;
    padding-top: 10px;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;

  .login-left {
    padding: 50px;
    width: 35%;
    height: 100vh;
    background-image: url('../../assets/login/login-img.png');
    background-size: cover;
    background-position: center;
    .login-logo {
      width: 210px;
      height: 40px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .big-title {
      margin: 30% 0 20px;
      line-height: 70px;
      font-size: 60px;
      font-weight: 700;
      color: #fff;
    }
    .login-text {
      line-height: 30px;
      font-size: 20px;
      color: #fff;
    }
  }
  .login-right {
    position: relative;
    width: 65%;
    height: 100vh;
    background-color: #fff;
    background-image: url('../../assets/login/login-back.png');
    background-size: cover;
    background-position: center;
    .set-language {
      color: #000;
      position: absolute;
      top: 10px;
      right: 10px;
      font-size: 18px;
      cursor: pointer;
    }
    .login-form {
      position: relative;
      width: 580px;
      max-width: 100%;
      padding: 110px 35px 0;
      margin: 0 auto;
      overflow: hidden;

      .title-container {
        width: 100%;
        height: 50px;
        margin-bottom: 70px;
        &::after {
          content: '';
          display: block;
          clear: both;
        }
        .title {
          line-height: 40px;
          font-size: 20px;
          color: #000;
          margin-left: 10px;
        }
      }

      .func-row {
        font-size: 16px;
        line-height: 35px;
        margin-bottom: 60px;
        .func-item {
          display: flex;
          justify-content: space-between;
          .remember-password {
            zoom: 115%;
            color: #333333;
          }
          .fogot-password {
            color: #2C74ED;
            cursor: pointer;
          }
        }
        .agree-item {
          display: block;
          zoom: 110%;
          color: #333333;
        }
      }

      .login-btn {
        width:100%;
        height: 50px;
        font-size: 18px;
        color: #fff;
        background-color: rgba(63, 81, 181, 0.4);
      }
    }
    .right-bottom {
      width: 80%;
      display: flex;
      justify-content: space-between;
      position: absolute;
      left: 10%;
      bottom: 20px;
      color: #8893A2;
    }
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}


// 在使用浏览器保存的数据时 输入框的样式
::v-deep .el-input input:-webkit-autofill{
    // 字体颜色
    -webkit-text-fill-color: #283443 !important;
    // 背景颜色
    background-color:#fff !important;
    // 背景图片
    background-image: none !important;
    //设置input输入框的背景颜色为透明色
   -webkit-box-shadow: 0 0 0px 1000px #fff  inset !important;  
    transition: background-color 50000s ease-in-out 0s;
}

</style>
