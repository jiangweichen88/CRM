<template>
  <div style="padding-bottom: 28px;">
    <div class="dis-f a-center" style="    padding: 20px 18px 20px 11px;">
      <vue-country-code
        v-if="countryCode"
        @onSelect="numberUpdate"
        :defaultCountry="countryCode"
        :preferredCountries="['us', 'CA', 'AU', 'NZ', 'DE', 'FR', 'GB', 'IT', 'SG', 'MY', 'TH', 'VN', 'JP', 'KR', 'HK', 'CN']"
      >
      </vue-country-code>
      <!-- <span class="makeNumItem">+{{ numberUpdateData.dialCode }}</span> -->
      <div
        class="pos-r"
        style="    line-height: 32px;flex:1;    display: flex;
    align-items: center;"
      >
        <input
          class="number-Input"
          @input="numberInput"
          placeholder="Enter telephone number"
          style="width: 100%; outline: none;box-sizing: border-box;background: none;border: none;padding-right: 20px;"
          v-model="phoneNumber"
        />
        <i v-if="phoneNumber" @click="clearInput" style="right: 0px;" class="el-icon-circle-close pos-a pointer" name="cross" />
      </div>
    </div>
    <div class="keypad van-number-keyboard">
      <div class="van-number-keyboard__body">
        <div class="van-number-keyboard__keys">
          <div v-for="item of keypadNum" class="van-key__wrapper">
            <div role="button" @click="onInput(item)" class="van-key">{{ item }}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- Marketing number 外显号-->
    <div class="Maketing-number color-text" style="color: rgb(112, 116, 121);">
      <div class="dis-f a-center j-center">
        <div class="tx-c">
          <!-- <div>Marketing number</div> -->
          <div class="flex1">
            <el-dropdown v-if="showMakeNumActions&&showMakeNumActions.length" trigger="click" placement="bottom" @command="showMakeNumOnSelect">
              <div class="dis-f a-center pointer">
                <vue-country-code v-if="hasCountrySelector" :disabled="true" :defaultCountry="countryCode2"> </vue-country-code>
                <span class="makeNumItem" v-if="makeNumItem">{{ makeNumItem.countryCode ? '+' + makeNumItem.countryCode + ' ' : '' }}{{ showMakeNumText }}</span>
                <i style="margin-left: 14px;" :class="!showMakeNumPopover ? 'el-icon-arrow-down' : 'el-icon-arrow-up'" />
              </div>
              <el-dropdown-menu class="dropdown-menu-keypad" slot="dropdown">
                <el-dropdown-item class="dropdown-item-keypad" :class="{'border0':index===showMakeNumActions.length-1}" v-for="(item,index) in showMakeNumActions" :key="item.number" :command="item">
                  <div class="van-popover__action-text van-hairline--bottom w100 tx-c" style="">
                    <div class="ellipsis">{{ item.countryCode ? '+' + item.countryCode + ' ' : '' }}{{ item.number }}</div>
                  </div>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <p v-if="!(showMakeNumActions&&showMakeNumActions.length)">Please set the display number</p>
          </div>
        </div>
      </div>
    </div>
    <div class="tx-c pointer phone-btn dis-f" :class="{active:phoneNumber}">
      <div class="phone-bg dis-f a-center j-center">
        <i class="iconfont  icon-hujiao" @click="onClose"></i>
      </div>
    </div>
  </div>
