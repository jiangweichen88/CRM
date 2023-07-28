<template>
  <div class="add-drawer">
    <el-drawer size="48%" :visible.sync="drawer" :close-on-press-escape="false" :wrapperClosable="false" :before-close="stagingForm">
      <span slot="title">{{ $t('myTicktes.GreateTicket') }}</span>
      <div class="add-page">
        <!-- <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm">
          <el-form-item :label="$t('myTicktes.TicketsTitle')" prop="ticketsTitle">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
        </el-form> -->
        <el-row>
          <el-col :span="5">
            <span class="user-content-text">{{ $t('myTicktes.TicketsTitle') }}<span class="required">*</span></span>
          </el-col>
          <el-col :span="14" style="width:75%;">
            <el-input v-model="userInfo.ticketsTitle" />
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-row>
              <el-col :span="10">
                <span class="user-content-text">{{ $t('myTicktes.Firstname') }}<span class="required">*</span></span>
              </el-col>
              <el-col :span="14">
                <el-input @input="processedValue('firstName')" v-model="userInfo.firstName" />
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="11">
            <el-row>
              <el-col :span="9">
                <span class="user-content-text">{{ $t('myTicktes.Lastname') }}<span class="required">*</span></span>
              </el-col>
              <el-col :span="15">
                <el-input @input="processedValue('lastName')" v-model="userInfo.lastName" />
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-row>
              <el-col :span="10">
                <span class="user-content-text">{{ $t('myTicktes.incomingnumber') }}<span class="required">*</span></span>
              </el-col>
              <el-col :span="14">
                <el-input @input="numberInput('incomingnumber')" :maxlength="20" clearable v-model="userInfo.incomingnumber" />
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="11">
            <el-row>
              <el-col :span="9">
                <span class="user-content-text">{{ $t('myTicktes.Gender') }}<span class="required">*</span></span>
              </el-col>
              <el-col :span="15">
                <el-select v-model="userInfo.gender" style="width:100%;" :placeholder="$t('myTicktes.PleaseSelect')">
                  <el-option v-for="item in userInfo.genderArr" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-row>
              <el-col :span="10">
                <span class="user-content-text">{{ $t('myTicktes.Reply') }}<span class="required">*</span></span>
              </el-col>
              <el-col :span="14">
                <el-select v-model="userInfo.reply" style="width:100%;" :placeholder="$t('myTicktes.PleaseSelect')">
                  <el-option v-for="item in userInfo.replyArr" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="11">
            <el-row>
              <el-col :span="9">
                <span class="user-content-text">{{ $t('myTicktes.Priority') }}<span class="required">*</span></span>
              </el-col>
              <el-col :span="15">
                <el-select v-model="userInfo.priority" style="width:100%;" :placeholder="$t('myTicktes.PleaseSelect')">
                  <el-option v-for="item in userInfo.priorityArr" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-row>
              <el-col :span="10">
                <span class="user-content-text">{{ $t('myTicktes.ContactNumber') }}<span class="required">*</span></span>
              </el-col>
              <el-col :span="14">
                <el-input @input="numberInput('ContactNumber')" :maxlength="20" clearable v-model="userInfo.ContactNumber" />
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="11">
            <el-row>
              <el-col :span="9">
                <span class="user-content-text">{{ $t('myTicktes.Email') }}<span class="required">*</span></span>
              </el-col>
              <el-col :span="15">
                <el-input v-model="userInfo.email" />
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-row>
              <el-col :span="10">
                <span class="user-content-text">{{ $t('myTicktes.Channel') }}<span class="required">*</span></span>
              </el-col>
              <el-col :span="14">
                <el-select v-model="userInfo.channel" style="width:100%;" :placeholder="$t('myTicktes.PleaseSelect')">
                  <el-option v-for="item in userInfo.channelArr" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="11">
            <el-row>
              <el-col :span="9">
                <span class="user-content-text">{{ $t('myTicktes.Country') }}<span class="required">*</span></span>
              </el-col>
              <el-col :span="15">
                <el-select v-model="userInfo.country" style="width:100%;" :placeholder="$t('myTicktes.PleaseSelect')" @change="countryChange">
                  <el-option v-for="item in userInfo.countryArr" :key="item.dictCode" :label="item.dictNm" :value="item.dictCode" />
                </el-select>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-row>
              <el-col :span="10">
                <span class="user-content-text">{{ $t('myTicktes.State') }}<span class="required">*</span></span>
              </el-col>
              <el-col :span="14">
                <el-select v-model="userInfo.state" style="width:100%;" :placeholder="$t('myTicktes.PleaseSelect')" @change="stateChange">
                  <el-option v-for="item in userInfo.stateArr" :key="item.dictCode" :label="item.dictNm" :value="item.dictCode" />
                </el-select>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="11">
            <el-row>
              <el-col :span="9">
                <span class="user-content-text">{{ $t('myTicktes.City') }}<span class="required">*</span></span>
              </el-col>
              <el-col :span="15">
                <el-select v-model="userInfo.city" style="width:100%;" :placeholder="$t('myTicktes.PleaseSelect')">
                  <el-option v-for="item in userInfo.cityArr" :key="item.dictCode" :label="item.dictNm" :value="item.dictCode" />
                </el-select>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-row>
              <el-col :span="10">
                <span class="user-content-text">{{ $t('myTicktes.Servicetype') }}<span class="required">*</span></span>
              </el-col>
              <el-col :span="14">
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
          <el-col :span="14" style="width:75%;">
            <el-input v-model="userInfo.descMemo" type="textarea" :placeholder="$t('myTicktes.Saysomething')" maxlength="300" rows="5" show-word-limit class="descMemo" style="width:100%" />
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-row>
              <el-col :span="10">
                <span class="user-content-text"
                  >{{ $t('myTicktes.Nextstep') }}
                  <!-- <span v-show="!isShowSave" class="required">*</span> -->
                </span>
              </el-col>
              <el-col :span="14">
                <!-- <el-select v-model="userInfo.nextstep" style="width:100%;" :placeholder="$t('myTicktes.PleaseSelect')" clearable @change="changeStepFunc">
                  <el-option v-for="item in userInfo.nextstepArr" :key="item.id" :label="item.departName" :value="item.id" />
                </el-select> -->
                <select-tree
                  style="width:100%"
                  :props="props"
                  :options="userInfo.nextstepArr"
                  :value="valueId"
                  :clearable="isClearable"
                  :accordion="isAccordion"
                  @getValue="getTreeValue($event)"
                ></select-tree>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <div style="margin-left: 50px;">
          <el-button type="primary" :disabled="isSaveDisabled||(userInfo.nextstep?false:true)" @click="sentTicketsFunc()">Sent</el-button>
          <el-button type="primary" :disabled="isSaveDisabled" @click="saveTicketsFunc(false)" style="margin-left: 35px;">Save</el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import SelectTree from '@/components/common/selectTree.vue'
