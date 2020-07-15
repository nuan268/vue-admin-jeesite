<template>
  <div>
    <div>用户管理</div>
    <input type="text">
    <button @click="dialogVisible = true">测试</button>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'UserManager',
  data() {
    return {
      dialogVisible: false
    }
  }
}
</script>
