<template>
  <div class="container">
    <el-row :gutter="20">
      <el-col :span="18">
        <el-input placeholder="请输入书籍名或ISBN码查询" v-model="query">
          <el-select v-model="select" slot="prepend" placeholder="请选择">
            <el-option label="ALL" value="null"></el-option>
            <el-option label="图书" value="1"></el-option>
            <el-option label="电影" value="2"></el-option>
            <el-option label="专辑" value="3"></el-option>
          </el-select>
          <el-button  v-on:click="search(query)" slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-row :gutter="20">
          <el-col :span="12" v-for="book in books" :key="book.bookId">
            <Goods v-if="isselect(select,book)" :item="book" :choose="addCart" />
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="6">
        <el-row>
          <el-col :span="24" v-for="item in carts" :key="item.bookId">
            <Cart :item="item" :remove="removeFromCart" />
          </el-col>
        </el-row>
        <el-button style="width: 100%;" type="success" @click="order">￥{{sumPrice}} - 结算</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>

// import {
//   computedPriceByTimes,
// } from '@/utils/index';
import {
  mapGetters
} from 'vuex'
import router from '@/router/router'

import Goods from '@/components/Goods.vue'
import Cart from '@/components/Cart.vue'

import {
  FETCH_BOOKS,
  SEARCH_BOOKS
} from '@/constants/values'

export default {
  name: 'index',
  components: {
    Goods,
    Cart
  },
  data () {
    return {
      select: '',
      // 用户是否登录
      userLogin: true,
      // 筛选图书条件
      query: ''
    }
  },
  mounted () {
    this.$store.dispatch(FETCH_BOOKS)
  },
  computed: {
    ...mapGetters([
      'books'
    ]),
    // 购物车列表，从 vuex 中获取
    carts () {
      return this.$store.state.carts
    },
    sumPrice () {
      return this.$store.getters.count
    }
  },
  methods: {
    // 分类显示
    isselect (obj, book) {
      if (obj === 'null') return true
      else if (obj) {
        return obj === book.type
      } else return true
    },
    search (obj) {
      if (!obj) {
        this.$store.dispatch(FETCH_BOOKS)
        return
      }
      this.$store.dispatch(SEARCH_BOOKS, this.query)
    },
    addCart (obj) {
      console.log('imcczy', obj.bookTitle)
      //   const carts = this.carts;
      //   // 要添加的这个商品是否已经存在购物车中了
      //   const isChong = carts.some(book => {
      //     return book.bookId === obj.bookId;
      //   });

      //   if (isChong === false) {
      //     obj.newPrice = computedPriceByTimes(obj.bookPrice, obj.borrowTimes);
      //     // 将商品加入购物车
      //     this.$store.commit('ADD_TO_CART', obj);
      //     // // 同时还要写入数据库中
      //     // // 先获取到userid作为查询依据
      //     obj.cartsession = localStorage.getItem('userId') || 123;
      //     localStorage.setItem('cartSession', obj.cartsession);
      //     // 加入购物车成功不做任何处理
      //     addToCart(obj).catch(err => {
      //       this.$message({
      //         message: err,
      //       });
      //       // 如果写入数据库失败，还要从购物车移除，因为是已经加入到购物车中了
      //       carts.splice(carts.indexOf(obj), 1);
      //     });
      //   } else {
      //     this.$message({
      //       message: '该商品已经在购物车',
      //     });
      //   }
    },
    // removeFromCart (obj) {
    //   const carts = this.carts;
    //   obj.cartSession = localStorage.getItem('cartSession');
    //   removeFromCart(obj)
    //     .then(res => {
    //       carts.splice(carts.indexOf(obj), 1);
    //     })
    //     .catch(err => {
    //       this.$message({
    //         message: err,
    //       });
    //     });
    // },
    order () {
      // 首先判断用户是否登录
      if (!localStorage.getItem('user')) {
        // this.$message({
        // message: '跳转到登录页'
        // })
        router.push('/login')
      } else {
        router.push('/order')
      }
    }
  }
}
</script>

<style>
  .el-select .el-input {
    width: 130px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
</style>
