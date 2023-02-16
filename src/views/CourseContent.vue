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
                    <div class="banner_content" v-if="showImg.length !== 1"><img :src="showImg[1]" alt=""></div>
                    <div class="banner_content" v-else><img src="../assets/img/102766030_m.jpg" alt=""></div>
                </div>
                <div class="CourseContentBox mobileSS">
                    <div class="activitiesTitle">{{ showData[0].ActSubject }}</div>
                    <div class="Coursebuttoon"
                        v-if="showData[0].IsOpenSignUp && !showData[0].IsSignUp && (showData[0].SignUpSDate == '' || showData[0].SignUpSDate < Today) && (showData[0].SignUpEDate == '' || showData[0].SignUpEDate > Today)">
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
                        <div class="itemTitletext">{{ $t('ActivityOrganizer') }}</div>
                    </div>
                    <div class="CourseIntroduction">
                        <div class="CourseIntroduction_item">{{ showData[0].ActOrganiser }}</div>
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
import { ref } from 'vue';
import { useRoute } from 'vue-router'
import router from '../router';
import dayjs from 'dayjs';
import { LoginOut } from "../stores/stores";
import { apiActivityList } from '../utils/api';
const store2 = LoginOut()
const Today = dayjs().format('YYYY/MM/DD HH:mm:ss')
const route = useRoute()
const id = route.params.id


const ListData = ref([{}])
const showData = ref([{}])
const showImg = ref([{}])

apiActivityList({ "u_id": $cookies.get('u_id') !== null ? $cookies.get('u_id') : '', "AuthCode": '0', Lang: $cookies.get("Lang"), "ModClass": id.slice(0, 1), "SDateTime": '', "EDateTime": '', "Keywords": '' })
    .then((res) => {
        ListData.value = res.data.ActivityDataList
        showData.value = ListData.value.filter((item) => {
            return item.ActId === id.slice(1)
        })
        showData.value.forEach((item) => {
            if (item.ActBannerList.length == 1) {
                showImg.value.push(item.ActBannerList[0].PicLink)
            }
        })
        let checkNum = res.data.message.substr(0, 2)
        if (checkNum == '91' || checkNum == '92' || checkNum == '93' || checkNum == '94' || checkNum == '95' || checkNum == '96') {
            store2.Logout()
        }
    })
    .catch((error) => console.log(error));

function isMember() {
    if ($cookies.get('u_id') !== null && $cookies.get('random') !== null) {
        router.push(`/Course/RegistrationForm/${id}`)
    } else {
        if ($cookies.get('Lang') === "tw") {
            alert('請先登入會員')
        } else if ($cookies.get('Lang') === "en") {
            alert('Please login account.')
        } else if ($cookies.get('Lang') === "cn") {
            alert('请先登入会员')
        }
        router.push('/login')
    }
}


</script>


