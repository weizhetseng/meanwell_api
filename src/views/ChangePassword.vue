<template>
    <div class="page_main">
        <main>
            <div class="page_content">
                <div class="PageBreadCrumbs">
                    <ul>
                        <li>{{ $t('IndexText') }}</li>
                        <li>></li>
                        <li>{{ $t('MemberList2') }}</li>
                        <li>></li>
                        <li>{{ $t('MemberList5') }}</li>
                    </ul>
                </div>
                <section class="MemberCenterContent">
                    <div class="memberNav">
                        <div class="memberNavItem" v-for="(items, idx) in NavItemArr" :key="items.name"
                            :class="{ active: activeIdx === idx }" @click="handleMenuFn(idx)">
                            <router-link :to="items.path">
                                <div class="navItems" @click="handleMenuFnb(ia)">
                                    <div class="memberNavItemLine"></div>
                                    <div class="memberNavItemtext">{{ $t(items.name) }}</div>
                                </div>
                            </router-link>
                            <div class="navItemSort">
                                <div class="navItemSortContent">
                                    <div class="navItemSortContentItem" :class="{ active: activeIddx === iddx }"
                                        v-for="(itax, iddx) in items.item" :key="itax.name"
                                        @click="handleMenuFna(iddx)"><router-link :to="itax.path">{{
                                            $t(itax.name)
                                        }}</router-link></div>
                                </div>
                            </div>
                        </div>
                        <div class="logoutButton">
                            <a href="#" @click.prevent="store2.Logout()">{{ $t('Logout') }}</a>
                        </div>
                    </div>
                    <div class="memberCenterRight">
                        <div class="memberCenterRightTopBox">
                            <div class="memberUserBox">
                                <div class="memberUserBoxLeft"><img src="../assets/img/memberUserIcon.svg" alt=""></div>
                                <div class="memberUserName">{{ store.MemberData.Name }} {{ $t('MemberHi') }}</div>
                            </div>
                            <div class="memberUserQRcord" @click="qropen()">
                                <div class="MembershipLevelBox">
                                    <div class="memberleve">{{ $t('MemberLevel') }}</div>
                                    <div class="memberqrtext">{{ $t('MemberQR') }}</div>
                                </div>
                                <div class="qrcodeph"><vue-qrcode :color="[{ dark: '#000000ff', light: '#ffffffff' }]"
                                        type="image/png" :value="String(store.MemberData.Mid)" /></div>
                            </div>
                        </div>
                        <div class="memberCenterRightContentBox">
                            <div class="itemTitle">
                                <div class="itemTitleLine"></div>
                                <div class="itemTitletext">{{ $t('OldPassword') }}</div>
                            </div>
                            <div class="memberinfTextinput">
                                <input :type="checkEye1 ? 'password' : 'text'" name="changepassword" id="Oldpasseord"
                                    class="memberinfinput" :placeholder="$t('OldPassword_5')"
                                    v-model="NewPasswords.OldPassword">
                                <span id="checkEye" class="material-symbols-outlined" @click="checkEye1 = !checkEye1">
                                    {{ checkEye1? 'visibility_off': 'visibility' }}
                                </span>
                            </div>
                            <div class="itemTitle">
                                <div class="itemTitleLine"></div>
                                <div class="itemTitletext">{{ $t('NewPassword1') }}</div>
                            </div>
                            <div class="memberinfTextinput">
                                <input :type="checkEye2 ? 'password' : 'text'" name="changepassword" id="Newpassword1"
                                    class="memberinfinput" :placeholder="$t('NewPassword1_5')"
                                    v-model="NewPasswords.NewPassword">
                                <span id="checkEye" class="material-symbols-outlined" @click="checkEye2 = !checkEye2">
                                    {{ checkEye2? 'visibility_off': 'visibility' }}
                                </span>
                            </div>
                            <div class="itemTitle">
                                <div class="itemTitleLine"></div>
                                <div class="itemTitletext">{{ $t('NewPassword2') }}</div>
                            </div>
                            <div class="memberinfTextinput">
                                <input :type="checkEye3 ? 'password' : 'text'" name="changepassword" id="Newpassword2"
                                    class="memberinfinput" :placeholder="$t('NewPassword2_5')">
                                <span id="checkEye" class="material-symbols-outlined" @click="checkEye3 = !checkEye3">
                                    {{ checkEye3? 'visibility_off': 'visibility' }}
                                </span>
                            </div>
                            <div class="persbuttonBox">
                                <router-link to="/MemberCenter"><button class="pageButtem"
                                        @click.prevent="changepassword()">{{ $t('Check') }}</button></router-link>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
        <div class="leyboxbg" :class="{ active: qrcshow }" @click="qrclosures()">
            <div class="leyboxcontent">
                <div class="leyboxcontent_txt">{{ $t('MemberQR2') }}</div>
                <div class="qrcordphoto"><vue-qrcode :color="[{ dark: '#000000ff', light: '#ffffffff' }]"
                        type="image/png" :value="String(store.MemberData.Mid)" /></div>
                <div class="closure_icon_set" @click="qrclosures()"><img src="../assets/img/closure_icon.svg" alt="">
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import axios from "axios";
import { onMounted, ref } from "vue"
import router from "../router";
import { useMemberStore, LoginOut } from "../stores/stores";
import VueQrcode from 'vue-qrcode'
const store = useMemberStore()
const store2 = LoginOut()
const checkEye1 = ref(true)
const checkEye2 = ref(true)
const checkEye3 = ref(true)

