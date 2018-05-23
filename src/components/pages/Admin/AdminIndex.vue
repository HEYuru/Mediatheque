<template>
  <div class="container">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-input
          placeholder="Veuillez entrer le nom du membre"
          v-model="memberQuery">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <MemberList :members="memberRes" :choose="chooseMember" />
      </el-col>
      <el-col :span="12">
        <el-input
          placeholder="Veuillez entrer le nom du oeuvre"
          v-model="bookQuery">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <ProductList :books="bookRes" :choose="chooseBook" />
      </el-col>
    </el-row>
    <el-dialog title="S'il vous plaît confirmer les informations" v-model="dialogVisible" size="small">
      <p>
        <span>{{choosedMember.memberName}}</span> Emprunté
        <span>{{choosedBook.bookTitle}}</span>
      </p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Annulation</el-button>
        <el-button type="primary" @click="borrow(choosedMember, choosedBook)">Vaild</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  mapGetters
} from 'vuex'

import MemberList from '@/components/MemberList.vue'
import ProductList from '@/components/AdminProductList.vue'
import {
  SEARCH_MEMBER,
  SEARCH_PRODUCTS,
  CREATE_RECORD
} from '@/constants/values'

export default {
  // 组件名
  name: 'Index',
  components: {
    MemberList,
    ProductList
  },
  data () {
    return {
      memberQuery: null,
      bookQuery: null,
      // 模态框
      dialogVisible: false,
      // 点击的会员
      choosedMember: {},
      // 点击的书籍
      choosedBook: {}
    }
  },
  computed: mapGetters([
    'bookRes',
    'memberRes'
  ]),
  methods: {
    /**
       * 搜索会员
       */
    searchMember (param) {
      // 先判断输入是否有效，只判断是否输入，sql注入暂时不考虑
      if (!param || !param.trim()) {
        // 如果没有输入搜索内容，就显示错误提示
        this.$message({
          message: 'Veuillez entrer les conditions de requête',
          type: 'warning'
        })
        return
      }
      this.$store.dispatch(SEARCH_MEMBER, {
        params: {
          num: this.memberQuery
        }
      })
    },
    /**
       * 搜索图书
       */
    searchBook (param) {
      if (!param || !param.trim()) {
        this.$message({
          message: 'Veuillez entrer les conditions de requête',
          type: 'warning'
        })
        return false
      }
      this.$store.dispatch(SEARCH_PRODUCTS, {
        params: {
          title: this.bookQuery
        }
      })
    },
    /**
       * 选择会员，由于此次选择只和当前页面有关，所以没有必要 dispatch(SELECT_MEMBER) 保存在 store 里面吧
       */
    chooseMember (member) {
      this.choosedMember = member
    },
    /**
       * 选择图书，弹出模态框用以确认是否借阅
       */
    chooseBook (book) {
      this.choosedBook = book
      // 这里只是处理list组件点击了借阅事件，接下来的判断还是由index来处理
      if (this.choosedMember.memberName) {
        this.dialogVisible = true
      } else {
        this.$message({
          message: 'Sélectionnez un membre',
          type: 'info'
        })
      }
    },
    /**
       * 生成借阅记录
       */
    borrow (member, book) {
      this.$store.dispatch(CREATE_RECORD, {
        params: {
          member: member.memberId,
          book: book.bookId
        },
        cb: () => {
          this.dialogVisible = false
          this.memberQuery = ''
          this.bookQuery = ''
        }
      })
    }
  }
}
</script>
