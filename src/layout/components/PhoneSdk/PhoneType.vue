<template>
  <el-popover style="display: flex;" v-model="isPhoneTypePopoverShow" popper-class="popover-sdk" placement="bottom" width="280" trigger="click" :disabled="disabled">
    <el-card class="box-card" :body-style="{ height: '177px', overflow: 'auto' }">
      <!-- <div slot="header" class="clearfix">
        <div class="dis-f a-center">
          <span class="flex1">Please select Answer Device</span>
          <i class="el-icon-close" style="font-size: 20px; cursor: pointer" @click="() => (isPhoneTypePopoverShow = false)" />
        </div>
      </div> -->
      <div class="content h100">
        <div class="van-cell van-cell--clickable">
          <div class="van-cell__title"><span>Answer Mode</span></div>
          <div class="flex1" style="flex:1.2;">
            <el-select @change="change_status" v-model="value">
              <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"> </el-option>
            </el-select>
          </div>
        </div>
        <div v-show="value==='3'" class="van-cell van-cell--clickable">
          <div class="van-cell__title"><span>Auto Answer</span></div>
          <el-switch @change="changeIsAutoAnswer" v-model="isAutoAnswer0"></el-switch>
        </div>
        <div v-if="value==='1'" class="van-cell van-cell--clickable">
          <div class="van-cell__title"><span>Sip Number</span></div>
          <!-- <el-select v-model="valueSipNumber">
            <el-option v-for="item in SipNumberOpts" :key="item.id" :label="item.name" :value="item.id"> </el-option>
          </el-select> -->
          <div class="flex1" style="flex:1.2;">
            <el-input maxlength="20" clearable @input="valueSipNumberInput" v-model="valueSipNumber"></el-input>
          </div>
        </div>
        <div v-if="value==='0'" class="van-cell van-cell--clickable">
          <div class="van-cell__title"><span>Phone Number</span></div>
          <div class="flex1" style="flex:1.2;">
            <el-input maxlength="20" clearable @input="numberInput" v-model="phoneNumber"></el-input>
          </div>
        </div>
        <!-- <ul class="status-ul">
          <li v-for="item in selectOptions" :key="item.id" class="item" :class="{ hover: selectedStatusId === item.id }" @click="change_status(item)">
            <span>{{ item.name }}</span>
          </li>
        </ul> -->
        <div
          class="tx-c"
          style="    margin-top: 26px;    position: absolute;
    width: 100%;
    bottom: 16px;"
        >
          <el-button class="phone-btn-df" @click="() => (isPhoneTypePopoverShow = false)">Cancel</el-button>
          <el-button @click="save" type="primary">Save</el-button>
        </div>
      </div>
    </el-card>
    <div slot="reference" class="text-wrapper_29 flex-col">
      <span class="text_104 pointer">{{ name }}</span>
    </div>
    <!-- <div slot="reference" class="el-select el-select--small">
      <div class="el-input el-input--small el-input--suffix">
        <div :class="{ 'cc-disabled': disabled  }" class="el-input__inner dis-f a-center" style="height: 32px;white-space: nowrap;">
          {{ `Device ：${name}` }}
        </div>
        <span
          class="el-input__suffix"
          style="    display: flex;
    align-items: center;"
        >
          <span class="el-input__suffix-inner"><i class="el-select__caret el-input__icon el-icon-arrow-up" /></span>
        </span>
      </div>
    </div> -->
  </el-popover>
</template>
<script>
import EventBus from '@/utils/eventBus.js'

import { mapGetters } from 'vuex'
export default {
  name: "",
  mixins: [],
  components: {},
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    isLogin: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isDisabled: false,
      isPhoneTypePopoverShow: false,
      selectedStatusId: "free",
      phoneNumber: "",
      valueSipNumber: "",
      SipNumberOpts: [],
      selectOptions: [
        {
          name: this.$t("status.free"),
          id: "free",
        },
        {
          name: this.$t("status.busy"),
          id: "busy",
        },
      ],
      value: "3",
      name: "Soft Phone",
      options: [
        { name: "Soft Phone", id: "3" },
        { name: "Sip Phone", id: "1" },
        { name: "Moble Phone", id: "0" },
      ],
      isAutoAnswer0:true,
    };
  },
  computed: {
     ...mapGetters(['isAutoAnswer']),
    _name() {
      return this.options.find((item) => item.id === this.value).name;
    },
  },
  watch: {
    isAutoAnswer: {
      handler(val) {
        this.isAutoAnswer0 = val
      },
      immediate: true
    },
    isLogin: {
      handler(val) {
        if(val) this.isPhoneTypePopoverShow = false;
      },
      immediate: true
    }
  },
  created() {},
  mounted() {},
  destroyed() {},
  methods: {
    change_status(item) {
      console.log(item);
      this.selectedStatusId = item.id;
      // this.wsInstance.request(item.id);
    },
    changeIsAutoAnswer(val) {
      this.$store.dispatch('sdk/setIsAutoAnswer', val)
    },
    numberInput(val) {
      this.phoneNumber = this.phoneNumber.replace(/[^\d]/g, "");
    },
    valueSipNumberInput(val) {
      this.valueSipNumber = this.valueSipNumber.replace(/[^\d]/g, "");
    },
    save() {
      if (this.value === "1") {
        if (!this.valueSipNumber) {
          this.$message.error("Please select the sip number");
          return;
        }
      } else if (this.value === "3") {
      } else if (this.value === "0") {
        if (!this.phoneNumber) {
          this.$message.error("Please enter the phone number");
          return;
        }
      }
      EventBus.$emit("changePhoneType", {
        value: this.value,
        valueSipNumber: this.valueSipNumber,
        phoneNumber: this.phoneNumber,
        isAutoAnswer: this.isAutoAnswer,
      });
      this.name = this._name;
    },
  },
};
</script>
<style>

.text-wrapper_29 {
  height: 25px;
  background: url(~@/assets/img/deviceBG.png)
    100% no-repeat;
  background-size: 100% 100%;
  margin-left: 8px;
}
.text_104 {
  width: 60px;
  height: 14px;
  overflow-wrap: break-word;
  color: rgba(15, 190, 43, 1);
  font-size: 12px;
  font-family: Helvetica;
  font-weight: NaN;
  text-align: center;
  white-space: nowrap;
  line-height: 14px;
  margin: 6px 25px 0 25px;
}
.phone-btn-df{
  border: none;
    background: #EFF0F7;
    height: 36px;
    font-size: 14px;
font-family: Helvetica;
color: #3F51B5;
}
.phone-btn-df:hover{
  background:  #F2F3F8;
}
.phone-btn-df:active{
  background: rgba(0,0,0,0.03);
}
</style>
