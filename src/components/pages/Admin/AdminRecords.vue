<template>
  <div class="container">
    <el-row :gutter="20">
      <el-col :span="24">
        <el-input placeholder="Veuillez entrer le numéro d'étudiant" v-model="query">
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
            <el-form-item label="Nom de membre">
              <span>{{ props.row.username }}</span>
            </el-form-item>
            <el-form-item label="Numéro d'étudiant">
              <span>{{ props.row.num }}</span>
            </el-form-item>
            <el-form-item label="Numéro de telephone">
              <span>{{ props.row.tel }}</span>
            </el-form-item>
            <el-form-item label="Addres">
              <span>{{ props.row.address }}</span>
            </el-form-item>
            <el-form-item label="Tpye de membre">
              <span>{{ props.row.rank }}</span>
            </el-form-item>
            <el-form-item label="Nom de oeuvre">
              <span>{{ props.row.title }}</span>
            </el-form-item>
            <el-form-item label="UUID">
              <span>{{ props.row.uuid }}</span>
            </el-form-item>
            <el-form-item label="Date">
              <span>{{ props.row.returnTime }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column prop="num" label="Numéro d'étudiant">
      </el-table-column>
      <el-table-column prop="username" label="Nom de membre">
      </el-table-column>
      <el-table-column prop="title" label="Nom de oeuvre">
      </el-table-column>
      <el-table-column prop="borrowTime" label="Date">
      </el-table-column>
      <el-table-column prop="returnTime" label="Status" width="100"
                       :filters="[{ text: 'Retourné', value: 'Retourné' }, { text: 'Pas Retourner', value: 'Pas Retourner' }, { text: 'Expiration', value: 'Expiration'}]"
                       :filter-method="filterReturn">
        <template slot-scope="scope">
          <el-tag :type="scope.row.tag === 'Dépasser le délai' ? 'danger' : 'success'" close-transition>{{scope.row.tag}}</el-tag>
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
