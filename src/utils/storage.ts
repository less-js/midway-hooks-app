export class useCache {
  setCache<T = any>(key: string, value: T): boolean
  setCache<T = any>(key: string, value: T, localOrSessionStorage: boolean): boolean
  /**
   * 设置缓存
   * @param key
   * @param value
   * @param localOrSessionStorage true => localStorage 默认就是 true  如果需要使用 sessionStorage 需要传递该参数 false
   * @returns
   */
  setCache<T = any>(key: string, value: T, localOrSessionStorage = true): boolean {
    try {
      const val = JSON.stringify(value)
      localOrSessionStorage
        ? window.localStorage.setItem(key, val)
        : window.sessionStorage.setItem(key, val)
    } catch (error) {
      return false
    }
    return true
  }

  getCache<T = any>(key: string): T
  getCache<T = any>(key: string, localOrSessionStorage: boolean): T
  /**
   *
   * @param key 获取缓存
   * @param localOrSessionStorage
   * @returns
   */
  getCache<T>(key: string, localOrSessionStorage = true): T {
    let res: any
    if (localOrSessionStorage) {
      const val = window.localStorage.getItem(key)
      if (val) res = JSON.parse(val)
    }
    const val = window.sessionStorage.getItem(key)
    if (val) res = JSON.parse(val)

    return res as T
  }
  /**
   *
   * @param key 删除缓存
   * @param localOrSessionStorage
   * @returns
   */
  removeCache(key: string): void
  removeCache(key: string, localOrSessionStorage: boolean): void
  removeCache(key: string, localOrSessionStorage = true): void {
    localOrSessionStorage
      ? window.localStorage.removeItem(key)
      : window.sessionStorage.removeItem(key)
  }
  /**
   *
   * @param key 清空缓存
   * @param localOrSessionStorage
   * @returns
   */
  clearCache(): void
  clearCache(localOrSessionStorage: boolean): void
  clearCache(localOrSessionStorage = true): void {
    localOrSessionStorage ? window.localStorage.clear() : window.sessionStorage.clear()
  }
}

// 缓存对象
export default new useCache()
