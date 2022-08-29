import { defineStore } from 'pinia'
import { Router } from 'vue-router'
import { orderBy } from '@/utils/common'
import useCache from '@/utils/storage'
import { getPermissionMenus } from '@/apis/menu'
import { IMenu } from '@/types/menu'

export const useMenuStore = defineStore({
  id: 'menuStore',
  state: () => ({
    menuList: [],
  }),
  getters: {
    getMenuList(state) {
      return state.menuList.length > 0 ? state.menuList : useCache.getCache('menuList')
    },
  },
  actions: {
    async fetchPermissionMenus() {
      const { data, status } = await getPermissionMenus()
      if (status === 1000) {
        const list = data.filter((item) => item.status)
        this.setMenulist(list)
      }
    },
    setMenulist(payload: IMenu[]): void {
      this.menuList = payload
      useCache.setCache('menuList', payload)
    },
    list2Routes(data: IMenu[], id = 0): IMenu[] {
      const tree: IMenu[] = []
      let temp
      let newItem
      data.forEach((item) => {
        newItem = {
          path: item.routePath,
          name: item.routeName,
          component: () => import(`../${item.component}`),
          meta: {
            id: item.id,
            parentId: item.parentId,
            title: item.name,
            externalLink: item.externalLink,
            hidden: item.hidden,
            icon: item.icon,
            isAuth: item.isAuth,
            isCache: item.isCache,
            order: item.order,
            status: item.status,
          },
        }
        if (newItem.meta.parentId === id) {
          temp = this.list2Routes(data, newItem.meta.id)
          if (temp.length > 0) {
            newItem.children = temp
          }
          tree.push(newItem)
        }
      })
      return tree
    },
    dynamicAddRoutes(router: Router): void {
      if (!this.getMenuList) return
      const routes = this.list2Routes(orderBy(this.getMenuList))
      router.addRoute({
        path: '/',
        name: 'Home',
        redirect: '/dashboard',
        component: () => import('@/layout/LayoutDefault.vue'),
        meta: {
          title: '首页',
        },
        children: [...routes],
      })
    },
    clearMenuList(): void {
      this.menuList = []
      useCache.removeCache('menuList')
    },
  },
})
