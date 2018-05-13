<template>
  <div class="container">
    <div>
      <el-card>
        <h4>收货人：{{user.username}}</h4>
        <p>联系方式：
          <span>{{user.tel}}</span>
        </p>
        <p>收货地址：
          <span>{{user.address}}</span>
        </p>
      </el-card>
      <router-link to="/index">返回修改购物车</router-link>
      <el-table :data="cartProducts" stripe style="width: 100%">
        <el-table-column prop="title" label="商品名">
        </el-table-column>
        <el-table-column prop="price" label="价格">
        </el-table-column>
      </el-table>
      <el-input style="margin-top: 20px;" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="留言" v-model="message">
      </el-input>
      <h4>商品数量：
        <span>{{cartProducts.length}}</span>
      </h4>
      <h4>总价格：
        <span>{{sumPrice}}</span>
      </h4>
    </div>
    <el-button @click="createOrder()">提交订单</el-button>
  </div>
</template>

<script>
import router from '@/router/router'
import {
  mapGetters
} from 'vuex'
export default {
  name: 'Order',
  data () {
    return {
      message: ''
    }
  },
  created () {
    // 先判断购物车中是否有商品，如果没有就返回首页
    if (!localStorage.getItem('carts')) {
      router.replace({
        path: '/index'
      })
    }
  },
  computed: {
    ...mapGetters([
      'user',
      'cartProducts',
      'sumPrice'
    ])
  },
  methods: {
    createOrder () {
      this.$store.dispatch('checkout', this.message)
        .then(() => {
          router.replace({
            path: '/success'
          })
        })
        .catch(() => {
          this.$message({
            message: '结算失败'
          })
        })
    }
  }
}
</script>
