<template>
  <div>
    <svg-icon icon-class="dashboard" style="font-size:18px" @click="click" />
    <el-dialog ref="dialog_theme" :visible="dialogVisible" width="560px" :title="$t('navbar.theme')" :modal-append-to-body="modal" @close="click">
      <div>
        <ul class="list-unstyled clearfix" style="list-style: none;padding:5px;">
          <li v-for="(t,i) in themeData" :key="i" style="float:left;width:16.66666%;padding:5px;" @click="changeTheme(t)">
            <a href="javascript:" :data-skin="t.name" style="display:block;box-shadow:0 0 3px rgba(0,0,0,0.4)">
              <span v-for="(c,index) in t.color" :key="index" :style="{'display':'block','float':'left','background':c,'width':index%2 ===0 ?'20%':'80%','height':index<2?'13px':'30px'}" />
            </a>
            <p class="text-center no-margin">{{ t.title }}</p>
          </li>
          <li>
            <el-switch v-model="tagsView" class="drawer-switch" />
            <span>{{ $t('settings.tagsView') }}</span>
          </li>
        </ul>
      </div>
      <div class="dialog-item" />
    </el-dialog>
  </div>

</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      modal: false,
      themeData: [
        { name: 'blue', title: '蓝', color: ['#357ca5', '#3c8dbc', '#222d32', '#f4f5f7'] },
        { name: 'black2', title: '黑-经典', color: ['#303643', '#303643', '#222d32', '#f4f5f7'] },
        { name: 'purple', title: '紫', color: ['#555299', '#605ca8', '#222d32', '#f4f5f7'] },
        { name: 'green', title: '绿', color: ['#008d4c', '#00a65a', '#222d32', '#f4f5f7'] },
        { name: 'red', title: '红', color: ['#d33724', '#dd4b39', '#222d32', '#f4f5f7'] },
        { name: 'yellow', title: '黄', color: ['#db8b0b', '#f39c12', '#222d32', '#f4f5f7'] },
        { name: 'blue-light', title: '蓝灰-经典', color: ['#254b83', '#2a579a', '#f9fafc', '#f4f5f7'] },
        { name: 'black-light2', title: '黑灰', color: ['#303643', '#303643', '#f9fafc', '#f4f5f7'] },
        { name: 'purple-light', title: '紫灰', color: ['#555299', '#605ca8', '#f9fafc', '#f4f5f7'] },
        { name: 'green-light', title: '绿灰', color: ['#008d4c', '#00a65a', '#f9fafc', '#f4f5f7'] },
        { name: 'red-light', title: '红灰', color: ['#d33724', '#dd4b39', '#f9fafc', '#f4f5f7'] },
        { name: 'yellow-light', title: '黄灰', color: ['#db8b0b', '#f39c12', '#f9fafc', '#f4f5f7'] },
        { name: 'blue2', title: '亮蓝（新）', color: ['#1648ab', '#1951be', '#f9fafc', '#f4f5f7'] },
        { name: 'blue-light2', title: '浅蓝（新）', color: ['#1681e5', '#1890ff', '#f9fafc', '#f4f5f7'] }
      ]
    }
  },
  computed: {
    tagsView: {
      get() {
        return this.$store.state.settings.tagsView
      },
      set(val) {
        this.$store.dispatch('settings/changeSetting', {
          key: 'tagsView',
          value: val
        })
      }
    }
  },
  methods: {
    click() {
      this.dialogVisible = !this.dialogVisible
    },
    handleClose() {

    },
    changeTheme(t) {
      this.$emit('change', t)
    }
  }
}
</script>

<style>
.dialog-item{
    color: rgba(0, 0, 0, .65);
    font-size: 14px;
    padding: 12px 0;
}
.el-dialog__header{
  background-color: #f4f6f8 !important;
  padding: 10px;
}
</style>
