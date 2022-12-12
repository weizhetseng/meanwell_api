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
                        <div v-for="item in showData[0].ActSessions" :key="item.SeId">
                            <input :id="item.SeId" type="radio" name="SeId" :value="item.SeId"
                                v-model="storeSignUp.signUpData.SeId">
                            <label :for="item.SeId">{{ item.SeTitle }}</label>
                        </div>
                    </div>
                    <div class="itemTitle">
                        <div class="itemTitleLine"></div>
                        <div class="itemTitletext">餐點</div>
                    </div>
                    <div class="memberinfTextinput">
                        <input id="Meals0" type="radio" name="Meals" :value="0" v-model="storeSignUp.signUpData.Meals">
                        <label for="Meals0">葷</label>
                        <input id="Meals1" type="radio" name="Meals" :value="1" v-model="storeSignUp.signUpData.Meals">
                        <label for="Meals1">素</label>
                        <input id="Meals2" type="radio" name="Meals" :value="2" v-model="storeSignUp.signUpData.Meals">
                        <label for="Meals2">不用餐</label>
                    </div>
                    <div class="itemTitle">
                        <div class="itemTitleLine"></div>
                        <div class="itemTitletext">交通</div>
                    </div>
                    <div class="memberinfTextinput3">
                        <input id="Traffic0" type="radio" name="Traffic" v-model="storeSignUp.signUpData.Traffic">
                        <label for="Traffic0">自駕</label>
                        <input id="Traffic1" type="radio" name="Traffic" v-model="storeSignUp.signUpData.Traffic">
                        <label for="Traffic1">大眾運輸</label>
                    </div>
                    <div class="memberinfTextinput2">
                        <input type="text" name="transportation" id="" class="memberinfinput" placeholder="請輸入車牌號碼"
                            v-model="storeSignUp.signUpData.CarNumber">
                    </div>
                    <div class="itemTitle">
                        <div class="itemTitleLine"></div>
                        <div class="itemTitletext">備註</div>
                    </div>
                    <div class="CancelRegistrationtextbox"><textarea class="textBox" placeholder="請輸入備註事項"
                            v-model="storeSignUp.signUpData.SignUpMemo"></textarea>
                    </div>
                    <div class="ticket_set">
                        <div class="itemTitleLine"></div>
                        <div class="itemTitletext">電子券</div>
                        <div class="QuantityTable">
                            <div class="QuantityTable_button" @click="minusNum_elec()"><img
                                    src="../assets/img/minus.svg" alt=""></div>
                            <input class="QuantityTable_value" v-model="storeSignUp.signUpData.Ticket_E_Apply" />
                            <div class="QuantityTable_button" @click="addNum_elec()"><img src="../assets/img/plus.svg"
                                    alt=""></div>
                        </div>
                    </div>
                    <div class="ticket_set">
                        <div class="itemTitleLine"></div>
                        <div class="itemTitletext">紙本券</div>
                        <div class="QuantityTable">
                            <div class="QuantityTable_button" @click="minusNum_paper()"><img
                                    src="../assets/img/minus.svg" alt=""></div>
                            <input class="QuantityTable_value" v-model="storeSignUp.signUpData.Ticket_P_Apply" />
                            <div class="QuantityTable_button" @click="addNum_paper()"><img src="../assets/img/plus.svg"
                                    alt=""></div>
                        </div>
                    </div>
                    <div class="ticket_set">
                        <div class="itemTitleLine"></div>
                        <div class="itemTitletext">票券總張數</div>
                        <div class="votes">{{ totalNum }} 張</div>
                    </div>
                    <div class="itemTitle2">
                        <div class="itemTitleLine"></div>
                        <div class="itemTitletext">收件地址</div>
                    </div>
                    <div class="itemsS50L">
                        <select class="memberinfinput">
                            <option selected="" disabled="">請選擇縣市</option>
                            <option v-for="(item, index) in area_data" :key="index">{{ index }}</option>
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
                        <input type="text" name="" id="" class="memberinfinput" placeholder="請輸入地址"
                            v-model="storeSignUp.signUpData.Address">
                    </div>
                    <div class="Boxbarbuttem">
                        <button type="submit" class="pageButtem" @click.prevent="SignUp()">確認送出</button>
                    </div>

                </div>
            </div>
        </main>
    </div>
</template>
<script setup>
import axios from 'axios';
import { useSignUpStore } from "../stores/stores";
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router'

