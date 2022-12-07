
<template>
    <div class="page_main">
        <main>
            <div class="page_content">
                <div class="indexPageTitle">多元服務，價值共享</div>
                <section class="indexActivityBar">
                    <div class="indAct_item_Box">
                        <ul>
                            <router-link to="/Course/Meeting">
                                <li>
                                    <div class="atcImgBox"><img src="../assets/img/activity_1.svg" alt=""></div>
                                    <div class="atcText Conference">會議活動</div>
                                </li>
                            </router-link>
                            <router-link to="/Course/Educate">
                                <li>
                                    <div class="atcImgBox"><img src="../assets/img/activity_2.svg" alt=""></div>
                                    <div class="atcText EducationTraining">教育訓練</div>
                                </li>
                            </router-link>
                            <router-link to="/Course/Activity">
                                <li>
                                    <div class="atcImgBox"><img src="../assets/img/activity_3.svg" alt=""></div>
                                    <div class="atcText TourGuide">活動導覽</div>
                                </li>
                            </router-link>
                            <router-link to="#">
                                <li>
                                    <div class="atcImgBox"><img src="../assets/img/activity_4.svg" alt=""></div>
                                    <div class="atcText CaringCare">關懷照護</div>
                                </li>
                            </router-link>
                            <router-link to="#">
                                <li>
                                    <div class="atcImgBox"><img src="../assets/img/activity_5.svg" alt=""></div>
                                    <div class="atcText GiftingPlatform">禮贈平台</div>
                                </li>
                            </router-link>
                        </ul>
                    </div>
                </section>
                <section class="AnnouncementSystem">
                    <div class="AnnouncementSystemBox">
                        <ul>
                            <li>
                                <div class="AnnTop">
                                    <div class="AnnTopIcon"><img class="messageIcon"
                                            src="../assets/img/message_icon.svg" alt=""></div>
                                    <div class="AnnTopText">訊息通知</div>
                                </div>
                                <div class="AnnContent">
                                    <ul>
                                        <li class="ConferenceLine"><a href="">請先登入會員</a></li>
                                    </ul>
                                    <!-- <ul v-show="store.actInLogin">
                                        <li v-for="item in PushMsgList" :key="item.mssid"
                                            :style="{ 'border-left-color': item.color }">
                                            <a href="">
                                                {{ item.SendTime }} {{ item.TitleName }} {{ item.SubTitle
                                                }}
                                            </a>
                                        </li>
                                    </ul> -->
                                </div>
                            </li>
                            <li>
                                <div class="AnnTop">
                                    <div class="AnnTopIcon"><img src="../assets/img/news_icon.svg" alt=""></div>
                                    <div class="AnnTopText">最新動態</div>
                                </div>
                                <div class="AnnContent">
                                    <ul>
                                        <li class="ConferenceLine"><a href="">請先登入會員</a></li>
                                    </ul>
                                    <!-- <ul>
                                        <li v-for="item in NewsList" :style="{ 'border-left-color': item.color }">
                                            <a href="">{{ item.News_Topic }}</a>
                                        </li>
                                    </ul> -->
                                </div>
                            </li>
                            <li>
                                <div class="AnnTop">
                                    <div class="AnnTopIcon"><img src="../assets/img/gift.svg" alt=""></div>
                                    <div class="AnnTopText">禮贈推薦</div>
                                </div>
                                <div class="AnnContent">
                                    <ul>
                                        <li class="ConferenceLine"><a href="">請先登入會員</a></li>
                                    </ul>
                                    <!-- <ul>
                                        <li v-for="item in NewSaleList" :style="{ 'border-left-color': item.color }">
                                            <a href="">{{ item.News_Topic }}</a>
                                        </li>
                                    </ul> -->
                                </div>
                            </li>
                        </ul>
                    </div>
                </section>
            </div>
        </main>
    </div>
</template>


