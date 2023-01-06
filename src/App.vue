
<template>
  <div v-if="$route.meta.keepAlive">
    <Btn_NavBar></Btn_NavBar>

    <RouterView />

    <Btn_Footer></Btn_Footer>
  </div>
  <RouterView v-if="!$route.meta.keepAlive" />

</template>
<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Btn_NavBar from '@/components/NavBar.vue'
import Btn_Footer from '@/components/Footer.vue'
import { watch } from "vue";
import { useI18n } from "vue-i18n";
import axios from 'axios';
import { onMounted } from 'vue';


const { t, locale } = useI18n();

watch(locale, (newlocale) => {
  localStorage.setItem("locale", newlocale);
});


onMounted(() => {
  const api = `${import.meta.env.VITE_APP_API}API_App/SystemSetting/TermsLink`
  axios.post(api, {
    u_id: $cookies.get("u_id"),
    AuthCode: '0',
    Lang: $cookies.get("Lang"),
  }).then((res) => {
  }).catch((error) => console.log(error));
})


</script>



