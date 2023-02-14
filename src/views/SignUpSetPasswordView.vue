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
                    <div class="signUpArea">
                        <input :type="checkEye1 ? 'password' : 'text'" name="singupPW" :placeholder="$t('SetPassword')"
                            class="Inputset100" v-model="user.password">
                        <span id="checkEye" class="material-symbols-outlined" @click="checkEye1 = !checkEye1">
                            {{ checkEye1? 'visibility_off': 'visibility' }}
                        </span>
                    </div>
                    <div class="PageTitle">{{ $t('password2') }}</div>
                    <div class="signUpArea">
                        <input :type="checkEye2 ? 'password' : 'text'" name="singupPW" :placeholder="$t('Setpassword2')"
                            class="Inputset100">
                        <span id="checkEye" class="material-symbols-outlined" @click="checkEye2 = !checkEye2">
                            {{ checkEye2? 'visibility_off': 'visibility' }}
                        </span>
                    </div>

                    <div class="page_confirm_input">
                        <label>
                            <input type="checkbox" name="confirm_lre" id="">
                            <span>{{ $t('agree') }}</span>
                        </label>
                        <!-- <span class="pagelabelText">
                            <RouterLink to="">{{ $t('membershipTerms') }}</RouterLink>
                        </span> -->

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
import { ref } from 'vue';
import router from '../router';
import { apiRegister } from '../utils/api';

const checkEye1 = ref(true)
const checkEye2 = ref(true)


const user = ref(
    {
        Email: '',
        password: '',
        Code: ''
    }
);

function signUpCheck() {
    apiRegister({
        "Email": $cookies.get('u_id'),
        "Password": user.value.password,
        "Lang": ""
    })
        .then((res) => {
            if (res.data.success) {
                $cookies.remove("u_id")
                alert('註冊成功')
                router.push('/login')
            } else {
                alert(res.data.message)
            }
        })
        .catch((error) => console.log(error));
}

</script>
