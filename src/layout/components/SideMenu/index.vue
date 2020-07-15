<template>
<div>
    <el-scrollbar wrap-class="scrollbar-wrapper">
        <el-menu            
            :default-active="$route.path"            
            router
            ref="menu"
            mode="vertical"
            :collapse="isCollapse"
            :background-color="variables.menuBg"
            :text-color="variables.menuText"
            :active-text-color="variables.menuActiveText"
            @select="select"
        >
        <div  v-if="showSideMenus" >
        <menu-tree v-for='menu in user_menus' v-show="menu.path===activeHeaderMenu" :menus='menu.children||[]' :key='menu.path'/>
        </div>
        <menu-tree v-else :menus='user_menus' />
        </el-menu>
    </el-scrollbar>
</div>
</template>
<script>
import { mapGetters } from 'vuex'
import MenuTree from './MenuTree'
import variables from '@/styles/variables.scss'
export default {
  components: { MenuTree},
  computed: {
    ...mapGetters([
      'user_menus',
      'sidebar'
    ]),
    showSideMenus(){        
        return this.$store.state.settings.headerMenu
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    activeHeaderMenu(){
        const m = this.$store.state.app.activeHMenu
        if(m) 
            return m
        else 
            return this.user_menus[0].path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  methods:{
      select(index){          
        if (/^menu-empty-\d+$/.test(index) || index === undefined) {
            //this.$message.warning('临时菜单')
        } else if (/^https:\/\/|http:\/\//.test(index)) {
            var a = document.createElement('a')
            a.setAttribute('href', index)
            a.setAttribute('target', '_blank')
            a.setAttribute('id', 'admin-link-temp')
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(document.getElementById('admin-link-temp'))            
        } else {
            this.$router.push({path: index})
        }
      }
  }
}
</script>