</template>
<script>
import parsePhoneNumber from 'libphonenumber-js'
export default {
  name: 'kepad',
  components: {},
  props: {
    _countryCode: null,
    countryCode2: {
      type: String,
      default: 'cn'
    },
    _phoneNumber: null,
    countryCodeNum: {
      type: String,
      default: '86'
    },
    countryCodeNum2: {
      type: String,
      default: '86'
    },
    logonData: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  computed: {},
  watch: {
    _phoneNumber: {
      handler(val, oldval) {
        // console.log(val, '9999')
        this.phoneNumber = val
      },
      deep: true,
      immediate: true
    },
    _countryCode: {
      handler(val, oldval) {
        // console.log(val, '9999')
        this.countryCode = null
        setTimeout(() => {
          this.countryCode = val
        }, 0)
      },
      deep: true,
      immediate: true
    },
    logonData(val) {
      if (val && val.numberList) {
        this.showMakeNumActions = val.numberList.map((v) => ({
          ...v,
          text: v.number
        }))
        // this.showMakeNumActions=[]
        let a0 = this.showMakeNumActions[0]
        if (a0) {
          this.showMakeNumOnSelect(a0)
        }
      }
    }
  },
  data() {
    return {
      keypadNum: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'],
      phoneNumber: '',
      countryCode: null,
      show: true,
      numberUpdateData: {},
      numberUpdateData2: {},
      makeNumItem: null,
      hasCountrySelector: true,
      showMakeNumText: '',
      showMakeNumPopover: false,
      showMakeNumActions: []
    }
  },

  created() {},
  methods: {
    getPhoneNumber_callIn(body) {
      let phoneNumber_callIn = null
      const makeCalledItem = this.showMakeNumActions.find((item) => item.number === body.called)
      const makeCalledHasCountryCode = this.showMakeNumActions.filter((item) => item.countryCode)
      const isHas86 = body.caller.indexOf('+') > -1
      if (!isHas86 && makeCalledItem) {
        // body.caller中继号无+86，外呼显号中有此号
        phoneNumber_callIn = makeCalledItem.countryCode ? '+' + makeCalledItem.countryCode + ' ' + body.caller : body.caller
      } else if (!isHas86 && makeCalledHasCountryCode && makeCalledHasCountryCode.length > 0) {
        phoneNumber_callIn = makeCalledHasCountryCode[0].countryCode ? '+' + makeCalledHasCountryCode[0].countryCode + ' ' + body.caller : body.caller
      }
      return phoneNumber_callIn
    },
    getOutlineNumber() {
      // 用户侧外显号
      let outlineNumber = this.showMakeNumText
      if (outlineNumber && this.hasCountrySelector && this.countryCode !== this.countryCode2) {
        //有国家且国家不相同,+86
        outlineNumber = '+' + this.makeNumItem.countryCode + ' ' + outlineNumber
        // outlineNumber = '+' + this.makeNumItem.countryCode + outlineNumber
      }
      return outlineNumber
    },
    getCalledNum() {
      // 外呼时删除国际代码
      let calledNum = null
      if (this.makeNumItem && this.makeNumItem.countryCode && this.countryCodeNum === this.makeNumItem.countryCode) {
        calledNum = this.phoneNumber.replaceAll(' ', '')
      }
      return calledNum
    },
    //外显号
    showMakeNumOnSelect(action) {
      this.makeNumItem = action
      this.hasCountrySelector = false
      this.showMakeNumPopover = false
      this.showMakeNumText = action.text
      if (!action.countryCode) {
        this.hasCountrySelector = false
      } else {
        let phoneNumber = parsePhoneNumber('+' + action.countryCode + ' ' + action.text)
        // let phoneNumber = parsePhoneNumber('+1 3124567890')
        let countryCode2 = phoneNumber.country
        let countryCodeNum2 = phoneNumber.countryCallingCode
        console.log(phoneNumber, 'parsePhoneNumber')
        //只用区号匹配会有问题，例如美国跟加拿大都是1
        // const countryCodeNum2 = this.getCountryCode(action.countryCode, 'num')
        // const countryCode2 = this.getCountryCode(action.countryCode)
        // this.$emit('setKeypadData', 'countryCodeNum2', action.countryCode)
        if (countryCode2) {
          this.$emit('setKeypadData', 'countryCodeNum2', countryCodeNum2)
          this.$emit('setKeypadData', 'countryCode2', countryCode2)
          setTimeout(() => {
            this.hasCountrySelector = true
          }, 0)
        } else {
          //外显设置了国家code但是匹配不到
        }
      }
    },
    getCountryCode(dialCode, type) {
      // console.log(this, this.$allCountries, 'allCountries')
      const _currentCountry = this.$allCountries.filter((v) => v.dialCode === dialCode)
      if (_currentCountry && _currentCountry.length) {
        const min = findMin(_currentCountry, 'priority')
        let _key = type === 'num' ? ' dialCode' : 'iso2'
        // console.log(_currentCountry, min, '_currentCountry')
        return min[_key]
      } else {
        return false
      }
    },
    numberInput(val) {
      // console.log(val, 'numberInput')
      this.phoneNumber = this.phoneNumber.replace(/[^0-9\*#]/g, '')
      // this.phoneNumber = this.phoneNumber.replace(/[^\d]/g, '')
      if (!val) {
        this.$emit('setKeypadData', 'phoneNumber', '')
      } else {
        this.$emit('setKeypadData', 'phoneNumber', this.phoneNumber)
      }
    },
    clearInput() {
      this.phoneNumber = ''
        this.$emit('setKeypadData', 'phoneNumber', '')
    },
    numberUpdate(val) {
      console.log(val, 'numberUpdate')
      this.$nextTick(() => {
        if (val.dialCode) {
          this.$emit('setKeypadData', 'countryCodeNum', val.dialCode)
          this.$emit('setKeypadData', 'countryCode', val.iso2)
        }
      })
      this.numberUpdateData = val
    },
    numberUpdate2(val) {
      console.log(val, 'numberUpdate2')
      if (val.dialCode) {
        this.$emit('setKeypadData', 'countryCodeNum2', val.dialCode)
      }
    },
    onInput(value) {
      const _phoneNumber = this.phoneNumber === null ? '' : String(this.phoneNumber)
      const phoneNumber = _phoneNumber + String(value)
      this.phoneNumber = phoneNumber
      this.$emit('setKeypadData', 'phoneNumber', phoneNumber)
      this.$nextTick(() => {})
    },
    onDelete() {
      const phoneNumber = this.phoneNumber.slice(0, -1)
      this.$emit('setKeypadData', 'phoneNumber', phoneNumber)
    },
    onClose() {
      this.$emit('keypadCall')
    }
  }
}
</script>
<style scoped>
.keypad {
  position: unset;
}
.van-number-keyboard {
    position: unset;
    bottom: 0;
    left: 0;
    z-index: 100;
    width: 100%;
    padding-bottom: 22px;
    background-color: #f2f3f5;
    -webkit-user-select: none;
    user-select: none;
}
.van-number-keyboard__body {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    padding: 6px 0 0 6px;
}
.van-number-keyboard__keys {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-flex: 3;
    -webkit-flex: 3;
    flex: 3;
    -webkit-flex-wrap: wrap;
    flex-wrap: wrap;
}
.van-key__wrapper {
    position: relative;
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    -webkit-flex-basis: 33%;
    flex-basis: 33%;
    box-sizing: border-box;
    padding: 0 6px 6px 0;
}
.van-key {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    height: 48px;
    font-size: 28px;
    line-height: 1.5;
    background-color: #fff;
    border-radius: 8px;
    cursor: pointer;
    font-size: 28px;
font-family: Futura-Medium, Futura;
font-weight: 500;
color: #111111;
}
.vue-phone-number-input {
  margin: 12px 0;
  padding: 20px 16px;
  position: relative;
  z-index: 102;
}
/deep/ .Maketing-number .flex-1 {
  display: none;
}
/deep/ .Maketing-number .vue-phone-number-input {
  padding: 0;
  margin: 0;
}
/deep/ .Maketing-number .country-selector__input {
  border: none;
}
/deep/ .Maketing-number .country-selector.is-disabled .country-selector__input {
  background-color: transparent;
  color: rgb(112, 116, 121);
  padding-top: 0;
}
/deep/ .is-disabled .country-selector__country-flag {
  top: 50%;
  margin-top: -7px;
}
/deep/ .Maketing-number .country-selector__toggle,
/deep/ .Maketing-number .country-selector__label {
  display: none;
}
/deep/ .Maketing-number .van-field__body {
  border: none;
}
/deep/ .Maketing-number .van-cell {
  background: none;
}
/deep/ .Maketing-number .vue-phone-number-input .select-country-container {
  flex: unset;
  width: 94px;
  min-width: unset;
  max-width: unset;
}
/deep/ .van-key:hover {
font-weight: 500;
color: #00B388;
}
/deep/ .van-key--blue {
  background-color: #008069;
}
/deep/ .van-key--blue:hover {
  /* background-color: #04997e; */
}
/deep/ .van-badge {
  top: 4px;
  right: -4px;
}
.van-number-keyboard {
  background-color: #fff;
}
.phone-btn {
 align-items: center;
    justify-content: center;
  margin-top: 20px;
}
/deep/ .van-number-keyboard__sidebar {
  display: none;
}
.vue-country-select {
  border: none;
}
.van-popover__action {
  width: 180px;
}
/deep/ .Maketing-number .dropdown-arrow {
  display: none;
}
/deep/ .vue-country-select .dropdown-list {
  width: 318px;
  max-height: 260px;
}
/deep/ .vue-country-select .dropdown-list strong {
  margin-right: 4px;
}
/deep/ .vue-country-select .dropdown-item {
  display: flex;
  align-items: center;
}
/deep/ .vue-country-select .dropdown-item .iti-flag {
  margin-right: 10px;
}
.dropdown-item-keypad{
  border-bottom: 1px solid #dcdfe6;width: 180px;
}
.dropdown-item-keypad.border0{
border: none;
}
.dropdown-menu-keypad{
      max-height: 134px;
  overflow-y: auto;
}
.phone-bg {
    width: 60px;
    height: 60px;
    background: #5F6A8023;
    border-radius: 20px;
}
.phone-bg .iconfont {
font-size: 30px;
    color: #5F6A8059;
}
.phone-btn.active .phone-bg{
  background: #0fbe2b;
}
.phone-btn.active .iconfont{
  color: #fff;
}
.makeNumItem{
      font-size: 16px;
    font-family: Helvetica;
    color: #666666;
}
.el-icon-arrow-down{
  color: #333333;
    font-weight: 600;
}
.number-Input{
  font-size: 20px;
font-family: Futura-Medium, Futura;
font-weight: 500;
color: #111111;
}
.number-Input::placeholder{
  line-height: 32px;
  font-size: 14px;
font-family: Helvetica;
color: #BBBBBB
}
</style>
