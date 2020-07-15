<template>
  <div class="navbar">
    <div class="navbar-logo-container">
      <router-link class="navbar-logo-link" to="/">
        <img v-if="logo" :src="logo" class="navbar-logo">
        <h1 v-else class="navbar-title">{{ title }} </h1>
      </router-link>
    </div>
    <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <div v-if="$store.state.settings.headerMenu" class="header-menus">
      <!-- <span>菜单区域</span> -->
      <header-menu :menus="user_menus" :module-path="activeMenu" />
    </div>

    <div class="right-menu">
      <template v-if="device!=='mobile'">

        <el-tooltip :content="$t('navbar.fullscreen')" placement="bottom">
          <screenfull id="screenfull" class="right-menu-item hover-effect" />
        </el-tooltip>
        <el-tooltip :content="$t('navbar.theme')" placement="bottom">
          <theme-panel class="right-menu-item hover-effect" @change="themeChange" />
        </el-tooltip>

        <lang-select class="right-menu-item hover-effect" />

      </template>

      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="hover">
        <div class="avatar-wrapper">
          <img :src="avatar" class="user-avatar">
          <span style="vertical-align: top;">{{ name }}</span>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="openView('user')">
            <span style="display:block;">个人中心</span>
          </el-dropdown-item>
          <el-dropdown-item @click.native="openView('pwd')">
            <span style="display:block;">修改密码</span>
          </el-dropdown-item>
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">{{ $t('navbar.logOut') }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Cookies from 'js-cookie'
import { getParentPath } from '@/utils'
import Hamburger from '@/components/Hamburger'
import Screenfull from '@/components/Screenfull'
import LangSelect from '@/components/LangSelect'
import ThemePanel from './themePanel'
import HeaderMenu from './HeaderMenu'

export default {
  components: {
    Hamburger,
    Screenfull,
    ThemePanel,
    LangSelect,
    HeaderMenu
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'device',
      'name',
      'user_menus'
    ])
  },
  mounted() {
    if (this.$store.state.settings.headerMenu) {
      const m = getParentPath(this.user_menus, this.$route.path)
      this.activeMenu = m
      this.$store.commit('app/SET_ACTIVEHMENU', m)
      const id = this.$store.getters.userinfo.id
      this.$store.dispatch('theme/changeTheme', Cookies.get('skinName_' + id))
      // 获得当前父模块 ------待补充
      /* 暂时都返回第一个菜单 */
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    themeChange(theme) {
      this.$store.dispatch('theme/changeTheme', theme.name)
      const id = this.$store.getters.userinfo.id
      Cookies.set('skinName_' + id, theme.name)
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    openView(type) {
      this.$router.push('/sys/user/info?type=' + type)
    }
  },
  data() {
    return {
      title: 'JeeSite Demo',
      logo: '',
      activeMenu: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  color: #fff;
  overflow: hidden;
  position: fixed;
  width:100%;
  z-index:11;
  top:0;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

   .navbar-logo-container{
      height: 50px;
      float: left;
      width:140px;
      margin-left:20px;
      overflow: hidden;
    }
  .navbar-logo-link{
    display: inline-block;
    height: 100%;
  }
  .navbar-logo{
    height: 40px;
    margin-top: 5px;
  }
  .navbar-title{
    display: inline-block;
    margin: 0;
    font-weight: 600;
    line-height: 50px;
    font-size: 20px;
    font-family: Avenir,Helvetica Neue,Arial,Helvetica,sans-serif;
    vertical-align: middle;
  }
  .hamburger-container {
    line-height: 50px;
    color: #fff;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(1, 1, 1, .025)
    }
  }
    .header-menus{
        height:50px;
        float:left;
    }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      color: #fff;
      padding: 0 8px;
      height: 100%;
      font-size: 14px;
      // color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 10px;

      .avatar-wrapper {
        // margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 25px;
          height: 25px;
          border-radius: 50%;
          vertical-align: middle;
          margin-right: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