const NewPasswords = ref(
    {
        OldPassword: "",
        NewPassword: ""
    }
)
function changepassword() {
    const Oldpasseord = document.getElementById('Oldpasseord')
    const Newpassword1 = document.getElementById('Newpassword1')
    const Newpassword2 = document.getElementById('Newpassword2')
    if (Newpassword1.value !== Newpassword2.value && Newpassword2.value !== '') {
        alert('新密碼輸入不一致')
        return false
    } else if (Oldpasseord.value == '') {
        alert('請輸入舊密碼')
        return false
    } else if (Newpassword1.value == '') {
        alert('請輸入新密碼')
        return false
    } else if (Newpassword2.value == '') {
        alert('請確認新密碼')
        return false
    }


    const api = `${import.meta.env.VITE_APP_API}API_App/MemberData/UpdateData`
    axios.post(api, {
        "u_id": $cookies.get('u_id'),
        "AuthCode": '0',
        "Lang": $cookies.get('Lang'),
        "Name": store.MemberData.Name,
        "Sex": store.MemberData.Sex,
        "Birth": store.MemberData.Birth,
        "Mobile": store.MemberData.Mobile,
        "DocType": store.MemberData.DocType,
        "DocNumber": store.MemberData.DocNumber,
        "CompanyName": store.MemberData.CompanyName,
        "JobTitle": store.MemberData.JobTitle,
        "OldPassword": NewPasswords.value.OldPassword,
        "NewPassword": NewPasswords.value.NewPassword
    }, {
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
                alert('更改成功')
            } else {
                alert(res.data.message)
            }
        })
        .catch((error) => console.log(error));
}

const activeIdx = ref(1);
const activeIddx = ref(2);
const NavItemArr = ref([
    {
        name: 'MemberList1',
        path: '/MemberCenter',
    }, {
        name: 'MemberList2',
        path: '',
        item: [
            {
                name: 'MemberList3',
                path: '/PersonalInformation',
            }, {
                name: 'MemberList4',
                path: '/LoginSettings',
            }, {
                name: 'MemberList5',
                path: '/ChangePassword',
            }, {
                name: 'MemberList6',
                path: '/MembershipManagementMeasures',
            }
        ]
    }, {
        name: 'MemberList7',
        path: '',
        item: [
            {
                name: 'MemberList8',
                path: '/ActivityListOngoing',
            }, {
                name: 'MemberList9',
                path: '/ActivityListOver',
            }, {
                name: 'MemberList10',
                path: '/ActivityListCancelled',
            }
        ]
    }, {
        name: 'MemberList11',
        path: '/VotesTaken',
    }
]);
const qrcshow = ref(false);
const handleMenuFn = (idx) => {
    activeIdx.value = idx;
};
const handleMenuFna = (iddx) => {
    activeIddx.value = iddx;
};
const handleMenuFnb = () => {
    activeIddx.value = 2;
    if (activeIdx.value == 1) {
        activeIddx.value = null;
    }
};
const qropen = () => {
    qrcshow.value = true;
}
const qrclosures = () => {
    qrcshow.value = false;
}


onMounted(() => {
    if ($cookies.isKey("random") == true && $cookies.isKey("u_id") == true) {
        store2.att = true
        store2.att2 = false
    } else {
        store2.att = false
        store2.att2 = true
    }
    store.getMemberData()
})


</script>