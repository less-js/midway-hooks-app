import { computed } from 'vue'

const useTitle = (id, editTitle = '', addTitle = '') =>
  computed(() => (id ? `编辑${editTitle}` : `添加${addTitle}`)).value

export default useTitle
