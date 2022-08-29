export interface IMenu {
  id?: string
  name?: string
  routePath?: string
  routeName?: string
  component?: string
  icon?: string
  parentId?: number
  isAuth?: boolean
  isCache?: boolean | string
  hidden?: boolean | string
  externalLink?: string
  order?: number
  status?: boolean | string
  departments?: any[]
  roles?: any[]
  department?: string
  role?: string
  children?: IMenu[]
}
