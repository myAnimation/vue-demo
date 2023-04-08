import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'




export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },

  {
    path: '/gdmap',
    component: Layout,
    redirect: '/gdmap/index',
    children: [
      {
        path: 'index',
        name: 'gdmapIndex',
        component: () => import('@/views/gaodeMap/index'),
        meta: { title: '高德API使用', icon: 'table' }
      },
     
    ]
  },
  {
    path: '/baidu',
    component: Layout,
    redirect: '/baidu/index',
    children: [
      {
        path: 'index',
        name: 'baiduIndex',
        component: () => import('@/views/baiduMap/index'),
        meta: { title: '百度API使用', icon: 'table' }
      },
     
    ]
  },
  {
    path: '/ecahrts',
    component: Layout,
    redirect: '/ecahrts/index',
    children: [
      {
        path: 'index',
        name: 'ecahrtsIndex',
        component: () => import('@/views/EchartsDemo/index'),
        meta: { title: 'Echarts图标', icon: 'table' }
      },
     
    ]
  },


  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
