import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import BaseInput from './components/practices/component/BaseInput.vue'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.component('BaseInput', BaseInput)

app.mount('#app')
