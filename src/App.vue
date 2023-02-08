
<template>
  <div v-if="$route.meta.keepAlive">
    <Btn_NavBar></Btn_NavBar>
    <RouterView />
    <Btn_Footer></Btn_Footer>
  </div>
  <RouterView v-if="!$route.meta.keepAlive" />

</template>
<script setup>
import { RouterView } from 'vue-router'
import Btn_NavBar from '@/components/NavBar.vue'
import Btn_Footer from '@/components/Footer.vue'
import { watch } from "vue";
import { useI18n } from "vue-i18n";


const { t, locale } = useI18n();

watch(locale, (newlocale) => {
  localStorage.setItem("locale", newlocale);
});
</script>



