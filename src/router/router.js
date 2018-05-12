import Vue from 'vue'
import Router from 'vue-router'

import store from '@/store'

// -----------pages-------------

import BasicLayout from '@/components/layout/BasicLayout'
import Index from '@/components/pages/index.vue'
import Login from '@/components/pages/login.vue'

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
    const user = store.state.global.data
    console.log('user', user)
    if (!user) {
      next({
        path: '/login'
      })
      return
    }
    const {
      role
    } = user
    console.log('role', role)
    if (role !== 1) {
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
