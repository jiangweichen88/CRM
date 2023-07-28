<template>
  <div class="app-container" v-loading="listLoading">
    <el-row :gutter="10" class="add-page">
      <el-col :span="18" class="detail-left">
        <el-row :gutter="10">
          <el-col :span="8">
            <div class="top-header">
              <el-button type="text" icon="el-icon-arrow-left" @click="buttonTest"> {{ $t('myCustom.Back') }}</el-button>
              <div class="header-detail">
                <el-upload
                  :disabled="isEdit"
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
                  <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon" />
                </el-upload>
                <h3>{{ userInfo.firstName }}{{ userInfo.lastName }}</h3>
                <p>Type：{{ userInfo.customerTypeName }}</p>
                <p>Owner：{{ userInfo.ownerName }}</p>
                <el-row class="header-btn-group">
                  <el-tooltip class="item" effect="dark" placement="top">
                    <div slot="content">{{ $t('myCustom.Comingsoon') }}</div>
                    <el-button class="header-btn"><i class="el-icon-edit" /></el-button>
                  </el-tooltip>
                  <el-tooltip class="item" effect="dark" placement="top">
                    <div slot="content">{{ $t('myCustom.Comingsoon') }}</div>
                    <el-button class="header-btn"><i class="el-icon-edit" /></el-button>
                  </el-tooltip>
                  <el-button :disabled="this.rowList.ownerCode!==rolesInfo.id" class="header-btn" @click="editFunc"><i class="el-icon-edit" /></el-button>
                  <el-button :disabled="this.rowList.ownerCode!==rolesInfo.id" class="header-btn" @click="openDeleteDialog"><i class="el-icon-delete" /></el-button>
                </el-row>
              </div>
            </div>
          </el-col>
          <el-col :span="16">
            <div class="top-header" style="padding: 0 15px;">
              <h3 style="margin-left:10px">Overview</h3>
              <el-steps :active="stepsNum" align-center>
                <el-step :key="item.key" v-for="item in stepsArr">
                  <span slot="title">{{ item.title }}</span>
                  <div
                    slot="description"
                    v-if="item.time"
                    style="    position: absolute;    transform: translate(-50%);
    left: 50%;"
                  >
                    <div
                      style="white-space: nowrap;
    width: 104px;"
                    >
                      {{ $t('voice.UpdateDime') }}
                    </div>
                    <div
                      style="white-space: nowrap;
    width: 104px;"
                    >
                      {{item.time | parseTime('{y}-{m}-{d} {h}:{i}')}}
                    </div>
                  </div>
                </el-step>
              </el-steps>
            </div>
          </el-col>
        </el-row>
        <el-row class="user-content-detail">
          <el-col :span="24">
            <el-row :gutter="10">
              <el-col :span="10">
                <el-row>
                  <el-col :span="12">
                    <span class="user-content-text">{{ $t('myCustom.Firstname') }}</span>
                  </el-col>
                  <el-col :span="11">
                    <el-input @input="processedValue('firstName')" :disabled="isEdit" v-model="userInfo.firstName" />
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="10">
                <el-row>
                  <el-col :span="12">
                    <span class="user-content-text">{{ $t('myCustom.Lastname') }}</span>
                  </el-col>
                  <el-col :span="11">
                    <el-input @input="processedValue('lastName')" :disabled="isEdit" v-model="userInfo.lastName" />
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="10">
                <el-row>
                  <el-col :span="12">
                    <span class="user-content-text">{{ $t('myCustom.Gender') }}<span class="required">*</span></span>
                  </el-col>
                  <el-col :span="11">
                    <el-select v-model="userInfo.gender" :disabled="isEdit" style="width:100%;" :placeholder="$t('myCustom.PleaseSelect')">
                      <el-option v-for="item in userInfoListGrop.genderArr" :key="item.key" :label="item.value" :value="item.key" />
                    </el-select>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="10">
                <el-row>
                  <el-col :span="12">
                    <span class="user-content-text">{{ $t('myCustom.Company') }}</span>
                  </el-col>
                  <el-col :span="11">
                    <el-input :disabled="isEdit" v-model="userInfo.company" />
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="10">
                <el-row>
                  <el-col :span="12">
                    <span class="user-content-text">{{ $t('myCustom.Primaryphone') }}<span class="required">*</span></span>
                  </el-col>
                  <el-col :span="11">
                    <el-input @input="numberInput('primaryPhone')" :disabled="isEdit" v-model="userInfo.primaryPhone" />
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="10">
                <el-row>
                  <el-col :span="12">
                    <span class="user-content-text">{{ $t('myCustom.Altemate1') }}</span>
                  </el-col>
                  <el-col :span="11">
                    <el-input :disabled="isEdit" v-model="userInfo.altemate1" />
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="10">
                <el-row>
                  <el-col :span="12">
                    <span class="user-content-text">{{ $t('myCustom.Channel') }}<span class="required">*</span></span>
                  </el-col>
                  <el-col :span="11">
                    <el-select v-model="userInfo.channel" :disabled="isEdit" style="width:100%;" :placeholder="$t('myCustom.PleaseSelect')">
                      <el-option v-for="item in userInfoListGrop.channelArr" :key="item.key" :label="item.value" :value="item.key" />
                    </el-select>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="10">
                <el-row>
                  <el-col :span="12">
                    <span class="user-content-text">{{ $t('myCustom.Email') }}</span>
                  </el-col>
                  <el-col :span="11">
                    <el-input :disabled="isEdit" v-model="userInfo.email" />
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="10">
                <el-row>
                  <el-col :span="12">
                    <span class="user-content-text">{{ $t('myCustom.Greatetime') }}<span class="required">*</span></span>
                  </el-col>
                  <el-col :span="11">
                    <el-date-picker :disabled="true" v-model="userInfo.createTime" style="width:100%;" type="datetime" placeholder="" value-format="timestamp" />
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="10">
                <el-row>
                  <el-col :span="12">
                    <span class="user-content-text">{{ $t('myCustom.Customertype') }}<span class="required">*</span></span>
                  </el-col>
                  <el-col :span="11">
                    <el-select v-model="userInfo.customerType" :disabled="isEdit" style="width:100%;" :placeholder="$t('myCustom.PleaseSelect')">
                      <el-option v-for="item in userInfoListGrop.customerTypeArr" :key="item.key" :label="item.value" :value="item.key" />
                    </el-select>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="5">
                <span class="user-content-text">{{ $t('myCustom.Address') }}</span>
              </el-col>
              <el-col :span="14" style="margin-left:-2px;width:61%;">
                <el-input :disabled="isEdit" v-model="userInfo.address" />
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="10">
                <el-row>
                  <el-col :span="12">
                    <span class="user-content-text">{{ $t('myCustom.Country') }}<span class="required">*</span></span>
                  </el-col>
                  <el-col :span="11">
                    <el-select :disabled="isEdit" v-model="userInfo.country" style="width:100%;" :placeholder="$t('myCustom.PleaseSelect')" @change="countryChange">
                      <el-option v-for="item in userInfoListGrop.countryArr" :key="item.dictCode" :label="item.dictNm" :value="item.dictCode" />
                    </el-select>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="10">
                <el-row>
                  <el-col :span="12">
                    <span class="user-content-text">{{ $t('myCustom.City') }}</span>
                  </el-col>
                  <el-col :span="11">
                    <el-select v-model="userInfo.city" :disabled="isEdit" style="width:100%;" :placeholder="$t('myCustom.PleaseSelect')">
                      <el-option v-for="item in userInfoListGrop.cityArr" :key="item.dictCode" :label="item.dictNm" :value="item.dictCode" />
                    </el-select>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="10">
                <el-row>
                  <el-col :span="12">
                    <span class="user-content-text">{{ $t('myCustom.State') }}</span>
                  </el-col>
                  <el-col :span="11">
                    <el-select :disabled="isEdit" v-model="userInfo.state" style="width:100%;" :placeholder="$t('myCustom.PleaseSelect')" @change="stateChange">
                      <el-option v-for="item in userInfoListGrop.stateArr" :key="item.dictCode" :label="item.dictNm" :value="item.dictCode" />
                    </el-select>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="10">
                <el-row>
                  <el-col :span="12">
                    <span class="user-content-text">{{ $t('myCustom.ZIPcode') }}</span>
                  </el-col>
                  <el-col :span="11">
                    <el-input :disabled="isEdit" v-model="userInfo.zipCode" />
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="10">
                <el-row>
                  <el-col :span="12">
                    <span class="user-content-text">{{ $t('myCustom.Owner') }}<span class="required">*</span></span>
                  </el-col>
                  <el-col :span="11">
                    <el-select v-model="userInfo.owner" :disabled="isEdit" style="width:100%;" :placeholder="$t('myCustom.PleaseSelect')">
                      <el-option v-for="item in userInfoListGrop.ownerArr" :key="item.dictCode" :label="item.dictNm" :value="item.dictCode" />
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
                    <el-button type="primary" :disabled="isEdit" @click="editSaveCustomer">Save</el-button>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="6" class="detail-right">
        <el-collapse v-model="activeNames" @change="handleChange">
          <!-- Sales Stage -->
          <SalesStage :salesStageList="salesStageList" :detailSalesStageListData="detailSalesStageListData" :customerId="this.rowList.id" @getDetailSalesStageList="getDetailSalesStageList" />
          <!-- Ticketds -->
          <Ticketds :ticketsList="ticketsList" :rowList="this.rowList" :userData="userInfo" @getMyTicketList="getMyTicketList" />
          <!-- Recent communrications -->
          <RecentCommunrications :callLogList="callLogList" />
        </el-collapse>
      </el-col>
    </el-row>
    <!-- 删除Dialog -->
    <el-dialog :title="$t('myCustom.Tip')" width="20%" :visible.sync="deleteVisible" :close-on-click-modal="false" :close-on-press-escape="false" center>
      <div style="text-align: center;">{{ $t('myCustom.delTip') }}</div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDeleteDialog">{{ $t('myCustom.cancel') }}</el-button>
        <el-button type="primary" @click="deleteDialog">{{ $t('myCustom.confirm') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export { parseTime } from '@/utils'
import { cloneDeep } from 'lodash-es'
import { getMyTicketList ,getAllTicketList} from '@/api/tickets'

import { getAutoField, getDictionary, getCallLogList } from '@/api/commonApi'
import { customerDetail, editSaveCustomer, delCustomer, detailSalesStageAdd, detailSalesStageList } from '@/api/allCustomer'
import SalesStage from "@/components/common/SalesStage"
import Ticketds from "@/components/common/Ticketds"
import RecentCommunrications from "@/components/common/RecentCommunrications.vue";

export default {
  name: 'AddCustomer',
  components: { SalesStage, Ticketds, RecentCommunrications },
  data() {
    return {
      listLoading: true,
      isEdit: true,
      deleteVisible: false,
      stepsNum: -1,
      stepsArrClone:[
        {key:"0",title: this.$t('voice.Lead'),time:"" },
        {key:"1",title: this.$t('voice.Pipeline') ,time:""},
        {key:"2",title: this.$t('voice.Upside') ,time:""},
        {key:"3",title: this.$t('voice.Commit') ,time:""},
        {key:"4",title: this.$t('voice.Cancel') ,time:""},
        {key:"5",title: this.$t('voice.Booked') ,time:""},
        {key:"6",title: this.$t('voice.Customer'),time:"" }
      ],
      stepsArr:[
        {key:"0",title: this.$t('voice.Lead'),time:"" },
        {key:"1",title: this.$t('voice.Pipeline') ,time:""},
        {key:"2",title: this.$t('voice.Upside') ,time:""},
        {key:"3",title: this.$t('voice.Commit') ,time:""},
        {key:"4",title: this.$t('voice.Cancel') ,time:""},
        {key:"5",title: this.$t('voice.Booked') ,time:""},
        {key:"6",title: this.$t('voice.Customer'),time:"" }
      ],
      showAddDetail: false,
      fileList: [],
      urlImpot: this.$common.getJavaServerURI() + 'sale/file?tableNm=nbs_customer&businessType=headImage', // 上传文件地址
      imageUrl: '',
      userInfo: {
        headImage: '',
        firstName: '',
        lastName: '',
        gender: '',
        company: '',
        primaryPhone: '',
        altemate1: '',
        channel: '',
        email: '',
        createTime: '',
        customerType: '',
        customerTypeName:'',
        address: '',
        country: '',
        city: '',
        state: '',
        zipCode: '',
        owner: '',
        ownerName: '',
        salesStage: '',
        intention: '',
        description: ''
      },
      userInfoListGrop: {
        genderArr: [],
        channelArr: [],
        countryArr: [],
        cityArr: [],
        stateArr: [],
        ownerArr: [],
        customerTypeArr: []
      },
      rules: {
        firstName: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      activeNames: ['1'],
      salesStageVisible: false,
      recentVisible: false,
      salesStageArr: [],
      intentionArr: [],
      percentVisible: false,
      callFromData: {
        beginTime:'',
        calling: '78',
        called: 'ww',
        direction: 'ww',
        callid: 'w',
        record: 'click to download',
        ringduration: 'Ring duration',
        queueduration: 'Queue duration',
        hanguptime: 'Hang up time',
        answertime: 'Answer time:',
        audioSrc: ''
      },
      salesStageList: [],
      rowList: {},
      customDetailList: {},
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
      ticketsList: [],
      callLogList: [],
      isGreate:true,
      detailSalesStageListData:null,
      zone: '',
      rolesInfo:{}
    }
  },
  created() {
    this.stepsArr = cloneDeep(this.stepsArrClone)
    this.rolesInfo = JSON.parse(localStorage.getItem('rolesInfo'))
  },
  methods: {
    processedValue(fieldName) {
      this.userInfo[fieldName]=this.userInfo[fieldName].replace(/\s/g, '');
    },
    numberInput(fieldName) {
     this.userInfo[fieldName]=this.userInfo[fieldName].replace(/[^\d]/g, '');
    },
    initData(row) {
      this.rowList = row
      this.isEdit = true

      var that = this
      Promise.all([
        customerDetail(row.id).then((json) => {
          that.customDetailList = json.data
          that.imageUrl = json.data.headImage
          that.userInfo.headImage = json.data.headImageId
          that.userInfo.gender = json.data.genderCode
          that.userInfo.channel = json.data.channelCode
          that.userInfo.customerType = json.data.customerTypeCode
          that.userInfo.customerTypeName = json.data.customerType
          that.userInfo.country = json.data.countryCode
          that.userInfo.city = json.data.cityCode
          that.userInfo.state = json.data.stateCode
          that.userInfo.owner = json.data.ownerCode
          that.userInfo.ownerName = json.data.owner
          that.userInfo.firstName = json.data.firstName
          that.userInfo.lastName = json.data.lastName
          that.userInfo.primaryPhone = json.data.primaryPhone
          that.userInfo.altemate1 = json.data.altemate1
          that.userInfo.email = json.data.email
          that.userInfo.createTime = json.data.createTime
          that.userInfo.address = json.data.address
          that.userInfo.zipCode = json.data.zipCode
          that.userInfo.company = json.data.company
          // that.userInfo = json.data
        }),
        this.getAutoFieldFunc(),
        this.getCountry('Country'),
        this.countryChange(row.countryCode),
        this.stateChange(row.stateCode),
        this.getCountry('userId'),
        this.getDetailSalesStageList(row.id),
        this.getMyTicketList(),
        this.getCallLogList()
      ]).then(() => {
        that.listLoading = false
      })
    },
    editFunc() {
      this.isEdit = false
    },
    editSaveCustomer() {
      editSaveCustomer(this.userInfo, this.rowList.id).then((json) => {
        if (json.code === 200) {
          this.$message.success(json.message)
        } else {
          this.$message.error(json.message)
        }
      })
    },
    detailSaleChange(){
      this.isGreate = !this.isGreate
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
      });
    },
    getAutoFieldFunc(salesStageCode) {
      var that = this
      getAutoField('10000004').then((json) => {
        var data = json.data
        for (let i = 0; i < data.length; i++) {
          var item = data[i]
          if (item.options) {
            item.options = JSON.parse(item.options)
          }
          if (data[i].showNm === 'Gender') {
            that.userInfoListGrop.genderArr = data[i].options
          }
          if (data[i].showNm === 'Channel') {
            that.userInfoListGrop.channelArr = data[i].options
          }
          if (data[i].showNm === 'Customer type') {
            that.userInfoListGrop.customerTypeArr = data[i].options
          }
          if (data[i].showNm === 'Stage') {
            that.salesStageArr = data[i].options
            that.salesStageArr.forEach((item, index) => {
              if (index + 1 < salesStageCode) {
                item.disabled = true
              } else {
                item.disabled = false
              }
            })
          }
          if (data[i].showNm === 'Intention') {
            that.intentionArr = data[i].options
          }
        }
      })
    },
    getCountry(data) {
      var that = this
      getDictionary(data).then((json) => {
        var list = json.data
        if (data === 'Country') {
          that.userInfoListGrop.countryArr = list
        }
        if (data === 'userId') {
          that.userInfoListGrop.ownerArr = list
        }
        if (data.indexOf('State') !== -1) {
          that.userInfoListGrop.stateArr = list
        }
        if (data.indexOf('City') !== -1) {
          that.userInfoListGrop.cityArr = list
        }
      })
    },
    countryChange(val) {
      var data = 'State:' + val
      this.getCountry(data)
    },
    stateChange(val) {
      var data = 'City:' + val
      this.getCountry(data)
    },
    getMyTicketList() {
      // 此位置是否分页待定
      var data = {
        'pageNo': 1,
        'pageSize': 20,
        customerId:this.rowList.id
      }
      var that = this
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
      // })
      getAllTicketList(data).then((res) => {
        that.ticketsList = res.data.records||[]
      }).catch((err) => {
        that.ticketsList = []
      })
    },
    getCallLogList() {
      var that = this
      getCallLogList(this.rowList.primaryPhone).then((json) => {
        that.callLogList = json.data.records
      })
    },
    // 子组件取消或保存时刷新的方法
    refreshParentList: function(data) {
      this.showAddDetail = false
      this.getMyTicketList()
    },
    handleChange(val) {
      console.log(val)
    },
    handleAvatarChange(val) {
      // this.fileList = val
      console.log(val)
    },
    handleAvatarRemove() {
      this.imageUrl = ''
    },
    handleAvatarSuccess(res, file) {
      const isJPG = file.raw.type === 'image/jpeg';
      const isPNG = file.raw.type === 'image/png';

      if (!isJPG && !isPNG) {
        this.fileList = []
        this.$message.error('Image format is JPG PNG and PNG!');
        return
      }

      if (res.code !== 200) {
        this.fileList = []
        this.$message.error(res.message);
        return
      }
      this.userInfo.headImage = res.data.id

      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
    },
    buttonTest() {
      this.imageUrl = ''
      this.fileList = []
      this.stepsArr = cloneDeep(this.stepsArrClone)
      this.$emit('refreshParentList')
    },
    openDeleteDialog() {
      this.deleteVisible = true
    },
    closeDeleteDialog() {
      this.deleteVisible = false
    },
    deleteDialog() {
      var that = this
      delCustomer(that.rowList.id).then((res) => {
        if (res.code === 200) {
          that.$emit('refreshParentList')
          this.deleteVisible = false
          this.$message({
            type: 'success',
            message: res.message
          })
        }
      })

      // this.$confirm(this.$t('myCustom.delTip'), this.$t('myCustom.Tip'), {
      //   confirmButtonText: this.$t('myCustom.confirm'),
      //   cancelButtonText: this.$t('myCustom.cancel'),
      //   type: 'warning'
      // }).then(() => {
      //   delCustomer(that.rowList.id).then((json) => {
      //     that.$emit('refreshParentList')
      //   })
      // }).catch(() => {
      // })
    }
  }
}
</script>
<style scoped>
 /deep/ .saleGroup .el-input__inner{
   border:none;
   background:#FBFBFD ;
   color:#000;
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
 .required {
   font-size: 13px;
   color: #FF0000;
 }
 .collapse-title {
     flex: 1 0 90%;
     order: 1;
 }
 .el-collapse-item__wrap {
   height: 300px;
   overflow: auto;
 }
 .el-collapse-item__header {
     flex: 1 0 auto;
     order: -1;
 }
 .header-detail{
   width: 100%;
   text-align: center;
 }
 .header-detail h3,.header-detail p{
   margin: 0px;
 }
 .header-btn-group{
   margin-top: 30px;
   float: right;
 }
 .header-btn{
   margin:0px;
   padding:0px;
   width:20px;
   height:20px;
   border:none
 }
 .avatar-uploader .el-upload {
   border: 1px dashed #d9d9d9;
   border-radius: 6px;
   cursor: pointer;
   position: relative;
   overflow: hidden;
 }
 .avatar-uploader .el-upload:hover {
   border-color: #409EFF;
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
 .avatar {
   width: 50px;
   height: 50px;
   display: block;
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
 .detail-right{
   height: 100%;
 }
 .user-content-detail{
   height: 100%;
   border: 1px solid #ccc;
   padding: 10px;
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
   overflow-y: auto;
 }
 .right-recent{
   border: none;
 }
 .right-recent:hover{
   cursor:pointer
 }
 .salesMemo{
   margin-top:10px;
 }
 .percent-detail{
   border: 1px solid #ccc;
   padding: 10px;
   margin-bottom: 10px;
 }
</style>
