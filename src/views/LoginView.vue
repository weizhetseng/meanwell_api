<template>
    <div class="page_main">
        <main class="Login">
            <div class="page_content">
                <section class="loginTopIcon">
                    <div class="loginBigIcon"><img src="../assets/img/LoginBigIcon.svg" alt=""></div>
                </section>
                <section class="loginContentBox">
                    <div class="ContentBoxTitle">{{ $t('MemberLogin') }}</div>
                    <Form v-slot="{ errors, values, validate }">
                        <div>
                            <div class="User_account">
                                <Field id="email" name="Email" :label="$t('__Email')" type="email"
                                    class="User_accountInput" :class="{ 'is-invalid': errors['Email'] }"
                                    :placeholder="$t('EmailInput')" rules="email|required" v-model="store.User.u_id">
                                </Field>
                            </div>
                            <div class="error">
                                <error-message name="Email" class="invalid-feedback"></error-message>
                            </div>
                        </div>
                        <div>
                            <div class="User_password">
                                <Field id="password" name="password" :label="$t('password')" type="password"
                                    class="User_accountInput" :class="{ 'is-invalid': errors['password'] }"
                                    :placeholder="$t('PasswordInput')" rules="required" v-model="store.User.RA">
                                </Field>
                            </div>
                            <div class="error">
                                <error-message name="password" class="invalid-feedback"></error-message>
                            </div>
                        </div>
                        <div class="login_confirm_input">
                            <label>
                                <input type="checkbox" v-model="store.User.checked">
                                <span>{{ $t('RememberMe') }}</span>
                            </label>
                            <div class="ForgotPassword">
                                <RouterLink to="/ForgotPassword">{{ $t('ForgotPassword') }} ?</RouterLink>
                            </div>
                        </div>
                        <div class="buttonBox">
                            <RouterLink to="/SignUp"><button class="pageButton buttonStyle">{{
                                $t('Register')
                            }}</button></RouterLink>
                            <input type="submit" :value="$t('Login')" class="loginButton buttonStyle"
                                @click="store.WebLogin()">
                            <!-- <input type="submit" value="test" class="loginButtem" @click="WebLogin()">
                            <input type="submit" value="testauth" class="loginButtem" @click="testauth()"> -->
                        </div>
                    </Form>
                    <div class="ThirdParty">
                        <div class="ThirdPartyTitle">
                            <div class="ThirdPartyTitleLine"></div>
                            <div class="ThirdPartyTitleText">{{ $t('OtherLoginText') }}</div>
                            <div class="ThirdPartyTitleLine"></div>
                        </div>
                        <div class="ThirdPartyButtemBar">
                            <div class="ThirdPartyButtemItem" @click.prevent="handleLineLoginButtonClick()">
                                <div class="ThirdPartyButtemIcon"><img src="../assets/img/line_icon.svg" alt=""></div>
                                <div class="ThirdPartyButtemText">LINE</div>
                            </div>
                            <div class="ThirdPartyButtemItem" @click="Facebooklogin()">
                                <div class="ThirdPartyButtemIcon"><img src="../assets/img/facebook_icon.svg" alt="">
                                </div>
                                <div class="ThirdPartyButtemText">FaceBook</div>
                            </div>
                            <div class="ThirdPartyButtemItem">
                                <div class="ThirdPartyButtemIcon"><img src="../assets/img/Wechat_icon.svg" alt=""></div>
                                <div class="ThirdPartyButtemText">Wechat</div>
                            </div>
                            <div class="ThirdPartyButtemItem" @click.prevent="">
                                <div class="ThirdPartyButtemIcon"><img src="../assets/img/google_icon.svg" alt=""></div>
                                <div class="ThirdPartyButtemText">Google</div>
                            </div>

                        </div>
                    </div>
                </section>
            </div>
        </main>
    </div>
</template>
<script setup>
import { onMounted } from 'vue';
import { LoginOut } from '../stores/stores';

import { ref } from 'vue'
import { googleAuthCodeLogin, googleTokenLogin } from 'vue3-google-login'
import axios from 'axios';

const store = LoginOut()
//google登入
const GOOGLE_CLIENT_ID = '651291589359-e9dkmrcd0v1tul9ngt1b8b0nrg2l4a13.apps.googleusercontent.com'

//line登入
function handleLineLoginButtonClick() {
    let URL = 'https://access.line.me/oauth2/v2.1/authorize?';
    URL += 'response_type=code';
    URL += '&client_id=1657813376';
    URL += '&redirect_uri=http://localhost:5173/login';
    URL += '&state=12345abcde';
    URL += '&prompt=consent';
    URL += '&scope=profile%20openid';
    window.location.href = URL;
}
// 獲取line授權登入後回傳的 state、code值
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.has('state') && urlParams.has('code')) {
    const state = urlParams.get('state');
    const authcode = urlParams.get('code');
    console.log('state', state, 'code', authcode);

    if (state === '12345abcde') {
        const api = 'https://api.line.me/oauth2/v2.1/token';
        const getTokenBody = {
            grant_type: 'authorization_code',
            code: authcode,
            redirect_uri: 'http://localhost:5173/login',
            client_id: '1657813376',
            client_secret: '0ebc2a278232d602db34d060c1c66f95',
        };

        axios.post(api, getTokenBody, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        })
            .then((res) => {
                console.log(res)
            })
            .catch((error) => {
                console.log(error);
                alert(error);
            });
    }
}

function Facebooklogin() {
    FB.getLoginStatus(function (response) {
        if (response.status === "connected") {
            FB.api("/me?fields=name,id,email", function (res) {
                console.log(res)
            });
        } else {
            // 登入狀態 - 未登入
            // 用戶登入(確認授權)
            FB.login(function (res) {
                console.log(res)
            },
                { scope: "public_profile,email" }
            );
        }
    });
}

function Facebooklogout() {
    FB.getLoginStatus(function (response) {
        if (response.status === "connected") {
            FB.api("/me/permissions", "DELETE", function (res) {
                console.log(res)
                FB.logout()
            });
        } else {
            // do something
        }
    });
}






onMounted(() => {
    store.GetKey()

    window.fbAsyncInit = function () {
        FB.init({
            appId: '1550228058732858',
            cookie: true,
            xfbml: true,
            version: 'v15.0'
        });
        FB.AppEvents.logPageView();

    };
    (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

})
</script>
