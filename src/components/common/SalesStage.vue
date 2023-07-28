<template>
  <div class="SalesStage-box">
    <el-collapse-item name="1">
      <h3 slot="title" class="collapse-title dis-f ">
        <span class="flex1"> {{ $t('voice.SalesStage') }}({{ salesStageList.length }})</span>
        <el-button :disabled="!this.customerId" type="text" icon="el-icon-plus" style="" @click.stop.prevent="salesStageClick">Add</el-button>
      </h3>
      <!-- :key="item.afterSalesStage" -->
      <div class="detail-right-sales scrollbar-hide" v-if="salesStageList&&salesStageList.length">
        <el-timeline>
          <el-timeline-item v-for="(item,index) in salesStageList" :timestamp="item.createDate | parseTime('{y}/{m}/{d} {h}:{i}')" placement="top" :key="item.lastFollowupTime">
            <div class="detail-right-item">
              <span class="name">{{ item.afterSalesStageNm }}</span>
              <span>{{ item.stageStr }}</span>
              <div v-if="item.description">Description:</div>
              <p v-if="item.description" style="margin: 0;word-break: break-all;">{{ item.description}}</p>
            </div>
          </el-timeline-item>
        </el-timeline>
      </div>

      <!-- <div class="detail-right-sales" v-if="salesStageList&&salesStageList.length">
        <el-row v-for="(item,index) in salesStageList" class="detail-right-parent" :key="item.lastFollowupTime">
          <el-col :span="6">
            <div class="detail-right-item">
              <span class="detail-right-item-bg">
                {{ item.createDate | parseTime('{m}-{d}') }}
              </span>
              <span class="detail-right-item-time">
                {{ item.createDate | parseTime('{h}:{i}') }}
              </span>
            </div>
          </el-col>
          <el-col :span="18">
            <div class="detail-right-item">
              <span>{{ item.afterSalesStageNm }}</span>
              <span>{{ item.stageStr }}</span>
              <div v-if="item.description">Description:</div>
              <p v-if="item.description" style="margin: 0;word-break: break-all;">{{ item.description}}</p>
            </div>
          </el-col>
        </el-row>
      </div> -->
    </el-collapse-item>
    <!-- Sales Stage 新建弹窗 -->
    <el-dialog :visible.sync="salesStageVisible" :before-close="handleClose" width="30%" class="saleGroup" @open="SalesOpen" :destroy-on-close="true">
      <template>
        <span slot="title">{{ $t('voice.SalesStage') }}</span>
        <el-select v-model="chooseList.salesStage" :placeholder="$t('voice.SalesStage')" style="width: 130px;margin-right:10px" @change="detailSaleChange">
          <el-option :disabled="item.disabled" v-for="item in salesStageArr" :key="item.key" :label="item.value" :value="item.key" />
        </el-select>
        <el-select v-model="chooseList.intention" :placeholder="$t('voice.Intention')" style="width: 130px" @change="detailSaleChange">
          <el-option v-for="item in intentionArr" :key="item.key" :label="item.label" :value="item.key" />
        </el-select>
        <el-input v-model="chooseList.salesMemo" type="textarea" :placeholder="$t('voice.Describe')" maxlength="300" rows="5" show-word-limit class="salesMemo" />
        <el-button :disabled="isGreateDisabled" style="margin-top:10px" type="primary" @click="detailSalesStageAdd()">{{$t('voice.Greate')}}</el-button>
      </template>
    </el-dialog>
  </div>
</template>
<script>
import { detailSalesStageAdd } from "@/api/allCustomer";
import { cloneDeep } from "lodash-es";
export default {
  name: "",
  props: {
    salesStageList: {
      type: Array,
      default: [],
    },
    detailSalesStageListData: {
      type: Object,
      default: {},
    },
    customerId: null,
  },
  data() {
    return {
      isGreateDisabled: true,
      salesStageVisible: false,
      intentionArr: [
        { key: "1", label: this.$t("voice.Intention") },
        { key: "2", label: this.$t("voice.NoIntention") },
      ],
      chooseList: {
        intention: "",
        salesStage: "",
        salesMemo: "",
      },
      salesStageArr: [],
    };
  },
  computed: {},
  watch: {
    chooseList: {
      handler(val, oldval) {
        // console.log(val, 'chooseList', this._chooseList);
        let arr = ["intention", "salesStage", "salesMemo"];
        const flag = arr.every((v) => val[v] === this._chooseList[v]);
        if (flag) {
          this.isGreateDisabled = true;
        } else {
          this.isGreateDisabled = false;
        }
      },
      deep: true,
    },
  },
  methods: {
    salesStageClick() {
      console.log("salesStageClick");
      this.salesStageVisible = true;
      this.setStageAddData();
    },
    setStageAddData() {
      const detailSalesStageListData = this.detailSalesStageListData;
      if (!detailSalesStageListData) {
        return;
      }
      const allSalesStage = detailSalesStageListData.allSalesStage;
      const salesStageArr = Object.keys(allSalesStage).map((item) => {
        return {
          key: item + "",
          value: allSalesStage[item],
          disabled: item < detailSalesStageListData.salesStageCode,
        };
      });
      //  this.$emit('update:salesStageArr',salesStageArr)
      this.salesStageArr = salesStageArr;
      this.chooseList = {
        intention: detailSalesStageListData.intentionCode + "",
        salesStage: detailSalesStageListData.salesStageCode + "",
        salesMemo: "",
      };
      this._chooseList = cloneDeep(this.chooseList);
    },
    handleClose(done) {
      this.salesStageVisible = false;
    },
    detailSaleChange() {
      this.isGreateDisabled = false;
    },
    SalesOpen() {
      this.isGreateDisabled = true;
    },
    detailSalesStageAdd() {
      if (!this.customerId) {
        return;
      }
      var that = this;
      that.salesStageVisible = false;
      // console.log(this.rowList, 'this.rowList')
      const { chooseList } = this;
      var parma = {
        intention: chooseList.intention,
        salesStage: chooseList.salesStage,
        description: chooseList.salesMemo,
      };
      detailSalesStageAdd(parma, this.customerId).then((json) => {
        if (json.code === 200) {
          this.$emit("getDetailSalesStageList", this.customerId);
        }
      });
    },
  },
};
</script>
<style scoped>
.collapse-title {
  flex: 1 0 90%;
  order: 1;
  position: relative;
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
  padding-left: 16px;
}
.detail-right-recent {
  height: 250px;
  overflow-y: auto;
}
.salesMemo {
  margin-top: 10px;
}
/deep/ .el-collapse-item__header {
    border-radius: 6px;
padding: 0 14px;
}
/* /deep/ .el-timeline-item__node{
  background: #3F51B5;
} */
/deep/ .el-timeline-item__node:nth-child(1){
  background: #3F51B5;
}
.SalesStage-box .el-timeline-item__node:first-child{
  background: #3F51B5;
}
/deep/ .SalesStage-box .el-timeline-item__tail{
  border-left: 2px solid #3F51B51E;
}
.el-button--text{
  font-size: 14px;
font-family: Helvetica-Bold, Helvetica;
font-weight: bold;
color: #3F51B5;
}
/deep/ .el-timeline-item__timestamp{
  font-size: 16px;
    font-family: Helvetica-Bold, Helvetica;
    font-weight: bold;
    color: #333333;
}
.detail-right-item{
  font-size: 12px;
font-family: Helvetica;
color: #999999;
}
.name{
  font-size: 14px;
font-family: Helvetica-Bold, Helvetica;
font-weight: bold;
color: #333333;
}
</style>
