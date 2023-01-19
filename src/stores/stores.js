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
      console.log('state', state, 'code', authcode);

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
            alert(error);
          });
      }
    }
  }
  return { LineLoginButton, GetLineData }
})

// google 登入
export const GoogleLogin = defineStore('GoogleLogin', () => {
  const GOOGLE_CLIENT_ID = `${import.meta.env.VITE_Client_Id_Google}`
  const GOOGLE_CLIENT_SECRET = `${import.meta.env.VITE_Client_Secret_Google}`
  function GoogleLoginButton() {
    let URL = 'https://accounts.google.com/o/oauth2/v2/auth?'
    URL += `client_id=${GOOGLE_CLIENT_ID}`
    URL += `&redirect_uri=http://localhost:5173/login`
    URL += `&response_type=code`
    URL += `&scope=https://www.googleapis.com/auth/userinfo.profile`
    URL += `&state=google1234`
    window.location.href = URL;
  }
  function GetGoogleData() {
    const urlParams_google = new URLSearchParams(window.location.search);
    if (urlParams_google.has('code') && urlParams_google.has('state')) {
      const state = urlParams_google.get('state');
      const authcode_google = urlParams_google.get('code');
      console.log('code_google', authcode_google, 'state', state);
      if (state === 'google1234') {
        const api = 'https://www.googleapis.com/oauth2/v4/token';
        const getTokenBody = {
          grant_type: 'authorization_code',
          code: authcode_google,
          redirect_uri: 'http://localhost:5173/login',
          client_id: `${GOOGLE_CLIENT_ID}`,
          client_secret: `${GOOGLE_CLIENT_SECRET}`,
        };
        axios.post(api, getTokenBody)
          .then((res) => {
            console.log(res.data.access_token)
            const api2 = `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${res.data.access_token}`
            axios.get(api2, {
              headers: {
                'Authorization': `Bearer ${res.data.access_token}`
              },
            }).then((res) => {
              console.log(res)
            }).catch((err) => {
              console.log(err)
            })
          })
          .catch((error) => {
            console.log(error);
            alert(error);
          });
      }
    }
  }
  return { GoogleLoginButton, GetGoogleData }
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
  function FacebookLoginButton() {
    // FB.getLoginStatus(function (response) {
    //   if (response.status === 'connected') {
    //     alert('已經登入')
    //   } else {
    //     FB.login(function (res) {
    //       FB.api("/me?fields=name,id,email", function (response) {
    //         console.log(response)
    //       });
    //     }, { scope: 'public_profile,email' })
    //   }
    // });
    // let URL = 'https://www.facebook.com/v15.0/dialog/oauth?'
    // URL += `client_id=${import.meta.env.VITE_Client_Id_Facebook}`
    // URL += '&redirect_uri=https://localhost:5173/login'
    // URL += '&state=Facebook1234'
    // URL += '&response_type=code'
    // window.location.href = URL;
  }
  // function GetFacebookData() {
  //   const urlParams_Facebook = new URLSearchParams(window.location.search);
  //   if (urlParams_Facebook.has('code') && urlParams_Facebook.has('state')) {
  //     const state = urlParams_Facebook.get('state');
  //     const authcode_Facebook = urlParams_Facebook.get('code');
  //     console.log('code_Facebook', authcode_Facebook, 'state', state);
  //     if (state === 'Facebook1234') {
  //       let api = 'https://graph.facebook.com/v15.0/oauth/access_token?';
  //       api += `client_id=${import.meta.env.VITE_Client_Id_Facebook}`
  //       api += '&redirect_uri=https://localhost:5173/login'
  //       api += `&client_secret=${import.meta.env.VITE_Client_Secret_Facebook}`
  //       api += `&code=${authcode_Facebook}`
  //       console.log(api)
  //       axios.get(api)
  //         .then((res) => {
  //           console.log(res)
  //         })
  //         .catch((error) => {
  //           console.log(error);
  //           alert(error);
  //         });
  //     }
  //   }
  // }
  function FacebookLogoutButton() {
    FB.getLoginStatus(function (response) {
      if (response.status === 'connected') {
        FB.api("/me/permissions", "DELETE", function (res) {
          FB.logout();
        });
      }
    });
  }
  return { initFacebook, FacebookLoginButton, FacebookLogoutButton }
})