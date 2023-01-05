<template>
  <div class="page_main">
    <main class="ForgotPassword">
      <div class="page_content">
        <section class="loginTopIcon">
          <div class="loginBigIcon">
            <img src="../assets/img/LoginBigIcon.svg" alt="" />
          </div>
        </section>
        <section class="loginContentBox">
          <div class="ContentBoxTitle">{{ $t('ForgotPassword') }}</div>
          <Form v-slot="{ errors, values, validate }">
            <div class="signup_User_account">
              <Field id="email" :name="$t('__Email')" type="email" class="signup_User_accountInput"
                :class="{ 'is-invalid': errors['email'] }" :placeholder="$t('EmailInput')" rules="email|required"
                v-model="user.Email">
              </Field>
            </div>
            <div class="error">
              <error-message :name="$t('__Email')" class="invalid-feedback"></error-message>
            </div>
            <div class="Boxbarmessage">
              {{ $t('fogotText') }}
            </div>
            <div class="Boxbarbuttem2">
              <button class="buttonStyle" @click="forgotPassword()">
                {{ $t('Check') }}
              </button>
            </div>
          </Form>
        </section>
      </div>
    </main>
  </div>
</template>
<script setup>
import axios from "axios";
import { ref } from "vue";
import router from "../router";

const user = ref({
  Email: "",
});
//發送新密碼
function forgotPassword() {
  const api = `${import.meta.env.VITE_APP_API
    }API_App/MemberData/ForgetPassword`;
  axios
    .post(api, {
      u_id: user.value.Email,
      Lang: "string",
    }, {
      headers: {
        Authorization: 'Bearer ' + $cookies.get("random")
      }
    })
    .then((res) => {
      if (res.data.success) {
        alert("發送成功");
        router.push("/login");
      } else {
        alert(res.data.message);
      }
    });
}
</script>
