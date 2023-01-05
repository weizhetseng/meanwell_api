<template>
  <div class="page_main">
    <main>
      <div class="page_content">
        <div class="indexPageTitle">{{ $t('MainTitle') }}</div>
        <section class="indexActivityBar">
          <div class="indAct_item_Box">
            <ul class="indAct_ul01">
              <li v-for="item in indexLink" :key="item.id">
                <router-link :to="`/Course/Meeting/${item.route}`">
                  <div class="atcImgBox">
                    <img :src="imageUrl(item.imgUrl)" alt="" />

                  </div>
                  <div class="atcText" :style="{ color: item.color }">
                    {{ $t(item.link) }}
                  </div>
                </router-link>
              </li>
            </ul>
            <ul class="indAct_ul02">
              <li>
                <router-link to="#">
                  <div class="atcImgBox">
                    <img src="../assets/img/activity_4.svg" alt="" />
                  </div>
                  <div class="atcText CaringCare">{{ $t('IndexLink4') }}</div>
                </router-link>
              </li>
              <li>
                <router-link to="#">
                  <div class="atcImgBox">
                    <img src="../assets/img/activity_5.svg" alt="" />
                  </div>
                  <div class="atcText GiftingPlatform">{{ $t('IndexLink5') }}</div>
                </router-link>
              </li>
            </ul>
          </div>
        </section>
        <section class="AnnouncementSystem">
          <div class="AnnouncementSystemBox">
            <ul>
              <li>
                <div class="AnnTop">
                  <div class="AnnTopIcon">
                    <img class="messageIcon" src="../assets/img/message_icon.svg" alt="" />
                  </div>
                  <div class="AnnTopText">{{ $t('IndexMsgBox1') }}</div>
                </div>
                <div class="AnnContent">
                  <ul v-if="store.logoutStatue">
                    <li class="ConferenceLine"><a href="">{{ $t('IndexRemainMsg') }}</a></li>
                  </ul>
                  <ul v-else-if="store.loginStatue">
                    <li v-for="item in PushMsgList" :key="item.mssid" :style="{ 'border-left-color': item.color }">
                      <a href="">
                        {{ item.SendTime }} {{ item.TitleName }}
                        {{ item.SubTitle }}
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              <li>
                <div class="AnnTop">
                  <div class="AnnTopIcon">
                    <img src="../assets/img/news_icon.svg" alt="" />
                  </div>
                  <div class="AnnTopText">{{ $t('IndexMsgBox2') }}</div>
                </div>
                <div class="AnnContent">
                  <ul>
                    <li v-for="(item, index) in NewsList" :style="{ 'border-left-color': item.color }" :key="index">
                      <a href="">{{ item.News_Topic }}</a>
                    </li>
                  </ul>
                </div>
              </li>
              <li>
                <div class="AnnTop">
                  <div class="AnnTopIcon">
                    <img src="../assets/img/gift.svg" alt="" />
                  </div>
                  <div class="AnnTopText">{{ $t('IndexMsgBox3') }}</div>
                </div>
                <div class="AnnContent">
                  <ul>
                    <li v-for="(item, index) in NewSaleList" :style="{ 'border-left-color': item.color }" :key="index">
                      <a href="">{{ item.News_Topic }}</a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";
import { useLoginStore } from "../stores/stores";

const indexLink = [
  {
    route: 1,
    link: "IndexLink1",
    imgUrl: "activity_1.svg",
    color: "#077E8E",
  },
  {
    route: 2,
    link: "IndexLink2",
    imgUrl: "activity_2.svg",
    color: "#649644",
  },
  {
    route: 3,
    link: "IndexLink3",
    imgUrl: "activity_3.svg",
    color: "#9CAF4A",
  },
];
const store = useLoginStore();


function imageUrl(name) {
  return new URL(`../assets/img/${name}`, import.meta.url)
    .href;
}

if ($cookies.isKey("random") == true && $cookies.isKey("u_id") == true) {
  store.loginStatue = true;
  store.logoutStatue = false;
} else {
  store.loginStatue = false;
  store.logoutStatue = true;
}
//個人推播訊息資料
const PushMsgList = ref([{}]);
// 最新動態資料清單
const NewsList = ref([{}]);
// 禮贈新品資料清單
const NewSaleList = ref([{}]);




onMounted(() => {
  //取得個人推播訊息資料
  const api1 = `${import.meta.env.VITE_APP_API}API_App/HomePage/PushMsgList`;
  axios
    .post(api1, {
      u_id: $cookies.get("u_id"),
      AuthCode: '0',
      Lang: $cookies.get("Lang"),
      SDateTime: "",
      EDateTime: "",
      Keywords: "",
    }, {
      headers: {
        Authorization: 'Bearer ' + $cookies.get("random")
      }
    })
    .then((res) => {
      PushMsgList.value = res.data.PushMsgDataList;
      console.log("api", res.data)
    })
    .catch((error) => console.log(error));

  // 最新動態資料清單
  const api2 = `${import.meta.env.VITE_APP_API}API_App/HomePage/NewsList`;
  axios
    .post(api2, {
      u_id: $cookies.get("u_id"),
      AuthCode: '0',
      Lang: $cookies.get("Lang"),
    }, {
      headers: {
        Authorization: 'Bearer ' + $cookies.get("random")
      }
    })
    .then((res) => {
      NewsList.value = res.data.DataList;
      console.log("api2", res.data)
    })
    .catch((error) => console.log(error));
  // 禮贈新品資料清單
  const api3 = `${import.meta.env.VITE_APP_API}API_App/HomePage/NewSaleList`;
  axios
    .post(api3, {
      u_id: $cookies.get("u_id"),
      AuthCode: '0',
      Lang: $cookies.get("Lang"),
    }, {
      headers: {
        Authorization: 'Bearer ' + $cookies.get("random")
      }
    })
    .then((res) => {
      NewSaleList.value = res.data.DataList;
      console.log("api3", res.data)
    })
    .catch((error) => console.log(error));
});
</script>
