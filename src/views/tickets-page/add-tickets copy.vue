<template>
  <div class="add-drawer">
    <el-drawer size="50%" :visible.sync="drawer" :close-on-press-escape="false" :before-close="resetForm">
      <span slot="title">{{ $t('myTicktes.GreateTicket') }}</span>
      <el-row :gutter="10" class="add-page">
        <el-col :span="24">
          <el-row class="user-content-detail">
            <el-col :span="24">
              <el-row>
                <el-col :span="5">
                  <span class="user-content-text">{{ $t('myTicktes.TicketsTitle') }}<span class="required">*</span></span>
                </el-col>
                <el-col :span="14" style="margin-left:-2px;width:61%;">
                  <el-input v-model="userInfo.ticketsTitle" />
                </el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col :span="10">
                  <el-row>
                    <el-col :span="12">
                      <span class="user-content-text">{{ $t('myTicktes.Firstname') }}<span class="required">*</span></span>
                    </el-col>
                    <el-col :span="11">
                      <el-input v-model="userInfo.firstName" />
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :span="10">
                  <el-row>
                    <el-col :span="12">
                      <span class="user-content-text">{{ $t('myTicktes.Lastname') }}<span class="required">*</span></span>
                    </el-col>
                    <el-col :span="11">
                      <el-input v-model="userInfo.lastName" />
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col :span="10">
                  <el-row>
                    <el-col :span="12">
                      <span class="user-content-text">{{ $t('myTicktes.incomingnumber') }}<span class="required">*</span><span class="required">*</span></span>
                    </el-col>
                    <el-col :span="11">
                      <el-input v-model="userInfo.incomingnumber" />
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :span="10">
                  <el-row>
                    <el-col :span="12">
                      <span class="user-content-text">{{ $t('myTicktes.Gender') }}<span class="required">*</span></span>
                    </el-col>
                    <el-col :span="11">
                      <el-select v-model="userInfo.gender" style="width:100%;" :placeholder="$t('myTicktes.PleaseSelect')">
                        <el-option v-for="item in userInfo.genderArr" :key="item.value" :label="item.label" :value="item.value" />
                      </el-select>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col :span="10">
                  <el-row>
                    <el-col :span="12">
                      <span class="user-content-text">{{ $t('myTicktes.Reply') }}<span class="required">*</span></span>
                    </el-col>
                    <el-col :span="11">
                      <el-select v-model="userInfo.reply" style="width:100%;" :placeholder="$t('myTicktes.PleaseSelect')">
                        <el-option v-for="item in userInfo.replyArr" :key="item.value" :label="item.label" :value="item.value" />
                      </el-select>
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :span="10">
                  <el-row>
                    <el-col :span="12">
                      <span class="user-content-text">{{ $t('myTicktes.Priority') }}<span class="required">*</span></span>
                    </el-col>
                    <el-col :span="11">
                      <el-select v-model="userInfo.priority" style="width:100%;" :placeholder="$t('myTicktes.PleaseSelect')">
                        <el-option v-for="item in userInfo.priorityArr" :key="item.value" :label="item.label" :value="item.value" />
                      </el-select>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col :span="10">
                  <el-row>
                    <el-col :span="12">
                      <span class="user-content-text">{{ $t('myTicktes.ContactNumber') }}<span class="required">*</span></span>
                    </el-col>
                    <el-col :span="11">
                      <el-input v-model="userInfo.ContactNumber" />
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :span="10">
                  <el-row>
                    <el-col :span="12">
                      <span class="user-content-text">{{ $t('myTicktes.Email') }}<span class="required">*</span></span>
                    </el-col>
                    <el-col :span="11">
                      <el-input v-model="userInfo.email" />
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col :span="10">
                  <el-row>
                    <el-col :span="12">
                      <span class="user-content-text">{{ $t('myTicktes.Channel') }}<span class="required">*</span></span>
                    </el-col>
                    <el-col :span="11">
                      <el-select v-model="userInfo.channel" style="width:100%;" :placeholder="$t('myTicktes.PleaseSelect')">
                        <el-option v-for="item in userInfo.channelArr" :key="item.value" :label="item.label" :value="item.value" />
                      </el-select>
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :span="10">
                  <el-row>
                    <el-col :span="12">
                      <span class="user-content-text">{{ $t('myTicktes.Country') }}<span class="required">*</span></span>
                    </el-col>
                    <el-col :span="11">
                      <el-select v-model="userInfo.country" style="width:100%;" :placeholder="$t('myTicktes.PleaseSelect')" @change="countryChange">
                        <el-option v-for="item in userInfo.countryArr" :key="item.dictCode" :label="item.dictNm" :value="item.dictCode" />
                      </el-select>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col :span="10">
                  <el-row>
                    <el-col :span="12">
                      <span class="user-content-text">{{ $t('myTicktes.State') }}<span class="required">*</span></span>
                    </el-col>
                    <el-col :span="11">
                      <el-select v-model="userInfo.state" style="width:100%;" :placeholder="$t('myTicktes.PleaseSelect')" @change="stateChange">
                        <el-option v-for="item in userInfo.stateArr" :key="item.dictCode" :label="item.dictNm" :value="item.dictCode" />
                      </el-select>
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :span="10">
                  <el-row>
                    <el-col :span="12">
                      <span class="user-content-text">{{ $t('myTicktes.City') }}<span class="required">*</span></span>
                    </el-col>
                    <el-col :span="11">
                      <el-select v-model="userInfo.city" style="width:100%;" :placeholder="$t('myTicktes.PleaseSelect')">
                        <el-option v-for="item in userInfo.cityArr" :key="item.dictCode" :label="item.dictNm" :value="item.dictCode" />
                      </el-select>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col :span="10">
                  <el-row>
                    <el-col :span="12">
                      <span class="user-content-text">{{ $t('myTicktes.Servicetype') }}<span class="required">*</span></span>
                    </el-col>
                    <el-col :span="11">
                      <el-select v-model="userInfo.servicetype" style="width:100%;" :placeholder="$t('myTicktes.PleaseSelect')">
                        <el-option v-for="item in userInfo.servicetypeArr" :key="item.value" :label="item.label" :value="item.value" />
                      </el-select>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="5">
                  <span class="user-content-text">{{ $t('myTicktes.Description') }}<span class="required">*</span></span>
                </el-col>
                <el-col :span="14" style="margin-left:-2px;width:61%;">
                  <el-input v-model="userInfo.descMemo" type="textarea" :placeholder="$t('myTicktes.Saysomething')" maxlength="300" rows="5" show-word-limit class="descMemo" style="width:100%" />
                </el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col :span="10">
                  <el-row>
                    <el-col :span="12">
                      <span class="user-content-text">{{ $t('myTicktes.Nextstep') }}<span v-show="!isShowSave" class="required">*</span></span>
                    </el-col>
                    <el-col :span="11">
                      <el-select v-model="userInfo.nextstep" style="width:100%;" :placeholder="$t('myTicktes.PleaseSelect')" @change="changeStepFunc">
                        <el-option v-for="item in userInfo.nextstepArr" :key="item.id" :label="item.departName" :value="item.id" />
                      </el-select>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col :span="10">
                  <el-row>
                    <el-col :span="12">
                      <span class="user-content-text" />
                    </el-col>
                    <el-col :span="11">
                      <el-row :gutter="30">
                        <el-col :span="12">
                          <el-button type="primary" :disabled="isShowSave" @click="sentTicketsFunc()">sent</el-button>
                        </el-col>
                        <el-col :span="12">
                          <el-button type="primary" :disabled="!isShowSave||isSaveDisabled" @click="saveTicketsFunc(false)">save</el-button>
                        </el-col>
                      </el-row>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-drawer>
  </div>
