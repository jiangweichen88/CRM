<template>
  <div
    class="chatbox-crm padb10"
    style="    position: relative;
    height: 100%;"
  >
    <div class="dis-f h100">
      <div class="left-box" style="width: 300px;">
        <div class="dis-f box1">
          <div
            style="width: 10px;
height: 10px;margin-right: 5px;
background: #0FBE2B;border-radius: 50%;"
          ></div>
          <span style="   margin-right: 5px;">I am available</span>
          <el-switch v-model="form.isAvailable"> </el-switch>
          <span class="limit-lb">Chat limit</span>
          <el-select size="mini" style="width: 60px" v-model="form.limt">
            <el-option v-for="item in formData.limtData" :key="item.key" :label="item.label" :value="item.key" />
          </el-select>
        </div>
        <div class="tab-box">
          <div @click="tabChange(item)" :class="{ hover: activeTabItem.key == item.key }" class="item" v-for="item in formData.tabData" :key="item.key">{{ item.label }}</div>
        </div>
        <div class="form-box pad10">
          <div class="dis-f marb10">
            <el-select size="mini" v-model="form.min">
              <el-option v-for="item in formData.minData" :key="item.key" :label="item.label" :value="item.key" />
            </el-select>
            <div style="margin: 0 5px;"></div>
            <el-select size="mini" v-model="form.order">
              <el-option v-for="item in formData.orderData" :key="item.key" :label="item.label" :value="item.key" />
            </el-select>
          </div>
          <el-input size="small" v-model="formData.searchText" :placeholder="$t('Livechat.searchText')">
            <i class="iconfont icon-sousuo pointer" slot="prefix" @click="search"></i>
          </el-input>
        </div>
        <div class="Conversation-list">
          <Checkbox v-model="checkedConversation" :options="Conversation" value="key" label="label">
            <template slot="all">
              <p class="dis-f">
                <span
                  class="flex1"
                  style="font-size: 16px;
