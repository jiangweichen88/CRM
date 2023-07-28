<template>
  <div class="edit-drawer">
    <el-drawer size="50%" :visible.sync="drawer">
      <span slot="title">{{ $t('myCustom.Greatecontact') }}</span>
      <div class="add-page">
        <el-row>
          <div class="header-detail">
            <el-upload
              class="avatar-uploader"
              :file-list="fileList"
              :on-remove="handleRemove"
              :action="urlImpot"
              :on-change="handleChange"
              :show-file-list="true"
              :limit="1"
              :before-upload="beforeAvatarUpload"
              :on-success="handleAvatarSuccess"
              :headers="{
                'X-Access-Token': $store.getters.token,
              }"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
            <!-- <p style="margin-top: 10px;">Type：</p>
            <p>Owner：</p> -->
          </div>
        </el-row>

        <div class="title-style">{{ $t('myCustom.SalesStage') }}</div>
        <div class="sales-top-box">
          <div class="sales-top-item">
            <span class="sales-top-text">{{ $t('myCustom.SalesStage') }}<span class="required">*</span><br /></span>
            <el-select class="sales-top-select" v-model="userInfo.salesStage" :placeholder="$t('myCustom.PleaseSelect')" clearable>
              <el-option v-for="item in salesStageArr" :key="item.key" :label="item.value" :value="item.key" />
            </el-select>
          </div>
          <div class="sales-top-item">
            <span class="sales-top-text">{{ $t('myCustom.Intention') }}<span class="required">*</span><br /></span>
            <el-select class="sales-top-select" v-model="userInfo.intention" :placeholder="$t('myCustom.PleaseSelect')" clearable>
              <el-option v-for="item in intentionArr" :key="item.key" :label="item.value" :value="item.key" />
            </el-select>
          </div>
        </div>
        <el-input
          v-model="userInfo.description"
          type="textarea"
          :placeholder="$t('myCustom.Describe')"
          maxlength="300"
          :autosize="{ minRows: 4, maxRows: 4 }"
          show-word-limit
          class="salesMemo"
        />

        <div class="title-style">Information</div>
        <el-row>
          <el-col :span="12">
            <el-row>
              <el-col :span="9">
                <span class="user-content-text">{{ $t('myCustom.Firstname') }}</span>
              </el-col>
              <el-col :span="14">
                <el-input @input="processedValue('firstName')" v-model="userInfo.firstName" />
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-row>
              <el-col :span="9">
                <span class="user-content-text">{{ $t('myCustom.Lastname') }}</span>
              </el-col>
              <el-col :span="14">
                <el-input @input="processedValue('lastName')" v-model="userInfo.lastName" />
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-row>
              <el-col :span="9">
                <span class="user-content-text">{{ $t('myCustom.Gender') }}<span class="required">*</span></span>
              </el-col>
              <el-col :span="14">
                <el-select v-model="userInfo.gender" style="width:100%;" :placeholder="$t('myCustom.PleaseSelect')">
                  <el-option v-for="item in userInfoListGrop.genderArr" :key="item.key" :label="item.value" :value="item.key" />
                </el-select>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-row>
              <el-col :span="9">
                <span class="user-content-text">{{ $t('myCustom.Company') }}</span>
              </el-col>
              <el-col :span="14">
                <el-input v-model="userInfo.company" />
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-row>
              <el-col :span="9">
                <span class="user-content-text">{{ $t('myCustom.Primaryphone') }}<span class="required">*</span></span>
              </el-col>
              <el-col :span="14">
                <el-input @input="numberInput('primaryPhone')" v-model="userInfo.primaryPhone" />
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-row>
              <el-col :span="9">
                <span class="user-content-text">{{ $t('myCustom.Altemate1') }}</span>
              </el-col>
              <el-col :span="14">
                <el-input v-model="userInfo.altemate1" />
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-row>
              <el-col :span="9">
                <span class="user-content-text">{{ $t('myCustom.Channel') }}<span class="required">*</span></span>
              </el-col>
              <el-col :span="14">
                <el-select v-model="userInfo.channel" style="width:100%;" :placeholder="$t('myCustom.PleaseSelect')">
                  <el-option v-for="item in userInfoListGrop.channelArr" :key="item.key" :label="item.value" :value="item.key" />
                </el-select>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-row>
              <el-col :span="9">
                <span class="user-content-text">{{ $t('myCustom.Email') }}</span>
              </el-col>
              <el-col :span="14">
                <el-input v-model="userInfo.email" />
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-row>
              <el-col :span="9">
                <span class="user-content-text">{{ $t('myCustom.Greatetime') }}<span class="required">*</span></span>
              </el-col>
              <el-col :span="14">
                <el-date-picker :disabled="true" v-model="userInfo.createTime" style="width:100%;" type="datetime" placeholder="" value-format="timestamp" />
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-row>
              <el-col :span="9">
                <span class="user-content-text">{{ $t('myCustom.Customertype') }}<span class="required">*</span></span>
              </el-col>
              <el-col :span="14">
                <el-select v-model="userInfo.customerType" style="width:100%;" :placeholder="$t('myCustom.PleaseSelect')">
                  <el-option v-for="item in userInfoListGrop.customerTypeArr" :key="item.key" :label="item.value" :value="item.key" />
                </el-select>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4" style="margin-left: 15px;">
            <span class="user-content-text">{{ $t('myCustom.Address') }}</span>
          </el-col>
          <el-col :span="19">
            <el-input v-model="userInfo.address" />
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-row>
              <el-col :span="9">
                <span class="user-content-text">{{ $t('myCustom.Country') }}<span class="required">*</span></span>
              </el-col>
              <el-col :span="14">
                <el-select v-model="userInfo.country" style="width:100%;" :placeholder="$t('myCustom.PleaseSelect')" @change="countryChange">
                  <el-option v-for="item in userInfoListGrop.countryArr" :key="item.dictCode" :label="item.dictNm" :value="item.dictCode" />
                </el-select>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-row>
              <el-col :span="9">
                <span class="user-content-text">{{ $t('myCustom.State') }}</span>
              </el-col>
              <el-col :span="14">
                <el-select v-model="userInfo.state" style="width:100%;" :placeholder="$t('myCustom.PleaseSelect')" @change="stateChange">
                  <el-option v-for="item in userInfoListGrop.stateArr" :key="item.dictCode" :label="item.dictNm" :value="item.dictCode" />
                </el-select>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-row>
              <el-col :span="9">
                <span class="user-content-text">{{ $t('myCustom.City') }}</span>
              </el-col>
              <el-col :span="14">
                <el-select v-model="userInfo.city" style="width:100%;" :placeholder="$t('myCustom.PleaseSelect')">
                  <el-option v-for="item in userInfoListGrop.cityArr" :key="item.dictCode" :label="item.dictNm" :value="item.dictCode" />
                </el-select>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-row>
              <el-col :span="9">
                <span class="user-content-text">{{ $t('myCustom.ZIPcode') }}</span>
              </el-col>
              <el-col :span="14">
                <el-input v-model="userInfo.zipCode" />
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-row>
              <el-col :span="9">
                <span class="user-content-text">{{ $t('myCustom.Owner') }}<span class="required">*</span></span>
              </el-col>
              <el-col :span="14">
                <el-select v-model="userInfo.owner" style="width:100%;" :placeholder="$t('myCustom.PleaseSelect')">
                  <el-option v-for="item in userInfoListGrop.ownerArr" :key="item.dictCode" :label="item.dictNm" :value="item.dictCode" />
                </el-select>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-row>
              <el-col :span="9">
                <span class="user-content-text" />
              </el-col>
              <el-col :span="14">
                <el-button type="primary" :disabled="isSaveDisabled" @click="addCustomerFunc">Save</el-button>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { getDictionary } from '@/api/commonApi'
