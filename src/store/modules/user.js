import { login, logout, getInfo, getUserMenu, changeInfo, changePassword, changePwdQA, getPwdQA } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { Message } from 'element-ui'
import { resetRouter, constantRoutes } from '@/router'
import { hasChildren } from '@/utils/index'

function hasRouteChildren(item = {}, keyname = 'childList') {
  const hasChild = hasChildren(item, keyname)
  return hasChild && item[keyname].reduce((count, menu) => menu.menuType == 1 ? ++count : count, 0) > 0
}
function getMenus(menuSource) {
  function isEffectiveMenu(sourceItem) {
    if (sourceItem.menuType != 1) return
    if (sourceItem.isShow != 1) return
    if (sourceItem.menuName == '') return
    return true
  }
  function supplementPath(menu) {
    return menu.map(e => ({
      ...e,
      path: e.path || ('menu-empty-' + e.id),
      ...e.children ? {
        children: supplementPath(e.children)
      } : {}
    }))
  }

  function maker(menus, sourceItem) {
    if (!isEffectiveMenu(sourceItem)) return menus
    const menu = { title: sourceItem.menuName, path: sourceItem.menuUrl, icon: sourceItem.menuIcon, id: sourceItem.menuCode }
    if (hasRouteChildren(sourceItem)) menu.children = sourceItem.childList.reduce(maker, [])
    menus.push(menu)
    return menus
  }
  const ms = menuSource.reduce(maker, [])
  return supplementPath(ms)
}

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  userinfo: '',
  roles: [],
  menus: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USERINFO: (state, info) => {
    state.userinfo = info
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_MENUS: (state, menus) => {
    state.menus = menus
  }
}

const actions = {
  changeUserInfo({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      changeInfo(userInfo).then(response => {
        const { data } = response
        Message({
          message: data.message,
          type: 'success',
          duration: 3 * 1000
        })
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  changePassword({ commit }, pwd) {
    return new Promise((resolve, reject) => {
      changePassword(pwd).then(response => {
        const { data } = response
        Message({
          message: data.message,
          type: 'success',
          duration: 3 * 1000
        })
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  changePwdQA({ commit }, pwdQA) {
    return new Promise((resolve, reject) => {
      changePwdQA(pwdQA).then(response => {
        const { data } = response
        Message({
          message: data.message,
          type: 'success',
          duration: 3 * 1000
        })
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.sessionid)
        setToken(data.sessionid)
        if (data.user) {
          commit('SET_NAME', data.user.userName)
          commit('SET_AVATAR', data.user.avatarUrl)
          commit('SET_USERINFO', data.user)
        }
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response
        if (!data) {
          reject('Verification failed, please Login again.')
        }
        if (data.user) {
          commit('SET_NAME', data.user.userName)
          commit('SET_AVATAR', data.user.avatarUrl)
          commit('SET_USERINFO', data.user)
        }
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_NAME', '')
        commit('SET_USERINFO', null)
        commit('SET_MENUS', [])
        removeToken()
        resetRouter(constantRoutes)
        dispatch('permission/resetRoutes', null, { root: true })
        // dispatch('perssion/')
        // reset visited views and cached views
        // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
        dispatch('tagsView/delAllViews', null, { root: true })

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  getUserMenu({ commit, state }) {
    return new Promise((resolve, reject) => {
      getUserMenu(state.token).then(response => {
        const { data } = response

        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const usermenu = getMenus(data)
        commit('SET_MENUS', usermenu)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },
  getPasswordQA({ commit }, data) {
    return new Promise((resolve, reject) => {
      getPwdQA(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // dynamically modify permissions
  async changeRoles({ commit, dispatch }, role) {

  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
