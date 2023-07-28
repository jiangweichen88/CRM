<template>
  <div class="edit-drawer">
    <el-drawer size="40%"  :visible.sync="dialogVisible" :close-on-press-escape="false" :wrapperClosable="false" :before-close="handleClose">
      <span slot="title">{{ $t('myTicktes.Ticketdate') }}</span>
      <div class="add-page">
        <el-row>
          <el-col :span="6">
            <span class="user-content-text">{{ $t('myTicktes.TicketsTitle') }}</span>
          </el-col>
          <el-col :span="14" style="width:71%;">
            <el-input v-model="userInfo.ticketsTitle" disabled />
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-row>
              <el-col :span="12">
                <span class="user-content-text">{{ $t('myTicktes.Firstname') }}</span>
              </el-col>
              <el-col :span="12">
                <el-input v-model="userInfo.firstName" disabled />
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="11">
            <el-row>
              <el-col :span="9">
                <span class="user-content-text">{{ $t('myTicktes.Lastname') }}</span>
              </el-col>
              <el-col :span="15">
                <el-input v-model="userInfo.lastName" disabled />
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-row>
              <el-col :span="12">
                <span class="user-content-text">{{ $t('myTicktes.incomingnumber') }}</span>
              </el-col>
              <el-col :span="12">
                <el-input v-model="userInfo.incomingNumber" disabled />
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="11">
            <el-row>
              <el-col :span="9">
                <span class="user-content-text">{{ $t('myTicktes.Gender') }}</span>
              </el-col>
              <el-col :span="15">
                <el-select v-model="userInfo.gender" style="width:100%;" disabled :placeholder="$t('myTicktes.PleaseSelect')">
                  <el-option v-for="item in userInfo.genderArr" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-row>
              <el-col :span="12">
                <span class="user-content-text">{{ $t('myTicktes.Reply') }}</span>
              </el-col>
              <el-col :span="12">
                <el-select v-model="userInfo.reply" style="width:100%;" disabled :placeholder="$t('myTicktes.PleaseSelect')">
                  <el-option v-for="item in userInfo.replyArr" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="11">
            <el-row>
              <el-col :span="9">
                <span class="user-content-text">{{ $t('myTicktes.Priority') }}</span>
              </el-col>
              <el-col :span="15">
                <el-select v-model="userInfo.priority" style="width:100%;" disabled :placeholder="$t('myTicktes.PleaseSelect')">
                  <el-option v-for="item in userInfo.priorityArr" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-row>
              <el-col :span="12">
                <span class="user-content-text">{{ $t('myTicktes.ContactNumber') }}</span>
              </el-col>
              <el-col :span="12">
                <el-input @input="numberInput('contactNumber')" v-model="userInfo.contactNumber" disabled />
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="11">
            <el-row>
              <el-col :span="9">
                <span class="user-content-text">{{ $t('myTicktes.Email') }}</span>
              </el-col>
              <el-col :span="15">
                <el-input v-model="userInfo.email" disabled />
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-row>
              <el-col :span="12">
                <span class="user-content-text">{{ $t('myTicktes.Channel') }}</span>
              </el-col>
              <el-col :span="12">
                <el-select v-model="userInfo.channel" style="width:100%;" disabled :placeholder="$t('myTicktes.PleaseSelect')">
                  <el-option v-for="item in userInfo.channelArr" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="11">
            <el-row>
              <el-col :span="9">
                <span class="user-content-text">{{ $t('myTicktes.Country') }}</span>
              </el-col>
              <el-col :span="15">
                <el-select v-model="userInfo.country" style="width:100%;" disabled :placeholder="$t('myTicktes.PleaseSelect')">
                  <el-option v-for="item in userInfo.countryArr" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-row>
              <el-col :span="12">
                <span class="user-content-text">{{ $t('myTicktes.Servicetype') }}</span>
              </el-col>
              <el-col :span="12">
                <el-select v-model="userInfo.servicetype" style="width:100%;" disabled :placeholder="$t('myTicktes.PleaseSelect')">
                  <el-option v-for="item in userInfo.servicetypeArr" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="11">
            <el-row>
              <el-col :span="9">
                <span class="user-content-text">{{ $t('myTicktes.City') }}</span>
              </el-col>
              <el-col :span="15">
                <el-select v-model="userInfo.city" style="width:100%;" disabled :placeholder="$t('myTicktes.PleaseSelect')">
                  <el-option v-for="item in userInfo.cityArr" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <span class="user-content-text">{{ $t('myTicktes.Description') }}</span>
          </el-col>
          <el-col :span="14" style="width:71%;">
            <el-input
              v-model="userInfo.description"
              type="textarea"
              disabled
              :placeholder="$t('myTicktes.Saysomething')"
              maxlength="300"
              rows="5"
              show-word-limit
              class="descMemo"
              style="width:100%"
            />
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-row>
              <el-col :span="12">
                <span class="user-content-text">{{ $t('myTicktes.Nextstep') }}</span>
              </el-col>
              <el-col :span="12">
                <!-- <el-select v-model="userInfo.nextstep" style="width:100%;" :placeholder="$t('myTicktes.PleaseSelect')" :disabled="isCanCelectSubmit||isBtnDisabled">
                  <el-option v-for="item in userInfo.nextstepArr" :key="item.id" :label="item.departName" :value="item.id" />
                </el-select> -->
                <select-tree
                  style="width:100%"
                  :props="props"
                  :options="userInfo.nextstepArr"
                  :value="valueId"
                  :clearable="isClearable"
                  :accordion="isAccordion"
                  :isCanCelectSubmit="isCanCelectSubmit"
                  :isBtnDisabled="isBtnDisabled"
                  @getValue="getTreeValue($event)"
                ></select-tree>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <span class="user-content-text">{{ $t('myTicktes.Description') }}</span>
          </el-col>
          <el-col :span="14" style="width:71%;">
            <el-input v-model="descMemo" type="textarea" :placeholder="$t('myTicktes.Saysomething')" maxlength="300" rows="5" show-word-limit class="descMemo" style="width:100%" />
          </el-col>
        </el-row>
        <el-row style="margin-left: 50px;">
          <el-col :span="5">
            <el-button type="primary" class="btn-icon" @click="submitTicketRepliesFunc">Submit</el-button>
          </el-col>
          <el-col :span="5" v-if="!isCanCelectSubmit && !isBtnDisabled">
            <el-button :disabled="isBtnDisabled" type="primary" class="btn-icon" @click="sentTicketListFunc">Sent</el-button>
          </el-col>
          <el-col :span="5">
            <el-button :disabled="isBtnDisabled" type="primary" class="btn-icon" @click="endTicketFunc">End</el-button>
          </el-col>
        </el-row>
        <div style="margin-bottom: 30px;padding: 20px;">
          <h4>{{ $t('myTicktes.History') }}({{ activities.length }})</h4>
          <el-timeline :reverse="reverse">
            <el-timeline-item v-for="(activity, index) in activities" :key="index" placement="top" :timestamp="activity.createDate">
              <el-card>
                <h4>{{ activity.realname}}</h4>
                <p>{{ activity.taskOpinion }}</p>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import SelectTree from '@/components/common/selectTree.vue'
