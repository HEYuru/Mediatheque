<template>
  <el-card :body-style="{ padding: '0px' }">
    <img :src="book.img" class="image">
    <div style="padding: 14px;">
      <span>{{book.title}}</span>
      <div class="bottom clearfix">
        <time class="time">{{book.createTime}}</time>
        <p v-if="book.state !== '0'">Impossible d'emprunter</p>
        <el-button v-else class="button" type="primary" @click="choose(book)">Emprunt</el-button>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  // 组件名
  name: 'Book',
  // 从父组件传过来的属性
  props: [
    'book',
    'choose'
  ]
}
</script>
