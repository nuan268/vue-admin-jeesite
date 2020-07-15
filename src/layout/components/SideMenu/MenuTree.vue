<template>
  <div>
    <template v-for="m in menus">
      <el-menu-item
        v-if="typeof(m.children)=='undefined' || m.children.length==0"
        :key="m.id"
        class="submenu-title-noDropdown"
        :index="m.path?m.path:m.id"
      >
        <j-icon v-if="m.icon" :class="['fa ',m.icon,'sub-el-icon']" />
        <span>{{ m.title }}</span>
      </el-menu-item>
      <el-submenu v-else :key="m.id" :index="m.path?m.path:m.id" class="nest-menu" popper-append-to-body>
        <template slot="title">
          <j-icon v-if="m.icon" :class="['fa ',m.icon,'sub-el-icon']" />
          <span>{{ m.title }}</span>
        </template>

        <el-menu-tree :menus="m.children" />
      </el-submenu>
    </template>
  </div>
</template>
<script>
export default {
  name: 'ElMenuTree',
  props: {
    menus: {
      type: Array
    }
  }
}
</script>
