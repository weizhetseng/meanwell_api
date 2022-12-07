import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios';
import router from '../router';



//登入
export const useLoginStore = defineStore('Login', () => {
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
        }
      })
  }

  return { loginData, fakeUser }
})
