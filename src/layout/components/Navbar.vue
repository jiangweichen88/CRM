<template>
  <div class="navbar dis-f a-center">
    <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <!-- <breadcrumb id="breadcrumb-container" class="breadcrumb-container" /> -->
    <PhoneSdk @emitData="emitData" />
    <div
      class="right-menu"
      style="flex: 1;
    justify-content: right;"
    >
      <template v-if="device !== 'mobile'">
        <!-- <search id="header-search" class="right-menu-item" /> -->

        <!-- <error-log class="errLog-container right-menu-item hover-effect" /> -->

        <!-- <screenfull id="screenfull" class="right-menu-item hover-effect" /> -->

        <!-- <el-tooltip :content="$t('navbar.size')" effect="dark" placement="bottom">
          <size-select id="size-select" class="right-menu-item hover-effect" />
        </el-tooltip> -->

        <!-- <lang-select class="right-menu-item hover-effect" /> -->

        <!-- <lang-select class="right-menu-item hover-effect" /> -->
      </template>
      <!-- <div class="dis-f a-center">
        <PhoneType :disabled="isDisabled" :isLogin="isLogin" />
      </div> -->
      <!-- 通知 -->
      <el-tooltip class="item" effect="light" content="Coming soon" placement="top">
        <div style="" class="dis-f a-center">
          <el-badge :value="99">
            <i class="iconfont iconfont-wb icon-xiaoxitongzhi"></i>
          </el-badge>
        </div>
      </el-tooltip>
      <!-- 自动邮件 -->
      <el-tooltip class="item" effect="light" content="Coming soon" placement="top">
        <div style="width:26px;" class="dis-f a-center">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-zidongyoujian"></use>
          </svg>
        </div>
      </el-tooltip>
      <!-- 自动文本 -->
      <el-tooltip class="item" effect="light" content="Coming soon" placement="top">
        <div style="width:26px;" class="dis-f a-center">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-zidongjiewenben"></use>
          </svg>
        </div>
      </el-tooltip>
      <!-- 自动接听 -->
      <div class="dis-f a-center item pointer">
        <AutoAnswer />
      </div>
      <!-- WiFi -->
      <div class="wifi-box dis-f a-center item">
        <Wifi style="width: 26px;height: 26px;" />
      </div>

      <div class="avatar-container right-menu-item hover-effect dis-f a-center">
        <div class="avatar-wrapper" @click="clickPersonal">
          <!-- <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar" /> -->
          <!-- <img v-if="rolesInfo.avatar" :src="rolesInfo.avatar+'?imageView2/1/w/80/h/80'" class="user-avatar" />
          <i v-else class="el-icon-s-custom" style="overflow: hidden;cursor: pointer;margin-top: 6px;font-size: 28px;border-radius: 50%;border: 1px solid #bbb;" /> -->
          <Avatar :imgSrc="rolesInfo.avatar?`${rolesInfo.avatar}'?imageView2/1/w/80/h/80'`:''" />
        </div>

        <div v-show="isShowPersonal" class="personal-box">
          <div class="personal-top">
            <Avatar style="width: 52px;height: 52px;" :imgSrc="rolesInfo.avatar?`${rolesInfo.avatar}'?imageView2/1/w/80/h/80'`:''" />
            <div
              style="margin-left: 16px;flex: 1;
    width: 0;    display: flex;
    flex-direction: column;
    justify-content: center;"
            >
              <div class="personal-name ellipsis">{{ rolesInfo.realname }}</div>
              <div class="personal-email ellipsis">{{ rolesInfo.email }}</div>
            </div>
          </div>
          <div class="personal-item">
            <div class="personal-item-title">{{ $t('navbar.autoAnswer') }}</div>
            <el-switch @change="changeIsAutoAnswer" v-model="autoAnswer" class="personal-item-switch" />
          </div>
          <div class="personal-item" @click="openChangePassword">
            <div class="personal-item-title">{{ $t('navbar.changePassword') }}</div>
            <i class="el-icon-arrow-right personal-item-arrow" />
          </div>
          <div class="personal-item">
            <div class="personal-item-title">{{ $t('navbar.language') }}</div>
            <lang-select class="right-menu-item" />
          </div>
          <div class="personal-item">
            <div class="personal-item-title">{{ $t('navbar.setup') }}</div>
            <i class="el-icon-arrow-right personal-item-arrow" />
          </div>
          <div class="personal-item" @click="logout">
            <div class="personal-item-logout">{{ $t('navbar.logOut') }}</div>
          </div>
        </div>
      </div>

      <el-dialog :title="dialogTitle" width="25%" :visible.sync="dialogFormVisible" :close-on-click-modal="false" :close-on-press-escape="false" :before-close="resetPassword" center>
        <el-form ref="addForm" :rules="rules" :model="formData" size="mini">
          <el-form-item :label="$t('navbar.oldPassword')" label-width="110px" prop="oldPassword">
            <el-input ref="oldPassword" :key="oldPasswordType" v-model="formData.oldPassword" :type="oldPasswordType" :placeholder="$t('navbar.oldPasswordPlaceholder')" @input="oldPasswordInput" />
            <span class="show-pwd" @click="showOldPassword">
              <svg-icon :icon-class="oldPasswordType === 'password' ? 'eye' : 'eye-open'" />
            </span>
          </el-form-item>
          <el-form-item :label="$t('navbar.password')" label-width="110px" prop="password">
            <el-input ref="password" :key="passwordType" v-model="formData.password" :type="passwordType" :placeholder="$t('navbar.passwordPlaceholder')" @input="passwordInput" />
            <span class="show-pwd" @click="showPassword">
              <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
            </span>
          </el-form-item>
          <el-form-item :label="$t('navbar.confirmPassword')" label-width="110px" prop="confirmPassword">
            <el-input
              ref="confirmPassword"
              :key="confirmPasswordType"
              v-model="formData.confirmPassword"
              :type="confirmPasswordType"
              :placeholder="$t('navbar.confirmPasswordPlaceholder')"
              @input="confirmPasswordInput"
            />
            <span class="show-pwd" @click="showConfirmPassword">
              <svg-icon :icon-class="confirmPasswordType === 'password' ? 'eye' : 'eye-open'" />
            </span>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" size="mini" style="margin-right: 10px;width: 100px;" @click="changePassword">{{ $t('navbar.savePassword') }}</el-button>
          <el-button type="danger" size="mini" style="width: 100px;" @click="resetPassword">{{ $t('navbar.cancelPassword') }}</el-button>
        </div>
      </el-dialog>

      <!-- <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <div style="font-size: 22px;    color: #fff;" class="user-avatar"><Avatar name="jc" /></div>
          <i class="el-icon-caret-bottom" />
        </div>
        <i class="el-icon-arrow-down"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item divided @click.native="logout">
            <span style="display: block">{{ $t('navbar.logOut') }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown> -->
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import ErrorLog from '@/components/ErrorLog'
import Screenfull from '@/components/Screenfull'
import SizeSelect from '@/components/SizeSelect'
import LangSelect from '@/components/LangSelect'
import Search from '@/components/HeaderSearch'
// import { removeToken } from '@/utils/auth'
import PhoneSdk from './PhoneSdk/index'
import PhoneType from './PhoneSdk/PhoneType'
import Wifi from './PhoneSdk/Wifi'
import AutoAnswer from './PhoneSdk/AutoAnswer'
import { changePassword } from '@/api/user'
import Avatar from '@/components/common/Avatar'
import variables from "@/styles/element-variables.scss";
export default {
  components: {
    // Breadcrumb,
    Hamburger,
    ErrorLog,
    Screenfull,
    SizeSelect,
    LangSelect,
    Search,
    PhoneSdk,
    PhoneType,
    Wifi,
    AutoAnswer,
    Avatar
  },
  data() {
    var validatePassword = (rule, value, callback) => {
      const reg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/
      if (value === '') {
        callback(new Error('Password is required'))
      } else if (!reg.test(value)) {
        callback(new Error('The password must be composed of 8-16 English characters (including uppercase and lowercase) and numbers'))
      } else {
        callback()
      }
    }
    var validateConfirmPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('confirmPassword is required'))
      } else if (value !== this.formData.password) {
        callback(new Error('The two passwords entered do not match!'))
      } else {
        callback()
      }
    }
    return {
      rolesInfo: {},
      isLogin:false,
      isShowPersonal: false,
      autoAnswer: false,
      dialogTitle: 'Change Password',
      dialogFormVisible: false,
      // 修改密码
      oldPasswordType: 'password',
      passwordType: 'password',
      confirmPasswordType: 'password',
      formData: {
        oldPassword: '',
        password: '',
        confirmPassword: ''
      },
      isDisabled: false,
      rules: {
        oldPassword: [
          { required: true, message: 'Old Password is required', trigger: ['blur', 'change'] },
          // { validator: validatePassword, trigger: ['blur', 'change'] }
        ],
        password: [
          { required: true, message: 'New Password is required', trigger: ['blur', 'change'] },
          { validator: validatePassword, trigger: ['blur', 'change'] }
        ],
        confirmPassword: [
          { required: true, message: 'Enter Again is required', trigger: ['blur', 'change'] },
          { validator: validateConfirmPassword, trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['sidebar', 'avatar', 'device','isAutoAnswer'])
  },
    watch: {
    isAutoAnswer: {
      handler(val) {
        this.autoAnswer = val
      },
      immediate: true
    }
  },
  mounted() {
    this.rolesInfo = JSON.parse(localStorage.getItem('rolesInfo'))
  },
  methods: {
    emitData(data) {
      this.isDisabled = data.isCalling;
      this.isLogin=data.isLogin;
    },
    changeIsAutoAnswer(val) {
      this.$store.dispatch('sdk/setIsAutoAnswer', val)
    },
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      // removeToken()
      // this.$router.push(`/login`)
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login`)
      // this.$router.push(`/login?redirect=${this.$route.fullPath}`)
      localStorage.removeItem('rolesInfo');
    },
    clickPersonal() {
      this.isShowPersonal = !this.isShowPersonal
    },
    closePersonal() {
      this.isShowPersonal = false
    },
    // 修改密码
    showOldPassword() {
      if (this.oldPasswordType === 'password') {
        this.oldPasswordType = ''
      } else {
        this.oldPasswordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.oldPassword.focus()
      })
    },
    showPassword() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    showConfirmPassword() {
      if (this.confirmPasswordType === 'password') {
        this.confirmPasswordType = ''
      } else {
        this.confirmPasswordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.confirmPassword.focus()
      })
    },
    checkPassword(str){
      var temp = ''
      for(var i=0;i<str.length;i++)
        if(str.charCodeAt(i)>0&&str.charCodeAt(i)<255)
          temp+=str.charAt(i)
          return temp
    },
    oldPasswordInput(value) {
      this.formData.oldPassword = this.checkPassword(value)
    },
    passwordInput(value) {
      this.formData.password = this.checkPassword(value)
    },
    confirmPasswordInput(value) {
      this.formData.confirmPassword = this.checkPassword(value)
    },
    openChangePassword() {
      this.isShowPersonal = false
      this.dialogFormVisible = true
    },
    changePassword() {
      this.$refs['addForm'].validate((valid) => {
        if (valid) {
          changePassword(this.formData).then(res => {
            if (res.code === 200) {
              this.$message({ message: "Password modification successful!", type: 'success' })
              this.resetPassword();
              this.logout()
            } else {
              this.$message({ message: res.message, type: 'error' })
            }
          })
        } else {
          return false
        }
      });
    },
    resetPassword() {
      this.$refs['addForm'].resetFields()
      this.$refs['addForm'].clearValidate()
      this.oldPasswordType = 'password'
      this.passwordType = 'password'
      this.confirmPasswordType = 'password'
      this.dialogFormVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/element-variables.scss";
.navbar {
  height: 50px;
  // overflow: hidden;
  overflow: visible;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    padding-right: 16px;
    float: right;
    display: flex;
    height: 100%;
    // line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      // display: inline-block;
      // padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      position: relative;
      z-index: 1;
      // &:hover {
      //   .personal-box {
      //     visibility: visible;
      //   }
      // }

      .avatar-wrapper {
        // margin-top: 5px;
        position: relative;
            width: 34px;
    height: 34px;
        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
          background: rgba(0, 0, 0, 0.025);
        }
      }

      .personal-box {
        // visibility: hidden;
        width: 300px;
        position: absolute;
        top: 50px;
        right: -10px;
        z-index: 9;
       background: #FFFFFF;
box-shadow: 0px 4px 12px 0px rgba(0,0,0,0.15);
border-radius: 6px;
border: 1px solid rgba(63,81,181,0.1);
        .icon-style {
          position: absolute;
          top: 5px;
          right: 5px;
        }
        .personal-top {
          display: flex;
             padding: 24px 20px;
          background: linear-gradient(270deg, #EFFBFF 0%, #E5F1FF 100%);
          .personal-avatar {
            display: block;
            margin: 0 auto 3px;
            width: 30px;
            height: 30px;
            border-radius: 50%;
          }
          .personal-name {
            font-size: 18px;
font-family: Helvetica-Bold, Helvetica;
font-weight: bold;
color: #32465B;
line-height: 22px;
          }
          .personal-email {
           font-size: 14px;
font-family: Helvetica;
color: #5F6A80;
line-height: 17px;
          }
        }
        .personal-item-title{
          font-size: 14px;
font-family: Helvetica;
color: #333333;
        }
        .personal-item {
          padding: 0 10px;
          height: 38px;
          line-height: 38px;
          font-size: 13px;
          display: flex;
          justify-content: space-between;
          user-select: none;
          &:hover {
            cursor: pointer;
            background: rgba(0, 0, 0, .025);
            transition: background .3s;
            .personal-item-arrow {
              color:$--color-primary;
            }
          }
          .personal-item-switch {
            margin-top: 9px;
          }
          .personal-item-arrow {
            margin-top: 12px;
            margin-right: 12px;
               color: #333333;
    font-weight: bold;
    font-size: 12px;
          }
          .personal-item-logout {
            width: 100%;
            height: 100%;
            text-align: center;
          font-size: 14px;
font-family: Helvetica-Bold, Helvetica;
font-weight: bold;
color: #EB4F3D;
line-height: 17px;
            &:hover {
              color: #EB4F3D;
            }
          }
        }
      }
    }
  }
  .right-menu .item{
    margin-right: 18px;
    .iconfont{
      font-size: 20px;
    }
  }
}

// 修改密码
.show-pwd {
  position: absolute;
  right: 10px;
  top: 3px;
  font-size: 16px;
  color: #889aa4;
  cursor: pointer;
  user-select: none;
}

::v-deep .el-switch {
  transform: scale(0.7);
}
::v-deep .el-dialog__header {
  padding: 0 10px;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #a8a7a7;
}
::v-deep .el-dialog__title {
  font-size: 15px;
}
::v-deep .el-dialog__headerbtn {
  top: 12px;
}
::v-deep .el-dialog__body {
  padding: 20px 20px 0 10px;
}
::v-deep .el-form-item--mini {
  margin-bottom: 40px;
}
::v-deep .el-form-item--mini .el-form-item__label {
  font-size: 13px;
  font-weight: 500;
}
::v-deep .el-dialog__footer {
  padding: 0 20px 15px;
}
::v-deep .right-menu .el-badge__content.is-fixed{
  top: -1px;
      padding: 0px 2px;
          font-size: 10px;
}
</style>
