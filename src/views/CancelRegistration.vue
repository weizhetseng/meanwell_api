<template>
    <div class="page_main">
        <main>
            <div class="page_content">
                <div class="PageBreadCrumbs">
                    <ul>
                        <li>{{ $t('IndexText') }}</li>
                        <li>></li>
                        <li>{{ $t('MemberList7') }}</li>
                        <li>></li>
                        <li>{{ $t('MemberList8') }}</li>
                        <li>></li>
                        <li>蘇州智慧園區開幕儀式</li>
                        <li>></li>
                        <li>{{ $t('Cancel') }}</li>
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
                                        @click="handleMenuFna(iddx)">
                                        <router-link :to="itax.path">{{ $t(itax.name) }}</router-link>
                                    </div>
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
                            <div class="memberUserQRcord">
                                <div class="MembershipLevelBox">
                                    <div class="memberleve">{{ $t('MemberLevel') }}</div>
                                    <div class="memberqrtext">{{ $t('MemberQR') }}</div>
                                </div>
                                <div class="qrcodeph"><img src="../assets/img/qr-code-line.svg" alt=""></div>
                            </div>
                        </div>
                        <div class="ActiveDirectoryContentBox">
                            <div class="EventTicketingTitle">蘇州智慧園區開幕儀式</div>
                            <div class="activitiesSubtitle">{{ $t('Cancel') }}</div>
                            <div class="itemTitle">
                                <div class="itemTitleLine"></div>
                                <div class="itemTitletext">{{ $t('reason') }}</div>
                            </div>
                            <div class="CancelRegistrationSelect">
                                <select class="memberinfinput" v-model="CancelApply.ReasonId">
                                    <option :value="0" selected="" disabled="">{{ $t('chooseReason') }}</option>
                                    <option :value="1">原因一</option>
                                    <option :value="2">原因二</option>
                                    <option :value="3">原因三</option>
                                    <option :value="4">原因四</option>
                                </select>
                            </div>
                            <div class="itemTitle">
                                <div class="itemTitleLine"></div>
                                <div class="itemTitletext">{{ $t('otherReason') }}</div>
                            </div>
                            <div class="CancelRegistrationtextbox">
                                <textarea class="textBox" :placeholder="$t('otherReason2')"
                                    v-model="CancelApply.OtherCancelDesc"></textarea>
                            </div>
                            <div class="itemTitle">
                                <div class="itemTitleLine"></div>
                                <div class="itemTitletext">{{ $t('ActivityAlert') }}</div>
                            </div>
                            <div class="itemtext">神這斗唱吃坐會可海立遠泉，苦旦對何着原；汁肖里讀次燈見間員發兒急訴春直愛清魚。</div>
                            <div class="persbuttonBox">
                                <router-link to="#"><button class="pageButtem" @click="CancelActivity()">{{
                                    $t('Check')
                                }}</button></router-link>
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
import axios from "axios";
import { onMounted, ref } from "vue"
import { useMemberStore, useLoginStore } from "../stores/stores";
import { useRoute, useRouter } from 'vue-router'
const store = useMemberStore()
const store2 = useLoginStore()
const route = useRoute()
const router = useRouter()
const id = route.params.id
const activeIdx = ref(2);
const activeIddx = ref(0);
const activityset = ref(0);
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
        AuthCode: '0',
        Lang: $cookies.get('Lang'),
        ApplyId: id,
        ReasonId: 0,
        OtherCancelDesc: ""
    }
)
function CancelActivity() {
    const api = `${import.meta.env.VITE_APP_API}API_App/MemberData/CancelApply`
    axios.post(api, CancelApply.value, {
        headers: {
            Authorization: 'Bearer ' + $cookies.get("random")
        }
    })
        .then((res) => {
            if (res.data.success) {
                alert('取消成功')
                router.push('/ActivityListOngoing')
            } else {
                alert(res.data.message)
            }
        })
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