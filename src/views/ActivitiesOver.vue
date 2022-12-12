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
                        <li>></li>
                        <li>{{ showData[0].ActSubject }}</li>
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
                        <div class="ActiveDirectoryContentBox">
                            <div class="activitiesTitle">{{ showData[0].ActSubject }}</div>
                            <div class="itemTitle">
                                <div class="itemTitleLine"></div>
                                <div class="itemTitletext">報名場次</div>
                            </div>
                            <div class="itemtext">{{ showData[0].ActSDateTime }}</div>
                            <div class="itemTitle">
                                <div class="itemTitleLine"></div>
                                <div class="itemTitletext">報名資料</div>
                            </div>
                            <div class="personalinformation">
                                <div class="itemTr">
                                    <div class="itemtextleft">姓名：</div>
                                    <div class="itemtextright">{{ showData[0].Name }}</div>
                                </div>
                                <div class="itemTr">
                                    <div class="itemtextleft">手機電話：</div>
                                    <div class="itemtextright">{{ showData[0].Mobile }}</div>
                                </div>
                                <div class="itemTr">
                                    <div class="itemtextleft">E-mail：</div>
                                    <div class="itemtextright">{{ showData[0].Email }}</div>
                                </div>
                                <div class="itemTr">
                                    <div class="itemtextleft">餐點：</div>
                                    <div class="itemtextright">{{ Meals }}</div>
                                </div>
                                <div class="itemTr">
                                    <div class="itemtextleft">交通：</div>
                                    <div class="itemtextright">{{ Traffic }}</div>
                                </div>
                                <div class="itemTr">
                                    <div class="itemtextleft">備註：</div>
                                    <div class="itemtextright">{{ showData[0].SignUpMemo }}</div>
                                </div>
                            </div>
                            <div class="itemTitle">
                                <div class="itemTitleLine"></div>
                                <div class="itemTitletext">票券資料</div>
                            </div>
                            <div class="TicketInformation">
                                <div class="itemTr">
                                    <div class="itemtextleft">電子票：</div>
                                    <div class="itemtextright">{{ showData[0].Ticket_E_Apply }}張</div>
                                </div>
                                <div class="itemTr">
                                    <div class="itemtextleft">紙本票：</div>
                                    <div class="itemtextright">{{ showData[0].Ticket_P_Apply }}張</div>
                                </div>
                                <div class="itemTr">
                                    <div class="itemtextleft">收件地址：</div>
                                    <div class="itemtextright">{{ showData[0].Address }}</div>
                                </div>
                                <div class="itemTr">
                                    <div class="itemtextleft">座位號碼：</div>
                                    <div class="itemtextright">10排 1號　10排 2號　10排 3號</div>
                                </div>
                            </div>
                            <div class="itemTitle">
                                <div class="itemTitleLine"></div>
                                <div class="itemTitletext">相關資訊</div>
                            </div>
                            <div class="relevantinformation">
                                <div class="itemTr">
                                    <div class="itemtextleft">資料下載：</div>
                                    <div class="itemtextright">課程內容.pdf</div>
                                </div>
                                <div class="itemTr">
                                    <div class="itemtextleft2">線上視訊連線：</div>
                                    <div class="itemtextright2">{{ showData[0].OnlineLink }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    </div>
</template>
<script setup>
import axios from "axios";
import { ref, reactive, onMounted, computed } from "vue"
import { useMemberStore } from "../stores/stores";
import { useRoute } from 'vue-router'

const MyActStatus = ref([{}])
const showData = ref([{}])
const route = useRoute()
const id = route.params.id
const Meals = computed(() => {
    if (showData.value[0].Meals === 0) {
        return '葷'
    } else if (showData.value[0].Meals === 1) {
        return '素'
    } else if (showData.value[0].Meals === 2) {
        return '不用餐'
    }
})
const Traffic = computed(() => {
    if (showData.value[0].Traffic === 0) {
        return '自駕'
    } else if (showData.value[0].Traffic === 1) {
        return '大眾運輸'
    }
})

console.log(Meals)


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
        "u_id": $cookies.get('u_id'), "AuthCode": $cookies.get('AuthCode'), "Lang": $cookies.get('Lang'), "MyActStatus": 2, "SDateTime": "", "EDateTime": "", "Keywords": ""
    })
        .then((res) => {
            MyActStatus.value = res.data.MyActivityDataList
            showData.value = MyActStatus.value.filter((item) => {
                return item.ApplyId === parseInt(id)
            })
            console.log(showData)
        })
})
</script>