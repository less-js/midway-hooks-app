import { Prisma } from '@prisma/client'

export const sysUserData: Prisma.SysUserCreateInput[] = [
  {
    username: 'admin',
    nickname: 'xxy',
    password: '$2b$10$La3gnzue6GKv0c3XMcZoyu.WKApl6uOouoVlSiYjnynB1GSeuaTTW',
    email: '11@qq.com',
    avatar: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
  },
  {
    username: 'edit',
    nickname: '编辑',
    password: '$2b$10$La3gnzue6GKv0c3XMcZoyu.WKApl6uOouoVlSiYjnynB1GSeuaTTW',
    email: '22@qq.com',
    avatar: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
  },
  {
    username: 'test',
    nickname: '测试',
    password: '$2b$10$La3gnzue6GKv0c3XMcZoyu.WKApl6uOouoVlSiYjnynB1GSeuaTTW',
    email: '33@qq.com',
    avatar: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
  },
]
