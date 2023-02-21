<template>
    <div class="page_main">
        <main>
            <div class="page_content">
                <div class="CourseContentBox">
                    <div class="PagesTitle">{{ $t('Serve1') }}</div>
                    <iframe frameborder="0" style="width: 100%; height:600px;" :src="url">
                    </iframe>
                </div>
            </div>
        </main>
    </div>
</template>


<script setup>
import { onMounted, ref } from 'vue';
import { apiTermsLink } from '../utils/api';
const url = ref("")

onMounted(() => {
    apiTermsLink({
        u_id: "",
        AuthCode: "",
        Lang: $cookies.get("Lang")
    })
        .then((res) => {
            url.value = res.data.UserLink
        })
        .catch((err) => {
            console.log(err)
        })
})

</script>
