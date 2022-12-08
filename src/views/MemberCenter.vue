<template>
    <div class="page_main">
        <main>
            <div class="page_content">
                <div class="PageBreadCrumbs">
                    <ul>
                        <li>首頁</li>
                        <li>></li>
                        <li>會員中心</li>
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
                        <div class="memberCenterRightContentBox">
                            <div class="itemTitle">
                                <div class="itemTitleLine"></div>
                                <div class="itemTitletext">SDG帳戶</div>
                            </div>
                            <div class="pointsBox">
                                <div class="pointsBoxItem">
                                    <div class="pointsBoxItemLeft">SDG 點數</div>
                                    <div class="pointsBoxItemRight">{{ store.MemberData.SDG_Points }} P</div>
                                </div>
                                <div class="pointsBoxItem">
                                    <div class="pointsBoxItemLeft">志工時數</div>
                                    <div class="pointsBoxItemRight">{{ store.MemberData.Volunteer_Hours }} H</div>
                                </div>
                                <div class="pointsBoxItem">
                                    <div class="pointsBoxItemLeft">課程時數</div>
                                    <div class="pointsBoxItemRight">{{ store.MemberData.Course_Hours }} H</div>
                                </div>
                            </div>
                            <div class="itemTitle">
                                <div class="itemTitleLine"></div>
                                <div class="itemTitletext">SDG禮贈品專區</div>
                            </div>
                            <div class="giftsBox">
                                <div class="giftsBoxItem">
                                    <div class="giftsBoxItemIcon"><img src="../assets/img/MemberCenter-Gifts.svg"
                                            alt=""></div>
                                    <div class="giftsBoxItemtext">禮贈兌換</div>
                                </div>
                                <div class="giftsBoxItem">
                                    <div class="giftsBoxItemIcon"><img src="../assets/img/MemberCenter-Points.svg"
                                            alt="">
                                    </div>
                                    <div class="giftsBoxItemtext">點數專區</div>
                                </div>
                                <div class="giftsBoxItem">
                                    <div class="giftsBoxItemIcon"><img src="../assets/img/MemberCenter-Order.svg"
                                            alt=""></div>
                                    <div class="giftsBoxItemtext">訂單查詢</div>
                                </div>
                                <div class="giftsBoxItem">
                                    <div class="giftsBoxItemIcon"><img src="../assets/img/MemberCenter-Digital.svg"
                                            alt="">
                                    </div>
                                    <div class="giftsBoxItemtext">數位票券</div>
                                </div>
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
import { ref } from "vue"
import { useMemberStore } from "../stores/stores";
const store = useMemberStore()
const activeIdx = ref(0);
const activeIddx = ref(null);
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
    activeIddx.value = null;
};
const qropen = () => {
    qrcshow.value = true;
}
const qrclosures = () => {
    qrcshow.value = false;
}

</script>