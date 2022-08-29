import { defineStore } from 'pinia'
import useCache from '@/utils/storage'

const HOME_PAGE = {
  meta: {
    title: '仪表盘',
  },
  path: '/dashboard',
  name: 'Dashboard',
  params: {},
  query: {},
}

export const useNavTabsStore = defineStore({
  id: 'navStore',
  state: () => ({
    navigators: useCache.getCache('navTabs') || [HOME_PAGE],
  }),
  getters: {},
  actions: {
    setStorage(): void {
      useCache.setCache('navTabs', this.navigators)
    },
    editNavigator(row) {
      this.navigators.forEach((item) => {
        if (item.meta.id === row.id) {
          item.name = row.name
          item.path = '/' + row.routePath
          item.meta.externalLink = row.externalLink
          item.meta.hidden = row.hidden
          item.meta.icon = row.icon
          item.meta.id = row.id
          item.meta.isAuth = row.isAuth
          item.meta.isCache = row.isCache
          item.meta.order = row.order
          item.meta.parentId = row.parentId
          item.meta.status = row.status
          item.meta.title = row.name
        }
      })
      this.setStorage()
    },
    addNavTabs(r): void {
      const isExist = this.navigators.some((item) => item.meta.id === r.meta.id)
      if (!isExist && r.name !== 'Login' && r.name !== 'Dashboard') {
        this.navigators.push({
          meta: r.meta,
          path: r.path,
          name: r.name,
          params: r.params,
          query: r.query,
        })
        this.setStorage()
      }
    },
    closeNavTab(idx?: number, location?: string): void {
      switch (location) {
        case 'left':
          this.navigators = this.navigators.filter((item, i) => i === 0 || i >= idx)
          break
        case 'right':
          this.navigators.splice(idx + 1)
          break
        case 'other':
          this.navigators = this.navigators.filter((item, i) => i === 0 || i === idx)
          break
        case 'all':
          this.navigators.splice(1)
          break
        default:
          this.navigators.splice(idx, 1)
          break
      }
      this.setStorage()
    },
    clearNav(): void {
      useCache.removeCache('navTabs')
      this.navigators = [HOME_PAGE]
    },
  },
})
