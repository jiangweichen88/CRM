<template>
  <div class="table-Arccrm" style="">
    <el-container v-show="!showEditDetail" class="h100">
      <el-header style="height:auto;">
        <el-row class="dis-f a-center">
          <h3 class="flex1 h3-title" style="">
            {{ $t('myCustom.Contacts') }}
            <div class="show-number">{{ total }} {{$t('myCustom.Total') }}</div>
          </h3>
          <el-button size="small" style="margin-left: 10px;" type="primary" @click="handleCreate">
            {{ $t('myCustom.Greatecontact') }}
          </el-button>
        </el-row>
      </el-header>
      <el-main style="padding-bottom: 16px;">
        <div v-show="!showEditDetail" class="customer-page">
          <el-row>
            <div class="filter-container">
              <el-select v-model="chooseList.contactsOwner" :placeholder="$t('myCustom.contactsOwner')" clearable class="filter-select-item1">
                <el-option v-for="item in contactsOwnerArr" :key="item.dictCode" :label="item.dictNm" :value="item.dictCode" />
              </el-select>
              <el-select v-model="chooseList.greateDate" :placeholder="$t('myCustom.GreateTime')" clearable class="filter-select-item2">
                <el-option v-for="item in greateDateArr" :key="item.key" :label="item.label" :value="item.key" />
              </el-select>
              <el-select v-model="chooseList.salesStage" :placeholder="$t('myCustom.SalesStage')" clearable class="filter-select-item2">
                <el-option v-for="item in salesStageArr" :key="item.key" :label="item.value" :value="item.key" />
              </el-select>
              <el-select v-model="chooseList.followupStage" :placeholder="$t('myCustom.FollowupStage')" clearable class="filter-select-item1">
                <el-option v-for="item in followupStageArr" :key="item.key" :label="item.label" :value="item.key" />
              </el-select>
              <el-select v-model="chooseList.type" :placeholder="$t('myCustom.Type')" clearable class="filter-select-item2">
                <el-option v-for="item in typeArr" :key="item.key" :label="item.value" :value="item.key" />
              </el-select>
              <el-select v-model="chooseList.intention" :placeholder="$t('myCustom.Intention')" clearable class="filter-select-item2">
                <el-option v-for="item in intentionArr" :key="item.key" :label="item.value" :value="item.key" />
              </el-select>
              <div style="float:right">
                <el-button type="text" style="margin-left: 10px;" @click="clearAllFunc()">
                  {{ $t('myCustom.ClearAll') }}
                </el-button>
                <el-button class="marlr10" style="margin: 0 24px;    margin-right: 16px;" v-waves type="text" @click="handleFilter">
                  {{ $t('table.search') }}
                </el-button>
              </div>
            </div>
          </el-row>
          <el-row class="button-group">
            <span class="item marr10 selected" style=""> {{ tableChooseList.length }} {{ $t('myCustom.Selected') }} </span>
            <el-tooltip class="item" effect="dark" placement="top">
              <div slot="content">{{ $t('myCustom.Comingsoon') }}</div>
              <el-button type="primary" icon="el-icon-rank" class="item" size="mini"> {{ $t('myCustom.Transfer') }}</el-button>
            </el-tooltip>
            <el-button type="primary" icon="iconfont icon-jiahao" class="item" size="mini" @click="addContactsFunc"> {{ $t('myCustom.AddContact') }}</el-button>
            <div class="flex1 dis-f j-end">
              <el-button size="mini" class="marr10" style="margin-right:10px;">Export</el-button>
              <el-input size="mini" v-model="searchDetail" :placeholder="$t('myCustom.text1')" class="input-with-select">
                <el-button slot="append" icon="el-icon-search" @click="searchFunc" />
              </el-input>
            </div>
          </el-row>
          <div class="flex1" ref="tableParentBox" style="    height: 0;">
            <el-table ref="multipleTable" :max-height="tableMaxH" :key="tableKey" :data="list" border fit highlight-current-row style="width: 100%;" @selection-change="handleSelectionChange">
              <el-table-column type="selection" align="center" width="55" />
              <template v-for="(item, index) in tableHead">
                <el-table-column
                  v-if="item.fieldNm==='firstNamelastName'"
                  :key="index"
                  :label="item.showNm"
                  :prop="item.fieldNm"
                  show-overflow-tooltip
                  :resizable="false"
                  min-width="140"
                  align="center"
                >
                  <template slot-scope="{row}">
                    <span class="link-type" @click="handleUpdate(row)">{{ row.firstNamelastName }}</span>
                  </template>
                </el-table-column>
                <el-table-column v-else-if="item.fieldNm==='updateDate'" :key="index" :label="item.showNm" :prop="item.fieldNm" show-overflow-tooltip :resizable="false" min-width="140" align="center">
                  <template slot-scope="{row}">
                    <span @click="handleUpdate(row)">{{ row.updateDate | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
                  </template>
                </el-table-column>
                <el-table-column v-else-if="item.fieldNm==='createTime'" :key="index" :label="item.showNm" :prop="item.fieldNm" show-overflow-tooltip :resizable="false" min-width="140" align="center">
                  <template slot-scope="{row}">
                    <span>{{ row.createTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
                  </template>
                </el-table-column>
                <el-table-column v-else :key="index" :label="item.showNm" :prop="item.fieldNm" show-overflow-tooltip :resizable="false" min-width="160px" align="center" />
              </template>
            </el-table>
          </div>
        </div>
      </el-main>
      <el-footer style="height:auto;">
        <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getCustomerList" />
      </el-footer>
    </el-container>
    <EditCustomer v-show="showEditDetail" ref="EditCustomer" @refreshParentList="refreshParentList" />
    <AddCustomer v-show="showAddDetail" ref="AddCustomer" @addAfterFunc="addAfterFunc" />
  </div>
</template>

<script>
import { getNdaysAgoStartAndEndTime } from "@/utils/index.js";
import { getAutoField, getDictionary } from "@/api/commonApi";
export { parseTime } from "@/utils";
import { getCustomerList, addContacts } from "@/api/allCustomer";
import waves from "@/directive/waves"; // waves directive
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination
import EditCustomer from "./edit-customer";
import AddCustomer from "./add-customer";
import tableMixins from '@/mixins/table'

export default {
  name: "AllCustomers",
  components: { Pagination, EditCustomer, AddCustomer },
  directives: { waves },
  mixins: [tableMixins],
  data() {
    return {
      tableChooseList: [],
      showEditDetail: false,
      showAddDetail: false,
      tableKey: 0,
      list: null,
      total: 0,
      chooseList: {
        contactsOwner: "",
        greateDate: "",
        salesStage: "",
        followupStage: "",
        type: "",
        intention: "",
      },
      searchDetail: "", // number and name search value
      topSearchConditiongroup: [],
      contactsOwnerArr: [{ key: "0", label: "2" }],
      greateDateArr: [
        { key: "0", label: this.$t("myCustom.Today") },
        { key: "1", label: this.$t("myCustom.Yestoday") },
        { key: "7", label: this.$t("myCustom.Last7days") },
        { key: "30", label: this.$t("myCustom.Last30days") },
      ],
      salesStageArr: [
        { key: "0", label: this.$t("myCustom.Lead") },
        { key: "1", label: this.$t("myCustom.Pipeline") },
        { key: "2", label: this.$t("myCustom.Upside") },
        { key: "3", label: this.$t("myCustom.Commit") },
        { key: "4", label: this.$t("myCustom.Cancel") },
        { key: "5", label: this.$t("myCustom.Booked") },
        { key: "6", label: this.$t("myCustom.Customer") },
      ],
      followupStageArr: [
        { key: "0", label: this.$t("myCustom.Not") },
        { key: "3", label: this.$t("myCustom.WithinDays3") },
        { key: "7", label: this.$t("myCustom.WithinDays7") },
        { key: "30", label: this.$t("myCustom.WithinDays30") },
        { key: "90", label: this.$t("myCustom.WithinDays90") },
      ],
      typeArr: [
        { key: "0", label: this.$t("myCustom.Bronze") },
        { key: "1", label: this.$t("myCustom.Silver") },
        { key: "2", label: this.$t("myCustom.Gold") },
        { key: "3", label: this.$t("myCustom.Platinum") },
        { key: "4", label: this.$t("myCustom.Blacklist") },
      ],
      intentionArr: [
        { key: "0", label: this.$t("myCustom.ntention") },
        { key: "1", label: this.$t("myCustom.NoIntention") },
      ],
      listQuery: {
        page: 1,
        limit: 25,
      },
      tableHead: [],
    };
  },
  created() {
    //  Top search condition; example：10000005（type:string）
    this.getSearchItem("10000005");
    this.getSearchItem("10000006");
    this.getCustomerList();
    this.getCountry("userId");
  },
  methods: {
    clearAllFunc(rows) {
      this.chooseList = {
        contactsOwner: "",
        greateDate: "",
        salesStage: "",
        followupStage: "",
        type: "",
        intention: "",
      };
      this.searchDetail = ""; // number and name search value
      this.clearAllCommon(rows)
    },
    getSearchItem(dataParma) {
      var that = this;
      getAutoField(dataParma).then((json) => {
        const data = json.data;
        for (let i = 0; i < data.length; i++) {
          const item = data[i];
          if (item.options) {
            item.options = JSON.parse(item.options);
          }
          if (item.showNm === "Sales Stage") {
            that.salesStageArr = item.options;
          }
          if (item.showNm === "Type") {
            that.typeArr = item.options;
          }
          if (item.showNm === "Customer Intention") {
            that.intentionArr = item.options;
          }
        }
        if (dataParma === "10000005") {
          that.topSearchConditiongroup = data;
        }
        if (dataParma === "10000006") {
          that.tableHead = data;
        }
        if (dataParma === "10000004") {
          that.$refs.AddCustomer.initData(data);
        }
        console.log(json, "json");
      });
    },
    getCountry(data) {
      var that = this;
      getDictionary(data).then((json) => {
        var list = json.data;
        if (data === "userId") {
          that.contactsOwnerArr = list;
        }
        console.log(that.contactsOwnerArr, "======json");
      });
    },
    // 子组件取消或保存时刷新的方法
    refreshParentList: function (data) {
      console.log("refresh");
      this.showAddDetail = false;
      this.showEditDetail = false;
      this.getCustomerList();
    },
    addAfterFunc() {
      this.refreshParentList();
      this.getCustomerList();
    },
    // 选中的时候的change事件
    handleSelectionChange(val) {
      this.tableChooseList = [];
      this.tableChooseList = this.tableChooseList.concat(val);
      console.log(val.length, this.tableChooseList, "val------");
    },
    getCustomerList() {
      console.log("list----");
      var timestamp;
      var startAndEnd;
      var nowEndTime;
      if (this.chooseList.greateDate) {
        if (Number(this.chooseList.greateDate) <= 1) {
          startAndEnd = this.$common.getStartEndTime(
            this.chooseList.greateDate
          );
          timestamp = startAndEnd[0] + "," + startAndEnd[1];
        } else {
          // startAndEnd = this.$common.getStartEndTime(7)
          // nowEndTime = this.$common.getStartEndTime(1)
          // timestamp = startAndEnd[0] + ',' + nowEndTime[1]

          const timeObj = getNdaysAgoStartAndEndTime(
            this.chooseList.greateDate
          );
          timestamp = timeObj.start + "," + timeObj.end;
        }
      }
      var followupStageStart;
      var followupStageEnd;
      var followupStagetamp = "";
      if (
        this.chooseList.followupStage &&
        this.chooseList.followupStage !== "0"
      ) {
        followupStageStart = this.$common.getStartEndTime(
          Number(this.chooseList.followupStage)
        );
        followupStageEnd = this.$common.getStartEndTime(1);
        followupStagetamp = followupStageStart[0] + "," + followupStageEnd[1];
      }

      var data = {
        phoneOrNm: this.searchDetail,
        pageNo: this.listQuery.page,
        pageSize: this.listQuery.limit,
        owner: this.chooseList.contactsOwner,
        createTime: timestamp,
        salesStage: this.chooseList.salesStage,
        customerType: this.chooseList.type,
        lastFollowupTime: followupStagetamp,
        intention: this.chooseList.intention,
      };
      var that = this;
      getCustomerList(data).then((json) => {
        if (json.code === 200) {
          that.list = json.data.records;
          that.total = json.data.total;
        }
      });
    },
    addContactsFunc() {
      console.log(this.tableChooseList, "this.tableChooseList");
      var customerIds = [];
      if (this.tableChooseList.length > 0) {
        for (let i = 0; i < this.tableChooseList.length; i++) {
          customerIds.push(this.tableChooseList[i].id);
        }
        addContacts(customerIds).then((res) => {
          if (res.code === 200) {
            this.$message({
              type: "success",
              message: res.message,
            });
          }
        });
      }
    },
    searchFunc() {
      this.listQuery.page = 1;
      this.chooseList = {
        contactsOwner: "",
        greateDate: "",
        salesStage: "",
        followupStage: "",
        type: "",
        intention: "",
      };
      this.getCustomerList();
    },
    handleFilter() {
      this.searchDetail = "";
      this.listQuery.page = 1;
      this.getCustomerList();
    },
    handleCreate() {
      console.log("addd");
      this.showAddDetail = true;
      this.getSearchItem("10000004");
    },
    handleUpdate(row) {
      console.log(row, "row");
      this.showEditDetail = true;
      this.$refs.EditCustomer.initData(row);
    },
    getSortClass: function (key) {
      const sort = this.listQuery.sort;
      return sort === `+${key}` ? "ascending" : "descending";
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/styles/element-variables.scss";
@import "@/styles/table.scss";
::v-deep .filter-container input:-moz-placeholder {
  color: #333;
  width: 150px;
}
::v-deep .filter-container input:-ms-input-placeholder {
  color: #333;
  width: 150px;
}
::v-deep .filter-container input::-webkit-input-placeholder {
  color: #333;
  width: 150px;
}

.filter-select-item1 {
  width: 150px;
}
.filter-select-item2 {
  width: 130px;
}

.el-input {
  width: 400px;
  float: right;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}

// $--color-primary
</style>
