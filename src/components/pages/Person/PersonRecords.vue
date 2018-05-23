<template>
  <div>
    <el-input placeholder="Entrez le nom d'Oeuvre" icon="search" v-model="query">
    </el-input>
    <el-table :data="records" stripe style="width: 100%">
      <el-table-column prop="title" label="nom d'oeuvre">
      </el-table-column>
      <el-table-column prop="borrowTime" label="date d'emprunt">
      </el-table-column>
      <el-table-column prop="returnTime" label="date de retour">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {
  searchRecordByMemberId
} from '@/api/admin/records'
export default {
  name: 'PersonRecords',
  data () {
    return {
      records: [],
      query: ''
    }
  },
  created () {
    searchRecordByMemberId('test')
      .then(res => {
        this.records = res
      })
      .catch(err => {
        this.$message({
          message: err
        })
      })
  }
}
</script>
