<template>
  <div class="app-container">
    <el-dialog
      :title="$t('dashboard.taskTitle')"
      width="35%"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :before-close="reset"
    >
      <el-form ref="addForm" :rules="dialogType === 'create' ? rulesCreate : rulesEdit" :model="formData">
        <el-row>
          <el-col :span="24">
            <el-form-item prop="taskName">
              <el-input v-model="formData.taskName" :disabled="isDisable" :placeholder="$t('dashboard.taskNamePlaceholder')" class="line-style" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="line-style" style="margin-bottom: 15px;">
          <el-col :span="5">
            <el-form-item :label="$t('dashboard.typeName')" prop="taskType">
              <el-select v-model="formData.taskType" :disabled="isDisable" :placeholder="$t('dashboard.selectText')" class="type-style">
                <el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5" :offset="1">
            <el-form-item :label="$t('dashboard.priority')" prop="taskPriority">
              <el-select v-model="formData.taskPriority" :disabled="isDisable" :placeholder="$t('dashboard.selectText')">
                <el-option v-for="item in priorityOptions" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="1">
            <el-form-item :label="$t('dashboard.members')" prop="taskUserIds">
              <el-select
                ref="refSelect"
                v-model="formData.taskUserIds"
                multiple
                :disabled="isDisable"
                :placeholder="$t('dashboard.selectText')"
                style="width: 100%;"
                @change="changeSelection"
              >
                <!-- <el-option v-for="item in membersOptions" :key="item.dictNm" :label="item.dictNm" :value="item.dictNm">
                  <div style="display: flex;align-items: center;">
                    <img :src="item.img" alt="" class="img-style">
                    <span style="margin-left: 20px; color: #8492a6; font-size: 14px">{{ item.dictNm }}</span>
                  </div>
                </el-option> -->
                <el-option v-for="item in membersOptions" :key="item.dictNm" :label="item.dictNm" :value="item.dictCode" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="margin-bottom: 15px;">
          <el-col :span="24">
            <el-form-item :label="$t('dashboard.progress')" label-width="100px" label-position="left" prop="taskProgress" style="margin-bottom: 0;">
              <span v-if="dialogType === 'create' || dialogType === 'detail'" style="float: right;">{{ formData.taskProgress + '%' }}</span>
              <el-input-number
                v-model.number="formData.taskProgress"
                v-if="dialogType === 'edit'"
                :min="0"
                :max="100"
                size="mini"
                :disabled="rolesInfo.id !== formData.createBy"
                placeholder="Progress"
                class="input-number-style"
              />
              <span v-if="dialogType === 'edit'" style="margin-left: 2px;">%</span>
            </el-form-item>
            <el-progress
              type="line"
              :stroke-width="10"
              stroke-linecap="square"
              :text-inside="true"
              :show-text="false"
              :percentage="formData.taskProgress"
              class="task-progress"
            />
          </el-col>
        </el-row>
        <el-row style="margin-bottom: 15px;">
          <el-col :span="24">
            <el-form-item prop="description">
              <el-input
                v-model="formData.description"
                type="textarea"
                maxlength="300"
                show-word-limit
                :autosize="{ minRows: 4, maxRows: 4 }"
                :disabled="isDisable"
                placeholder="Describe..."
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="line-style" style="margin-bottom: 15px;">
          <el-col :span="24">
            <el-form-item>
              <el-upload
                v-if="dialogType === 'create'"
                class="avatar-uploader"
                :action="action"
                list-type="picture-card"
                :multiple="false"
                :limit="1"
                :file-list="fileList"
                :show-file-list="true"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :headers="{
                  'X-Access-Token': $store.getters.token,
                }"
              >
                <i class="el-icon-plus" />
              </el-upload>
              <img v-if="dialogType !== 'create' && formData.image" :src="imageUrl" alt="" class="avatar-uploader-icon" />
            </el-form-item>
            <el-dialog
              :visible.sync="imgDialogVisible"
              width="30%"
              :append-to-body="true"
              :modal-append-to-body="false"
            >
              <img width="100%" :src="previewUrl" alt="">
            </el-dialog>
          </el-col>
        </el-row>
      </el-form>
      <div v-if="dialogType !== 'detail'" slot="footer" class="dialog-footer" style="text-align: left;">
        <el-button v-if="dialogType === 'create'" @click="createTask">{{ $t('dashboard.Create') }}</el-button>
        <el-button v-if="dialogType === 'edit'" type="primary" :disabled="rolesInfo.id !== formData.createBy" @click="editTask">{{ $t('dashboard.Save') }}</el-button>
        <el-button
          v-show="rolesInfo.id === formData.createBy && dialogType !== 'create'"
          type="danger"
          style="margin-left: 10px;"
          @click="openDeleteDialog"
        >{{ $t('dashboard.Delete') }}</el-button>
        <!-- <el-popconfirm
          title="Are you sure to continue with this operation?"
          confirm-button-text="Confirm"
          cancel-button-text="Cancel"
          :hide-icon="true"
          @onConfirm="deleteTask"
          >
          <el-button
            slot="reference"
            v-show="rolesInfo.id === formData.createBy && dialogType !== 'create'"
            type="danger"
            style="margin-left: 10px;"
          >{{ $t('dashboard.Delete') }}</el-button>
        </el-popconfirm> -->
      </div>
    </el-dialog>

    <el-dialog
      title="Tip"
      width="15%"
      :visible.sync="deleteVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      center
    >
      <div style="text-align: center;">Are you sure to continue with this operation?</div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDeleteDialog">Cancel</el-button>
        <el-button type="primary" @click="deleteTask">Confirm</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getDictionary } from '@/api/commonApi'
