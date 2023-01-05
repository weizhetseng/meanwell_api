<template>
    <div class="page_main">
        <main class="Register">
            <div class="page_content">
                <section class="loginTopIcon">
                    <div class="loginBigIcon"><img src="../assets/img/LoginBigIcon.svg" alt=""></div>
                </section>
                <section class="loginContentBox">
                    <div class="ContentBoxTitle">{{ $t('MemberRegister') }}</div>
                    <div class="PageTitle">{{ $t('password') }}</div>
                    <input type="password" name="singupPW" :placeholder="$t('SetPassword')" class="Inputset100"
                        v-model="user.password">
                    <div class="PageTitle">{{ $t('password2') }}</div>
                    <input type="password" name="singupPW" :placeholder="$t('SetPassword2')" class="Inputset100">

                    <div class="page_confirm_input">
                        <label>
                            <input type="checkbox" name="confirm_lre" id="">
                            <span>{{ $t('agree') }}</span>
                        </label>
                        <span class="pagelabelText">
                            <RouterLink to="">{{ $t('membershipTerms') }}</RouterLink>
                        </span>

                    </div>
                    <div class="Boxbarbutton">
                        <button class="buttonStyle" @click="signUpCheck()">{{ $t('Check') }}</button>
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
    }, {
        headers: {
            Authorization: 'Bearer ' + $cookies.get("random")
        }
    }).then((res) => {
        if (res.data.success) {
            $cookies.remove("u_id")
            alert('註冊成功')
            router.push('/login')
        } else {
            alert(res.data.message)
        }
    })
}

</script>
