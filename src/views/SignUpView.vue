<template>
    <div class="page_main">
        <main>
            <div class="page_content">
                <section class="loginTopIcon">
                    <div class="loginBigIcon"><img src="../assets/img/LoginBigIcon.svg" alt=""></div>
                </section>
                <section class="loginContentBox">
                    <div class="ContentBoxTitle">會員註冊</div>
                    <div class="signup_User_account">
                        <input type="email" class="signup_User_accountInput" placeholder="請輸入電子信箱" required
                            v-model="user.Email">
                        <div class="signup_User_err">{{ usererrmessage }}</div>
                        <div class="signup_User_sett">{{ usererrmessage2 }}</div>
                    </div>
                    <div class="VerificationCodeBar">
                        <div class="VerifCodeTitle">驗證碼</div>
                        <div class="verificationCode">
                            <input type="text" class="verificationCodeInput" v-model="user.Code">
                            <button class="verificationCodeButtem" @click="sendCode()">發送驗證碼</button>
                        </div>

                    </div>
                    <div class="Boxbarbuttem">
                        <button type="submit" class="pageButtem" @click="verify()">下一步</button>
                    </div>

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
        usererrmessage.value = '請輸入電子郵件'
        usererrmessage2.value = ''
    } else {
        usererrmessage.value = ''
        usererrmessage2.value = '請於10分鐘內，至您的E-mail信箱取得驗證碼'
    }

    //  發送驗證碼
    const api1 = `${import.meta.env.VITE_APP_API}API_App/MemberData/SendVerifyCode`
    axios.post(api1, {
        "Type": 1,
        "Email": user.value.Email,
        "Lang": ""
    })
        .then((res) => {
            if (res.data.success) {
                alert('發送成功')

            } else {
                alert(res.data.message)
            }
        })
}

function verify() {
    // Email驗證
    const api2 = `${import.meta.env.VITE_APP_API}API_App/MemberData/EmailVerify`
    axios.post(api2, {
        "Type": 1,
        "Email": user.value.Email,
        "Code": user.value.Code,
        "Lang": ""
    }).then((res) => {
        if (res.data.success) {
            alert('驗證成功')
            router.push('/SignUpSetPassword')
            $cookies.set("u_id", `${user.value.Email}`)
        } else {
            alert(res.data.message)
        }
    })
}


</script>