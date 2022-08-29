import { createApp } from 'vue'
import App from './App.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import store from './store'
import router from './router'
import 'element-plus/dist/index.css' // 自动导入 element-plus 时 css 引用报错，这里手动导入 css
import '@/style/index.scss'
// 导入组件
import LaComponents, { componentPool } from '@/components/index'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app
  .use(LaComponents, {
    components: componentPool,
  })
  .use(store)
  .use(router)
  .mount('#app')
