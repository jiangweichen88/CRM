<template>
  <div class="ccc-sdk-main">
    <!-- 登录登出 -->
    <div
      class="bg"
      style="    padding: 4px;
    border-radius: 8px 0 0 8px;background: rgba(84, 109, 254, 0.1);"
    >
      <div v-disabled="!(call_show && !answer_show)" class="login-Change" @click="expand">
        <i style="font-size: 18px;" :class="[isLogin?'icon-qianchu':'icon-qianru']" class="iconfont"></i>
      </div>
    </div>
    <div class="ovf-h">
      <div class="right-box-w" :class="{rightActive:isLogin}">
        <!-- 状态栏 -->
        <div class="section_1 flex-row" :style="{ 'background-color': change_status_color[change_status_val] }">
          <i class="iconfont iconfont-nb" style="margin-left: 9px;" :class="{'icon-Free':change_status_val==='free','icon-busy':change_status_val==='busy'}"></i>
          <el-popover v-model="isStatusPopoverShow" popper-class="popover-sdk" placement="bottom" width="100" trigger="click" :disabled="isDisabled || isDisabledStatus">
            <ul class="status-ul">
              <li v-for="item in selectOptions" :key="item.id" class="item" :class="{ hover: change_status_val === item.id }" @click="change_status(item)">
                <span>{{ item.name }}</span>
              </li>
            </ul>
            <div slot="reference" class="dis-f pointer">
              <span class="text_1">{{ statusName }}</span>
              <i style="font-size: 10px;transform: scale(0.7);    margin: 7px 0 0 5px;font-weight: 500;" class="iconfont iconfont-nb icon-xiala"></i>
            </div>
          </el-popover>
          <PhoneType :disabled="isCalling" :isLogin="isLogin" />
          <span class="text_2">{{ time }}</span>
        </div>
        <!-- 操作栏 -->
        <div class="telbtns dis-f">
          <!-- 接听 -->
          <el-tooltip effect="light" :content="$t('main.answer')" placement="top">
            <div class="icon-item" @click="answer()" :class="{'sdk-swing':call_show && answer_show}">
              <i v-disabled="!(call_show && answer_show)" class="iconfont iconfont-wb icon-zhenling"></i>
            </div>
          </el-tooltip>
          <!-- 取消保持 -->
          <el-tooltip v-show="unHold_show" effect="light" :content="$t('status.unHold')" placement="top">
            <div class="icon-item">
              <i v-disabled="!(actionBar_show && unHold_show)" @click="wsInstance.request('unHold')" class="iconfont iconfont-wb icon-quxiaotonghuabaochi"></i>
            </div>
          </el-tooltip>
          <!-- 保持 -->
          <el-tooltip v-show="hold_show" effect="light" placement="top" :content="$t('status.hold')">
            <div class="icon-item">
              <i v-disabled="!(actionBar_show && hold_show)" @click="wsInstance.request('hold')" class="iconfont iconfont-wb icon-tonghuabaochi"></i>
            </div>
          </el-tooltip>
          <!-- 静音 -->
          <el-tooltip v-show="quiet_show" effect="light" placement="top" :content="$t('status.quiet')">
            <div class="icon-item">
              <i v-disabled="!(actionBar_show && holdBox_show && quiet_show)" @click="wsInstance.request('quiet')" class="iconfont iconfont-wb icon-weijingyin"></i>
            </div>
          </el-tooltip>
          <!-- 取消静音 -->
          <el-tooltip v-show="unQuiet_show" effect="light" placement="top" :content="$t('status.unQuiet')">
            <div class="icon-item">
              <i v-disabled="!(actionBar_show && holdBox_show && unQuiet_show)" @click="wsInstance.request('unQuiet')" class="iconfont iconfont-wb icon-jingyin"></i>
            </div>
          </el-tooltip>
          <!-- 外呼键盘 -->
          <el-popover v-model="isKeypadPopoverShow" :disabled="!call_show" popper-class="popover-sdk" placement="bottom" width="300" trigger="click">
            <el-card class="box-card">
              <div slot="header" class="pos-r tx-c">
                <span class="title-txt">Keypad</span>
                <i class="el-icon-close" style="font-size: 20px; cursor: pointer; position: absolute;right: 0;" @click="() => (isKeypadPopoverShow = false)" />
              </div>
              <Keypad
                ref="keypadComponent"
                @setKeypadData="setKeypadData"
                @keypadCall="keypadCall"
                :_phoneNumber="phoneNumber"
                :_countryCode="countryCode"
                :countryCode2="countryCode2"
                :countryCodeNum="countryCodeNum"
                :countryCodeNum2="countryCodeNum2"
                :logonData="logonData"
              />
            </el-card>
            <el-tooltip id="keypadBtn_ccsdk" slot="reference" effect="light" placement="top" :content="$t('main.keypad')">
              <div class="icon-item">
                <i v-disabled="isDisabled || !(call_show && !answer_show)" @click="keypad" class="iconfont iconfont-wb icon-shuzijianpan"></i>
              </div>
            </el-tooltip>
          </el-popover>
          <!-- 联系人 -->
          <el-popover @show="contactsPopoverShow" v-model="isContactsPopoverShow" :disabled="!call_show" popper-class="popover-sdk" placement="bottom" width="300" trigger="click">
            <el-card class="box-card" :body-style="{ height: '360px', overflow: 'auto' }">
              <div slot="header" class="clearfix">
                <div class="pos-r tx-c">
                  <span class="title-txt">Contacts</span>
                  <span
                    style="position: absolute;
    right: 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0;"
                  >
                    <!-- <i @click="ContactsDelShow" class="iconfont icon-shanchu pointer"></i> -->
                    <i class="el-icon-close" style="margin-left: 8px;font-size: 20px; cursor: pointer" @click="() => (isContactsPopoverShow = false)" />
                  </span>
                </div>
              </div>
              <div v-if="contactsData&&contactsData.length">
                <div v-for="(v, index) in contactsData" :key="index" class="text contacts-item" style="">
                  <div class="dis-f a-center">
                    <div class="avatar">
                      <!-- <img :src="AvatarContactImg" alt="" /> -->
                      <!-- <i class="iconfont  icon-morentouxiangzuoxi pointer"></i> -->
                      <Avatar :imgSrc="v.imgSrc" />
                    </div>
                    <div class="flex1" style="width: 0;    padding-right: 20px;padding-left: 12px">
                      <div class="marr10 name ellipsis">{{ getName(v)}}</div>
                      <div class="phone ellipsis">{{ v.primaryPhone }}</div>
                    </div>
                    <div class="phone-icon">
                      <i @click="ContactsCall(v)" class="iconfont  icon-hujiao pointer"></i>
                    </div>
                    <!-- v-if="isDelShow" -->
                    <i style="margin-left: 8px;" @click="ContactsDel(v)" class="iconfont icon-shanchu pointer"></i>
                  </div>
                </div>
              </div>
              <Empty v-if="!contactsData||!contactsData.length" description="No data"></Empty>
            </el-card>
            <el-tooltip slot="reference" effect="light" placement="top" :content="$t('main.Contacts')">
              <div class="icon-item">
                <i v-disabled="isDisabled || !(call_show && !answer_show)" @click="keypad" class="iconfont iconfont-wb icon-lianxiren"></i>
              </div>
            </el-tooltip>
          </el-popover>
          <!-- 挂断按钮 -->
          <el-tooltip effect="light" placement="top" :content="$t('main.hangup')">
            <div>
              <div class="icon-item-hangup" v-disabled="!(hangup_show || answer_show)" @click="wsInstance.request('hangup')">
                <i
                  style="    font-size: 10px;
    transform: scale(0.8);
    color: #fff;"
                  class="iconfont iconfont-wb icon-guaduan"
                ></i>
              </div>
            </div>
          </el-tooltip>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { status } from 'ccc-desk-sdk-noui/src/module/status.js'
