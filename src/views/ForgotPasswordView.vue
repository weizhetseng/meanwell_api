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
          <div class="ContentBoxTitle">忘記密碼</div>
          <Form v-slot="{ errors, values, validate }">
            <div class="signup_User_account">
              <Field id="email" name="email" type="email" class="signup_User_accountInput"
                :class="{ 'is-invalid': errors['email'] }" placeholder="請輸入電子信箱" rules="email|required"
                v-model="user.Email">
              </Field>
            </div>
            <div class="error">
              <error-message name="email" class="invalid-feedback"></error-message>
            </div>
            <div class="Boxbarmessage">
              請輸入註冊時使用的電子信箱，我們會將新密碼傳送至信箱，請登入立即修改密碼。
            </div>
            <div class="Boxbarbuttem2">
              <button class="buttonStyle" @click="forgotPassword()">
                確認送出
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
