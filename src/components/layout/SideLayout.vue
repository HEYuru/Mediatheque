<template>
  <div>
    <el-row>
      <el-col :span="4">
        <el-menu class="sidenav">
          <el-menu-item index="2">
            <router-link :to="{ path: '/index' }">前台首页</router-link>
          </el-menu-item>
          <el-menu-item index="3">
            <router-link :to="{ path: '/admin/books' }">书籍列表</router-link>
          </el-menu-item>
          <el-menu-item index="4">
            <router-link :to="{ path: '/admin/members' }">用户列表</router-link>
          </el-menu-item>
          <el-menu-item index="5">
            <router-link :to="{ path: '/admin/records' }">借阅记录</router-link>
          </el-menu-item>
          <el-menu-item index="7" v-if="isLogin">
            <a @click="dialogVisible = true">注销</a>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="20">
        <AdminHeader
          :routes="[]"
          :user="user"
        />
        <div class="container__content">
          <router-view></router-view>
        </div>
      </el-col>
    </el-row>
    <el-dialog title="提示" v-model="dialogVisible" size="tiny">
      <span>确定要退出登录吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="logout()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import AdminHeader from '@/components/AdminHeader'
import router from '@/router/router'

export default {
  name: 'AdminIndex',
  components: {
    AdminHeader
  },
  data () {
    return {
      isLogin: false,
      dialogVisible: false,
      user: null
    }
  },
  methods: {
    logout () {
      router.push({
        path: '/'
      })
    }
  }
}
</script>

<style>
  .sidenav {
    width: 100%;
    height: 100vh;
  }
  .sidenav a {
    text-decoration: unset;
  }
  .sidenav a:visited {
    color: unset;
  }
  .container__content {
    padding: 10px;
  }
</style>
