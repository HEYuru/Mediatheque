<template>
  <div class="container">
    <el-row :gutter="20">
      <el-col :span="18">
        <el-input placeholder="Veuillez entrer le nom du membre" icon="search" v-model="query">
        </el-input>
      </el-col>
    </el-row>
    <el-table :data="orders" stripe style="margin-top: 20px; width: 100%">
      <el-table-column prop="orderId" label="Numéro de commande">
      </el-table-column>
      <el-table-column label="Informations dee produits">
        <template slot-scope="scope">
          <div v-for="book in scope.row.booklist" :key="book.id">
            <router-link :to="{ path: '/product/' + book.id}">{{book.title}}
            </router-link>
            <p>Numéro de oeuvre：
              <span>{{book.id}}</span>
            </p>
            <p>Prix de oeuvre：
              <span>{{book.price}}</span>
            </p>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="memberName" label="Destinataire">
        <template slot-scope="scope">
          <p>{{scope.row.member.memberName}}</p>
          <p>{{scope.row.member.memberTel}}</p>
          <p>{{scope.row.member.memberAddress}}</p>
        </template>
      </el-table-column>
      <el-table-column prop="orderState" label="Statut de la commande">
      </el-table-column>
      <el-table-column label="Opérations">
        <template slot-scope="scope">
          <el-button @click="confirmOrder(scope.row)" type="success">Valider</el-button>
          <el-button @click="cancelOrder(scope.row)" type="danger">Annuler</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
/**
   * @file 订单记录页
   * @author ltaoo<litaowork@aliyun.com>
   */
import {
  mapGetters
} from 'vuex'
import {
  FETCH_ORDERS,
  UPDATE_ORDER
} from '@/constants/values'

export default {
  name: 'Orders',
  data () {
    return {
      query: ''
    }
  },
  computed: mapGetters([
    'orders'
  ]),
  mounted () {
    this.$store.dispatch(FETCH_ORDERS)
  },
  methods: {
    /**
       * 更新订单状态为已确认
       */
    confirmOrder (obj) {
      this.$store.dispatch(UPDATE_ORDER, {
        id: obj.orderId,
        params: {
          orderState: 1
        }
      })
    },
    /**
       * 更新订单状态为取消
       */
    cancelOrder (obj) {
      this.$store.dispatch(UPDATE_ORDER, {
        id: obj.orderId,
        params: {
          orderState: 2
        }
      })
    }
  }
}
</script>
