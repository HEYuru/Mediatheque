<template>
  <div class="container">
    <el-row :gutter="20">
      <el-col :span="18">
        <el-card>
          <img style="float: left;height: 180px;
    width: 130px;" :src="book.coverImg" :alt="book.title">
          <div style="margin-left: 160px;">
            <p>UUID：
              <span>{{book.uuid}}</span>
            </p>
            <p>Les fois empruntés：
              <span>{{book.borrowTimes}}</span>
            </p>
            <p>prix coûtant：
              <del>{{book.price}}</del>
              prix courant：
              <span>{{book.price}}</span>
            </p>
            <template v-if="book.returnTime !== 0">
              <el-button type="success" v-on:click="addProductToCart(book)">Ajouter au panier</el-button>
            </template>
            <template v-else>
              <p>En cours d'emprunt</p>
            </template>
          </div>
          <h4>information</h4>
          <p>{{book.summary}}</p>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-row>
          <el-col :span="24" v-for="item in cartProducts" :key="item.id">
            <Cart :item="item"/>
          </el-col>
        </el-row>
        <el-button style="width: 100%;" type="success" @click="order">￥{{sumPrice}} - Total à régler</el-button>
      </el-col>
    </el-row>
    <el-row style="padding: 20px;">
      <h4>Commentaire</h4></el-row>
    <el-row>
      <div class="content" v-for="comment in commentlist" :key="comment.commentId">
        <el-card>
          <p>{{comment.memberName}}||<span>{{comment.createtime}}</span></p>
          <span>{{comment.content}}</span>
        </el-card>
      </div>
    </el-row>
    <el-input style="margin-top: 20px;padding: 20px;" type="textarea" :autosize="{ minrows: 2, maxrows: 4}" placeholder="Entrer un commentaire"
              v-model="comment">
    </el-input>
    <el-button style="margin-top: 20px;" type="success" @click="addComment(comment)">Envoyer un commentaire</el-button>
  </div>
</template>

<script>
/* eslint-disable */
  import router from '@/router/router'

  import Product from '@/components/Product.vue'
  import Cart from '@/components/Cart.vue'

  import {searchProductById} from "@/api/product";
  import {searchMemberById} from "@/api/admin/member";
  import {fetchComments, addComment, searchCommentById} from "@/api/comment";
  import {
    mapActions, mapGetters
  } from 'vuex'

  export default {
    name: "ProductDetail",
    components: {
      Product,
      Cart
    },
    data() {
      return {
        book: {},
        commentlist: [],
        comment: ""
      };
    },
    computed: {
      ...mapGetters([
        'cartProducts',
        'sumPrice'
      ])
    },
    created() {
      searchProductById(this.$route.params.id)
        .then(res => {
          // console.log(res.data)
          // 获取评论列表
          console.log('imcczy-comments', res)
          fetchComments(res.id)
            .then(resp => {
              // 获取评论用户信息
              this.commentlist = resp;
            })
            .catch(err => {
              this.$message({
                message: err
              });
            });
          this.book = res;
        })
        .catch(err => {
          this.$message({
            message: err
          });
        });
    },
    methods: {
      ...mapActions([
        'addProductToCart'
      ]),
      // addComment(content) {
      //   // 获取相关数据
      //   const post = {
      //     memberId: localStorage.getItem("userId"),
      //     bookIsbn: this.book.bookIsbn,
      //     content: content
      //   };
      //   // 写入数据库
      //   addComment(post)
      //     .then(res => {
      //       this.$message({
      //         message: "success"
      //       });
      //       // 根据id查询到评论
      //       searchCommentById(res.commentId)
      //         .then(res => {
      //           this.commentlist.push(res.data);
      //           this.comment = "";
      //         })
      //         .catch(err => {
      //           this.$message({
      //             message: err
      //           });
      //         });
      //     })
      //     .catch(err => {
      //       this.$messgae({
      //         messgae: err
      //       });
      //     });
      // }
      addComment(content) {
        const post = {
          memberId: 11,
          id: this.book.id,
          content: content,
          commentId: 123459,
          memberName: "Lily ",
          createtime: new Date().toISOString().split('T')[0]
        }
        this.commentlist.push(post)
      },
      order() {
        // 首先判断用户是否登录
        if (!localStorage.getItem('user')) {
          // this.$message({
          // message: 'return Accueil'
          // })
          router.push('/login')
        } else {
          router.push('/order')
        }
      }
    }
  };
</script>
