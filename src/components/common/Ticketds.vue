<template>
  <div>
    <el-collapse-item name="2" class="pos-r">
      <h3 slot="title" class="collapse-title dis-f">
        <div class="flex1">{{ $t('voice.Ticketds') }}({{ ticketsList.length }})</div>
        <el-button v-if="type === 'voice'" :disabled="!customerId" type="text" icon="el-icon-plus" style="" @click.stop.prevent="ticketdsClick">Add</el-button>
        <el-button v-else type="text" icon="el-icon-plus" style="" @click.stop.prevent="ticketdsClick">Add</el-button>
      </h3>
      <div class="detail-right-recent">
        <el-row v-for="item in ticketsList" :key="item.id" class="detail-right-parent right-recent" style="padding-right: 14px;">
          <div class="dis-f a-center">
            <span
              class="flex1"
              style="font-size: 14px;
font-family: Helvetica;
color: #333333;"
              >{{ item.serviceTypeName }}</span
            >
            <span
              style="font-size: 12px;
font-family: Helvetica;
color: #999999;"
              >{{ item.updateDate|formatTime }}</span
            >
          </div>
        </el-row>
      </div>
    </el-collapse-item>
    <!-- Add -->
    <AddTickets v-show="showAddDetail" ref="AddTickets" :userData="userData" @refreshParentList="refreshParentList" />
  </div>
</template>
<script>
import AddTickets from '@/views/tickets-page/add-tickets'
export default {
  name: "Ticketds",
  props: {
    ticketsList: {
      type: Array,
      default: [],
    },
    rowList: {
      type: Object,
      default: {},
    },
    userData: {
      type: Object,
      default: {},
    },
    type: '',
    customerId: null
  },
  components: { AddTickets },
  data() {
    return {
      showAddDetail: false,
    };
  },
  created() {


  },
  methods: {
    ticketdsClick() {
      this.showAddDetail = true
      this.$refs.AddTickets.initData(this.rowList)
    },
    // 子组件取消或保存时刷新的方法
    refreshParentList: function(data) {
      this.showAddDetail = false
      this.$emit('getMyTicketList')
    }
  },
};
</script>
<style scoped>
.collapse-title {
  flex: 1 0 90%;
  order: 1;
}

.detail-right-recent{
  height:250px;
  overflow-y: auto;
}

.detail-right-parent{
  padding-left: 16px;
}

.right-recent{
  border: none;
}
.right-recent:hover{
  cursor:pointer
}
/deep/ .el-collapse-item__header {
padding: 0 14px;
}
.el-button--text{
  font-size: 14px;
font-family: Helvetica-Bold, Helvetica;
font-weight: bold;
color: #3F51B5;
}
</style>
