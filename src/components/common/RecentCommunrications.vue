<template>
  <div>
    <el-collapse-item name="3">
      <h3 slot="title" class="collapse-title dis-f">
        <div class="flex1">{{ $t('voice.Recentcommunrications') }}({{callLogList.length}})</div>
      </h3>
      <div class="detail-right-recent" v-if="callLogList&&callLogList.length">
        <div v-for="item in callLogList" :key="item.callId" class="dis-f a-center detail-right-parent right-recent" @click="recentItemFunc(item)">
          <!-- <i class="el-icon-edit" /> -->
          <i class="iconfont" :class="{'icon-huru':item.businessType === 0,'icon-huchu':item.businessType === 1,'icon-huchu1':item.businessType === 2}"></i>
          <!-- <span v-else-if="item.businessType === 3">{{ $t('voice.VisualIVR') }}</span> -->
          <div class="dis-f" style="    flex-direction: column;">
            <span
              style="font-size: 14px;
font-family: Helvetica;
color: #111111;"
              >{{ callType.getName(item.businessType) }}</span
            >
            <span
              style="font-size: 12px;
font-family: Helvetica;
color: #999999;"
              >{{ item.beginTime | formatTime }}</span
            >
          </div>
        </div>
      </div>
    </el-collapse-item>
    <!-- Recent Communrications 新建弹窗 -->
    <el-dialog :visible.sync="percentVisible" :before-close="closePercent" width="40%">
      <span slot="title">{{ $t('myCustom.Calldate') }}</span>
      <el-row :gutter="70">
        <el-col :span="14">
          <span>{{ $t('myCustom.Callfrom') }}【{{ callFromData.calling }}】</span>
        </el-col>
        <el-col :span="10">
          <span style="font-weight: 700;">{{ callFromData.beginTime | parseTime('{y}-{m}-{d} {h}:{i}') }} {{ zone }}</span>
        </el-col>
      </el-row>
      <div class="percent-detail">
        <el-row>
          <span>{{ $t('myCustom.Calling') }}：{{ callFromData.calling }}</span>
        </el-row>
        <el-row>
          <span>{{ $t('myCustom.Called') }}：{{ callFromData.called }}</span>
        </el-row>
        <el-row>
          <span v-if="callFromData.direction===0">{{ $t('myCustom.Direction') }}：{{ $t('voice.Inbound') }}</span>
          <span v-if="callFromData.direction===1">{{ $t('myCustom.Direction') }}：{{ $t('voice.Outbound') }}</span>
        </el-row>
        <el-row>
          <span>{{ $t('myCustom.Callid') }}：{{ callFromData.callid }}</span>
        </el-row>
        <el-row>
          <span>{{ $t('myCustom.Record') }}：{{ callFromData.record }}</span>
        </el-row>
        <el-row>
          <span>{{ $t('myCustom.Ringduration') }}：{{ callFromData.ringduration + 's' }}</span>
        </el-row>
        <el-row>
          <span>{{ $t('myCustom.Queueduration') }}：{{ callFromData.queueduration + 's' }}</span>
        </el-row>
        <el-row>
          <span>{{ $t('myCustom.Hanguptime') }}：{{ callFromData.hanguptime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </el-row>
        <el-row>
          <span>{{ $t('myCustom.Answertime') }}：{{ callFromData.answertime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </el-row>
      </div>
      <el-row>
        <audio ref="Ref_audioPlayer" controls :src="callFromData.audioSrc" />
      </el-row>
      <el-row>
        <el-tooltip class="item" effect="dark" placement="top">
          <div slot="content">{{ $t('myCustom.Comingsoon') }}</div>
          <el-button type="text" style="color:#000;">{{ $t('myCustom.Addcomment') }}</el-button>
        </el-tooltip>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { getTimeZone } from "@/utils";
import { callType } from "@/dict";
export default {
  name: "RecentCommunrications",
  props: {
    callLogList: {
      type: Array,
      default: [],
    }
  },
  data() {
    return {
      percentVisible: false,
      callFromData: {},
      callType,
      zone: ''
    };
  },
  methods: {
    recentItemFunc(item) {
      this.zone = getTimeZone(item.beginTime)
      this.callFromData.beginTime = item.beginTime;
      this.callFromData.calling = item.caller;
      this.callFromData.called = item.called;
      this.callFromData.direction = item.callDirection;
      this.callFromData.callid = item.callId;
      this.callFromData.ringduration = item.ringDuration;
      this.callFromData.queueduration = item.queueDuration;
      this.callFromData.hanguptime = item.hangupTime;
      this.callFromData.answertime = item.answerTime;
      this.callFromData.audioSrc = item.mediaUrl;
      this.percentVisible = true;
    },
    closePercent() {
      this.percentVisible = false;
    }
  },
};
</script>
<style scoped>
.el-row {
  margin-bottom: 10px;
  &:last-child {
    margin-bottom: 0;
  }
}
.collapse-title {
  flex: 1 0 90%;
  order: 1;
  position: relative;
}
.el-collapse-item__header {
  flex: 1 0 auto;
  order: -1;
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
}
.detail-right-recent {
  height: 250px;
  overflow-y: auto;
}
.right-recent {
  border: none;
}
.right-recent:hover {
  cursor: pointer;
}
.percent-detail {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
}
.time {
  font-size: 14px;
}

.salesMemo {
  margin-top: 10px;
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
.iconfont{
  margin-right: 16px;
}
.icon-huchu{
  color: #0F5ED4;
}
.icon-huru{
  color: #1A855F;
}
.icon-huchu1{
  color: #CA3B42;
}
</style>