import { getDictionary, getDeparts } from '@/api/commonApi'
import { addTicketList, sentTicketList } from '@/api/tickets'
import { cloneDeep } from 'lodash-es'
import {validEmail} from '@/utils/validate'
import {isValidateErrorMsg} from '@/utils'
export default {
  name: 'AddTickets',
  props: {
    userData: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  components: { SelectTree },
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
          value: '0',
          label: this.$t('myTicktes.Male')
        }, {
          value: '1',
          label: this.$t('myTicktes.Female')
        }, {
          value: '2',
          label: this.$t('myTicktes.Other')
        }],
        reply: '',
        replyArr: [{
          value: '1',
          label: this.$t('myTicktes.Yes')
        }, {
          value: '0',
          label: this.$t('myTicktes.No')
        }],
        priority: '',
        priorityArr: [{
          value: '0',
          label: this.$t('myTicktes.Normal')
        }, {
          value: '2',
          label: this.$t('myTicktes.Emergency')
        }, {
          value: '1',
          label: this.$t('myTicktes.Urgent')
        }],
        ContactNumber: '',
        email: '',
        channel: '',
        channelArr: [
          {
            value: '1',
            label: this.$t('myTicktes.Voice')
          },
          {
            value: '2',
            label: this.$t('myTicktes.EMail')
          },
          {
            value: '3',
            label: this.$t('myTicktes.Livechat')
          },
          {
            value: '4',
            label: this.$t('myTicktes.WhatsAPP')
          },
          {
            value: '5',
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
            value: '0',
            label: this.$t('myTicktes.Consulting')
          },
          {
            value: '1',
            label: this.$t('myTicktes.Opinion')
          },
          {
            value: '2',
            label: this.$t('myTicktes.Pipeline')
          }
        ],
        nextstep: '',
        nextstepArr: [],
        descMemo: ''
      },
      rules: {
        email: [
          { validator: validEmail,errorMsg:'Email format is incorrect', trigger: 'blur' }
        ]
      },
      rowList: {},
      isShowSave: true,
      isSaveDisabled: true,
      // 树选择
      isClearable: true,
      isAccordion: true,
      valueId: '',
      props: {
        value: 'id',
        label: 'departName',
        children: 'subDeparts'
      }
    }
  },
  watch: {
    userInfo: {
          handler(val, oldval) {
        // console.log('val',val)
        const arr=['ticketsTitle','firstName','lastName','incomingnumber','gender','reply','priority','ContactNumber','email','channel','country','state','city','servicetype','descMemo']
        if (arr.some(v => (!val[v]&&val[v]!==0)||(typeof val[v]==='string'&&!val[v].trim()) )) {
          this.isSaveDisabled=true
        } else {
          this.isSaveDisabled = false
        }
      },
      deep: true,
      immediate: true,
        },
    userData: {
          handler(val, oldval) {
            console.log('userData',val)
    this.userInfo = {
      ...this.userInfo,
      ...this.userData,
      incomingnumber:this.userData.primaryPhone,
      ContactNumber:this.userData.primaryPhone
    }
      },
      deep: true,
      immediate: true,
    },
    'userData.country': {
          handler(val, oldval) {
        console.log('country', val)
        if (val) {
          this.countryChange(val)
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
    // selectTree组件
    getTreeValue (value) {
      this.userInfo.nextstep = value
      this.isShowSave = false
    },
    getDeparts() {
      var that = this
      getDeparts().then((json) => {
        that.userInfo.nextstepArr = cloneDeep(json.data)
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
      const errorMsg=isValidateErrorMsg(this.userInfo,this.rules);
      if(errorMsg.length){
          return  this.$message({
          message:errorMsg[0],
          type: 'warning'
        })
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
        that.resetForm()
        console.log(json, 'add-tickets----======success')
      })
    },
    resetForm() {
      this.drawer = false
      this.userInfo = cloneDeep(this.deepUserInfo)
    },
    stagingForm() {
      this.drawer = false
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
      })
    },
    countryChange(val) {
      this.userInfo.state = ''
      this.userInfo.city = ''
      this.userInfo.stateArr = []
      this.userInfo.cityArr = []
      var data = 'State:' + val
      this.getCountry(data)
    },
    stateChange(val) {
      this.userInfo.city = ''
      this.userInfo.cityArr = []
      var data = 'City:' + val
      this.getCountry(data)
    },
    changeStepFunc(val) {
      this.isShowSave = false
    },
    buttonTest() {
      this.$emit('refreshParentList')
    },
    processedValue(fieldName) {
      this.userInfo[fieldName]=this.userInfo[fieldName].replace(/\s/g, '');
    },
    numberInput(fieldName) {
     this.userInfo[fieldName]=this.userInfo[fieldName].replace(/[^\d]/g, '');
    }
  }
}
</script>
<style scoped>
/**重写样式 -- start -- */
::v-deep .el-drawer__header {
  margin-bottom: 10px;
  padding: 0 20px;
  height: 60px;
  line-height: 60px;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 1px;
  color: #fff;
  background-image: linear-gradient(to right, #6759C2 , #6EAAD0);
}
::v-deep .el-drawer__close-btn {
  width: 26px;
  height: 26px;
  line-height: 26px;
  border-radius: 3px;
  background-color: rgba(255,255,255,0.3);
}
::v-deep .el-input--medium .el-input__inner {
  border: none;
  background-color: #f5f5f9;
}
::v-deep .el-input--medium .el-textarea__inner {
  border: none;
  background-color: #f5f5f9;
}
/**重写样式 -- end -- */

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
   height: 100%;
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
