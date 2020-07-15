import router, { createRoutesInLayout, routesOutLayout,asyncRoutes, resetRouter } from '@/router'
import {hasChildren} from '@/utils/index'
import {getUserMenu} from '@/api/user'

function hasRouteChildren (item = {}, keyname = 'childList') {
  const hasChild= hasChildren(item, keyname)
  return  hasChild&& item[keyname].reduce((count, menu) => menu.menuType == 1 ? ++count : count, 0) > 0
}



function getRoutes(menuSource,routes){
  function isEffectiveMenuURL (sourceItem) {
    if (sourceItem.menuType != 1) return
    if (sourceItem.isShow != 1) return
    if (sourceItem.menuUrl == '') return
    return true
  }
  function maker (menus, sourceItem) {
    if (hasRouteChildren(sourceItem)) sourceItem.childList.reduce(maker, menus)
    if(isEffectiveMenuURL(sourceItem))
      menus.push(sourceItem.menuUrl);
      
      return menus
  }
  const menuUrls = menuSource.reduce(maker, [])

  return routes.filter(function(item){
    return menuUrls.includes(item.path);
  })
}
/*
* @description 从接口返回的数据中计算出权限列表
* @param {Array} menuSource 接口返回的原始菜单数据
*/
function getPermissions (menuSource) {
 function isEffectivePermission (sourceItem) {
   if (sourceItem.menuType != 2) return
   if (sourceItem.permission == '') return
   return true
 }

 function maker (permissions, sourceItem) {
   if (isEffectivePermission(sourceItem)) permissions.push(sourceItem.permission)
   if (hasChildren(sourceItem)) permissions = permissions.concat(sourceItem.childList.reduce(maker, []))
   return permissions
 }
 return menuSource.reduce(maker, [])
}

const state = {
  routes: [],
  permissions: [],
  isLoaded:false
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.routes = routes
  },
  SET_PERMISSIONS: (state, permissions) => {
    state.permissions = permissions
  },
  SET_LOADED:(state,isLoaded) =>{
    state.isLoaded = isLoaded
  }
}

const actions = {
  load({state, commit, dispatch},{to = '', data}){
    // const source = data || await getUserMenu()
    // const menus = getMenus(source.data);
    // commit('user/SET_MENUS',menus);
  },
  generateRoutes({ state,commit }, menus) {    
    return new Promise(resolve => {
      if(state.isLoaded===true){
        return
      }else{
        const r = createRoutesInLayout(getRoutes(menus,asyncRoutes))
        r.push({ path: '*', redirect: '/404', hidden: true }) 
        const routes = routesOutLayout.concat(r)
          // [ 路由 ] 重新设置路由
        resetRouter(routes)
        commit('SET_ROUTES', routes)
        //得到所有的权限
        commit('SET_PERMISSIONS',getPermissions(menus))
        state.isLoaded = true;
        resolve(routes)
      }      
    })
  },
  resetRoutes({ commit }) {
    return new Promise(resolve => {
      commit('SET_LOADED', false)
      commit('SET_ROUTES', [])
      commit('SET_PERMISSIONS', [])
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
