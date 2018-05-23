<template>
  <div class="container">
    <el-row>
      <el-col :offset="8">
        <h3>Mediatheque - Sign in</h3>
        <LoginForm :login="login" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import LoginForm from '@/components/LoginForm.vue'
import {
  LOGIN
} from '@/constants/values'

export default {
  // 组件名
  name: 'AdminLogin',
  components: {
    LoginForm
  },
  methods: {
    // 点击登陆
    login (username, password) {
      if (!username || !username.trim() || !password || !password.trim()) {
        this.$message({
          message: 'Veuillez entrer le nom utilisateur et le mot de passe'
        })
        return
      }
      // 用户登录
      const user = {
        username,
        password
      }
      this.$store.dispatch(LOGIN, user)
    }
  }
}
</script>

<style scoped>
  .el-col {
    margin-top: 20px;
  }
</style>
