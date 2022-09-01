import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'maz-ui/css/main.css'
import './theme.css'
import { createPinia } from 'pinia'
createApp(App).use(createPinia()).use(router).mount('#app')
