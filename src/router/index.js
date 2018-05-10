import Vue from 'vue'
import Router from 'vue-router'
import BasicLayout from '@/components/layout/BasicLayout'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'root',
      component: BasicLayout
    }
  ]
})
