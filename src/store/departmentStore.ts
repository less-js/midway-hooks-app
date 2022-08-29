import { defineStore } from 'pinia'
import { IDepartment } from '@/types/department'
import { getAllDepartments } from '@/apis/department'

type IState = {
  departments: IDepartment[]
  isRefresh: boolean
}

export const useDepartmentStore = defineStore({
  id: 'departmentStore',
  state: (): IState => ({
    departments: [],
    isRefresh: true,
  }),
  getters: {
    getDepartments(state): Promise<IDepartment[]> | IDepartment[] {
      if (state.departments.length === 0 && state.isRefresh) {
        state.isRefresh = false
        return this.fetchDepartments()
      } else {
        return state.departments
      }
    },
  },
  actions: {
    async fetchDepartments(): Promise<IDepartment[]> {
      const { data, status } = await getAllDepartments()
      if (status === 1000) return data
    },
    changeRefresh(isRefresh: boolean): void {
      this.isRefresh = isRefresh
    },
  },
})
