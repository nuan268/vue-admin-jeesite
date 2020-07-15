<template>
  <div>
    <div v-show="!hasGetQA">
      <img :src="validCodeUrl" style="float: left;" @click="validCodeUrl=validCodeUrl+'&'+new Date().getTime()">
      <el-input v-model="validCode" width="100px" style="width:100px;margin:0 10px;" size="mini" />
      <el-button type="primary" size="mini" @click="getPwdQA">获得密保问题</el-button>
    </div>
    <div v-show="hasGetQA">
      <div v-if="isShowTip" class="alert-dismissible">
        <button type="button" class="close" @click="isShowTip=false">×</button>
        <p><i class="icon fa fa-info" /> 您还未设置过密保问题，您可以根据登录密码设置新的密保问题及答案。</p>
      </div>
      <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="200px" class="form-container" hide-required-asterisk>
        <el-form-item v-if="!hasPwdQA" label="登录密码" prop="validPassword">
          <el-input
            v-model="formData.validPassword"
            placeholder="请输入密码"
            :maxlength="50"
            clearable
            show-password
            :style="{width: '100%'}"
          />
        </el-form-item>

        <div v-if="hasPwdQA">
          <div class="form-unit">旧的密保问题及答案</div>
          <el-form-item label="旧密保问题（1）" prop="oldPwdQuestion">
            <el-input
              v-model="formData.oldPwdQuestion"
              readonly
              clearable
              :style="{width: '100%'}"
            />
          </el-form-item>
          <el-form-item label="旧密保问题答案（1）" prop="oldPwdQuestionAnswer">
            <el-input
              v-model="formData.oldPwdQuestionAnswer"
              clearable
              :style="{width: '100%'}"
            />
          </el-form-item>
          <el-form-item label="旧密保问题（2）" prop="oldPwdQuestion2">
            <el-input
              v-model="formData.oldPwdQuestion2"
              readonly
              clearable
              :style="{width: '100%'}"
            />
          </el-form-item>
          <el-form-item label="旧密保问题答案（2）" prop="oldPwdQuestionAnswer2">
            <el-input
              v-model="formData.oldPwdQuestionAnswer2"
              clearable
              :style="{width: '100%'}"
            />
          </el-form-item>
          <el-form-item label="旧密保问题（3）" prop="oldPwdQuestion3">
            <el-input v-model="formData.oldPwdQuestion3" readonly :style="{width: '100%'}" />
          </el-form-item>
          <el-form-item label="旧密保问题答案（3）" prop="oldPwdQuestionAnswer3">
            <el-input
              v-model="formData.oldPwdQuestionAnswer3"
              clearable
              :style="{width: '100%'}"
            />
          </el-form-item>
        </div>
        <div class="form-unit">新的密保问题及答案</div>
        <el-form-item label="新密保问题（1）" prop="pwdQuestion">
          <el-input v-model="formData.pwdQuestion" clearable :style="{width: '100%'}" />
        </el-form-item>
        <el-form-item label="新密保问题答案（1）" prop="pwdQuestionAnswer">
          <el-input v-model="formData.pwdQuestionAnswer" clearable :style="{width: '100%'}" />
        </el-form-item>
        <el-form-item label="新密保问题（2）" prop="pwdQuestion2">
          <el-input v-model="formData.pwdQuestion2" clearable :style="{width: '100%'}" />
        </el-form-item>
        <el-form-item label="新密保问题答案（2）" prop="pwdQuestionAnswer2">
          <el-input v-model="formData.pwdQuestionAnswer2" clearable :style="{width: '100%'}" />
        </el-form-item>
        <el-form-item label="新密保问题（3）" prop="pwdQuestion3">
          <el-input v-model="formData.pwdQuestion3" clearable :style="{width: '100%'}" />
        </el-form-item>
        <el-form-item label="新密保问题答案（3）" prop="pwdQuestionAnswer3">
          <el-input v-model="formData.pwdQuestionAnswer3" clearable :style="{width: '100%'}" />
        </el-form-item>
        <el-form-item class="form-btn">
          <el-button type="primary" @click="submitForm">保存</el-button>
          <el-button @click="resetForm">关闭</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { getToken } from '@/utils/auth'
