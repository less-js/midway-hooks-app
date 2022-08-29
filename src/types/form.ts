export interface IFromRow {
  component?: string
  prop?: string
  label?: string
  buttons?: { value: string; type: string; prop: string }[]
  size?: 'large' | 'default' | 'small'
  placeholder?: string
  disabled?: boolean
  clearable?: boolean
  name?: string
  id?: string
  readonly?: boolean
  slotName?: string
}

export interface IButton extends IFromRow {
  type?: string
  plain?: boolean
  round?: boolean
  circle?: boolean
  loading?: boolean
  loadingIcon?: string
  icon?: string
  autofocus?: boolean
  nativeType?: 'button' | 'submit' | 'reset'
  autoInsertSpace?: boolean
  value?: string
  onClick?: (data) => void
}

export interface IInput extends IFromRow {
  width?: string | number
  type?: string
  maxlength?: string | number
  minlength?: number
  showWordLimit?: boolean
  showPassword?: boolean
  prefixIcon?: string
  suffixIcon?: string
  rows?: number
  autosize?: boolean | object
  autocomplete?: string
  max?: string | number | Date
  min?: string | number | Date
  step?: string | number
  resize?: 'none' | 'both' | 'horizontal' | 'vertical'
  autofocus?: boolean
  form?: string
  tabindex?: string | number
  validateEvent?: boolean
  inputStyle?: object
}

export interface IInputNumber extends IFromRow {
  width?: string | number
  min?: number
  max?: number
  step?: number
  stepStrictly?: boolean
  precision?: number
  controls?: boolean
  controlsPosition?: string
}

export interface ICascaderOption {
  value?: string
  label?: string
  children?: ICascaderOption[]
}
interface lazyLoad {
  (node, resolve): void
}
export interface ICascaderProps {
  expandTrigger?: string
  multiple?: boolean
  checkStrictly?: boolean
  emitPath?: boolean
  lazy?: boolean
  lazyLoad?: lazyLoad
  value?: string
  label?: string
  children?: string
  disabled?: boolean
  leaf?: string
}
interface FilterMethod {
  (node: string, keyword: string): boolean
}
interface beforeFilter {
  (value: any): any
}
export interface ICascader extends IFromRow {
  options?: ICascaderOption[]
  props?: ICascaderProps
  showAllLevels?: boolean
  collapseTags?: boolean
  collapseTagsTooltip?: boolean
  separator?: string
  filterable?: boolean
  filterMethod?: FilterMethod
  debounce?: number
  beforeFilter?: beforeFilter
  popperClass?: string
  teleported?: boolean
  tagType?: 'success' | 'info' | 'warning' | 'danger'
}
export interface IOptions {
  value?: string | number | boolean
  label?: string | number | boolean
}
export interface IRadio extends IFromRow {
  options?: IOptions[]
  border?: boolean
  button?: boolean
  textColor?: string
  fill?: string
}

export interface ICheckBox extends IRadio, IFromRow {
  checked?: boolean
  indeterminate?: boolean
  min?: number
  max?: number
  groupSize?: 'large' | 'default' | 'small'
}

export interface ISelect extends IFromRow {
  options?: IOptions[]
  collapseTags?: boolean
  collapseTagsTooltip?: boolean
  multiple?: boolean
  valueKey?: string
  multipleLimit?: number
  effect?: 'dark' | 'light'
  autocomplete?: string
  filterable?: boolean
  allowCreate?: boolean
  filterMethod?: () => void
  remote?: boolean
  remoteMethod?: () => void
  loading?: boolean
  loadingText?: string
  noMatchText?: string
  noDataText?: string
  popperClass?: string
  reserveKeyword?: boolean
  defaultFirstOption?: boolean
  popperAppendToBody?: boolean
  teleported?: boolean
  persistent?: boolean
  automaticDropdown?: boolean
  clearIcon?: string
  fitInputWidth?: boolean
  suffixIcon?: string
  tagType?: 'success' | 'info' | 'warning' | 'danger'
}

export interface ITreeSelect extends ISelect, IFromRow {
  emptyText?: string
  highlightCurrent?: boolean
  expandOnClickNode?: boolean
  checkOnClickNode?: boolean
  autoExpandParent?: boolean
  defaultExpandedKeys?: []
  showCheckbox?: boolean
  checkStrictly?: boolean
  defaultCheckedKeys?: []
  currentNodeKey?: string | number
  accordion?: boolean
  lazy?: boolean
  draggable?: boolean
  allowDrag?: boolean
  allowDrop?: boolean
  indent?: number
  icon?: string
  filterNodeMethod?: (value, data, node) => boolean
}

