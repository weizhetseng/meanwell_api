import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios';
import router from '../router';


//會員資料
export const useMemberStore = defineStore('Member', () => {
  const MemberData = ref([{}])
  const api = `${import.meta.env.VITE_APP_API}API_App/MemberData/GetData`;
  axios.post(api, { "u_id": $cookies.get('u_id'), "AuthCode": $cookies.get('AuthCode'), "Lang": $cookies.get('Lang') })
    .then((res) => {
      MemberData.value = res.data
    })

  return { MemberData }
})


// 活動報名
export const useSignUpStore = defineStore('SignUp', () => {
  const signUpData = ref([{}])

  const api = `${import.meta.env.VITE_APP_API}API_App/MemberData/GetData`;
  axios.post(api, { "u_id": $cookies.get('u_id'), "AuthCode": $cookies.get('AuthCode'), "Lang": $cookies.get('Lang') })
    .then((res) => {
      signUpData.value = res.data
    })

  return { signUpData }
})





//登入(目前寫死假資料)
export const useLoginStore = defineStore('Login', () => {
  const att = ref(true)
  const att2 = ref(false)
  const loginStatue = ref(false)
  const logoutStatue = ref(true)
  const fakeUser = {
    u_id: "ronlu057@gmail.com",
    AuthCode: "5459952541",
    Lang: "tw"
  }
  function loginData() {
    const api = `${import.meta.env.VITE_APP_API}API_App/MemberData/GetData`;
    axios.post(api, fakeUser)
      .then((res) => {
        if (res.data.success) {
          $cookies.set("u_id", `${fakeUser.u_id}`)
          $cookies.set("AuthCode", `${fakeUser.AuthCode}`)
          $cookies.set("Lang", `${fakeUser.Lang}`)
          alert('登入成功')
          router.push('/')
          if ($cookies.isKey("AuthCode") == true && $cookies.isKey("u_id") == true) {
            att.value = true
            att2.value = false
          } else {
            att.value = false
            att2.value = true
          }
        }
      })
  }

  return { loginData, fakeUser, att, att2, loginStatue, logoutStatue }
})
