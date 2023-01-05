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
                        <li>{{ $t('MemberList4') }}</li>
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
                            <a href="#" @click.prevent="Logout()">{{ $t('Logout') }}</a>
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
                                <div class="qrcodeph"><img src="../assets/img/qr-code-line.svg" alt=""></div>
                            </div>
                        </div>
                        <div class="memberCenterRightContentBox">
                            <div class="LoginSettingsItem">
                                <div class="ls_icon"><img src="../assets/img/facebook-brands.svg" alt=""></div>
                                <div class="ls_name">FaceBook</div>
                                <div class="ls_linkIcon" v-if="store.MemberData.IsBind_FB"><img
                                        src="../assets/img/ios-link.svg" alt=""></div>
                                <div class="ls_linkIcon" v-else><img src="../assets/img/unlink-line.svg" alt=""></div>
                                <button class="ls_butten unlinked" v-if="store.MemberData.IsBind_FB">{{
                                    $t('unlinked')
                                }}</button>
                                <button class="ls_butten linked" v-else>{{ $t('linked') }}</button>
                            </div>
                            <div class="LoginSettingsItem">
                                <div class="ls_icon"><img src="../assets/img/line-brands.svg" alt=""></div>
                                <div class="ls_name">LINE</div>
                                <div class="ls_linkIcon" v-if="store.MemberData.IsBind_Line"><img
                                        src="../assets/img/ios-link.svg" alt=""></div>
                                <div class="ls_linkIcon" v-else><img src="../assets/img/unlink-line.svg" alt=""></div>
                                <button class="ls_butten unlinked" v-if="store.MemberData.IsBind_Line">{{
                                    $t('unlinked')
                                }}</button>
                                <button class="ls_butten linked" v-else>{{ $t('linked') }}</button>
                            </div>
                            <div class="LoginSettingsItem">
                                <div class="ls_icon"><img src="../assets/img/weixin-brands.svg" alt=""></div>
                                <div class="ls_name">WeChat</div>
                                <div class="ls_linkIcon" v-if="store.MemberData.IsBind_WeChat"><img
                                        src="../assets/img/ios-link.svg" alt=""></div>
                                <div class="ls_linkIcon" v-else><img src="../assets/img/unlink-line.svg" alt=""></div>
                                <button class="ls_butten unlinked" v-if="store.MemberData.IsBind_WeChat">{{
                                    $t('unlinked')
                                }}</button>
                                <button class="ls_butten linked" v-else>{{ $t('linked') }}</button>
                            </div>
                            <div class="LoginSettingsItem">
                                <div class="ls_icon"><img src="../assets/img/google-brands.svg" alt=""></div>
                                <div class="ls_name">Google</div>
                                <div class="ls_linkIcon" v-if="store.MemberData.IsBind_Google"><img
                                        src="../assets/img/ios-link.svg" alt=""></div>
                                <div class="ls_linkIcon" v-else><img src="../assets/img/unlink-line.svg" alt=""></div>
                                <button class="ls_butten unlinked" v-if="store.MemberData.IsBind_Google">{{
                                    $t('unlinked')
                                }}</button>
                                <button class="ls_butten linked" v-else>{{ $t('linked') }}</button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
        <div class="leyboxbg" :class="{ active: qrcshow }" @click="qrclosures()">
            <div class="leyboxcontent">
                <div class="leyboxcontent_txt">{{ $t('MemberQR2') }}</div>
                <div class="qrcordphoto"><img src="../assets/img/qrcode.svg" alt=""></div>
                <div class="closure_icon_set" @click="qrclosures()"><img src="../assets/img/closure_icon.svg" alt="">
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { onMounted, ref } from "vue"
import { useMemberStore, useLoginStore } from "../stores/stores";
import { useRouter } from 'vue-router'
const router = useRouter()
const store = useMemberStore()
const store2 = useLoginStore()
const activeIdx = ref(1);
const activeIddx = ref(1);
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

function Logout() {
    $cookies.remove("u_id")
    $cookies.remove("AuthCode")
    alert('已登出')
    store2.att = false
    store2.att2 = true
    router.push('/login')
}


onMounted(() => {
    if ($cookies.isKey("AuthCode") == true && $cookies.isKey("u_id") == true) {
        store2.att = true
        store2.att2 = false
    } else {
        store2.att = false
        store2.att2 = true
    }
})



</script>