<template>
    <div :class="`${route.path.split('/')[3]}` === '1' ? 'mobile_main' : 'page_main'">
        <main>
            <div class="page_content avt">
                <div class="CourseContentBox" v-if="showQuestionnaire.QnId > 0">
                    <div class="CourseinfTitle">{{ showQuestionnaire.QnSubDataList[0].QnTitle }}</div>
                    <!-- <div class="activitiesSubtitle">滿意度調查表</div> -->
                    <div class="questBox">
                        <div class="questBox_item" v-for="(TopicData, TopicIndex) in showQuestionnaire.TopicList">
                            <div class="questBox_item_top_tr">
                                <div class="questBox_item_top_l">
                                    <div class="questBox_item_nb">{{ TopicData.ToSort }}</div>
                                    <div class="questBox_item_title">{{ TopicData.ToSubDataList[0].ToTitle }}</div>
                                </div>
                                <div class="questBox_item_top_r">
                                    <div class="questBox_item_top_text">
                                        <template v-if="TopicData.ToType == 0">單選</template>
                                        <template v-else-if="TopicData.ToType == 1">複選</template>
                                        <template v-else-if="TopicData.ToType == 2">簡述</template>
                                    </div>
                                </div>
                            </div>
                            <div class="Quest_radio_Box">
                                <template v-if="TopicData.ToType == 0 && TopicData.OptionList != undefined && TopicData.OptionList.length > 0"
                                    v-for="(OptionData, OptionIndex) in TopicData.OptionList">
                                    <input :id="'option' + OptionData.OpId" type="radio" :name="'topic' + TopicData.ToId">
                                    <label :for="'option' + OptionData.OpId">{{ OptionData.OpSubDataList[0].OpTitle }}</label>
                                </template>
                                <template v-else-if="TopicData.ToType == 1 && TopicData.OptionList != undefined && TopicData.OptionList.length > 0"
                                    v-for="(OptionData, OptionIndex) in TopicData.OptionList">
                                    <input :id="'option' + OptionData.OpId" type="checkbox" :name="'topic' + TopicData.ToId">
                                    <label :for="'option' + OptionData.OpId">{{ OptionData.OpSubDataList[0].OpTitle }}</label>
                                </template>
                                <template v-else-if="TopicData.ToType == 2">
                                    <textarea class="Quest_textarea" placeholder="請輸入您的意見與回饋內容"></textarea>
                                </template>
                            </div>
                        </div>
                        <!-- <div class="questBox_item">
                            <div class="questBox_item_top_tr">
                                <div class="questBox_item_top_l">
                                    <div class="questBox_item_nb">01</div>
                                    <div class="questBox_item_title">您對本次活動畫質解析度滿意程度</div>
                                </div>
                                <div class="questBox_item_top_r">
                                    <div class="questBox_item_top_text">單選</div>
                                </div>
                            </div>
                            <div class="Quest_radio_Box">
                                <input id="gender01" type="radio" name="gender">
                                <label for="gender01">非常滿意</label>
                                <input id="gender02" type="radio" name="gender">
                                <label for="gender02">滿意</label>
                                <input id="gender03" type="radio" name="gender">
                                <label for="gender03">普通</label>
                                <input id="gender04" type="radio" name="gender">
                                <label for="gender04">不滿意</label>
                                <input id="gender05" type="radio" name="gender">
                                <label for="gender05">非常不滿意</label>
                            </div>
                        </div>
                        <div class="questBox_item">
                            <div class="questBox_item_top_tr">
                                <div class="questBox_item_top_l">
                                    <div class="questBox_item_nb">02</div>
                                    <div class="questBox_item_title">您對本次活動畫質解析度滿意程度</div>
                                </div>
                                <div class="questBox_item_top_r">
                                    <div class="questBox_item_top_text">單選</div>
                                </div>
                            </div>
                            <div class="Quest_radio_Box">
                                <input id="gender02-1" type="radio" name="gender2">
                                <label for="gender02-1">非常滿意</label>
                                <input id="gender02-2" type="radio" name="gender2">
                                <label for="gender02-2">滿意</label>
                                <input id="gender02-3" type="radio" name="gender2">
                                <label for="gender02-3">普通</label>
                                <input id="gender02-4" type="radio" name="gender2">
                                <label for="gender02-4">不滿意</label>
                                <input id="gender02-5" type="radio" name="gender2">
                                <label for="gender02-5">非常不滿意</label>
                            </div>
                        </div>
                        <div class="questBox_item">
                            <div class="questBox_item_top_tr">
                                <div class="questBox_item_top_l">
                                    <div class="questBox_item_nb">03</div>
                                    <div class="questBox_item_title">您對本次活動畫質解析度滿意程度</div>
                                </div>
                                <div class="questBox_item_top_r">
                                    <div class="questBox_item_top_text">單選</div>
                                </div>
                            </div>
                            <div class="Quest_radio_Box">
                                <input id="gender03-1" type="radio" name="gender3">
                                <label for="gender03-1">非常滿意</label>
                                <input id="gender03-2" type="radio" name="gender3">
                                <label for="gender03-2">滿意</label>
                                <input id="gender03-3" type="radio" name="gender3">
                                <label for="gender03-3">普通</label>
                                <input id="gender03-4" type="radio" name="gender3">
                                <label for="gender03-4">不滿意</label>
                                <input id="gender03-5" type="radio" name="gender3">
                                <label for="gender03-5">非常不滿意</label>
                            </div>
                        </div>
                        <div class="questBox_item">
                            <div class="questBox_item_top_tr">
                                <div class="questBox_item_top_l">
                                    <div class="questBox_item_nb">04</div>
                                    <div class="questBox_item_title">您對本次活動畫質解析度滿意程度</div>
                                </div>
                                <div class="questBox_item_top_r">
                                    <div class="questBox_item_top_text">單選</div>
                                </div>
                            </div>
                            <div class="Quest_radio_Box">
                                <input id="gender04-1" type="radio" name="gender4">
                                <label for="gender04-1">非常滿意</label>
                                <input id="gender04-2" type="radio" name="gender4">
                                <label for="gender04-2">滿意</label>
                                <input id="gender04-3" type="radio" name="gender4">
                                <label for="gender04-3">普通</label>
                                <input id="gender04-4" type="radio" name="gender4">
                                <label for="gender04-4">不滿意</label>
                                <input id="gender04-5" type="radio" name="gender4">
                                <label for="gender04-5">非常不滿意</label>
                            </div>
                        </div>
                        <div class="questBox_item">
                            <div class="questBox_item_top_tr">
                                <div class="questBox_item_top_l">
                                    <div class="questBox_item_nb">05</div>
                                    <div class="questBox_item_title">您對本次活動畫質解析度滿意程度</div>
                                </div>
                                <div class="questBox_item_top_r">
                                    <div class="questBox_item_top_text">複選</div>
                                </div>
                            </div>
                            <div class="Quest_radio_Box">
                                <input id="gender05-1" type="checkbox" name="gender5">
                                <label for="gender05-1">非常滿意</label>
                                <input id="gender05-2" type="checkbox" name="gender5">
                                <label for="gender05-2">滿意</label>
                                <input id="gender05-3" type="checkbox" name="gender5">
                                <label for="gender05-3">普通</label>
                                <input id="gender05-4" type="checkbox" name="gender5">
                                <label for="gender05-4">不滿意</label>
                                <input id="gender05-5" type="checkbox" name="gender5">
                                <label for="gender05-5">非常不滿意</label>
                            </div>
                        </div>
                        <div class="questBox_item">
                            <div class="questBox_item_top_tr">
                                <div class="questBox_item_top_l">
                                    <div class="questBox_item_nb">06</div>
                                    <div class="questBox_item_title">您對本次活動畫質解析度滿意程度</div>
                                </div>
                                <div class="questBox_item_top_r">
                                    <div class="questBox_item_top_text">單選</div>
                                </div>
                            </div>
                            <div class="Quest_radio_Box">
                                <input id="gender06-1" type="radio" name="gender6">
                                <label for="gender06-1">非常滿意</label>
                                <input id="gender06-2" type="radio" name="gender6">
                                <label for="gender06-2">滿意</label>
                                <input id="gender06-3" type="radio" name="gender6">
                                <label for="gender06-3">普通</label>
                                <input id="gender06-4" type="radio" name="gender6">
                                <label for="gender06-4">不滿意</label>
                                <input id="gender06-5" type="radio" name="gender6">
                                <label for="gender06-5">非常不滿意</label>
                            </div>
                        </div>
                        <div class="questBox_item">
                            <div class="questBox_item_top_tr">
                                <div class="questBox_item_top_l">
                                    <div class="questBox_item_nb">07</div>
                                    <div class="questBox_item_title">您對本次活動畫質解析度滿意程度</div>
                                </div>
                                <div class="questBox_item_top_r">
                                    <div class="questBox_item_top_text">簡述</div>
                                </div>
                            </div>
                            <div class="Quest_radio_Box">
                                <textarea class="Quest_textarea" placeholder="請輸入您的意見與回饋內容"></textarea>
                            </div>
                        </div> -->
                    </div>
                    <div class="Boxbarbuttem">
                        <button class="pageButtem">提交問券</button>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { LoginOut } from "../stores/stores";
