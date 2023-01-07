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
                        <li>{{ showData[0].ActSubject }}</li>
                        <li>></li>
                        <li>{{ $t('takeTicket') }}</li>
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
                                <div class="qrcodeph"><vue-qrcode :color="[{ dark: '#000000ff', light: '#ffffffff' }]"
                                        type="image/png" :value="String(store.MemberData.Mid)" /></div>
                            </div>
                        </div>
                        <div class="ActiveDirectoryContentBox">
                            <div class="EventTicketingTitle">{{ showData[0].ActSubject }}</div>
                            <div class="activitiesSubtitle">{{ $t('takeTicket') }}</div>
                            <div class="eventTicketTitle">
                                <div class="titleArea">
                                    <div class="titleSeat">
                                        <div class="itemTitleLine"></div>
                                        <div class="itemTitletext">{{ $t('Seat') }}</div>
                                    </div>
                                    <div class="titleCode">
                                        <div class="itemTitleLine"></div>
                                        <div class="itemTitletext">{{ $t('RegisterCode') }}</div>
                                    </div>
                                </div>
                                <div class="titleArea dn-1200">
                                    <div class="titleSeat">
                                        <div class="itemTitleLine"></div>
                                        <div class="itemTitletext">{{ $t('Seat') }}</div>
                                    </div>
                                    <div class="titleCode">
                                        <div class="itemTitleLine"></div>
                                        <div class="itemTitletext">{{ $t('RegisterCode') }}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="eventTicketList">
                                <!-- BEN 資料筆數為偶數時底線樣式， BON 資料筆數為基數時底線樣式  -->
                                <div class="eventTicketItem" v-for="item in showData[0].TicketDataList" :key="item.code"
                                    :data-length-n="showData[0].TicketDataList.length"
                                    :class="[showData[0].TicketDataList.length % 2 === 0 ? 'BEN' : 'BON']">
                                    <div class="eventSeat">
                                        <p>{{ item.Seat }}</p>
                                    </div>
                                    <div class="copyCode">
                                        <p id="codeNum">{{ showData[0].TicketCode + item.AuthCode }}</p>
                                        <button type="button" id="copyBtn"
                                            @click="copy(showData[0].TicketCode + item.AuthCode)">{{
    $t('copy')
                                            }}</button>
                                    </div>
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
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref } from "vue"
import { useMemberStore, useLoginStore } from "../stores/stores";
import useClipboard from 'vue-clipboard3'
import VueQrcode from 'vue-qrcode'
const store = useMemberStore()
const store2 = useLoginStore()

const MyActStatus = ref([{}])
const route = useRoute()
const router = useRouter()
const id = route.params.id
const showData = ref([{}])
// 複製文字
const { toClipboard } = useClipboard()
const copy = async (item) => {
    try {
        await toClipboard(item)
        alert('Copied to clipboard')
    } catch (e) {
        console.error(e)
    }
}

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


    const api = `${import.meta.env.VITE_APP_API}API_App/MemberData/MyActivityList`
    axios.post(api, {
        "u_id": $cookies.get('u_id'), "AuthCode": '0', "Lang": $cookies.get('Lang'), "MyActStatus": 1, "SDateTime": "", "EDateTime": "", "Keywords": ""
    }, {
        headers: {
            Authorization: 'Bearer ' + $cookies.get("random")
        }
    })
        .then((res) => {
            MyActStatus.value = res.data.MyActivityDataList
            showData.value = MyActStatus.value.filter((item) => {
                return item.ApplyId === parseInt(id)
            })
        })
        .catch((error) => console.log(error));

    store.getMemberData()
})
</script>