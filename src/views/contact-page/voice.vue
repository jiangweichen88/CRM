<template>
  <div
    class=""
    style="    height: 100%;
    box-sizing: border-box;"
  >
    <el-row class="add-page dis-f" style="">
      <el-col
        class="left-box"
        style="       
    padding-right: 5px;
    height: 100%;
    overflow: hidden;
    box-sizing: border-box;
    display: flex;
        width: 300px;
        min-width:300px;
            padding: 10px 0;
    box-shadow: 2px 0px 4px 0px rgba(0,0,0,0.04);
    flex-direction: column;"
      >
        <el-row class="padlr16">
          <el-col :span="24">
            <el-row :gutter="10">
              <el-col :span="12">
                <el-select v-model="searchGroup.chooseTime" clearable placeholder="Please select">
                  <el-option v-for="item in searchGroup.chooseTimeArr" :key="item.key" :label="item.label" :value="item.key" />
                </el-select>
              </el-col>
              <el-col :span="12">
                <el-select v-model="searchGroup.callDirection" clearable placeholder="Please select">
                  <el-option v-for="item in searchGroup.callDirectionArr" :key="item.key" :label="item.label" :value="item.key" />
                </el-select>
              </el-col>
            </el-row>
            <el-input v-model="searchGroup.searchDetail" :placeholder="$t('voice.searchText')" class="input-with-select">
              <el-button slot="append" icon="el-icon-search" @click="getCallLog('reset')" />
            </el-input>
          </el-col>
        </el-row>
        <el-row
          class=""
          style="flex: 1;
    height: 0;
    margin-bottom: 0;
    overflow-y: auto;"
        >
          <div
            class="padlr16"
            style="font-size: 16px;
