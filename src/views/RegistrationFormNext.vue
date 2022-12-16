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
                    <div v-if="showData[0].IsMeals">
                        <div class="itemTitle">
                            <div class="itemTitleLine"></div>
                            <div class="itemTitletext">餐點</div>
                        </div>
                        <div class="memberinfTextinput">
                            <input id="Meals0" type="radio" name="Meals" :value="0"
                                v-model.number="storeSignUp.signUpData.Meals">
                            <label for="Meals0">葷</label>
                            <input id="Meals1" type="radio" name="Meals" :value="1"
                                v-model.number="storeSignUp.signUpData.Meals">
                            <label for="Meals1">素</label>
                            <input id="Meals2" type="radio" name="Meals" :value="2"
                                v-model.number="storeSignUp.signUpData.Meals">
                            <label for="Meals2">不用餐</label>
                        </div>
                    </div>

                    <div class="itemTitle">
                        <div class="itemTitleLine"></div>
                        <div class="itemTitletext">交通</div>
                    </div>
                    <div class="memberinfTextinput3">
                        <input id="Traffic0" type="radio" name="Traffic" :value="0"
                            v-model="storeSignUp.signUpData.Traffic">
                        <label for="Traffic0">自駕</label>
                        <input id="Traffic1" type="radio" name="Traffic" :value="1"
                            v-model="storeSignUp.signUpData.Traffic">
                        <label for="Traffic1">大眾運輸</label>
                    </div>
                    <div class="memberinfTextinput2" v-if="storeSignUp.signUpData.Traffic === 0">
                        <input type="text" name="transportation" id="CarNumber" class="memberinfinput"
                            placeholder="請輸入車牌號碼" v-model="storeSignUp.signUpData.CarNumber">
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
                            <input type="tel" class="QuantityTable_value"
                                v-model="storeSignUp.signUpData.Ticket_P_Apply" />
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
                        <select class="memberinfinput" id="countieList"
                            @change="switchView($event.target.selectedIndex)" v-model="storeSignUp.signUpData.Address1">
                            <option disabled>請選擇縣市</option>
                            <option v-for="(item, index) in counties" :key="index" :value="item">{{ item
                            }}</option>
                        </select>
                    </div>
                    <div class="itemsS50R">
                        <select class="memberinfinput" id="districtsList" v-model="storeSignUp.signUpData.Address2">
                            <option disabled>請選擇行政區</option>
                            <option v-for="(item, index) in showData2[0]" :key="index">{{ item }}</option>

                        </select>
                    </div>
                    <div class="memberinfTextinput">
                        <input type="text" name="" id="Address" class="memberinfinput" placeholder="請輸入地址"
                            v-model="storeSignUp.signUpData.Address3">
                    </div>
                    <div class="Boxbarbuttem">
                        <button type="submit" class="pageButtem" @click.prevent="checkInput()">確認送出</button>
                    </div>

                </div>
            </div>
        </main>
    </div>
