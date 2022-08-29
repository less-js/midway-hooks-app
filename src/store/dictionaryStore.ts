import { defineStore } from 'pinia'
import { IDictionary } from '@/types/dictionary'
import { getAllDictionaries } from '@/apis/dictionary'

type IState = {
  dictionaries: IDictionary[]
  isRefresh: boolean
}

export const useDictionaryStore = defineStore({
  id: 'dictionaryStore',
  state: (): IState => ({
    dictionaries: [],
    isRefresh: true,
  }),
  getters: {
    getDictionaries(state): Promise<IDictionary[]> | IDictionary[] {
      if (state.dictionaries.length === 0 && state.isRefresh) {
        state.isRefresh = false
        return this.fetchDictionaries()
      } else {
        return state.dictionaries
      }
    },
  },
  actions: {
    async fetchDictionaries(): Promise<IDictionary[]> {
      const { data, status } = await getAllDictionaries()
      if (status === 1000) return data
    },
    changeRefresh(isRefresh: boolean): void {
      this.isRefresh = isRefresh
    },
  },
})
