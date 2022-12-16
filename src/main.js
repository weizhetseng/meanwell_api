import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import axios from 'axios'
import VueAxios from 'vue-axios'
import VueCookies from 'vue-cookies';
import vSelect from "vue-select";

import './assets/scss/master.scss'
import './assets/scss/main.sass'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueAxios, axios)
app.component("v-select", vSelect);

app.mount('#app')

app.config.globalProperties.$cookies = VueCookies