import { useRoute } from 'vue-router';
import { apiGetQuestionnaireData } from '../utils/api';
const route = useRoute()
const store = LoginOut()

const showQuestionnaire = ref({})

onMounted(() => {
    var IsApp = route.params.IsApp;
    var Uid = route.params.Uid;
    var AuthCode = route.params.AuthCode;
    var Lang = route.params.Lang;
    var ActId = "";
    var SeId = "";
    if (route.params.id != undefined && route.params.id.split('_').length == 2) {
        ActId = route.params.id.split('_')[0];
        SeId = route.params.id.split('_')[1];
    }

    if (IsApp == 1) {//App端瀏覽，不做處理判斷，直接將訊息拋出給App處理
        apiGetQuestionnaireData({
            "u_id": Uid,
            "AuthCode": AuthCode,
            "Lang": Lang,
            "ActId": ActId,
            "SeId": SeId
        })
        .then((res) => {
            
            showQuestionnaire = res.data.QuestionnaireData;
            
        })
        .catch((error) => console.log(error));
    }
    else {
        apiGetQuestionnaireData({
            "u_id": $cookies.get('u_id'),
            "AuthCode": '0',
            "Lang": $cookies.get('Lang'),
            "ActId": ActId,
            "SeId": SeId
        })
        .then((res) => {
            let checkNum = res.data.message.substr(0, 2);
            if (parseInt(checkNum) <= 0) {//解析錯誤時回應固定訊息
                //console.log(res.data.message);
                alert("System error occurred, please try again!");
                history.back();
            }
            else if (checkNum == '91' || checkNum == '92' || checkNum == '93' || checkNum == '94' || checkNum == '95' || checkNum == '96') {
                alert(res.data.message.substr(3));
                store.Logout();
            }
            else if (checkNum != '99') {//沒有需要特殊處理的錯誤直接跳server回應的訊息
                alert(res.data.message.substr(3));
                //history.back();
            }
            else {
                showQuestionnaire.value = res.data.QuestionnaireData;
                console.log(showQuestionnaire.value)
            }
        })
        .catch((error) => {//發生例外狀況時回應固定訊息
            console.log(error);
            alert("System error occurred, please try again!");
            history.back();
        });
    }
})
</script>