export interface ISwitch extends IFromRow {
  loading?: boolean
  width?: number | string
  inlinePrompt?: boolean
  activeIcon?: string
  inactiveIcon?: string
  activeText?: string
  inactiveText?: string
  activeValue?: string | boolean | number
  inactiveValue?: string | boolean | number
  activeColor?: string
  inactiveColor?: string
  borderColor?: string
  validateEvent?: boolean
  beforeChange?: () => void
  onChange?: (data) => void
}

export interface IRate extends IFromRow {
  allowHalf?: boolean
  lowThreshold?: number
  highThreshold?: number
  colors?: object | []
  voidColor?: string
  disabledVoidColor?: string
  icons?: [] | object
  voidIcon?: string
  disabledVoidIcon?: string
  showText?: boolean
  showScore?: boolean
  textColor?: string
  texts?: []
  scoreTemplate?: string
}

export interface ISlider extends IFromRow {
  min?: number
  max?: number
  step?: number
  showInput?: boolean
  showInputControls?: boolean
  inputSize?: 'large' | 'default' | 'small'
  showStops?: boolean
  showTooltip?: boolean
  formatTooltip?: (value) => void
  range?: boolean
  vertical?: boolean
  height?: string
  debounce?: number
  tooltipClass?: string
  marks?: object
}

export interface IColorPicker extends IFromRow {
  showAlpha?: boolean
  colorFormat?: 'hsl' | 'hsv' | 'hex' | 'rgb'
  popperClass?: string
  predefine?: []
}

export interface ITransferOption {
  key: number
  label: string
  disabled?: boolean
}
export interface ITransfer extends IFromRow {
  data?: ITransferOption[]
  props?: ITransferOption
  titles?: string
  buttonTexts?: string
  filterable?: boolean
  filterPlaceholder?: boolean
  filterMethod?: () => void
  targetOrder?: 'original' | 'push' | 'unshift'
  renderContent?: (h, option) => void
  format?: object
  leftDefaultChecked?: []
  rightDefaultChecked?: []
}

export interface IUpload extends IFromRow {
  slots?: string
  uploadText?: string
  uploadSelectText?: string
  dragText?: string
  tips?: string
  action?: string
  headers?: Headers | Record<string, any>
  method?: string
  data?: Record<string, any>
  accept?: string
  withCredentials?: boolean
  drag?: boolean
  multiple?: boolean
  limit?: number
  showFileList?: boolean
  onPreview?: (uploadFile) => void
  onRemove?: (uploadFile, uploadFiles) => void
  beforeRemove?: (uploadFile, uploadFiles) => boolean
  onExceed?: (files: File[], uploadFiles) => void
  onSuccess?: (response: any, uploadFile, uploadFiles) => void
  onError?: (error: Error, uploadFile, uploadFiles) => void
  onProgress?: (evt, uploadFile, uploadFiles) => void
  onChange?: (uploadFile, uploadFiles) => void
  beforeUpload?: (rawFile) => void | undefined | null | boolean | File | Blob
  httpRequest?: (options) => XMLHttpRequest
  listType?: 'text' | 'picture' | 'picture-card'
  autoUpload?: boolean
}

export interface IDate {
  startPlaceholder?: string
  endPlaceholder?: string
  popperClass?: string
  rangeSeparator?: string
  format?: string
  defaultValue?: Date
  prefixIcon?: string
  clearIcon?: string
  editable?: boolean
}
export interface IDatePicker extends IDate, IFromRow {
  disabledDate?: () => void
  shortcuts?: object
  editable?: boolean
  type?:
    | 'year'
    | 'month'
    | 'date'
    | 'dates'
    | 'datetime'
    | ' week'
    | 'datetimerange'
    | 'daterange'
    | ' monthrange'
  defaultTime?: Date[]
  valueFormat?: string
  unlinkPanels?: boolean
  validateEvent?: boolean
}
export interface ITimePicker extends IDate, IFromRow {
  isRange?: boolean
  arrowControl?: boolean
  align?: 'left' | 'center' | 'right'
  disabledHours?: () => void
  disabledMinutes?: (selectedHour) => void
  disabledSeconds?: (selectedHour, selectedMinute) => void
}
export interface ITimeSelect extends IDate, IFromRow {
  start?: string
  end?: string
  step?: string
  effect?: 'dark' | 'light'
  minTime?: string
  maxTime?: string
}
