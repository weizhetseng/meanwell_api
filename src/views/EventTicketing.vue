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
                        <li>電子票分票</li>
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
                                <div class="memberUserName">王小明 您好!</div>
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
                            <div class="activitiesSubtitle">分票資訊</div>
                            <div class="itemTitle">
                                <div class="itemTitleLine"></div>
                                <div class="itemTitletext">訂票代碼</div>
                            </div>
                            <div class="itemtext">{{ showData[0].TicketCode }}</div>
                            <div class="itemTitle">
                                <div class="itemTitleLine"></div>
                                <div class="itemTitletext">訂票驗證碼</div>
                            </div>
                            <div class="itemtext" v-for="item in showData[0].TicketDataList" :key="item.AuthCode">{{
                                    item.AuthCode
                            }}</div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    </div>
</template>
<script setup>
import axios from "axios";
import { onMounted, ref } from "vue"
import { useRoute } from 'vue-router'

const MyActStatus = ref([{}])
const route = useRoute()
const id = route.params.id
const showData = ref([{}])

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

onMounted(() => {
    const api = `${import.meta.env.VITE_APP_API}API_App/MemberData/MyActivityList`
    axios.post(api, {
        "u_id": $cookies.get('u_id'), "AuthCode": $cookies.get('AuthCode'), "Lang": $cookies.get('Lang'), "MyActStatus": 1, "SDateTime": "", "EDateTime": "", "Keywords": ""
    })
        .then((res) => {
            MyActStatus.value = res.data.MyActivityDataList
            showData.value = MyActStatus.value.filter((item) => {
                return item.ApplyId === parseInt(id)
            })
            console.log(res)
            console.log(showData)
        })
})
</script>