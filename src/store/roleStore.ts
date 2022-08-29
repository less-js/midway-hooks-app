import { defineStore } from 'pinia'
import { IRole } from '@/types/role'
import { getAllRoles } from '@/apis/role'

type IState = {
  roles: IRole[]
  isRefresh: boolean
}

export const useRoleStore = defineStore({
  id: 'roleStore',
  state: (): IState => ({
    roles: [],
    isRefresh: true,
  }),
  getters: {
    getRoles(state): Promise<IRole[]> | IRole[] {
      if (state.roles.length === 0 && state.isRefresh) {
        state.isRefresh = false
        return this.fetchRoles()
      } else {
        return state.roles
      }
    },
  },
  actions: {
    async fetchRoles(): Promise<IRole[]> {
      const { data, status } = await getAllRoles()
      if (status === 1000) return data
    },
    changeRefresh(isRefresh: boolean): void {
      this.isRefresh = isRefresh
    },
  },
})