import { addCustomer } from '@/api/allCustomer'
import {isValidateErrorMsg} from '@/utils'
import { validEmail } from '@/utils/validate'
export default {
  name: 'AddCustomer',
  data() {
    return {
      isSaveDisabled: true,
      fileList: [],
      urlImpot: this.$common.getJavaServerURI() + 'sale/file?tableNm=nbs_customer&businessType=headImage', // 上传文件地址
      drawer: false,
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
        createTime: new Date().getTime(),
        customerType: '',
        address: '',
        country: 'United States of America',
        city: '',
        state: '',
        zipCode: '',
        owner: '',
        salesStage: '',
        intention: '',
        description: ''

      },
      listText: '44',
      listArr: [
        { key: 1, value: '123' },
        { key: 2, value: '44' },
        { key: 3, value: '55' }
      ],
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
        email: [
          { validator: validEmail,errorMsg:'Email format is incorrect', trigger: 'blur' }
        ]
      },
      activeNames: ['1'],
      salesStageVisible: false,
      recentVisible: false,
      salesStageArr: [],
      intentionArr: [],
      percentVisible: false

    }
  },
    watch: {
    userInfo: {
      handler(val, oldval) {
        const arr=['gender','primaryPhone','channel','createTime','customerType','country','owner','salesStage','intention']
        if (arr.some(v=>(!!!val[v]&&val[v]!==0)||(typeof val[v]==='string'&&!val[v].trim())  )) {
           this.isSaveDisabled=true
        }else{
          this.isSaveDisabled=false
        }
      },
      immediate: true,
      deep: true,
    },
  },
  created() {
  },
  methods: {
    processedValue(fieldName) {
      this.userInfo[fieldName]=this.userInfo[fieldName].replace(/\s/g, '');
    },
    numberInput(fieldName) {
     this.userInfo[fieldName]=this.userInfo[fieldName].replace(/[^\d]/g, '');
    },
    clearData() {
      this.imageUrl = ''
      this.fileList = []
      this.userInfo = {
        headImage: '',
        firstName: '',
        lastName: '',
        gender: '',
        company: '',
        primaryPhone: '',
        altemate1: '',
        channel: '',
        email: '',
        createTime: new Date().getTime(),
        customerType: '',
        address: '',
        country: '',
        city: '',
        state: '',
        zipCode: '',
        owner: '',
        salesStage: '',
        intention: '',
        description: ''
      }
    },
    initData(data) {
      this.clearData()
      var that = this
      for (let i = 0; i < data.length; i++) {
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
        }
        if (data[i].showNm === 'Intention') {
          that.intentionArr = data[i].options
        }
      }
      console.log(data, 'add-data')
      this.drawer = true
      this.getCountry('Country')
      this.getCountry('userId')
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
      this.userInfo.state = ''
      this.userInfo.city = ''
      this.userInfoListGrop.stateArr = []
      this.userInfoListGrop.cityArr = []
      var data = 'State:' + val
      this.getCountry(data)
    },
    stateChange(val) {
      this.userInfo.city = ''
      this.userInfoListGrop.cityArr = []
      var data = 'City:' + val
      this.getCountry(data)
    },
    // save
    addCustomerFunc() {
      var that = this
      if(this.userInfo.email){
        const errorMsg=isValidateErrorMsg(this.userInfo,this.rules);
        if(errorMsg.length){
            return  this.$message({
            message:errorMsg[0],
            type: 'warning'
          })
        }
      }
      this.userInfo.createTime=new Date().getTime()
      addCustomer(this.userInfo).then((json) => {
        if (json.code === 200) {
          this.$message.success(json.message)
        }
        console.log(json, 'addsfter======')
        that.clearData()
        that.$emit('addAfterFunc',json)
        that.drawer = false
      })
    },
    salesStageClick() {
      console.log('salesStageClick')
      this.salesStageVisible = true
    },
    handleRemove() {
      this.imageUrl = ''
    },
    handleClose(done) {
      this.salesStageVisible = false
    },
    ticketdsClick() {
      this.recentVisible = true
      console.log('ticketdsClick')
    },
    recentItemFunc() {
      this.percentVisible = true
    },
    closePercent() {
      this.percentVisible = false
    },
    handleChange(file) {
      // this.fileList = val
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
    open() {
      this.$confirm(this.$t('myCustom.delTip'), this.$t('myCustom.Tip'), {
        confirmButtonText: this.$t('myCustom.confirm'),
        cancelButtonText: this.$t('myCustom.cancel'),
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
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
.el-row {
  margin-bottom: 10px;
  &:last-child {
    margin-bottom: 0;
  }
}
.required {
  font-size: 13px;
  color: #FF0000;
}
.header-detail{
  width: 100%;
  padding: 5px 10px;
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
  width: 60px;
  height: 60px;
  line-height: 60px;
  border-radius: 50%;
  border: 1px solid #ccc;
  text-align: center;
}
.avatar {
  width: 50px;
  height: 50px;
  display: block;
}
.add-page{
  width: 100%;
  height: 70%;
  padding: 10px;
  overflow-y: auto;
}
.title-style {
  margin: 25px 10px 20px;
  font-size: 16px;
  font-weight: 700;
}
.sales-top-box {
  margin-left: 10px;
  display: flex;
  justify-content: space-between;
  width: 96%;
  .sales-top-item {
    padding: 10px 0 5px;
    width: 48%;
    border-radius: 4px;
    background-color: #f5f5f9;
    .sales-top-text {
      padding: 0 15px;
    }
    .sales-top-select {
      margin-top: 10px;
      width: 100%;
    }
  }
}
.salesMemo{
  margin:10px;
  width: 96%;
  /* margin-top: 0%; */
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
</style>
