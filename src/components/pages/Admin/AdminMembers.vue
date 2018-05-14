<template>
  <div class="container">
    <el-row :gutter="20">
      <el-col :span="20">
        <el-input placeholder="请输入名称或学号" v-model="query">
          <el-button v-on:click="searchBooks(query)" slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-button style="width: 100%;" type="primary" @click="dialogFormVisible = true">添加新会员</el-button>
      </el-col>
    </el-row>
    <el-table :data="members" stripe style="margin-top: 20px; width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="会员名">
              <span>{{ props.row.username }}</span>
            </el-form-item>
            <el-form-item label="学号">
              <span>{{ props.row.num }}</span>
            </el-form-item>
            <el-form-item label="联系方式">
              <span>{{ props.row.tel }}</span>
            </el-form-item>
            <el-form-item label="地址">
              <span>{{ props.row.address }}</span>
            </el-form-item>
            <el-form-item label="已借阅量">
              <span>{{ props.row.borrowNum }}</span>
            </el-form-item>
            <el-form-item label="累计借阅量">
              <span>{{ props.row.borrowTimes }}</span>
            </el-form-item>
            <el-form-item label="会员类型">
              <span>{{ props.row.rank }}</span>
            </el-form-item>
            <el-form-item label="创建时间">
              <span>{{ props.row.createTime }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column prop="username" label="姓名">
      </el-table-column>
      <el-table-column prop="num" label="学号">
      </el-table-column>
      <el-table-column prop="tel" label="联系方式">
      </el-table-column>
      <el-table-column prop="rank" label="会员类型">
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="small" type="text" @click="showEditMemberModal(scope.row, scope.$index)">编辑
          </el-button>
          <el-button size="small" type="text" :disabled="scope.row.borrowNum!==  0"
                     @click="deleteMember(scope.row.memberId, scope.$index)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="新增会员" :visible.sync="dialogFormVisible">
      <MemberForm ref="member" :member="member"/>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addMember(member)">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="编辑会员信息" :visible.sync="editMemberModalVisible">
      <MemberForm ref="currentMember" :member="copyMember"/>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editMemberModalVisible = false">取 消</el-button>
        <el-button type="primary" @click="editMember(copyMember)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>import {clone} from '@/api/utils'
import {mapGetters} from 'vuex'
import {
  FETCH_MEMBER,
  ADD_MEMBER,
  SELECT_MEMBER,
  UPDATE_MEMBER,
  DELETE_MEMBER
} from '@/constants/values'
import MemberForm from '@/components/MemberForm.vue'

export default {
  name: 'Members',
  components: {
    MemberForm
  },
  data () {
    return {
      query: null,
      // 新增会员的对话框是否可见
      dialogFormVisible: false,
      // 编辑会员模态框
      editMemberModalVisible: false,
      // 保存填写新会员的信息
      member: {
        username: 'Test',
        isAdmin: 1,
        tel: 1234567,
        address: 'test',
        rank: 'VIP',
        num: '77777',
        createTime: '2018-05-012',
        borrowNum: 0,
        borrowTimes: 0
      },
      copyMember: {}
    }
  },
  computed: mapGetters(['members', 'currentMember']),
  mounted () {
    this.$store.dispatch(FETCH_MEMBER, {})
  },
  methods: {
    /**
       * 搜索会员
       */
    fetchMembers () {
      this.$store.dispatch(FETCH_MEMBER)
    },
    /**
       * 搜索会员
       */
    searchMember () {
      const params = {
        name: this.query
      }
      this.$store.dispatch(FETCH_MEMBER, {
        params
      })
    },
    /**
       * 添加会员
       * @param {Object} member - 会员信息
       */
    addMember (member) {
      console.log('imcczy-add member', member)
      this.$store.dispatch(ADD_MEMBER, member)
      this.dialogFormVisible = false
      // this.$refs.form.$refs.form.validate(valid => {
      //   if (valid) {
      //     this.$store.dispatch(ADD_MEMBER, {
      //       params: member,
      //       cb: () => {
      //         this.dialogVisible = false
      //         this.$refs.form.$refs.form.resetFields()
      //       }
      //     })
      //   } else {
      //     return false
      //   }
      // })
    },
    /**
       *
       * @param {number} memberId - 会员 id
       */
    showEditMemberModal (member) {
      // 弹出模态框会更好些
      this.editMemberModalVisible = true
      this.$store.dispatch(SELECT_MEMBER, member)
      this.copyMember = clone(member)
    },
    /**
       * 编辑会员信息
       */
    editMember (member) {
      this.$store.dispatch(UPDATE_MEMBER, {
        num: this.currentMember.num,
        data: member,
        cb: () => {
          this.editMemberModalVisible = false
        }
      })
    },
    /**
       * 删除指定会员
       * @param {number} memberId - 会员 id
       * @param {number} index - 该会员在列表中的下标
       */
    deleteMember (memberId, index) {
      this.$store.dispatch(DELETE_MEMBER, memberId, index)
    },
    /**
       * 重置表单
       */
    resetForm () {
      this.$refs.form.$refs.form.resetFields()
    }
  }
}
</script>
