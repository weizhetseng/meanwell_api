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
                            <div class="activitiesTitle">蘇州智慧園區開幕儀式</div>
                            <div class="itemTitle">
                                <div class="itemTitleLine"></div>
                                <div class="itemTitletext">報名場次</div>
                            </div>
                            <div class="itemtext">2022/07/26(二) 13:00-15:00</div>
                            <div class="itemTitle">
                                <div class="itemTitleLine"></div>
                                <div class="itemTitletext">報名資料</div>
                            </div>
                            <div class="personalinformation">
                                <div class="itemTr">
                                    <div class="itemtextleft">姓名：</div>
                                    <div class="itemtextright">李明偉</div>
                                </div>
                                <div class="itemTr">
                                    <div class="itemtextleft">手機電話：</div>
                                    <div class="itemtextright">09123456789</div>
                                </div>
                                <div class="itemTr">
                                    <div class="itemtextleft">E-mail：</div>
                                    <div class="itemtextright">test@gmail.com</div>
                                </div>
                                <div class="itemTr">
                                    <div class="itemtextleft">餐點：</div>
                                    <div class="itemtextright">葷</div>
                                </div>
                                <div class="itemTr">
                                    <div class="itemtextleft">交通：</div>
                                    <div class="itemtextright">自駕 ABC-1234</div>
                                </div>
                                <div class="itemTr">
                                    <div class="itemtextleft">備註：</div>
                                    <div class="itemtextright">對海鮮過敏</div>
                                </div>
                            </div>
                            <div class="itemTitle">
                                <div class="itemTitleLine"></div>
                                <div class="itemTitletext">票券資料</div>
                            </div>
                            <div class="TicketInformation">
                                <div class="itemTr">
                                    <div class="itemtextleft">電子票：</div>
                                    <div class="itemtextright">3張</div>
                                </div>
                                <div class="itemTr">
                                    <div class="itemtextleft">紙本票：</div>
                                    <div class="itemtextright">0張</div>
                                </div>
                                <div class="itemTr">
                                    <div class="itemtextleft">收件地址：</div>
                                    <div class="itemtextright">台北市信義區信義路1號</div>
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
                                    <div class="itemtextright2">https://teams.microsoft.com/</div>
                                </div>
                            </div>
                            <div class="FunctionColumn">
                                <router-link to="/EventTicketing"><button class="FunctionColumnButten"><img
                                            src="../assets/img/ticket.svg" alt="">電子票分票</button></router-link>
                                <router-link to="/CancelRegistration"><button class="FunctionColumnButten"><img
                                            src="../assets/img/ban-solid.svg" alt="">取消報名</button></router-link>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    </div>
</template>
<script setup>
import { ref } from "vue"
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



</script>