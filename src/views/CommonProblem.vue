<template>
    <div class="page_main">
        <main>
            <div class="page_content">
                <div class="CalendarContentBox">
                    <div class="question_Box" :class="{ active: Question === idex }" v-for="(Qas,idex) in QA"
                        :key="idex" @click="opqabar(idex)">
                        <div class="question_bar ">
                            <div class="question_barText">{{ Qas.title }}</div>
                        </div>
                        <div class="Answer_box">{{ Qas.answer }}</div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>
<script setup>
import { ref } from "vue"
const Question = ref(0);
const QA = ref([
    {
        title: '常見問題一：分級制度?',
        answer: '神這斗唱吃坐會可海立遠泉，苦旦對何着原；汁肖里讀次燈見間員發兒急訴春直愛清魚，像起牛。神這斗唱吃坐會可海立遠泉，苦旦對何着原；汁肖里讀次燈見間員發兒急訴春直愛清魚，像起牛。神這斗唱吃坐會可海立遠泉，苦旦對何着原；汁肖里讀次燈見間員發兒急訴春直愛清魚，像起牛。神這斗唱吃坐會可海立遠泉，苦旦對何着原；汁肖里讀次燈見間員發兒急訴春直愛清魚，像起牛。',
    },
    {
        title: '常見問題二：分級制度?',
        answer: '神這斗唱吃坐會可海立遠泉，苦旦對何着原；汁肖里讀次燈見間員發兒急訴春直愛清魚，像起牛。神這斗唱吃坐會可海立遠泉，苦旦對何着原；汁肖里讀次燈見間員發兒急訴春直愛清魚，像起牛。神這斗唱吃坐會可海立遠泉，苦旦對何着原；汁肖里讀次燈見間員發兒急訴春直愛清魚，像起牛。神這斗唱吃坐會可海立遠泉，苦旦對何着原；汁肖里讀次燈見間員發兒急訴春直愛清魚，像起牛。',
    },
    {
        title: '常見問題三：分級制度?',
        answer: '神這斗唱吃坐會可海立遠泉，苦旦對何着原；汁肖里讀次燈見間員發兒急訴春直愛清魚，像起牛。神這斗唱吃坐會可海立遠泉，苦旦對何着原；汁肖里讀次燈見間員發兒急訴春直愛清魚，像起牛。神這斗唱吃坐會可海立遠泉，苦旦對何着原；汁肖里讀次燈見間員發兒急訴春直愛清魚，像起牛。神這斗唱吃坐會可海立遠泉，苦旦對何着原；汁肖里讀次燈見間員發兒急訴春直愛清魚，像起牛。',
    },
    {
        title: '常見問題四：分級制度?',
        answer: '神這斗唱吃坐會可海立遠泉，苦旦對何着原；汁肖里讀次燈見間員發兒急訴春直愛清魚，像起牛。神這斗唱吃坐會可海立遠泉，苦旦對何着原；汁肖里讀次燈見間員發兒急訴春直愛清魚，像起牛。神這斗唱吃坐會可海立遠泉，苦旦對何着原；汁肖里讀次燈見間員發兒急訴春直愛清魚，像起牛。神這斗唱吃坐會可海立遠泉，苦旦對何着原；汁肖里讀次燈見間員發兒急訴春直愛清魚，像起牛。',
    },
    {
        title: '常見問題五：分級制度?',
        answer: '神這斗唱吃坐會可海立遠泉，苦旦對何着原；汁肖里讀次燈見間員發兒急訴春直愛清魚，像起牛。神這斗唱吃坐會可海立遠泉，苦旦對何着原；汁肖里讀次燈見間員發兒急訴春直愛清魚，像起牛。神這斗唱吃坐會可海立遠泉，苦旦對何着原；汁肖里讀次燈見間員發兒急訴春直愛清魚，像起牛。神這斗唱吃坐會可海立遠泉，苦旦對何着原；汁肖里讀次燈見間員發兒急訴春直愛清魚，像起牛。',
    }
]);

const opqabar = (idex) => {
    Question.value = idex;
};

</script>