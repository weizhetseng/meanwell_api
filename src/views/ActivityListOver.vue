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
                        <li>已結束</li>
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
                            <div class="memberUserQRcord" @click="qropen()">
                                <div class="MembershipLevelBox">
                                    <div class="memberleve">銀卡會員</div>
                                    <div class="memberqrtext">我的會員QRCORD</div>
                                </div>
                                <div class="qrcodeph"><img src="../assets/img/qr-code-line.svg" alt=""></div>
                            </div>
                        </div>
                        <div class="ActiveDirectoryContentBox">
                            <div class="itemTitle">
                                <div class="itemTitleLine"></div>
                                <div class="itemTitletext">我的活動列表</div>
                            </div>
                            <div class="ActiveList">
                                <div v-if="(MyActStatus == null)">目前沒有已結束的活動</div>
                                <RouterLink :to="`/ActivitiesOver/${item.ApplyId}`" v-for="item in MyActStatus.value"
                                    :key="item.ApplyId">
                                    <div class="activelist-item-bar">
                                        <div class="activelist-item">
                                            <div class="activelistdate">
                                                <div class="activelistdateMonth">{{ item.ActSDateTime.substr(5, 2)
                                                }}</div>
                                                <div class="activelistdateMonthbefore">月</div>
                                            </div>
                                            <div class="activelistTextBar">
                                                <div class="activelistText">活動場次：{{ item.ActSDateTime }}</div>
                                                <div class="activelistText">主題：{{ item.ActSubject }}</div>
                                                <div class="activelistText">地點：{{ item.ActPlace }}</div>
                                            </div>
                                        </div>
                                    </div>
                                </RouterLink>
                            </div>
                            <div class="pagination">
                                <a href="javascript:;">
                                    <div class="pagination_item_previous"> <img src="../assets/img/chevron-left.svg"
                                            alt="">
                                    </div>
                                </a>
                                <a href="javascript:;">
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
                                    <div class="pagination_item_next"> <img src="../assets/img/chevron-right.svg"
                                            alt="">
                                    </div>
                                </a>
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
import { computed, onMounted, reactive, ref } from "vue"
import { useMemberStore } from "../stores/stores";
const store = useMemberStore()
const activeIdx = ref(2);
const activeIddx = ref(1);
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
const qropen = () => {
    qrcshow.value = true;
}
const qrclosures = () => {
    qrcshow.value = false;
}

const MyActStatus = reactive([{}])


onMounted(() => {
    const api = `${import.meta.env.VITE_APP_API}API_App/MemberData/MyActivityList`
    axios.post(api, {
        "u_id": $cookies.get('u_id'), "AuthCode": $cookies.get('AuthCode'), "Lang": $cookies.get('Lang'), "MyActStatus": 2, "SDateTime": "", "EDateTime": "", "Keywords": ""
    })
        .then((res) => {
            MyActStatus.value = res.data.MyActivityDataList
            console.log(res)
        })
})

</script>