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
                        <li>{{ showData.value[0].ActSubject }}</li>
                    </ul>
                </div>
                <div class="BannerBar">
                    <div class="banner_content"><img src="../assets/img/102766030_m.jpg" alt=""></div>
                </div>
                <div class="CourseContentBox mobileSS">
                    <div class="activitiesTitle">{{ showData.value[0].ActSubject }}</div>
                    <div class="Coursebuttoon"><router-link to="/Course/RegistrationForm"><button
                                class="CoursebuttoonSet">前往報名</button></router-link></div>
                    <div class="itemTitle">
                        <div class="itemTitleLine"></div>
                        <div class="itemTitletext">簡介</div>
                    </div>
                    <div class="CourseIntroduction">
                        {{ showData.value[0].ActDes }}
                    </div>
                    <div class="itemTitle">
                        <div class="itemTitleLine"></div>
                        <div class="itemTitletext">時間</div>
                    </div>
                    <div class="CourseIntroduction">
                        <div class="CourseIntroduction_item">{{ showData.value[0].ActSDateTime }}</div>
                    </div>
                    <div class="itemTitle">
                        <div class="itemTitleLine"></div>
                        <div class="itemTitletext">地點</div>
                    </div>
                    <div class="CourseIntroduction">
                        <div class="CourseIntroduction_item">{{ showData.value[0].ActPlace }}</div>

                    </div>
                    <div class="itemTitle">
                        <div class="itemTitleLine"></div>
                        <div class="itemTitletext">注意事項</div>
                    </div>
                    <div class="CourseIntroduction">
                        {{ showData.value[0].ActNotice }}
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
const singleData = reactive([{}])
const showData = reactive([{}])
console.log(showData)

const api = `${import.meta.env.VITE_APP_API}API_App/HomePage/ActivityList`
axios.post(api, { "u_id": $cookies.get('u_id'), "AuthCode": $cookies.get('AuthCode'), "Lang": $cookies.get('Lang'), "ModClass": 1, "SDateTime": '', "EDateTime": '', "Keywords": '' })
    .then((res) => {
        singleData.value = res.data.ActivityDataList
        console.log('第一個', singleData)
        showData.value = singleData.value.filter((item) => {
            return item.ActId === id
        })
    })

console.log(id)

</script>


