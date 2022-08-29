export interface IFieldType {
  icon: string
  value: string
  label: string
}

export interface IField {
  id?: number
  displayName?: string
  name?: string
  type?: string
  description?: string
  defaultValue?: string | number | boolean
  min?: number
  max?: number
  isRequired?: boolean
  isHidden?: boolean
  isOrderField?: boolean
  orderDirection?: /*  { value: number; label: string } |  */ string
  enum?: string
  enumElementType?: string
  enumElements?: number
  connectResource?: string
  connectField?: string
  connectMany?: boolean
  resourceLinkType?: string
  isMultiple?: boolean
  isSystem?: boolean
}

export interface IModel {
  id?: number
  name?: string
  collectionName?: string
  description?: string
  fields?: IField[]
}
