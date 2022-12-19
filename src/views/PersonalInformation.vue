<template>
    <div class="page_main">
        <main>
            <div class="page_content">
                <div class="PageBreadCrumbs">
                    <ul>
                        <li>{{ $t('IndexText') }}</li>
                        <li>></li>
                        <li>帳號管理</li>
                        <li>></li>
                        <li>個人資料</li>
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
                        <div class="memberCenterRightContentBox">
                            <div class="itemTitle">
                                <div class="itemTitleLine"></div>
                                <div class="itemTitletext">姓名</div>
                            </div>
                            <div class="memberinfText">{{ store.MemberData.Name }}</div>
                            <div class="itemTitle">
                                <div class="itemTitleLine"></div>
                                <div class="itemTitletext">性別</div>
                            </div>
                            <div class="memberinfText">{{ tranSex }}</div>
                            <div class="itemTitle">
                                <div class="itemTitleLine"></div>
                                <div class="itemTitletext">手機號碼</div>
                            </div>
                            <div class="memberinfText">{{ store.MemberData.Mobile }}</div>
                            <div class="itemsS50L">
                                <div class="itemTitle">
                                    <div class="itemTitleLine"></div>
                                    <div class="itemTitletext">證件類別</div>
                                </div>
                                <div class="memberinfText">{{ tranDocType }}</div>
                            </div>
                            <div class="itemsS50R">
                                <div class="itemTitle">
                                    <div class="itemTitleLine"></div>
                                    <div class="itemTitletext">證件號碼</div>
                                </div>
                                <div class="memberinfText">{{ store.MemberData.DocNumber }}</div>
                            </div>
                            <div class="itemsS50L">
                                <div class="itemTitle">
                                    <div class="itemTitleLine"></div>
                                    <div class="itemTitletext">任職公司</div>
                                </div>
                                <div class="memberinfText">{{ store.MemberData.CompanyName }}</div>
                            </div>
                            <div class="itemsS50R">
                                <div class="itemTitle">
                                    <div class="itemTitleLine"></div>
                                    <div class="itemTitletext">職稱</div>
                                </div>
                                <div class="memberinfText">{{ store.MemberData.JobTitle }}</div>
                            </div>
                            <div class="avatarBox">
                                <div class="avatarTitle">
                                    <div class="avatarTitleText">個人照</div>
                                    <div class="avatarTitleIcon"><img src="../assets/img/info-circle-fill.svg" alt="">
                                    </div>
                                </div>
                                <div class="avatarsText">
                                    *用於活動報到人臉辨識
                                </div>
                                <div class="avatarshint" v-if="store.MemberData.Pic !== ''">
                                    <div class="avatarshintText">已上傳</div>
                                </div>
                                <div class="avatarshint" v-else-if="store.MemberData.Pic == ''">
                                    <div class="avatarshintText">未上傳</div>
                                </div>
                            </div>
                            <div class="persbuttonBox">
                                <router-link to="/MemberInformationEditing"><button
                                        class="pageButtem">編輯資料</button></router-link>
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
import { ref, computed, onMounted } from "vue"
import router from "../router";
import { useMemberStore } from "../stores/stores";
const store = useMemberStore()
const activeIdx = ref(1);
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


const tranSex = computed(() => {
    if (store.MemberData.Sex === -1) {
        return '未設定'
    } else if (store.MemberData.Sex === 0) {
        return '女性'
    } else if (store.MemberData.Sex === 1) {
        return '男性'
    } else if (store.MemberData.Sex === 2) {
        return 'LGBTQ'
    }
})

const tranDocType = computed(() => {
    if (store.MemberData.DocType === 0) {
        return '未設定'
    } else if (store.MemberData.DocType === 1) {
        return '身分證'
    } else if (store.MemberData.DocType === 2) {
        return '台胞證'
    } else if (store.MemberData.DocType === 3) {
        return '居留證'
    } else if (store.MemberData.DocType === 4) {
        return '護照'
    }
})




</script>