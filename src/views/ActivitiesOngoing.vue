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
                    </div>
                    <div class="memberCenterRight">
                        <div class="ActiveDirectoryContentBox">
                            <div class="activitiesTitle">{{ showData[0].ActSubject }}</div>
                            <div class="itemTitle">
                                <div class="itemTitleLine"></div>
                                <div class="itemTitletext">{{ $t('RegisterSeId') }}</div>
                            </div>
                            <div class="itemtext">{{ showData[0].ActSDateTime }}</div>
                            <div class="itemTitle">
                                <div class="itemTitleLine"></div>
                                <div class="itemTitletext">{{ $t('RegisterData') }}</div>
                            </div>
                            <div class="personalinformation">
                                <div class="itemTr">
                                    <div class="itemtextleft">{{ $t('Name') }}：</div>
                                    <div class="itemtextright">{{ showData[0].Name }}</div>
                                </div>
                                <div class="itemTr">
                                    <div class="itemtextleft">{{ $t('Mobile') }}：</div>
                                    <div class="itemtextright">{{ showData[0].Mobile }}</div>
                                </div>
                                <div class="itemTr">
                                    <div class="itemtextleft">E-mail：</div>
                                    <div class="itemtextright">{{ showData[0].Email }}</div>
                                </div>
                                <div class="itemTr">
                                    <div class="itemtextleft">{{ $t('Meals') }}：</div>
                                    <div class="itemtextright">{{ Meals }}</div>
                                </div>
                                <div class="itemTr">
                                    <div class="itemtextleft">{{ $t('Traffic') }}：</div>
                                    <div class="itemtextright">{{ Traffic }} {{ showData[0].CarNumber }}
                                    </div>
                                </div>
                                <div class="itemTr">
                                    <div class="itemtextleft">{{ $t('SignUpMemo') }}：</div>
                                    <div class="itemtextright">{{ showData[0].SignUpMemo }}</div>
                                </div>
                            </div>
                            <div class="itemTitle">
                                <div class="itemTitleLine"></div>
                                <div class="itemTitletext">{{ $t('TicketData') }}</div>
                            </div>
                            <div class="TicketInformation">
                                <div class="itemTr">
                                    <div class="itemtextleft">{{ $t('Ticket_E_Apply') }}：</div>
                                    <div class="itemtextright">{{ showData[0].Ticket_E_Apply }}{{ $t('Leaf') }}</div>
                                </div>
                                <div class="itemTr">
                                    <div class="itemtextleft">{{ $t('Ticket_P_Apply') }}：</div>
                                    <div class="itemtextright">{{ showData[0].Ticket_P_Apply }}{{ $t('Leaf') }}</div>
                                </div>
                                <div class="itemTr">
                                    <div class="itemtextleft">{{ $t('Address') }}：</div>
                                    <div class="itemtextright">{{ showData[0].Address }}</div>
                                </div>
                                <div class="itemTr">
                                    <div class="itemtextleft">{{ $t('SeatNum') }}：</div>
                                    <div class="itemtextright">
                                        <ul>
                                            <li v-for="item in showData[0].TicketDataList">{{ item.Seat }}</li>
                                        </ul>
                                    </div>

                                </div>
                            </div>
                            <div class="itemTitle">
                                <div class="itemTitleLine"></div>
                                <div class="itemTitletext">{{ $t('RelateInfo') }}</div>
                            </div>
                            <div class="relevantinformation">
                                <div class="itemTr">
                                    <div class="itemtextleft">{{ $t('Download') }}：</div>
                                    <div class="itemtextright downloadLink">
                                        <a :href="item.Link" :download="item.Title"
                                            v-for="item in showData[0].DownloadList">
                                            {{ item.Title }}
                                        </a>
                                    </div>
                                </div>
                                <div class="itemTr">
                                    <div class="itemtextleft2">{{ $t('Online') }}：</div>
                                    <div class="itemtextright2">
                                        <a :href="showData[0].OnlineLink" target="_blank">
                                            {{ showData[0].OnlineLink }}
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div class="FunctionColumn">
                                <router-link :to="`/EventTicketing/${id}`" v-if="showData[0].Ticket_E_Apply !== 0">
                                    <button class="FunctionColumnButten"><img src="../assets/img/ticket.svg" alt="">
                                        {{ $t('TakeTicket') }}
                                    </button>
                                </router-link>
                                <router-link :to="`/CancelRegistration/${id}`">
                                    <button class="FunctionColumnButten"><img src="../assets/img/ban-solid.svg" alt="">
                                        {{ $t('Cancel') }}
                                    </button>
                                </router-link>
                                <router-link to="#">
                                    <button class="FunctionColumnButten"><img src="../assets/img/bxs-spreadsheet.png"
                                            alt="">
                                        {{ $t('test01') }}
                                    </button>
                                </router-link>
                                <router-link to="#">
                                    <button class="FunctionColumnButten"><img src="../assets/img/bxs-spreadsheet.png"
                                            alt="">{{ $t('test02') }}
                                    </button>
                                </router-link>
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
import { onMounted, ref, computed } from "vue"
import { useRoute } from 'vue-router'
import { LoginOut } from "../stores/stores";
import { apiMyActivityList } from "../utils/api";
const store2 = LoginOut()

const MyActStatus = ref([{}])
const route = useRoute()
const id = route.params.id
const showData = ref([{}])



const Meals = computed(() => {
    if (showData.value[0].Meals === 0) {
        return '葷'
    } else if (showData.value[0].Meals === 1) {
        return '素'
    } else if (showData.value[0].Meals === 2) {
        return '不用餐'
    } else if (showData.value[0].Meals === -1) {
        return '不用餐'
    }

})
const Traffic = computed(() => {
    if (showData.value[0].Traffic === 0) {
        return '自駕'
    } else if (showData.value[0].Traffic === 1) {
        return '大眾運輸'
    }
})


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


onMounted(() => {
    apiMyActivityList({
        "u_id": $cookies.get('u_id'), "AuthCode": '0', "Lang": $cookies.get('Lang'), "MyActStatus": 1, "SDateTime": "", "EDateTime": "", "Keywords": ""
    })
        .then((res) => {
            MyActStatus.value = res.data.MyActivityDataList
            showData.value = MyActStatus.value.filter((item) => {
                return item.ApplyId === parseInt(id)
            })
            let checkNum = res.data.message.substr(0, 2)
            if (checkNum == '91' || checkNum == '92' || checkNum == '93' || checkNum == '94' || checkNum == '95' || checkNum == '96') {
                store2.Logout()
            }
        })
        .catch((error) => console.log(error));
})



</script>