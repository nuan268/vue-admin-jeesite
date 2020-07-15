<template>
  <el-form ref="elForm" :model="form" label-width="150px" :rules="rules" size="medium " class="form-container">
    <el-container>
      <el-aside width="30%">
        <div style="text-align:center;">
          <img ref="userImage" :src="form.avatarUrl" class="img-circle profile-user-img ">
          <h3 class="profile-username text-center">超级管理员</h3>
          <span>
            <el-radio v-model="form.sex" label="1">男</el-radio>
            <el-radio v-model="form.sex" label="2">女</el-radio>
          </span>
          <el-upload ref="upload" :auto-upload="false" action="/api" :show-file-list="false" :on-change="handleImgChange">
            <el-button type="info" style="color:#000;" plain>修改头像</el-button>
          </el-upload>
        </div>
      </el-aside>
      <el-main>
        <el-form-item label="用户昵称" prop="userName">
          <el-input
            v-model.trim="form.userName"
            placeholder="请输入用户昵称"
            clearable
            suffix-icon="el-icon-user-solid"
            :style="{width: '75%'}"
          />
        </el-form-item>
        <el-form-item label="电子邮箱" prop="email">
          <el-input
            v-model="form.email"
            placeholder="请输入电子邮箱"
            clearable
            suffix-icon="el-icon-message"
            :style="{width: '75%'}"
          />
        </el-form-item>
        <el-form-item label="手机号码" prop="mobile">
          <el-input v-model="form.mobile" placeholder="请输入手机号码" clearable :style="{width: '75%'}" suffix-icon="fa fa-mobile" />
        </el-form-item>
        <el-form-item label="办公电话" prop="phone">
          <el-input
            v-model.number="form.phone"
            placeholder="请输入办公电话"
            clearable
            suffix-icon="el-icon-phone"
            :style="{width: '75%'}"
          />
        </el-form-item>
        <el-form-item label="个性签名" prop="sign">
          <el-input
            v-model="form.sign"
            type="textarea"
            placeholder="请输入个性签名"
            :autosize="{minRows: 3, maxRows: 3}"
            :style="{width: '75%'}"
          />
        </el-form-item>
        <el-form-item>
          <span>上次登录：  时间{{ userinfo.lastLoginDate }}   IP:{{ userinfo.lastLoginIp }}</span>
        </el-form-item>
      </el-main>
    </el-container>
    <el-form-item class="form-btn">
      <el-button type="primary" @click="onSubmit">保存</el-button>
      <el-button @click="onClose">关闭</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
// /js/a/sys/user/infoSaveBase
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'userinfo'
    ])
  },
  data() {
    const info = this.$store.getters.userinfo
    return {
      form: {
        sex: info.sex || '',
        avatarUrl: this.$store.getters.avatar || '',
        avatarBase64: '',
        email: info.email || '',
        userName: this.$store.getters.name || '',
        mobile: info.mobile || '',
        phone: info.phone || '',
        sign: info.sign || ''
      },
      rules: {
        userName: [
          { required: true, message: '必填信息', trigger: 'blur' },
          { max: 32, message: '长度需在32个字符内', trigger: 'blur' }
        ],
        email: [{ type: 'email', message: '请输入正确格式的电子邮件', trigger: ['blur', 'change'] }],
        mobile: [{ pattern: /^1(3|4|5|6|7|8)\d{9}$/, message: '请正确填写您的手机号码，只能是13,14,15,16,17,18,19号段', trigger: ['blur', 'change'] }],
        phone: { pattern: /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/, message: '请正确填写您的电话号码，固话为区号(3-4位)号码(7-9位)', trigger: ['blur', 'change'] },
        sign: { max: 100 }

      }
    }
  },
  methods: {
    handleImgChange(res) {
      this.form.avatarUrl = URL.createObjectURL(res.raw)
      const img = this.$refs.userImage
      const _this = this
      img.onload = function() {
        var data = _this.getBase64Image(img)
        _this.form.avatarBase64 = data
      }
    },
    onSubmit() {
      this.$refs['elForm'].validate(valid => {
        if (!valid) return

        const form = this.form
        this.$store.dispatch('user/changeUserInfo', { sex: form.sex, userName: form.userName, email: form.email, mobile: form.mobile, phone: form.phone, sign: form.sign, avatarBase64: form.avatarBase64 })
      })
    },
    onClose() {
      this.$emit('close')
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    getBase64Image(image) {
      const canvas = document.createElement('canvas')
      canvas.width = image.width
      canvas.height = image.height
      const ctx = canvas.getContext('2d')
      ctx.drawImage(image, 0, 0, image.width, image.height)
      const ext = image.src.substring(image.src.lastIndexOf('.') + 1).toLowerCase()
      const dataUrl = canvas.toDataURL('images/' + ext)
      return dataUrl
    }
  }
}
</script>
<style scope>

.form-container aside{
    background-color: #fff;
}
.profile-user-img {
    margin: 20px auto;
    padding: 3px;
    border: 3px solid #caced6;
    width:150px;
    height:150px;
}
.profile-username {
    font-size: 21px;
    margin: 5px 0;
    font-weight: 500;
    line-height: 1.1;
}
.el-radio__inner{
    width:18px;
    height: 18px;
}
</style>
