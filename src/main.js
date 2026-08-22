import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'

import App from './App.vue'
import router from './router'
import BaseInput from './components/practices/component/BaseInput.vue'
import { useThemeStore } from './stores/themeStore.js'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus)
app.component('BaseInput', BaseInput)

useThemeStore().start()

app.mount('#app')
