<template>
  <div class="container">
    <el-row :gutter="20">
      <el-col :span="24">
        <el-input placeholder="请输入名称或学号" v-model="query">
          <el-button v-on:click="searchRecords(query)" slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="6">
      </el-col>
    </el-row>
    <el-table :data="recordhistory" stripe style="margin-top: 20px; width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="会员名">
              <span>{{ props.row.username }}</span>
            </el-form-item>
            <el-form-item label="学号">
              <span>{{ props.row.num }}</span>
            </el-form-item>
            <el-form-item label="联系方式">
              <span>{{ props.row.tel }}</span>
            </el-form-item>
            <el-form-item label="地址">
              <span>{{ props.row.address }}</span>
            </el-form-item>
            <el-form-item label="会员类型">
              <span>{{ props.row.rank }}</span>
            </el-form-item>
            <el-form-item label="书籍名">
              <span>{{ props.row.title }}</span>
            </el-form-item>
            <el-form-item label="UUID">
              <span>{{ props.row.uuid }}</span>
            </el-form-item>
            <el-form-item label="归还时间">
              <span>{{ props.row.returnTime }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column prop="num" label="会员学号">
      </el-table-column>
      <el-table-column prop="username" label="会员名称">
      </el-table-column>
      <el-table-column prop="title" label="书籍名称">
      </el-table-column>
      <el-table-column prop="borrowTime" label="借阅时间">
      </el-table-column>
      <el-table-column prop="returnTime" label="状态" width="100"
                       :filters="[{ text: '已还', value: '已还' }, { text: '未还', value: '未还' }, { text: '超期', value: '超期'}]"
                       :filter-method="filterReturn">
        <template slot-scope="scope">
          <el-tag :type="scope.row.tag === '超期' ? 'danger' : 'success'" close-transition>{{scope.row.tag}}</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { FETCH_RECORDS } from '@/constants/values'

export default {
  name: 'Records',
  data () {
    return {
      query: null,
      records: []
    }
  },
  computed: mapGetters(['recordhistory']),
  mounted () {
    this.$store.dispatch('FETC_HISTORY')
  },
  methods: {
    searchRecords () {
      const params = {
        name: this.query
      }
      this.$store.dispatch(FETCH_RECORDS, params)
    },
    filterReturn (value, row) {
      return row.tag === value
    }
  }
}
</script>
