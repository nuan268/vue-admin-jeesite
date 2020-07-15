import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const routesOutLayout = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  }
]

export function createRoutesInLayout(routes = []) {
  return [

    {
      path: '/',
      redirect: '/dashboard',
      component: Layout,
      children: [
        { path: 'dashboard', name: 'Dashboard', meta: { title: 'dashboard', icon: 'dashboard', affix: true }, component: () => import('@/views/dashboard/index') },
        { path: '/sys/user/info', name: 'userinfo', meta: { title: 'personalCenter', icon: 'icon-user' }, component: () => import('@/views/sys/user/info') },
        ...routes
      ]
    }
    // 404 page must be placed at the end !!!
    // ,{ path: '*', redirect: '/404', hidden: true }
  ]
}

// 默认的路由
export const constantRoutes = createRoutesInLayout().concat(routesOutLayout)
/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/js/a/sys/empUser/index',
    component: () => import('@/views/sys/empUser/index'),
    name: 'userManager',
    meta: {
      title: 'userManager'
    }
  },
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = (routes = []) => new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes
})

const router = createRouter(constantRoutes)

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter(routes = []) {
  const newRouter = createRouter(routes)
  router.matcher = newRouter.matcher // reset router
}

export default router
