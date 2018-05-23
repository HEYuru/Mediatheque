<template>
  <div class="header">
    <el-breadcrumb class="header__breadbrumb" separator="/">
      <template v-for="(item, i) in routes">
        <el-breadcrumb-item :key="i" :to="{ path: item.path }">{{item.name}}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
    <div style="line-height: 46px;" v-if="isAdmin">
      <el-dropdown>
        <span class="el-dropdown-link">
          {{user.username}}
          <i class="el-icon-caret-bottom el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item><div @click="logout">Se déconnecter</div></el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div v-else>
      <el-dropdown>
        <span class="el-dropdown-link">
          <router-link :to="{ path: USER_LOGIN }">Login</router-link>
        </span>
      </el-dropdown>
    </div>
  </div>
</template>

<script>

import {
  mapGetters
} from 'vuex'

import {
  USER_LOGIN,
  LOGOUT
} from '@/constants/values'

export default {
  name: 'adminheader',
  data () {
    return {
      USER_LOGIN
    }
  },
  computed: {
    ...mapGetters([
      'user',
      'login',
      'isAdmin'
    ]),
    routes () {
      return this.$route.matched
    }
  },
  methods: {
    logout () {
      this.$store.dispatch(LOGOUT)
    }
  }
}
</script>

<style>
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 30px 0 20px;
    min-height: 46px;
    box-shadow: 0 0 5px #ccc;
  }
  .header__breadbrumb {
    margin-left: 10px;
    line-height: 46px;
  }
</style>
