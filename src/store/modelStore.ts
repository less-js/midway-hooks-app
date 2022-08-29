import { defineStore } from 'pinia'
import { IModel } from '@/types/model'
import { getAllModels } from '@/apis/model'

type IState = {
  models: IModel[]
  isRefresh: boolean
}

export const useModelStore = defineStore({
  id: 'modelStore',
  state: (): IState => ({
    models: [],
    isRefresh: true,
  }),
  getters: {
    getModels(state): Promise<IModel[]> | IModel[] {
      if (state.models.length === 0 && state.isRefresh) {
        state.isRefresh = false
        return this.fetchModels()
      } else {
        return state.models
      }
    },
  },
  actions: {
    async fetchModels(): Promise<IModel[]> {
      const { data, status } = await getAllModels()
      if (status === 1000) return data
    },
    changeRefresh(isRefresh: boolean): void {
      this.isRefresh = isRefresh
    },
  },
})