// import { status } from '@/module/status.js'
import { secondsToHours } from "@/utils";
import { Message } from "element-ui";
import CCCDeskSDK_noui from "ccc-desk-sdk-noui";
import statusMixin from "@/layout/mixin/status";
import Keypad from "./Keypad";
// import Contacts from "./Contacts";
import Empty from "./Empty";
import PhoneType from "./PhoneType";

import { getContacts, delContacts } from "@/api/sdk.js";
import EventBus from "@/utils/eventBus.js";
import { mapGetters } from "vuex";
import { get } from "lodash-es";
import disabled from '@/directive/disabled/index.js' // use clipboard by v-directive
import Avatar from '@/components/common/Avatar'
export default {
  name: "PhoneSdk",
  components: { Keypad, Empty, PhoneType,Avatar },
  mixins: [statusMixin],
    directives: {
    disabled
  },
  data() {
    return {
      phoneNum: "",
      statusName: this.$t("main.connection"),
      status_val: "",
      change_status_val: "",
            change_status_color: {
        free: '#0fbe2b',
        busy: '#f95454',
        hangup: '#f95454'
      },
      isLogin: false,
      isStatusPopoverShow: false,
      isKeypadPopoverShow: false,
      isContactsPopoverShow: false,
      loginValue: "1",
      time: "00:00:00",
      phoneNum_show: false,
      call_show: false,
      actionBar_show: false,
      hangup_show: false,
      unQuiet_show: false,
      unHold_show: false,
      quiet_show: true,
      hold_show: true,
      holdBox_show: true,
      answer_show: false,
      themeColor: "",
      isDisabledStatus: false,
      wsInstance: null, // webSocket实例
      phoneNumber: "",
      show: true,
      contactsData: [],
      isDelShow: false,
      statusType: "",
      wsType: "",
      _status: null,
      _body: null,
      phoneNumber_callIn: "",
      logonData: {},
      countryCode: "CN",
      countryCode2: "CN",
      countryCodeNum: "86",
      countryCodeNum2: "86",
      isCalling: false,
      userInfo: {},
    };
  },
  computed: {
    ...mapGetters(["isAutoAnswer"]),
    _time() {
      return this.time;
    },
    isDisabled() {
      return !this.isLogin;
    },
    selectOptionsLogin() {
      const arr = [
        {
          name: this.$t("status.logon"),
          id: "1",
        },
        {
          name: this.$t("status.logout"),
          id: "2",
        },
      ];
      return arr;
    },
    selectOptions() {
      return [
        {
          name: this.$t("status.free"),
          id: "free",
        },
        {
          name: this.$t("status.busy"),
          id: "busy",
        },
      ];
    },
    i18nLocale() {
      return this.$i18n.locale;
    },
  },
  watch: {
    i18nLocale: {
      handler(newVal, oldVal) {
        // console.log(newVal, this.status);
        if (this.statusType) {
          this._status = this.status[this.statusType];
        }
        this.setUIstatus();
      },
    },
  },
  created() {
    // this.contactsData = new Array(100).fill({}).map((item, index) => {
    //   return {
    //     name: "name" + index,
    //     phone: "121" + index,
    //     id: index,
    //   };
    // });
    this.getContactsA();
  },
  mounted() {
    this.$store.dispatch("user/getUserInfo").then((res) => {
      console.log(res);
      console.log(this.$store.getters.userInfo, "userInfo");
      const userInfo = this.$store.getters.userInfo;
      this.userInfo = userInfo;
      const nouiInstance = new CCCDeskSDK_noui({
        lang: "en",
        options: {
          lang: "en",
          seatName: userInfo.username, //坐席名称 *必填
          seatPassword_MD5: userInfo.password, // 坐席密码，MD5加密32位小写*必填
          wsUrl: userInfo.wsBaseUrl,
          // seatName: "2013@CSZHL", // 租户名称 必填
          // seatPassword_MD5: "10b8e822d03fb4fd946188e852a4c3e2",
          // seatPassword_MD5: 'e10adc3949ba59abbe56e057f20f883e', // 坐席密码，MD5加密32位小写  必填
          // wsUrl: HispeakConfig.wsUrl
          //   ? HispeakConfig.wsUrl
          //   : "wss://" + window.location.host + "/nws",
          phoneType: 3, // 登录方式 "0"手机, "1"sip/硬话机, "2"webcall , "3"webrtc
          isAutoAnswer: this.isAutoAnswer,
          // wsUrl: 'ws://192.168.16.23:8085/nws'
        },
        onReady(_nouiInstance) {
          // 渲染完成回调
        },
      }).init();
      this.nouiInstance = nouiInstance;
      window.$nouiInstance = nouiInstance;
      this.$nextTick(() => {
        this.wsInstance = nouiInstance.$wsInstance;
        nouiInstance.getStatusOff(this.getStatus);
        // 获取ws状态数据
        nouiInstance.getStatus(this.getStatus);
      });
    });
    EventBus.$off("changePhoneType", this.changePhoneTypeEvent);
    EventBus.$on("changePhoneType", this.changePhoneTypeEvent);
  },
  beforeDestroy() {
    this.nouiInstance.getStatusOff(this.getStatus);
    EventBus.$off("changePhoneType", this.changePhoneTypeEvent);
  },
  methods: {
    expand() {
      this.isLogin = !this.isLogin;
      this.loginChange(this.isLogin)
    },
    getContactsA() {
      getContacts()
        .then((res) => {
          this.contactsData = res.data || [];
          // this.contactsData = []
        })
        .catch((err) => {
          this.contactsData = [];
        });
    },
    contactsPopoverShow() {
      this.getContactsA();
    },
    changePhoneTypeEvent(data) {
      this.wsInstance.request("logout");
      console.log(data, "changePhoneTypeEvent");
      const userInfo = this.userInfo;
      let phone;
      if (data.value === "3") {
        phone = "";
      } else if (data.value === "0") {
        phone = data.phoneNumber;
        // phone = userInfo.phone
      } else if (data.value === "1") {
        phone = data.valueSipNumber;
      }
      const nouiInstance = new CCCDeskSDK_noui({
        lang: "en",
        options: {
          lang: "en",
          seatName: userInfo.username, //坐席名称 *必填
          seatPassword_MD5: userInfo.password, // 坐席密码，MD5加密32位小写*必填
          wsUrl: userInfo.wsBaseUrl,
          phoneType: Number(data.value), // 登录方式 "0"手机, "1"sip/硬话机, "2"webcall , "3"webrtc
          phone: phone,
          isAutoAnswer: this.isAutoAnswer,
        },
        onReady(_nouiInstance) {
          // 渲染完成回调
        },
      }).init();
      this.nouiInstance = nouiInstance;
      window.$nouiInstance = nouiInstance;
      this.$nextTick(() => {
        this.wsInstance = nouiInstance.$wsInstance;
        nouiInstance.getStatusOff(this.getStatus);
        // 获取ws状态数据
        nouiInstance.getStatus(this.getStatus);
      });
    },
    getStatus(data) {
      const nouiInstance = this.nouiInstance;
      const wsOptions = this.nouiInstance.$wsInstance.wsOptions;
      const type = data.name;
      const body = data.body;
      this.wsType = type;
      // 开始计时
      if (
        type === "logon" ||
        type === "startCall" ||
        type === "hangup" ||
        type === "busy" ||
        type === "free"
      ) {
        this.startTime();
      }
      switch (type) {
        case "logon":
          if (body.status === 0) {
            this.isLogin = true;
            this.logonData = body;
          } else {
            this.isLogin = false;
          }
          break;
        case "logout":
          if (body.status === 0) {
            this.isLogin = false;
            this.loginValue = "2";
            this.resetUI();
            this.endTime();
          } else {
            Message.error(body.reason || "");
            this.loginValue = "1";
          }
          break;
        case "ring":
          let query = {
            t: Date.now(),
          };
          let isOutbound;
          this.$router.push({
            path: "/contact-page/voice",
            query,
          });
          if (nouiInstance.getIsOutbound(body) === 1) {
            // alert('外呼振铃')
            this.isOutbound = true;
          } else if (nouiInstance.getIsOutbound(body) === 0) {
            // alert('呼入振铃')
            this.startTime();
            this.isOutbound = false;
            this.phoneNumber_callIn = body.caller;
            const _phoneNumber_callIn =
              this.$refs.keypadComponent.getPhoneNumber_callIn(body);
            if (_phoneNumber_callIn) {
              this.phoneNumber_callIn = _phoneNumber_callIn;
            }
          }
          break;
        case "hangup":
          this.resetUI();
            //话后状态
            this.change_status_val = 'busy'
          //倒计时
          const groupId = body.groupId;
          let afterInterval;
          const afterIntervalItem = get(
            this,
            "wsInstance.wsOptions.groups",
            []
          ).find((item) => item.id === groupId);
          afterInterval = afterIntervalItem
            ? afterIntervalItem.afterInterval
            : 0;
          if (!afterInterval) {
            afterInterval = get(this, "wsInstance.wsOptions.afterInterval");
          }
          let countTime = afterInterval;
          if (countTime) {
            let interval = setInterval(() => {
              countTime--;
              if (countTime === 0) {
                this.wsInstance.request("free");
                clearInterval(interval);
                // alert('倒计时结束');
              }
            }, 1000);
          }

          break;
      }
      // 接听按钮显示
      if (type === "ring" && !this.wsInstance.isOutbound) {
        this.answer_show = true;
      } else if (type !== "keepalive") {
        this.answer_show = false;
      }

      // 更新UI
      // console.log(this, this.props);
      const status = this.status;
      if (status[type]) {
        this.statusType = type;
        this._status = status[type];
        this._body = body;
        this.updateUI(status[type], body, wsOptions);
      }
      this.emitData();
    },
    setKeypadData(key, val) {
      this[key] = val;
    },
    keypadCall() {
      this.call();
    },
    keypad() {},
    loginChange(e) {
      // console.log(e);
      const wsInstance = this.wsInstance;
      if (e) {
        console.log("logonCreate");
        wsInstance.logonCreate();
      } else {
        wsInstance.request("logout");
      }
    },
    getPhoneNum(type) {
      const countryCodeNum = this.countryCodeNum;
      const phoneNumber = this.phoneNumber.replaceAll(" ", "");
      if (type === "format") {
        return "+" + countryCodeNum + " " + phoneNumber;
      }
      return "+" + countryCodeNum + phoneNumber;
    },
    ContactsCall(v) {
      // console.log(v.phone);
      this.phoneNumber = v.primaryPhone;
      this.countryCode = v.iso || "CN";
      document.getElementById("keypadBtn_ccsdk").click();
    },
    ContactsDelShow() {
      this.isDelShow = !this.isDelShow;
    },
    ContactsDel(v) {
      delContacts(v.customerId).then((res) => {
        this.contactsData = this.contactsData.filter(
          (item) => item.customerId !== v.customerId
        );
      });
    },
    change_status(item) {
      this.isStatusPopoverShow = false;
      this.change_status_val = item.id;
      this.wsInstance.request(item.id);
    },
    call() {
      if (!this.phoneNumber) {
        this.$message({
          message: "wrong phone number",
          type: "error",
        });
        return;
      }
      let calledNum = this.getPhoneNum("format");
      // console.log(this.$refs.keypadComponent);
      let outlineNumber = this.$refs.keypadComponent.getOutlineNumber();
      // 外呼时删除国际代码
      const _calledNum = this.$refs.keypadComponent.getCalledNum();
      if (_calledNum) {
        calledNum = _calledNum;
      }
      let obj = {
        called: calledNum,
        // autoAnswer:true,
        // followData: JSON.stringify({
        //   tenantId: this.wsInstance.wsOptions.companyId,
        //   engagementId: engagementId,
        //   clientRegistrationId: "hubspot",
        // }),
      };
      if (outlineNumber) {
        obj.caller = outlineNumber;
      }
      this.wsInstance.request("startCall", obj);
    },
    updateUI(_status, body, wsOptions) {
      this.setUIvalues(_status, body, wsOptions);
      if (_status.isShowStatus) {
        this.setUIstatus();
      }
    },
    setUIstatus() {
      const _status = this._status;
      const body = this._body;
      if (_status.statusShowText && body.status === 0) {
        // 成功
        this.statusName = _status.statusShowText.success;
        this.status_val = _status.statusShowText.success;
      } else if (_status.statusShowText && body.status !== 0) {
        // 失败
        let failText = _status.statusShowText.fail;
        if (typeof failText === "object") {
          failText = failText[body.status]
            ? failText[body.status]
            : failText.default;
        }
        this.statusName = failText;
        this.failUI();
        Message.warning({
          message: body.reason || this.$t("main.requestFail"),
          type: "warning",
          duration: 1000,
        });
      } else {
        this.statusName = _status.name;
      }
    },
    setUIvalues(_status, body = {}, wsOptions) {
      this.phoneNum = wsOptions.called || "";
      const { UIshow, themeColor, isUnlock } = _status;
      // 状态为0，成功；兼容处理不返回status默认是0
      if (!body.hasOwnProperty("status")) {
        body.status = 0;
      }
      if (body.status != 0) {
        return;
      }
      // 显示隐藏
      if (UIshow && UIshow !== "cache") {
        const arr = [
          "phoneNum_show", // 电话号码
          "call_show", // 拨打
          "actionBar_show",
          "hangup_show", // 挂断
          // 'unQuiet_show',
          // 'unHold_show'
          // 'quiet_show',
          // 'hold_show'
        ];
        arr.forEach((item) => {
          if (UIshow.indexOf(item) > -1) {
            this[item] = true;
          } else {
            this[item] = false;
          }
        });
      } else if (UIshow && UIshow === "cache") {
        // 需要缓存
        const type = _status.id;
        const cacheParams = [
          "unQuiet_show",
          "unHold_show",
          "quiet_show",
          "hold_show", // 特殊处理
        ];
        const exchange = {
          unQuiet_show: "quiet_show",
          quiet_show: "unQuiet_show",
          unHold_show: "hold_show",
          hold_show: "unHold_show",
        };
        this.holdBox_show = true;
        this.hangup_show = true;
        switch (type) {
          case "ring":
            if (body.dir === 1) {
              // 呼入
              this.call_show = false;
            } else {
              // 呼出
              this.call_show = true;
              this.answer_show = true;
            }
            break;
          case "hold":
            this.hangup_show = false;
            this.hold_show = false;
            this.unHold_show = true;
            this.holdBox_show = false;
            break;
          case "playNo":
            this.hangup_show = false;
            this.call_show = false;
            break;
          default:
            this[type + "_show"] = false;
            this[exchange[type + "_show"]] = true;
            break;
        }
      }
      // 解锁状态
      if (isUnlock) {
        this.isDisabledStatus = false;
      } else {
        this.isDisabledStatus = true;
      }
      // 主题色
      if (themeColor) {
        this.themeColor = themeColor;
      } else {
        this.themeColor = "";
      }
    },
    // 时钟
    startTime() {
      this.UItime = 0;
      this.time = secondsToHours(this.UItime);
      this.UItime_obj && clearInterval(this.UItime_obj);
      this.UItime_obj = setInterval(() => {
        this.UItime++;
        this.time = secondsToHours(this.UItime);
      }, 1000);
    },
    endTime() {
      this.UItime_obj && clearInterval(this.UItime_obj);
      this.UItime = 0;
      this.time = secondsToHours(this.UItime);
    },
    resetUI() {
      this.quiet_show = true;
      this.unQuiet_show = false;
      this.hold_show = true;
      this.unHold_show = false;
      this.isStatusPopoverShow = false;
    },
    failUI() {
      this.themeColor = "#FF3C34";
      this.call_show = false;
    },
    answer() {
      this.wsInstance.cccDesk_CallCenter.AcceptCall();
    },
    getName(item) {
      let name = item ? item.firstName + " " + item.lastName : "";
      if (!name) {
        name = "Unknow";
      }
      return name;
    },
    getIsCalling() {
      const wsType = this.wsType;
      const arr = ["locked", "startCall", "ring", "answer", "bridge"];
      return arr.indexOf(wsType) > -1;
    },
    emitData() {
      this.isCalling = this.getIsCalling();
      this.$emit("emitData", {
        isCalling: this.getIsCalling(),
        isLogin: this.isLogin,
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "@/styles/element-variables.scss";
.keypad {
  position: unset;
}
.ccc-sdk-main {
  font-weight: bold;
  display: flex;
  align-items: center;
  font-size: 12px;
  // background: rgba(84, 109, 254, 0.1);
  padding: 4px;
  border-radius: 6px;
  height: 32px;
  box-sizing: content-box;
      overflow: hidden;
}
.right-box-w {
  transform: translateX(-110%);
  transition: transform 0.5s;
  transform-origin: top center;
  display: flex;
  background: rgba(84, 109, 254, 0.1);
    padding: 4px;
    align-items: center;
    border-radius: 0 8px 8px 0;
}
.rightActive {
  transform: translateX(0);
  transition: transform 0.2s;
  transform-origin: top center;
}
.ccc-sdk-select {
  width: 78px;
}
.ccc-sdk-select .el-input__inner {
  padding-left: 8px;
}
.iconfont {
  cursor: pointer;
  // margin: 0 5px;
}
.telbtns {
  height: 36px;
  display: flex;
  align-items: center;
}
.telbtns button {
  margin-left: 0;
  border: none;
  padding: 7px 10px;
}
.ccc-sdk-main .status-bar {
  color: #606266;
  /* backg-color: #00b972; */
  /* max-width: 400px; */
  /* padding: 0 20px; */
  border-radius: 4px;
  /* margin-right: 10px; */
}
.status-ul li {
  cursor: pointer;
  padding: 4px 10px;
  /* margin-bottom: 6px; */
}
.status-ul li:hover {
  cursor: pointer;
  background-color: #f5f7fa;
}
.status-ul li.hover {
  /* background-color: #f5f7fa; */
  color: #409eff;
}
.status-ul {
  padding: 6px 0;
}
.trig-box {
  display: flex;
  align-items: center;
  cursor: pointer;
}
.trig {
  margin-left: 6px;
  width: 0;
  height: 0;
  border-top: 4px solid #cecece;
  border-right: 4px solid transparent;
  border-left: 4px solid transparent;
  content: "";
}
.time {
  margin-left: 10px;
  width: 60px;
}
.status-select {
  width: 82px;
  height: 22px;
  outline: none;
  border: none;
  margin: 0 10px;
}
.status {
  margin-left: 10px;
}
.btn {
  display: block;
  cursor: pointer;
  width: 30px;
  /* height: 34px;
  width: 33px; */
}
.btn img {
  width: 100%;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
a {
  color: #42b983;
}
.circle {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  display: inline-block;
  margin-right: 5px;
}
.contacts-item {
      padding: 10px 12px;
    height: 56px;
}
.contacts-item .avatar{
  width: 36px;
height: 36px;
// background: #ECEEF8;
// border-radius: 6px;
// background-image: url('~@/assets/img/AvatarContact.png');
}
.contacts-item .name{
  font-size: 14px;
font-family: Helvetica-Bold, Helvetica;
font-weight: bold;
color: #333333;
}
.contacts-item .phone{
     font-size: 12px;
font-family: DINAlternate-Bold, DINAlternate;
font-weight: bold;
color: #AAAAAA;
}
.sdk-swing {
  animation: swing 2s ease-in-out infinite alternate;
}
.sdk-swing:hover {
  animation-play-state: paused;
}
@keyframes swing {
  20% {
    -webkit-transform: rotate3d(0, 0, 1, 15deg);
    transform: rotate3d(0, 0, 1, 15deg);
  }

  40% {
    -webkit-transform: rotate3d(0, 0, 1, -10deg);
    transform: rotate3d(0, 0, 1, -10deg);
  }

  60% {
    -webkit-transform: rotate3d(0, 0, 1, 5deg);
    transform: rotate3d(0, 0, 1, 5deg);
  }

  80% {
    -webkit-transform: rotate3d(0, 0, 1, -5deg);
    transform: rotate3d(0, 0, 1, -5deg);
  }

  to {
    -webkit-transform: rotate3d(0, 0, 1, 0deg);
    transform: rotate3d(0, 0, 1, 0deg);
  }
}
@keyframes shakeX {
  from,
  to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }

  10%,
  30%,
  50%,
  70%,
  90% {
    -webkit-transform: translate3d(-10px, 0, 0);
    transform: translate3d(-10px, 0, 0);
  }

  20%,
  40%,
  60%,
  80% {
    -webkit-transform: translate3d(10px, 0, 0);
    transform: translate3d(10px, 0, 0);
  }
}

.section_1 {
  background-color: rgba(15, 190, 43, 1);
  border-radius: 6px;
  /* width: 258px; */
  height: 32px;
  margin: 0 0 0 12px;
}
.thumbnail_123 {
  width: 16px;
  height: 14px;
  margin: 9px 0 0 9px;
}
.text_1 {
  overflow-wrap: break-word;
  color: rgba(255, 255, 255, 1);
  font-size: 14px;
  font-family: PingFangSC-Semibold;
  font-weight: 600;
  text-align: left;
  white-space: nowrap;
  line-height: 20px;
  margin: 6px 0 0 5px;
}
.thumbnail_124 {
  width: 9px;
  height: 6px;
  margin: 13px 0 0 5px;
}
.text_2 {
  width: 54px;
  height: 19px;
  overflow-wrap: break-word;
  color: rgba(255, 255, 255, 1);
  font-size: 16px;
  font-family: DINAlternate-Bold;
  font-weight: 700;
  text-align: left;
  white-space: nowrap;
  line-height: 19px;
  margin: 7px 7px 0 6px;
}
.login-Change {
  width: 32px;
  height: 32px;
  color: #fff;
  background-color: $--color-primary;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.iconfont-nb {
  align-items: center;
  display: flex;
  font-size: 14px;
  color: #fff;
}
.iconfont-wb {
  font-size: 20px;
  color: $--color-primary;
}
.disabled-cc{
  position: absolute; z-index: 10000;  width: 100%; height: 100%;top:0;
}
.icon-item{
    padding: 5px 6px;
    border-radius: 5px;
    margin: 0 4px;
}
.icon-item-hangup{
  margin-left: 8px;
    background: rgba(249, 84, 84, 1);
    border-radius: 8px;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}
.icon-item:hover{
  background: #d9defb;
}
.title-txt{
  font-size: 14px;
font-family: Helvetica-Bold, Helvetica;
font-weight: bold;
color: #333333;
}
.el-icon-close{
  color: #081C33;
    font-weight: 600;
}
.phone-icon{
  width: 32px;
height: 32px;
background: #F1F1F6;
border-radius: 4px;
line-height: 32px;
    text-align: center;
    color: #0fbe2b;
}
.icon-shanchu{
  color:#F22929;
}
</style>
