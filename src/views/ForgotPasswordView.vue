<template>
    <div class="page_main">
        <main>
            <div class="page_content">
                <section class="loginTopIcon">
                    <div class="loginBigIcon"><img src="../assets/img/LoginBigIcon.svg" alt=""></div>
                </section>
                <section class="loginContentBox">
                    <div class="ContentBoxTitle">忘記密碼</div>
                    <div class="signup_User_account">
                        <input type="text" class="signup_User_accountInput" placeholder="請輸入6-20英數字元" required
                            v-model="user.Email">
                    </div>
                    <div class="Boxbarmessage">請輸入註冊時使用的電子信箱，我們會將新密碼傳送至信箱，請登入立即修改密碼。</div>
                    <div class="Boxbarbuttem2">
                        <button class="pageButtem" @click="forgotPassword()">確認送出</button>

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
    }
)
function forgotPassword() {
    const api = `${import.meta.env.VITE_APP_API}API_App/MemberData/ForgetPassword`;
    axios.post(api, {
        "u_id": user.value.Email,
        "Lang": "string"
    }).then((res) => {
        console.log(res)
        if (res.data.success) {
            alert('發送成功')
            router.push('/login')
        } else {
            alert(res.data.message)
        }
    })
}


</script>