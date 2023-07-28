<template>
  <div class="discover-container">
    <div v-if="isShow">
      <div class="discover-top">
        <div class="discover-title">{{ $t('konwledge.discoverTitle') }}</div>
        <el-input class="discover-search-box" v-model="searchData.searchContent" placeholder="please input ..." clearable>
          <el-button type="primary" slot="append" @click="searchKonwledge">{{ $t('konwledge.search') }}</el-button>
        </el-input>
        <div class="discover-srarch-condition">
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
      <div class="discover-bottom">
        <div class="discover-item">
          <div class="item-title-box">
            <div class="item-title">{{ $t('konwledge.hottestKnowledge') }}</div>
            <el-radio-group class="item-chose" v-model="hottestSort" size="mini" @input="getHottestList">
              <el-radio-button label="thisMonthViews-desc">{{ $t('konwledge.thisMonth') }}</el-radio-button>
              <el-radio-button label="totalViews-desc">{{ $t('konwledge.totalView') }}</el-radio-button>
            </el-radio-group>
            <div class="item-all">{{ $t('konwledge.aLL') }}</div>
          </div>
          <div class="item-content-box">
            <div class="content-item" :class="item.readed ? '' : 'read-style'" v-for="(item, index) in hottestList" :key="index">
              <div class="content-item-title" :class="item.readed ? '' : 'read-style'">【 <span>{{ item.serialNo }}</span> 】{{ item.title }}</div>
              <div class="content-item-text">{{ item.summary }}</div>
              <div class="content-item-keyword">
                <div class="keyword-item" v-for="(keyItem, keyIndex) in item.keywordsList" :key="keyIndex">{{ keyItem }}</div>
              </div>
              <div class="content-item-bottom">
                <div>【{{ item.author }}】</div>
                <div>Updated on {{ item.updateDateEng }}</div>
                <div v-if="hottestSort === 'thisMonthViews-desc'">{{ item.thisMonthViews }} views</div>
                <div v-if="hottestSort === 'totalViews-desc'">{{ item.totalViews }} views</div>
              </div>
            </div>
          </div>
        </div>
        <div class="discover-item">
          <div class="item-title-box">
            <div class="item-title">{{ $t('konwledge.latest') }}</div>
            <div class="item-all">{{ $t('konwledge.aLL') }}</div>
          </div>
          <div class="item-content-box">
            <div class="content-item" :class="item.readed ? '' : 'read-style'" v-for="(item, index) in latestList" :key="index">
              <div class="content-item-title" :class="item.readed ? '' : 'read-style'">【 <span>{{ item.serialNo }}</span> 】{{ item.title }}</div>
              <div class="content-item-text">{{ item.summary }}</div>
              <div class="content-item-keyword">
                <div class="keyword-item" v-for="(keyItem, keyIndex) in item.keywordsList" :key="keyIndex">{{ keyItem }}</div>
              </div>
              <div class="content-item-bottom">
                <div>【{{ item.author }}】</div>
                <div>Updated on {{ item.updateDateEng }}</div>
                <div>{{ item.totalViews }} views</div>
              </div>
            </div>
          </div>
        </div>
        <div class="discover-item">
          <div class="item-title-box">
            <div class="item-title">{{ $t('konwledge.notice') }}</div>
            <div class="item-all">{{ $t('konwledge.aLL') }}</div>
          </div>
          <div class="item-content-box">
            <div class="content-item" :class="item.readed ? '' : 'read-style'" v-for="(item, index) in noticeList" :key="index">
              <div class="content-item-title" :class="item.readed ? '' : 'read-style'">【 <span>{{ item.serialNo }}</span> 】{{ item.title }}</div>
              <div class="content-item-text">{{ item.summary }}</div>
              <div class="content-item-keyword">
                <div class="keyword-item" v-for="(keyItem, keyIndex) in item.keywordsList" :key="keyIndex">{{ keyItem }}</div>
              </div>
              <div class="content-item-bottom">
                <div>【{{ item.author }}】</div>
                <div>Updated on {{ item.updateDateEng }}</div>
                <div>{{ item.totalViews }} views</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="detail-top">
        <div class="detail-title">{{ $t('konwledge.discoverTitle') }}</div>
        <el-input class="detail-search-box" v-model="searchData.searchContent" placeholder="please input ..." clearable>
          <el-button type="primary" slot="append" icon="el-icon-search" @click="searchKonwledge"></el-button>
        </el-input>
      </div>
      <div class="detail-bottom">
        <div class="search-result">
          <div class="result-title">{{ $t('konwledge.searchResult') }}</div>
          <el-radio-group class="result-condition" v-model="searchData.searchType" size="mini">
            <el-radio-button label="All">{{ $t('konwledge.all') }}</el-radio-button>
            <el-radio-button label="Title">{{ $t('konwledge.title') }}</el-radio-button>
            <el-radio-button label="Keyword">{{ $t('konwledge.keyword') }}</el-radio-button>
            <el-radio-button label="Text">{{ $t('konwledge.text') }}</el-radio-button>
          </el-radio-group>
        </div>
        <div class="result-text">Search for the "<span style="color: red;">{{ showSearchContent }}</span>" with a hit mode of 【Precision Mode】. The full text search will find <span style="color: red;">{{ searchDataRes.total }}</span> results for you, taking <span style="color: red;">{{ searchDataRes.took / 100 }}</span> seconds to search</div>
        <div class="result-sort">
          <div class="sort-title">{{ $t('konwledge.sort') }}:</div>
          <el-radio-group class="sort-condition" v-model="searchData.sort" size="mini">
            <el-radio-button :label="null">{{ $t('konwledge.default') }}</el-radio-button>
            <el-radio-button label="totalViews-desc">{{ $t('konwledge.hits') }}</el-radio-button>
            <el-radio-button label="createDate-desc">{{ $t('konwledge.latest') }}</el-radio-button>
          </el-radio-group>
        </div>
        <div class="content-main">
          <div class="content-item" :class="item.readed ? '' : 'read-style'" v-for="(item, index) in searchDataRes.records" :key="index">
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
        <pagination v-show="total > 0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="searchKonwledge" />
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { getDiscoverListApi } from '@/api/knowledge-tree'
import { formatDateEng } from "@/utils"
import { cloneDeep } from "lodash-es"

