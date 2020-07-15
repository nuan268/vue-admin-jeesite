const getters = {
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar ? state.user.avatar.replace('ctxPath', 'api') : '',
  name: state => state.user.name,
  userinfo: state => state.user.userinfo,
  roles: state => state.user.roles,
  user_menus: state => state.user.menus,
  permission_routes: state => state.permission.routes,
  permissions: state => state.permission.permission,
  isLoaded: state => state.permission.isLoaded,
  errorLogs: state => state.errorLog.logs,
  themes: state => state.theme.themes
}
export default getters
