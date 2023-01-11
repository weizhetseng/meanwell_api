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
                    <div class="CourseinfTitle">{{ showData[0].ActSubject }}</div>
                    <div class="activitiesSubtitle">{{ $t('SignUpData') }}</div>
                    <div class="itemTitle">
                        <div class="itemTitleLine"></div>
                        <div class="itemTitletext">{{ $t('SeId') }}</div>
                    </div>

                    <div class="memberinfTextinput Sessions">
                        <div v-for="item in showData[0].ActSessions" :key="item.SeId">
                            <input :id="item.SeId" type="radio" name="SeId" :value="item.SeId"
                                v-model="storeSignUp.sendData.SeId">
                            <label :for="item.SeId">{{ item.SeTitle }}</label>
                        </div>
                    </div>
                    <div v-if="showData[0].IsMeals">
                        <div class="itemTitle">
                            <div class="itemTitleLine"></div>
                            <div class="itemTitletext">{{ $t('Meals') }}</div>
                        </div>
                        <div class="memberinfTextinput">
                            <input id="Meals0" type="radio" name="Meals" :value="0"
                                v-model.number="storeSignUp.sendData.Meals">
                            <label for="Meals0">{{ $t('Meals1') }}</label>
                            <input id="Meals1" type="radio" name="Meals" :value="1"
                                v-model.number="storeSignUp.sendData.Meals">
                            <label for="Meals1">{{ $t('Meals2') }}</label>
                            <input id="Meals2" type="radio" name="Meals" :value="2"
                                v-model.number="storeSignUp.sendData.Meals">
                            <label for="Meals2">{{ $t('Meals3') }}</label>
                        </div>
                    </div>

                    <div class="itemTitle">
                        <div class="itemTitleLine"></div>
                        <div class="itemTitletext">{{ $t('Traffic') }}</div>
                    </div>
                    <div class="memberinfTextinput3">
                        <input id="Traffic0" type="radio" name="Traffic" :value="0"
                            v-model="storeSignUp.sendData.Traffic">
                        <label for="Traffic0">{{ $t('Traffic1') }}</label>
                        <input id="Traffic1" type="radio" name="Traffic" :value="1"
                            v-model="storeSignUp.sendData.Traffic">
                        <label for="Traffic1">{{ $t('Traffic2') }}</label>
                    </div>
                    <div class="memberinfTextinput2" v-if="storeSignUp.sendData.Traffic === 0">
                        <input type="text" name="transportation" id="CarNumber" class="memberinfinput"
                            :placeholder="$t('Traffic1_5')" v-model="storeSignUp.sendData.CarNumber">
                    </div>
                    <div class="itemTitle">
                        <div class="itemTitleLine"></div>
                        <div class="itemTitletext">{{ $t('SignUpMemo') }}</div>
                    </div>
                    <div class="CancelRegistrationtextbox"><textarea class="textBox" :placeholder="$t('SignUpMemo1')"
                            v-model="storeSignUp.sendData.SignUpMemo"></textarea>
                    </div>
                    <div class="ticket_set">
                        <div class="itemTitleLine"></div>
                        <div class="itemTitletext">{{ $t('Ticket_E_Apply') }}</div>
                        <div class="QuantityTable">
                            <div class="QuantityTable_button" @click="minusNum_elec()"><img
                                    src="../assets/img/minus.svg" alt=""></div>
                            <input class="QuantityTable_value" v-model="storeSignUp.sendData.Ticket_E_Apply" />
                            <div class="QuantityTable_button" @click="addNum_elec()"><img src="../assets/img/plus.svg"
                                    alt=""></div>
                        </div>
                    </div>
                    <div class="ticket_set">
                        <div class="itemTitleLine"></div>
                        <div class="itemTitletext">{{ $t('Ticket_P_Apply') }}</div>
                        <div class="QuantityTable">
                            <div class="QuantityTable_button" @click="minusNum_paper()"><img
                                    src="../assets/img/minus.svg" alt=""></div>
                            <input type="tel" class="QuantityTable_value"
                                v-model="storeSignUp.sendData.Ticket_P_Apply" />
                            <div class="QuantityTable_button" @click="addNum_paper()"><img src="../assets/img/plus.svg"
                                    alt=""></div>
                        </div>
                    </div>
                    <div class="ticket_set">
                        <div class="itemTitleLine"></div>
                        <div class="itemTitletext">{{ $t('TicketTotal') }}</div>
                        <div class="votes">{{ totalNum }} {{ $t('TicketTotal1') }}</div>
                    </div>
                    <div class="itemTitle2">
                        <div class="itemTitleLine"></div>
                        <div class="itemTitletext">{{ $t('Address') }}</div>
                    </div>
                    <div class="memberinfTextinput">
                        <input type="text" name="" id="Address" class="memberinfinput" :placeholder="$t('Address1')"
                            v-model="storeSignUp.sendData.Address">
                    </div>
                    <div class="Boxbarbuttem">
                        <button type="submit" class="pageButtem registerBtn" @click.prevent="checkInput()">{{
                            $t('Check')
                        }}</button>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>
