<template>
  <div class="table-Arccrm">
    <el-container class="h100">
      <el-header style="height:auto;">
        <!-- <el-row>
          <h3>
            {{ $t('myTicktes.Tickets') }}
            <span class="show-number">({{ $t('myTicktes.Total') }}：{{ total }},{{ $t('myTicktes.Selected') }}：{{ tableChooseList.length }})</span>
          </h3>
        </el-row> -->
        <el-row class="dis-f a-center">
          <h3 class="flex1" style="">
            {{ $t('myTicktes.Tickets') }}
            <div class="show-number">{{ total }} {{$t('myCustom.Total') }}</div>
          </h3>
          <el-button style="margin-left: 10px;" type="primary" @click="handleCreate">
            {{ $t('myTicktes.GreateTicket') }}
          </el-button>
        </el-row>
      </el-header>
      <el-main style="padding-bottom: 16px;">
        <div class="customer-page">
          <el-row>
            <div class="filter-container">
              <el-select v-model="chooseList.ticketowner" :placeholder="$t('myTicktes.Ticketowner')" clearable class="filter-select-item" disabled>
                <el-option v-for="item in ticketownerArr" :key="item.id" :label="item.realname" :value="item.id" />
              </el-select>
              <el-select v-model="chooseList.greateDate" :placeholder="$t('myTicktes.GreateTime')" clearable class="filter-select-item">
                <el-option v-for="item in greateDateArr" :key="item.key" :label="item.label" :value="item.key" />
              </el-select>
              <el-select v-model="chooseList.priority" :placeholder="$t('myTicktes.Priority')" clearable class="filter-select-item">
                <el-option v-for="item in priorityArr" :key="item.key" :label="item.label" :value="item.key" />
              </el-select>
              <el-select v-model="chooseList.servicetype" :placeholder="$t('myTicktes.Servicetype')" clearable class="filter-select-item">
                <el-option v-for="item in servicetypeArr" :key="item.key" :label="item.label" :value="item.key" />
              </el-select>
              <el-select v-model="chooseList.reply" :placeholder="$t('myTicktes.Reply')" clearable class="filter-select-item">
                <el-option v-for="item in replyArr" :key="item.key" :label="item.label" :value="item.key" />
              </el-select>
              <div style="float:right">
                <el-button type="text" style="margin-left: 10px;" @click="clearAllFunc()">
                  {{ $t('myTicktes.ClearAll') }}
                </el-button>
                <el-button v-waves type="primary" @click="handleFilter">
                  {{ $t('table.search') }}
                </el-button>
              </div>
            </div>
          </el-row>
          <el-row class="button-group">
            <span class="item marr10 selected" style=""> {{ tableChooseList.length }} {{ $t('myCustom.Selected') }} </span>
            <div class="flex1 dis-f j-end">
              <el-input size="mini" v-model="searchDetail" :placeholder="$t('myTicktes.text1')" class="input-with-select">
                <el-button size="mini" slot="append" icon="el-icon-search" @click="searchTicketList" />
              </el-input>
            </div>
          </el-row>
          <div class="flex1" ref="tableParentBox" style="height: 0;">
            <el-table ref="multipleTable" :max-height="tableMaxH" :key="tableKey" :data="list" border fit highlight-current-row style="width: 100%;" @selection-change="handleSelectionChange">
              <el-table-column type="selection" align="center" width="55" />
              <el-table-column :label="$t('myTicktes.TicketsTitle')" min-width="130px" align="center" :resizable="false">
                <template slot-scope="{row}">
                  <span v-if="row.priorityName === 'Urgent'" class="link-type" @click="handleUpdate(row)" style="color: #8D50FF;">{{ row.title }}</span>
                  <span v-if="row.priorityName === 'Emergency'" class="link-type" @click="handleUpdate(row)" style="color: #E33F54;">{{ row.title }}</span>
                  <span v-if="row.priorityName === 'NORMAL'" class="link-type" @click="handleUpdate(row)">{{ row.title }}</span>
                </template>
              </el-table-column>
              <el-table-column :label="$t('myTicktes.ServiceType')" prop="id" align="center" min-width="120" :class-name="getSortClass('id')" :resizable="false">
                <template slot-scope="{row}">
                  <span v-if="row.priorityName === 'Urgent'" style="color: #8D50FF;">{{ row.serviceTypeName }}</span>
                  <span v-if="row.priorityName === 'Emergency'" style="color: #E33F54;">{{ row.serviceTypeName }}</span>
                  <span v-if="row.priorityName === 'NORMAL'">{{ row.serviceTypeName }}</span>
                </template>
              </el-table-column>
              <el-table-column :label="$t('myTicktes.GreateTime')" min-width="150px" align="center" :resizable="false">
                <template slot-scope="{row}">
                  <span v-if="row.priorityName === 'Urgent'" style="color: #8D50FF;">{{ row.createDate | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
                  <span v-if="row.priorityName === 'Emergency'" style="color: #E33F54;">{{ row.createDate | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
                  <span v-if="row.priorityName === 'NORMAL'">{{ row.createDate | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
                </template>
              </el-table-column>
              <el-table-column :label="$t('myTicktes.Priority')" min-width="150px" align="center" :resizable="false">
                <template slot-scope="{row}">
                  <span v-if="row.priorityName === 'Urgent'" style="color: #8D50FF;">{{ row.priorityName }}</span>
                  <span v-if="row.priorityName === 'Emergency'" style="color: #E33F54;">{{ row.priorityName }}</span>
                  <span v-if="row.priorityName === 'NORMAL'">{{ row.priorityName }}</span>
                </template>
              </el-table-column>
              <el-table-column :label="$t('myTicktes.Owner')" min-width="150px" align="center" :resizable="false">
                <template slot-scope="{row}">
                  <span v-if="row.priorityName === 'Urgent'" style="color: #8D50FF;">
                    <span v-if="row.ownerName">{{ row.ownerName }}</span>
                    <span v-else-if="row.ownerGroupName">{{ row.ownerGroupName }}</span>
                    <span v-else>-</span>
                  </span>
                  <span v-if="row.priorityName === 'Emergency'" style="color: #E33F54;">
                    <span v-if="row.ownerName">{{ row.ownerName }}</span>
                    <span v-else-if="row.ownerGroupName">{{ row.ownerGroupName }}</span>
                    <span v-else>-</span>
                  </span>
                  <span v-if="row.priorityName === 'NORMAL'">
                    <span v-if="row.ownerName">{{ row.ownerName }}</span>
                    <span v-else-if="row.ownerGroupName">{{ row.ownerGroupName }}</span>
                    <span v-else>-</span>
                  </span>
                </template>
              </el-table-column>
              <el-table-column :label="$t('myTicktes.CustomerName')" min-width="150px" align="center" :resizable="false">
                <template slot-scope="{row}">
                  <span v-if="row.priorityName === 'Urgent'" style="color: #8D50FF;">{{ row.firstName }}{{ row.lastName }}</span>
                  <span v-if="row.priorityName === 'Emergency'" style="color: #E33F54;">{{ row.firstName }}{{ row.lastName }}</span>
                  <span v-if="row.priorityName === 'NORMAL'">{{ row.firstName }}{{ row.lastName }}</span>
                </template>
              </el-table-column>
              <el-table-column :label="$t('myTicktes.Reply')" min-width="150px" align="center" :resizable="false">
                <template slot-scope="{row}">
                  <span v-if="row.priorityName === 'Urgent'" style="color: #8D50FF;">{{ row.needReplyName }}</span>
                  <span v-if="row.priorityName === 'Emergency'" style="color: #E33F54;">{{ row.needReplyName }}</span>
                  <span v-if="row.priorityName === 'NORMAL'">{{ row.needReplyName }}</span>
                </template>
              </el-table-column>
              <el-table-column :label="$t('myTicktes.ContactNumber')" width="150px" align="center" :resizable="false">
                <template slot-scope="{row}">
                  <span v-if="row.priorityName === 'Urgent'" style="color: #8D50FF;">{{ row.contactNumber }}</span>
                  <span v-if="row.priorityName === 'Emergency'" style="color: #E33F54;">{{ row.contactNumber }}</span>
                  <span v-if="row.priorityName === 'NORMAL'">{{ row.contactNumber }}</span>
                </template>
              </el-table-column>
              <el-table-column :label="$t('myTicktes.City')" width="150px" align="center" :resizable="false">
                <template slot-scope="{row}">
                  <span v-if="row.priorityName === 'Urgent'" style="color: #8D50FF;">{{ row.cityName }}</span>
                  <span v-if="row.priorityName === 'Emergency'" style="color: #E33F54;">{{ row.cityName }}</span>
                  <span v-if="row.priorityName === 'NORMAL'">{{ row.cityName }}</span>
                </template>
              </el-table-column>
              <el-table-column :label="$t('myTicktes.Channel')" width="150px" align="center" :resizable="false">
                <template slot-scope="{row}">
                  <span v-if="row.priorityName === 'Urgent'" style="color: #8D50FF;">{{ row.channelName }}</span>
                  <span v-if="row.priorityName === 'Emergency'" style="color: #E33F54;">{{ row.channelName }}</span>
                  <span v-if="row.priorityName === 'NORMAL'">{{ row.channelName }}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </el-main>
      <el-footer style="height:auto;">
        <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getMyTicketList" />
      </el-footer>
    </el-container>
    <EditTickets v-show="showEditDetail" ref="EditTickets" @refreshParentList="refreshParentList" />
    <AddTickets v-show="showAddDetail" ref="AddTickets" @refreshParentList="refreshParentList" />
  </div>
</template>

<script>
import { getMyTicketList, searchTicketList, getAllTicketList } from '@/api/tickets'
// import { getSaleUsers } from '@/api/commonApi'
import waves from '@/directive/waves' // waves directive
// import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import EditTickets from './edit-tickets'
import AddTickets from './add-tickets'
import tableMixins from '@/mixins/table'

export default {
  name: 'AllTickets',
  components: { Pagination, EditTickets, AddTickets },
  directives: { waves },
  mixins: [tableMixins],
  data() {
    return {
      tableChooseList: [],
      showEditDetail: false,
      showAddDetail: false,
      searchDetail: '', // number and name search value
      tableKey: 0,
      list: null,
      total: 0,
      chooseList: {
        ticketowner: '',
        greateDate: '',
        priority: '',
        servicetype: '',
        reply: ''
      },
      ticketownerArr: [],
      greateDateArr: [
        { key: '0', label: this.$t('myCustom.Today') },
        { key: '1', label: this.$t('myCustom.Yestoday') },
        { key: '2', label: this.$t('myCustom.Last7days') },
        { key: '3', label: this.$t('myCustom.Last30days') }
      ],
      priorityArr: [{
        key: 0,
        label: this.$t('myTicktes.Normal')
      }, {
        key: 2,
        label: this.$t('myTicktes.Emergency')
      }, {
        key: 1,
        label: this.$t('myTicktes.Urgent')
      }],
      servicetypeArr: [
        {
          key: 0,
          label: this.$t('myTicktes.Consulting')
        },
        {
          key: 1,
          label: this.$t('myTicktes.Opinion')
        },
        {
          key: 2,
          label: this.$t('myTicktes.Pipeline')
        }
      ],
      replyArr: [{
        key: 1,
        label: this.$t('myTicktes.Yes')
      }, {
        key: 0,
        label: this.$t('myTicktes.No')
      }],
      listQuery: {
        page: 1,
        limit: 20
      },
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      rolesInfo:{}
    }
  },
  created() {
    // wait
    // console.log(this.$store.getters.rolesInfo, '$store.getters.rolesInfo')
    this.rolesInfo = JSON.parse(localStorage.getItem('rolesInfo'))

    this.getSaleUsers()
    this.getMyTicketList()
  },
  methods: {
    clearAllFunc(rows) {
      this.chooseList.greateDate = ''
      this.chooseList.priority = ''
      this.chooseList.servicetype = ''
      this.chooseList.reply = ''
      this.searchDetail = '' // number and name search value
      this.clearAllCommon(rows)
    },
    searchTicketList() {
      var that = this
      var data = {
        'searchContent': this.searchDetail,
        'pageNo': this.listQuery.page,
        'pageSize': this.listQuery.limit
      }
      searchTicketList(data).then((json) => {
        console.log(json, 'json')
        that.list = json.data.records
        that.total = json.data.total
      })
    },
    // 子组件取消或保存时刷新的方法
    refreshParentList: function(data) {
      this.showAddDetail = false
      this.showEditDetail = false
      this.getMyTicketList()
    },
    getSaleUsers() {
      this.ticketownerArr.push(this.rolesInfo)
      this.chooseList.ticketowner = this.ticketownerArr[0].id
      // console.log(this.ticketownerArr, '$store.getters.rolesInfo',  this.rolesInfo)
    },
    // 选中的时候的change事件
    handleSelectionChange(val) {
      this.tableChooseList = []
      this.tableChooseList = this.tableChooseList.concat(val)
      console.log(val.length, this.tableChooseList, 'val------')
    },
    getMyTicketList() {
      var that = this
      var data = {
        'pageNo': this.listQuery.page,
        'pageSize': this.listQuery.limit
      }
      getMyTicketList(data).then((json) => {
        console.log(json, '获取全部工单列表=======返回数据')
        that.list = json.data.records
        that.total = json.data.total
      })
    },
    getAllTicketList() {
      var that = this
      var timestamp = ""
      var startAndEnd = []
      var nowEndTime = []
      console.log(this.chooseList.greateDate,"this.chooseList.greateDate")
      if(this.chooseList.greateDate){
        if(Number(this.chooseList.greateDate) <= 1){
          console.log(Number(this.chooseList.greateDate),111111111111111)
          startAndEnd = this.$common.getStartEndTime(this.chooseList.greateDate)
          timestamp = startAndEnd[0] + ',' + startAndEnd[1]
        }else if(this.chooseList.greateDate === '2'){
          startAndEnd = this.$common.getStartEndTime(7)
          nowEndTime = this.$common.getStartEndTime(1)
          timestamp = startAndEnd[0] + ',' + nowEndTime[1]
        }else {
          startAndEnd = this.$common.getStartEndTime(30)
          nowEndTime = this.$common.getStartEndTime(1)
          timestamp = startAndEnd[0] + ',' + nowEndTime[1]
        }
      }


      var data = {
        'ownerId': this.chooseList.ticketowner,
        'priority': this.chooseList.priority,
        'createDate': timestamp,
        'serviceType': this.chooseList.servicetype,
        'needReply': this.chooseList.reply,
        'pageNo': this.listQuery.page,
        'pageSize': this.listQuery.limit
      }
      // console.log(this.chooseList.reply, 'data========qingqiu')
      // console.log(data,'getAllTicketList')
      getAllTicketList(data).then((json) => {
        console.log(json, '获取全部工单列表=======返回数据')
        that.list = json.data.records
        that.total = json.data.total
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getAllTicketList()
    },
    handleCreate() {
      console.log('addd')
      this.showAddDetail = true
      this.$refs.AddTickets.initData()
    },
    handleUpdate(row) {
      console.log(row, 'row')
      this.showEditDetail = true
      this.$refs.EditTickets.initData(row)
    },
    getSortClass: function(key) {
      const sort = this.listQuery.sort
      return sort === `+${key}` ? 'ascending' : 'descending'
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@/styles/element-variables.scss";
@import "@/styles/table.scss";
::v-deep .filter-container input:-moz-placeholder {
    color: #333;
    width: 150px
}
::v-deep .filter-container input:-ms-input-placeholder {
    color: #333;
    width: 150px
}
::v-deep .filter-container input::-webkit-input-placeholder {
  color: #333;
  width: 150px
}
.filter-select-item{
  width: 150px
}
.el-input {
  width: 400px;
  float: right;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}

.link-type {
  text-decoration: underline;
}
</style>
