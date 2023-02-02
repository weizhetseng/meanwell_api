import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios';
import router from '../router';
import dayjs from 'dayjs';
import CryptoJS from "crypto-js";
import { googleTokenLogin } from 'vue3-google-login'
import { apiGetData, apiLoginEncrypt, apiWebLogin } from '../utils/api';

//會員資料
export const useMemberStore = defineStore('Member', () => {
  const att = ref(true)
  const att2 = ref(false)
  const loginStatue = ref(false)
  const logoutStatue = ref(true)
  const MemberData = ref([{}])
  function getMemberData() {
    apiGetData({ "u_id": $cookies.get('u_id'), "AuthCode": '0', "Lang": $cookies.get('Lang') })
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
  apiGetData({ "u_id": $cookies.get('u_id'), "AuthCode": '0', "Lang": $cookies.get('Lang') })
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
    apiLoginEncrypt(GetKeyRequest)
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
    var uid = User.u_id;
    var pwd = User.RA;
    var checked = User.checked
    var RA = encrypt("0000000000000000" + `${import.meta.env.VITE_APP_PROJECT};` + pwd + ";" + dayjs().format('YYYY-MM-DD HH:mm:ss') + ";", authkey, authiv);
    WebLoginRequest.u_id = uid;
    WebLoginRequest.RA = RA;
    apiWebLogin(WebLoginRequest)
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


// line 登入 
export const LineLogin = defineStore('LineLogin', () => {
  function LineLoginButton() {
    let URL = 'https://access.line.me/oauth2/v2.1/authorize?';
    URL += 'response_type=code';
    URL += `&client_id=${import.meta.env.VITE_Client_Id_Line}`;
    URL += '&redirect_uri=http://localhost:5173/login';
    URL += '&state=12345abcde';
    URL += '&prompt=consent';
    URL += '&scope=profile%20openid';
    window.location.href = URL;
  }
  function GetLineData() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('state') && urlParams.has('code')) {
      const state = urlParams.get('state');
      const authcode = urlParams.get('code');


      if (state === '12345abcde') {
        const api = 'https://api.line.me/oauth2/v2.1/token';
        const getTokenBody = {
          grant_type: 'authorization_code',
          code: authcode,
          redirect_uri: 'http://localhost:5173/login',
          client_id: `${import.meta.env.VITE_Client_Id_Line}`,
          client_secret: `${import.meta.env.VITE_Client_Secret_Line}`,
        };

        axios.post(api, getTokenBody, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
        })
          .then((res) => {
            console.log(res)
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  }
  return { LineLoginButton, GetLineData }
})

// google 登入
export const GoogleLogin = defineStore('GoogleLogin', () => {
  const GOOGLE_CLIENT_ID = `${import.meta.env.VITE_Client_Id_Google}`
  const data = ref()

  function GoogleLoginButton() {
    googleTokenLogin({
      clientId: GOOGLE_CLIENT_ID
    }).then((res) => {
      console.log(res.access_token)
      const api = `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${res.access_token}`
      axios.get(api, {
        headers: {
          'Authorization': `Bearer ${res.access_token}`
        },
      }).then((res) => {
        console.log(res)
      }).catch((err) => {
        console.log(err)
      })
    })
  }
  return { GoogleLoginButton, data }
})
// facebook 登入
export const FacebookLogin = defineStore('FacebookLogin', () => {
  function initFacebook() {
    window.fbAsyncInit = function () {
      FB.init({
        appId: `${import.meta.env.VITE_Client_Id_Facebook}`,
        cookie: true,
        xfbml: true,
        version: 'v15.0'
      });
      FB.AppEvents.logPageView();
    };
    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/zh_TW/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }
  function DataAPI() {
    FB.api('/me?fields=name,id,email', function (response) {
      console.log(response);
    });
  }
  function statusChangeCallback(response) {
    console.log(response);
    if (response.status === 'connected') {
      DataAPI();
    } else {
      console.log('沒登入')
    }
  }
  function checkLoginState() {
    FB.getLoginStatus(function (response) {
      statusChangeCallback(response);
    });
  }
  function FBlogin() {
    FB.getLoginStatus(function (res) {
      if (res.status !== "connected") {
        FB.login(function (response) {
          console.log('已登入')
        }, { scope: 'public_profile,email' });
      }
    })
  }
  function FBlogout() {
    FB.getLoginStatus(function (res) {
      if (res.status === "connected") {
        FB.api("/me/permissions", function (res) {
          FB.logout(function (response) {
            console.log('已登出')
          });
        })
      } else {
        console.log('未登入')
      }
    })

  }
  return { initFacebook, checkLoginState, FBlogin, FBlogout }
})

// wechat 登入
export const wechatLogin = defineStore('wechatLogin', () => {
  function WechatLoginButton() {
    let URL = 'https://open.weixin.qq.com/connect/qrconnect?';
    URL += `appid=${APPID}`
    URL += `&redirect_uri=${REDIRECT_URI}`
    URL += `&response_type=code`
    URL += `&scope=snsapi_login`
    URL += `&state=12345abcde#wechat_redirect`
    window.location.href = URL;
  }
  return { WechatLoginButton }
})




