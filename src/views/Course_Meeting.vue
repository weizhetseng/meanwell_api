<template>
    <div class="page_course_main">
        <main>
            <div class="page_content avt">
                <div class="PageBreadCrumbs">
                    <ul>
                        <li>首頁</li>
                        <li>></li>
                        <li>活動列表</li>
                    </ul>
                </div>
                <div class="BannerBar">
                    <div class="banner_content">
                        <swiper>
                            <swiper-slide v-for="item in MeetingBanner.value" :key="item.PicLink">
                                <img :src="item.PicLink" alt="">
                            </swiper-slide>
                        </swiper>
                    </div>
                </div>
                <div class="Course_titleBar">
                    <div class="Course_title">活動列表</div>
                    <div class="Search_bar"><input type="search" name="" id="" class="Course_Search_bar"></div>
                </div>
                <div class="Course_List_Box">
                    <router-link to="/Course/Meeting/CourseContent/" v-for="item in MeetingData.value"
                        :key="item.ActId">
                        <div class="Course_List_Item">
                            <div class="Course_date_left">
                                <div class="CoursedateBox" :class="{ toTop: item.IsTop }">
                                    <div class="CoursedateMonth">{{ item.ActSDateTime.substr(5, 2) }}</div>
                                    <div class="CoursedateMonthText">月</div>
                                </div>
                            </div>
                            <div class="Course_date_right" :class="{ OpenForRegistration: item.IsOpenSignUp }">
                                <div class="Course_item_title">{{ item.ActSubject }}</div>
                                <div class="Course_item_location"><span
                                        v-html="item.ActPlace.replace(/\r\n/g, '<br />')"></span></div>
                            </div>
                        </div>
                    </router-link>

                </div>
                <div class="pagination">
                    <a href="javascript:;">
                        <div class="pagination_item_previous"> <img src="../assets/img/chevron-left.svg" alt=""> </div>
                    </a>
                    <a href=" javascript:;">
                        <div class="pagination_item"> 1 </div>
                    </a>
                    <a href="javascript:;">
                        <div class="pagination_item"> 2 </div>
                    </a>
                    <a href="javascript:;">
                        <div class="pagination_item"> 3 </div>
                    </a>
                    <a href="javascript:;">
                        <div class="pagination_item"> 4 </div>
                    </a>
                    <a href="javascript:;">
                        <div class="pagination_item_next"> <img src="../assets/img/chevron-right.svg" alt=""> </div>
                    </a>
                </div>
            </div>
        </main>
    </div>
</template>


<script setup>
import axios from 'axios';
import { onMounted, reactive } from 'vue';
import router from '../router';
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import { useRoute } from 'vue-router'

const route = useRoute()
const id = route.params.id
console.log(typeof (id))



const MeetingData = reactive([{}])
const MeetingBanner = reactive([{}])

onMounted(() => {

    const api = `${import.meta.env.VITE_APP_API}API_App/HomePage/ActivityList`
    axios.post(api, { "u_id": $cookies.get('u_id'), "AuthCode": $cookies.get('AuthCode'), "Lang": $cookies.get('Lang'), "ModClass": id, "SDateTime": '', "EDateTime": '', "Keywords": '' })
        .then((res) => {
            MeetingData.value = res.data.ActivityDataList;
            MeetingBanner.value = res.data.BannerList;
            console.log(MeetingData.value)
            console.log(MeetingBanner.value)
            console.log(res)
        })
})
</script>