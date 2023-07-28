<template>
  <!-- 头像上传 -->
  <div class="top-header AvatarUpload">
    <div class="header-detail dis-f a-center">
      <el-upload
        :disabled="isEditDisabled"
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
        <img v-if="imageUrl" :src="imageUrl" class="avatar-big" />
        <!-- <i v-else class="el-icon-plus avatar-uploader-icon" /> -->
        <Avatar style="width: 64px;height: 64px;" v-else :hasLetter="true" name="" />
      </el-upload>
      <div style="margin-left: 17px;">
        <h3
          style="font-size: 18px;margin: 0;
font-family: Helvetica-Bold, Helvetica;margin-bottom: 10px;
font-weight: bold;
color: #111111;"
        >
          {{ userInfo.firstName }}{{ userInfo.lastName }}
        </h3>
        <div class="dis-f">
          <p class="ellipsis">
            <img class="img" src="@/assets/img/type.png" alt="" /> Type：<span :title="userInfo.customerTypeName">{{ userInfo.customerTypeName }}</span>
          </p>
          <p class="ellipsis">
            <img class="img" src="@/assets/img/owner.png" alt="" /> Owner：<span :title="userInfo.ownerName">{{userInfo.ownerName}}</span>
          </p>
        </div>
      </div>
      <el-row
        class="header-btn-group"
        style="    position: absolute;
    right: 0;
    top: 0px;"
      >
        <el-tooltip class="item" effect="dark" placement="top">
          <div slot="content">{{ $t('voice.Comingsoon') }}</div>
          <el-button class="header-btn"><i style="font-size: 12px;" class="iconfont icon-a-dengluyoujian" /></el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" placement="top">
          <div slot="content">{{ $t('voice.Comingsoon') }}</div>
          <el-button class="header-btn"><i class="iconfont icon-qita" /></el-button>
        </el-tooltip>
        <el-button class="header-btn" :disabled="isEditBtnDisabled" @click="editFunc"><i class="iconfont icon-bianji" /></el-button>
        <el-button class="header-btn" :disabled="isAddBtnDisabled" @click="handleCreate">
          <i style="font-size: 16px;" class="iconfont icon-chuangjiankehu" />
        </el-button>
      </el-row>
    </div>
  </div>
</template>
<script>
import Avatar from "@/components/common/Avatar";

export default {
  name: "",
  mixins: [],
  components: {Avatar},
  props: {
    userInfo: {
      type: Object,
      default: () => {},
    },
    imageUrl: {
      type: String,
      default: "",
    },
    fileList: {
      type: Array,
      default: () => [],
    },
    isEditDisabled: {
      type: Boolean,
      default: false,
    },
    isEditBtnDisabled: {
      type: Boolean,
      default: false,
    },
    isAddBtnDisabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      urlImpot:
        this.$common.getJavaServerURI() +
        "sale/file?tableNm=nbs_customer&businessType=headImage", // 上传文件地址
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  destroyed() {},
  methods: {
    handleCreate() {
      this.$emit("handleCreate");
    },
    editFunc() {
      // this.$emit("update:isEditDisabled", false);
      this.$emit('updateField','isEditDisabled',false)
    },
    handleAvatarChange(val) {
      // this.fileList = val
      // console.log(val);
    },
    handleAvatarRemove() {
      this.$emit("update:imageUrl", "");
    },
    handleAvatarSuccess(res, file) {
      const isJPG = file.raw.type === "image/jpeg";
      const isPNG = file.raw.type === "image/png";

      if (!isJPG && !isPNG) {
        this.fileList = [];
        this.$message.error("Image format is JPG PNG and PNG!");
        return;
      }

      if (res.code !== 200) {
        this.fileList = [];
        this.$message.error(res.message);
        return;
      }

      this.userInfo.headImage = res.data.id;
      const imageUrl = URL.createObjectURL(file.raw);
      this.$emit("update:imageUrl", imageUrl);
    },
  },
};
</script>
<style scoped>
.avatar-uploader .el-upload {
  /* border: 1px dashed #d9d9d9; */
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
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
.avatar-big {
  width: 64px;
  height: 64px;
  display: block;
      border-radius: 50%;
}
p{
  margin: 0;
  font-size: 14px;
font-family: Helvetica;
color: #808694;
line-height: 20px;
display: flex;
    margin-right: 20px;
    align-items: center;
}
.img{
  margin-right: 6px;
}
.top-header{
  height: auto;
  position: relative;
}
.iconfont{
  font-size: 14px;
}
.AvatarUpload .el-button{
  width: 36px;
    height: 36px;
    border-radius: 50%;
    padding: 0;
    border: none;
}
</style>
