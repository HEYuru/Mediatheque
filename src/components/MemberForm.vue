<template>
  <div class="container">
    <el-form ref="member" :model="member" :rules="rules" label-width="80px">
      <el-form-item label="Nom du membre" prop="username">
        <el-input placeholder="Veuillez entrer le nom du membre" v-model="member.username">
        </el-input>
      </el-form-item>
      <el-form-item label="Numéro d'étudiant" prop="num">
        <el-input placeholder="Veuillez entrer numéro d'étudiant" v-model="member.num">
        </el-input>
      </el-form-item>
      <el-form-item label="Numéro de téléphone" prop="tel">
        <el-input placeholder="Veuillez entrer Numéro de téléphone" v-model="member.tel">
        </el-input>
      </el-form-item>
      <el-form-item label="address" prop="address">
        <el-input placeholder="Veuillez entrer address" v-model="member.address">
        </el-input>
      </el-form-item>
      <el-form-item label="type de member">
        <el-radio-group v-model="member.rank">
          <el-radio :label="0">Carte de semaine</el-radio>
          <el-radio :label="1">Carte de mois</el-radio>
          <el-radio :label="2">Carte de semestre</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {
  SEARCH_MEMBER
} from '@/constants/values'

export default {
  name: 'MemberForm',
  props: [
    'member'
  ],
  data () {
    // 自定义学号校验规则，学号必须是唯一值
    const checkNum = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('Numéro de étudiant ne peut pas être vide'))
      }
      if (value.length !== 10) {
        return callback(new Error('le bon numéro étudiant'))
      }
      // 如果是更新会员信息，当学号一致时不做处理
      if (this.update && this.member.num === value) {
        callback()
        return
      }
      this.$store.dispatch(SEARCH_MEMBER, {
        params: {
          num: value
        },
        cb: res => {
          if (res.length !== 0) {
            callback(new Error('Le membre existe'))
          } else {
            callback()
          }
        }
      })
    }
    return {
      rules: {
        username: [
          {
            required: true,
            message: 'Veuillez entrer le nom de événement',
            trigger: 'blur'
          },
          {
            max: 5,
            message: 'Pas plus de cinq caractères',
            trigger: 'blur'
          }
        ],
        num: [
          {
            validator: checkNum,
            trigger: 'blur'
          }
        ],
        tel: [
          {
            required: true,
            message: 'Veuillez entrer le numéro de téléphone',
            trigger: 'blur'
          },
          {
            max: 11,
            message: 'Veuillez entrer le bon numéro',
            trigger: 'blur'
          }
        ],
        address: [
          {
            required: true,
            message: 'Veuillez entrer adresse',
            trigger: 'blur'
          }
        ],
        rank: [
          {
            required: true,
            message: 'Sélectionnez le type de membre',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  computed: {
    editedMember () {
      return {
        ...this.member
      }
    }
  }
}
</script>