font-family: PingFangSC-Semibold, PingFang SC;    margin-bottom: 10px;
font-weight: 600;
color: #081C33;
line-height: 22px"
          >
            {{ $t('voice.All') }}({{showListArr.length}})
          </div>
          <div class="callLogList">
            <el-col v-for="(item,index) in showListArr" :key="item.beginTime+index">
              <div v-if="item.isCurrent" class="dis-f callLog-item list-item hover" @click="touchItem(item)">
                <div class="list-icon">
                  <div class="list-icon-bg">
                    <i style="font-size: 10px;" class="iconfont" :class="{'icon-huchu':item.callDirection=== 1,'icon-huru':item.callDirection!= 1}"></i>
                  </div>
                  <Avatar :hasLetter="true" :name="item.customerNm==='Unknown'?'':item.customerNm" />
                </div>
                <div class="custome-box ellipsis" v-if="callInData">
                  <div class="dis-f">
                    <div class="ellipsis customerNm">{{ callInData.customerNm }}</div>
                    <div class="time">{{ item.beginTime | formatTime('DD/MM/YYYY') }}</div>
                  </div>
                  <div class="ellipsis phoneNm" :class="{'phoneNm-miss':item.callFlag!= 0}">{{ item.phoneNm }}</div>
                </div>
              </div>
              <div v-else class="dis-f callLog-item list-item" :class="{hover:item.hover}" @click="touchItem(item)">
                <div class="list-icon">
                  <div class="list-icon-bg">
                    <i style="font-size: 10px;" class="iconfont" :class="{'icon-huchu':item.callDirection=== 1,'icon-huru':item.callDirection!= 1}"></i>
                  </div>
                  <Avatar :hasLetter="true" :name="item.customerNm==='Unknown'?'':item.customerNm" />
                </div>
                <div class="custome-box ellipsis">
                  <div class="dis-f">
                    <div class="ellipsis customerNm">{{ item.customerNm }}</div>
                    <div class="time">{{ item.beginTime | formatTime('DD/MM/YYYY') }}</div>
                  </div>
                  <div class="ellipsis phoneNm" :class="{'phoneNm-miss':item.callFlag!= 0}">{{ item.phoneNm }}</div>
                </div>
              </div>
            </el-col>
          </div>

          <!-- <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getMyTicketList" /> -->
        </el-row>
        <el-pagination
          style="position: relative;
    top: 10px;"
          @current-change="currentChange"
          v-if="CallLogsData.total"
          :current-page="listQuery.page"
          :pager-count="5"
          :page-size="listQuery.limit"
          small
          layout="prev, pager, next"
          :total="CallLogsData.total"
        >
        </el-pagination>
      </el-col>
      <el-col
        class="detail-left mid-box flex1"
        style="height: 100%;
        min-width: 610px;
            background: #F5F5F9;
            padding: 12px;
    box-sizing: border-box;"
      >
        <el-row class="box-shadow4" style="overflow: hidden;">
          <!-- 头像上传 -->
          <div class="pad16">
            <AvatarUpload
              @handleCreate="handleCreate"
              @updateField="updateField"
              :userInfo="userInfo"
              :imageUrl="imageUrl"
              :fileList="fileList"
              :isEditDisabled="isEditDisabled"
              :isEditBtnDisabled="isNewCustomer||!customerId||userInfo.owner!==rolesInfo.id"
              :isAddBtnDisabled="!isNewCustomer"
            />
          </div>
          <!-- <div class="top-header">
            <div class="header-detail">
              <el-upload
                :disabled="isEditDisabled"
                :file-list="fileList"
                :on-remove="handleAvatarRemove"
                :on-change="handleAvatarChange"
                class="avatar-uploader"
                :action="urlImpot"
                :show-file-list="true"
                :limit="1"
                :on-success="handleAvatarSuccess"
                :headers="{
                    'X-Access-Token': $store.getters.token,
                  }"
              >
                <img v-if="imageUrl" :src="imageUrl" class="avatar-big" />
                <i v-else class="el-icon-plus avatar-uploader-icon" />
              </el-upload>
              <h3>{{ userInfo.firstName }}{{ userInfo.lastName }}</h3>
              <p class="ellipsis">
                Type：<span :title="userInfo.customerTypeName">{{ userInfo.customerTypeName }}</span>
              </p>
              <p class="ellipsis">
                Owner：<span :title="userInfo.ownerName">{{userInfo.ownerName}}</span>
              </p>
              <el-row class="header-btn-group">
                <el-tooltip class="item" effect="dark" placement="top">
                  <div slot="content">{{ $t('voice.Comingsoon') }}</div>
                  <el-button class="header-btn"><i class="el-icon-message" /></el-button>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" placement="top">
                  <div slot="content">{{ $t('voice.Comingsoon') }}</div>
                  <el-button class="header-btn"><i class="el-icon-document" /></el-button>
                </el-tooltip>
                <el-button class="header-btn" :disabled="isNewCustomer||!customerId||userInfo.owner!==rolesInfo.id" @click="editFunc"><i class="el-icon-edit" /></el-button>
                <el-button class="header-btn" :disabled="!isNewCustomer" @click="handleCreate">
                  <i class="el-icon-s-custom" />
                </el-button>
              </el-row>
            </div>
          </div> -->
          <!-- Overview -->
          <!-- 步骤条 -->
          <div style="    margin-top: 22px;">
            <Steps :stepsArr="stepsArr" :stepsNum="stepsNum" />
          </div>
        </el-row>
        <!-- 表单 -->
        <el-row class="user-content-detail box-shadow4" style="height: auto;">
          <el-col :span="24">
            <el-row :gutter="10">
              <el-col :span="12">
                <el-row>
                  <el-col :span="12">
                    <span class="user-content-text">{{ $t('voice.Firstname') }}</span>
                  </el-col>
                  <el-col :span="12">
                    <el-input :disabled="isEditDisabled" v-model="userInfo.firstName" />
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12">
                <el-row>
                  <el-col :span="12">
                    <span class="user-content-text">{{ $t('voice.Lastname') }}</span>
                  </el-col>
                  <el-col :span="12">
                    <el-input :disabled="isEditDisabled" v-model="userInfo.lastName" />
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="12">
                <el-row>
                  <el-col :span="12">
                    <span class="user-content-text">{{ $t('voice.Gender') }}<span class="required">*</span></span>
                  </el-col>
                  <el-col :span="12">
                    <el-select :disabled="isEditDisabled" v-model="userInfo.gender" style="width:100%;" :placeholder="$t('voice.PleaseSelect')">
                      <el-option v-for="item in userInfoListGrop.genderArr" :key="item.key" :label="item.value" :value="item.key" />
                    </el-select>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12">
                <el-row>
                  <el-col :span="12">
                    <span class="user-content-text">{{ $t('voice.Company') }}</span>
                  </el-col>
                  <el-col :span="12">
                    <el-input :disabled="isEditDisabled" v-model="userInfo.company" />
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="12">
                <el-row>
                  <el-col :span="12">
                    <span class="user-content-text">{{ $t('voice.Primaryphone') }}<span class="required">*</span></span>
                  </el-col>
                  <el-col :span="12">
                    <el-input @input="numberInput('primaryPhone')" :disabled="isEditDisabled" v-model="userInfo.primaryPhone" />
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12">
                <el-row>
                  <el-col :span="12">
                    <span class="user-content-text">{{ $t('voice.Altemate1') }}</span>
                  </el-col>
                  <el-col :span="12">
                    <el-input :disabled="isEditDisabled" v-model="userInfo.altemate1" />
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="12">
                <el-row>
                  <el-col :span="12">
                    <span class="user-content-text">{{ $t('voice.Channel') }}</span>
                  </el-col>
                  <el-col :span="12">
                    <el-select :disabled="isEditDisabled" v-model="userInfo.channel" style="width:100%;" :placeholder="$t('voice.PleaseSelect')">
                      <el-option v-for="item in userInfoListGrop.channelArr" :key="item.key" :label="item.value" :value="item.key" />
                    </el-select>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12">
                <el-row>
                  <el-col :span="12">
                    <span class="user-content-text">{{ $t('voice.Email') }}</span>
                  </el-col>
                  <el-col :span="12">
                    <el-input :disabled="isEditDisabled" v-model="userInfo.email" />
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="12">
                <el-row>
                  <el-col :span="12">
                    <span class="user-content-text">{{ $t('voice.Greatetime') }}<span class="required">*</span></span>
                  </el-col>
                  <el-col :span="12">
                    <!-- <el-date-picker :disabled="isEditDisabled" v-model="userInfo.greateTime" style="width:100%;" type="month" placeholder="选择月" /> -->
                    <el-date-picker :disabled="true" v-model="userInfo.createTime" style="width:100%;" type="datetime" placeholder="" value-format="timestamp" />
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12">
                <el-row>
                  <el-col :span="12">
                    <span class="user-content-text">{{ $t('voice.Customertype') }}<span class="required">*</span></span>
                  </el-col>
                  <el-col :span="12">
                    <el-select :disabled="isEditDisabled" v-model="userInfo.customerType" style="width:100%;" :placeholder="$t('voice.PleaseSelect')">
                      <el-option v-for="item in userInfoListGrop.customerTypeArr" :key="item.key" :label="item.value" :value="item.key" />
                    </el-select>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <span class="user-content-text">{{ $t('voice.Address') }}</span>
              </el-col>
              <el-col :span="18" style="margin-left:-2px;">
                <el-input :disabled="isEditDisabled" v-model="userInfo.address" />
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="12">
                <el-row>
                  <el-col :span="12">
                    <span class="user-content-text">{{ $t('voice.Country') }}<span class="required">*</span></span>
                  </el-col>
                  <el-col :span="12">
                    <el-select :disabled="isEditDisabled" v-model="userInfo.country" style="width:100%;" :placeholder="$t('voice.PleaseSelect')" @change="countryChange">
                      <el-option v-for="item in userInfoListGrop.countryArr" :key="item.dictCode" :label="item.dictNm" :value="item.dictCode" />
                    </el-select>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12">
                <el-row>
                  <el-col :span="12">
                    <span class="user-content-text">{{ $t('voice.City') }}</span>
                  </el-col>
                  <el-col :span="12">
                    <el-select :disabled="isEditDisabled" v-model="userInfo.city" style="width:100%;" :placeholder="$t('voice.PleaseSelect')">
                      <el-option v-for="item in userInfoListGrop.cityArr" :key="item.dictCode" :label="item.dictNm" :value="item.dictCode" />
                    </el-select>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="12">
                <el-row>
                  <el-col :span="12">
                    <span class="user-content-text">{{ $t('voice.State') }}</span>
                  </el-col>
                  <el-col :span="12">
                    <el-select :disabled="isEditDisabled" v-model="userInfo.state" style="width:100%;" :placeholder="$t('voice.PleaseSelect')" @change="stateChange">
                      <el-option v-for="item in userInfoListGrop.stateArr" :key="item.dictCode" :label="item.dictNm" :value="item.dictCode" />
                    </el-select>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12">
                <el-row>
                  <el-col :span="12">
                    <span class="user-content-text">{{ $t('voice.ZIPcode') }}</span>
                  </el-col>
                  <el-col :span="12">
                    <el-input :disabled="isEditDisabled" v-model="userInfo.zipCode" />
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="12">
                <el-row>
                  <el-col :span="12">
                    <span class="user-content-text">{{ $t('voice.Owner') }}<span class="required">*</span></span>
                  </el-col>
                  <el-col :span="12">
                    <el-select :disabled="isEditDisabled" v-model="userInfo.owner" style="width:100%;" :placeholder="$t('voice.PleaseSelect')">
                      <el-option v-for="item in userInfoListGrop.ownerArr" :key="item.dictCode" :label="item.dictNm" :value="item.dictCode" />
                    </el-select>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="12">
                <el-row>
                  <el-col :span="12">
                    <span class="user-content-text" />
                  </el-col>
                  <el-col :span="12">
                    <el-button :disabled="isEditDisabled" @click="editSaveCustomer" type="primary">Save</el-button>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-col>
      <el-col class="detail-right right-box" style="max-width: 320px;min-width: 300px;    background: #F5F5F9;padding: 12px 12px 12px 0;">
        <el-collapse v-model="activeNames" @change="handleChange">
          <!-- Sales Stage -->
          <SalesStage :salesStageList="salesStageList" :detailSalesStageListData="detailSalesStageListData" :customerId="customerId" @getDetailSalesStageList="getDetailSalesStageList" />
          <!-- Ticketds -->
          <Ticketds :ticketsList="ticketsList" :rowList="rowList" :userData="userInfo" :customerId="customerId" :type="'voice'" @getMyTicketList="getMyTicketList" />
          <!-- Recent communrications -->
          <RecentCommunrications :callLogList="callLogList" />
        </el-collapse>
      </el-col>
    </el-row>
    <AddCustomer v-show="showAddDetail" ref="AddCustomer" @addAfterFunc="addAfterFunc" />
  </div>
