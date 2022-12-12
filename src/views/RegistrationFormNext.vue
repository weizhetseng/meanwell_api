<template>
    <div class="page_main">
        <main>
            <div class="page_content avt">
                <div class="PageBreadCrumbs">
                    <ul>
                        <li>首頁</li>
                        <li>></li>
                        <li>活動列表</li>
                        <li>></li>
                        <li>{{ showData[0].ActSubject }}</li>
                        <li>></li>
                        <li>活動報名</li>
                    </ul>
                </div>
                <div class="CourseContentBox">
                    <div class="CourseinfTitle">{{ showData[0].ActSubject }}</div>
                    <div class="activitiesSubtitle">報名資料</div>
                    <div class="itemTitle">
                        <div class="itemTitleLine"></div>
                        <div class="itemTitletext">場次選擇</div>
                    </div>
                    <div class="memberinfTextinput">
                        <input id="identity01" type="radio" name="identity" checked="checked">
                        <label for="identity01">2022/11/10 09：00 ~ 12：00</label>
                        <input id="identity02" type="radio" name="identity">
                        <label for="identity02">2022/11/10 13：00 ~ 17：00</label>
                    </div>
                    <div class="itemTitle">
                        <div class="itemTitleLine"></div>
                        <div class="itemTitletext">餐點</div>
                    </div>
                    <div class="memberinfTextinput">
                        <input id="mode01" type="radio" name="mode" checked="checked">
                        <label for="mode01">素</label>
                        <input id="mode02" type="radio" name="mode">
                        <label for="mode02">葷</label>
                        <input id="mode03" type="radio" name="mode">
                        <label for="mode03">不用餐</label>
                    </div>
                    <div class="itemTitle">
                        <div class="itemTitleLine"></div>
                        <div class="itemTitletext">交通</div>
                    </div>
                    <div class="memberinfTextinput3">
                        <input id="transportation01" type="radio" name="transportation" checked="checked">
                        <label for="transportation01">自駕</label>
                        <input id="transportation02" type="radio" name="transportation">
                        <label for="transportation02">大眾運輸</label>
                    </div>
                    <div class="memberinfTextinput2">
                        <input type="text" name="transportation" id="" class="memberinfinput" placeholder="請輸入車牌號碼">
                    </div>
                    <div class="itemTitle">
                        <div class="itemTitleLine"></div>
                        <div class="itemTitletext">備註</div>
                    </div>
                    <div class="CancelRegistrationtextbox"><textarea class="textBox" placeholder="請輸入備註事項"></textarea>
                    </div>
                    <div class="ticket_set">
                        <div class="itemTitleLine"></div>
                        <div class="itemTitletext">電子券</div>
                        <div class="QuantityTable">
                            <div class="QuantityTable_button"><img src="../assets/img/minus.svg" alt=""></div>
                            <div class="QuantityTable_value">1</div>
                            <div class="QuantityTable_button"><img src="../assets/img/plus.svg" alt=""></div>
                        </div>
                    </div>
                    <div class="ticket_set">
                        <div class="itemTitleLine"></div>
                        <div class="itemTitletext">紙本券</div>
                        <div class="QuantityTable">
                            <div class="QuantityTable_button"><img src="../assets/img/minus.svg" alt=""></div>
                            <div class="QuantityTable_value">1</div>
                            <div class="QuantityTable_button"><img src="../assets/img/plus.svg" alt=""></div>
                        </div>
                    </div>
                    <div class="ticket_set">
                        <div class="itemTitleLine"></div>
                        <div class="itemTitletext">票券總張數</div>
                        <div class="votes">1 張</div>
                    </div>
                    <div class="itemTitle2">
                        <div class="itemTitleLine"></div>
                        <div class="itemTitletext">收件地址</div>
                    </div>
                    <div class="itemsS50L">
                        <select class="memberinfinput">
                            <option selected="" disabled="">請選擇縣市</option>
                            <option>台北市</option>
                            <option>新北市</option>
                            <option>桃園市</option>
                            <option>基隆市</option>
                        </select>
                    </div>
                    <div class="itemsS50R">
                        <select class="memberinfinput">
                            <option selected="" disabled="">請選擇行政區</option>
                            <option>中山區</option>
                            <option>信義區</option>
                            <option>南港區</option>
                            <option>松山區</option>
                        </select>
                    </div>
                    <div class="memberinfTextinput">
                        <input type="text" name="" id="" class="memberinfinput" placeholder="09123456789">
                    </div>
                    <div class="Boxbarbuttem">
                        <button class="pageButtem">確認送出</button>
                    </div>

                </div>
            </div>
        </main>
    </div>
</template>
<script setup>
import axios from 'axios';
import { useMemberStore, useSignUpStore } from "../stores/stores";
import { onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router'
const route = useRoute()
const id = route.params.id

const storeMember = useMemberStore()
const storeSignUp = useSignUpStore()

const ListData = ref([{}])
const showData = ref([{}])


const api = `${import.meta.env.VITE_APP_API}API_App/HomePage/ActivityList`
axios.post(api, { "u_id": $cookies.get('u_id'), "AuthCode": $cookies.get('AuthCode'), "Lang": $cookies.get('Lang'), "ModClass": id.slice(0, 1), "SDateTime": '', "EDateTime": '', "Keywords": '' })
    .then((res) => {
        ListData.value = res.data.ActivityDataList
        showData.value = ListData.value.filter((item) => {
            return item.ActId === id.slice(1)
        })
        console.log(showData.value)
    })


</script>