const area_data = {
    '臺北市': [
        '中正區', '大同區', '中山區', '萬華區', '信義區', '松山區', '大安區', '南港區', '北投區', '內湖區', '士林區', '文山區'
    ],
    '新北市': [
        '板橋區', '新莊區', '泰山區', '林口區', '淡水區', '金山區', '八里區', '萬里區', '石門區', '三芝區', '瑞芳區', '汐止區', '平溪區', '貢寮區', '雙溪區', '深坑區', '石碇區', '新店區', '坪林區', '烏來區', '中和區', '永和區', '土城區', '三峽區', '樹林區', '鶯歌區', '三重區', '蘆洲區', '五股區'
    ],
    '基隆市': [
        '仁愛區', '中正區', '信義區', '中山區', '安樂區', '暖暖區', '七堵區'
    ],
    '桃園市': [
        '桃園區', '中壢區', '平鎮區', '八德區', '楊梅區', '蘆竹區', '龜山區', '龍潭區', '大溪區', '大園區', '觀音區', '新屋區', '復興區'
    ],
    '新竹縣': [
        '竹北市', '竹東鎮', '新埔鎮', '關西鎮', '峨眉鄉', '寶山鄉', '北埔鄉', '橫山鄉', '芎林鄉', '湖口鄉', '新豐鄉', '尖石鄉', '五峰鄉'
    ],
    '新竹市': [
        '東區', '北區', '香山區'
    ],
    '苗栗縣': [
        '苗栗市', '通霄鎮', '苑裡鎮', '竹南鎮', '頭份鎮', '後龍鎮', '卓蘭鎮', '西湖鄉', '頭屋鄉', '公館鄉', '銅鑼鄉', '三義鄉', '造橋鄉', '三灣鄉', '南庄鄉', '大湖鄉', '獅潭鄉', '泰安鄉'
    ],
    '臺中市': [
        '中區', '東區', '南區', '西區', '北區', '北屯區', '西屯區', '南屯區', '太平區', '大里區', '霧峰區', '烏日區', '豐原區', '后里區', '東勢區', '石岡區', '新社區', '和平區', '神岡區', '潭子區', '大雅區', '大肚區', '龍井區', '沙鹿區', '梧棲區', '清水區', '大甲區', '外埔區', '大安區'
    ],
    '南投縣': [
        '南投市', '埔里鎮', '草屯鎮', '竹山鎮', '集集鎮', '名間鄉', '鹿谷鄉', '中寮鄉', '魚池鄉', '國姓鄉', '水里鄉', '信義鄉', '仁愛鄉'
    ],
    '彰化縣': [
        '彰化市', '員林鎮', '和美鎮', '鹿港鎮', '溪湖鎮', '二林鎮', '田中鎮', '北斗鎮', '花壇鄉', '芬園鄉', '大村鄉', '永靖鄉', '伸港鄉', '線西鄉', '福興鄉', '秀水鄉', '埔心鄉', '埔鹽鄉', '大城鄉', '芳苑鄉', '竹塘鄉', '社頭鄉', '二水鄉', '田尾鄉', '埤頭鄉', '溪州鄉'
    ],
    '雲林縣': [
        '斗六市', '斗南鎮', '虎尾鎮', '西螺鎮', '土庫鎮', '北港鎮', '莿桐鄉', '林內鄉', '古坑鄉', '大埤鄉', '崙背鄉', '二崙鄉', '麥寮鄉', '臺西鄉', '東勢鄉', '褒忠鄉', '四湖鄉', '口湖鄉', '水林鄉', '元長鄉'
    ],
    '嘉義縣': [
        '太保市', '朴子市', '布袋鎮', '大林鎮', '民雄鄉', '溪口鄉', '新港鄉', '六腳鄉', '東石鄉', '義竹鄉', '鹿草鄉', '水上鄉', '中埔鄉', '竹崎鄉', '梅山鄉', '番路鄉', '大埔鄉', '阿里山鄉'
    ],
    '嘉義市': [
        '東區', '西區'
    ],
    '臺南市': [
        '中西區', '東區', '南區', '北區', '安平區', '安南區', '永康區', '歸仁區', '新化區', '左鎮區', '玉井區', '楠西區', '南化區', '仁德區', '關廟區', '龍崎區', '官田區', '麻豆區', '佳里區', '西港區', '七股區', '將軍區', '學甲區', '北門區', '新營區', '後壁區', '白河區', '東山區', '六甲區', '下營區', '柳營區', '鹽水區', '善化區', '大內區', '山上區', '新市區', '安定區'
    ],
    '高雄市': [
        '楠梓區', '左營區', '鼓山區', '三民區', '鹽埕區', '前金區', '新興區', '苓雅區', '前鎮區', '小港區', '旗津區', '鳳山區', '大寮區', '鳥松區', '林園區', '仁武區', '大樹區', '大社區', '岡山區', '路竹區', '橋頭區', '梓官區', '彌陀區', '永安區', '燕巢區', '田寮區', '阿蓮區', '茄萣區', '湖內區', '旗山區', '美濃區', '內門區', '杉林區', '甲仙區', '六龜區', '茂林區', '桃源區', '那瑪夏區'
    ],
    '屏東縣': [
        '屏東市', '潮州鎮', '東港鎮', '恆春鎮', '萬丹鄉', '長治鄉', '麟洛鄉', '九如鄉', '里港鄉', '鹽埔鄉', '高樹鄉', '萬巒鄉', '內埔鄉', '竹田鄉', '新埤鄉', '枋寮鄉', '新園鄉', '崁頂鄉', '林邊鄉', '南州鄉', '佳冬鄉', '琉球鄉', '車城鄉', '滿州鄉', '枋山鄉', '霧台鄉', '瑪家鄉', '泰武鄉', '來義鄉', '春日鄉', '獅子鄉', '牡丹鄉', '三地門鄉'
    ],
    '宜蘭縣': [
        '宜蘭市', '羅東鎮', '蘇澳鎮', '頭城鎮', '礁溪鄉', '壯圍鄉', '員山鄉', '冬山鄉', '五結鄉', '三星鄉', '大同鄉', '南澳鄉'
    ],
    '花蓮縣': [
        '花蓮市', '鳳林鎮', '玉里鎮', '新城鄉', '吉安鄉', '壽豐鄉', '秀林鄉', '光復鄉', '豐濱鄉', '瑞穗鄉', '萬榮鄉', '富里鄉', '卓溪鄉'
    ],
    '臺東縣': [
        '臺東市', '成功鎮', '關山鎮', '長濱鄉', '海端鄉', '池上鄉', '東河鄉', '鹿野鄉', '延平鄉', '卑南鄉', '金峰鄉', '大武鄉', '達仁鄉', '綠島鄉', '蘭嶼鄉', '太麻里鄉'
    ],
    '澎湖縣': [
        '馬公市', '湖西鄉', '白沙鄉', '西嶼鄉', '望安鄉', '七美鄉'
    ],
    '金門縣': [
        '金城鎮', '金湖鎮', '金沙鎮', '金寧鄉', '烈嶼鄉', '烏坵鄉'
    ],
    '連江縣': [
        '南竿鄉', '北竿鄉', '莒光鄉', '東引鄉'
    ]
}
const ticketNum_elec = ref(0)
const ticketNum_paper = ref(0)
const route = useRoute()
const id = route.params.id

