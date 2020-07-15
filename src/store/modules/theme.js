
const dark = { menuBg: '#263238', subMenuBg: '#2c3b41', menuText: '#bfcbd9', menuActiveText: '#fff' }
const light = { menuBg: '#e3e7ec', subMenuBg: '#eaedf1', menuText: '#555', menuActiveText: '#000' }
const newAdd = { menuBg: '#fff', subMenuBg: '#fff', menuText: '#555', menuActiveText: '#000' }
const themes = {
  'blue': { other: { navbarBg: '#3c8dbc' }, dark: true },
  'black2': { other: { navbarBg: '#303643' }, dark: true },
  'purple': { other: { navbarBg: '#605ca8' }, dark: true },
  'green': { other: { navbarBg: '#00a65a' }, dark: true },
  'red': { other: { navbarBg: '#dd4b39' }, dark: true },
  'yellow': { other: { navbarBg: '#f39c12' }, dark: true },
  'blue-light': { other: { navbarBg: '#2a579a' }, light: true },
  'black-light2': { other: { navbarBg: '#303643' }, light: true },
  'purple-light': { other: { navbarBg: '#605ca8' }, light: true },
  'green-light': { other: { navbarBg: '#00a65a' }, light: true },
  'red-light': { other: { navbarBg: '#dd4b39' }, light: true },
  'yellow-light': { other: { navbarBg: '#f39c12' }, light: true },
  'blue2': { other: { navbarBg: '#1951be' }, newAdd: true },
  'blue-light2': { other: { navbarBg: '#1890ff' }, newAdd: true }
}

const state = {
  activeTheme: ''
}

const mutations = {
  CHANGE_THEME: (state, t) => {
    const theme = themes[t]
    if (t && theme) {
      const all = {}
      if (theme.dark) {
        Object.assign(all, theme.other, dark)
      } else if (theme.light) {
        Object.assign(all, theme.other, light)
      } else {
        Object.assign(all, theme.other, newAdd)
      }
      var appStyle = document.getElementById('app').style
      Object.keys(all).forEach(key => {
        appStyle.setProperty('--' + key, all[key])
      })
      state.activeTheme = t
    }
  }
}

const actions = {
  changeTheme({ commit }, data) {
    commit('CHANGE_THEME', data)
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
