<template>
  <div>
    <el-table :data="_orders" stripe style="width: 100%">
      <el-table-column prop="orderId" label="N°commande">
      </el-table-column>
      <el-table-column prop="bookIsbn" label="information d'oeuvre">
        <template slot-scope="scope">
          <div v-for="book in scope.row.booklist" :key="book.id">
            <p>
              <router-link :to="{ path: '/product/' + book.id}">{{book.title}}</router-link>
            </p>
            <p>￥
              <span>{{book.price}}</span>
            </p>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="orderState" label="Statut">
      </el-table-column>
      <el-table-column prop="createTime" label="Date">
      </el-table-column>
      <el-table-column label="operate">
        <template slot-scope="scope">
          <el-button type="danger" @click="cancelOrder(scope.row)">Annuler la commande</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
/* eslint-disable */
import { searchProductById, updateProductState } from "@/api/product";
import { cancelOrder, fetchOrdersByMemberId } from "@/api/admin/order";
import { orderState } from "@/api/utils";

export default {
  data() {
    return {
      orders: []
    };
  },
  created() {
    // 根据用户id查询订单
    fetchOrdersByMemberId(localStorage.getItem("userId"))
      .then(res => {
        // 在这个地方处理商品列表
        res.data.forEach(obj => {
          let booklist = obj.booklist;
          booklist = booklist.split("|");
          // 获取到商品id数组，从接口查询商品详情
          let resultlist = [];
          booklist.forEach(id => {
            searchProductById(id)
              .then(res => {
                // 使用过滤器来处理价格显示
                resultlist.push(res.data);
              })
              .catch(err => {
                this.$message({
                  message: err
                });
              });
          });
          // resultlist为书籍对象组成的数组
          obj.booklist = resultlist;
        });
        this.orders = res.data;
      })
      .catch(err => {
        this.$message({
          message: err
        });
      });
  },
  methods: {
    cancelOrder(obj) {
      // 更新订单状态
      cancelOrder(obj.orderId)
        .then(res => {
          // 更新订单状态成功后，更新书籍状态为正常
          obj.booklist.forEach(book => {
            updateProductState(book.bookId, 0)
              .then(res => {
                obj.orderState = 2;
              })
              .catch(err => {
                this.$message({
                  message: err
                });
              });
          });
        })
        .catch(err => {
          this.$message({
            message: err
          });
        });
    }
  },
  computed: {
    _orders() {
      return this.orders.map(order => {
        return {
          ...order,
          orderState: orderState(order.orderState)
        };
      });
    }
  }
};
</script>
