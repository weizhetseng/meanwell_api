<template>
  <div class="page_main">
    <main>
      <div class="page_content">
        <div class="indexPageTitle">{{ $t('MainTitle') }}</div>
        <section class="indexActivityBar">
          <div class="indAct_item_Box" :class="{ indAct_item_BoxEN: $cookies.get('Lang') == 'en' }">
            <ul class="indAct_ul01" v-if="$cookies.get('Lang') == 'tw'">
              <li v-for="item in indexLinkTW" :key="item.id">
                <router-link :to="`/Course/Meeting/${item.route}`">
                  <div class="atcImgBox">
                    <img :src="imageUrl(item.imgUrl)" alt="" />
                  </div>
                </router-link>
              </li>
            </ul>
            <ul class="indAct_ul01" v-else-if="$cookies.get('Lang') == 'cn'">
              <li v-for="item in indexLinkCN" :key="item.id">
                <router-link :to="`/Course/Meeting/${item.route}`">
                  <div class="atcImgBox">
                    <img :src="imageUrl(item.imgUrl)" alt="" />
                  </div>
                </router-link>
              </li>
            </ul>
            <ul class="indAct_ul01" v-else-if="$cookies.get('Lang') == 'en'">
              <li v-for="item in indexLinkEN" :key="item.id">
                <router-link :to="`/Course/Meeting/${item.route}`">
                  <div class="atcImgBox">
                    <img :src="imageUrl(item.imgUrl)" alt="" />
                  </div>
                </router-link>
              </li>
            </ul>
            <!-- <ul class="indAct_ul02">
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
                </ul> -->
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
                    <li class="ConferenceLine"><router-link to="/login">{{ $t('IndexRemainMsg') }}</router-link></li>
                  </ul>
                  <ul v-else-if="store.loginStatue">
                    <li v-for="item in PushMsgList" :key="item.mssid" :style="{ 'border-left-color': item.color }">
                      <a href="/" v-if="item.ContentData === 'HOMEPAGE'">
                        {{ item.SendTime }} {{ item.TitleName }}
                        {{ item.SubTitle }}
                      </a>
                      <router-link :to="`/ActivitiesOngoing/${item.ContentData.split('_')[2]}`"
                        v-else-if="item.ContentData.substring(0, 14) === 'MyActivityList' && item.ContentData.split('_')[1] === '1'">
                        {{ item.SendTime }} {{ item.TitleName }}
                        {{ item.SubTitle }}
                      </router-link>
                      <router-link :to="`/ActivitiesCancelled/${item.ContentData.split('_')[2]}`"
                        v-else-if="item.ContentData.substring(0, 14) === 'MyActivityList' && item.ContentData.split('_')[1] === '2'">
                        {{ item.SendTime }} {{ item.TitleName }}
                        {{ item.SubTitle }}
                      </router-link>
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
                      <a href="#">{{ item.News_Topic }}</a>
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
                      <a href="#">{{ item.NewSale_Topic }}</a>
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
import { computed, onMounted, ref } from "vue";
import { LoginOut } from "../stores/stores";
import { apiPushMsgList, apiNewsList, apiNewSaleList } from "../utils/api";

const indexLinkTW = [
  {
    route: 1,
    link: "IndexLink1",
    imgUrl: "tw-activity.png",
  },
  {
    route: 3,
    link: "IndexLink3",
    imgUrl: "tw-class.png",
  },
  {
    route: 2,
    link: "IndexLink2",
    imgUrl: "tw-meeting.png",
  },
];
const indexLinkCN = [
  {
    route: 1,
    link: "IndexLink1",
    imgUrl: "cn-activity.png",
  },
  {
    route: 3,
    link: "IndexLink3",
    imgUrl: "cn-class.png",
  },
  {
    route: 2,
    link: "IndexLink2",
    imgUrl: "cn-meeting.png",
  },
];
const indexLinkEN = [
  {
    route: 1,
    link: "IndexLink1",
    imgUrl: "en-activity.png",
  },
  {
    route: 3,
    link: "IndexLink3",
    imgUrl: "en-class.png",
  },
  {
    route: 2,
    link: "IndexLink2",
    imgUrl: "en-meeting.png",
  },
];

const store = LoginOut();


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
const PushMsgList = ref([]);
// 最新動態資料清單
const NewsList = ref([{}]);
// 禮贈新品資料清單
const NewSaleList = ref([{}]);

onMounted(() => {
  //取得個人推播訊息資料
  apiPushMsgList({
    u_id: $cookies.get("u_id"),
    AuthCode: '0',
    Lang: $cookies.get("Lang"),
    SDateTime: "",
    EDateTime: "",
    Keywords: "",
  })
    .then((res) => {
      PushMsgList.value = res.data.PushMsgDataList;
      let checkNum = res.data.message.substr(0, 2)
      if (checkNum == '91' || checkNum == '92' || checkNum == '93' || checkNum == '94' || checkNum == '95' || checkNum == '96') {
        store.Logout()
      }
    })
    .catch((error) => console.log(error));

  // 最新動態資料清單
  apiNewsList({
    u_id: $cookies.get("u_id"),
    AuthCode: '0',
    Lang: $cookies.get("Lang"),
  })
    .then((res) => {
      NewsList.value = res.data.DataList;
      let checkNum = res.data.message.substr(0, 2)

      if (checkNum == '91' || checkNum == '92' || checkNum == '93' || checkNum == '94' || checkNum == '95' || checkNum == '96') {
        store.Logout()
      }
    })
    .catch((error) => console.log(error));

  // 禮贈新品資料清單
  apiNewSaleList({
    u_id: $cookies.get("u_id"),
    AuthCode: '0',
    Lang: $cookies.get("Lang"),
  })
    .then((res) => {
      NewSaleList.value = res.data.DataList;
      let checkNum = res.data.message.substr(0, 2)

      if (checkNum == '91' || checkNum == '92' || checkNum == '93' || checkNum == '94' || checkNum == '95' || checkNum == '96') {
        store.Logout()
      }
    })
    .catch((error) => console.log(error));

});
</script>
