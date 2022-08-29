import { Prisma } from '@prisma/client'

export const sysDictionariesData: Prisma.SysDictionariesCreateInput[] = [
  {
    name: '模型内容字段',
    aliasName: 'modelFieldTypes',
    status: true,
    remark: '系统内置，请勿随意删除！',
    enumElementType: 'string',
    enumElements: [
      { label: '单行文本', value: 'String', remark: 'EditPen', isEnable: true },
      { label: '多行文本', value: 'MultiLineString', remark: 'Document', isEnable: true },
      { label: '数字', value: 'Number', remark: 'Plus', isEnable: true },
      { label: '布尔值', value: 'Boolean', remark: 'Check', isEnable: true },
      { label: '枚举', value: 'Enum', remark: 'Operation', isEnable: true },
      { label: '关联', value: 'Connect', remark: 'TopRight', isEnable: true },
      { label: '数组', value: 'Array', remark: 'Coin', isEnable: true },
      { label: '时间日期', value: 'DateTime', remark: 'Calendar', isEnable: true },
      { label: '文件', value: 'File', remark: 'Files', isEnable: true },
      { label: '图片', value: 'Image', remark: 'Picture', isEnable: true },
      { label: '多媒体', value: 'Media', remark: 'Film', isEnable: true },
      { label: '邮箱地址', value: 'Email', remark: 'Message', isEnable: true },
      { label: '电话号码', value: 'Tel', remark: 'Phone', isEnable: true },
      { label: '网址', value: 'Url', remark: 'Link', isEnable: true },
      { label: '富文本', value: 'RichText', remark: 'Notebook', isEnable: true },
      { label: 'MarkDown', value: 'MarkDown', remark: 'Download', isEnable: true },
      { label: 'JSON 对象', value: 'Json', remark: 'More', isEnable: true },
    ],
  },
]
