<template>
    <div class="page_course_main">
        <main>
            <div class="page_content avt">
                <div class="PageBreadCrumbs">
                    <ul>
                        <li>{{ $t('IndexText') }}</li>
                        <li>></li>
                        <li>{{ $t('ActivityText') }}</li>
                        <li>></li>
                        <li>{{ showData[0].ActSubject }}</li>
                    </ul>
                </div>
                <div class="BannerBar">
                    <div class="banner_content"><img src="../assets/img/102766030_m.jpg" alt=""></div>
                </div>
                <div class="CourseContentBox mobileSS">
                    <div class="activitiesTitle">{{ showData[0].ActSubject }}</div>
                    <div class="Coursebuttoon" v-if="showData[0].IsOpenSignUp && !showData[0].IsSignUp">
                        <button class="CoursebuttoonSet" @click="isMember()">
                            {{ $t('GoSignUp') }}
                        </button>
                    </div>
                    <div class="itemTitle">
                        <div class="itemTitleLine"></div>
                        <div class="itemTitletext">{{ $t('ActivityIntro') }}</div>
                    </div>
                    <div class="CourseIntroduction">
                        {{ showData[0].ActDes }}
                    </div>
                    <div class="itemTitle">
                        <div class="itemTitleLine"></div>
                        <div class="itemTitletext">{{ $t('ActivityTime') }}</div>
                    </div>
                    <div class="CourseIntroduction">
                        <div class="CourseIntroduction_item">{{ showData[0].ActSDateTime }}</div>
                    </div>
                    <div class="itemTitle">
                        <div class="itemTitleLine"></div>
                        <div class="itemTitletext">{{ $t('ActivityLocation') }}</div>
                    </div>
                    <div class="CourseIntroduction">
                        <div class="CourseIntroduction_item">{{ showData[0].ActPlace }}</div>

                    </div>
                    <div class="itemTitle">
                        <div class="itemTitleLine"></div>
                        <div class="itemTitletext">{{ $t('ActivityAlert') }}</div>
                    </div>
                    <div class="CourseIntroduction">
                        {{ showData[0].ActNotice }}
                    </div>
                </div>
            </div>

        </main>
    </div>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useRoute } from 'vue-router'
import router from '../router';





const route = useRoute()
const id = route.params.id


const ListData = ref([{}])
const showData = ref([{}])


const api = `${import.meta.env.VITE_APP_API}API_App/HomePage/ActivityList`
axios.post(api, { "u_id": $cookies.get('u_id') !== null ? $cookies.get('u_id') : '', "AuthCode": '', Lang: $cookies.get("Lang"), "ModClass": id.slice(0, 1), "SDateTime": '', "EDateTime": '', "Keywords": '' }, {
    headers: {
        Authorization: 'Bearer ' + $cookies.get("random")
    }
})
    .then((res) => {
        ListData.value = res.data.ActivityDataList
        showData.value = ListData.value.filter((item) => {
            return item.ActId === id.slice(1)
        })
    })
    .catch((error) => console.log(error));

function isMember() {
    if ($cookies.get('u_id') !== null && $cookies.get('random') !== null) {
        router.push(`/Course/RegistrationForm/${id}`)
    } else {
        alert('請先登入會員')
        router.push('/login')
    }
}


</script>


