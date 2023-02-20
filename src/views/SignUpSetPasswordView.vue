<template>
    <div class="page_main">
        <main class="Register">
            <div class="page_content">
                <section class="loginTopIcon">
                    <div class="loginBigIcon"><img src="../assets/img/LoginBigIcon.svg" alt=""></div>
                </section>
                <Form v-slot="{ errors, values, validate }" @submit="signUpCheck()" class="loginContentBox">
                    <div class="ContentBoxTitle">{{ $t('MemberRegister') }}</div>
                    <div class="PageTitle">{{ $t('password') }}</div>
                    <div class="signUpArea">
                        <Field id="password" name="password" :label="$t('password')" :type="checkEye1 ? 'password' : 'text'"
                            :class="{ 'is-invalid': errors['password'] }" :placeholder="$t('PasswordInput')"
                            :rules="{ required: true, regex: /^[A-Z0-9]{8,20}$/i }" v-model="user.password">
                        </Field>
                        <span id="checkEye" class="material-symbols-outlined" @click="checkEye1 = !checkEye1">
                            {{ checkEye1 ? 'visibility_off' : 'visibility' }}
                        </span>
                        <div class="error">
                            <error-message name="password" class="invalid-feedback"></error-message>
                        </div>
                    </div>

                    <div class="PageTitle">{{ $t('password2') }}</div>
                    <div class="signUpArea">
                        <Field id="singupPW" name="singupPW" :label="$t('password2')"
                            :type="checkEye2 ? 'password' : 'text'" class="Inputset100"
                            :class="{ 'is-invalid': errors['singupPW'] }" :placeholder="$t('Setpassword2')"
                            rules="required|confirmed:@password">
                        </Field>
                        <span id="checkEye" class="material-symbols-outlined" @click="checkEye2 = !checkEye2">
                            {{ checkEye2 ? 'visibility_off' : 'visibility' }}
                        </span>
                        <div class="error">
                            <error-message name="singupPW" class="invalid-feedback"></error-message>
                        </div>
                    </div>

                    <div class="termsArea">
                        <h3>{{ $t('membershipTerms') }}</h3>
                        <iframe frameborder="0" style="background: transparent; width: 100%; height:200px;"
                            :src="`https://demo18.e-giant.com.tw/Terms/${$cookies.get('Lang')}_UserClauseWeb.asp`">
                        </iframe>
                    </div>

                    <div class="page_confirm_input">

                        <label>
                            <Field type="checkbox" :name="$t('membershipTerms')" :value="true"
                                :class="{ 'is-invalid': errors['membershipTerms'] }" rules="requiredCheckbox"></Field>
                            <span>{{ $t('agree') }}</span>
                        </label>

                        <div class="error">
                            <error-message :name="$t('membershipTerms')" class="invalid-feedback"></error-message>
                        </div>
                    </div>

                    <div class="Boxbarbutton">
                        <button type="submit" class="buttonStyle">{{ $t('Check') }}</button>
                    </div>
                </Form>
            </div>
        </main>
    </div>
</template>


<script setup>
import { onMounted, ref } from 'vue';
import router from '../router';
import { apiRegister, apiTermsLink } from '../utils/api';

import { defineRule } from 'vee-validate';

const checkEye1 = ref(true)
const checkEye2 = ref(true)
const url = ref("")


defineRule('requiredCheckbox', value => {
    if (!value && $cookies.get("Lang") === "tw") {
        return '請勾選同意條款';
    } else if (!value && $cookies.get("Lang") === "en") {
        return 'Please agree to the terms';
    } else if (!value && $cookies.get("Lang") === "cn") {
        return '请勾选同意条款';
    }
    return true;
});


const user = ref(
    {
        Email: '',
        password: '',
        Code: ''
    }
);

function signUpCheck() {
    if (!checkbox123.checked) {
        alert('請按同意')
    } else {
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

}

onMounted(() => {
    apiTermsLink({
        u_id: "",
        AuthCode: "",
        Lang: $cookies.get("Lang")
    })
        .then((res) => {
            url.value = res.data.MemberManageLink
        })
        .catch((err) => {
            console.log(err)
        })
})

</script>
