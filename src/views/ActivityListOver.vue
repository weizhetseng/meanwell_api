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
                        <li>{{ $t('MemberList9') }}</li>
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
                                        type="image/png" :value="String(store.MemberData.Mid)" /></div>
                            </div>
                        </div>
                        <div class="ActiveDirectoryContentBox">
                            <div class="itemTitle">
                                <div class="itemTitleLine"></div>
                                <div class="itemTitletext">{{ $t('MemberActivityList') }}</div>
                            </div>
                            <div class="ActiveList">
                                <div v-if="(tableData == '')">{{ $t('MemberList9_5') }}</div>
                                <RouterLink :to="`/ActivitiesOver/${item.ApplyId}`" v-for="item in tableData"
                                    :key="item.ApplyId">
                                    <div class="activelist-item-bar">
                                        <div class="activelist-item">
                                            <div class="activelistdate">
                                                <div class="activelistdateMonth">{{ item.ActSDateTime.substr(5, 2) }}
                                                    <span>
                                                        {{ $t('Month') }}
                                                    </span>
                                                </div>
                                            </div>
                                            <div class="activelistTextBar">
                                                <div class="activelistText">???????????????{{ item.ActSDateTime }}</div>
                                                <div class="activelistText">?????????{{ item.ActSubject }}</div>
                                                <div class="activelistText">?????????{{ item.ActPlace }}</div>
                                            </div>
                                        </div>
                                    </div>
                                </RouterLink>
                            </div>
                            <div class="pagination">
                                <a href="javascript:;" @click.prevent="prevPage()">
                                    <div class="pagination_item_previous"> <img src="../assets/img/chevron-left.svg"
                                            alt="">
                                    </div>
                                </a>
                                <a href="javascript:;" v-for="item in totalSize"
                                    @click.prevent="handleCurrentChange(item)">
                                    <div class="pagination_item"> {{ item }} </div>
                                </a>
                                <a href="javascript:;" @click.prevent="nextPage()">
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
import axios from "axios";
import router from "../router";
import { onMounted, ref } from "vue"
import { useMemberStore, LoginOut } from "../stores/stores";
import VueQrcode from 'vue-qrcode'
const store = useMemberStore()
const store2 = LoginOut()
//????????????
const currentPages = ref(1)
//??????????????????
const total = ref(null)
//??????????????????
const list = ref([])
//??????????????????
const totalSize = ref(null)
//????????????????????????
const tableData = ref([])
//??????????????????
const pageSize = 5
//?????????????????????
function handleCurrentChange(val) {
    currentPages.value = val;
    getList();
}
//?????????
function prevPage() {
    currentPages.value--
    if (currentPages.value < 1) {
        currentPages.value = 1
    }
    getList();
}
//?????????
function nextPage() {
    currentPages.value++
    if (currentPages.value >= totalSize.value) {
        currentPages.value = totalSize.value
    }
    getList();
}
//axios??????????????????
function getList() {
    const api = `${import.meta.env.VITE_APP_API}API_App/MemberData/MyActivityList`
    axios.post(api, {
        "u_id": $cookies.get('u_id'), "AuthCode": '0', "Lang": $cookies.get('Lang'), "MyActStatus": 2, "SDateTime": "", "EDateTime": "", "Keywords": ""
    }, {
        headers: {
            Authorization: 'Bearer ' + $cookies.get("random")
        }
    })
        .then((res) => {
            list.value = res.data.MyActivityDataList
            total.value = res.data.MyActivityDataList.length
            totalSize.value = Math.ceil(total.value / pageSize)
            tableData.value = getNeedArr(list.value, pageSize)[currentPages.value - 1]
            let checkNum = res.data.message.substr(0, 2)
            if (checkNum == '91' || checkNum == '92' || checkNum == '93' || checkNum == '94' || checkNum == '95' || checkNum == '96') {
                store2.Logout()
            }
        })
        .catch((error) => console.log(error));
}
//??????????????????
function getNeedArr(array, size) {
    const length = array.length
    if (!length || !size || size < 1) {
        return []
    }
    let index = 0
    let resIndex = 0
    let result = new Array(Math.ceil(length / size))

    while (index < length) {
        result[resIndex++] = array.slice(index, (index += size))
    }

    return result
}


const activeIdx = ref(2);
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

onMounted(() => {
    if ($cookies.isKey("random") == true && $cookies.isKey("u_id") == true) {
        store2.att = true
        store2.att2 = false
    } else {
        store2.att = false
        store2.att2 = true
    }

    getList()
    store.getMemberData()
})

</script>