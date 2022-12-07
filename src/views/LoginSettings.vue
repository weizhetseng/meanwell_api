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
                        <li>登入設定</li>
                    </ul>
                </div>
                <section class="MemberCentreContent">
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
                            <div class="LoginSettingsItem">
                                <div class="ls_icon"><img src="../assets/img/facebook-brands.svg" alt=""></div>
                                <div class="ls_name">FaceBook</div>
                                <div class="ls_linkIcon"><img src="../assets/img/ios-link.svg" alt=""></div>
                                <button class="ls_butten unlinked">解除綁定</button>
                            </div>
                            <div class="LoginSettingsItem">
                                <div class="ls_icon"><img src="../assets/img/google-brands.svg" alt=""></div>
                                <div class="ls_name">LINE</div>
                                <div class="ls_linkIcon"><img src="../assets/img/unlink-line.svg" alt=""></div>
                                <button class="ls_butten linked">綁定</button>
                            </div>
                            <div class="LoginSettingsItem">
                                <div class="ls_icon"><img src="../assets/img/weixin-brands.svg" alt=""></div>
                                <div class="ls_name">微信</div>
                                <div class="ls_linkIcon"><img src="../assets/img/unlink-line.svg" alt=""></div>
                                <button class="ls_butten linked">綁定</button>
                            </div>
                            <div class="LoginSettingsItem">
                                <div class="ls_icon"><img src="../assets/img/google-brands.svg" alt=""></div>
                                <div class="ls_name">Google</div>
                                <div class="ls_linkIcon"><img src="../assets/img/ios-link.svg" alt=""></div>
                                <button class="ls_butten unlinked">解除綁定</button>
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
const activeIdx = ref(1);
const activeIddx = ref(1);
const NavItemArr = ref([
    {
        name: 'SDG帳戶',
        path: '/MemberCentre',
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
    activeIddx.value = 1;
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