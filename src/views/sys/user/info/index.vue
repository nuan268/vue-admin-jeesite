<template>
  <div class="nav-tabs-custom nav-main">
    <!-- <span class="box-title"><j-icon name="user"/>个人中心</span> -->
    <el-tabs v-model="activeTab" type="border-card">
      <el-tab-pane disabled><span slot="label" style="float:left"><j-icon name="user" />个人中心</span></el-tab-pane>

      <el-tab-pane name="security" label="修改密保">

        <form-pwd-qa @close="onClose" />
      </el-tab-pane>
      <el-tab-pane name="pwd" label="修改密码">
        <form-password @close="onClose" />
      </el-tab-pane>
      <el-tab-pane name="user" label="个人信息">
        <form-user @close="onClose" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import FormUser from './components/FormUser.vue'
import FormPassword from './components/FormPassword.vue'
import FormPwdQa from './components/FormPwdQa.vue'
export default {
  name: 'Userinfo',
  components: {
    FormUser,
    FormPassword,
    FormPwdQa
  },
  data() {
    return {
      activeTab: this.$route.query.type || 'user'
    }
  },
  watch: {
    $route(route) {
      this.activeTab = route.query.type
    },
    activeTab(val) {
      this.$router.push(`${this.$route.path}?type=${val}`)
    }
  },
  methods: {
    onClose() {
      this.$store.state.tagsView.visitedViews.splice(this.$store.state.tagsView.visitedViews.findIndex(item => item.path === this.$route.path), 1)
      this.$router.push(this.$store.state.tagsView.visitedViews[this.$store.state.tagsView.visitedViews.length - 1].path)
    }
  }
}
</script>
<style scope>
.el-tabs__nav{
    width:100%;

}
.el-tabs__header{
    background-color: #fff !important;
}
.el-tabs--border-card {
    border:none;
}
.el-tabs__item{
    float:right;
    color:#000 !important;
    height: 45px;
    line-height: 45px;
}
.el-tabs__item.is-disabled{
    float:left;
    font-size:16px;
}
.el-tabs__item.is-active{
    border-top-color: #3aa0ff !important;
    border-top-width: 3px !important;
}
.form-container label {
  font-weight: 400;
}
.form-container{
    /* padding-right:5%; */
}
.form-unit{
    border-bottom: 1px solid #eee;
    color: #1890ff;
    font-size: 15px;
    font-style: oblique;
    margin: 8px 10px 25px 10px;
    padding-bottom: 5px;
}
.form-btn{
    text-align:center;
}
.form-btn .el-form-item__content{
    margin-left:0 !important;
}

</style>