</template>
<script setup>
import axios from 'axios';
import { useSignUpStore, useMemberStore } from "../stores/stores";
import { computed, onMounted, reactive, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router'
const ticketNum_elec = ref(0)
const ticketNum_paper = ref(0)
const route = useRoute()
const router = useRouter()
const id = route.params.id

const storeMember = useMemberStore()
const storeSignUp = useSignUpStore()

const ListData = ref([{}])
const showData = ref([{}])
const totalNum = computed(() => {
    return parseInt(ticketNum_elec.value) + parseInt(ticketNum_paper.value)
})

const counties = ['台北市', '基隆市', '新北市', '宜蘭縣', '桃園市', '新竹市', '新竹縣', '苗栗縣',
    '台中市', '彰化縣', '南投縣', '嘉義市', '嘉義縣', '雲林縣', '台南市', '高雄市',
    '澎湖縣', '金門縣', '屏東縣', '台東縣', '花蓮縣', '連江縣'];
const districts = [
    // 台北市
    ['中正區', '大同區', '中山區', '松山區', '大安區', '萬華區', '信義區',
        '士林區', '北投區', '內湖區', '南港區', '文山區'],
    // 基隆市
    ['仁愛區', '信義區', '中正區', '中山區', '安樂區', '暖暖區', '七堵區'],
    // 新北市
    ['萬里區', '金山區', '板橋區', '汐止區', '深坑區', '石碇區', '瑞芳區', '平溪區',
        '雙溪區', '貢寮區', '新店區', '坪林區', '烏來區', '永和區', '中和區', '土城區',
        '三峽區', '樹林區', '鶯歌區', '三重區', '新莊區', '泰山區', '林口區', '蘆洲區',
        '五股區', '八里區', '淡水區', '三芝區', '石門區'],
    // 宜蘭縣
    ['宜蘭市', '頭城鎮', '礁溪鄉', '壯圍鄉', '員山鄉', '羅東鎮', '三星鄉', '大同鄉',
        '五結鄉', '冬山鄉', '蘇澳鎮', '南澳鄉', '釣魚台列嶼'],
    // 桃園市
    ['中壢區', '平鎮區', '龍潭區', '楊梅區', '新屋區', '觀音區', '桃園區', '龜山區',
        '八德區', '大溪區', '復興區', '大園區', '蘆竹區'],
    // 新竹市
    ['東區', '北區', '香山區'],
    // 新竹縣
    ['竹北市', '湖口鄉', '新豐鄉', '新埔鎮', '關西鎮', '芎林鄉', '寶山鄉',
        '竹東鎮', '五峰鄉', '橫山鄉', '尖石鄉', '北埔鄉', '峨眉鄉'],
    // 苗栗縣
    ['竹南鎮', '頭份市', '三灣鄉', '南庄鄉', '獅潭鄉', '後龍鎮', '通霄鎮', '苑裡鎮',
        '苗栗市', '造橋鄉', '頭屋鄉', '公館鄉', '大湖鄉', '泰安鄉',
        '銅鑼鄉', '三義鄉', '西湖鄉', '卓蘭鎮'],
    // 台中市
    ['中區', '東區', '南區', '西區', '北區', '北屯區', '西屯區', '南屯區', '太平區',
        '大里區', '霧峰區', '烏日區', '豐原區', '后里區', '石岡區', '東勢區', '和平區',
        '新社區', '潭子區', '大雅區', '神岡區', '大肚區', '沙鹿區', '龍井區', '梧棲區',
        '清水區', '大甲區', '外埔區', '大安區'],
    // 彰化縣
    ['彰化市', '芬園鄉', '花壇鄉', '秀水鄉', '鹿港鎮', '福興鄉', '線西鄉', '和美鎮',
        '伸港鄉', '員林市', '社頭鄉', '永靖鄉', '埔心鄉', '溪湖鎮', '大村鄉', '埔鹽鄉',
        '田中鎮', '北斗鎮', '田尾鄉', '埤頭鄉', '溪州鄉', '竹塘鄉', '二林鎮', '大城鄉',
        '芳苑鄉', '二水鄉'],
    // 南投縣
    ['南投市', '中寮鄉', '草屯鎮', '國姓鄉', '埔里鎮', '仁愛鄉', '名間鄉', '集集鎮',
        '水里鄉', '魚池鄉', '信義鄉', '竹山鎮', '鹿谷鄉'],
    // 嘉義市
    ['東區', '西區'],
    // 嘉義縣
    ['番路鄉', '梅山鄉', '竹崎鄉', '阿里山', '中埔鄉', '大埔鄉', '水上鄉',
        '鹿草鄉', '太保市', '朴子市', '東石鄉', '六腳鄉', '新港鄉', '民雄鄉', '大林鎮',
        '溪口鄉', '義竹鄉', '布袋鎮'],
    // 雲林縣
    ['斗南鎮', '大埤鄉', '虎尾鎮', '土庫鎮', '褒忠鄉', '東勢鄉', '台西鄉', '崙背鄉',
        '麥寮鄉', '斗六市', '林內鄉', '古坑鄉', '莿桐鄉', '西螺鎮', '二崙鄉', '北港鎮',
        '水林鄉', '口湖鄉', '四湖鄉', '元長鄉'],
    // 台南市
    ['中西區', '東區', '南區', '北區', '安平區', '安南區', '永康區', '歸仁區', '新化區',
        '左鎮區', '玉井區', '楠西區', '南化區', '仁德區', '關廟區', '龍崎區', '官田區',
        '麻豆區', '佳里區', '西港區', '七股區', '將軍區', '學甲區', '北門區', '新營區',
        '後壁區', '白河區', '東山區', '六甲區', '下營區', '柳營區', '鹽水區', '善化區',
        '大內區', '山上區', '新市區', '安定區'],
    // 高雄市
    ['新興區', '前金區', '苓雅區', '鹽埕區', '鼓山區', '旗津區', '前鎮區', '三民區',
        '楠梓區', '小港區', '左營區', '仁武區', '大社區', '東沙群島', '南沙群島', '岡山區',
        '路竹區', '阿蓮區', '田寮區', '燕巢區', '橋頭區', '梓官區', '彌陀區', '永安區',
        '湖內區', '鳳山區', '大寮區', '林園區', '鳥松區', '大樹區', '旗山區', '美濃區',
        '六龜區', '內門區', '杉林區', '甲仙區', '桃源區', '那瑪夏區', '茂林區', '茄萣區'],
    // 澎湖縣
    ['馬公市', '西嶼鄉', '望安鄉', '七美鄉', '白沙鄉', '湖西鄉'],
    // 金門縣
    ['金沙鎮', '金湖鎮', '金寧鄉', '金城鎮', '烈嶼鄉', '烏坵鄉'],
    // 屏東縣
    ['屏東市', '三地門鄉', '霧台鄉', '瑪家鄉', '九如鄉', '里港鄉', '高樹鄉', '鹽埔鄉',
        '長治鄉', '麟洛鄉', '竹田鄉', '內埔鄉', '萬丹鄉', '潮州鎮', '泰武鄉', '來義鄉',
        '萬巒鄉', '崁頂鄉', '新埤鄉', '南州鄉', '林邊鄉', '東港鎮', '琉球鄉', '佳冬鄉',
        '新園鄉', '枋寮鄉', '枋山鄉', '春日鄉', '獅子鄉', '車城鄉', '牡丹鄉', '恆春鎮',
        '滿州鄉'],
    // 台東縣
    ['台東市', '綠島鄉', '蘭嶼鄉', '延平鄉', '卑南鄉', '鹿野鄉', '關山鎮', '海端鄉',
        '池上鄉', '東河鄉', '成功鎮', '長濱鄉', '太麻里', '金峰鄉', '大武鄉', '達仁鄉'],
    // 花蓮縣
    ['花蓮市', '新城鄉', '秀林鄉', '吉安鄉', '壽豐鄉', '鳳林鎮', '光復鄉', '豐濱鄉',
        '瑞穗鄉', '萬榮鄉', '玉里鎮', '卓溪鄉', '富里鄉'],
    // 連江縣
    ['南竿鄉', '北竿鄉', '莒光鄉', '東引鄉'],
]
const showData2 = ref([])

function switchView(selectedIndex) {
    showData2.value = districts.filter((item, index) => {
        return index === (selectedIndex - 1)
    })
}



function SignUp() {
    storeSignUp.signUpData.Address = (storeSignUp.signUpData.Address1 + storeSignUp.signUpData.Address2 + storeSignUp.signUpData.Address3)
    const SignUpApi = `${import.meta.env.VITE_APP_API}API_App/HomePage/ActivitySignUp`
    axios.post(SignUpApi, storeSignUp.signUpData)
        .then((res) => {
            if (res.data.success) {
                alert('報名成功')
                storeSignUp.signUpData = storeMember.MemberData
                router.push('/')
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

function checkInput() {
    const checkSeId = ref(false);
    const checkMeals = ref(false);
    const checkTraffic = ref(false);
    const SeId = document.getElementsByName('SeId');
    const Meals = document.getElementsByName('Meals');
    const Traffic = document.getElementsByName('Traffic');
    const CarNumber = document.getElementById('CarNumber');
    const Address = document.getElementById('Address');
    const countieList = document.getElementById('countieList');
    const districtsList = document.getElementById('districtsList')

    for (var i = 0; i < SeId.length; i++) {
        if (SeId[i].checked) {
            checkSeId.value = true;
            break;
        }
    }
    for (var i = 0; i < Meals.length; i++) {
        if (Meals[i].checked) {
            checkMeals.value = true;
            break;
        }
    }
    for (var i = 0; i < Traffic.length; i++) {
        if (Traffic[i].checked) {
            checkTraffic.value = true;
            break;
        }
    }
    if (checkSeId.value == false) {
        alert('請選擇場次')
        return false;
    } else if (showData.value[0].IsMeals && checkMeals.value == false) {
        alert('請選擇餐點')
        return false;
    } else if (checkTraffic.value == false) {
        alert('請選擇交通')
        return false;
    } else if (storeSignUp.signUpData.Traffic === 0 && CarNumber.value == '') {
        alert('請輸入車牌號碼')
        return false;
    } else if (totalNum.value == 0) {
        alert('總票數不可為0')
        return false;
    } else if (countieList.value === '請選擇縣市' && districtsList === '請選擇行政區') {
        alert('請選擇縣市行政區')
        return false;
    } else if (ticketNum_paper.value !== 0 && Address.value == '') {
        alert('請輸入地址')
        return false;
    } else {
        SignUp()
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

        })

    if (!showData.value[0].IsMeals) {
        storeSignUp.signUpData.Meals = 2
    }

    storeSignUp.signUpData.u_id = $cookies.get('u_id')
    storeSignUp.signUpData.AuthCode = $cookies.get('AuthCode')
    storeSignUp.signUpData.Lang = $cookies.get('Lang')
    storeSignUp.signUpData.ActId = id.slice(1)
    storeSignUp.signUpData.Ticket_E_Apply = ticketNum_elec
    storeSignUp.signUpData.Ticket_P_Apply = ticketNum_paper



})

</script>