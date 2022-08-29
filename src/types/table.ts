export interface IOptions {
  type: '' | 'default' | 'info' | 'primary' | 'danger' | 'text' | 'success' | 'warning'
  icon: string
  name?: string
  method?: Function
}

export interface IProps {
  activeText?: string | number
  inActiveText?: string | number
  disabled?: boolean
  width?: number
  height?: number
  size?: 'large' | 'default' | 'small' | string | number
  options?: {
    value: string
    label: string
  }[]
  multiple?: boolean
  fit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale'
  // type?: 'success' | 'info' | 'warning' | 'danger'
}

export interface IColumns {
  prop?: string
  label?: string
  type?: string
  sortable?: boolean
  width?: string
  minWidth?: string
  align?: string
  headAlign?: string
  fixed?: string
  className?: string
  slots?: string
  options?: IOptions[]
  props?: IProps
  children?: IColumns[]
}

export interface IPage {
  total?: number
  currentPage?: number
  pageSize?: number
}
