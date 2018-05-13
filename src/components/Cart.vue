<template>
  <div>
    <el-card :body-style="{ padding: '10px' }">
      <p>{{item.title}}</p>
      <p>￥{{item.price}}
        <i @click="removeFromCart(item)" class="el-icon-delete"></i>
      </p>
    </el-card>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Cart',
  props: [
    'item'
  ],
  methods: mapActions([
    'removeFromCart'
  ])
}
</script>
