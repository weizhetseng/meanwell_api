import axios from "axios";

const userRequest = axios.create({
    baseURL: `${import.meta.env.VITE_APP_API}`,
});

userRequest.interceptors.request.use(
    (request) => {
        const Cookie = document.cookie.replace(
            /(?:(?:^|.*;\s*)random\s*\=\s*([^;]*).*$)|^.*$/,
            "$1"
        );
        Cookie && (request.headers.Authorization = "Bearer " + Cookie);
        return request;
    },
    (error) => {
        return Promise.reject(error);
    }
);

//* 行事曆
//todo 取得當月已報名活動資料
export const apiGetApplyActivityDataByMonth = (data) =>
    userRequest.post("API_App/Calendar/GetApplyActivityDataByMonth", data);

//* 首頁內容
//todo 取得個人推播訊息資料
export const apiPushMsgList = (data) =>
    userRequest.post("API_App/HomePage/PushMsgList", data);
//todo 取得最新動態資料清單
export const apiNewsList = (data) =>
    userRequest.post("API_App/HomePage/NewsList", data);
//todo 取得禮贈新品資料清單
export const apiNewSaleList = (data) =>
    userRequest.post("API_App/HomePage/NewSaleList", data);
//todo SDG官網跳轉驗證碼
export const apiSDGAuthCode = (data) =>
    userRequest.post("API_App/HomePage/SDGAuthCode", data);
//todo 取得活動資料
export const apiActivityList = (data) =>
    userRequest.post("API_App/HomePage/ActivityList", data);
//todo 活動報名
export const apiActivitySignUp = (data) =>
    userRequest.post("API_App/HomePage/ActivitySignUp", data);

//* 會員中心
//todo 取得我的活動資料
export const apiMyActivityList = (data) =>
    userRequest.post("API_App/MemberData/MyActivityList", data);
//todo 取消報名
export const apiCancelApply = (data) =>
    userRequest.post("API_App/MemberData/CancelApply", data);
//todo 更新會員資料(同時適用變更密碼)
export const apiUpdateData = (data) =>
    userRequest.post("API_App/MemberData/UpdateData", data);
//todo 忘記密碼
export const apiForgetPassword = (data) =>
    userRequest.post("API_App/MemberData/ForgetPassword", data);
//todo 上傳會員個人照
export const apiMemberPicUpdate = (data) =>
    userRequest.post("API_App/MemberData/MemberPicUpdate", data);
//todo 註冊
export const apiRegister = (data) =>
    userRequest.post("API_App/MemberData/Register", data);
//todo 發送驗證碼
export const apiSendVerifyCode = (data) =>
    userRequest.post("API_App/MemberData/SendVerifyCode", data);
//todo Email驗證
export const apiEmailVerify = (data) =>
    userRequest.post("API_App/MemberData/EmailVerify", data);
//todo 電子票券取票
export const apiGetTicket = (data) =>
    userRequest.post("API_App/MemberData/GetTicket", data);
//todo 取得會員資料
export const apiGetData = (data) =>
    userRequest.post("API_App/MemberData/GetData", data);
//todo 取得動態加密key(預設5分鐘過期,登入頁進入時取得)
export const apiLoginEncrypt = (data) =>
    userRequest.post("API_App/MemberData/LoginEncrypt", data);
//todo web登入
export const apiWebLogin = (data) =>
    userRequest.post("API_App/MemberData/WebLogin", data);
//todo 取得問卷資料
export const apiGetQuestionnaireData = (data) =>
    userRequest.post("API_App/MemberData/GetQuestionnaireData", data);
//todo 回覆問卷資料
export const apiSentQuestionnaireData = (data) =>
    userRequest.post("API_App/MemberData/SentQuestionnaireData", data);

//* 系統設定
//todo 取得各條款網址
export const apiTermsLink = (data) =>
    userRequest.post("API_App/SystemSetting/TermsLink", data);

export const apicontest = (data) =>
    userRequest.post("API_APP/MemberData/contest", data);
