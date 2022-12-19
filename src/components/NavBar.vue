<template>
    <div class="lyboxbg" :class="{ active: mobileMenu }">
        <div class="mobile_menus">
            <div class="cles_icon" @click="colsMobileMenu()"><img src="../assets/img/closure_icon.svg" alt=""></div>
            <div class="logo_box" @click="colsMobileMenu()">
                <RouterLink to="/"><img src="../assets/img/Logos.svg" alt=""></RouterLink>
            </div>
            <div class="mobile_signoutView">
                <div class="mobile_sdgMenuItem">
                    <div class="menu_item_text">{{ $t('NavBarText') }}</div>
                </div>
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
                        <router-link :to="items.path">
                            <div class="navItems" @click="handleMenuFnb(ia)">
                                <div class="memberNavItemLine"></div>
                                <div class="memberNavItemtext">{{ items.name }}</div>
                            </div>
                        </router-link>
                        <div class="navItemSort">
                            <div class="navItemSortContent">
                                <div class="navItemSortContentItem" :class="{ active: mobileactiveIddx === iddx }"
                                    v-for="(itax, iddx) in items.item" :key="itax.name" @click="handleMenuFna(iddx)">
                                    <router-link :to="itax.path">{{ itax.name }}</router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <RouterLink to="/Calendar" @click="colsMobileMenu()">
                    <div class="mobile_sdgMenuItem2">
                        <div class="signinicon"><img src="../assets/img/calendar_icon.svg" alt=""></div>
                        <div class="signinmenutext">{{ $t('Calendar') }}</div>
                    </div>
                </RouterLink>

                <div class="mobile_Tosignout" @click="colsMobileMenu()">{{ $t('Logout') }}</div>
            </div>

        </div>
    </div>
    <header>
        <div class="header_meunbar">
            <div class="logo_box">
                <RouterLink to="/"><img src="../assets/img/Logos.svg" alt=""></RouterLink>
            </div>
            <div class="system_bar">
                <div class="signoutView" :class="{ active: store.att }">
                    <div class="sdgMenuItem">
                        <div class="menu_item_text">{{ $t('NavBarText') }}</div>
                    </div>
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
                    <a href="" @click="Logout()">
                        <div class="Tosignout">{{ $t('Logout') }}</div>
                    </a>
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
                                <div class="language_bar_item" @click="$i18n.locale = 'zh-TW'">繁中</div>
                            </a>
                            <a href="javascript:;">
                                <div class="language_bar_item" @click="$i18n.locale = 'zh-CN'">简中</div>
                            </a>
                            <a href="javascript:;">
                                <div class="language_bar_item" @click="$i18n.locale = 'en-US'">English</div>
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
import { useLoginStore } from "../stores/stores";
const store = useLoginStore()

const mobileMenu = ref(false);
const mobileactiveIddx = ref(null);
const mobileactiveIdx = ref(null);
const NavItemArr = ref([
    {
        name: 'SDG帳戶',
        path: '/MemberCenter',
    }, {
        name: '帳號管理',
        path: '',
        item: [
            {
                name: '個人資料',
                path: '/PersonalInformation',
            }, {
                name: '登入設定',
                path: '/LoginSettings',
            }, {
                name: '變更密碼',
                path: '/ChangePassword',
            }, {
                name: '會員管理辦法',
                path: '/MembershipManagementMeasures',
            }
        ]
    }, {
        name: '我的活動',
        path: '',
        item: [
            {
                name: '進行中',
                path: '/ActivityListOngoing',
            }, {
                name: '已結束',
                path: '/ActivityListOver',
            }, {
                name: '已取消',
                path: '/ActivityListCancelled',
            }
        ]
    }, {
        name: '領取分票',
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
const handleMenuFn = (idx) => {
    mobileactiveIdx.value = idx;
};
const handleMenuFna = (iddx) => {
    mobileactiveIddx.value = iddx;
    mobileMenu.value = false;
};
function handleChangeLanguage(e) {
    locale.value = e.target.value
}


function Logout() {
    $cookies.remove("u_id")
    $cookies.remove("AuthCode")
    $cookies.remove("Lang")
    alert('已登出')
}
onMounted(() => {
    if ($cookies.isKey("AuthCode") == true && $cookies.isKey("u_id") == true) {
        store.att = true
        store.att2 = false
    } else {
        store.att = false
        store.att2 = true
    }
})



</script>