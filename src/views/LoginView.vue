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
                                <Field id="email" name="Email" :label="$t('__Email')" type="email"
                                    class="User_accountInput" :class="{ 'is-invalid': errors['Email'] }"
                                    :placeholder="$t('EmailInput')" rules="email|required" v-model="store.User.u_id">
                                </Field>
                            </div>
                            <div class="error">
                                <error-message name="Email" class="invalid-feedback"></error-message>
                            </div>
                        </div>
                        <div>
                            <div class="User_password">
                                <Field id="password" name="password" :label="$t('password')" type="password"
                                    class="User_accountInput" :class="{ 'is-invalid': errors['password'] }"
                                    :placeholder="$t('PasswordInput')" rules="required" v-model="store.User.RA">
                                </Field>
                            </div>
                            <div class="error">
                                <error-message name="password" class="invalid-feedback"></error-message>
                            </div>
                        </div>
                        <div class="login_confirm_input">
                            <label>
                                <input type="checkbox" v-model="store.User.checked">
                                <span>{{ $t('RememberMe') }}</span>
                            </label>
                            <div class="ForgotPassword">
                                <RouterLink to="/ForgotPassword">{{ $t('ForgotPassword') }} ?</RouterLink>
                            </div>
                        </div>
                        <div class="buttonBox">
                            <RouterLink to="/SignUp"><button class="pageButton buttonStyle">{{
                                $t('Register')
                            }}</button></RouterLink>
                            <input type="button" value="??????" class="loginButton buttonStyle" @click="store.WebLogin()">
                            <!-- <input type="submit" value="test" class="loginButtem" @click="WebLogin()">
                            <input type="submit" value="testauth" class="loginButtem" @click="testauth()"> -->
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
import { onMounted } from 'vue';
import { LoginOut } from '../stores/stores';

const store = LoginOut()

onMounted(() => {
    store.GetKey()
})
</script>
