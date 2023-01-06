import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios';
import router from '../router';
import dayjs from 'dayjs';
import CryptoJS from "crypto-js";


//會員資料
export const useMemberStore = defineStore('Member', () => {
  const MemberData = ref([{}])
  const api = `${import.meta.env.VITE_APP_API}API_App/MemberData/GetData`;
  axios.post(api, { "u_id": $cookies.get('u_id'), "AuthCode": '0', "Lang": $cookies.get('Lang') }, {
    headers: {
      Authorization: 'Bearer ' + $cookies.get("random")
    }
  })
    .then((res) => {
      MemberData.value = res.data
    })

  return { MemberData }
})


// 活動報名
export const useSignUpStore = defineStore('SignUp', () => {
  const signUpData = ref([{}])

  const api = `${import.meta.env.VITE_APP_API}API_App/MemberData/GetData`;
  axios.post(api, { "u_id": $cookies.get('u_id'), "AuthCode": '0', "Lang": $cookies.get('Lang') }, {
    headers: {
      Authorization: 'Bearer ' + $cookies.get("random")
    }
  })
    .then((res) => {
      signUpData.value = res.data
    })

  return { signUpData }
})





//登入
export const useLoginStore = defineStore('Login', () => {
  const att = ref(true)
  const att2 = ref(false)
  const loginStatue = ref(false)
  const logoutStatue = ref(true)
  const User = {
    u_id: "",
    RA: "",
    Lang: "tw"
  }

  //取得動態加密key
  var authkey = ""
  var authiv = ""
  const GetKeyRequest = {
    Lang: "tw"
  }
  function GetKey() {
    const api1 = `${import.meta.env.VITE_APP_API}API_App/MemberData/LoginEncrypt`
    axios.post(api1, GetKeyRequest)
      .then((res) => {
        if (res.data.success) {
          authkey = res.data.Key
          authiv = res.data.IV
        } else {
          console.log(res.data.message)
        }
      })
      .catch((error) => console.log(error))
  }

  //js加密
  function encrypt(word, keyStr, ivStr) {
    keyStr = keyStr ? keyStr : "absoietlj32fai12";
    ivStr = ivStr ? ivStr : "absoietlj32fai12";
    let key = CryptoJS.enc.Utf8.parse(keyStr);
    let iv = CryptoJS.enc.Utf8.parse(ivStr);
    let srcs = CryptoJS.enc.Utf8.parse(word);

    let encrypted = CryptoJS.AES.encrypt(srcs, key, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.ZeroPadding
    });
    return encrypted.toString();
  }

  const WebLoginRequest = {
    u_id: '',
    RA: '',
    Lang: "tw"
  }
  //登入
  function WebLogin() {
    const api1 = `${import.meta.env.VITE_APP_API}API_App/MemberData/WebLogin`
    var uid = User.u_id;
    var pwd = User.RA;
    var RA = encrypt("0000000000000000" + `${import.meta.env.VITE_APP_PROJECT};` + pwd + ";" + dayjs().format('YYYY-MM-DD HH:mm:ss') + ";", authkey, authiv);
    WebLoginRequest.u_id = uid;
    WebLoginRequest.RA = RA;

    axios.post(api1, WebLoginRequest)
      .then((res) => {
        if (res.data.success) {
          console.log(res.data);
          $cookies.set("random", res.data.AuthToken, 0);
          $cookies.set("u_id", res.data.Uid, 0);
          router.push('/')
          if ($cookies.isKey("random") == true && $cookies.isKey("u_id") == true) {
            att.value = true
            att2.value = false
          } else {
            att.value = false
            att2.value = true
          }
        } else {
          console.log(res.data.message)
        }
      })
      .catch((error) => console.log(error))
  }

  return { WebLogin, GetKey, User, att, att2, loginStatue, logoutStatue, authkey, authiv }
})
