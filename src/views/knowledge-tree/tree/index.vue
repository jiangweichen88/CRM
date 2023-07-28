<template>
  <div class="tree-container">
    <div class="tree-top">
      <div class="tree-title">{{ $t('konwledge.discoverTitle') }}</div>
      <el-input class="tree-search-box" v-model="searchData.searchContent" placeholder="please input ..." clearable>
        <el-button type="primary" slot="append" @click="searchKonwledge">{{ $t('konwledge.search') }}</el-button>
      </el-input>
      <div class="tree-srarch-condition">
        <el-radio-group class="condition-left" v-model="searchData.searchType" size="mini">
          <el-radio-button label="All">{{ $t('konwledge.all') }}</el-radio-button>
          <el-radio-button label="Title">{{ $t('konwledge.title') }}</el-radio-button>
          <el-radio-button label="Keyword">{{ $t('konwledge.keyword') }}</el-radio-button>
          <el-radio-button label="Text">{{ $t('konwledge.text') }}</el-radio-button>
        </el-radio-group>
        <el-select class="condition-right" v-model="searchData.sort" size="mini">
          <el-option :label="$t('konwledge.defaultSort')" :value="null" />
          <el-option :label="$t('konwledge.hits')" value="totalViews-desc" />
          <el-option :label="$t('konwledge.latest')" value="createDate-desc" />
        </el-select>
      </div>
    </div>
    <div class="tree-bottom">
      <div class="content-left">
        <el-tree
          :data="treeData"
          :props="props"
          :load="loadNode"
          @node-click="treeClick"
          lazy
        >
        </el-tree>
      </div>
      <div class="content-main">
        <div class="content-item" :class="item.readed ? '' : 'read-style'" v-for="(item, index) in searchDataList" :key="index">
          <div class="title-box">
            <div class="content-item-title" :class="item.readed ? '' : 'read-style'">【 <span>{{ item.serialNo }}</span> 】<span v-html="item.title"></span></div>
            <div>【{{ item.author }}】 Updated on {{ item.updateDateEng }}</div>
          </div>
          <div class="content-item-text" v-html="item.summary"></div>
          <div class="content-item-keyword">
            <div class="keyword-item" v-for="(keyItem, keyIndex) in item.keywordsList" :key="keyIndex" v-html="keyItem"></div>
          </div>
          <div class="content-item-bottom">
            <div>{{ item.path }}</div>
            <div>{{ item.totalViews }} views</div>
          </div>
        </div>
      </div>
    </div>
    <pagination v-show="total > 0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="paginationSearch" />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { getDiscoverListApi, getlevelTreeListApi, getTreeArticlesApi } from '@/api/knowledge-tree'
import { formatDateEng } from "@/utils"
import { cloneDeep } from "lodash-es"

