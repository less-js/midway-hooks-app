import {
  createRouter,
  createWebHashHistory,
  RouteRecordRaw,
  RouteLocationNormalized,
  NavigationGuardNext,
} from 'vue-router'
import { ElMessage } from 'element-plus'
import useCache from '@/utils/storage'
import { useMenuStore } from '@/store/menuStore'

const routes: Array<RouteRecordRaw> = [
  // {
  // path: '/',
  // name: 'Home',
  // redirect: '/dashboard',
  // component: () => import('@/layout/LayoutDefault.vue'),
  // meta: {
  //   title: '首页',
  // },
  // children: [
  // {
  //   path: 'dashboard',
  //   name: 'Dashboard',
  //   component: () => import('@/view/dashboard/DashboardIndex.vue'),
  //   meta: {
  //     title: '仪表盘',
  //     order: 0,
  //   },
  // },
  // {
  //   path: 'manage',
  //   name: 'Manage',
  //   component: () => import('@/layout/LayoutOther.vue'),
  //   meta: {
  //     title: '系统管理',
  //   },
  //   children: [
  //     {
  //       path: 'menu',
  //       name: 'Menu',
  //       component: () => import('@/view/system-manage/ManageMenu.vue'),
  //       meta: {
  //         title: '菜单管理',
  //       },
  //     },
  //     {
  //       path: 'users',
  //       name: 'Users',
  //       component: () => import('@/view/system-manage/ManageUser.vue'),
  //       meta: {
  //         title: '用户管理',
  //       },
  //     },
  //     {
  //       path: 'role',
  //       name: 'Role',
  //       component: () => import('@/view/system-manage/ManageRole.vue'),
  //       meta: {
  //         title: '角色管理',
  //       },
  //     },
  //   ],
  // },
  // {
  //   path: 'about',
  //   name: 'About',
  //   component: () => import('@/view/about/AboutIndex.vue'),
  //   meta: {
  //     title: '关于',
  //     order: 99,
  //   },
  // },
  // {
  //   path: 'externalLink',
  //   name: 'ExternalLink',
  //   component: () => import('@/view/one/One.vue'),
  //   meta: {
  //     title: '外部连接',
  //   },
  // },
  // {
  //   path: 'one',
  //   name: 'One',
  //   component: () => import('@/layout/LayoutOther.vue'),
  //   meta: {
  //     title: '舵机测试',
  //   },
  //   children: [
  //     {
  //       path: 'menu1',
  //       name: 'Menu1',
  //       component: () => import('@/view/system-manage/ManageRole.vue'),
  //       meta: {
  //         title: '耳机目录',
  //       },
  //     },
  //     {
  //       path: 'menu11',
  //       name: 'Menu11',
  //       component: () => import('@/view/one/One.vue'),
  //       meta: {
  //         title: '耳机目录1',
  //       },
  //     },
  //     {
  //       path: 'menu2',
  //       name: 'Menu2',
  //       component: () => import('@/view/one/One.vue'),
  //       meta: {
  //         title: '🎧目录',
  //       },
  //       children: [
  //         {
  //           path: 'menu3',
  //           name: 'Menu3',
  //           component: () => import('@/view/one/One.vue'),
  //           meta: {
  //             title: '三级目录',
  //           },
  //         },
  //         {
  //           path: 'menu4',
  //           name: 'Menu4',
  //           component: () => import('@/view/one/One.vue'),
  //           meta: {
  //             title: '三级目录1',
  //           },
  //         },
  //         {
  //           path: 'menu5',
  //           name: 'Menu5',
  //           component: () => import('@/view/one/One.vue'),
  //           meta: {
  //             title: '外部连接',
  //             externalLink: 'https://baidu.com',
  //           },
  //         },
  //       ],
  //     },
  //   ],
  // },
  // ],
  // },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/view/login/LoginIndex.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/view/404/NotFound.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

let registerRouteFresh = true
router.beforeEach(
  async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    const token = useCache.getCache('token')
    if (token) {
      // 这里判断一下当前是否添加了新路由
      if (registerRouteFresh) {
        // 根据当前用户权限动态添加路由
        await useMenuStore().dynamicAddRoutes(router)
        router.push(to.fullPath)
        registerRouteFresh = false
      }

      // 判断进入的是否是登录页
      if (to.name !== 'Login') {
        next()
      } else {
        ElMessage({
          message: '已登录, 无需重新登录!',
          type: 'success',
          duration: 1500,
        })
        next({ ...from })
      }
    } else {
      if (to.name === 'Login') {
        next()
      } else {
        next('/login')
      }
    }
  }
)

export default router
