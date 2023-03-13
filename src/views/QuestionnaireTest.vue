<template>
    <!-- 確認樣式的頁面 確認完樣式後直接刪除 -->
    <div :class="`${route.path.split('/')[3]}` === '1' ? 'mobile_main' : 'page_main'">
        <main>
            <div class="page_content avt">
                <div class="CourseContentBox">
                    <div class="activitiesSubtitle">滿意度調查表</div>
                    <div class="questBox">
                        <div class="questBox_item">
                            <div class="questBox_item_top_tr">
                                <div class="questBox_item_top_l">
                                    <div class="questBox_item_nb">01</div>
                                    <div class="questBox_item_titleArea">
                                        <div class="questBox_item_title">
                                            您對本次活動畫質解析度滿意程度您對本次活動畫質解析度滿意程度您對本次活動畫質解析度滿意程度
                                        </div>
                                        <div class="questBox_item_content">
                                            內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容
                                        </div>
                                    </div>
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
                                    <div class="questBox_item_titleArea">
                                        <div class="questBox_item_title">
                                            您對本次活動畫質解析度滿意程度您對本次活動畫質解析度滿意程度您對本次活動畫質解析度滿意程度
                                        </div>
                                        <div class="questBox_item_content">
                                            內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容
                                        </div>
                                    </div>
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
                                    <div class="questBox_item_titleArea">
                                        <div class="questBox_item_title">
                                            您對本次活動畫質解析度滿意程度您對本次活動畫質解析度滿意程度您對本次活動畫質解析度滿意程度
                                        </div>
                                        <div class="questBox_item_content">
                                            內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容
                                        </div>
                                    </div>
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
                                    <div class="questBox_item_titleArea">
                                        <div class="questBox_item_title">
                                            您對本次活動畫質解析度滿意程度您對本次活動畫質解析度滿意程度您對本次活動畫質解析度滿意程度
                                        </div>
                                        <div class="questBox_item_content">
                                            內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容
                                        </div>
                                    </div>
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
                                    <div class="questBox_item_titleArea">
                                        <div class="questBox_item_title">
                                            您對本次活動畫質解析度滿意程度您對本次活動畫質解析度滿意程度您對本次活動畫質解析度滿意程度
                                        </div>
                                        <div class="questBox_item_content">
                                            內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容
                                        </div>
                                    </div>
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
                                    <div class="questBox_item_titleArea">
                                        <div class="questBox_item_title">
                                            您對本次活動畫質解析度滿意程度您對本次活動畫質解析度滿意程度您對本次活動畫質解析度滿意程度
                                        </div>
                                        <div class="questBox_item_content">
                                            內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容
                                        </div>
                                    </div>
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
                                    <div class="questBox_item_titleArea">
                                        <div class="questBox_item_title">
                                            您對本次活動畫質解析度滿意程度您對本次活動畫質解析度滿意程度您對本次活動畫質解析度滿意程度
                                        </div>
                                        <div class="questBox_item_content">
                                            內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容
                                        </div>
                                    </div>
                                </div>
                                <div class="questBox_item_top_r">
                                    <div class="questBox_item_top_text">簡述</div>
                                </div>
                            </div>
                            <div class="Quest_radio_Box">
                                <textarea class="Quest_textarea" placeholder="請輸入您的意見與回饋內容"></textarea>
                            </div>
                        </div>
                        <div class="Boxbarbuttem">
                            <button class="pageButtem">提交問券</button>
                        </div>
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


</script>