import { cloneDeep } from 'lodash-es'
import { parseTime } from '@/utils'
import { getDeparts } from '@/api/commonApi'
import { getTicketItem, sentTicketList, submitTicketReplies, getSubmitTicketReplies, endTicket } from '@/api/tickets'
export default {
  name: 'EditTickets',
  components: { SelectTree },
  data() {
    return {
      reverse: true,
      isCanCelectSubmit: true,
      dialogVisible: false,
      activities: [],
      imageUrl: '',
      userInfo: {
        ticketsTitle: '',
        firstName: '',
        lastName: '',
        gender: '',
        genderArr: [{
          value: 0,
          label: this.$t('myCustom.Male')
        }, {
          value: 1,
          label: this.$t('myCustom.Female')
        }, {
          value: 2,
          label: this.$t('myCustom.Other')
        }],
        channel: '',
        channelArr: [
          {
            value: 0,
            label: this.$t('myCustom.Voice')
          },
          {
            value: 1,
            label: this.$t('myCustom.EMail')
          },
          {
            value: 2,
            label: this.$t('myCustom.Livechat')
          },
          {
            value: 3,
            label: this.$t('myCustom.WhatsAPP')
          },
          {
            value: 4,
            label: this.$t('myCustom.Other')
          }
        ],
        reply: '',
        replyArr: [{
          value: 1,
          label: this.$t('myTicktes.Yes')
        }, {
          value: 0,
          label: this.$t('myTicktes.No')
        }],
        priority: '',
        email: '',
        country: '',
        countryArr: [],
        servicetype: '',
        city: '',
        cityArr: [],
        state: '',
        stateArr: []
      },
      rules: {
        firstName: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      descMemo: '',
      rowList: {},
      rolesInfo: {},
      ticketStatus: '',
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
  computed: {
    isBtnDisabled() {
      return this.ticketStatus===2
    }
  },
  created() {
    console.log(this.rolesInfo, '$store.getters.rolesInfo')
    this.rolesInfo = JSON.parse(localStorage.getItem('rolesInfo'))
  },
  methods: {
       numberInput(fieldName) {
     this.userInfo[fieldName]=this.userInfo[fieldName].replace(/[^\d]/g, '');
    },
    initSubmitStatus() {
      // if (this.rolesInfo.departIds.indexOf(/,/) !== -1) {
      //   this.rolesInfo.departIds = this.rolesInfo.departIds.split(',')
      // }
      console.log(this.rolesInfo,'this.rolesInfo');
      if (this.rolesInfo.id === this.rowList.ownerId ) {
        this.isCanCelectSubmit = false
      } else if (!this.rowList.ownerGroupId) {
        this.isCanCelectSubmit = true
      } else if (!this.rolesInfo.departIds) {
        this.isCanCelectSubmit = true
      }else if (this.rolesInfo.departIds.indexOf(this.rowList.ownerGroupId) !== -1) {
        this.isCanCelectSubmit = false
      }
    },
    initData(row) {
      this.rowList = row
      this.dialogVisible = true
      var that = this
      this.initSubmitStatus()
      this.getDeparts()
      this.getSubmitTicketReplies()
      getTicketItem(this.rowList.id).then((json) => {
        var data = json.data
        that.userInfo.ticketsTitle = data.title
        that.userInfo.firstName = data.firstName
        that.userInfo.lastName = data.lastName
        that.userInfo.incomingNumber = data.incomingNumber
        that.userInfo.gender = data.gender
        that.userInfo.reply = data.needReply
        that.userInfo.priority = data.priorityName
        that.userInfo.contactNumber = data.contactNumber
        that.userInfo.email = data.email
        that.userInfo.channel = data.channelName
        that.userInfo.country = data.countyName
        that.userInfo.servicetype = data.serviceTypeName
        that.userInfo.city = data.cityName
        that.userInfo.description = data.description

        this.ticketStatus = data.ticketStatus
      })
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
    submitTicketRepliesFunc() {
      if (this.descMemo) {
        var data = {
          ticketId: this.rowList.id,
          taskOpinion: this.descMemo
        }
        var that = this
        submitTicketReplies(this.rowList.id, data).then((json) => {
          that.getSubmitTicketReplies()
        })
      }
    },
    sentTicketListFunc() {
      var that = this
      if (!that.userInfo.nextstep) {
        return
      }
      var targetGroupId = { 'targetGroupId': that.userInfo.nextstep }
      sentTicketList(this.rowList.id, targetGroupId).then((json) => {
        that.dialogVisible = false
        that.$emit('refreshParentList')
      })
    },
    getSubmitTicketReplies() {
      var that = this
      getSubmitTicketReplies(this.rowList.id).then((json) => {
        var data = json.data
        for (let i = 0; i < data.length; i++) {
          data[i].createDate = parseTime(data[i].createDate)
          data[i].realname = data[i].owner.realname
        }
        that.activities = json.data
      })
    },
    endTicketFunc() {
      var that = this
      endTicket(this.rowList.id).then((json) => {
        that.dialogVisible = false
        that.$emit('refreshParentList')
      })
    },
    handleClose(done) {
      this.dialogVisible = false
      this.userInfo.nextstep = ''
      this.descMemo = ''
    },
    buttonTest() {
      this.$emit('refreshParentList')
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
::v-deep .el-input.is-disabled .el-input__inner {
  border: none;
  background-color: #fff;
  color: #000;
}
::v-deep .el-input--medium .el-textarea__inner {
  border: none;
  background-color: #f5f5f9;
}
::v-deep .el-textarea.is-disabled .el-textarea__inner {
  border: none;
  background-color: #fff;
  color: #000;
}
::v-deep .el-select .el-input .el-select__caret {
  color: #fff;
}
/**重写样式 -- end -- */

 .btn-icon{
   width:80px;
 }
 .required {
   font-size: 13px;
   color: #FF0000;
 }
 .header-detail{
   width: 100%;
   text-align: center;
 }
 .top-header{
   height: 200px;
   border: 1px solid #ccc;
 }
 .detail-right{
   height: 100%;
 }
 .add-page{
   width: 100%;
   height: 82%;
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
   color: #999;
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
 .percent-detail{
   border: 1px solid #ccc;
   padding: 10px;
   margin-bottom: 10px;
 }
</style>
