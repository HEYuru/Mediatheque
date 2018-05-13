<template>
  <el-row :gutter="20">
    <el-col :span="8" v-for="book in books" :key="book.bookId || book.id">
      <Product :book="book" :choose="choose" />
    </el-col>
  </el-row>
</template>

<script>
import Product from '@/components/AdminProduct.vue'
export default {
  name: 'ProductList',
  props: [
    'books',
    'choose'
  ],
  components: {
    Product
  }
}
</script>
