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
                                <div class="CoursedateBox" :class="{ toTop: item.IsTop }"
                                    v-if="$cookies.get('Lang') === 'en'">
                                    <div class="CoursedateMonthEN" v-if="item.ActSDateTime.substr(5, 2) === '01'">Jan.
                                    </div>
                                    <div class="CoursedateMonthEN" v-else-if="item.ActSDateTime.substr(5, 2) === '02'">
                                        Feb.</div>
                                    <div class="CoursedateMonthEN" v-else-if="item.ActSDateTime.substr(5, 2) === '03'">
                                        Mar.</div>
                                    <div class="CoursedateMonthEN" v-else-if="item.ActSDateTime.substr(5, 2) === '04'">
                                        Apr.</div>
                                    <div class="CoursedateMonthEN" v-else-if="item.ActSDateTime.substr(5, 2) === '05'">
                                        May.</div>
                                    <div class="CoursedateMonthEN" v-else-if="item.ActSDateTime.substr(5, 2) === '06'">
                                        Jun.</div>
                                    <div class="CoursedateMonthEN" v-else-if="item.ActSDateTime.substr(5, 2) === '07'">
                                        Jul.</div>
                                    <div class="CoursedateMonthEN" v-else-if="item.ActSDateTime.substr(5, 2) === '08'">
                                        Aug.</div>
                                    <div class="CoursedateMonthEN" v-else-if="item.ActSDateTime.substr(5, 2) === '09'">
                                        Sep.</div>
                                    <div class="CoursedateMonthEN" v-else-if="item.ActSDateTime.substr(5, 2) === '10'">
                                        Oct.</div>
                                    <div class="CoursedateMonthEN" v-else-if="item.ActSDateTime.substr(5, 2) === '11'">
                                        Nov.</div>
                                    <div class="CoursedateMonthEN" v-else-if="item.ActSDateTime.substr(5, 2) === '12'">
                                        Dec.</div>
                                </div>
                                <div class="CoursedateBox" :class="{ toTop: item.IsTop }" v-else>
                                    <div class="CoursedateMonth">{{ item.ActSDateTime.substr(5, 2) }}</div>
                                    <div class="CoursedateMonthText">{{ $t('Month') }}</div>
                                </div>
                            </div>
                            <div class="Course_date_right" :class="{ OpenForRegistration: item.IsOpenSignUp && $cookies.get('Lang') == 'tw' }, { OpenForRegistrationCN: item.IsOpenSignUp && $cookies.get('Lang') == 'cn' }, { OpenForRegistrationEN: item.IsOpenSignUp && $cookies.get('Lang') == 'en' }, {
                                StopForRegistration: item.IsOpenSignUp && item.SignUpEDate !== '' && Today > item.SignUpEDate && $cookies.get('Lang') == 'tw'
                            }, {
                                StopForRegistrationCN: item.IsOpenSignUp && item.SignUpEDate !== '' && Today > item.SignUpEDate && $cookies.get('Lang') == 'cn'
                            }, {
                                StopForRegistrationEN: item.IsOpenSignUp && item.SignUpEDate !== '' && Today > item.SignUpEDate && $cookies.get('Lang') == 'en'
                            }">
                                <!-- <div class="Course_item_title">{{ item.ActSubject }}</div>
                                <div class="Course_item_location">{{ item.ActSDateTime }}</div> -->
                                <!-- <div class="Course_item_location"><span
                                        v-html="item.ActPlace.replace(/\r\n/g, '<br />')"></span></div> -->

                                <div class="Course_item_title">{{ item.ActSubject }}</div>
                                <div class="Course_item_location">{{ item.ActSDateTime }}</div>
                                <div class="Course_item_location">
                                    <img src="../assets/img/location.png" alt="" />
                                    {{ item.ActPlace }}
                                </div>
                                <div class="Course_item_location">
                                    <img src="../assets/img/user.png" alt="" />
                                    {{ item.ActOrganiser }}
                                </div>

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
import { onMounted, ref, computed } from 'vue';
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/pagination';
import { useRoute } from 'vue-router'
import dayjs from 'dayjs';
import { LoginOut } from "../stores/stores";
import { apiActivityList } from "../utils/api";
const store2 = LoginOut()
const Today = dayjs().format('YYYY/MM/DD HH:mm:ss')
const modules = [Pagination]


const route = useRoute()
const id = route.params.id
const listBanner = ref([])



//當前頁面
const currentPages = ref(1)
//所有資料筆數
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
    if (cacheSearch.value !== '') {
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
    apiActivityList({ "u_id": $cookies.get('u_id') !== null ? $cookies.get('u_id') : '', "AuthCode": '0', "Lang": $cookies.get('Lang'), "ModClass": id, "SDateTime": '', "EDateTime": '', "Keywords": '' })
        .then((res) => {
            list.value = res.data.ActivityDataList
            total.value = res.data.ActivityDataList.length
            listBanner.value = res.data.BannerList
            totalSize.value = Math.ceil(total.value / pageSize)
            tableData.value = getNeedArr(list.value, pageSize)[currentPages.value - 1]
            let checkNum = res.data.message.substr(0, 2)
            if (checkNum == '91' || checkNum == '92' || checkNum == '93' || checkNum == '94' || checkNum == '95' || checkNum == '96') {
                store2.Logout()
            }
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



onMounted(() => {
    getList()
})
</script>