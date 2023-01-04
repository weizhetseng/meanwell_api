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
                                <Field id="email" :name="$t('__Email')" type="email" class="User_accountInput"
                                    :class="{ 'is-invalid': errors['Email'] }" :placeholder="$t('EmailInput')"
                                    rules="email|required" v-model="user.u_id">
                                </Field>
                            </div>
                            <div class="error">
                                <error-message :name="$t('__Email')" class="invalid-feedback"></error-message>
                            </div>
                        </div>
                        <div>
                            <div class="User_password">
                                <Field id="password" :name="$t('password')" type="password" class="User_accountInput"
                                    :class="{ 'is-invalid': errors['password'] }" :placeholder="$t('PasswordInput')"
                                    rules="required" v-model="user.RA">
                                </Field>
                            </div>
                            <div class="error">
                                <error-message :name="$t('password')" class="invalid-feedback"></error-message>
                            </div>
                        </div>

                        <div class="login_confirm_input">
                            <label>
                                <Field type="checkbox" :name="$t('RememberMe')" :value="true"
                                    :class="{ 'is-invalid': errors['RememberMe'] }" rules="required"></Field>
                                <span>{{ $t('RememberMe') }}</span>
                            </label>
                            <div class="ForgotPassword">
                                <RouterLink to="/ForgotPassword">{{ $t('ForgotPassword') }} ?</RouterLink>
                            </div>
                            <error-message :name="$t('RememberMe')" class="invalid-feedback"></error-message>
                        </div>
                        <div class="buttonBox">
                            <RouterLink to="/SignUp"><button class="pageButton buttonStyle">{{
                                $t('Register')
                            }}</button></RouterLink>
                            <input type="submit" value="登入" class="loginButton buttonStyle" @click="loginent()">
                            <input type="submit" value="test" class="loginButtem" @click="WebLogin()">
                            <input type="submit" value="testauth" class="loginButtem" @click="testauth()">
                        </div>
                    </Form>
                    <div class="ThirdParty">
                        <div class="ThirdPartyTitle">
                            <div class="ThirdPartyTitleLine"></div>
                            <div class="ThirdPartyTitleText">{{ $t('OtherLoginText') }}</div>
                            <div class="ThirdPartyTitleLine"></div>
                        </div>
                        <div class="ThirdPartyButtemBar">
                            <div class="ThirdPartyButtemItem">
                                <div class="ThirdPartyButtemIcon"><img src="../assets/img/line_icon.svg" alt=""></div>
                                <div class="ThirdPartyButtemText">LINE</div>
                            </div>
                            <div class="ThirdPartyButtemItem">
                                <div class="ThirdPartyButtemIcon"><img src="../assets/img/facebook_icon.svg" alt="">
                                </div>
                                <div class="ThirdPartyButtemText">FaceBook</div>
                            </div>
                            <div class="ThirdPartyButtemItem">
                                <div class="ThirdPartyButtemIcon"><img src="../assets/img/Wechat_icon.svg" alt=""></div>
                                <div class="ThirdPartyButtemText">Wechat</div>
                            </div>
                            <div class="ThirdPartyButtemItem">
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


import axios from 'axios';
import { onMounted, ref, computed } from 'vue';
import { useLoginStore } from '../stores/stores';
import VueCookies from 'vue-cookies';
import dayjs from 'dayjs';
import CryptoJS from "crypto-js";
const store = useLoginStore()
const loginent = () => {
    store.loginData();
}

const user = {
    u_id: "",
    RA: "",
    mpDeviceID: "string",
    mpFCMID: "string",
    os: "string",
    mpPhoneType: "string",
    mpPhoneSize: "string",
    Vers: "string",
    AppVers: "string",
    Lang: ""
}

function Login() {
    const api1 = `${import.meta.env.VITE_APP_API}API_App/MemberData/Login`
    axios.post(api1, user)
        .then((res) => {
            if (res.data.success) {
                alert('發送成功')

            } else {
                alert(res.data.message)
            }
        })


}

var authkey = ""
var authiv = ""
const GetKeyRequest = {
    Lang: "tw"
}
function GetKey() {
    const api1 = `${import.meta.env.VITE_APP_API}API_App/MemberData/LoginEncrypt`
    axios.post(api1, GetKeyRequest)
        .then((res) => {
            if (res.data.success) {
                authkey = res.data.Key
                authiv = res.data.IV
                console.log("key:" + authkey + "，iv:" + authiv)
                //console.log(res.data)
            } else {
                console.log(res.data.message)
            }
        })
        .catch((error) => console.log(error))
}
function encrypt(word, keyStr, ivStr) {
    keyStr = keyStr ? keyStr : "absoietlj32fai12";
    ivStr = ivStr ? ivStr : "absoietlj32fai12";
    let key = CryptoJS.enc.Utf8.parse(keyStr);
    let iv = CryptoJS.enc.Utf8.parse(ivStr);
    let srcs = CryptoJS.enc.Utf8.parse(word);

    let encrypted = CryptoJS.AES.encrypt(srcs, key, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.ZeroPadding
    });
    return encrypted.toString();
}

const WebLoginRequest = {
    u_id: '',
    RA: '',
    Lang: "tw"
}
function WebLogin() {
    const api1 = `${import.meta.env.VITE_APP_API}API_App/MemberData/WebLogin`
    var uid = user.u_id;
    var pwd = user.RA;
    var RA = encrypt("0000000000000000" + `${import.meta.env.VITE_APP_PROJECT};` + pwd + ";" + dayjs().format('YYYY-MM-DD HH:mm:ss') + ";",authkey,authiv);
    //console.log(`${import.meta.env.VITE_APP_PROJECT};` + pwd + ";" + dayjs().format('YYYY-MM-DD HH:mm:ss') + ";")
    WebLoginRequest.u_id = uid;
    WebLoginRequest.RA = RA;

    axios.post(api1, WebLoginRequest)
        .then((res) => {
            if (res.data.success) {
                console.log(res.data);
                $cookies.set("random", res.data.AuthToken, 0);
                //console.log(res.data)
            } else {
                console.log(res.data.message)
            }
        })
        .catch((error) => console.log(error))
}

function testauth() {
    const api1 = `${import.meta.env.VITE_APP_API}API_App/MemberData/GetData`;
    if ($cookies.get("random") != null) {
        const testtt = {
            u_id: user.u_id,
            AuthCode: '0',
            Lang: "tw"
        }

        axios.post(api1, testtt, {
                headers: {
                    Authorization: 'Bearer ' + $cookies.get("random")
                }
            })
            .then((res) => {
                if (res.data.success) {
                    console.log(res.data);
                } else {
                    console.log(res.data.message)
                }
            })
            .catch((error) => console.log(error))
    }
}

onMounted(() => {
    GetKey()
    console.log(`${import.meta.env.VITE_APP_PROJECT};`);
})
</script>
