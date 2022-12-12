<template>
    <div class="page_main">
        <main>
            <div class="page_content avt">
                <div class="PageBreadCrumbs">
                    <ul>
                        <li>首頁</li>
                        <li>></li>
                        <li>活動列表</li>
                        <li>></li>
                        <li>{{ showData[0].ActSubject }}</li>
                        <li>></li>
                        <li>活動報名</li>
                    </ul>
                </div>
                <div class="CourseContentBox">
                    <div class="CourseinfTitle">{{ showData[0].ActSubject }}</div>
                    <div class="activitiesSubtitle">報名資料</div>
                    <div class="itemTitle">
                        <div class="itemTitleLine"></div>
                        <div class="itemTitletext">參與身分</div>
                    </div>
                    <div class="memberinfTextinput">

                        <input id="identity0" type="radio" name="identity" :value="0"
                            v-model="storeSignUp.signUpData.Identity">
                        <label for="identity0">外賓</label>


                        <input id="identity1" type="radio" name="identity" :value="1"
                            v-model="storeSignUp.signUpData.Identity">
                        <label for="identity1">員工</label>

                    </div>
                    <div class="itemTitle">
                        <div class="itemTitleLine"></div>
                        <div class="itemTitletext">與會方式</div>
                    </div>
                    <div class="memberinfTextinput">
                        <div class="inputitem">
                            <input id="JoinWay0" type="radio" name="JoinWay" :value="0"
                                v-model="storeSignUp.signUpData.JoinWay">
                            <label for="JoinWay0">親臨</label>
                        </div>
                        <div class="inputitem">
                            <input id="JoinWay1" type="radio" name="JoinWay" :value="1"
                                v-model="storeSignUp.signUpData.JoinWay">
                            <label for="JoinWay1">線上zoom meeting</label>
                        </div>
                    </div>
                    <div class="itemTitle">
                        <div class="itemTitleLine"></div>
                        <div class="itemTitletext">姓名</div>
                    </div>
                    <div class="memberinfTextinput">
                        <input type="text" name="" id="" class="memberinfinput" placeholder="請輸入姓名"
                            v-model="storeSignUp.signUpData.Name">
                    </div>
                    <div class="itemTitle">
                        <div class="itemTitleLine"></div>
                        <div class="itemTitletext">性別</div>
                    </div>
                    <div class="memberinfTextinput">
                        <div class="inputitem">
                            <input id="Sex1" type="radio" name="Sex" :value="1" v-model="storeSignUp.signUpData.Sex">
                            <label for="Sex1">男</label>
                        </div>
                        <div class="inputitem">
                            <input id="Sex0" type="radio" name="Sex" :value="0" v-model="storeSignUp.signUpData.Sex">
                            <label for="Sex0">女</label>
                        </div>
                    </div>
                    <div class="itemTitle">
                        <div class="itemTitleLine"></div>
                        <div class="itemTitletext">手機號碼</div>
                    </div>
                    <div class="memberinfTextinput">
                        <input type="text" name="" id="" class="memberinfinput" placeholder="請輸入手機號碼"
                            v-model="storeSignUp.signUpData.Mobile">
                    </div>
                    <div class="itemTitle">
                        <div class="itemTitleLine"></div>
                        <div class="itemTitletext">任職公司</div>
                    </div>
                    <div class="memberinfTextinput">
                        <input type="text" name="" id="" class="memberinfinput" placeholder="請輸入公司名稱"
                            v-model="storeSignUp.signUpData.CompanyName">
                    </div>
                    <div class="itemTitle">
                        <div class="itemTitleLine"></div>
                        <div class="itemTitletext">職稱</div>
                    </div>
                    <div class="memberinfTextinput">
                        <input type="text" name="" id="" class="memberinfinput" placeholder="請輸入職稱"
                            v-model="storeSignUp.signUpData.JobTitle">
                    </div>
                    <div class="Boxbarbuttem">
                        <router-link class="pageButtem" :to="`/Course/RegistrationFormNext/${id}`">下一步</router-link>
                    </div>
                </div>
            </div>

        </main>
    </div>
</template>


<script setup>
import axios from 'axios';
import { useSignUpStore } from "../stores/stores";
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router'
const route = useRoute()
const id = route.params.id

const storeSignUp = useSignUpStore()

const ListData = ref([{}])
const showData = ref([{}])






onMounted(() => {

    const api = `${import.meta.env.VITE_APP_API}API_App/HomePage/ActivityList`
    axios.post(api, { "u_id": $cookies.get('u_id'), "AuthCode": $cookies.get('AuthCode'), "Lang": $cookies.get('Lang'), "ModClass": id.slice(0, 1), "SDateTime": '', "EDateTime": '', "Keywords": '' })
        .then((res) => {
            ListData.value = res.data.ActivityDataList
            showData.value = ListData.value.filter((item) => {
                return item.ActId === id.slice(1)
            })
        })

})
</script>
