<template>
  <div class="container">
    <el-row :gutter="20">
      <el-col :span="20">
        <el-input placeholder="S'il vous plaît entrer le nom" v-model="query">
          <el-button v-on:click="searchBooks(query)" slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-button style="width: 100%;" type="primary" @click="dialogFormVisible = true">Ajouter Oeuvre</el-button>
      </el-col>
    </el-row>
    <el-table :data="products" stripe style="margin-top: 20px; width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="id">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="nom de oeuvre:">
              <span>{{ props.row.title }}</span>
            </el-form-item>
            <el-form-item label="le code de ISBN:">
              <span>{{ props.row.uuid }}</span>
            </el-form-item>
            <el-form-item label="Les temps empruntés:">
              <span>{{ props.row.borrowTimes }}</span>
            </el-form-item>
            <el-form-item label="Status:">
              <span>{{ props.row.state }}</span>
            </el-form-item>
            <el-form-item label="Prix:">
              <span>￥{{ props.row.price }}</span>
            </el-form-item>
            <el-form-item label="Couverture">
              <img class="product_img" :src="props.row.coverImg" :alt="props.row.title">
            </el-form-item>
            <el-form-item label="Date:">
              <span>{{ props.row.createTime }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="le nom de oeuvre">
      </el-table-column>
      <el-table-column prop="uuid" label="ISBN">
      </el-table-column>
      <el-table-column prop="state" label="Status">
      </el-table-column>
      <el-table-column label="Opérations">
        <template slot-scope="scope">
          <el-button size="small" type="text" :disabled="scope.row.state !== 'Available'"
                     @click="deleteBook(scope.row.id, scope.$index)">Supprimer
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="Ajouter" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="Nom" :label-width="formLabelWidth">
          <el-input v-model="form.title" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="type" :label-width="formLabelWidth">
          <el-select v-model="form.type" clearable placeholder="Selecter">
            <el-option label="Livre" value="1"></el-option>
            <el-option label="Film" value="2"></el-option>
            <el-option label="Albm_Audio" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="UUID" :label-width="formLabelWidth">
          <el-input v-model="form.uuid" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="Information" :label-width="formLabelWidth">
          <el-input v-model="form.summary" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="Prix" :label-width="formLabelWidth">
          <el-input v-model="form.price" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="Picture" :label-width="formLabelWidth">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="3"
            :on-exceed="handleExceed"
            :file-list="fileList">
            <el-button size="small" type="primary">Télécharger</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="Produits" :label-width="formLabelWidth">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="3"
            :on-exceed="handleExceed"
            :file-list="fileList2">
            <el-button size="small" type="primary">Télécharger</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Annuler</el-button>
        <el-button type="primary" @click="addBook(form)">Valider</el-button>
      </div>
    </el-dialog>
    <!--<el-dialog title="收货地址" :visible.sync="dialogFormVisible">-->
    <!--<el-form :model="form">-->
    <!--<el-form-item label="活动名称" :label-width="formLabelWidth">-->
    <!--<el-input v-model="form.name" auto-complete="off"></el-input>-->
    <!--</el-form-item>-->
    <!--<el-form-item label="活动区域" :label-width="formLabelWidth">-->
    <!--<el-select v-model="form.region" placeholder="请选择活动区域">-->
    <!--<el-option label="区域一" value="shanghai"></el-option>-->
    <!--<el-option label="区域二" value="beijing"></el-option>-->
    <!--</el-select>-->
    <!--</el-form-item>-->
    <!--</el-form>-->
    <!--<div slot="footer" class="dialog-footer">-->
    <!--<el-button @click="dialogFormVisible = false">取 消</el-button>-->
    <!--<el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>-->
    <!--</div>-->
    <!--</el-dialog>-->
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {FETCH_PRODUCTS, SEARCH_DOUBAN, ADD_PRODUCT} from '@/constants/values'
import Douban from '@/components/douban.vue'

export default {
  name: 'Members',
  components: {
    Douban
  },
  data () {
    return {
      query: null,
      // 新增会员的对话框是否可见
      dialogFormVisible: false,
      // 查询豆瓣的条件
      searchQuery: null,
      // 查询豆瓣得到的结果
      resultList: [],
      // 保存填写新会员的信息
      book: {},
      form: {
        type: '1',
        id: 4,
        title: 'Ville frontalière',
        uuid: '9787543067028',
        price: 35,
        borrowTimes: '0',
        returnTime: null,
        summary:
            "Le roman est basé sur les tasses de thé de la frontière à la frontière du Sichuan et du Hunan dans les années 1930. Il combine la poésie lyrique avec les coups de pinceau gracieux pour décrire les coutumes simples et honnêtes et les conditions naturelles de la ville de Xiangxi. Le livre se compose de 21 chapitres, chacun ressemblant à une peinture à l'encre épaisse ou légère, dans un langage simple et frais, il exprime une forme belle, saine, naturelle et humaine.",
        state: '0',
        coverImg: 'http://imcczy.b0.upaiyun.com/2018-05-14-070209.jpg',
        createTime: '2013-09-01',
        inventory: 2
      },
      formLabelWidth: '120px',
      fileList: [
        {
          name: 'http://imcczy.b0.upaiyun.com/2018-05-14-070209.jpg',
          url: 'http://imcczy.b0.upaiyun.com/2018-05-14-070209.jpg'
        }
      ],
      fileList2: [
        {
          name: 'Test',
          url: 'test'
        }
      ]
    }
  },
  computed: mapGetters(['products', 'douban']),
  mounted () {
    this.$store.dispatch(FETCH_PRODUCTS)
  },
  methods: {
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },
    handleExceed (files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      )
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`supprimer ${file.name}？`)
    },
    /**
       * 搜索图书
       */
    searchBooks (query) {
      console.log('imcczy-search', query)
      this.$store.dispatch(FETCH_PRODUCTS, query)
    },
    /**
       * 从豆瓣搜索图书
       * @param {string} params - 任意搜索关键字
       */
    searchByDouban (params) {
      this.$store.dispatch(SEARCH_DOUBAN, params)
    },
    /**
       * 将从豆瓣搜索到的指定图书添加到数据库
       * @param {Object} book - 图书信息
       */
    addBook (form) {
      console.log('imcczy-add', form)
      this.$store.dispatch(ADD_PRODUCT, {
        params: form,
        cb: () => {
          this.dialogFormVisible = false
        }
      })
    },
    /**
       * 删除指定图书
       * @param {number} bookId - 书籍 id
       * @param {number} index - 在列表中的下标
       */
    deleteBook (bookId, index) {
      // deleteMember(memberId)
      // .then(res=> {
      // // 这里判断是否成功，如果成功就页面上也同步删除该记录，或者刷新页面。
      // // console.log(data);
      // console.log(res)
      // if (res.state == 'success') {
      // // 如果删除成功
      // this.memberList.splice(index, 1)
      // } else {
      // alert('删除失败,请重试')
      // }
      // })
    }
  }
}
</script>
<style>
  .product_img {
    height: 180px;
  }
</style>
