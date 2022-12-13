<template>
    <div class="page_main">
        <main>
            <div class="page_content">
                <section class="loginTopIcon">
                    <div class="loginBigIcon"><img src="../assets/img/LoginBigIcon.svg" alt=""></div>
                </section>
                <section class="loginContentBox">
                    <div class="ContentBoxTitle">會員註冊</div>
                    <div class="PageTitle">設定密碼</div>
                    <input type="password" name="singupPW" placeholder="請輸入設定密碼" class="Inputset100"
                        v-model="user.password">
                    <div class="PageTitle">確認設定密碼</div>
                    <input type="password" name="singupPW" placeholder="請輸入確認設定密碼" class="Inputset100">

                    <div class="page_confirm_input">
                        <label>
                            <input type="checkbox" name="confirm_lre" id="">
                            <span>我已詳細閱讀並同意</span>
                        </label>
                        <span class="pagelabelText">
                            <RouterLink to="">會員條款</RouterLink>
                        </span>

                    </div>
                    <div class="Boxbarbuttem2">
                        <button class="pageButtem" @click="signUpCheck()">確認送出</button>
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

function signUpCheck() {
    const api3 = `${import.meta.env.VITE_APP_API}API_App/MemberData/Register`
    axios.post(api3, {
        "Email": $cookies.get('u_id'),
        "Password": user.value.password,
        "Lang": ""
    }).then((res) => {
        if (res.data.success) {
            $cookies.remove("u_id")
            alert('註冊成功')
            router.push('/login')
        } else {
            alert(res.data.message)
        }
        console.log(res)
    })
}

</script>
