export interface IDepartment {
  id?: number
  name?: string
  parentId?: number
  order?: number
  createdAt?: string | Date
  updatedAt?: string | Date
  children?: IDepartment[]
}
