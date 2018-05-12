import Vue from 'vue'
import Router from 'vue-router'

import store from '@/store'

// -----------pages-------------

import BasicLayout from '@/components/layout/BasicLayout'
import SideLayout from '@/components/layout/SideLayout'
import Index from '@/components/pages/index.vue'
import Login from '@/components/pages/login.vue'
import Borrow from '@/components/pages/AdminBorrow.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'root',
      component: BasicLayout,
      redirect: '/index',
      children: [
        {
          path: 'index',
          name: '首页',
          component: Index
        }
      ]
    },
    {
      path: '/login',
      name: '登录',
      component: Login
    },
    {
      // 后台根视图
      path: '/admin',
      name: '后台首页',
      component: SideLayout,
      meta: { adminAuth: true },
      redirect: '/admin/index',
      children: [
        {
          // 借书页
          path: 'index',
          name: '借阅',
          component: Borrow,
          meta: { adminAuth: true }
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // 用户登录验证
    if (localStorage.getItem('user')) {
      next()
    } else {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    }
    next()
  } else if (to.matched.some(record => record.meta.adminAuth)) {
    console.log(to.matched)
    // 从 store 中读取
    const user = store.state.global.user
    // const user = localStorage.getItem('user')
    console.log('imcczy-router-guide-user', user)
    if (!user) {
      next({
        path: '/login'
      })
      return
    }
    if (user.isAdmin !== 1) {
      next({
        path: '/no_permission'
      })
      return
    }
    next()
  } else {
    next()
  }
})
export default router
