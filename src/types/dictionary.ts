export interface IEnumElement {
  isEnable?: boolean
  label?: string
  value?: string | number
  remark?: string
}

export interface IDictionary {
  id?: number
  name?: string
  aliasName?: string
  status?: boolean
  remark?: string
  enumElementType?: string
  enumElements?: IEnumElement[]
  statusText?: string
  enumElementTypeText?: string
  createdAt?: string | Date
  updatedAt?: string | Date
}
