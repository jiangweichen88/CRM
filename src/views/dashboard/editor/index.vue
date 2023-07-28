<template>
  <div class="dashboard-editor-container">

    <div class="dashboard-left">
      <div class="work-row">
        <div class="milestons">
          <div class="milestons-content">{{ $t('dashboard.milestonsContent') }}</div>
          <span class="milestons-btn">{{ '+ ' + $t('dashboard.milestonsBtn') }}</span>
        </div>
        <div class="work-date">
          <div class="work-top">
            <div class="work-title">{{ $t('dashboard.workTitle') }}</div>
            <div class="work-all">{{ $t('dashboard.allTitle') }}</div>
          </div>
          <div class="work-content">
            <div class="work-item">
              <div class="item-content">
                <div class="item-content-title" style="height: 30px;line-height: 30px;">{{ $t('dashboard.teamMembers') }}</div>
                <div class="item-content-number">
                  <i v-if="workDate.agentShowCount === 1 || workDate.agentShowCount === 2 || workDate.agentShowCount === 3 || workDate.agentShowCount === 4 || workDate.agentShowCount === 5" class="el-icon-s-custom icon-person" />
                  <i v-if="workDate.agentShowCount === 2 || workDate.agentShowCount === 3 || workDate.agentShowCount === 4 || workDate.agentShowCount === 5" class="el-icon-s-custom icon-person" />
                  <i v-if="workDate.agentShowCount === 3 || workDate.agentShowCount === 4 || workDate.agentShowCount === 5" class="el-icon-s-custom icon-person" />
                  <i v-if="workDate.agentShowCount === 4 || workDate.agentShowCount === 5" class="el-icon-s-custom icon-person" />
                  <i v-if="workDate.agentShowCount === 5" class="el-icon-s-custom icon-person" />
                </div>
              </div>
              <div class="item-bottom">
                <div class="item-bottom-title" style="height: 30px;line-height: 30px;">{{ $t('dashboard.totalHours') + '：' }}<span style="color: #888888;">{{ workDate.totalHours }}</span></div>
              </div>
            </div>
            <div class="work-item">
              <div class="item-content" style="border-left: 1px solid #ccc;border-right: 1px solid #ccc;">
                <div class="item-content-title">{{ $t('dashboard.inbound') }}</div>
                <div class="item-content-title">{{ $t('dashboard.todayCallQuantity') }}</div>
                <div class="item-content-number">{{ workDate.inboundCount }}</div>
              </div>
              <div class="item-bottom">
                <div class="item-bottom-title">{{ $t('dashboard.averageTalkTime') }}</div>
                <div class="item-bottom-detail">{{ workDate.inboundTime }}</div>
              </div>
            </div>
            <div class="work-item">
              <div class="item-content">
                <div class="item-content-title">{{ $t('dashboard.outboun') }}</div>
                <div class="item-content-title">{{ $t('dashboard.todayCallQuantity') }}</div>
                <div class="item-content-number">{{ workDate.outboundCount }}</div>
              </div>
              <div class="item-bottom">
                <div class="item-bottom-title">{{ $t('dashboard.averageTalkTime') }}</div>
                <div class="item-bottom-detail">{{ workDate.outboundTime }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="todo-content">
        <div class="todo-col">
          <div class="todo-col-title">{{ $t('dashboard.todo') }}<span>{{ '（' + todoList.length + '）' }}</span></div>
          <div class="todo-col-content">
            <div v-for="(item, index) in todoList" :key="index">
              <div class="task-item" @click="openAddTask('edit', item)">
                <div class="task-top">
                  <div class="task-title">{{ item.taskName }}</div>
                  <div class="task-share">
                    <i class="el-icon-share" />
                  </div>
                </div>
                <div class="task-content">
                  <img v-if="item.image" :src="item.image" alt="" class="task-img">
                  <div class="task-detail">{{ item.description ? item.description : $t('dashboard.NoDescription') }}</div>
                  <div class="task-progress-box">
                    <div class="task-progress-text">{{ item.taskProgress + '% '+ $t('dashboard.complete') }}</div>
                    <el-progress
                      type="line"
                      :stroke-width="10"
                      stroke-linecap="square"
                      :text-inside="true"
                      :show-text="false"
                      :percentage="item.taskProgress * 1"
                      class="task-progress"
                    />
                  </div>
                </div>
                <div class="task-bottom">
                  <div class="task-person">
                    <i v-for="innerIndex in item.taskUserIds" :key="innerIndex" class="el-icon-s-custom icon-person" />
                  </div>
                  <div class="task-time">{{ item.createDate }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="todo-col">
          <div class="todo-col-title">{{ $t('dashboard.doing') }}<span>{{ '（' + doingList.length + '）' }}</span></div>
          <div class="todo-col-content">
            <div v-for="(item, index) in doingList" :key="index">
              <div class="task-item" @click="openAddTask('edit', item)">
                <div class="task-top">
                  <div class="task-title">{{ item.taskName }}</div>
                  <div class="task-share">
                    <i class="el-icon-share" />
                  </div>
                </div>
                <div class="task-content">
                  <img v-if="item.image" :src="item.image" alt="" class="task-img">
                  <div class="task-detail">{{ item.description ? item.description : $t('dashboard.NoDescription') }}</div>
                  <div class="task-progress-box">
                    <div class="task-progress-text">{{ item.taskProgress + '% '+ $t('dashboard.complete') }}</div>
                    <el-progress
                      type="line"
                      :stroke-width="10"
                      stroke-linecap="square"
                      :text-inside="true"
                      :show-text="false"
                      :percentage="item.taskProgress * 1"
                      class="task-progress"
                    />
                  </div>
                </div>
                <div class="task-bottom">
                  <div class="task-person">
                    <i v-for="innerIndex in item.taskUserIds" :key="innerIndex" class="el-icon-s-custom icon-person" />
                  </div>
                  <div class="task-time">{{ item.createDate }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="todo-col">
          <div class="todo-col-title">{{ $t('dashboard.done') }}<span>{{ '（' + doneList.length + '）' }}</span></div>
          <div class="todo-col-content">
            <div v-for="(item, index) in doneList" :key="index">
              <div class="task-item" @click="openAddTask('detail', item)">
                <div class="task-top">
                  <div class="task-title">{{ item.taskName }}</div>
                  <div class="task-share">
                    <i class="el-icon-share" />
                  </div>
                </div>
                <div class="task-content">
                  <img v-if="item.image" :src="item.image" alt="" class="task-img">
                  <div class="task-detail">{{ item.description ? item.description : $t('dashboard.NoDescription') }}</div>
                  <div class="task-progress-box">
                    <div class="task-progress-text">{{ item.taskProgress + '% '+ $t('dashboard.complete') }}</div>
                    <el-progress
                      type="line"
                      :stroke-width="10"
                      stroke-linecap="square"
                      :text-inside="true"
                      :show-text="false"
                      :percentage="item.taskProgress * 1"
                      class="task-progress"
                    />
                  </div>
                </div>
                <div class="task-bottom">
                  <div class="task-person">
                    <i v-for="innerIndex in item.taskUserIds" :key="innerIndex" class="el-icon-s-custom icon-person" />
                  </div>
                  <div class="task-time">{{ item.createDate }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="add-task-btn" @click="openAddTask('create')">{{ '+ ' + $t('dashboard.todo') }}</div>
      </div>
    </div>
    <div class="dashboard-right">
      <div class="sales-task">
        <div class="sales-top">
          <div class="sales-title">{{ $t('dashboard.salesTask') }}</div>
          <el-select v-model="choseDate" size="mini" class="sales-select">
            <el-option :label="$t('dashboard.thisMonth')" :value="0" />
            <el-option :label="$t('dashboard.thisWeek')" :value="1" />
          </el-select>
        </div>
        <div class="sales-content">
          <el-progress
            type="circle"
            :width="120"
            :stroke-width="20"
            stroke-linecap="square"
            :percentage="19.8"
            class="sales-progress"
          />
          <div class="sales-detail-box">
            <div class="sales-detail">{{ $t('dashboard.Completed') + '：$ ' + '198000' }}</div>
            <div class="sales-detail">{{ $t('dashboard.Target') + '：$ ' + '1000000' }}</div>
          </div>
        </div>
      </div>
      <div class="quick-actions">
        <div class="quick-top">
          <div class="quick-title">{{ $t('dashboard.quickActions') }}</div>
        </div>
        <div class="quick-content">
          <div class="quick-item" @click="openAddCustomer">
            <img src="@/assets/login/title-logo.png" alt="" class="quick-img">
            <div class="quick-title">Create Customer</div>
          </div>
          <div class="quick-item" @click="openAddTickets">
            <img src="@/assets/login/title-logo.png" alt="" class="quick-img">
            <div class="quick-title">Create Tickets</div>
          </div>
        </div>
      </div>
      <!-- <div class="notice">
        <div class="notice-top">
          <div class="notice-title">{{ $t('dashboard.notice') }}</div>
          <div class="notice-all">{{ $t('dashboard.allTitle') }}</div>
        </div>
        <div class="notice-content">
          <div class="notice-item">
            <div class="notice-item-title">title textitle title textitle title textitle title textitle</div>
            <div class="notice-item-time">Today</div>
          </div>
          <div class="notice-item">
            <div class="notice-item-title">title textitle title textitle title textitle title textitle</div>
            <div class="notice-item-time">Yestoday</div>
          </div>
          <div class="notice-item">
            <div class="notice-item-title">title textitle title textitle title textitle title textitle</div>
            <div class="notice-item-time">12-31</div>
          </div>
          <div class="notice-item">
            <div class="notice-item-title">title textitle title textitle title textitle title textitle</div>
            <div class="notice-item-time">12-31</div>
          </div>
          <div class="notice-item">
            <div class="notice-item-title">title textitle title textitle title textitle title textitle</div>
            <div class="notice-item-time">12-31</div>
          </div>
          <div class="notice-item">
            <div class="notice-item-title">title textitle title textitle title textitle title textitle</div>
            <div class="notice-item-time">12-31</div>
          </div>
        </div>
      </div> -->
      <!-- <div class="notice">
        <div class="notice-top">
          <div class="notice-title">{{ $t('dashboard.notice') }}</div>
          <div class="notice-all">{{ $t('dashboard.allTitle') }}</div>
        </div>
        <div class="notice-content">
          <i class="el-icon-s-management notice-block" />
        </div>
      </div> -->
    </div>

    <add-task ref="addTaskDialog" @refreshList="refreshList" />
    <AddCustomer v-show="showAddCustomer" ref="AddCustomer" />
    <AddTickets v-show="showAddTickets" ref="AddTickets" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AddTask from './components/addTask.vue'
import AddCustomer from '../../custom-page/add-customer.vue'
import AddTickets from '../../tickets-page/add-tickets.vue'
import { getTaskList, callLogStatis } from '@/api/dashboard'
import { getAutoField } from '@/api/commonApi'
import { formatDate } from "@/utils"

export default {
  name: 'DashboardEditor',
  components: { AddTask, AddCustomer, AddTickets },
  data() {
    return {
      choseDate: 0, // Sales task选择框
      workDate: {},
      todoList: [],
      doingList: [],
      doneList: [],
      showAddCustomer: false,
      showAddTickets: false
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'avatar',
      'roles'
    ])
  },
  mounted() {
    this.getcallLogStatis()
    this.getTodoList()
    this.getDoingList()
    this.getDoneList()
  },
  methods: {
    // Work date
    getcallLogStatis() {
      const params = {
        startTime: new Date(new Date().toLocaleDateString()).getTime(),
        endTime: new Date().getTime()
      }
      callLogStatis(params).then(res => {
        if (res.code === 200) {
          this.workDate = res.data
        }
      })
    },
    // 获取task列表
    getTodoList() {
      const paramsTodo = {
        pageNo: 1,
        pageSize: 100,
        taskStatus: 0
      }
      getTaskList(paramsTodo).then(res => {
        if (res.code === 200) {
          if (res.data.records && res.data.records.lenght !== 0) {
            res.data.records.forEach(item => {
              if (item.createDate) {
                item.createDate = formatDate(item.createDate)
              }
              if (item.updateDate) {
                item.updateDate = formatDate(item.updateDate)
              }
            })
          }
          this.todoList = res.data.records
        }
      })
    },
    getDoingList() {
      const paramsDoing = {
        pageNo: 1,
        pageSize: 100,
        taskStatus: 1
      }
      getTaskList(paramsDoing).then(res => {
        if (res.code === 200) {
          if (res.data.records && res.data.records.lenght !== 0) {
            res.data.records.forEach(item => {
              if (item.createDate) {
                item.createDate = formatDate(item.createDate)
              }
              if (item.updateDate) {
                item.updateDate = formatDate(item.updateDate)
              }
            })
          }
          this.doingList = res.data.records
        }
      })
    },
    getDoneList() {
      const paramsDone = {
        pageNo: 1,
        pageSize: 100,
        taskStatus: 2
      }
      getTaskList(paramsDone).then(res => {
        if (res.code === 200) {
          if (res.data.records && res.data.records.lenght !== 0) {
            res.data.records.forEach(item => {
              if (item.createDate) {
                item.createDate = formatDate(item.createDate)
              }
              if (item.updateDate) {
                item.updateDate = formatDate(item.updateDate)
              }
            })
          }
          this.doneList = res.data.records
        }
      })
    },
    openAddTask(type, data) {
      this.$refs.addTaskDialog.open(type, data)
    },
    refreshList() {
      this.getTodoList()
      this.getDoingList()
      this.getDoneList()
    },
    // Quick actions
    getSearchItem(dataParma) {
      var that = this
      getAutoField(dataParma).then((json) => {
        const data = json.data
        for (let i = 0; i < data.length; i++) {
          const item = data[i]
          if (item.options) {
            item.options = JSON.parse(item.options)
          }
          if (item.showNm === 'Sales Stage') {
            that.salesStageArr = item.options
          }
          if (item.showNm === 'Type') {
            that.typeArr = item.options
          }
          if (item.showNm === 'Customer Intention') {
            that.intentionArr = item.options
          }
        }
        if (dataParma === '10000005') {
          that.topSearchConditiongroup = data
        }
        if (dataParma === '10000006') {
          that.tableHead = data
        }
        if (dataParma === '10000004') {
          that.$refs.AddCustomer.initData(data)
        }
      })
    },
    openAddCustomer() {
      this.showAddCustomer = true
      this.getSearchItem('10000004')
    },
    openAddTickets() {
      this.showAddTickets = true
      this.$refs.AddTickets.initData()
    }
  }
}
</script>

<style lang="scss" scoped>
  .dashboard-editor-container {
    background-color: #fff;
    min-height: 88vh;
    height: 88vh;
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;

    .dashboard-left {
      margin-right: 1%;
      width: 69%;
      height: 100%;
      .work-row {
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: 20%;
        .milestons {
          width: 35%;
          border: 1px solid #ccc;
          position: relative;
          .milestons-content {
            margin-top: 40px;
            text-align: center;
            font-size: 16px;
          }
          .milestons-btn {
            padding: 5px;
            position: absolute;
            bottom: 5px;
            right: 5px;
            cursor: pointer;
            background-color: #ccc;
          }
        }
        .work-date {
          width: 64%;
          border: 1px solid #ccc;
          .work-top {
            padding: 0 10px;
            width: 100%;
            height: 22%;
            line-height: 30px;
            display: flex;
            justify-content: space-between;
            .work-title {
              font-weight: 700;
            }
            .work-all {
              font-size: 14px;
              color: blue;
            }
          }
          .work-content {
            width: 100%;
            height: 78%;
            display: flex;
            justify-content: space-between;
            .work-item {
              width: 33%;
              height: 100%;
              text-align: center;
              font-size: 14px;
              .item-content {
                width: 100%;
                height: 60%;
                .item-content-title {
                  height: 15px;
                  line-height: 15px;
                }
                .item-content-number {
                  font-size: 20px;
                  font-weight: 700;
                  height: 30px;
                  line-height: 30px;
                  .icon-person {
                    margin: 0 1px;
                    border-radius: 50%;
                    overflow: hidden;
                    font-size: 18px;
                    border: 1px solid #000;
                  }
                }
              }
              .item-bottom {
                width: 100%;
                .item-bottom-title {
                  height: 15px;
                  line-height: 15px;
                }
                .item-bottom-detail {
                  height: 25px;
                  line-height: 25px;
                  font-weight: 700;color: #aaa;
                }
              }
            }
          }
        }
      }
      .todo-content {
        margin-top: 1%;
        width: 100%;
        height: 79%;
        border: 1px solid #ccc;
        display: flex;
        justify-content: space-around;
        overflow: hidden;
        position: relative;
        .todo-col {
          width: 28%;
          height: 100%;
          .todo-col-title {
            width: 100%;
            height: 7%;
            line-height: 35px;
            font-size: 17px;
            font-weight: 700;
            border-bottom: 8px solid #aaa;
            > span {
              font-size: 15px;
              font-weight: 500;
            }
          }
          .todo-col-content {
            width: 100%;
            height: 93%;
            padding: 0 10px;
            overflow-y: auto;
            &::-webkit-scrollbar {
              // display:none;
              width: 4px;
            }
            &::-webkit-scrollbar-track {
              background-color: rgba(64, 158, 255, 0.1);
            }
            &::-webkit-scrollbar-thumb {
              background-color: #3f51b5;
            }
            .task-item {
              z-index: 9;
              width: 100%;
              margin-top: 10px;
              padding: 10px 10px 0;
              background-color: #fff;
              border: 1px solid #f9f9f9;
              box-shadow: 6px 6px 6px rgba(0, 0, 0, 0.4);
              cursor: pointer;
              &:hover {
                transform: scale(0.9) rotate(8deg);
              }
              .task-top {
                width: 100%;
                height: 20px;
                line-height: 20px;
                font-size: 16px;
                display: flex;
                justify-content: space-between;
                .task-title {
                  font-weight: 700;
                }
              }
              .task-content {
                width: 100%;
                .task-img {
                  box-sizing: border-box;
                  margin-top: 5px;
                  width: 100%;
                  height: 80px;
                  border-top: 5px solid #ccc;
                  border-bottom: 6px solid #ccc;
                  border-left: 6px solid #ccc;
                  border-right: 6px solid #ccc;
                }
                .task-detail {
                  margin-top: 5px;
                  line-height: 16px;
                  font-size: 14px;
                  color: #999999;
                  overflow: hidden;
                  display: -webkit-box;
                  -webkit-line-clamp: 3;
                  -webkit-box-orient: vertical;
                }
                .task-progress-box {
                  margin-top: 15px;
                  .task-progress-text {
                    height: 15px;
                    line-height: 15px;
                    font-size: 14px;
                  }
                  .task-progress {
                    margin-top: 5px;
                    width: 100%;
                  }
                }
              }
              .task-bottom {
                margin-top: 15px;
                width: 100%;
                height: 30px;
                line-height: 30px;
                font-size: 15px;
                display: flex;
                justify-content: space-between;
                .icon-person {
                  margin: 5px 1px 0;
                  border-radius: 50%;
                  overflow: hidden;
                  font-size: 16px;
                  border: 1px solid #000;
                }
              }
            }
          }
        }
        .add-task-btn {
          width: 70px;
          height: 70px;
          line-height: 70px;
          text-align: center;
          border-radius: 50%;
          color: yellow;
          background-color: #000;
          position: absolute;
          right: 20px;
          bottom: 20px;
          cursor: pointer;
          &:hover {
            background-color: rgba(0, 0, 0, 0.8);
          }
        }
      }
    }
    .dashboard-right {
      width: 30%;
      height: 100%;
      .sales-task {
        width: 100%;
        height: 38%;
        border: 1px solid #ccc;
        .sales-top {
          padding: 0 10px;
          width: 100%;
          height: 15%;
          line-height: 40px;
          display: flex;
          justify-content: space-between;
          .sales-title {
            font-weight: 700;
          }
          .sales-select {
            width: 32%;
            border-radius: 0;
          }
        }
        .sales-content {
          width: 100%;
          height: 85%;
          position: relative;
          .sales-progress {
            position: absolute;
            top: 10px;
            left: 50%;
            transform: translateX(-50%);
          }
          .sales-detail-box {
            width: 100%;
            text-align: center;
            font-size: 14px;
            position: absolute;
            bottom: 3%;
            .sales-detail {
              height: 30px;
              line-height: 30px;
            }
          }
        }
      }
      .quick-actions {
        margin: 2% 0;
        width: 100%;
        height: 26%;
        border: 1px solid #ccc;
        .quick-top {
          padding: 0 10px;
          width: 100%;
          height: 15%;
          line-height: 40px;
          .quick-title {
            font-weight: 700;
          }
        }
        .quick-content {
          padding: 0 10px;
          width: 100%;
          height: 85%;
          display: flex;
          .quick-item {
            margin: 20px 10px 0;
            width: 20%;
            cursor: pointer;
            .quick-img {
              display: block;
              margin: 0 auto;
              width: 50px;
              height: 50px;
              border: 1px solid #aaa;
            }
            .quick-title {
              margin-top: 15px;
              text-align: center;
            }
          }
        }
      }
      // .notice {
      //   width: 100%;
      //   height: 34%;
      //   .notice-top {
      //     margin: 0 auto;
      //     padding: 0 5px;
      //     width: 96%;
      //     height: 12%;
      //     line-height: 40px;
      //     display: flex;
      //     justify-content: space-between;
      //     border-bottom: 1px solid #ccc;
      //     .notice-title {
      //       font-size: 18px;
      //     }
      //     .notice-all {
      //       font-size: 14px;
      //       color: blue;
      //     }
      //   }
      //   .notice-content {
      //     padding: 5px;
      //     width: 100%;
      //     height: 88%;
      //     text-align: center;
      //     .notice-block {
      //       font-size: 50px;
      //       margin-top: 120px;
      //     }
      //     // .notice-item {
      //     //   margin: 0 auto;
      //     //   padding: 0 5px;
      //     //   width: 96%;
      //     //   height: 16%;
      //     //   line-height: 40px;
      //     //   font-size: 14px;
      //     //   border-bottom: 1px solid #ccc;
      //     //   display: flex;
      //     //   justify-content: space-between;
      //     //   cursor: pointer;
      //     //   &:hover {
      //     //     background-color: #eeeeee;
      //     //   }
      //     //   .notice-item-title {
      //     //     width: 60%;
      //     //     overflow:hidden;
      //     //     white-space: nowrap;
      //     //     text-overflow: ellipsis;
      //     //     -o-text-overflow:ellipsis;
      //     //   }
      //     // }
      //   }
      // }
    }
  }
</style>