export default {
  name: 'KnowledgeDiscover',
  components: { Pagination },
  data() {
    return {
      isShow: true,
      searchDataDeep: {},
      searchData: {
        searchContent: '',
        searchType: 'All',
        sort: null,
      },
      hottestSort: 'thisMonthViews-desc',
      hottestList: [],
      latestList: [],
      noticeList: [],
      showSearchContent: '',
      searchDataRes: {},
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
    this.getHottestList()
    this.getLatestList()
    this.getNoticeList()
  },
  methods: {
    searchKonwledge() {
      this.listQuery.page = 1
      if (!this.searchData.searchContent) {
        this.searchData = cloneDeep(this.searchDataDeep)
        this.hottestSort = 'thisMonthViews-desc'
        this.getHottestList()
        this.getLatestList()
        this.getNoticeList()
        this.isShow = true
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
            this.searchDataRes = res.data
            this.total = res.data.total
            this.showSearchContent = this.searchData.searchContent
            this.isShow = false
          }
        })
      }
    },
    getHottestList() {
      let params = {
        sort: this.hottestSort,
        pageNo: 1,
        pageSize: 8
      }
      getDiscoverListApi(params).then(res => {
        if (res.code === 200) {
          if (res.data.records && res.data.records.length !== 0) {
            res.data.records.forEach(item => {
              if (item.keywords) {
                item.keywordsList = item.keywords.split(',')
              }
              item.updateDateEng = formatDateEng(item.updateDate)
            })
          }
          this.hottestList = res.data.records
        }
      })
    },
    getLatestList() {
      let params = {
        sort: 'createDate-desc',
        pageNo: 1,
        pageSize: 8
      }
      getDiscoverListApi(params).then(res => {
        if (res.code === 200) {
          if (res.data.records && res.data.records.length !== 0) {
            res.data.records.forEach(item => {
              if (item.keywords) {
                item.keywordsList = item.keywords.split(',')
              }
              item.updateDateEng = formatDateEng(item.updateDate)
            })
          }
          this.latestList = res.data.records
        }
      })
    },
    getNoticeList() {
      let params = {
        sort: 'createDate-desc',
        type: 2,
        pageNo: 1,
        pageSize: 8
      }
      getDiscoverListApi(params).then(res => {
        if (res.code === 200) {
          if (res.data.records && res.data.records.length !== 0) {
            res.data.records.forEach(item => {
              if (item.keywords) {
                item.keywordsList = item.keywords.split(',')
              }
              item.updateDateEng = formatDateEng(item.updateDate)
            })
          }
          this.noticeList = res.data.records
        }
      })
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
}

.discover-container {
  background-color: #fff;
  min-height: 88vh;
  height: 88vh;
  .discover-top {
    padding: 15px 0;
    background-color: #ccc;
    .discover-title {
      text-align: center;
      font-size: 20px;
      font-weight: 700;
    }
    .discover-search-box {
      margin: 10px 20%;
      width: 60%;
    }
    .discover-srarch-condition {
      margin: 0 auto;
      width: 60%;
      display: flex;
      justify-content: space-between;
      .condition-left {}
      .condition-right {}
    }
  }
  .discover-bottom {
    padding: 15px 10px;
    display: flex;
    justify-content: space-between;
    .discover-item {
      padding: 10px;
      width: 33%;
      min-height: 65vh;
      height: 65vh;
      overflow: hidden;
      border: 1px solid #bbb;
      .item-title-box {
        margin-bottom: 10px;
        display: flex;
        justify-content: space-between;
        line-height: 28px;
        .item-title {
          font-weight: 700;
        }
        .item-all {
          font-size: 14px;
          color: #888888;
        }
      }
      .item-content-box {
        height: 100%;
        overflow-y: auto;
        &::-webkit-scrollbar {
          display:none;
        }
        .content-item {
          margin: 5px 0 15px;
          line-height: 18px;
          font-size: 14px;
          color: #888888;
          .content-item-title {
            font-weight: 700;
            color: #000;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            span {
              font-weight: 500;
            }
          }
          .content-item-text {
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 2;
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

  .detail-top {
    padding: 20px;
    display: flex;
    background-color: #ccc;
    .detail-title {
      line-height: 36px;
      text-align: center;
      font-size: 20px;
      font-weight: 700;
    }
    .detail-search-box {
      margin-left: 10px;
      width: 50%
    }
  }
  .detail-bottom {
    padding: 30px 30px 0;
    .search-result {
      display: flex;
      .result-title {
        font-size: 20px;
        font-weight: 700;
        line-height: 28px;
      }
      .result-condition {
        margin-left: 30px;
      }
    }
    .result-text {
      margin: 10px 0;
      font-size: 14px;
    }
    .result-sort {
      display: flex;
      font-size: 16px;
      .sort-title {
        line-height: 28px;
      }
      .sort-condition {
        margin-left: 20px;
      }
    }
    .content-main {
      margin-top: 20px;
      padding: 10px 15px 5px;
      height: 50vh;
      border: 1px solid #ccc;
      overflow-y: auto;
      &::-webkit-scrollbar {
        display:none;
      }
      .content-item {
        margin: 5px 0 10px;
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