<script setup>
import axios from 'axios';
import { useSignUpStore, useMemberStore } from "../stores/stores";
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import { LoginOut } from "../stores/stores";
const store2 = LoginOut()
const route = useRoute()
const router = useRouter()
const id = route.params.id

const storeMember = useMemberStore()
const storeSignUp = useSignUpStore()

const ListData = ref([{}])
const showData = ref([{}])
const totalNum = computed(() => {
    return parseInt(storeSignUp.sendData.Ticket_E_Apply) + parseInt(storeSignUp.sendData.Ticket_P_Apply)
})

function SignUp() {
    const SignUpApi = `${import.meta.env.VITE_APP_API}API_App/HomePage/ActivitySignUp`
    axios.post(SignUpApi, storeSignUp.sendData, {
        headers: {
            Authorization: 'Bearer ' + $cookies.get("random")
        }
    })
        .then((res) => {
            let checkNum = res.data.message.substr(0, 2)
            if (checkNum == '91' || checkNum == '92' || checkNum == '93' || checkNum == '94' || checkNum == '95' || checkNum == '96') {
                store2.Logout()
            }
            if (res.data.success) {
                alert('報名成功')
                storeSignUp.sendData = storeMember.MemberData
                router.push('/')
            } else {
                alert(res.data.message)
            }
        })
        .catch((error) => console.log(error));
}
function addNum_elec() {
    storeSignUp.sendData.Ticket_E_Apply++
}
function minusNum_elec() {
    storeSignUp.sendData.Ticket_E_Apply--
    if (storeSignUp.sendData.Ticket_E_Apply < 0) {
        alert('數量不可小於0')
        storeSignUp.sendData.Ticket_E_Apply = 0
    }
}
function addNum_paper() {
    storeSignUp.sendData.Ticket_P_Apply++
}
function minusNum_paper() {
    storeSignUp.sendData.Ticket_P_Apply--
    if (storeSignUp.sendData.Ticket_P_Apply < 0) {
        alert('數量不可小於0')
        storeSignUp.sendData.Ticket_P_Apply = 0
    }
}

function checkInput() {
    const checkSeId = ref(false);
    const checkMeals = ref(false);
    const checkTraffic = ref(false);
    const SeId = document.getElementsByName('SeId');
    const Meals = document.getElementsByName('Meals');
    const Traffic = document.getElementsByName('Traffic');
    const CarNumber = document.getElementById('CarNumber');
    const Address = document.getElementById('Address');
    const countieList = document.getElementById('countieList');
    const districtsList = document.getElementById('districtsList')

    for (var i = 0; i < SeId.length; i++) {
        if (SeId[i].checked) {
            checkSeId.value = true;
            break;
        }
    }
    for (var i = 0; i < Meals.length; i++) {
        if (Meals[i].checked) {
            checkMeals.value = true;
            break;
        }
    }
    for (var i = 0; i < Traffic.length; i++) {
        if (Traffic[i].checked) {
            checkTraffic.value = true;
            break;
        }
    }
    if (checkSeId.value == false) {
        alert('請選擇場次')
        return false;
    } else if (showData.value[0].IsMeals && checkMeals.value == false) {
        alert('請選擇餐點')
        return false;
    } else if (checkTraffic.value == false) {
        alert('請選擇交通')
        return false;
    } else if (storeSignUp.sendData.Traffic === 0 && CarNumber.value == '') {
        alert('請輸入車牌號碼')
        return false;
    } else if (totalNum.value == 0) {
        alert('總票數不可為0')
        return false;
    }
    // else if (countieList.value === '請選擇縣市' && districtsList === '請選擇行政區') {
    //     alert('請選擇縣市行政區')
    //     return false;
    // }
    else if (storeSignUp.sendData.Ticket_P_Apply !== 0 && Address.value == '') {
        alert('請輸入地址')
        return false;
    } else {
        SignUp()
    }

}

onMounted(() => {

    const api = `${import.meta.env.VITE_APP_API}API_App/HomePage/ActivityList`
    axios.post(api, { "u_id": $cookies.get('u_id'), "AuthCode": '0', "Lang": $cookies.get('Lang'), "ModClass": id.slice(0, 1), "SDateTime": '', "EDateTime": '', "Keywords": '' }, {
        headers: {
            Authorization: 'Bearer ' + $cookies.get("random")
        }
    })
        .then((res) => {
            ListData.value = res.data.ActivityDataList
            showData.value = ListData.value.filter((item) => {
                return item.ActId === id.slice(1)
            })
            let checkNum = res.data.message.substr(0, 2)
            if (checkNum == '91' || checkNum == '92' || checkNum == '93' || checkNum == '94' || checkNum == '95' || checkNum == '96') {
                store2.Logout()
            }
            console.log(showData)
        })
        .catch((error) => console.log(error));
    if (!showData.value[0].IsMeals) {
        storeSignUp.sendData.Meals = 2
    }
    storeSignUp.sendData.ActId = id.slice(1)
})

</script>