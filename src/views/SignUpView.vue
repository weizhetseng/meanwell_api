<template>
    <div class="page_main">
        <main class="signUp">
            <div class="page_content">
                <section class="loginTopIcon">
                    <div class="loginBigIcon"><img src="../assets/img/LoginBigIcon.svg" alt=""></div>
                </section>
                <section class="loginContentBox">
                    <Form v-slot="{ errors, values, validate }">
                        <div class="ContentBoxTitle">{{ $t('MemberRegister') }}</div>
                        <div class="signup_User_account">
                            <Field id="email" :name="$t('__Email')" type="email" class="signup_User_accountInput"
                                :class="{ 'is-invalid': errors['email'] }" :placeholder="$t('EmailInput')"
                                rules="email|required" v-model="user.Email"></Field>
                            <error-message :name="$t('__Email')" class="invalid-feedback"></error-message>
                        </div>
                        <div class="VerificationCodeBar">
                            <div class="VerifCodeTitle">{{ $t('RegisterCode') }}</div>
                            <div class="verificationCode">
                                <Field id="Code" :name="$t('RegisterCode')" type="text" class="verificationCodeInput"
                                    :class="{ 'is-invalid': errors['RegisterCode'] }"
                                    :placeholder="$t('RegisterCodeInput')" rules="required" v-model="user.Code"></Field>
                                <button type="submit" class="verificationCodeButtem" @click="sendCode()">{{
                                    $t('RegisterCodeSend')
                                }}</button>
                            </div>
                            <error-message :name="$t('RegisterCode')" class="invalid-feedback"></error-message>
                        </div>
                        <div class="Boxbarbutton">
                            <button type="submit" class="buttonStyle" @click="verify()">{{ $t('NextStep') }}</button>
                        </div>
                    </Form>

                </section>
            </div>
        </main>
    </div>
</template>


<script setup>
import axios from 'axios';
import { ref } from 'vue';
import router from '../router';
const user = ref(
    {
        Email: '',
        password: '',
        Code: ''
    }
);
const usererrmessage = ref('')
const usererrmessage2 = ref('')




function sendCode() {
    if (user.value.Email == '') {
        usererrmessage.value = '?????????????????????'
        usererrmessage2.value = ''
    } else {
        usererrmessage.value = ''
        usererrmessage2.value = '??????10?????????????????????E-mail?????????????????????'
    }

    //  ???????????????
    const api1 = `${import.meta.env.VITE_APP_API}API_App/MemberData/SendVerifyCode`
    axios.post(api1, {
        "Type": 1,
        "Email": user.value.Email,
        "Lang": ""
    }, {
        headers: {
            Authorization: 'Bearer ' + $cookies.get("random")
        }
    })
        .then((res) => {
            if (res.data.success) {
                alert('????????????')

            } else {
                alert(res.data.message)
            }
        })
        .catch((error) => console.log(error));
}

function verify() {
    // Email??????
    const api2 = `${import.meta.env.VITE_APP_API}API_App/MemberData/EmailVerify`
    axios.post(api2, {
        "Type": 1,
        "Email": user.value.Email,
        "Code": user.value.Code,
        "Lang": ""
    }, {
        headers: {
            Authorization: 'Bearer ' + $cookies.get("random")
        }
    }).then((res) => {
        if (res.data.success) {
            alert('????????????')
            router.push('/SignUpSetPassword')
            $cookies.set("u_id", `${user.value.Email}`)
        } else {
            alert(res.data.message)
        }
    })
        .catch((error) => console.log(error));
}


</script>