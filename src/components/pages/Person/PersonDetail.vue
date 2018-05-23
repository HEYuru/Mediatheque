<template>
  <div>
    <el-card>
      <h3>{{user.username}}</h3>
      <p>type：
        <span>{{user.rank}}</span>
      </p>
      <p>nombre：
        <span>{{user.num}}</span>
      </p>
      <p>Numéro de mobile：
        <span>{{user.tel}}</span>
      </p>
      <p>Adresse：
        <span>{{user.address}}</span>
      </p>
      <p>Date d'inscription：
        <span>{{user.createTime}}</span>
      </p>
    </el-card>
    <div class="row">
      <h4>Emprunter en cours</h4>
      <template v-if="recordRes.length === 0">
        <p>pas Emprunter</p>
      </template>
      <template v-else>
        <el-card v-for="product in recordRes" :key="product.recordId">
          <h3>{{product.title}}</h3>
          <p>date d'emprunter：
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
