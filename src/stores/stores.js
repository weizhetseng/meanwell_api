import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios';
import router from '../router';
import dayjs from 'dayjs';
import CryptoJS from "crypto-js";


//會員資料
export const useMemberStore = defineStore('Member', () => {
  const att = ref(true)
  const att2 = ref(false)
  const loginStatue = ref(false)
  const logoutStatue = ref(true)
  const MemberData = ref([{}])
  function getMemberData() {
    const api = `${import.meta.env.VITE_APP_API}API_App/MemberData/GetData`;
    axios.post(api, { "u_id": $cookies.get('u_id'), "AuthCode": '0', "Lang": $cookies.get('Lang') }, {
      headers: {
        Authorization: 'Bearer ' + $cookies.get("random")
      }
    })
      .then((res) => {
        MemberData.value = res.data
        let checkNum = res.data.message.substr(0, 2)
        if (checkNum == '91' || checkNum == '92' || checkNum == '93' || checkNum == '94' || checkNum == '95' || checkNum == '96') {
          Logout()
        }
      })
      .catch((error) => console.log(error))
  }

  function Logout() {
    $cookies.remove("u_id")
    $cookies.remove("random")
    alert('已登出')
    att.value = false
    att2.value = true
    router.push('/login')
  }
  return { MemberData, getMemberData }
})


// 活動報名
export const useSignUpStore = defineStore('SignUp', () => {
  const att = ref(true)
  const att2 = ref(false)
  const loginStatue = ref(false)
  const logoutStatue = ref(true)
  const sendData = ref(
    {
      u_id: $cookies.get('u_id'),
      AuthCode: "0",
      Lang: "$cookies.get('Lang')",
      ActId: "",
      SeId: -1,
      Identity: -1,
      JoinWay: -1,
      Name: "",
      Sex: 0,
      Mobile: "",
      Email: "",
      CompanyName: "",
      JobTitle: "",
      DocType: 0,
      DocNumber: "",
      Meals: -1,
      Traffic: -1,
      CarNumber: "",
      SignUpMemo: "",
      Ticket_E_Apply: 0,
      Ticket_P_Apply: 0,
      Address: "",
      Pic: ""
    }
  )

  const api = `${import.meta.env.VITE_APP_API}API_App/MemberData/GetData`;
  axios.post(api, { "u_id": $cookies.get('u_id'), "AuthCode": '0', "Lang": $cookies.get('Lang') }, {
    headers: {
      Authorization: 'Bearer ' + $cookies.get("random")
    }
  })
    .then((res) => {
      sendData.value.Name = res.data.Name
      sendData.value.Sex = res.data.Sex
      sendData.value.Mobile = res.data.Mobile
      sendData.value.Email = res.data.Email
      sendData.value.CompanyName = res.data.CompanyName
      sendData.value.JobTitle = res.data.JobTitle
      sendData.value.DocType = res.data.DocType
      sendData.value.DocNumber = res.data.DocNumber
      sendData.value.Pic = res.data.Pic
      let checkNum = res.data.message.substr(0, 2)
      if (checkNum == '91' || checkNum == '92' || checkNum == '93' || checkNum == '94' || checkNum == '95' || checkNum == '96') {
        Logout()
      }
    })
    .catch((error) => console.log(error))


  function Logout() {
    $cookies.remove("u_id")
    $cookies.remove("random")
    alert('已登出')
    att.value = false
    att2.value = true
    router.push('/login')
  }

  return { sendData }
})


//登入
export const LoginOut = defineStore('LoginOut', () => {
  const att = ref(true)
  const att2 = ref(false)
  const loginStatue = ref(false)
  const logoutStatue = ref(true)
  const User = {
    u_id: "",
    RA: "",
    Lang: "tw",
    checked: false
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
        let checkNum = res.data.message.substr(0, 2)
        if (checkNum == '91' || checkNum == '92' || checkNum == '93' || checkNum == '94' || checkNum == '95' || checkNum == '96') {
          Logout()
        }
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
    var checked = User.checked
    var RA = encrypt("0000000000000000" + `${import.meta.env.VITE_APP_PROJECT};` + pwd + ";" + dayjs().format('YYYY-MM-DD HH:mm:ss') + ";", authkey, authiv);
    WebLoginRequest.u_id = uid;
    WebLoginRequest.RA = RA;
    axios.post(api1, WebLoginRequest)
      .then((res) => {
        if (res.data.success) {
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

  //登出
  function Logout() {
    $cookies.remove("u_id")
    $cookies.remove("random")
    alert('已登出')
    att.value = false
    att2.value = true
    router.push('/login')
  }

  return { WebLogin, GetKey, User, att, att2, loginStatue, logoutStatue, authkey, authiv, Logout }
})
