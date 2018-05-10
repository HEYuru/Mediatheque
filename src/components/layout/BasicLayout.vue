<template>
  <div class="page">
    <div class="navigation">
      <NavigationBar />
    </div>
    <div class="content"><router-view></router-view></div>
  </div>
</template>

<script>
import NavigationBar from '@/components/Navigation.vue'

export default {
  name: 'BasicLayout',
  components: {
    NavigationBar
  }
}
</script>

<style scoped>

</style>