font-family: PingFangSC-Semibold, PingFang SC;
font-weight: 600;
color: #111111;
line-height: 22px;"
                  >Conversation ({{ Conversation.length || 0 }}）</span
                >
                <i @click.prevent="refresh()" style="font-size: 16px;color: #3F51B5;" class="el-icon-refresh"></i>
              </p>
            </template>
            <div class="dis-f Conversation-item" :class="{ hover: activeItem.key == item.key }" v-for="(item, index) in Conversation" :key="item.key">
              <el-checkbox :label="item.key">
                <div class="dis-f flex1" @click.prevent="itemClick(item)">
                  <!-- :hidden="" -->
                  <el-badge :hidden="!item.newMsgNum" :value="item.newMsgNum" class="item">
                    <Avatar :style="{'background':item.color}" class="Avatar" :hasLetter="true" :name="item.customer.username === 'Unknown' ? '' : item.customer.username"> </Avatar>
                  </el-badge>
                  <div class="flex1">
                    <div class="dis-f">
                      <span style="    width: 0;" class="name flex1 ellipsis">{{ item.customer.username }}</span>
                      <span class="tx-r time" style="">{{ item.lastMessage.updateDate | formatTime }}</span>
                    </div>
                    <div class="history ellipsis" style="">
                      {{ item.lastMessage.content }}
                    </div>
                    <div class="dis-f a-center">
                      <i class="iconfont icon-qudaodiannao"></i>
                      <span class="channel" style="">{{ item.session.channel }}</span>
                    </div>
                  </div>
                </div>
              </el-checkbox>
            </div>
          </Checkbox>
        </div>
      </div>
      <!-- 中间 -->
      <div class="mid-box flex1 flex-col" style="box-shadow: 2px 0px 4px 0px rgba(0,0,0,0.04);">
        <div class="dis-f a-center" style="height: 44px;    padding: 10px">
          <div class="flex1">
            <i style="    color: #0f5ed4;" class="iconfont icon-qudaodiannao"></i>
            <span
              style="font-size: 14px;
    font-family: Helvetica-Bold, Helvetica;
    font-weight: bold;
    color: #333333;
    margin-left: 5px;"
              >{{activeItem| get_('customer.username') }}</span
            >
          </div>
          <i style="color: #8893A2; margin-right: 18px;font-size: 18px;" class="iconfont icon-fanyikehu"></i>
          <ConfirmPopup @onConfirm="onConfirmClose">
            <i style="color: #F22929;font-size: 18px;" class="iconfont icon-guanbiliaotian pointer"></i>
          </ConfirmPopup>
        </div>
        <!-- 会话详情 -->
        <div class="message message-box flex1 pad10 " style="background: #F5F5F9;height: 0;">
          <Messages @scroll.native="handleScroll" class="h100 ovf-y-a" ref="scrollDiv" :activeItem="activeItem"></Messages>
        </div>
        <!-- 发送消息 -->
        <SendMsg @send="send"> </SendMsg>
      </div>
      <div class="right-box" style="width: 300px;">
        <div class="tab-box tab-box2">
          <div @click="tabChange2(item)" :class="{ hover: activeTabItem2.key == item.key }" class="item" v-for="item in tabData2" :key="item.key">
            <p class="p" v-html="item.label"></p>
          </div>
        </div>
        <div class="flex-col" style="padding: 12px;">
          <div class="flex-col a-center j-center">
            <Avatar
              style="width: 64px;
height: 64px;"
              :style="{'background':activeItem.color}"
              class="Avatar marb10"
              :hasLetter="true"
              :name="activeItem| get_('customer.username') === 'Unknown' ? '' : activeItem| get_('customer.username')"
            >
            </Avatar>
            <h3
              style="font-size: 16px;
font-family: Helvetica-Bold, Helvetica;
font-weight: bold;
color: #111111;
line-height: 19px;"
            >
              Unknow Visitor
            </h3>
            <div
              class="marb10"
              style="font-size: 12px;
font-family: Helvetica-BoldOblique, Helvetica;
font-weight: normal;
color: #5F6A80;
line-height: 14px"
            >
              Upside 04/29/2023
            </div>
            <div class="dis-f marb10">
              <p class="ellipsis">
                <img class="img" src="@/assets/img/type.png" alt="" /> Type：<span :title="userData.customerTypeName">{{ userData.customerTypeName }}</span>
              </p>
              <p class="ellipsis">
                <img class="img" src="@/assets/img/owner.png" alt="" /> Owner：<span :title="userData.ownerName">{{ userData.ownerName }}</span>
              </p>
            </div>
          </div>
          <div class="form-list">
            <div v-if="formConf">
              <parser :key="formKey" :form-conf="formConf" @getFormData="getFormData" @reset="resetForm" @submit="sumbitForm" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--【整个聊天界面层（成功登录后显示）】-->
    <div id="chatbox" class="h100 ovf-h">
      <!--【头部提示信息区】-->
      <div id="chatbox_header">
        <div id="chatbox_headerwrapper">
          <!-- <span class="chatbox_header_pname">MobileIMSDK-H5</span> -->
          <!-- <span class="chatbox_header_pversion">v6.4</span> -->
          <span id="chatbox_header_userinfo" class="net_warn">
            <span id="netstatusicon" class=""></span>登陆名：{{ username }}
            <!-- |<a id="logoutButton" href="javascript:;" style="color:#fff;d">退出</a>-->
          </span>
        </div>
      </div>

      <!--【聊天消息区】-->
      <div class="chat chat-box">
        <!--【消息列表区】-->
        <div id="message" class="message message-box">
          <!-- <section class="system"><div class="msg-system">当前通信层，基于标准HTML5的WebSocket</div></section> -->
          <template v-for="(p, index) in messages">
            <section v-if="p.fp" :class="[getIsme(p) ? 'user' : 'service']">
              <i v-if="p.isLost" class="weui-icon-warn weui-icon_msg"></i>
              <i v-if="getIsme(p) && !p.isReceived" class="weui-loading"></i>
              <i v-else-if="getIsme(p) && p.isReceived" class="weui-icon-success weui-icon_msg"></i>
              <div>{{ p.dataContent }}</div>
              <span>{{ p.from }}</span>
            </section>
            <div v-else v-html="p"></div>
          </template>
          <!-- TODO: 聊天消息将自动显示在本区域 -->
        </div>

        <!--【底部输入区】-->
        <div class="input-box" style="height:auto;">
          <div class="input">
            <input type="text" v-model="receiver" placeholder="消息接收者登陆名" id="receiver" style="width:15%;margin-right:8px;" />
            <input type="text" v-model="content" placeholder="请输入聊天内容，按 Enter 键提交" id="content" name="content" />
          </div>
          <div class="action">
            <button type="button" @click="sendMessageButton">发送</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import {
  getImAgens,
  getImAccountsAgent,
  setImOnline,
  getMySessions,
  getSessionsDetails,
  putReceived,
  sendMessagesAgent,
  closeSession
} from "@/api/im";
import { get } from "lodash-es";
import Checkbox from "@/components/common/Checkbox";
import Avatar from "@/components/common/Avatar";
import focus from "@/directive/focus";
import Parser from "@/components/common/Parser";
import Messages from "./Messages";
import SendMsg from "./SendMsg";

import ConfirmPopup from "@/components/common/ConfirmPopup";
import formMixin from "@/mixins/form";
import imMixin from "@/mixins/im";
import { randomInt } from '@/utils'

import { getAutoField, getDictionary, getCallLogList } from "@/api/commonApi";
const colors = ['#FF9300', '#49CD88', '#47C8C3', '#4787FF']
const dayjs = require('dayjs')
export default {
  name: "",
  mixins: [formMixin,imMixin],
  components: { Checkbox, Avatar, Parser, ConfirmPopup,Messages,SendMsg },
  directives: {
    focus,
  },
  props: {},
  data() {
    return {
      username: "",
      password: "",
      receiver: "",
      content: "",
      messages: [],
      rolesInfo: {},
      isVisitor:false,
      formFieldsSortArr: [
        "firstName",
        "lastName",
        "gender",
        "company",
        "primaryPhone",
        "altemate1",
        "channel",
        "email",
        "createTime",
        "customerType",
        "address",
        "country",
        "state",
        "city",
        "zipCode",
        "owner",
      ],
      form: {
        isAvailable: true,
        limt: "10",
        min: "0",
        order: "accessTime",
      },
      formData: {
        limtData: [],
        tabData: [
          {
            key: "1",
            label: "Me",
          },
          {
            key: "2",
            label: "Queuing",
          },
          {
            key: "3",
            label: "Closed",
          },
          {
            key: "4",
            label: "All",
          },
        ],
        minData: [
          {
            key: "0",
            label: "all",
          },
          {
            key: "5",
            label: "In 5 mins",
          },
          {
            key: "10",
            label: "In 10 mins",
          },
          {
            key: "15",
            label: "In 15 mins",
          },
          {
            key: "30",
            label: "In 30 mins",
          },
        ],
        orderData: [
          {
            key: "accessTime",
            label: "Access order",
          },
          {
            key: "customerLastMsg",
            label: "Latest msg",
          },
          {
            key: "customerWaitingTime",
            label: "Waiting time",
          },
        ],
      },
      activeTabItem: {},
      activeTabItem2: {},
      tabData2: [
        {
          key: "1",
          label: "Contacts<br/>info",
        },
        {
          key: "2",
          label: "Comm<br/>data",
        },
        {
          key: "3",
          label: "Operational<br/>info",
        },
      ],
      checkAll: false,
      checkedConversation: [],
      Conversation: [],
      activeItem: {},
      isIndeterminate: true,
      isEmojiPopoverShow: false,
      startPos: 0,
      isSendDisabled: false,
      userData: {
        customerTypeName: "--",
        ownerName: "--",
        name: "Duan",
      },
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  watch: {
    userInfo: {
      handler: function (val, oldVal) {
        if (val.username) {
          this.rolesInfo = JSON.parse(localStorage.getItem("rolesInfo"));
          // getImAgens({
          //   tenantId: this.rolesInfo.relTenantIds,
          //   username: this.userInfo.username,
          //   password: this.userInfo.password,
          // }).then((res) => {
          //   console.log(res);
          // })
          getImAccountsAgent({
            tenantId: this.rolesInfo.relTenantIds,
            username: this.userInfo.username,
            md5Password: this.userInfo.password,
          })
            .then((res) => {
              console.log(res);
              const data = res.data;
             this.IM_SERVER_URL = data.wsUrl;
              // this.IM_SERVER_URL=IM_SERVER_URL;
              this.$store.dispatch("user/setImToken", data.token);
              this.username = data.imAccount.username;
              this.password = data.token;

              this.refresh();
            })
        }
        console.log(val, oldVal);
      },
      deep: true,
      immediate: true,
    },
  },
  created() {
    this.initData();
    this.formData.limtData = new Array(10).fill(0).map((item, index) => {
      return {
        key: index + 1,
        label: index + 1,
      };
    });
    // colors
    // this.Conversation = new Array(3).fill(0).map((item, index) => {
    //   return {
    //     key: index + 1,
    //     time: new Date().getTime(),
    //     label: `name${index + 1}`,
    //     color: colors[randomInt(0, 3)],
    //   };
    // });
    this.activeTabItem = this.formData.tabData[0];
    this.activeTabItem2 = this.tabData2[0];
  },
  mounted() {},
  methods: {
    getTimeMin(num) {
// 设定现在的时间
let now = dayjs();
// 设定要回溯的分钟数
let minutesBack = num;
// 回溯到指定时间
let timestamp = now.subtract(minutesBack, 'minute').unix();

console.log(timestamp);
return timestamp
    },
    closeSession() {
      closeSession(this.activeItem.session.id).then((res) => {
        console.log(res, "closeSession");
        this.Conversation = this.Conversation.filter((v) => v.key !== this.activeItem.key);
        this.activeItem = {};
      });
    },
    onConfirmClose(e) {
      console.log(e, "onConfirmClose");
      this.closeSession()
    },
    sumbitForm(data) {
      console.log("sumbitForm提交数据：", data);
    },
    initData() {
      getAutoField("10000004").then((json) => {
        this.buildFormConf({ readonly: false }, json.data);
        this.$nextTick(() => {
          // 回填数据
          const data = {
            firstName: "1",
            lastName: "2",
            gender: "0",
            company: "3",
            primaryPhone: "4",
            altemate1: "5",
            channel: "2",
            email: "5@qq.com",
            createTime: 1690300800000,
            customerType: "3",
            address:
              "Verint Systems Inc. 175 Broadhollow Rd, Ste 100 Melville, NY11747",
            country: "134",
            state: "913400060000000000",
            city: "913400060006000000",
            zipCode: "234",
            owner: "1668529936249663490",
          };
          this.fillFormData({ data: data, isFirst: true });
        });
      });
    },
    send(content) {
      this.content=content;
      this.doSend();
    },
    tabChange(e) {
      this.activeTabItem = e;
    },
    tabChange2(e) {
      this.activeTabItem2 = e;
    },

    itemClick(e) {
      console.log(e);
      //会话详情
      getSessionsDetails(e.session.id).then((res) => {
        console.log(res, "getSessionsDetails");
        e.messages = res.data.messages;
        this.activeItem = e;
         this.scrollToBottom()
      });
    },
    search() {
      console.log(this.checkedConversation, this.form, "search");
    },
    refresh() {
      // form.order  form.min
              let ps = {
                createDate:this.getTimeMin(this.form.min),
                sort: this.form.order ,
                pageNo: 1,
                pageSize: 25,
              };
              //会话列表
            getMySessions(ps).then((res) => {
              console.log(res, "getMySessions");
              const data = res.data;
              this.Conversation = data.records.map((v) => ({
                ...v,
                agent: {
                  username:this.userInfo.username
                },
                color: colors[randomInt(0, 3)],
                messages: [],
              }));
              if (data.records && data.records.length) {
                // this.activeItem = this.Conversation[0];
                this.itemClick(this.Conversation[0])
              }
              this.init();
              this.setImOnline();
            });
    },
    setImOnline() {
      setImOnline().then((res) => {
        console.log(res);
      });
    },
  },
  destroyed() {},
};
</script>
<style lang="scss" scoped>
/* @import url("./weui/weui.css");
@import url("./index.css"); */
.chatbox-crm {
  /* background: #f0f2f6; */
}

.chat-box {
  height: 100%;
  box-sizing: border-box;
  padding-bottom: 60px;
}

.message-box {
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
}

.Avatar {
  width: 36px;
  height: 36px;
  margin-right: 12px;
}

.left-box {
  box-shadow: 2px 0px 4px 0px rgba(0, 0, 0, 0.04);
}

.box1 {
  font-size: 14px;
  font-family: Helvetica-Bold, Helvetica;
  font-weight: bold;
  color: #333333;
  align-items: center;
  padding: 8px 10px;

  .limit-lb {
    font-size: 12px;
    flex: 1;
    text-align: right;
    margin-right: 5px;
  }
}

.tab-box {
  background: #f0f1f5;
  padding: 3px 5px;
  overflow: hidden;

  .item {
    float: left;
    width: 25%;
    text-align: center;
    line-height: 26px;
    background: #f0f1f5;
    font-size: 12px;
    font-family: Helvetica;
    color: #5f6a80;
    cursor: pointer;
  }

  .item:hover,
  .item.hover {
    background: #ffffff;
    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    font-family: Helvetica-Bold, Helvetica;
    font-weight: bold;
    color: #3f51b5;
  }
}

.tab-box2 {
  .item {
    width: 33.33%;
    height: 38px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .p {
    line-height: 14px;
  }
}

.form-box {
  .icon-sousuo {
    line-height: 32px;
  }
}

::v-deep .Conversation-list {
  .el-checkbox {
    width: 100%;
    display: flex;
  }

  .el-checkbox__label {
    flex: 1;
  }

  .check-all {
    align-items: center;
    padding: 0 10px;

    .el-checkbox__input {
      height: 14px;
    }
  }

  .Conversation-item {
    padding: 16px 10px;

    .name {
      font-size: 13px;
      font-family: Helvetica;
      color: #111111;
      line-height: 16px;
    }

    .time {
      font-size: 12px;
      font-family: DINAlternate-Bold, DINAlternate;
      font-weight: bold;
      color: #aaaaaa;
      line-height: 14px;
    }

    .history {
      font-size: 14px;
      font-family: Helvetica-Bold, Helvetica;
      font-weight: bold;
      color: #111111;
      line-height: 17px;
    }

    .channel {
      font-size: 12px;
      font-family: Helvetica;
      color: #999999;
      line-height: 14px;
    }

    .icon-qudaodiannao {
      color: #0f5ed4;
      margin-right: 5px;
    }
  }

  .Conversation-item:hover,
  .Conversation-item.hover {
    background: #f5f5f5;
  }

  .el-checkbox-group {
    .el-checkbox {
      /* background: #F5F5F5;
    padding: 16px 0; */
    }
  }
}





::v-deep.form-list {
  .el-input.is-disabled {
    .el-input__suffix {
      display: none;
    }
  }

  .el-form-item {
    margin-bottom: 0;
  }

  .el-input__inner {
    font-size: 14px;
    font-family: Helvetica;
    color: #111111;
    background: none;
    border: none;
  }

  .el-form-item__label {
    font-size: 14px;
    font-family: Helvetica;
    color: #999999;
  }

  textarea {
    // height: 100px !important;
    font-size: 14px;
    font-family: Helvetica;
    color: #111111;
    border: none;
    resize: none;
  }
}
</style>
