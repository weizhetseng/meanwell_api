<template>
    <div class="page_course_main">
        <main>
            <div class="page_content avt">
                <div class="PageBreadCrumbs">
                    <ul>
                        <li>首頁</li>
                        <li>></li>
                        <li>活動列表</li>
                        <li>></li>
                        <li>{{ showData[0].ActSubject }}</li>
                    </ul>
                </div>
                <div class="BannerBar">
                    <div class="banner_content"><img src="../assets/img/102766030_m.jpg" alt=""></div>
                </div>
                <div class="CourseContentBox mobileSS">
                    <div class="activitiesTitle">{{ showData[0].ActSubject }}</div>
                    <div class="Coursebuttoon" v-if="showData[0].IsOpenSignUp && !showData[0].IsSignUp"><router-link
                            :to="`/Course/RegistrationForm/${id}`"><button
                                class="CoursebuttoonSet">前往報名</button></router-link></div>
                    <div class="itemTitle">
                        <div class="itemTitleLine"></div>
                        <div class="itemTitletext">簡介</div>
                    </div>
                    <div class="CourseIntroduction">
                        {{ showData[0].ActDes }}
                    </div>
                    <div class="itemTitle">
                        <div class="itemTitleLine"></div>
                        <div class="itemTitletext">時間</div>
                    </div>
                    <div class="CourseIntroduction">
                        <div class="CourseIntroduction_item">{{ showData[0].ActSDateTime }}</div>
                    </div>
                    <div class="itemTitle">
                        <div class="itemTitleLine"></div>
                        <div class="itemTitletext">地點</div>
                    </div>
                    <div class="CourseIntroduction">
                        <div class="CourseIntroduction_item">{{ showData[0].ActPlace }}</div>

                    </div>
                    <div class="itemTitle">
                        <div class="itemTitleLine"></div>
                        <div class="itemTitletext">注意事項</div>
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
import { onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router'





const route = useRoute()
const id = route.params.id


const ListData = ref([{}])
const showData = ref([{}])


const api = `${import.meta.env.VITE_APP_API}API_App/HomePage/ActivityList`
axios.post(api, { "u_id": $cookies.get('u_id'), "AuthCode": $cookies.get('AuthCode'), "Lang": $cookies.get('Lang'), "ModClass": id.slice(0, 1), "SDateTime": '', "EDateTime": '', "Keywords": '' })
    .then((res) => {
        ListData.value = res.data.ActivityDataList
        showData.value = ListData.value.filter((item) => {
            return item.ActId === id.slice(1)
        })
        console.log(showData)
    })

</script>


