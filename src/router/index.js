import Vue from 'vue'
import Router from 'vue-router'
import BasicLayout from '@/components/layout/BasicLayout'

import Index from '@/components/pages/index.vue'

Vue.use(Router)

export default new Router({
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
    }
  ]
})
