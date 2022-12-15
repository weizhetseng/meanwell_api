<template>
    <div class="page_main">
        <main>
            <div class="page_content">
                <div class="PageBreadCrumbs">
                    <ul>
                        <li>首頁</li>
                        <li>></li>
                        <li>我的活動</li>
                        <li>></li>
                        <li>進行中</li>
                        <li>></li>
                        <li>蘇州智慧園區開幕儀式</li>
                        <li>></li>
                        <li>取消報名</li>
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
                                        @click="handleMenuFna(iddx)">
                                        <router-link :to="itax.path">{{ itax.name }}</router-link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="memberCenterRight">
                        <div class="memberCenterRightTopBox">
                            <div class="memberUserBox">
                                <div class="memberUserBoxLeft"><img src="../assets/img/memberUserIcon.svg" alt=""></div>
                                <div class="memberUserName">{{ store.MemberData.Name }} 您好!</div>
                            </div>
                            <div class="memberUserQRcord">
                                <div class="MembershipLevelBox">
                                    <div class="memberleve">銀卡會員</div>
                                    <div class="memberqrtext">我的會員QRCORD</div>
                                </div>
                                <div class="qrcodeph"><img src="../assets/img/qr-code-line.svg" alt=""></div>
                            </div>
                        </div>
                        <div class="ActiveDirectoryContentBox">
                            <div class="EventTicketingTitle">蘇州智慧園區開幕儀式</div>
                            <div class="activitiesSubtitle">取消報名</div>
                            <div class="itemTitle">
                                <div class="itemTitleLine"></div>
                                <div class="itemTitletext">原因</div>
                            </div>
                            <div class="CancelRegistrationSelect">
                                <select class="memberinfinput" v-model="CancelApply.ReasonId">
                                    <option :value="0" selected="" disabled="">請選擇原因</option>
                                    <option :value="1">原因一</option>
                                    <option :value="2">原因二</option>
                                    <option :value="3">原因三</option>
                                    <option :value="4">原因四</option>
                                </select>
                            </div>
                            <div class="itemTitle">
                                <div class="itemTitleLine"></div>
                                <div class="itemTitletext">其他說明</div>
                            </div>
                            <div class="CancelRegistrationtextbox">
                                <textarea class="textBox" placeholder="請輸入原因說明"
                                    v-model="CancelApply.OtherCancelDesc"></textarea>
                            </div>
                            <div class="itemTitle">
                                <div class="itemTitleLine"></div>
                                <div class="itemTitletext">注意事項</div>
                            </div>
                            <div class="itemtext">神這斗唱吃坐會可海立遠泉，苦旦對何着原；汁肖里讀次燈見間員發兒急訴春直愛清魚。</div>
                            <div class="persbuttonBox">
                                <router-link to="#"><button class="pageButtem"
                                        @click="CancelActivity()">確認送出</button></router-link>
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
import { ref } from "vue"
import { useMemberStore } from "../stores/stores";
import { useRoute, useRouter } from 'vue-router'
const store = useMemberStore()
const route = useRoute()
const router = useRouter()
const id = route.params.id
const activeIdx = ref(2);
const activeIddx = ref(0);
const activityset = ref(0);
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
    activeIddx.value = 0;
    if (activeIdx.value == 2) {
        activeIddx.value = null;
    }
};
const qrclosures = () => {
    qrcshow.value = false;
}

const CancelApply = ref(
    {
        u_id: $cookies.get('u_id'),
        AuthCode: $cookies.get('AuthCode'),
        Lang: $cookies.get('Lang'),
        ApplyId: id,
        ReasonId: 0,
        OtherCancelDesc: ""
    }
)
function CancelActivity() {
    const api = `${import.meta.env.VITE_APP_API}API_App/MemberData/CancelApply`
    axios.post(api, CancelApply.value)
        .then((res) => {
            if (res.data.success) {
                alert('取消成功')
                router.push('/ActivityListOngoing')
            } else {
                alert(res.data.message)
            }
        })
}





</script>