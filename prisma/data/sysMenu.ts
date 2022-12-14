import { Prisma } from '@prisma/client'

export const sysMenuData: Prisma.SysMenuCreateInput[] = [
  {
    name: '仪表盘',
    routeName: 'Dashboard',
    routePath: 'dashboard',
    component: 'view/dashboard/DashboardIndex.vue',
    redirect: '',
    icon: 'HomeFilled',
    parentId: 0,
    isAuth: true,
    isCache: false,
    hidden: false,
    externalLink: '',
    order: 0,
    status: true,
  },
  {
    name: '系统管理',
    routeName: 'Manage',
    routePath: 'manage',
    component: 'layout/LayoutOther.vue',
    redirect: '',
    icon: 'Management',
    parentId: 0,
    isAuth: true,
    isCache: false,
    hidden: false,
    externalLink: '',
    order: 1,
    status: true,
  },
  {
    name: '菜单管理',
    routeName: 'Menu',
    routePath: 'menu',
    component: 'view/system/menu/MenuIndex.vue',
    redirect: '',
    icon: 'Menu',
    parentId: 2,
    isAuth: true,
    isCache: false,
    hidden: false,
    externalLink: '',
    order: 0,
    status: true,
  },
  {
    name: '角色管理',
    routeName: 'Role',
    routePath: 'role',
    component: 'view/system/role/RoleIndex.vue',
    redirect: '',
    icon: 'UserFilled',
    parentId: 2,
    isAuth: true,
    isCache: false,
    hidden: false,
    externalLink: '',
    order: 1,
    status: true,
  },
  {
    name: '部门管理',
    routeName: 'Department',
    routePath: 'department',
    component: 'view/system/department/DepartmentIndex.vue',
    redirect: '',
    icon: 'Stamp',
    parentId: 2,
    isAuth: true,
    isCache: false,
    hidden: false,
    externalLink: '',
    order: 2,
    status: true,
  },
  {
    name: '用户管理',
    routeName: 'Users',
    routePath: 'users',
    component: 'view/system/user/UserIndex.vue',
    redirect: '',
    icon: 'User',
    parentId: 2,
    isAuth: true,
    isCache: false,
    hidden: false,
    externalLink: '',
    order: 3,
    status: true,
  },
  {
    name: '枚举字典',
    routeName: 'Dictionaries',
    routePath: 'dictionaries',
    component: 'view/system/dictionaries/DictionariesIndex.vue',
    redirect: '',
    icon: 'Operation',
    parentId: 2,
    isAuth: true,
    isCache: false,
    hidden: false,
    externalLink: '',
    order: 4,
    status: true,
  },
  {
    name: '内容模型',
    routeName: 'Model',
    routePath: 'model',
    component: 'view/system/model/ModelIndex.vue',
    redirect: '',
    icon: 'ElementPlus',
    parentId: 2,
    isAuth: true,
    isCache: false,
    hidden: false,
    externalLink: '',
    order: 5,
    status: true,
  },
  {
    name: '内容管理',
    routeName: 'Content',
    routePath: 'content',
    component: 'layout/LayoutOther.vue',
    redirect: '',
    icon: 'Grid',
    parentId: 0,
    isAuth: true,
    isCache: false,
    hidden: false,
    externalLink: '',
    order: 4,
    status: true,
  },
  {
    name: '栏目分类',
    routeName: 'Category',
    routePath: 'category',
    component: 'view/content/category/CategoryIndex.vue',
    redirect: '',
    icon: 'List',
    parentId: 9,
    isAuth: true,
    isCache: false,
    hidden: false,
    externalLink: '',
    order: 5,
    status: true,
  },
  {
    name: '文章管理',
    routeName: 'Article',
    routePath: 'article',
    component: 'view/content/article/ArticleIndex.vue',
    redirect: '',
    icon: 'Document',
    parentId: 9,
    isAuth: true,
    isCache: false,
    hidden: false,
    externalLink: '',
    order: 6,
    status: true,
  },
  {
    name: '关于',
    routeName: 'About',
    routePath: 'about',
    component: 'view/about/AboutIndex.vue',
    redirect: '',
    icon: 'InfoFilled',
    parentId: 0,
    isAuth: true,
    isCache: false,
    hidden: false,
    externalLink: '',
    order: 999,
    status: true,
  },
  {
    name: '个人信息',
    routeName: 'Person',
    routePath: 'person',
    component: 'view/person/PersonIndex.vue',
    redirect: '',
    icon: 'Avatar',
    parentId: 0,
    isAuth: true,
    isCache: false,
    hidden: true,
    externalLink: '',
    order: 99,
    status: true,
  },
]

export const sysMenuItem = (item) => ({
  name: item.name,
  routePath: item.routePath,
  routeName: item.routeName,
  component: item.component,
  redirect: item.redirect,
  icon: item.icon,
  parentId: item.parentId,
  isAuth: item.isAuth,
  isCache: item.isCache,
  hidden: item.hidden,
  externalLink: item.externalLink,
  order: item.order,
  status: item.status,
})
