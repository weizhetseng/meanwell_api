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
      console.log(MemberData)
    })

  return { MemberData }
})

export const useSignUpStore = defineStore('SignUp', () => {
  const MemberData = ref([{}])
  const signUpData = {
    u_id: $cookies.get('u_id'),
    AuthCode: $cookies.get('AuthCode'),
    Lang: $cookies.get('Lang'),
    ActId: "",
    SeId: 0,
    Identity: 0,
    JoinWay: 0,
    Name: "",
    Sex: 0,
    Mobile: "",
    Email: "",
    CompanyName: "",
    JobTitle: "",
    DocType: 0,
    DocNumber: "",
    Meals: 0,
    Traffic: 0,
    CarNumber: "",
    SignUpMemo: "",
    Ticket_E_Apply: 0,
    Ticket_P_Apply: 0,
    Address: ""
  }

  return { signUpData }
})



//登入
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