import { addTask, editTask, deleteTask } from '@/api/dashboard'

export default {
  name: 'AddTask',
  data() {
    return {
      rolesInfo: {},
      dialogType: 'create',
      dialogFormVisible: false,
      deleteVisible: false,
      isDisable: false,
      typeOptions: [
        { value: 0, label: 'To do' }
        // { value: 1, label: 'Doing' },
        // { value: 2, label: 'Done' }
      ],
      priorityOptions: [
        { value: 0, label: 'None' },
        { value: 1, label: 'Low' },
        { value: 2, label: 'Medium' },
        { value: 3, label: 'High' }
      ],
      membersOptions: [],
      membersAvatar: [],
      action: this.$common.getJavaServerURI() + 'sale/file?tableNm=nbs_task&businessType=taskImage', // 上传图片地址
      imgDialogVisible: false,
      imageUrl: '',
      previewUrl: '',
      fileList: [],
      formData: {
        taskName: '',
        taskType: 0,
        taskPriority: 0,
        taskUserIds: [],
        taskProgress: 0,
        description: '',
        imageId: ''
      },
      rulesCreate: {
        taskName: [{ required: true, message: 'task name is required', trigger: 'change' }],
        taskUserIds: [{ required: true, message: 'members is required', trigger: 'change' }]
      },
      rulesEdit: {
        taskProgress: [{ required: true, message: 'taskProgress is required', trigger: ['blur', 'change'] }]
      }
    }
  },
  mounted() {
    this.rolesInfo = JSON.parse(localStorage.getItem('rolesInfo'))
    this.getMembers()
  },
  methods: {
    open(type, data) {
      this.dialogFormVisible = true
      this.dialogType = type

      if (type === 'create') {
        this.isDisable = false
        this.$nextTick(() => {
          this.$refs['addForm'].resetFields()
          this.$refs['addForm'].clearValidate()
        })
      } else {
        this.isDisable = true
        this.$nextTick(() => {
          this.imageUrl = data.image
          data.taskProgress = data.taskProgress * 1
          this.formData = JSON.parse(JSON.stringify(data))
        })
      } 
    },
    // 获取联系人
    getMembers () {
      getDictionary('userId').then(res => {
        this.membersOptions = res.data
      })
    },
    changeSelection(value) {
      // const optionsImg = this.membersOptions
      // if (value && value.length !== 0) {
      //   value.forEach(valueItem => {
      //     const i = optionsImg.findIndex((item) => item.value === valueItem)
      //     this.$refs['refSelect']
      //       .$el.children[0]
      //       .children[0]
      //       .setAttribute(
      //         'style',
      //         `
      //       background: url(${optionsImg[i].img});
      //       background-position: 10px center;
      //       background-size: 10px 10px;
      //       text-indent: 20px;
      //       `
      //       )
      //   })
      // }

      // this.membersAvatar = []
      // if (value && value.length !== 0) {
      //   value.forEach(valueItem => {
      //     this.membersOptions.forEach(membersItem => {
      //       if (valueItem === membersItem.value) {
      //         this.membersAvatar.push(membersItem.label)
      //       }
      //     })
      //   })
      // }
    },
    createImgUrlForName(name = '孙晓敏', backgroundColor = "yellow", fontColor = "#000") {
      let canvasEle = document.createElement("canvas");
      let ctx = canvasEle.getContext('2d');
      canvasEle.width = 200;
      canvasEle.height = 200;
      let cWidth = ctx.canvas.width;
      let cHeight = ctx.canvas.height;
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, cWidth, cHeight)
      let fontSize = canvasEle.width * 0.8;
      ctx.font = fontSize + 'px 黑体';
      ctx.fillStyle = fontColor;
      ctx.fillText(name[0], cWidth / 2 - fontSize / 2, cHeight / 2 + fontSize / 3);
      var tempSrc = canvasEle.toDataURL("image/png");
      return tempSrc;
    },
    handleAvatarSuccess(res, file) {
      if (res.code === 200) {
        this.imageUrl = URL.createObjectURL(file.raw)
        this.formData.imageId = res.data.id
      } else {
        this.imageUrl = ''
        this.fileList = []
        this.$message({ message: res.message, type: 'error' })
      }
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLtM = file.size / 1024 / 1024 < 0.5

      if (!isJPG) {
        this.$message.error('The image can only be in JPG format!')
        return isJPG
      }
      if (!isLtM) {
        this.$message.error('Image size cannot exceed 500KB!')
        return isLtM
      }
      // return isJPG && isLtM
    },
    handleRemove(file, fileList) {
      this.imageUrl = ''
      this.previewUrl = ''
      this.formData.imageId = ''
    },
    handlePictureCardPreview(file) {
      this.previewUrl = file.url
      this.imgDialogVisible = true
    },
    createTask() {
      if (this.dialogType === 'create') {
        this.$refs['addForm'].validate((valid) => {
          if (valid) {
            if (this.formData.taskUserIds.length > 5) {
              this.$message({ message: "Maximum of 5 members!", type: 'error' })
            } else {
              addTask(this.formData).then(res => {
                if (res.code === 200) {
                  this.$message({ message: "Add task successful!", type: 'success' })
                  this.$emit("refreshList")
                  this.reset();
                } else {
                  this.$message({ message: res.message, type: 'error' })
                }
              })
            }
          } else {
            this.$message({ message: "Verification failed!", type: 'error' })
            return false;
          }
        });
      } else if (this.dialogType === 'edit') {
        let params = {
          id: this.formData.id,
          taskProgress: this.formData.taskProgress
        }
        editTask(params).then(res => {
          if (res.code === 200) {
            this.$message({ message: "Edit task successful!", type: 'success' })
            this.$emit("refreshList")
            this.reset();
          } else {
            this.$message({ message: res.message, type: 'error' })
          }
        })
      }
    },
    editTask() {
      let params = {
        id: this.formData.id,
        taskProgress: this.formData.taskProgress
      }
      editTask(params).then(res => {
        if (res.code === 200) {
          this.$message({ message: "Edit task successful!", type: 'success' })
          this.$emit("refreshList")
          this.reset()
        } else {
          this.$message({ message: res.message, type: 'error' })
        }
      })
    },
    openDeleteDialog() {
      this.deleteVisible = true
    },
    closeDeleteDialog() {
      this.deleteVisible = false
    },
    deleteTask() {
      deleteTask(this.formData.id).then(res => {
        if (res.code === 200) {
          this.$message({ message: "Delete task successful!", type: 'success' })
          this.$emit("refreshList")
          this.reset()
          this.deleteVisible = false
        } else {
          this.$message({ message: res.message, type: 'error' })
        }
      })
    },
    reset() {
      this.$emit("refreshList")
      this.$refs['addForm'].resetFields()
      this.$refs['addForm'].clearValidate()
      this.dialogFormVisible = false
      this.imgDialogVisible = false
      this.isDisable = false
      this.imageUrl = ''
      this.previewUrl = ''
      this.fileList = []
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-dialog{
  margin-top: 4vh !important;
  width: 50%;
  max-height: 92vh;
  overflow-y: auto;
}
::v-deep .el-dialog__header {
  padding: 15px;
  padding-bottom: 10px;
  background-color: #e3e3e3 !important;
  position: fixed;
  width: 35%;
  height: 50px !important;
  z-index: 1;
}
::v-deep .el-dialog__body {
  padding: 60px 20px 10px;
  color: #606266;
  font-size: 14px;
  word-break: break-all;
}
::v-deep .el-input__inner{
  border:none;
  border-radius: 0;
  background-color: rgba(255, 255, 255, 0);
  &::-webkit-input-placeholder {
    color: #929292;
  }
}
::v-deep .el-icon-arrow-up:before {
  color: #000;
}

::v-deep .el-form-item {
  margin-bottom: 15px;
}

::v-deep .el-input.is-disabled .el-input__inner {
  color: #606266 !important;
}

::v-deep .el-textarea.is-disabled .el-textarea__inner {
  color: #606266 !important;
}

::v-deep .el-tag.el-tag--info {
  color: #606266 !important;
}

.line-style {
  border-bottom: 1px solid #cacaca;
}
.type-style {
  background-color: #a7a7a7;
}
.img-style {
  width: 20px;
  height: 20px;
  border-radius: 50%;
}
.input-number-style {
  border: 1px solid #DCDFE6;
  border-radius: 4px;
}
// 上传
::v-deep .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
// ::v-deep .avatar-uploader .el-upload:hover {
//   border-color: #409EFF;
// }
::v-deep .avatar-uploader-icon {
  border: 1px dashed #d9d9d9;
  font-size: 28px;
  color: #8c939d;
  width: 150px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.avatar {
  width: 150px;
  height: 100px;
  display: block;
}
.preview-style {
  width: 300px;
  height: 200px;
}
</style>
