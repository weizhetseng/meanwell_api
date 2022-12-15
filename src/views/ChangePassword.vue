<template>
    <div class="page_main">
        <main>
            <div class="page_content">
                <div class="PageBreadCrumbs">
                    <ul>
                        <li>首頁</li>
                        <li>></li>
                        <li>帳號管理</li>
                        <li>></li>
                        <li>變更密碼</li>
                    </ul>
                </div>
                <section class="MemberCenterContent">
                    <div class="memberNav">
                        <div class="memberNavItem" v-for="(items, idx) in NavItemArr" :key="items.name"
                            :class="{ active: activeIdx === idx }" @click="handleMenuFn(idx)">
                            <router-link :to="items.path">
                                <div class="navItems" @click="handleMenuFnb(ia)">
                                    <div class="memberNavItemLine"></div>
                                    <div class="memberNavItemtext">{{ items.name }}</div>
                                </div>
                            </router-link>
                            <div class="navItemSort">
                                <div class="navItemSortContent">
                                    <div class="navItemSortContentItem" :class="{ active: activeIddx === iddx }"
                                        v-for="(itax, iddx) in items.item" :key="itax.name"
                                        @click="handleMenuFna(iddx)"><router-link :to="itax.path">{{ itax.name
                                        }}</router-link></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="memberCenterRight">
                        <div class="memberCenterRightTopBox">
                            <div class="memberUserBox">
                                <div class="memberUserBoxLeft"><img src="../assets/img/memberUserIcon.svg" alt=""></div>
                                <div class="memberUserName">王小明 您好!</div>
                            </div>
                            <div class="memberUserQRcord" @click="qropen()">
                                <div class="MembershipLevelBox">
                                    <div class="memberleve">銀卡會員</div>
                                    <div class="memberqrtext">我的會員QRCORD</div>
                                </div>
                                <div class="qrcodeph"><img src="../assets/img/qr-code-line.svg" alt=""></div>
                            </div>
                        </div>
                        <div class="memberCenterRightContentBox">
                            <div class="itemTitle">
                                <div class="itemTitleLine"></div>
                                <div class="itemTitletext">舊密碼</div>
                            </div>
                            <div class="memberinfTextinput">
                                <input :type="checkEye1 ? 'password' : 'text'" name="changepassword" id="Oldpasseord"
                                    class="memberinfinput" placeholder="請輸入舊密碼" v-model="NewPasswords.OldPassword">
                                <span id="checkEye" class="material-symbols-outlined" @click="checkEye1 = !checkEye1">
                                    {{ checkEye1 ? 'visibility_off' : 'visibility' }}
                                </span>
                            </div>
                            <div class="itemTitle">
                                <div class="itemTitleLine"></div>
                                <div class="itemTitletext">新密碼</div>
                            </div>
                            <div class="memberinfTextinput">
                                <input :type="checkEye2 ? 'password' : 'text'" name="changepassword" id="Newpassword1"
                                    class="memberinfinput" placeholder="請輸入新密碼" v-model="NewPasswords.NewPassword">
                                <span id="checkEye" class="material-symbols-outlined" @click="checkEye2 = !checkEye2">
                                    {{ checkEye2 ? 'visibility_off' : 'visibility' }}
                                </span>
                            </div>
                            <div class="itemTitle">
                                <div class="itemTitleLine"></div>
                                <div class="itemTitletext">確認新密碼</div>
                            </div>
                            <div class="memberinfTextinput">
                                <input :type="checkEye3 ? 'password' : 'text'" name="changepassword" id="Newpassword2"
                                    class="memberinfinput" placeholder="請確認新密碼">
                                <span id="checkEye" class="material-symbols-outlined" @click="checkEye3 = !checkEye3">
                                    {{ checkEye3 ? 'visibility_off' : 'visibility' }}
                                </span>
                            </div>
                            <div class="persbuttonBox">
                                <router-link to="/MemberCenter"><button class="pageButtem"
                                        @click.prevent="changepassword()">確認送出</button></router-link>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
        <div class="leyboxbg" :class="{ active: qrcshow }" @click="qrclosures()">
            <div class="leyboxcontent">
                <div class="leyboxcontent_txt">會員 QRCORD</div>
                <div class="qrcordphoto"><img src="../assets/img/qrcode.svg" alt=""></div>
                <div class="closure_icon_set" @click="qrclosures()"><img src="../assets/img/closure_icon.svg" alt="">
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import axios from "axios";
import { text } from "dom7";
import { ref } from "vue"
import { useMemberStore } from "../stores/stores";
const store = useMemberStore()
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
        "AuthCode": $cookies.get('AuthCode'),
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
    })
        .then((res) => {
            if (res.data.success) {
                alert('更改成功')
            } else {
                alert(res.data.message)
            }
        })
}

const activeIdx = ref(1);
const activeIddx = ref(2);
const NavItemArr = ref([
    {
        name: 'SDG帳戶',
        path: '/MemberCenter',
    }, {
        name: '帳號管理',
        path: '',
        item: [
            {
                name: '個人資料',
                path: '/PersonalInformation',
            }, {
                name: '登入設定',
                path: '/LoginSettings',
            }, {
                name: '變更密碼',
                path: '/ChangePassword',
            }, {
                name: '會員管理辦法',
                path: '/MembershipManagementMeasures',
            }
        ]
    }, {
        name: '我的活動',
        path: '',
        item: [
            {
                name: '進行中',
                path: '/ActivityListOngoing',
            }, {
                name: '已結束',
                path: '/ActivityListOver',
            }, {
                name: '已取消',
                path: '/ActivityListCancelled',
            }
        ]
    }, {
        name: '領取分票',
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


</script>