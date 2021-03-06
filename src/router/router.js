import Vue from 'vue'
import Router from 'vue-router'

import store from '@/store'

// -----------pages-------------

import BasicLayout from '@/components/layout/BasicLayout'
import SideLayout from '@/components/layout/SideLayout'
import Index from '@/components/pages/Person/PersonIndex.vue'
import Login from '@/components/pages/login.vue'
import Order from '@/components/Order.vue'

import ProductDetail from '@/components/pages/ProductDetail.vue'
import Success from '@/components/pages/Success.vue'
// ----person-----
import Person from '@/components/pages/Person/Person.vue'
import PersonDetail from '@/components/pages/Person/PersonDetail.vue'
import PersonOrder from '@/components/pages/Person/PersonOrders.vue'
import PersonRecord from '@/components/pages/Person/PersonRecords.vue'

// ---- Admin-----
import AdminReturn from '@/components/pages/Admin/AdminReturn.vue'
import AdminMembers from '@/components/pages/Admin/AdminMembers.vue'
import AdminOrders from '@/components/pages/Admin/AdminOrders.vue'
import AdminProducts from '@/components/pages/Admin/AdminProducts.vue'
import AdminRecords from '@/components/pages/Admin/AdminRecords.vue'
import AdminIndex from '@/components/pages/Admin/AdminIndex.vue'
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
          name: 'Accueil',
          component: Index
        },
        {
          path: 'order',
          name: 'Commande',
          component: Order
        },
        {
          path: 'success',
          name: 'success',
          component: Success
        },
        {
          // 商品详情页
          path: 'product/:id',
          name: 'GoodsDetail',
          component: ProductDetail
        },
        {
          // 用户主页
          path: 'person',
          name: 'Person',
          component: Person,
          meta: { requiresAuth: true },
          children: [
            {
              // 用户信息页
              path: 'detail',
              component: PersonDetail,
              meta: { requiresAuth: true }
            },
            {
              // 用户订单列表页
              path: 'orders',
              name: 'PersonOrders',
              component: PersonOrder,
              meta: { requiresAuth: true }
            },
            {
              // 用户借阅记录页
              path: 'records',
              name: 'PersonRecords',
              component: PersonRecord,
              meta: { requiresAuth: true }
            }
          ]
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      // 后台根视图
      path: '/admin',
      name: 'cote serveur',
      component: SideLayout,
      meta: { adminAuth: true },
      redirect: '/admin/books',
      children: [
        {
          // 借书页
          path: 'index',
          name: 'Emprunt',
          component: AdminIndex,
          meta: { adminAuth: true }
        },
        {
          // 还书页
          path: 'return',
          name: 'return',
          component: AdminReturn,
          meta: { adminAuth: true }
        },
        {
          // 会员列表页
          path: 'members',
          name: 'List de members',
          component: AdminMembers,
          meta: { adminAuth: true }
        },
        {
          // 书籍列表页
          path: 'books',
          name: 'List de oeuvre ',
          component: AdminProducts,
          meta: { adminAuth: true }
        },
        {
          // 借阅记录列表页
          path: 'records',
          name: 'Enregistrements',
          component: AdminRecords,
          meta: { adminAuth: true }
        },
        {
          // 订单列表页
          path: 'orders',
          name: 'Commandes',
          component: AdminOrders,
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
    const user = store.state.auth.data
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
