
<template>
  <Btn_NavBar></Btn_NavBar>

  <RouterView />

  <Btn_Footer></Btn_Footer>
</template>
<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Btn_NavBar from '@/components/NavBar.vue'
import Btn_Footer from '@/components/Footer.vue'
</script>
