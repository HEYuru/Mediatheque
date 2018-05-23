<template>
  <div class="container">
    <div>
      <el-card>
        <h4>Destinataire：{{user.username}}</h4>
        <p>Numéro de téléphone：
          <span>{{user.tel}}</span>
        </p>
        <p>adress：
          <span>{{user.address}}</span>
        </p>
      </el-card>
      <router-link to="/index">Modifier le panier</router-link>
      <el-table :data="cartProducts" stripe style="width: 100%">
        <el-table-column prop="title" label="Nom du produit">
        </el-table-column>
        <el-table-column prop="price" label="prix">
        </el-table-column>
      </el-table>
      <el-input style="margin-top: 20px;" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="Message" v-model="message">
      </el-input>
      <h4>Quantité de produit：
        <span>{{cartProducts.length}}</span>
      </h4>
      <h4>Prix total：
        <span>{{sumPrice}}</span>
      </h4>
    </div>
    <el-button @click="createOrder()">Envoyer la commande</el-button>
  </div>
</template>

<script>
import router from '@/router/router'
import {
  mapGetters
} from 'vuex'
export default {
  name: 'Order',
  data () {
    return {
      message: ''
    }
  },
  created () {
    // 先判断购物车中是否有商品，如果没有就返回首页
    if (!localStorage.getItem('carts')) {
      router.replace({
        path: '/index'
      })
    }
  },
  computed: {
    ...mapGetters([
      'user',
      'cartProducts',
      'sumPrice'
    ])
  },
  methods: {
    createOrder () {
      this.$store.dispatch('checkout', this.message)
        .then(() => {
          router.replace({
            path: '/success'
          })
        })
        .catch(() => {
          this.$message({
            message: 'Échec de règlement'
          })
        })
    }
  }
}
</script>
