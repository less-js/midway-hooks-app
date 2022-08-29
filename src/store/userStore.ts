import { defineStore } from 'pinia'
import { IUserInfo } from '@/types/user'
import useCache from '@/utils/storage'

export const useUserStore = defineStore({
  id: 'userStore',
  state: () => ({
    token: '',
    userInfo: <IUserInfo>{},
  }),
  getters: {
    getUserInfo(state): IUserInfo {
      return Object.keys(state.userInfo).length > 0 ? state.userInfo : useCache.getCache('userInfo')
    },
  },
  actions: {
    setUserInfo(token: string, user: IUserInfo): void {
      this.token = token
      this.userInfo = user
      useCache.setCache('token', token)
      useCache.setCache('userInfo', user)
    },
    clearUserInfo(): void {
      this.token = ''
      this.userInfo = {}
      useCache.removeCache('token')
      useCache.removeCache('userInfo')
    },
  },
})
