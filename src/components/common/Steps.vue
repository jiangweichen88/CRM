<template>
  <div class="top-header Steps-crm">
    <!-- <h3 style="margin-left:10px">Overview</h3> -->
    <!-- <div class="greater-than"></div>
    <div class="triangle"></div> -->
    <!-- <el-steps :active="stepsNum" align-center>
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
    </el-steps> -->
    <div class="dis-f">
      <div class="item" :key="item.key" v-for="(item,index) in stepsArr">
        <div class="dis-f">
          <div
            v-if="index<stepsNum"
            class="icon-bg"
            style="background-color: #0FBE2B;width: 14px;
height: 14px;border-radius: 50%;"
          >
            <i style="color: #FFF;" class="el-icon-check"></i>
          </div>
          <span class="title" :class="{active:stepsNum===index,after:index>stepsNum}">{{ item.title }}</span>
        </div>
        <div
          v-if="item.time"
          style="font-size: 12px;
font-family: DINAlternate-Bold, DINAlternate;
font-weight: bold;
color: #3F51B5;"
        >
          {{item.time | parseTime('{y}/{m}/{d}')}}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "",
  props: {
    stepsNum: {
      type: Number,
      default: -1,
    },
    stepsArr: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {};
  },
  computed: {},
  methods: {},
};
</script>
<style lang="scss">
.Steps-crm {
  .item {
    height: 64px;
    box-shadow: 4px 0px 8px 0px rgba(0, 0, 0, 0.06);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    // flex: 1;
    width: 14.28%;
        line-height: 16px;
  }
  .title {
    font-size: 12px;
    font-family: Helvetica-BoldOblique, Helvetica;
    font-weight: normal;
    color: #698786;
  }
  .title.after{
    color: #666987;
  }
  .title.active{
    color: #3F51B5;
  }
}
</style>
