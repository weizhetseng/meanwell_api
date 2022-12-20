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
                                        @click="handleMenuFna(iddx)"><router-link :to="itax.path">{{ $t(itax.name)
                                        }}</router-link></div>
                                </div>
                            </div>
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

                        <div class="ActiveDirectoryContentBox">
                            <div class="itemTitle">
                                <div class="itemTitleLine"></div>
                                <div class="itemTitletext">{{ $t('MemberActivityList') }}</div>
                            </div>
                            <div class="ActiveList">
                                <div v-if="(tableData == '')">{{ $t('MemberList8_5') }}</div>
                                <RouterLink :to="`/ActivitiesOngoing/${item.ApplyId}`" v-for="item in tableData"
                                    :key="item.ActId" v-else>
                                    <div class=" activelist-item-bar">
                                        <div class="activelist-item">
                                            <div class="activelistdate">
                                                <div class="activelistdateMonth">{{ item.ActSDateTime.substr(5, 2) }}
                                                </div>
                                                <div class="activelistdateMonthbefore">{{ $t('Month') }}</div>
                                            </div>
                                            <div class="activelistTextBar">
                                                <div class="activelistText">活動場次：{{ item.ActSDateTime }}</div>
                                                <div class="activelistText">主題：{{ item.ActSubject }}</div>
                                                <div class="activelistText">地點：{{ item.ActPlace }}</div>
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
import { useMemberStore } from "../stores/stores";
const store = useMemberStore()

//當前頁面
const currentPages = ref(1)
//所以資料筆數
const total = ref(null)
//當前頁面資料
const list = ref([])
//當前頁碼總數
const totalSize = ref(null)
//當前頁碼顯示內容
const tableData = ref([])
//一頁顯示數量
const pageSize = 5
//跳轉該頁面資料
function handleCurrentChange(val) {
    currentPages.value = val;
    getList();
}
//上一頁
function prevPage() {
    currentPages.value--
    if (currentPages.value < 1) {
        currentPages.value = 1
    }
    getList();
}
//下一頁
function nextPage() {
    currentPages.value++
    if (currentPages.value >= totalSize.value) {
        currentPages.value = totalSize.value
    }
    getList();
}
//axios取得該頁資料
function getList() {
    const api = `${import.meta.env.VITE_APP_API}API_App/MemberData/MyActivityList`
    axios.post(api, {
        "u_id": $cookies.get('u_id'), "AuthCode": $cookies.get('AuthCode'), "Lang": $cookies.get('Lang'), "MyActStatus": 1, "SDateTime": "", "EDateTime": "", "Keywords": ""
    })
        .then((res) => {
            list.value = res.data.MyActivityDataList
            total.value = res.data.MyActivityDataList.length
            totalSize.value = Math.ceil(total.value / pageSize)
            tableData.value = getNeedArr(list.value, pageSize)[currentPages.value - 1]
        })
}
//計算頁面資料
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
const activeIddx = ref(0);
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
    getList()
})

</script>