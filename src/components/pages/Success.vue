<template>
  <div class="container">
    <p>Success</p>
    <router-link :to="{ path: '/index' }">return accueil</router-link>
    <router-link :to="{ path: '/person/orders' }">commandes</router-link>
  </div>
</template>

<script>
export default {
  name: 'Success'
}
</script>
