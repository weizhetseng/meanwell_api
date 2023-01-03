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
                                <Field id="email" name="email" type="email" class="User_accountInput"
                                    :class="{ 'is-invalid': errors['email'] }" :placeholder="$t('EmailInput')"
                                    rules="email|required" v-model="user.u_id">
                                </Field>
                            </div>
                            <div class="error">
                                <error-message name="email" class="invalid-feedback"></error-message>
                            </div>
                        </div>
                        <div>
                            <div class="User_password">
                                <Field id="password" name="密碼" type="password" class="User_accountInput"
                                    :class="{ 'is-invalid': errors['密碼'] }" :placeholder="$t('PasswordInput')"
                                    rules="required" v-model="user.RA">
                                </Field>
                            </div>
                            <div class="error">
                                <error-message name="密碼" class="invalid-feedback"></error-message>
                            </div>
                        </div>

                        <div class="login_confirm_input">
                            <label>
                                <Field type="checkbox" name="記住我" :value="true" :class="{ 'is-invalid': errors['記住我'] }"
                                    rules="required"></Field>
                                <span>{{ $t('RememberMe') }}</span>
                            </label>
                            <div class="ForgotPassword">
                                <RouterLink to="/ForgotPassword">{{ $t('ForgotPassword') }} ?</RouterLink>
                            </div>
                            <error-message name="記住我" class="invalid-feedback"></error-message>
                        </div>
                        <div class="buttonBox">
                            <RouterLink to="/SignUp"><button class="pageButton buttonStyle">{{ $t('Register')
}}</button></RouterLink>
                            <input type="submit" value="登入" class="loginButton buttonStyle" @click="loginent()">

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
import { useLoginStore } from '../stores/stores';
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



</script>
