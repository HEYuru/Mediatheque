<template>
  <div class="container">
    <el-row :gutter="20">
      <el-col :span="18">
        <el-input placeholder="Veuillez entrer le nom du Oeuvre ou la requête de code ISBN" v-model="query">
          <el-select v-model="select" slot="prepend" clearable placeholder="Type">
            <el-option label="Livre" value="1"></el-option>
            <el-option label="Film" value="2"></el-option>
            <el-option label="Albm_Audio" value="3"></el-option>
          </el-select>
          <el-button  v-on:click="search(query)" slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-row :gutter="20">
          <el-col :span="12" v-for="product in products" :key="product.id">
            <Product v-if="isselect(select,product)" :item="product" />
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="6">
        <el-row>
          <el-col :span="24" v-for="item in cartProducts" :key="item.id">
            <Cart :item="item" />
          </el-col>
        </el-row>
        <el-button style="width: 100%;" type="success" @click="order">￥{{sumPrice}} - Total à régler</el-button>
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

import Product from '@/components/Product.vue'
import Cart from '@/components/Cart.vue'
import {
  FETCH_PRODUCTS,
  SEARCH_PRODUCTS
} from '@/constants/values'

export default {
  name: 'index',
  components: {
    Product,
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
    this.$store.dispatch(FETCH_PRODUCTS)
  },
  computed: {
    ...mapGetters([
      'products',
      'cartProducts',
      'sumPrice'
    ])
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
        this.$store.dispatch(FETCH_PRODUCTS)
        return
      }
      this.$store.dispatch(SEARCH_PRODUCTS, this.query)
    },
    order () {
      // 首先判断用户是否登录
      if (!localStorage.getItem('user')) {
        // this.$message({
        // message: 'return to login'
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
