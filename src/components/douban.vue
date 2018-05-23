<template>
  <el-card :body-style="{ padding: '0px', display: 'flex', justifyContent: 'start' }">
    <img :src="book.image" class="douban__img">
    <div style="padding: 14px;" class="douban__detail">
      <p class="douban__title">nom de livre：{{book.title}}</p>
      <p>
        <time class="douban__time">Date de publication：{{book.pubdate}}</time>
      </p>
      <el-button class="douban__btn" type="primary" @click="choose(book)">添加</el-button>
    </div>
  </el-card>
</template>

<script>
export default {
  // 组件名
  name: 'Douban',
  // 从父组件传过来的属性
  props: [
    'book',
    'choose'
  ]
}
</script>

<style>
.douban__img {
  width: 100px;
}
.douban__title {
  margin: 0;
}
</style>
