<template>
    <div class="page_main">
        <main>
            <div class="page_content avt">
                <div class="PageBreadCrumbs">
                    <ul>
                        <li>{{ $t('IndexText') }}</li>
                        <li>></li>
                        <li>{{ $t('ActivityText') }}</li>
                        <li>></li>
                        <li>{{ showData[0].ActSubject }}</li>
                        <li>></li>
                        <li>{{ $t('SignUpText') }}</li>
                    </ul>
                </div>
                <div class="CourseContentBox">
                    <div class="CourseinfTitle registration">{{ showData[0].ActSubject }}</div>
                    <div class="activitiesSubtitle">{{ $t('SignUpData') }}</div>

                    <div class="itemTitle">
                        <div class="itemTitleLine"></div>
                        <div class="itemTitletext">{{ $t('Identity') }}</div>
                    </div>
                    <div class="memberinfTextinput">

                        <input id="identity0" type="radio" name="identity" :value="0"
                            v-model="storeSignUp.signUpData.Identity">
                        <label for="identity0">{{ $t('Identity1') }}</label>

                        <input id="identity1" type="radio" name="identity" :value="1"
                            v-model="storeSignUp.signUpData.Identity">
                        <label for="identity1">{{ $t('Identity2') }}</label>

                    </div>
                    <div class="itemTitle">
                        <div class="itemTitleLine"></div>
                        <div class="itemTitletext">{{ $t('JoinWay') }}</div>
                    </div>
                    <div class="memberinfTextinput">
                        <div class="inputitem" v-if="showData[0].IsOnSiteAct">
                            <input id="JoinWay0" type="radio" name="JoinWay" :value="0"
                                v-model="storeSignUp.signUpData.JoinWay">
                            <label for="JoinWay0">{{ $t('JoinWay1') }}</label>
                        </div>
                        <div class="inputitem" v-if="showData[0].IsOnLineAct">
                            <input id="JoinWay1" type="radio" name="JoinWay" :value="1"
                                v-model="storeSignUp.signUpData.JoinWay">
                            <label for="JoinWay1">{{ $t('JoinWay2') }}</label>
                        </div>
                    </div>
                    <div class="itemTitle">
                        <div class="itemTitleLine"></div>
                        <div class="itemTitletext">{{ $t('Name') }}</div>
                    </div>
                    <div class="memberinfTextinput">
                        <input type="text" name="" id="Name" class="memberinfinput" :placeholder="$t('Name1')"
                            v-model="storeSignUp.signUpData.Name">
                    </div>
                    <div class="itemTitle">
                        <div class="itemTitleLine"></div>
                        <div class="itemTitletext">{{ $t('Sex') }}</div>
                    </div>
                    <div class="memberinfTextinput">
                        <div class="inputitem">
                            <input id="Sex1" type="radio" name="Sex" :value="1" v-model="storeSignUp.signUpData.Sex">
                            <label for="Sex1">{{ $t('Sex1') }}</label>
                        </div>
                        <div class="inputitem">
                            <input id="Sex0" type="radio" name="Sex" :value="0" v-model="storeSignUp.signUpData.Sex">
                            <label for="Sex0">{{ $t('Sex2') }}</label>
                        </div>
                    </div>
                    <div class="itemTitle">
                        <div class="itemTitleLine"></div>
                        <div class="itemTitletext">{{ $t('Mobile') }}</div>
                    </div>
                    <div class="memberinfTextinput">
                        <input type="text" name="" id="Mobile" class="memberinfinput" :placeholder="$t('Mobile1')"
                            v-model="storeSignUp.signUpData.Mobile">
                    </div>
                    <div class="itemTitle">
                        <div class="itemTitleLine"></div>
                        <div class="itemTitletext">{{ $t('CompanyName') }}</div>
                    </div>
                    <div class="memberinfTextinput">
                        <input type="text" name="" id="CompanyName" class="memberinfinput"
                            :placeholder="$t('CompanyName1')" v-model="storeSignUp.signUpData.CompanyName">
                    </div>
                    <div class="itemTitle">
                        <div class="itemTitleLine"></div>
                        <div class="itemTitletext">{{ $t('JobTitle') }}</div>
                    </div>
                    <div class="memberinfTextinput">
                        <input type="text" name="" id="JobTitle" class="memberinfinput" :placeholder="$t('JobTitle1')"
                            v-model="storeSignUp.signUpData.JobTitle">
                    </div>
                    <div class="Boxbarbuttem">
                        <button class="pageButtem registerBtn" @click="checkInput()">{{ $t('NextStep') }}</button>
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
import router from '../router';
const route = useRoute()
const id = route.params.id

const storeSignUp = useSignUpStore()



function checkInput() {
    const checkIdentity = ref(false);
    const checkJoinWay = ref(false);
    const checkSex = ref(false);
    const Identity = document.getElementsByName('identity');
    const JoinWay = document.getElementsByName('JoinWay');
    const Sex = document.getElementsByName('Sex');
    const Name = document.getElementById('Name');
    const Mobile = document.getElementsByName('Mobile');
    const CompanyName = document.getElementsByName('CompanyName');
    const JobTitle = document.getElementsByName('JobTitle');
    for (var i = 0; i < Identity.length; i++) {
        if (Identity[i].checked) {
            checkIdentity.value = true;
            break;
        }
    }
    for (var i = 0; i < JoinWay.length; i++) {
        if (JoinWay[i].checked) {
            checkJoinWay.value = true;
            break;
        }
    }
    for (var i = 0; i < Sex.length; i++) {
        if (Sex[i].checked) {
            checkSex.value = true;
            break;
        }
    }
    if (checkIdentity.value == false) {
        alert('請選擇參與身分')
        return false;
    } else if (checkJoinWay.value == false) {
        alert('請選擇與會方式')
        return false;
    } else if (checkSex.value == false) {
        alert('請選擇性別')
        return false;
    } else if (Name.value == '') {
        alert('請輸入姓名')
        return false;
    } else if (Mobile.value == '') {
        alert('請輸入手機號碼')
        return false;
    } else if (CompanyName.value == '') {
        alert('請輸入任職公司')
        return false;
    } else if (JobTitle.value == '') {
        alert('請輸入職稱')
        return false;
    } else {

        router.push(`/Course/RegistrationFormNext/${id}`)
    }
}



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
