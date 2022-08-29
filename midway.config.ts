import vue from '@vitejs/plugin-vue'
import { defineConfig } from '@midwayjs/hooks-kit'
import * as path from 'path'
// element-plus 按需自动引入
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  source: './src/admin',
  routes: [
    {
      // 系统后台使用接口
      baseDir: 'controller/sys',
      basePath: '/sys',
    },
    {
      // 公开 API，可用于小程序或网站前端接口使用
      baseDir: 'controller/open',
      basePath: '/api',
    },
  ],
  vite: {
    base: './', // index.html文件所在位置
    root: './', // js导入的资源路径，src
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    plugins: [
      vue(),
      // element-plus 按需自动引入, 自动导入时 css 引用报错，所有添加参数 { importStyle: false }
      AutoImport({
        resolvers: [ElementPlusResolver({ importStyle: false })],
      }),
      Components({
        resolvers: [ElementPlusResolver({ importStyle: false })],
      }),
    ],
  },
})
