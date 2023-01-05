<template>
    <div class="page_main">
        <main>
            <div class="page_content">
                <div class="PageBreadCrumbs">
                    <ul>
                        <li>{{ $t('IndexText') }}</li>
                        <li>></li>
                        <li>{{ $t('MemberCenter') }}</li>
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
                            <div class="itemTitle">
                                <div class="itemTitleLine"></div>
                                <div class="itemTitletext">{{ $t('SDGAccount') }}</div>
                            </div>
                            <div class="pointsBox">
                                <div class="pointsBoxItem">
                                    <div class="pointsBoxItemLeft">{{ $t('SDGPoint') }}</div>
                                    <div class="pointsBoxItemRight">{{ store.MemberData.SDG_Points }} P</div>
                                </div>
                                <div class="pointsBoxItem">
                                    <div class="pointsBoxItemLeft">{{ $t('VolunteerPoint') }}</div>
                                    <div class="pointsBoxItemRight">{{ store.MemberData.Volunteer_Hours }} H</div>
                                </div>
                                <div class="pointsBoxItem">
                                    <div class="pointsBoxItemLeft">{{ $t('ClassPoint') }}</div>
                                    <div class="pointsBoxItemRight">{{ store.MemberData.Course_Hours }} H</div>
                                </div>
                            </div>
                            <div class="itemTitle">
                                <div class="itemTitleLine"></div>
                                <div class="itemTitletext">{{ $t('SDGGift') }}</div>
                            </div>
                            <div class="giftsBox">
                                <div class="giftsBoxItem">
                                    <div class="giftsBoxItemIcon"><img src="../assets/img/MemberCenter-Gifts.svg"
                                            alt=""></div>
                                    <div class="giftsBoxItemtext">{{ $t('Exchange') }}</div>
                                </div>
                                <div class="giftsBoxItem">
                                    <div class="giftsBoxItemIcon"><img src="../assets/img/MemberCenter-Points.svg"
                                            alt="">
                                    </div>
                                    <div class="giftsBoxItemtext">{{ $t('PointArea') }}</div>
                                </div>
                                <div class="giftsBoxItem">
                                    <div class="giftsBoxItemIcon"><img src="../assets/img/MemberCenter-Order.svg"
                                            alt=""></div>
                                    <div class="giftsBoxItemtext">{{ $t('OrderSearch') }}</div>
                                </div>
                                <div class="giftsBoxItem">
                                    <div class="giftsBoxItemIcon"><img src="../assets/img/MemberCenter-Digital.svg"
                                            alt="">
                                    </div>
                                    <div class="giftsBoxItemtext">{{ $t('ETicket') }}</div>
                                </div>
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
import router from "../router";
import { onMounted, ref } from "vue"
import { useMemberStore, useLoginStore } from "../stores/stores";
const store = useMemberStore()
const store2 = useLoginStore()

const activeIdx = ref(0);
const activeIddx = ref(null);
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
    activeIddx.value = null;
};
const qropen = () => {
    qrcshow.value = true;
}
const qrclosures = () => {
    qrcshow.value = false;
}

function Logout() {
    $cookies.remove("u_id")
    $cookies.remove("random")
    alert('已登出')
    store2.att = false
    store2.att2 = true
    router.push('/login')
}


onMounted(() => {
    if ($cookies.isKey("random") == true && $cookies.isKey("u_id") == true) {
        store2.att = true
        store2.att2 = false
    } else {
        store2.att = false
        store2.att2 = true
    }
})



</script>