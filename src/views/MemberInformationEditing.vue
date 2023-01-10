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
                        <li>{{ $t('MemberList3_5') }}</li>
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
                                        type="image/png" :value="String(store.MemberData.Mid)" /></div>
                            </div>
                        </div>
                        <div class="memberCenterRightContentBox">
                            <div class="itemTitle">
                                <div class="itemTitleLine"></div>
                                <div class="itemTitletext">{{ $t('Name') }}</div>
                            </div>
                            <div class="memberinfTextinput">
                                <input type="text" name="" id="" class="memberinfinput" placeholder=""
                                    v-model="store.MemberData.Name">
                            </div>
                            <div class="itemTitle">
                                <div class="itemTitleLine"></div>
                                <div class="itemTitletext">{{ $t('Sex') }}</div>
                            </div>
                            <div class="memberinfTextinput">
                                <input id="gender01" type="radio" name="gender" :value="1"
                                    v-model="store.MemberData.Sex">
                                <label for="gender01">男</label>
                                <input id="gender02" type="radio" name="gender" :value="0"
                                    v-model="store.MemberData.Sex">
                                <label for="gender02">女</label>
                            </div>
                            <div class="itemTitle">
                                <div class="itemTitleLine"></div>
                                <div class="itemTitletext">{{ $t('Mobile') }}</div>
                            </div>
                            <div class="memberinfTextinput">
                                <input type="text" name="" id="" class="memberinfinput" placeholder=""
                                    v-model="store.MemberData.Mobile">
                            </div>
                            <div class="itemsS50L">
                                <div class="itemTitle">
                                    <div class="itemTitleLine"></div>
                                    <div class="itemTitletext">{{ $t('DocType') }}</div>
                                </div>
                                <div class="memberinfTextinput">
                                    <select class="memberinfinput" v-model.number="store.MemberData.DocType">
                                        <option :value="0" disabled>{{ $t('DocTypeAll') }}</option>
                                        <option :value="1">{{ $t('DocType1') }}</option>
                                        <option :value="2">{{ $t('DocType2') }}</option>
                                        <option :value="3">{{ $t('DocType3') }}</option>
                                        <option :value="4">{{ $t('DocType4') }}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="itemsS50R">
                                <div class="itemTitle">
                                    <div class="itemTitleLine"></div>
                                    <div class="itemTitletext">{{ $t('DocNumber') }}</div>
                                </div>
                                <div class="memberinfTextinput">
                                    <input type="text" name="" id="" class="memberinfinput" placeholder=""
                                        v-model="store.MemberData.DocNumber">
                                </div>
                            </div>
                            <div class="itemsS50L">
                                <div class="itemTitle">
                                    <div class="itemTitleLine"></div>
                                    <div class="itemTitletext">{{ $t('CompanyName') }}</div>
                                </div>
                                <div class="memberinfTextinput">
                                    <input type="text" name="" id="" class="memberinfinput" placeholder=""
                                        v-model="store.MemberData.CompanyName">
                                </div>
                            </div>
                            <div class="itemsS50R">
                                <div class="itemTitle">
                                    <div class="itemTitleLine"></div>
                                    <div class="itemTitletext">{{ $t('JobTitle') }}</div>
                                </div>
                                <div class="memberinfTextinput">
                                    <input type="text" name="" id="" class="memberinfinput" placeholder=""
                                        v-model="store.MemberData.JobTitle">
                                </div>
                            </div>
                            <div class="avatarBox">
                                <div class="avatarTitle">
                                    <div class="avatarTitleText">{{ $t('Photo') }}</div>
                                    <div class="avatarTitleIcon"><img src="../assets/img/info-circle-fill.svg" alt="">
                                    </div>
                                </div>
                                <div class="avatarsText">
                                    *{{ $t('PhotoText') }}
                                </div>
                                <div class="avatarshint">
                                    <div class="avatarshintText" v-if="store.MemberData.Pic !== ''">{{ $t('Uploaded') }}
                                    </div>
                                    <div class="avatarshintText" v-if="store.MemberData.Pic == ''">{{
                                        $t('UnUploaded')
                                    }}</div>
                                    <div class="upload_btn">
                                        <label class="avatarupload" for="upload_img">
                                            {{ $t('Upload') }}
                                        </label>
                                        <input id="upload_img" name="progressbarTW_img" type="file"
                                            accept="image/jpeg, image/png" @change="previewFile()">
                                    </div>

                                </div>
                            </div>
                            <div class="persbuttonBox">
                                <button type="submit" class="pageButtem" @click="changeMemberData">{{
                                    $t('Check')
                                }}</button>
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

function previewFile() {
    const file = document.getElementById("upload_img").files[0];

    let reader = new FileReader();
    if (file) {
        reader.readAsDataURL(file);
        reader.onloadend = function () {
            var strImage = reader.result.replace(/^data:image\/[a-z]+;base64,/, "");
            const api = `${import.meta.env.VITE_APP_API}API_App/MemberData/MemberPicUpdate`
            axios.post(api, {
                "u_id": $cookies.get('u_id'),
                "AuthCode": '0',
                "Lang": $cookies.get('Lang'),
                "Pic": strImage
            }, {
                headers: {
                    Authorization: 'Bearer ' + $cookies.get("random")
                }
            })
                .then((res) => {
                    let checkNum = res.data.message.substr(0, 2)
                    if (checkNum == '91' || checkNum == '92' || checkNum == '93' || checkNum == '94' || checkNum == '95' || checkNum == '96') {
                        store2.Logout()
                    }
                    if (res.data.success) {
                        alert('圖片上傳成功')
                    } else {
                        alert(res.data.message)
                    }
                })
                .catch((error) => console.log(error));
        }
    }
}

function changeMemberData() {
    const api = `${import.meta.env.VITE_APP_API}API_App/MemberData/UpdateData`;
    axios.post(api, {
        "u_id": $cookies.get('u_id'),
        "AuthCode": '0',
        "Lang": $cookies.get('Lang'),
        "Name": store.MemberData.Name,
        "Sex": store.MemberData.Sex,
        "Birth": store.MemberData.Birth,
        "Mobile": store.MemberData.Mobile,
        "DocType": store.MemberData.DocType,
        "DocNumber": store.MemberData.DocNumber,
        "CompanyName": store.MemberData.CompanyName,
        "JobTitle": store.MemberData.JobTitle,
        "OldPassword": store.MemberData.OldPassword,
        "NewPassword": store.MemberData.NewPassword
    }, {
        headers: {
            Authorization: 'Bearer ' + $cookies.get("random")
        }
    })
        .then((res) => {
            let checkNum = res.data.message.substr(0, 2)
            if (checkNum == '91' || checkNum == '92' || checkNum == '93' || checkNum == '94' || checkNum == '95' || checkNum == '96') {
                store2.Logout()
            }
            if (res.data.success) {
                router.push('/PersonalInformation')
            }
        })
        .catch((error) => console.log(error));
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
})
</script>