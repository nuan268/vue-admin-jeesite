<template>
  <div>
    <div class="form-unit">修改密码</div>
    <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="200px" label-position="right" hide-required-asterisk class="form-container">
      <el-form-item label="旧密码" prop="oldPassword">
        <el-input
          v-model="formData.oldPassword"
          placeholder="请输入旧密码"
          :maxlength="50"
          clearable
          show-password
          :style="{width: '100%'}"
        />
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword" style="margin-bottom: 0px;">
        <el-input
          v-model="formData.newPassword"
          placeholder="请输入新密码"
          :maxlength="50"
          clearable
          show-password
          :style="{width: '100%'}"
        />
        <a href="javascript:" class="pwd-tip" tabindex="-1">密码填写建议：长度不小于8位，且包含，大写英文字母、小写英文字母、数字和符号。</a>
      </el-form-item>
      <el-form-item label="确认新密码" prop="confirmNewPassword">
        <el-input
          v-model="formData.confirmNewPassword"
          placeholder="请输入确认新密码"
          :maxlength="50"
          clearable
          show-password
          :style="{width: '100%'}"
        />
      </el-form-item>
      <el-form-item class="form-btn">
        <el-button type="primary" @click="submitForm">保存</el-button>
        <el-button @click="resetForm">关闭</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    const validateNewPwd = (rule, value, callback) => {
      if (this.formData.oldPassword === value) {
        callback(new Error('新密码和旧密码不可一致'))
      } else {
        callback()
      }
    }
    const validateComfirmPwd = (rule, value, callback) => {
      if (this.formData.newPassword !== value) {
        callback(new Error('请再次输入相同的值'))
      } else {
        callback()
      }
    }
    return {
      formData: {
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: ''
      },
      rules: {
        oldPassword: [{ required: true, message: '必填信息', trigger: 'blur' }],
        newPassword: [{ required: true, message: '必填信息', trigger: 'blur' }, { validator: validateNewPwd, trigger: 'blur' }, { min: 3, message: '最少要输入 3 个字符', trigger: 'blur' }],
        confirmNewPassword: [{ required: true, message: '必填信息', trigger: 'blur' }, { validator: validateComfirmPwd, trigger: 'blur' }, { min: 3, message: '最少要输入 3 个字符', trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitForm() {
      this.$refs['elForm'].validate(valid => {
        if (!valid) return

        this.$store.dispatch('user/changePassword', this.formData)
      })
    },
    resetForm() {
      this.$emit('close')
    }
  }
}

</script>
<style scope>

.pwd-tip{
    text-decoration: none;
    display: block;
}
.form-container .pwd-tip,.pwd-tip:hover,.pwd-tip:active{
    color:#f59942;
}
</style>
