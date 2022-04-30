import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import { createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persistedstate'
import 'normalize.css'
const app = createApp(App)
const store = createPinia()
store.use(piniaPluginPersist)

app.use(router).use(store).mount('#app')
