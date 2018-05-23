<template>
  <div>
    <el-row>
      <el-col :span="8">
        <el-input type="text" placeholder="Nom d'utilisateur" v-model="username" />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-input type="password" placeholder="Mot de passe" v-model="password" />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-button style="width: 100%;" type="primary" @click="login(username, password)">Login</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  // 组件名
  name: 'LoginForm',
  props: [
    'login'
  ],
  data () {
    return {
      username: null,
      password: null
    }
  }
}
</script>

<style scoped>
  .el-col {
    margin-bottom: 20px;
  }
</style>