</template>

<script>
// export { parseTime } from "@/utils";
import {
  deepClone,
  getIsCalling,
  getNdaysAgoStartAndEndTime,
} from "@/utils/index.js";
import { getMyTicketList, getAllTicketList } from "@/api/tickets";
import { getAutoField, getDictionary, getCallLogList } from "@/api/commonApi";
import { get } from "lodash-es";
import {
  customerDetail,
  editSaveCustomer,
  detailSalesStageAdd,
  detailSalesStageList,
  addCustomer,
} from "@/api/allCustomer";
import { getCallLog, postCallLog, getCustomerId } from "@/api/voice";
import AddCustomer from "@/views/custom-page/add-customer";
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination
import { toThousandFilter } from "@/filters";
import { cloneDeep } from "lodash-es";
import SalesStage from "@/components/common/SalesStage";
import Ticketds from "@/components/common/Ticketds.vue";
import RecentCommunrications from "@/components/common/RecentCommunrications.vue";
import Avatar from "@/components/common/Avatar";
import AvatarUpload from "@/components/common/AvatarUpload";
import Steps from "@/components/common/Steps";

export default {
  name: "voice",
  components: {
    Pagination,
    AddCustomer,
    SalesStage,
    Ticketds,
    RecentCommunrications,
    Avatar,AvatarUpload,Steps
  },
  watch: {
    $route: {
      handler(val, oldval) {
        try {
          const query = this.$route.query;
          if (query && query.isOutbound) {
            this.isOutbound = query.isOutbound;
          }
          $nouiInstance.getStatusOff(this.getStatus);
          //  console.log(val, $nouiInstance, '外呼或呼入跳转');
          const {
            $wsInstance: { currentStatusData },
          } = $nouiInstance;
          let flag = getIsCalling(currentStatusData.name);
          console.log(currentStatusData, "跳转时当前状态data", flag);
          if (flag) {
            this.setAnswerlist(currentStatusData.body);
          }
          $nouiInstance.getStatus(this.getStatus);
        } catch (e) {}
      },
      deep: true,
      immediate: true,
    },
  },
  data() {
    return {
      isOutbound: 1,
      stepsNum: -1,
      stepsArr: [
        { key: "0", title: this.$t("voice.Lead"), time: "" },
        { key: "1", title: this.$t("voice.Pipeline"), time: "" },
        { key: "2", title: this.$t("voice.Upside"), time: "" },
        { key: "3", title: this.$t("voice.Commit"), time: "" },
        { key: "4", title: this.$t("voice.Cancel"), time: "" },
        { key: "5", title: this.$t("voice.Booked"), time: "" },
        { key: "6", title: this.$t("voice.Customer"), time: "" },
      ],
      total: 10,
      listQuery: {
        page: 1,
        limit: 25,
      },
      showAddDetail: false,
      fileList: [],
      urlImpot:
        this.$common.getJavaServerURI() +
        "sale/file?tableNm=nbs_customer&businessType=headImage", // 上传文件地址
      imageUrl: "",
      searchGroup: {
        searchDetail: "",
        chooseTime: "0",
        chooseTimeArr: [
          { key: "0", label: this.$t("voice.Today") },
          { key: "1", label: this.$t("voice.Yestoday") },
          { key: "7", label: this.$t("voice.Last7days") },
        ],
        callDirection: "2",
        callDirectionArr: [
          { key: "2", label: this.$t("voice.All") },
          { key: "0", label: this.$t("voice.in") },
          { key: "1", label: this.$t("voice.out") },
        ],
      },
      showListArr: [],
      userInfo: {
        headImage: "",
        firstName: "",
        lastName: "",
        gender: "",
        company: "",
        primaryPhone: "",
        altemate1: "",
        channel: "",
        email: "",
        greateTime: "",
        customerType: "",
        customerTypeName: "",
        createTime: new Date().getTime(),
        address: "",
        country: "",
        city: "",
        state: "",
        zipCode: "",
        owner: "",
        ownerName: "",
        salesStage: "",
        intention: "",
        description: "",
      },
      userInfoListGrop: {
        genderArr: [],
        channelArr: [],
        countryArr: [],
        cityArr: [],
        stateArr: [],
        ownerArr: [],
        customerTypeArr: [],
      },
      rules: {
        firstName: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
      },
      activeNames: ["1"],
      salesStageVisible: false,
      recentVisible: false,
      chooseList: {
        relationship: "",
        greateDate: "",
        salesStage: "",
        followupStage: "",
        type: "",
        intention: "2",
      },
      salesStageArr: [
        // { key: '0', label: this.$t('voice.Lead') },
        // { key: '1', label: this.$t('voice.Pipeline') },
        // { key: '2', label: this.$t('voice.Upside') },
        // { key: '3', label: this.$t('voice.Commit') },
        // { key: '4', label: this.$t('voice.Cancel') },
        // { key: '5', label: this.$t('voice.Booked') },
        // { key: '6', label: this.$t('voice.Customer') }
      ],
      intentionArr: [
        { key: "1", label: this.$t("voice.ntention") },
        { key: "2", label: this.$t("voice.NoIntention") },
      ],
      salesMemo: "",
      callFromData: {
        beginTime: "",
        calling: "78",
        called: "ww",
        direction: "ww",
        callid: "w",
        record: "click to download",
        ringduration: "Ring duration",
        queueduration: "Queue duration",
        hanguptime: "Hang up time",
        answertime: "Answer time:",
        audioSrc: "",
      },
      salesStageList: [],
      rowList: {},
      customDetailList: {},
      servicetypeArr: [
        {
          value: 0,
          label: this.$t("myTicktes.Consulting"),
        },
        {
          value: 1,
          label: this.$t("myTicktes.Opinion"),
        },
        {
          value: 2,
          label: this.$t("myTicktes.Pipeline"),
        },
      ],
      ticketsList: [],
      AddCustomerData: [],
      callLogList: [],
      isCurrent: false,
      isNewCustomer: false,
      customerId: "",
      isEditDisabled: true,
      postCallLogParma: {
        callId: "",
        caller: "",
        called: "",
        beginTime: 0,
        callFlag: 0,
        callDirection: 0,
      },
      isGreateDisabled: true,
      callInData: null,
      hangupData: {},
      detailSalesStageListData: null,
      CallLogsData: {},
      zone: "",
      rolesInfo: {},
    };
  },
  created() {
    this.rolesInfo = JSON.parse(localStorage.getItem("rolesInfo"));
    this._stepsArr = cloneDeep(this.stepsArr);
    this.getCallLog();
    this.getAutoFieldFunc();
    this.getCountry("Country");
    this.getCountry("userId");
  },
  destroyed() {
    $nouiInstance && $nouiInstance.getStatusOff(this.getStatus);
  },
  methods: {
    numberInput(fieldName) {
      this.userInfo[fieldName] = this.userInfo[fieldName].replace(/[^\d]/g, "");
    },
    getStatus(data) {
      console.log(data, "实时获取当前状态");
      const type = data.name;
      const body = data.body;
      // const callDirection = body.dir ? 2 : 1;
      const callDirection = body.dir;
      switch (type) {
        case "ring":
          break;
        case "bridge":
          this.setAnswerlist(body);
          break;
        case "hangup":
          this.hangupData = body;
          const deviceId = body.device;
          const device = body.deviceMap[deviceId];
          this.postCallLogParma.beginTime = device.startTime;
          this.postCallLogParma.callDirection = callDirection;
          this.postCallLogParma.callId = body.callId;
          this.postCallLogParma.caller = body.caller;
          this.postCallLogParma.called = body.called;
          if (device.bridgeTime) {
            // 呼叫结果 0：接通 1：未接通
            this.postCallLogParma.callFlag = 0;
          } else {
            this.postCallLogParma.callFlag = 1;
          }
          this.$store.dispatch("user/setAnswerlist", []);
          this.postCallLog();
          console.log("挂机");
          break;
      }
    },
    setAnswerlist(body) {
      var arr = [];
      var phoneNm;
      if (body.dir === 0) {
        phoneNm = body.caller;
      } else {
        phoneNm = body.called;
      }
      arr.push({
        beginTime: body.timestamp,
        callDirection: body.dir,
        callFlag: 0,
        customerId: "",
        customerNm: "Unknown",
        headImage: null,
        phoneNm: phoneNm,
        isCurrent: true,
      });
      this.rowList = arr[0];
      this.postCallLogParma.callId = body.callId;
      this.postCallLogParma.caller = body.caller;
      this.postCallLogParma.called = body.called;
      this.postCallLogParma.beginTime = body.timestamp;
      this.postCallLogParma.callFlag = 0;
      this.postCallLogParma.callDirection = body.dir;
      this.isCurrent = true;
      this.isEditDisabled = false;
      this.clearStatus();
      this.getCustomerId(phoneNm, (id) => {
        arr[0].customerId = id;
        this.$store.dispatch("user/setAnswerlist", arr);
      });
    },
    getCustomerId(phoneNm, cb) {
      getCustomerId(phoneNm).then((json) => {
        // console.log(json, "json");
        var data = json.data;
        this.callInData = data || {};
        this.getCallLog();
        cb && cb(get(data, "id", null));
        if (data && data.id) {
          this.isEditDisabled = true;
          this.clearStatus();
          this.customerId = data.id;
          this.getMyTicketList();
          this.getCallLogList();
          this.getDetailSalesStageList(this.customerId);
          this.getCustomerDetail(); //获取客户详情
        }
      });
    },
    addAfterFunc(data) {
      this.isEditDisabled = true;
      this.customerId = data.data.id;
      this.getCountry("Country");
      this.countryChange(data.data.countryCode);
      this.stateChange(data.data.stateCode);
      this.getDetailSalesStageList(this.customerId);
      this.getCustomerDetail();
      // console.log(data, "添加客户后拿到得数据");
      this.refreshParentList();
    },
    clearStatus() {
      this.salesStageList = [];
      this.ticketsList = [];
      this.callLogList = [];
      this.fileList = [];
      this.userInfo = {
        headImage: "",
        firstName: "",
        lastName: "",
        gender: "",
        company: "",
        primaryPhone: "",
        altemate1: "",
        channel: "",
        email: "",
        greateTime: "",
        customerType: "",
        customerTypeName: "",
        createTime: new Date().getTime(),
        address: "",
        country: "",
        city: "",
        state: "",
        zipCode: "",
        owner: "",
        ownerName: "",
        salesStage: "",
        intention: "",
        description: "",
      };
      this.imageUrl = "";
      this.stepsNum = -1;
      this.isNewCustomer = false;
    },
    handleCreate() {
      // console.log("addd");
      this.showAddDetail = true;
      this.$refs.AddCustomer.initData(this.AddCustomerData);
    },
    editFunc() {
      this.isEditDisabled = false;
    },
    updateField(name,val) {
      this[name] = val;
    },
    postCallLog() {
      postCallLog(this.postCallLogParma).then((json) => {
        this.getCallLog();
      });
    },
    getCallLog(type) {
      if (type === "reset") {
        this.listQuery.page = 1;
        this.customerId = "";
        this.isEditDisabled = true;
      }
      // console.log(
      //   this.$store.getters.answerList,
      //   "that.$store.getters.answerList"
      // );
      // var timestamp
      var startAndEnd;
      var nowEndTime;
      var beginTimeStart = "";
      var beginTimeEnd = "";
      if (this.searchGroup.chooseTime) {
        if (Number(this.searchGroup.chooseTime) <= 1) {
          startAndEnd = this.$common.getStartEndTime(
            this.searchGroup.chooseTime
          );
          // timestamp = startAndEnd[0] + ',' + startAndEnd[1]
          beginTimeStart = startAndEnd[0];
          beginTimeEnd = startAndEnd[1];
        } else if (this.searchGroup.chooseTime === "7") {
          const timeObj = getNdaysAgoStartAndEndTime(
            this.searchGroup.chooseTime
          );
          beginTimeStart = timeObj.start;
          beginTimeEnd = timeObj.end;
        }
      }

      var data = {
        phoneNo: this.searchGroup.searchDetail,
        beginTimeStart: beginTimeStart,
        beginTimeEnd: beginTimeEnd,
        callDirection: this.searchGroup.callDirection,
        pageNo: this.listQuery.page,
        pageSize: this.listQuery.limit,
      };
      var that = this;
      getCallLog(data).then((json) => {
        this.CallLogsData = json.data;
        that.showListArr = [];
        that.showListArr = this.$store.getters.answerList.concat(
          json.data.records
        );
        this.listQuery.page = json.data.current;
        // console.log(that.showListArr, "calllist");
      });
    },
    currentChange(val) {
      // console.log(val);
      this.listQuery.page = val;
      this.getCallLog();
    },
    resetListUI() {
      this.listQuery.page = 1;
      this.listQuery.limit = 25;
    },
    getAutoFieldFunc() {
      var that = this;
      getAutoField("10000004").then((json) => {
        var data = json.data;
        for (let i = 0; i < data.length; i++) {
          var item = data[i];
          if (item.options) {
            item.options = JSON.parse(item.options);
          }
          if (data[i].showNm === "Gender") {
            that.userInfoListGrop.genderArr = data[i].options;
          }
          if (data[i].showNm === "Channel") {
            that.userInfoListGrop.channelArr = data[i].options;
          }
          if (data[i].showNm === "Customer type") {
            that.userInfoListGrop.customerTypeArr = data[i].options;
          }
          if (data[i].showNm === "Stage") {
            that.salesStageArr = data[i].options;
          }
          if (data[i].showNm === "Intention") {
            that.intentionArr = data[i].options;
          }
        }
        that.AddCustomerData = data;
      });
    },
    getCountry(data) {
      var that = this;
      getDictionary(data).then((json) => {
        var list = json.data;
        if (data === "Country") {
          that.userInfoListGrop.countryArr = list;
        }
        if (data === "userId") {
          that.userInfoListGrop.ownerArr = list;
        }
        if (data.indexOf("State") !== -1) {
          that.userInfoListGrop.stateArr = list;
        }
        if (data.indexOf("City") !== -1) {
          that.userInfoListGrop.cityArr = list;
        }
        // console.log(json, '======json')
      });
    },
    countryChange(val) {
      // console.log(val, 'val=======country')
      var data = "State:" + val;
      this.getCountry(data);
    },
    stateChange(val) {
      var data = "City:" + val;
      this.getCountry(data);
    },
    editSaveCustomer() {
      if (!this.customerId) {
        return;
      }
      editSaveCustomer(this.userInfo, this.customerId).then((json) => {
        this.$message({
          message: "save success",
          type: "success",
        });
        this.isEditDisabled = true;
      });
    },
    detailSaleChange() {
      this.isGreateDisabled = false;
    },
    SalesOpen() {
      this.isGreateDisabled = true;
    },
    getDetailSalesStageList(id) {
      var that = this;
      detailSalesStageList(id).then((json) => {
        this.detailSalesStageListData = json.data;
        that.stepsNum = Number(json.data.salesStageCode) - 1;
        const allSalesStage = this.detailSalesStageListData.allSalesStage;
        this.stepsArr = Object.keys(allSalesStage).map((item) => {
          return {
            key: item + "",
            title: allSalesStage[item],
            time:
              json.data.salesStageCode == item
                ? json.data.lastFollowupTime
                : "",
          };
        });
        // that.stepsArr[that.stepsNum].time = json.data.lastFollowupTime;
        that.salesStageList = json.data.logs.records;
        // console.log(json.data.logs, "that.salesStageList");
      });
    },
    getMyTicketList() {
      // 此位置是否分页待定
      var data = {
        pageNo: 1,
        pageSize: 20,
        incomingNumber: this.rowList.phoneNm,
      };
      var that = this;
      // getMyTicketList(data).then((json) => {
      //   var data = json.data
      //   var list = data.records
      //   if (json.code === 200) {
      //     for (let i = 0; i < list.length; i++) {
      //       if (list[i].serviceType) {
      //         for (let j = 0; j < that.servicetypeArr.length; j++) {
      //           if (list[i].serviceType === that.servicetypeArr[j].value) {
      //             list[i].serviceType = that.servicetypeArr[j].label
      //           }
      //         }
      //       } else {
      //         list[i].serviceType = that.servicetypeArr[0].label
      //       }
      //     }
      //     that.ticketsList = list
      //   }
      //   console.log(json, 'json========tickets')
      // })
      getAllTicketList(data)
        .then((res) => {
          this.ticketsList = res.data.records || [];
        })
        .catch((err) => {
          this.ticketsList = [];
        });
    },
    // getCallLogDetail(phoneNo){
    //   getCallLogDetail(phoneNo).then((json) => {
    //     console.log(json,"客户详情data")
    //   })
    // },

    // 子组件取消或保存时刷新的方法
    refreshParentList: function (data) {
      this.showAddDetail = false;
      this.getMyTicketList();
    },
    touchItem(item) {
      this.isEditDisabled = true;
      this.clearStatus();
      this.resetUI();
      this.rowList = item;
      // console.log(this.rowList, "this.rowList");
      this.setItemHover(item);
      this.customerId = this.rowList.customerId;
      this.getMyTicketList();
      if (this.customerId) {
        this.getDetailSalesStageList(this.customerId);
        this.getCustomerDetail();
      } else {
        this.isNewCustomer = true;
        // this.isEditDisabled = false;
      }
      this.getCallLogList();
    },
    resetUI() {
      this.stepsArr = cloneDeep(this._stepsArr);
    },
    setItemHover(item) {
      console.log(this.showListArr, "this.showListArr", item);
      this.showListArr = this.showListArr.map((v) => ({
        ...v,
        hover: item.beginTime === v.beginTime ? true : false,
      }));
      // item.hover = true;
    },
    getCustomerDetail() {
      var that = this;
      customerDetail(this.customerId).then((json) => {
        this.countryChange(json.data.countryCode);
        this.stateChange(json.data.stateCode);
        that.customDetailList = json.data;
        that.imageUrl = json.data.headImage;
        that.userInfo.headImage = json.data.headImageId;
        that.userInfo.gender = json.data.genderCode;
        that.userInfo.channel = json.data.channelCode;
        that.userInfo.customerType = json.data.customerTypeCode;
        that.userInfo.customerTypeName = json.data.customerType;
        that.userInfo.country = json.data.countryCode;
        that.userInfo.city = json.data.cityCode;
        that.userInfo.state = json.data.stateCode;
        that.userInfo.owner = json.data.ownerCode;
        that.userInfo.ownerName = json.data.owner;
        that.userInfo.firstName = json.data.firstName;
        that.userInfo.lastName = json.data.lastName;
        that.userInfo.primaryPhone = json.data.primaryPhone;
        that.userInfo.altemate1 = json.data.altemate1;
        that.userInfo.email = json.data.email;
        that.userInfo.createTime = json.data.createTime;
        that.userInfo.address = json.data.address;
        that.userInfo.zipCode = json.data.zipCode;
        that.userInfo.company = json.data.company;
        // console.log(that.userInfo, "json=====");
      });
    },
    getCallLogList() {
      var that = this;
      getCallLogList(this.rowList.phoneNm).then((json) => {
        that.callLogList = json.data.records;
        // console.log("callLogList", json);
      });
    },
    handleChange(val) {
      // console.log(val);
    },
    handleAvatarChange(val) {
      // this.fileList = val
      // console.log(val);
    },
    handleAvatarRemove() {
      this.imageUrl = "";
    },
    handleAvatarSuccess(res, file) {
      const isJPG = file.raw.type === "image/jpeg";
      const isPNG = file.raw.type === "image/png";

      if (!isJPG && !isPNG) {
        this.fileList = [];
        this.$message.error("Image format is JPG PNG and PNG!");
        return;
      }

      if (res.code !== 200) {
        this.fileList = [];
        this.$message.error(res.message);
        return;
      }

      this.userInfo.headImage = res.data.id;
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {},
  },
};
</script>
<style scoped>
/deep/ .saleGroup .el-input__inner {
  border: none;
  background: #fbfbfd;
  color: #000;
}
/deep/ .saleGroup input:-moz-placeholder {
  color: #333;
}
/deep/ .saleGroup input:-ms-input-placeholder {
  color: #333;
}
/deep/ .saleGroup input::-webkit-input-placeholder {
  color: #333;
}
.callLogList {
  /* overflow-y: auto;
  max-height: 900px; */
  overflow: hidden;
}
.required {
  font-size: 13px;
  color: #ff0000;
}
.list-item {
  /* background-color: #f2f2f2; */
  margin-bottom: 3px;
  margin-top: 3px;
  border-left: 4px solid transparent;
}
.list-item-connected {
  border-left: 12px solid #70b603;
  background-color: #eceef76e;
  padding: 5px;
}
.list-item:hover {
  cursor: pointer;
  background-color: #eceef76e;
}
.list-item.hover {
  background-color: #eceef76e;
  box-shadow: 2px 0px 4px 0px rgba(0, 0, 0, 0.04);
  border-left: 4px solid #4456b9;
}
.list-item-state {
  color: #d9001b;
  text-align: right;
}
.list-item-state-spcial {
  color: #70b603;
  margin-left: -5px;
}
.list-icon {
  text-align: center;
  width: 36px;
  height: 36px;
  position: relative;
}
.list-icon-bg {
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  top: -8px;
  right: -13px;
}
.list-item.hover .list-icon-bg {
  background: #fff;
}
.listHead {
  width: 30px;
  height: 30px;
  font-size: 24px;
  border: 1px solid rgb(187, 187, 187);
  border-radius: 50%;
}
.callDir {
  position: absolute;
  right: 10%;
  top: 3px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid #ccc;
  line-height: 20px;
  text-align: center;
}
.el-collapse{
  border: none;
  box-shadow: 0px 0px 6px 0px rgba(0,0,0,0.08);
    border-radius: 6px;
}
.el-collapse-item__header {
  flex: 1 0 auto;
  order: -1;
    border-radius: 6px;
padding: 0 14px;
}
.header-detail {
  width: 100%;
  text-align: center;
  margin-top: 20px;
}
.header-detail h3,
.header-detail p {
  margin: 0px;
}
.header-btn-group {
  margin-top: 15px;
  float: right;
}
.header-btn {
  margin: 0px;
  padding: 0px;
  width: 20px;
  height: 20px;
  border: none;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 50px;
  height: 50px;
  line-height: 50px;
  border-radius: 50%;
  border: 1px solid #ccc;
  text-align: center;
}
.avatar-big {
  width: 64px;
  height: 64px;
  display: block;
}
.top-header {
  /* height: 200px; */
  /* border: 1px solid #ccc; */
}
.detail-right {
  height: 100%;
}
.add-page {
  width: 100%;
  height: 100%;
}
.el-row {
  margin-bottom: 10px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.detail-right {
  height: 100%;
}
.user-content-detail {
  height: 100%;
  padding: 10px;
}
.user-content-item {
  display: flex;
  margin-right: 10px;
}
.user-content-text {
  height: 40px;
  line-height: 40px;
  float: right;
  margin-right: 10px;
}
.detail-right-parent {
  padding-left: 20px;
  border-bottom: 1px solid #ccc;
}
.detail-right-item {
  display: flex;
  flex-direction: column;
}
.detail-right-item-bg {
  background: #d7d7d7;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  text-align: center;
  line-height: 50px;
}
.detail-right-item-time {
  margin-left: 14%;
}
.detail-right-sales {
  height: 250px;
  overflow-y: auto;
}
.salesMemo {
  margin-top: 10px;
}
.percent-detail {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
}
.time {
  font-size: 12px;
  font-family: DINAlternate-Bold, DINAlternate;
  font-weight: bold;
  color: #aaaaaa;
}
.callLog-item {
  font-size: 14px;
  justify-content: space-between;
  align-items: center;
  height: 54px;
  line-height: 26px;
  padding: 0 12px;
}
.custome-box {
  font-size: 15px;
  flex: 1;
  padding-left: 23px;
  padding-right: 8px;
}
/deep/ .el-badge__content.is-fixed {
  top: -2px;
  right: 14px;
}
.head-Image {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.customerNm {
  font-size: 16px;
  font-family: Helvetica-Bold, Helvetica;
  font-weight: bold;
  color: #111111;
      flex: 1;
    padding-right: 10px;
}
.phoneNm {
  font-size: 12px;
  font-family: DINAlternate-Bold, DINAlternate;
  font-weight: bold;
  color: #aaaaaa;
}
.phoneNm-miss {
  color: #f95454;
}
</style>
