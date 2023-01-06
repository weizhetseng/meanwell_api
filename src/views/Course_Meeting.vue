<template>
    <div class="page_course_main">
        <main class="activityList">
            <div class="page_content avt">
                <div class="PageBreadCrumbs">
                    <ul>
                        <li>{{ $t('IndexText') }}</li>
                        <li>></li>
                        <li>{{ $t('ActivityText') }}</li>
                    </ul>
                </div>
                <swiper :modules="modules" :slides-per-view="1" :space-between="50" :pagination="{ clickable: true }">
                    <swiper-slide v-for="item in listBanner" :key="item.PicLink">
                        <img :src="item.PicLink" alt="">
                    </swiper-slide>
                </swiper>
                <div class="Course_titleBar">
                    <div class="Course_title">{{ $t('ActivityText') }}</div>
                    <div class="Search_bar"><input type="search" name="" id="" class="Course_Search_bar"
                            v-model="cacheSearch"></div>
                </div>
                <div class="Course_List_Box">
                    <router-link :to="`/Course/CourseContent/${id}${item.ActId}`" v-for="item in filterSearch"
                        :key="item.ActId">
                        <div class="Course_List_Item">
                            <div class="Course_date_left">
                                <div class="CoursedateBox" :class="{ toTop: item.IsTop }">
                                    <div class="CoursedateMonth">{{ item.ActSDateTime.substr(5, 2) }}</div>
                                    <div class="CoursedateMonthText">{{ $t('Month') }}</div>
                                </div>
                            </div>
                            <div class="Course_date_right" :class="{ OpenForRegistration: item.IsOpenSignUp }, {
                                StopForRegistration: item.IsOpenSignUp && item.SignUpEDate !== '' && newToday > item.SignUpEDate
                            }">
                                <div class="Course_item_title">{{ item.ActSubject }}</div>
                                <div class="Course_item_location"><span
                                        v-html="item.ActPlace.replace(/\r\n/g, '<br />')"></span></div>
                            </div>
                        </div>
                    </router-link>

                </div>
                <div class="pagination">
                    <a href="javascript:;" @click.prevent="prevPage()">
                        <div class="pagination_item_previous"> <img src="../assets/img/chevron-left.svg" alt=""> </div>
                    </a>
                    <a href="javascript:;" v-for="item in totalSize" @click.prevent="handleCurrentChange(item)">
                        <div class="pagination_item"> {{ item }} </div>
                    </a>
                    <a href="javascript:;" @click.prevent="nextPage()">
                        <div class="pagination_item_next"> <img src="../assets/img/chevron-right.svg" alt=""> </div>
                    </a>
                </div>
            </div>
        </main>
    </div>
</template>


<script setup>
import axios from 'axios';
import { onMounted, ref, computed } from 'vue';
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/pagination';
import { useRoute } from 'vue-router'
const modules = [Pagination]





const route = useRoute()
const id = route.params.id
const listBanner = ref([])



//當前頁面
const currentPages = ref(1)
//所以資料筆數
const total = ref(null)
//當前頁面資料
const list = ref([])
//當前頁碼總數
const totalSize = ref(null)
//當前頁碼顯示內容
const tableData = ref([])
//一頁顯示數量
const pageSize = 6

const cacheSearch = ref('')

//搜尋匹配資料
const filterSearch = computed(() => {
    if (tableData.length > 0) {
        return tableData.value.filter((item) => item.ActSubject.match(cacheSearch.value));
    }
    else {
        return tableData.value;
    }
})

//跳轉該頁面資料
function handleCurrentChange(val) {
    currentPages.value = val;
    getList();
}
//上一頁
function prevPage() {
    currentPages.value--
    if (currentPages.value < 1) {
        currentPages.value = 1
    }
    getList();
}
//下一頁
function nextPage() {
    currentPages.value++
    if (currentPages.value >= totalSize.value) {
        currentPages.value = totalSize.value
    }
    getList();
}
//axios取得該頁資料
function getList() {
    const api = `${import.meta.env.VITE_APP_API}API_App/HomePage/ActivityList`
    axios.post(api, { "u_id": $cookies.get('u_id') !== null ? $cookies.get('u_id') : '', "AuthCode": '', "Lang": $cookies.get('Lang'), "ModClass": id, "SDateTime": '', "EDateTime": '', "Keywords": '' }, {
        headers: {
            Authorization: 'Bearer ' + $cookies.get("random")
        }
    })
        .then((res) => {
            list.value = res.data.ActivityDataList
            total.value = res.data.ActivityDataList.length
            listBanner.value = res.data.BannerList
            totalSize.value = Math.ceil(total.value / pageSize)
            tableData.value = getNeedArr(list.value, pageSize)[currentPages.value - 1]
        })
        .catch((error) => console.log(error));
}
//計算頁面資料
function getNeedArr(array, size) {
    const length = array.length
    if (!length || !size || size < 1) {
        return []
    }
    let index = 0
    let resIndex = 0
    let result = new Array(Math.ceil(length / size))

    while (index < length) {
        result[resIndex++] = array.slice(index, (index += size))
    }

    return result
}

const today = ref(new Date())
const year = today.value.getFullYear()
const month = today.value.getMonth()
const day = today.value.getDate()
const hours = today.value.getHours()
const Minutes = today.value.getMinutes()
const Milliseconds = today.value.getMilliseconds()
const newToday = `${year}/${month}/${day} ${hours}:0${Minutes}:${Milliseconds}`


onMounted(() => {
    getList()

})
</script>