</template>

<script>
import { getDictionary, getDeparts } from '@/api/commonApi'
import { addTicketList, sentTicketList } from '@/api/tickets'
import { cloneDeep } from 'lodash-es'
export default {
  name: 'AddTickets',
  data() {
    return {
      drawer: false,
      imageUrl: '',
      deepUserInfo: {},
      userInfo: {
        ticketsTitle: '',
        firstName: '',
        lastName: '',
        incomingnumber: '',
        gender: '',
        genderArr: [{
          value: 0,
          label: this.$t('myTicktes.Male')
        }, {
          value: 1,
          label: this.$t('myTicktes.Female')
        }, {
          value: 2,
          label: this.$t('myTicktes.Other')
        }],
        reply: '',
        replyArr: [{
          value: 1,
          label: this.$t('myTicktes.Yes')
        }, {
          value: 0,
          label: this.$t('myTicktes.No')
        }],
        priority: '',
        priorityArr: [{
          value: 0,
          label: this.$t('myTicktes.Normal')
        }, {
          value: 1,
          label: this.$t('myTicktes.Emergency')
        }, {
          value: 2,
          label: this.$t('myTicktes.Urgent')
        }],
        ContactNumber: '',
        email: '',
        channel: '',
        channelArr: [
          {
            value: 1,
            label: this.$t('myTicktes.Voice')
          },
          {
            value: 2,
            label: this.$t('myTicktes.EMail')
          },
          {
            value: 3,
            label: this.$t('myTicktes.Livechat')
          },
          {
            value: 4,
            label: this.$t('myTicktes.WhatsAPP')
          },
          {
            value: 5,
            label: this.$t('myTicktes.Other')
          }
        ],
        country: '',
        countryArr: [],
        state: '',
        stateArr: [],
        city: '',
        cityArr: [],
        servicetype: '',
        servicetypeArr: [
          {
            value: 0,
            label: this.$t('myTicktes.Consulting')
          },
          {
            value: 1,
            label: this.$t('myTicktes.Opinion')
          },
          {
            value: 2,
            label: this.$t('myTicktes.Pipeline')
          }
        ],
        nextstep: '',
        nextstepArr: [],
        descMemo: ''
      },
      rules: {
        firstName: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      rowList: {},
      isShowSave: true,
      isSaveDisabled: true
    }
  },
      watch: {
    userInfo: {
          handler(val, oldval) {
        console.log('val',val)
        const arr=['ticketsTitle','firstName','lastName','incomingnumber','gender','reply','priority','ContactNumber','email','channel','country','state','city','servicetype','descMemo']
        if (arr.some(v => !val[v]&&val[v]!==0)) {
          this.isSaveDisabled=true
        } else {
          this.isSaveDisabled = false
        }
      },
      deep: true,
      immediate: true,
    },
  },
  created() {
    this.deepUserInfo = cloneDeep(this.userInfo)
  },
  methods: {
    initData(rowList) {
      this.rowList = rowList
      this.drawer = true
      this.getDeparts()
      this.getCountry('Country')
    },
    getDeparts() {
      var that = this
      getDeparts().then((json) => {
        that.userInfo.nextstepArr = json.data
        console.log(json, 'jsonDeparts')
      })
    },
    sentTicketsFunc() {
      this.saveTicketsFunc(true)
    },
    saveTicketsFunc(isSent) {
      var customerId = ''
      if (this.rowList) {
        customerId = this.rowList.id
      }
      var data = {
        firstName: this.userInfo.firstName,
        lastName: this.userInfo.lastName,
        gender: this.userInfo.gender,
        incomingNumber: this.userInfo.incomingnumber,
        email: this.userInfo.email,
        contactNumber: this.userInfo.ContactNumber,
        title: this.userInfo.ticketsTitle,
        channel: this.userInfo.channel,
        county: this.userInfo.country,
        state: this.userInfo.state,
        city: this.userInfo.city,
        customerId: customerId,
        description: this.userInfo.descMemo,
        needReply: this.userInfo.reply,
        priority: this.userInfo.priority,
        serviceType: this.userInfo.servicetype
      }
      var that = this
      addTicketList(data).then((json) => {
        that.resetForm()
        this.$message({
          type: 'success',
          message: json.message
        })
        if (isSent) {
          var targetGroupId = { 'targetGroupId': that.userInfo.nextstep }
          sentTicketList(json.data.id, targetGroupId).then((json) => {
            that.$emit('refreshParentList')
          })
        } else {
          that.$emit('refreshParentList')
        }
        console.log(json, 'add-tickets----======success')
      })
    },
    resetForm() {
      this.drawer = false
      this.userInfo = cloneDeep(this.deepUserInfo)
    },
    getCountry(data) {
      var that = this
      getDictionary(data).then((json) => {
        var list = json.data
        if (data === 'Country') {
          that.userInfo.countryArr = list
        }
        if (data.indexOf('State') !== -1) {
          that.userInfo.stateArr = list
        }
        if (data.indexOf('City') !== -1) {
          that.userInfo.cityArr = list
        }
        console.log(json, '======json')
      })
    },
    countryChange(val) {
      console.log(val, 'val=======country')
      var data = 'State:' + val
      this.getCountry(data)
    },
    stateChange(val) {
      var data = 'City:' + val
      this.getCountry(data)
    },
    changeStepFunc() {
      this.isShowSave = false
    },
    buttonTest() {
      this.$emit('refreshParentList')
    }
  }
}
</script>
<style scoped>
 .required {
   font-size: 13px;
   color: #FF0000;
 }
 .header-detail{
   width: 100%;
   text-align: center;
   padding: 15px;
 }
 .top-header{
   height: 200px;
 }
 .detail-right{
   height: 100%;
 }
 .add-page{
   width: 100%;
   height: 88%;
   padding: 10px;
   overflow-y: auto;
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
 .detail-right{
   height: 100%;
 }
 .user-content-detail{
   height: 100%;
   padding-left: 10px;
 }
 .user-content-item{
   display: flex;
   margin-right: 10px;
 }
 .user-content-text{
   height: 40px;
   line-height: 40px;
   float: right;
   margin-right:10px ;
 }
 .detail-right-parent{
   padding-left: 20px;
   border-bottom: 1px solid #ccc;
 }
 .detail-right-item{
   display: flex;
   flex-direction: column;
 }
 .detail-right-item-bg{
   background: #D7D7D7;
   border-radius: 50%;
   width: 50px;
   height: 50px;
   text-align: center;
   line-height: 50px;
 }
 .detail-right-item-time{
   margin-left: 14%;
 }
 .detail-right-sales{
   height:250px;
   overflow-y: auto;
 }
 .detail-right-recent{
   height:250px;
 }
 .right-recent{
   border: none;
 }
 .right-recent:hover{
   cursor:pointer
 }
 .header-sales{
   padding-left: 15px;
 }
 .descMemo{
   width: 90%;
   margin-top: 0%;
 }
 .percent-detail{
   border: 1px solid #ccc;
   padding: 10px;
   margin-bottom: 10px;
 }
</style>
