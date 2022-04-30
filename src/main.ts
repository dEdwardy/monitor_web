import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import { i18n } from '@/i18n'
import { createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persistedstate'
import 'normalize.css'
const app = createApp(App)
const store = createPinia()
store.use(piniaPluginPersist)

app.use(router).use(store).use(i18n).mount('#app')
