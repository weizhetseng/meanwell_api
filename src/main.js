import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import zh_TW from './languages/zh-TW.json'
import en_US from './languages/en-US.json'
import zh_CN from './languages/zh-CN.json'
import vue3GoogleLogin from 'vue3-google-login'


// 匯入 vee-validate 主套件
import { Field, Form, ErrorMessage, defineRule, configure } from 'vee-validate';
// 匯入 vee-validate 相關規則
import { required, email, min, regex, confirmed } from '@vee-validate/rules';
// 匯入多國語系的功能
import { localize, setLocale } from '@vee-validate/i18n';
// 匯入繁體中文語系檔案
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json';
// 匯入簡體中文語系檔案
import zhCN from '@vee-validate/i18n/dist/locale/zh_CN.json';

import App from './App.vue'
import router from './router'

import axios from 'axios'
import VueAxios from 'vue-axios'
import VueCookies from 'vue-cookies';

import './assets/scss/master.scss'
import './assets/scss/main.sass'

// 定義驗證規則

defineRule('required', required);

defineRule('email', email);

defineRule('min', min);

defineRule('regex', regex);

defineRule('confirmed', confirmed);
// 設定 vee-validate 全域規則

configure({

    generateMessage: localize({ zh_TW: zhTW, zh_CN: zhCN }), // 載入繁體中文語系

    validateOnInput: true, // 當輸入任何內容直接進行驗證

});

//抓取網頁語系
const lang = navigator.language


if (lang !== "zh-TW" && lang !== "zh-CN" && lang !== "en-US" && !$cookies.isKey("CLang")) {
    $cookies.set("Lang", "en", 0);
    $cookies.set("DLang", "en-US", 0);
} else {
    if (lang === "zh-TW" && !$cookies.isKey("CLang")) {
        $cookies.set("Lang", "tw", 0);
        $cookies.set("DLang", "zh-TW", 0);
    } else if (lang === "zh-CN" && !$cookies.isKey("CLang")) {
        $cookies.set("Lang", "cn", 0);
        $cookies.set("DLang", "zh-CN", 0);
    } else if (lang === "en-US" && !$cookies.isKey("CLang")) {
        $cookies.set("Lang", "en", 0);
        $cookies.set("DLang", "en-US", 0);
    }
}

switch ($cookies.get("Lang")) {
    case "tw":
        setLocale('zh_TW');
        break;
    case "en":
        setLocale('en_US');
        break;
    case "cn":
        setLocale('zh_CN');
        break;
    default:
        setLocale('zh_TW');
        break;
}

const i18n = createI18n({
    legacy: false,
    locale: $cookies.get("CLang") ?? $cookies.get("DLang"),
    fallbackLocale: 'zh-TW',
    globalInjection: true,
    messages: {
        'zh-TW': zh_TW,
        'zh-CN': zh_CN,
        'en-US': en_US
    }
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueAxios, axios)
// 註冊 vee-validate 三個全域元件

app.component('Form', Form);

app.component('Field', Field);

app.component('ErrorMessage', ErrorMessage);


app.use(i18n)



app.use(vue3GoogleLogin, {
    clientId: `${import.meta.env.VITE_Client_Id_Google}`
})


app.mount('#app')

app.config.globalProperties.$cookies = VueCookies