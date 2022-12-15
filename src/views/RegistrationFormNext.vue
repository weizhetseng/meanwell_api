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
                        <select class="memberinfinput" v-model="state.frameworksIdx">
                            <option selected="" disabled="">請選擇縣市</option>
                            <option v-for="(item, index) in state.frameworks" :value="index">{{ item.counties }}
                            </option>
                        </select>
                    </div>
                    <div class="itemsS50R">
                        <select class="memberinfinput" v-model="state.contentsIdx">
                            <option selected="" disabled="">請選擇行政區</option>
                            <option v-for="(item, index) in pickContents" :value="index"> {{ item.name }}</option>

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


const state = reactive({
    frameworksIdx: 0,
    contentsIdx: 0,
    frameworks: [
        {
            counties: '台北市',
            contents: [{ name: '中正區' }, { name: '大同區' }, { name: '中山區' }, { name: '松山區' }, { name: '大安區' }, { name: '萬華區' }, { name: '信義區' },
            { name: '士林區' }, { name: '北投區' }, { name: '內湖區' }, { name: '南港區' }, { name: '文山區' },],
        },
        {
            counties: '基隆市',
            contents: [{ name: '仁愛區' }
                , { name: '信義區' }, { name: '中正區' }, { name: '中山區' }, { name: '安樂區' }, { name: '暖暖區' }, { name: '七堵區' },

            ],
        },
        {
            counties: '新北市',
            contents: [
                { name: '萬里區' }, { name: '金山區' }, { name: '板橋區' }, { name: '汐止區' }, { name: '深坑區' }, { name: '石碇區' }, { name: '瑞芳區' }, { name: '平溪區' },
                { name: '雙溪區' }, { name: '貢寮區' }, { name: '新店區' }, { name: '坪林區' }, { name: '烏來區' }, { name: '永和區' }, { name: '中和區' }, { name: '土城區' },
                { name: '三峽區' }, { name: '樹林區' }, { name: '鶯歌區' }, { name: '三重區' }, { name: '新莊區' }, { name: '泰山區' }, { name: '林口區' }, { name: '蘆洲區' },
                { name: '五股區' }, { name: '八里區' }, { name: '淡水區' }, { name: '三芝區' }, { name: '石門區' },

            ],
        },
        {
            counties: '宜蘭縣',
            contents: [
                { name: '宜蘭市' }, { name: '頭城鎮' }, { name: '礁溪鄉' }, { name: '壯圍鄉' }, { name: '員山鄉' }, { name: '羅東鎮' }, { name: '三星鄉' }, { name: '大同鄉' },
                { name: '五結鄉' }, { name: '冬山鄉' }, { name: '蘇澳鎮' }, { name: '南澳鄉' }, { name: '釣魚台列嶼' },

            ],
        },
        {
            counties: '桃園市',
            contents: [
                { name: '中壢區' }, { name: '平鎮區' }, { name: '龍潭區' }, { name: '楊梅區' }, { name: '新屋區' }, { name: '觀音區' }, { name: '桃園區' }, { name: '龜山區' },
                { name: '八德區' }, { name: '大溪區' }, { name: '復興區' }, { name: '大園區' }, { name: '蘆竹區' },


            ],
        },
        {
            counties: '新竹市',
            contents: [
                { name: '東區' }, { name: '北區' }, { name: '香山區' },


            ],
        },
        {
            counties: '新竹縣',
            contents: [
                { name: '竹北市' }, { name: '湖口鄉' }, { name: '新豐鄉' }, { name: '新埔鎮' }, { name: '關西鎮' }, { name: '芎林鄉' }, { name: '寶山鄉' },
                { name: '竹東鎮' }, { name: '五峰鄉' }, { name: '橫山鄉' }, { name: '尖石鄉' }, { name: '北埔鄉' }, { name: '峨眉鄉' },


            ],
        },
        {
            counties: '苗栗縣',
            contents: [
                { name: '竹南鎮' }, { name: '頭份市' }, { name: '三灣鄉' }, { name: '南庄鄉' }, { name: '獅潭鄉' }, { name: '後龍鎮' }, { name: '通霄鎮' }, { name: '苑裡鎮' },
                { name: '苗栗市' }, { name: '造橋鄉' }, { name: '頭屋鄉' }, { name: '公館鄉' }, { name: '大湖鄉' }, { name: '泰安鄉' },
                { name: '銅鑼鄉' }, { name: '三義鄉' }, { name: '西湖鄉' }, { name: '卓蘭鎮' },

            ],
        },
        {
            counties: '台中市',
            contents: [
                { name: '中區' }, { name: '東區' }, { name: '南區' }, { name: '西區' }, { name: '北區' }, { name: '北屯區' }, { name: '西屯區' }, { name: '南屯區' }, { name: '太平區' },
                { name: '大里區' }, { name: '霧峰區' }, { name: '烏日區' }, { name: '豐原區' }, { name: '后里區' }, { name: '石岡區' }, { name: '東勢區' }, { name: '和平區' },
                { name: '新社區' }, { name: '潭子區' }, { name: '大雅區' }, { name: '神岡區' }, { name: '大肚區' }, { name: '沙鹿區' }, { name: '龍井區' }, { name: '梧棲區' },
                { name: '清水區' }, { name: '大甲區' }, { name: '外埔區' }, { name: '大安區' },


            ],
        },
        {
            counties: '彰化縣',
            contents: [
                { name: '彰化市' }, { name: '芬園鄉' }, { name: '花壇鄉' }, { name: '秀水鄉' }, { name: '鹿港鎮' }, { name: '福興鄉' }, { name: '線西鄉' }, { name: '和美鎮' },
                { name: '伸港鄉' }, { name: '員林市' }, { name: '社頭鄉' }, { name: '永靖鄉' }, { name: '埔心鄉' }, { name: '溪湖鎮' }, { name: '大村鄉' }, { name: '埔鹽鄉' },
                { name: '田中鎮' }, { name: '北斗鎮' }, { name: '田尾鄉' }, { name: '埤頭鄉' }, { name: '溪州鄉' }, { name: '竹塘鄉' }, { name: '二林鎮' }, { name: '大城鄉' },
                { name: '芳苑鄉' }, { name: '二水鄉' },


            ],
        },
        {
            counties: '南投縣',
            contents: [
                { name: '南投市' }, { name: '中寮鄉' }, { name: '草屯鎮' }, { name: '國姓鄉' }, { name: '埔里鎮' }, { name: '仁愛鄉' }, { name: '名間鄉' }, { name: '集集鎮' },
                { name: '水里鄉' }, { name: '魚池鄉' }, { name: '信義鄉' }, { name: '竹山鎮' }, { name: '鹿谷鄉' },


            ],
        },
        {
            counties: '嘉義市',
            contents: [
                { name: '東區' }, { name: '西區' },
            ],
        },
        {
            counties: '嘉義縣',
            contents: [
                { name: '番路鄉' }, { name: '梅山鄉' }, { name: '竹崎鄉' }, { name: '阿里山' }, { name: '中埔鄉' }, { name: '大埔鄉' }, { name: '水上鄉' },
                { name: '鹿草鄉' }, { name: '太保市' }, { name: '朴子市' }, { name: '東石鄉' }, { name: '六腳鄉' }, { name: '新港鄉' }, { name: '民雄鄉' }, { name: '大林鎮' },
                { name: '溪口鄉' }, { name: '義竹鄉' }, { name: '布袋鎮' },
            ],
        },
        {
            counties: '雲林縣',
            contents: [
                { name: '斗南鎮' }, { name: '大埤鄉' }, { name: '虎尾鎮' }, { name: '土庫鎮' }, { name: '褒忠鄉' }, { name: '東勢鄉' }, { name: '台西鄉' }, { name: '崙背鄉' },
                { name: '麥寮鄉' }, { name: '斗六市' }, { name: '林內鄉' }, { name: '古坑鄉' }, { name: '莿桐鄉' }, { name: '西螺鎮' }, { name: '二崙鄉' }, { name: '北港鎮' },
                { name: '水林鄉' }, { name: '口湖鄉' }, { name: '四湖鄉' }, { name: '元長鄉' },
            ],
        },
        {
            counties: '台南市',
            contents: [
                { name: '中西區' }, { name: '東區' }, { name: '南區' }, { name: '北區' }, { name: '安平區' }, { name: '安南區' }, { name: '永康區' }, { name: '歸仁區' }, { name: '新化區' },
                { name: '左鎮區' }, { name: '玉井區' }, { name: '楠西區' }, { name: '南化區' }, { name: '仁德區' }, { name: '關廟區' }, { name: '龍崎區' }, { name: '官田區' },
                { name: '麻豆區' }, { name: '佳里區' }, { name: '西港區' }, { name: '七股區' }, { name: '將軍區' }, { name: '學甲區' }, { name: '北門區' }, { name: '新營區' },
                { name: '後壁區' }, { name: '白河區' }, { name: '東山區' }, { name: '六甲區' }, { name: '下營區' }, { name: '柳營區' }, { name: '鹽水區' }, { name: '善化區' },
                { name: '大內區' }, { name: '山上區' }, { name: '新市區' }, { name: '安定區' },

            ],
        },
        {
            counties: '高雄市',
            contents: [
                { name: '新興區' }, { name: '前金區' }, { name: '苓雅區' }, { name: '鹽埕區' }, { name: '鼓山區' }, { name: '旗津區' }, { name: '前鎮區' }, { name: '三民區' },
                { name: '楠梓區' }, { name: '小港區' }, { name: '左營區' }, { name: '仁武區' }, { name: '大社區' }, { name: '東沙群島' }, { name: '南沙群島' }, { name: '岡山區' },
                { name: '路竹區' }, { name: '阿蓮區' }, { name: '田寮區' }, { name: '燕巢區' }, { name: '橋頭區' }, { name: '梓官區' }, { name: '彌陀區' }, { name: '永安區' },
                { name: '湖內區' }, { name: '鳳山區' }, { name: '大寮區' }, { name: '林園區' }, { name: '鳥松區' }, { name: '大樹區' }, { name: '旗山區' }, { name: '美濃區' },
                { name: '六龜區' }, { name: '內門區' }, { name: '杉林區' }, { name: '甲仙區' }, { name: '桃源區' }, { name: '那瑪夏區' }, { name: '茂林區' }, { name: '茄萣區' },

            ],
        },
        {
            counties: '澎湖縣',
            contents: [
                { name: '馬公市' }, { name: '西嶼鄉' }, { name: '望安鄉' }, { name: '七美鄉' }, { name: '白沙鄉' }, { name: '湖西鄉' },

            ],
        },
        {
            counties: '金門縣',
            contents: [
                { name: '金沙鎮' }, { name: '金湖鎮' }, { name: '金寧鄉' }, { name: '金城鎮' }, { name: '烈嶼鄉' }, { name: '烏坵鄉' },

            ],
        },
        {
            counties: '屏東縣',
            contents: [
                { name: '屏東市' }, { name: '三地門鄉' }, { name: '霧台鄉' }, { name: '瑪家鄉' }, { name: '九如鄉' }, { name: '里港鄉' }, { name: '高樹鄉' }, { name: '鹽埔鄉' },
                { name: '長治鄉' }, { name: '麟洛鄉' }, { name: '竹田鄉' }, { name: '內埔鄉' }, { name: '萬丹鄉' }, { name: '潮州鎮' }, { name: '泰武鄉' }, { name: '來義鄉' },
                { name: '萬巒鄉' }, { name: '崁頂鄉' }, { name: '新埤鄉' }, { name: '南州鄉' }, { name: '林邊鄉' }, { name: '東港鎮' }, { name: '琉球鄉' }, { name: '佳冬鄉' },
                { name: '新園鄉' }, { name: '枋寮鄉' }, { name: '枋山鄉' }, { name: '春日鄉' }, { name: '獅子鄉' }, { name: '車城鄉' }, { name: '牡丹鄉' }, { name: '恆春鎮' },
                { name: '滿州鄉' },

            ],
        },
        {
            counties: '台東縣',
            contents: [
                { name: '台東市' }, { name: '綠島鄉' }, { name: '蘭嶼鄉' }, { name: '延平鄉' }, { name: '卑南鄉' }, { name: '鹿野鄉' }, { name: '關山鎮' }, { name: '海端鄉' },
                { name: '池上鄉' }, { name: '東河鄉' }, { name: '成功鎮' }, { name: '長濱鄉' }, { name: '太麻里' }, { name: '金峰鄉' }, { name: '大武鄉' }, { name: '達仁鄉' },

            ],
        },
        {
            counties: '花蓮縣',
            contents: [
                { name: '花蓮市' }, { name: '新城鄉' }, { name: '秀林鄉' }, { name: '吉安鄉' }, { name: '壽豐鄉' }, { name: '鳳林鎮' }, { name: '光復鄉' }, { name: '豐濱鄉' },
                { name: '瑞穗鄉' }, { name: '萬榮鄉' }, { name: '玉里鎮' }, { name: '卓溪鄉' }, { name: '富里鄉' },


            ],
        }, {
            counties: '連江縣',
            contents: [
                { name: '南竿鄉' }, { name: '北竿鄉' }, { name: '莒光鄉' }, { name: '東引鄉' },

            ]
        },
    ]
})

const pickContents = computed(() => {
    return state.frameworks[state.frameworksIdx].contents;
})
watch(() => state.frameworksIdx, (value) => {
    state.contentsIdx = 0;
})

function SignUp() {
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