export default {
  name: 'KnowledgeTree',
  components: { Pagination },
  data() {
    return {
      searchDataDeep: {},
      searchData: {
        searchContent: '',
        searchType: 'All',
        sort: null,
      },
      searchDataList: [],
      // 树结构
      treeData: [],
      props: {
        label: 'name',
        children: 'children',
        isLeaf: 'isLeaf'
      },
      saveId: '', // 保存上一次点击的节点id
      // 分页
      total: 0,
      listQuery: {
        page: 1,
        limit: 25
      }
    }
  },
  created() {
    this.searchDataDeep = cloneDeep(this.searchData)
  },
  mounted() {
    this.getlevelTreeList()
  },
  methods: {
    // 搜索框搜索
    searchKonwledge() {
      this.total = 0
      this.listQuery.page = 1
      this.saveId = ''
      if (!this.searchData.searchContent) {
        this.searchData = cloneDeep(this.searchDataDeep)
      } else {
        this.searchData.page = this.listQuery.page
        this.searchData.pageSize = this.listQuery.limit
        getDiscoverListApi(this.searchData).then(res => {
          if (res.code === 200) {
            if (res.data.records && res.data.records.length !== 0) {
              res.data.records.forEach(item => {
                if (item.keywords) {
                  item.keywordsList = item.keywords.split(',')
                }
                if (item.path) {
                  item.path = item.path.split('/').join(' > ')
                }
                item.updateDateEng = formatDateEng(item.updateDate)
              })
            }
            this.searchDataList = res.data.records
            this.total = res.data.total
          }
        })
      }
    },
    // 获取树结构第一层
    getlevelTreeList() {
      getlevelTreeListApi('').then(res => {
        if (res.code === 200 && res.data.length !== 0) {
          res.data.forEach(item => {
            item.name = `${item.name} (${item.count})`
            if (item.count === 0) {
              item.isLeaf = true
            } else {
              item.isLeaf = false
            }
          })
          this.treeData = res.data
        }
      })
    },
    // 懒加载获取树结构子节点
    loadNode(node, resolve) {
      if (node.level === 0) {
        return resolve([])
      }
      getlevelTreeListApi(node.data.id).then(res => {
        if (res.code === 200) {
          if (res.data.length !== 0) {
            res.data.forEach(item => {
              item.name = `${item.name} (${item.count})`
              if (item.count === 0) {
                item.isLeaf = true
              } else {
                item.isLeaf = false
              }
            })
            resolve(res.data)
          } else {
            return resolve([])
          }
        }
      })
    },
    // 点击树结构搜索知识点
    treeClick(value) {
      this.searchData = cloneDeep(this.searchDataDeep)
      this.total = 0
      this.listQuery.page = 1

      let params = {
        page: this.listQuery.page,
        pageSize: this.listQuery.limit
      }
      this.saveId = value.id
      getTreeArticlesApi(value.id, params).then(res => {
        if (res.code === 200) {
          if (res.data.records && res.data.records.length !== 0) {
              res.data.records.forEach(item => {
                if (item.keywords) {
                  item.keywordsList = item.keywords.split(',')
                }
                if (item.path) {
                  item.path = item.path.split('/').join(' > ')
                }
                item.updateDateEng = formatDateEng(item.updateDate)
              })
            }
            this.searchDataList = res.data.records
            this.total = res.data.total
        }
      })
    },
    // 分页搜索
    paginationSearch() {
      if (this.searchData.searchContent) {
        this.searchKonwledge()
      } else {
        this.treeClick({ id: this.saveId })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-radio-button .el-radio-button__inner {
  padding: 6px 0;
  width: 80px;
  border-radius: 0;
  text-align: center;
  font-weight: 700;
}
::v-deep .el-select .el-input__inner {
  border-radius: 0;
  width: 120px;
  // border: none;
  // background-color: #ccc;
}

.read-style {
  color: #3f51b5 !important;
}
.pagination-container {
  margin-top: 15px;
  padding: 0;
  float: right;
  background-color: #e7e7e7;
}

.tree-container {
  background-color: #fff;
  min-height: 88vh;
  height: 100%;
  background-color: #e7e7e7;
  .tree-top {
    padding: 15px 0;
    background-color: #ccc;
    .tree-title {
      text-align: center;
      font-size: 20px;
      font-weight: 700;
    }
    .tree-search-box {
      margin: 10px 20%;
      width: 60%;
    }
    .tree-srarch-condition {
      margin: 0 auto;
      width: 60%;
      display: flex;
      justify-content: space-between;
      .condition-left {}
      .condition-right {}
    }
  }
  .tree-bottom {
    padding: 10px 10px 0;
    display: flex;
    justify-content: space-between;
    .content-left {
      padding: 10px;
      width: 19%;
      background-color: #fff;
      overflow: auto;
    }
    .content-main {
      padding: 10px;
      width: 80%;
      min-height: 60vh;
      height: 60vh;
      overflow: hidden;
      background-color: #fff;
      overflow-y: auto;
      &::-webkit-scrollbar {
        display:none;
      }
      .content-item {
        margin-bottom: 10px;
        padding: 10px;
        line-height: 20px;
        font-size: 14px;
        color: #888888;
        border: 1px solid #ccc;
        .title-box {
          display: flex;
          justify-content: space-between;
          .content-item-title {
            width: 50%;
            font-weight: 700;
            color: #000;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            span {
              font-weight: 500;
            }
          }
        }
        .content-item-text {
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }
        .content-item-keyword {
          margin: 5px 0;
          display: flex;
          .keyword-item {
            margin-right: 10px;
            padding: 3px 5px;
            min-width: 70px;
            border: 1px solid #ccc;
          }
        }
        .content-item-bottom {
          display: flex;
          justify-content: space-between;
        }
      }
    }
  }
}
</style>
