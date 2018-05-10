<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

import BasicLayout from '@/components/layout/BasicLayout'

export default {
  name: 'App',
  components: {
    BasicLayout
  }
}
</script>
