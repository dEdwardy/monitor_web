import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import { i18n } from '@/i18n'
import { createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persistedstate'
import { install } from '@/plugins/ecahrts'
import 'normalize.css'
import 'element-plus/theme-chalk/el-message.css'

import 'highlight.js/styles/atom-one-dark.css'
import 'highlight.js/lib/common'
import hljsVuePlugin from '@highlightjs/vue-plugin'
import highlight from '@/directives/highlight'

const app = createApp(App)
const store = createPinia()
store.use(piniaPluginPersist)
console.error(app.config.globalProperties)
// app.config.globalProperties.$ELEMENT = { size: 'default' }

install(app)
app.use(hljsVuePlugin)
app.directive('highlight', highlight)
app.use(router).use(store).use(i18n).mount('#app')