import { deepClone } from '@/utils/index'
export default {
  data() {
    const _required = [{ required: true, message: '必填信息', trigger: 'blur' }, { min: 3, message: '最少要输入 3 个字符', trigger: 'blur' }]
    return {
      validCodeUrl: '/api/validCode?__sid=' + getToken(),
      validCode: '',
      isShowTip: true,
      hasPwdQA: false,
      hasGetQA: false,
      formData: {
        validPassword: '',
        pwdQuestion: '',
        pwdQuestionAnswer: '',
        pwdQuestion2: '',
        pwdQuestionAnswer2: '',
        pwdQuestion3: '',
        pwdQuestionAnswer3: '',
        oldPwdQuestion: '',
        oldPwdQuestionAnswer: undefined,
        oldPwdQuestion2: undefined,
        oldPwdQuestionAnswer2: undefined,
        oldPwdQuestion3: undefined,
        oldPwdQuestionAnswer3: undefined
      },
      rules: {
        validPassword: _required,
        pwdQuestion: _required,
        pwdQuestionAnswer: _required,
        pwdQuestion2: _required,
        pwdQuestionAnswer2: _required,
        pwdQuestion3: _required,
        pwdQuestionAnswer3: _required,
        oldPwdQuestion: _required,
        oldPwdQuestionAnswer: _required,
        oldPwdQuestion2: _required,
        oldPwdQuestionAnswer2: _required,
        oldPwdQuestion3: _required,
        oldPwdQuestionAnswer3: _required
      }
    }
  },
  methods: {
    getPwdQA() {
      const data1 = { loginCode: this.$store.getters.userinfo.userCode, validCode: this.validCode }
      this.$store.dispatch('user/getPasswordQA', data1).then(result => {
        if (result.data.result === 'true') {
          this.hasGetQA = true
          this.hasPwdQA = true
          this.isShowTip = false

          this.formData.pwdQuestion = this.formData.oldPwdQuestion = result.data.pwdQuestion
          this.formData.pwdQuestion2 = this.formData.oldPwdQuestion2 = result.data.pwdQuestion2
          this.formData.pwdQuestion3 = this.formData.oldPwdQuestion3 = result.data.pwdQuestion3
        }
      }).catch(error => {
        if (error.message === '该账号未设置密保问题！') {
          this.hasGetQA = true
          this.hasPwdQA = false
          this.isShowTip = true
        }
      })
    },
    submitForm() {
      this.$refs['elForm'].validate(valid => {
        if (!valid) return
        const base64 = require('js-base64').Base64

        const data = deepClone(this.formData)
        data.validPassword = data['validPassword'] ? base64.encode(data.validPassword) : ''
        data.pwdQuestionAnswer = data['pwdQuestionAnswer'] ? base64.encode(data.pwdQuestionAnswer) : ''
        data.pwdQuestionAnswer2 = data['pwdQuestionAnswer2'] ? base64.encode(data.pwdQuestionAnswer2) : ''
        data.pwdQuestionAnswer3 = data['pwdQuestionAnswer3'] ? base64.encode(data.pwdQuestionAnswer3) : ''
        data.oldPwdQuestionAnswer = data['oldPwdQuestionAnswer'] ? base64.encode(data.oldPwdQuestionAnswer) : ''
        data.oldPwdQuestionAnswer2 = data['oldPwdQuestionAnswer2'] ? base64.encode(data.oldPwdQuestionAnswer2) : ''
        data.oldPwdQuestionAnswer3 = data['oldPwdQuestionAnswer3'] ? base64.encode(data.oldPwdQuestionAnswer3) : ''
        this.$store.dispatch('user/changePwdQA', data)
      })
    },
    resetForm() {
      this.$emit('close')
    }
  }
}
</script>
<style scoped>
.alert-dismissible{
   background-color: #00c0ef;
    color: #fff;
    border-radius: 3px;
    padding: 5px 30px 5px 15px;
    border-left: 5px solid #0097bc;
    margin: 10px 10px 30px 10px;
    height: 50px;
    font-size: 14px;
}
.alert-dismissible .close{
    color: #000;
    opacity: .2;
    position: relative;
    padding: 0;
    cursor: pointer;
    background: 0 0;
    border: 0;
    float: right;
    font-size: 30px;
    font-weight: 500;
    line-height: 1;
    color: #000;
    text-shadow: 0 1px 0 #fff;
}
input.el-input__inner[readonly]{
    background-color: #f3f3f3 !important;
}
</style>
