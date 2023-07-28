// import store from '@/store'
import { get, cloneDeep, stubTrue } from 'lodash-es'
import { randomInt } from '@/utils'
import { getDictionary } from '@/api/commonApi'
import { fieldTypes } from '@/dict'
const sortArr = []
export default {
  data() {
    return {
      formKey: `${new Date()}`,
      formConf: null,
      formData22: {
        firstName: '99'
      },
      formData_parser: {}
    }
  },
  created() {},
  mounted() {
    //  1:数值 2:文本框 3:单选按钮 4:复选按钮 5:邮箱 6:电话 7:日期时间 8:日期 9:时间 10:下拉框   requiredFlag
  },
  watch: {},
  methods: {
    fillFormData(ps = {}) {
      const df = {
        data: {},
        form: this.formConf,
        notRefresh: false,
        isFirst: false
      }
      ps = { ...df, ...ps }
      const { data, form, notRefresh, isFirst } = ps
      form.fields.forEach((item) => {
        if (data === 'all') {
          item.__config__.defaultValue = ''
          return
        }
        const val = data[item.__vModel__]
        if (data.hasOwnProperty(item.__vModel__) && val !== undefined) {
          item.__config__.defaultValue = val
        }
      })
      if (isFirst) {
        if (data.country) {
          this.buildDictionary('country', data.country, true)
        }
        if (data.state) {
          this.buildDictionary('state', data.state, true)
        }
      }
      if (!notRefresh) {
        this.formKey = +new Date()
      }
    },
    buildFormConf(formConf, data) {
      const df = {
        fields: [],
        formRef: 'elForm',
        formModel: this.formData22,
        size: 'small',
        labelPosition: 'left',
        labelWidth: 112,
        formRules: 'rules',
        gutter: 15,
        disabled: false,
        readonly: false,
        span: 24,
        itemSpan: 24,
        formBtns: true
      }
      formConf = { ...df, ...formConf }
      // formFieldsSortArr
      const order = this.formFieldsSortArr
      const fieldsArr = order ? data.filter((v) => order.includes(v.fieldNm)).sort((a, b) => order.indexOf(a.fieldNm) - order.indexOf(b.fieldNm)) : data
      formConf.fields = fieldsArr.map((v) => {
        const fieldTypeName = fieldTypes.getName(v.fieldType)
        // console.log(fieldTypes, 'fieldTypes')
        let item = {
          __config__: {
            label: v.showNm,
            labelWidth: null,
            showLabel: true,
            changeTag: true,
            tag: fieldTypes.getTag(v.fieldType) || 'el-' + fieldTypeName || 'el-input',
            tagIcon: fieldTypes.getName(v.fieldType),
            required: v.requiredFlag === '1',
            // required: true,
            layout: 'colFormItem',
            span: formConf.itemSpan,
            regList: [],
            formId: v.id
            // renderKey: new Date().getTime()
          },
          style: {
            width: '100%'
          },
          __slot__: {
            prepend: '',
            append: '',
            options: v.options ? JSON.parse(v.options).map((t) => ({ label: t.value, value: t.key })) : [] // 下拉框
          },
          fieldData: { mappingCode: v.mappingCode, fieldType: v.fieldType },
          // __vModel__: 'field' + v.id,
          __vModel__: v.fieldNm,
          placeholder: '',
          maxlength: null,
          readonly: formConf.readonly,
          disabled: formConf.readonly && v.fieldType == fieldTypes.select.id
          // readonly: v.readonlyFlag === '1'
        }
        // if (v.mappingCode && v.fieldType == fieldTypes.select.id) {
        //   getDictionary(v.mappingCode).then((json) => {
        //     item.__slot__.options = json.data.map((t) => ({ label: t.dictNm, value: t.dictCode }))
        //   })
        // }
        if (v.fieldType == fieldTypes.textarea.id) {
          item.type = 'textarea'
          item.autosize = {
            minRows: 1,
            maxRows: 100
          }
        } else if (v.fieldType == fieldTypes.email.id) {
          item.__config__.regList.push({
            pattern: ' /^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$/',
            message: '邮箱格式错误'
          }) // 邮箱
        } else if (v.fieldType == fieldTypes.phone.id) {
          // item.type = 'number'
        } else if (v.fieldType == fieldTypes.datetime.id || v.fieldType == fieldTypes.date.id || v.fieldType == fieldTypes.time.id) {
          item.type = 'date'
          item.format = 'yyyy/MM/dd'
          // item['value-format'] = 'yyyy/MM/dd'
        }
        // 'datetime', 'date', 'time', 'select', 'cascade', 'textarea
        return item
      })
      this.formConf = formConf
      this.buildDictionary()
      this.buildCascade()
    },
    buildDictionary(cascadeFieldName, id, isFirst) {
      let arr = []
      if (!cascadeFieldName) {
        this.formConf.fields.forEach((item) => {
          if (item.fieldData.mappingCode && item.fieldData.fieldType == fieldTypes.select.id && item.fieldData.mappingCode != 'State' && item.fieldData.mappingCode != 'City') {
            //先写死，后端数据还没有重构
            const a = getDictionary(item.fieldData.mappingCode).then((json) => {
              item.__slot__.options = json.data.map((t) => ({ label: t.dictNm, value: t.dictCode }))
            })
            arr.push(a)
          }
        })
      } else {
        const item = this.formConf.fields.find((v) => v.__vModel__ == cascadeFieldName)
        if (cascadeFieldName === 'country') {
          if (!isFirst) {
            this.fillFormData({ data: { state: '', city: '' } })
          }
          let state = this.formConf.fields.find((v) => v.__vModel__ == 'state')
          let city = this.formConf.fields.find((v) => v.__vModel__ == 'city')
          // State: 37
          const a = getDictionary(`${state.fieldData.mappingCode}:${id}`).then((json) => {
            state.__slot__.options = json.data.map((t) => ({ label: t.dictNm, value: t.dictCode }))
            city.__slot__.options = []
          })
          arr.push(a)
        } else if (cascadeFieldName === 'state') {
          if (!isFirst) {
            this.fillFormData({ data: { city: '' } })
          }
          let city = this.formConf.fields.find((v) => v.__vModel__ == 'city')
          const a = getDictionary(`${city.fieldData.mappingCode}:${id}`).then((json) => {
            city.__slot__.options = json.data.map((t) => ({ label: t.dictNm, value: t.dictCode }))
          })
          arr.push(a)
        }
      }
      Promise.all(arr).then((res) => {
        // alert('ok')
        this.formKey = +new Date()
      })
    },
    buildCascade() {
      // this.$nextTick(() => {
      //   console.log(this.$refs.formRef, 'this.formRef')
      //   // this.formData_parser = this.$refs.formRef.formData
      // })
    },
    getFormData(res) {
      console.log(res)
      const data = res.formModel
      this.fillFormData({ data: { [res.__vModel__]: res.val }, notRefresh: true })
      if (res.__vModel__ === 'country' && this.formData_parser.country != data.country) {
        this.buildDictionary('country', data.country)
      } else if (res.__vModel__ === 'state' && this.formData_parser.state != data.state) {
        this.buildDictionary('state', data.state)
      }
      this.formData_parser = cloneDeep(data)
    },
    resetForm() {
      this.fillFormData({ data: 'all' })
    }
  }
}