const storeSignUp = useSignUpStore()

const ListData = ref([{}])
const showData = ref([{}])
const totalNum = computed(() => {
    return parseInt(ticketNum_elec.value) + parseInt(ticketNum_paper.value)
})




function SignUp() {
    const SignUpApi = `${import.meta.env.VITE_APP_API}API_App/HomePage/ActivitySignUp`
    axios.post(SignUpApi, storeSignUp.signUpData)
        .then((res) => {
            console.log(res)
            if (res.data.success) {
                alert('報名成功')
                route.push('/')
            } else {
                alert(res.data.message)
            }
        })
}
function addNum_elec() {
    ticketNum_elec.value++
}
function minusNum_elec() {
    ticketNum_elec.value--
    if (ticketNum_elec.value < 0) {
        alert('數量不可小於0')
        ticketNum_elec.value = 0
    }
}
function addNum_paper() {
    ticketNum_paper.value++
}
function minusNum_paper() {
    ticketNum_paper.value--
    if (ticketNum_paper.value < 0) {
        alert('數量不可小於0')
        ticketNum_paper.value = 0
    }
}

onMounted(() => {
    const api = `${import.meta.env.VITE_APP_API}API_App/HomePage/ActivityList`
    axios.post(api, { "u_id": $cookies.get('u_id'), "AuthCode": $cookies.get('AuthCode'), "Lang": $cookies.get('Lang'), "ModClass": id.slice(0, 1), "SDateTime": '', "EDateTime": '', "Keywords": '' })
        .then((res) => {
            ListData.value = res.data.ActivityDataList
            showData.value = ListData.value.filter((item) => {
                return item.ActId === id.slice(1)
            })
            console.log(showData)
        })

    storeSignUp.signUpData.u_id = $cookies.get('u_id')
    storeSignUp.signUpData.AuthCode = $cookies.get('AuthCode')
    storeSignUp.signUpData.Lang = $cookies.get('Lang')
    storeSignUp.signUpData.ActId = id.slice(1)
    storeSignUp.signUpData.Ticket_E_Apply = ticketNum_elec
    storeSignUp.signUpData.Ticket_P_Apply = ticketNum_paper


})

</script>