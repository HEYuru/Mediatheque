<template>
  <div class="container">
    <el-input placeholder="Veuillez entrer le numéro d'étudiant" icon="search" v-model="query" :on-icon-click="search.bind(this, query)">
    </el-input>
    <el-row :gutter="10">
      <el-col :span="12" v-for="record in recordRes" :key="record.recordId">
        <Record :record="record" :choose="returnBook" />
      </el-col>
    </el-row>
  </div>
</template>

<script>

import {
  mapGetters
} from 'vuex'

import {
  SEARCH_RECORDS,
  UPDATE_RECORD
} from '@/constants/values'
import Record from '@/components/Record.vue'

export default {
  name: 'Return',
  components: {
    Record
  },
  data () {
    return {
      query: ''
    }
  },
  computed: mapGetters([
    'recordRes'
  ]),
  methods: {
    /**
       * 搜索借阅记录
       */
    search (param) {
      if (!param || !param.trim()) {
        this.$message({
          message: 'Entrez les conditions de requête'
        })
      } else {
        this.$store.dispatch(SEARCH_RECORDS, {
          params: {
            title: param
          }
        })
      }
    },
    /**
       * 归还图书
       */
    returnBook (record) {
      // 这里处理数据，更新records。
      const recordId = record.recordId
      this.$store.dispatch(UPDATE_RECORD, {
        id: recordId,
        params: {
          recordState: 2
        }
      })
    }
  }
}
</script>
