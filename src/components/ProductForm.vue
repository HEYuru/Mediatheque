<template>
  <div class="container">
    <el-form ref="form" :model="editedMember" :rules="rules" label-width="80px">
      <el-form-item label="Nom de member" prop="memberName">
        <el-input placeholder="Veuillez entrer le nom du membre" v-model="editedMember.memberName">
        </el-input>
      </el-form-item>
      <el-form-item label="Numéro d'étudiant" prop="memberNum">
        <el-input placeholder="Veuillez entrer le numéro d'étudiant" v-model="editedMember.memberNum">
        </el-input>
      </el-form-item>
      <el-form-item label="Numéro de téléphone" prop="memberTel">
        <el-input placeholder="Veuillez entrer le numéro de téléphone" v-model="editedMember.memberTel">
        </el-input>
      </el-form-item>
      <el-form-item label="Address" prop="memberAddress">
        <el-input placeholder="Veuillez entrer le address" v-model="editedMember.memberAddress">
        </el-input>
      </el-form-item>
      <el-form-item label="Type de member">
        <el-radio-group v-model="editedMember.memberRank">
          <el-radio :label="0">Carte de semaine</el-radio>
          <el-radio :label="1">Carte de mois</el-radio>
          <el-radio :label="2">Carte de Semestre</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="confirm(editedMember)">Valider</el-button>
        <el-button @click="cancel('form')">Annuler</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { SEARCH_MEMBER } from '@/constants/values'

export default {
  name: 'ProductForm',
  props: ['member', 'confirm', 'cancel', 'update'],
  data () {
    // 自定义学号校验规则，学号必须是唯一值
    const checkNum = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('pas de vide'))
      }
      if (value.length !== 10) {
        return callback(new Error('le bon numéro d'étudiant '))
      }
      // 如果是更新会员信息，当学号一致时不做处理
      if (this.update && this.member.memberNum === value) {
        callback()
        return
      }
      this.$store.dispatch(SEARCH_MEMBER, {
        params: {
          num: value
        },
        cb: res => {
          if (res.length !== 0) {
            callback(new Error('Membre existe'))
          } else {
            callback()
          }
        }
      })
    }
    return {
      rules: {
        memberName: [
          {
            required: true,
            message: 'Veuillez entrer le nom du membre',
            trigger: 'blur'
          },
          {
            max: 5,
            message: 'Pas plus de 5 caractères',
            trigger: 'blur'
          }
        ],
        memberNum: [
          {
            validator: checkNum,
            trigger: 'blur'
          }
        ],
        memberTel: [
          {
            required: true,
            message: 'Veuillez entrer le numéro de téléphone',
            trigger: 'blur'
          },
          {
            max: 11,
            message: 'Pas plus de 11 caractères',
            trigger: 'blur'
          }
        ],
        memberAddress: [
          {
            required: true,
            message: 'Veuillez entrer l'adresse',
            trigger: 'blur'
          }
        ],
        memberRank: [
          {
            required: true,
            message: 'Veuillez sélectionner le type de membre',
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
