<template>
  <el-menu class="el-menu-demo" mode="horizontal">
    <el-menu-item index="1">
      <router-link :to="{ path: '/index' }">Mediatheque</router-link>
    </el-menu-item>
    <template v-if="user">
      <el-submenu index="2">
        <template slot="title">{{user.username}}</template>
        <el-menu-item index="2-1">
          <router-link :to="{ path: PERSON_HOME }">Accieul</router-link>
        </el-menu-item>
        <el-menu-item index="2-2">
          <router-link :to="{ path: PERSON_RECORDS }">Emprunts</router-link>
        </el-menu-item>
      </el-submenu>
    </template>
    <template v-else>
      <el-menu-item index="2">
        <router-link :to="{ path: USER_LOGIN }">Login</router-link>
      </el-menu-item>
    </template>
    <el-menu-item index="3" v-if="login">
      <a @click="logout()">Se déconnecter</a>
    </el-menu-item>
  </el-menu>
</template>

<script>
import {
  mapGetters
} from 'vuex'

import {
  USER_LOGIN,
  PERSON_HOME,
  PERSON_RECORDS,
  PERSON_ORDERS
} from '@/constants/values'

export default {
  name: 'navigationbar',
  data () {
    return {
      PERSON_HOME,
      PERSON_RECORDS,
      PERSON_ORDERS,
      USER_LOGIN
    }
  },
  computed: {
    ...mapGetters([
      'user',
      'login'
    ])
  },
  methods: {
    logout () {
      this.$store.dispatch('LOGOUT')
    }
  }
}
</script>
