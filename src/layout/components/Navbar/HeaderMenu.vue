<template>
  <el-menu
    ref="elHeader"
    class="_layout-header"
    mode="horizontal"
    :default-active="modulePath"
    :background-color="variables.navbarBg"
    :text-color="variables.headerMenuText"
    active-text-color="#fff"
    @select="select"
  >
    <el-menu-item
      v-for="m in menus.slice(0,maxShowHeaderMenu)"
      :key="m.id"
      :index="m.path"
    ><span>{{ m.title }}</span></el-menu-item>
    <el-submenu v-if="menus.length>maxShowHeaderMenu" index="/more">
      <template slot="title">更多</template>
      <el-menu-item
        v-for="m in menus.slice(maxShowHeaderMenu)"
        :key="m.id"
        :index="m.path"
      ><span>{{ m.title }}</span></el-menu-item>
    </el-submenu>
  </el-menu>
</template>
<script>
import variables from '@/styles/variables.scss'
export default {
  props: {
    menus: {
      type: Array
    },
    modulePath: {
      type: String
    }
  },
  data() {
    return {
      maxShowHeaderMenu: 5
    }
  },
  computed: {
    variables() {
      return variables
    }
  },
  methods: {
    select(index) {
      this.$store.commit('app/SET_ACTIVEHMENU', index)
    }
  }
}
</script>
