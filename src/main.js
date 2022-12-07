import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'


import './assets/scss/master.scss'
import './assets/scss/main.sass'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
