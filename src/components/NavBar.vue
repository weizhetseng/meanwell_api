<template>
    <div class="lyboxbg" :class="{ active: mobileMenu }">
        <div class="mobile_menus">
            <div class="cles_icon" @click="colsMobileMenu()"><img src="../assets/img/closure_icon.svg" alt=""></div>
            <div class="logo_box" v-if="$cookies.get('Lang') === 'tw'" @click="colsMobileMenu()">
                <RouterLink to="/"><img src="../assets/img/Logos.svg" alt=""></RouterLink>
            </div>
            <div class="logo_box" v-else-if="$cookies.get('Lang') === 'cn'" @click="colsMobileMenu()">
                <RouterLink to="/"><img src="../assets/img/cn_logo.svg" alt=""></RouterLink>
            </div>
            <div class="logo_box" v-else-if="$cookies.get('Lang') === 'en'" @click="colsMobileMenu()">
                <RouterLink to="/"><img src="../assets/img/en_logo.svg" alt=""></RouterLink>
            </div>
            <div class="mobile_signoutView" :class="{ active: store.att }">
                <div class="mobile_sdgMenuItem">
                    <div class="loging_item">
                        <RouterLink to="/login" @click="colsMobileMenu()">{{ $t('Login') }}</RouterLink> / <RouterLink
                            to="/SignUp" @click="colsMobileMenu()">{{ $t('Register') }}</RouterLink>
                    </div>
                </div>
            </div>
            <div class="mobile_signinView">
                <RouterLink to="/MemberCenter" @click="colsMobileMenu()">
                    <div class="mobile_sdgMenuItem">
                        <div class="signinicon"><img src="../assets/img/member_icon.svg" alt=""></div>
                        <div class="signinmenutext">{{ $t('MemberCenter') }}</div>
                    </div>
                </RouterLink>
                <div class="mobile_member">
                    <div class="memberNavItem" v-for="(items, idx) in NavItemArr" :key="items.name"
                        :class="{ active: mobileactiveIdx === idx }" @click="handleMenuFn(idx)">
                        <router-link :to="items.path" @click="colsMobileMenu2(idx)">
                            <div class="navItems">
                                <div class="memberNavItemLine"></div>
                                <div class="memberNavItemtext mobileStyle">{{ $t(items.name) }}</div>
                            </div>
                        </router-link>
                        <div class="navItemSort">
                            <div class="navItemSortContent">
                                <div class="navItemSortContentItem" :class="{ active: mobileactiveIddx === iddx }"
                                    v-for="(itax, iddx) in items.item" :key="itax.name" @click="handleMenuFna(iddx)">
                                    <router-link :to="itax.path">{{ $t(itax.name) }}</router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <RouterLink to="/Calendar" @click="colsMobileMenu()">
                    <div class="mobile_sdgMenuItem2">
                        <div class="signinicon"><img src="../assets/img/calendar_icon.svg" alt=""></div>
                        <div class="signinmenutext Calendar">{{ $t('Calendar') }}</div>
                    </div>
                </RouterLink>

                <div class="mobile_Tosignout" :class="{ active: store.att2 }" @click="colsMobileMenu(); store.Logout()">
                    {{ $t('Logout') }}</div>
            </div>

        </div>
    </div>
    <header>
        <div class="header_meunbar">
            <div class="logo_box" v-if="$cookies.get('Lang') === 'tw'">
                <RouterLink to="/"><img src="../assets/img/Logos.svg" alt=""></RouterLink>
            </div>
            <div class="logo_box" v-else-if="$cookies.get('Lang') === 'cn'">
                <RouterLink to="/"><img src="../assets/img/cn_logo.svg" alt=""></RouterLink>
            </div>
            <div class="logo_box" v-else-if="$cookies.get('Lang') === 'en'">
                <RouterLink to="/"><img src="../assets/img/en_logo.svg" alt=""></RouterLink>
            </div>
            <div class="system_bar">
                <div class="signoutView" :class="{ active: store.att }">
                    <div class="sdgMenuItem">
                        <div class="loging_item">
                            <RouterLink to="/login">{{ $t('Login') }}</RouterLink> / <RouterLink to="/SignUp">{{
                                $t('Register')
                            }}
                            </RouterLink>
                        </div>
                    </div>
                </div>
                <div class="signinView" :class="{ active: store.att2 }">
                    <RouterLink to="/MemberCenter">
                        <div class="sdgMenuItem">
                            <div class="signinicon"><img src="../assets/img/member_icon.svg" alt=""></div>
                            <div class="signinmenutext">{{ $t('MemberCenter') }}</div>
                        </div>
                    </RouterLink>
                    <!-- <a href="" @click="Logout()">
                        <div class="Tosignout">{{ $t('Logout') }}</div>
                    </a> -->
                    <RouterLink to="/Calendar">
                        <div class="sdgMenuItem2">
                            <div class="signinicon"><img src="../assets/img/calendar_icon.svg" alt=""></div>
                            <div class="signinmenutext">{{ $t('Calendar') }}</div>
                        </div>
                    </RouterLink>
                </div>
                <div class="mobile_bar" @click="openMobileMenu()"><img src="../assets/img/bars-solid.svg" alt=""></div>
                <div class="sdgMenuItem">
                    <div class="language_item">
                        <img src="../assets/img/language_icon.svg" alt="">
                        <div class="language_bar">
                            <a href="javascript:;">
                                <div class="language_bar_item" @click="$i18n.locale = 'zh-TW', changeTW()">繁中</div>
                            </a>
                            <a href="javascript:;">
                                <div class="language_bar_item" @click="$i18n.locale = 'zh-CN', changeCN()">简中</div>
                            </a>
                            <a href="javascript:;">
                                <div class="language_bar_item" @click="$i18n.locale = 'en-US', changeEN()">English</div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>
<script setup>
import { onMounted, ref } from "vue"
import { LoginOut } from "../stores/stores";

const store = LoginOut()

const mobileMenu = ref(false);
const mobileactiveIddx = ref(null);
const mobileactiveIdx = ref(null);
const NavItemArr = ref([
    {
        name: 'MemberList1',
        path: '/MemberCenter',
    },
    {
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
    },
    {
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

const openMobileMenu = () => {
    mobileMenu.value = true
    mobileactiveIddx.value = null
    mobileactiveIdx.value = null
};
const colsMobileMenu = () => {
    mobileMenu.value = false
}
const colsMobileMenu2 = (item) => {
    if (item == 0 || item == 3) {
        mobileMenu.value = false
    }
}
const handleMenuFn = (idx) => {
    mobileactiveIdx.value = idx;
};
const handleMenuFna = (iddx) => {
    mobileactiveIddx.value = iddx;
    mobileMenu.value = false;
};
//切換繁體中文
function changeTW() {
    $cookies.remove("DLang")
    $cookies.set("CLang", "zh-TW", 0)
    $cookies.set("Lang", "tw", 0)
    location.reload()
}
//切換簡體中文
function changeCN() {
    $cookies.remove("DLang")
    $cookies.set("CLang", "zh-CN", 0)
    $cookies.set("Lang", "cn", 0)
    location.reload()
}
//切換英文
function changeEN() {
    $cookies.remove("DLang")
    $cookies.set("CLang", "en-US", 0)
    $cookies.set("Lang", "en", 0)
    location.reload()
}


onMounted(() => {
    if ($cookies.isKey("random") == true && $cookies.isKey("u_id") == true) {
        store.att = true
        store.att2 = false
    } else {
        store.att = false
        store.att2 = true
    }
})
</script>
