<template>
  <el-card :body-style="{ padding: '0px' }">
    <img class="product_img" :src="item.coverImg" style="float: left;">
    <div style="float: left; padding: 10px;">
      <router-link class="product_link" :to="{ path: '/product/' + item.uuid }">{{item.title}}</router-link>
      <p class="product_price">
        <span>prix：
          ￥{{item.price}}
        </span>
      </p>
      <div class="bottom clearfix">
        <time class="time">{{item._createTime}}</time>
        <el-button @click="addProductToCart(item)">Ajouter au panier</el-button>
      </div>
    </div>
  </el-card>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  // 组件名
  name: 'product',
  // 从父组件传过来的属性
  props: [
    'item'
  ],
  methods: mapActions([
    'addProductToCart'
  ])
}
</script>

<style>
  .product_link {
    text-decoration: none;
  }
  .product_link:link {
    color: #000;
  }
  .product_link:visited {
    color: #000;
  }
  .product_img {
    height: 180px;
    width: 130px;
  }
</style>
