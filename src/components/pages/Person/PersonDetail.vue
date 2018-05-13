<template>
  <div>
    <el-card>
      <h3>{{user.username}}</h3>
      <p>会员类型：
        <span>{{user.rank}}</span>
      </p>
      <p>学号：
        <span>{{user.num}}</span>
      </p>
      <p>联系方式：
        <span>{{user.tel}}</span>
      </p>
      <p>地址：
        <span>{{user.address}}</span>
      </p>
      <p>登记日期：
        <span>{{user.createTime}}</span>
      </p>
    </el-card>
    <div class="row">
      <h4>正在借阅的书籍</h4>
      <template v-if="recordRes.length === 0">
        <p>没有借阅</p>
      </template>
      <template v-else>
        <el-card v-for="product in recordRes" :key="product.recordId">
          <h3>{{product.title}}</h3>
          <p>借阅时间：
            <span>{{product.borrowTime}}</span>
          </p>
        </el-card>
      </template>
    </div>
  </div>
</template>

<script>

import {
  mapGetters
} from 'vuex'

import {
  SEARCH_RECORDS
} from '@/constants/values'

export default {
  name: 'PersonInfo',
  computed: mapGetters([
    'recordRes',
    'user'
  ]),
  mounted () {
    this.$store.dispatch(SEARCH_RECORDS, {
      params: {
        id: 1
      }
    })
  }
}
</script>
<style scoped>
  .el-card {
    margin-top: 0;
  }
</style>
