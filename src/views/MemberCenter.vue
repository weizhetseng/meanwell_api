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
                            <a href="#" @click.prevent="store2.Logout()">{{ $t('Logout') }}</a>
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
                                <div class="qrcodeph"><vue-qrcode :color="[{ dark: '#000000ff', light: '#ffffffff' }]"
                                        type="image/png" :value="String(store.MemberData.Mid)" />
                                </div>

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
                                <a :href="item.URL" class="giftsBoxItem" v-for="item in SDGUrl" :key="item.name"
                                    target="_blank">
                                    <div class="giftsBoxItemIcon"><img :src="imageUrl(item.imgSrc)" alt=""></div>
                                    <div class="giftsBoxItemtext">{{ $t(item.name) }}</div>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
        <div class="leyboxbg" :class="{ active: qrcshow }" @click="qrclosures()">
            <div class="leyboxcontent">
                <div class="leyboxcontent_txt">{{ $t('MemberQR2') }}</div>
                <div class="qrcordphoto"><vue-qrcode :color="[{ dark: '#000000ff', light: '#ffffffff' }]"
                        type="image/png" :value="String(store.MemberData.Mid)" /></div>
                <div class="closure_icon_set" @click="qrclosures()"><img src="../assets/img/closure_icon.svg" alt="">
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { onMounted, ref } from "vue"
import { useMemberStore, LoginOut } from "../stores/stores";
import VueQrcode from 'vue-qrcode'
import { apiSDGAuthCode } from "../utils/api";

const store = useMemberStore()
const store2 = LoginOut()

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
const SDGUrl = ref([
    {
        name: 'Exchange',
        imgSrc: 'MemberCenter-Gifts.svg',
        URL: 'productSeries.aspx',
    },
    {
        name: 'PointArea',
        imgSrc: 'MemberCenter-Points.svg',
        URL: 'memberPointHistory.aspx',
    },
    {
        name: 'OrderSearch',
        imgSrc: 'MemberCenter-Order.svg',
        URL: 'memberOrderHistory.aspx',
    },
    {
        name: 'ETicket',
        imgSrc: 'MemberCenter-Digital.svg',
        URL: 'memberOrderHistory.aspx',
    }
])


function imageUrl(name) {
    return new URL(`../assets/img/${name}`, import.meta.url)
        .href;
}
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



onMounted(() => {
    if ($cookies.isKey("random") == true && $cookies.isKey("u_id") == true) {
        store2.att = true
        store2.att2 = false
    } else {
        store2.att = false
        store2.att2 = true
    }
    store.getMemberData()

    // SDG官網跳轉驗證碼
    apiSDGAuthCode({
        u_id: $cookies.get("u_id"),
        AuthCode: '0',
        Lang: $cookies.get("Lang"),
    })
        .then((res) => {
            let checkNum = res.data.message.substr(0, 2)
            if (checkNum == '91' || checkNum == '92' || checkNum == '93' || checkNum == '94' || checkNum == '95' || checkNum == '96') {
                store2.Logout()
            }
            SDGUrl.value.forEach((item) => {
                // api回傳的域名(domain) + 各按鈕連結 + "?vid=" + 使用者帳號 + "&vcode=" + api回傳的SDG驗證碼(salt)
                item.URL = res.data.domain + item.URL + "?vid=" + $cookies.get("u_id") + "&vcode=" + res.data.salt
            })
        })
        .catch((error) => console.log(error));

})



</script>