<template>
    <div class="page_main">
        <main>
            <div class="page_content">
                <div class="CalendarContentBox">
                    <div class="Calendar_top">
                        <div class="Monthbutton" @click="changeMonth('prev')"><img src="../assets/img/Left.svg" alt="">
                        </div>
                        <div class="Monthbutton_text">{{ dateText }}</div>
                        <div class="Monthbutton" @click="changeMonth('next')"><img src="../assets/img/right.svg" alt="">
                        </div>
                    </div>
                    <div class="Calendar_dayscontent">
                        <div class="Calendar_dayscontent_item_Week" v-for="(item, index) in weekMap" :key="index">{{
                                item
                        }}
                        </div>
                    </div>
                    <div class="Calendar_dayscontent">
                        <div class="Calendar_dayscontent_item_dayBox" v-for="(item, index) in calendarTable"
                            :key="index">
                            <div class="daybar"
                                :class="[{ 'non-current': !item.isCurrentMonth }, { today: isActive(item) }]">
                                {{ item.day }}</div>
                            <div class="Activitybar">
                                <div class="Activitybar_item"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="CalendarContentBox">
                    <div class="Activecolumn">
                        <div class="RemindDate"></div>
                        <div class="ReminderMessage"></div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>
<script setup>
import axios from 'axios';
import { computed, onMounted, ref } from 'vue';

const weekMap = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
const calendarGrid = 42;
const monthData = ref([])

let CalendarItem = [
    {
        year: '',
        month: '',
        day: '',
        isCurrentMonth: true,
        haswork: false
    }
]
//是否為閏年
function isLeap(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};
//計算月份有幾天
function getDays(year, month) {
    const feb = isLeap(year) ? 29 : 28;
    const daysPerMonth = [31, feb, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    return daysPerMonth[month];
};
//計算上個月/下個月有多少天
function getNextOrLastMonthDays(date, type) {
    const month = date.getMonth();
    const year = date.getFullYear();
    if (type === 'last') {
        const lastMonth = month === 0 ? 11 : month - 1;
        const lastYear = lastMonth === 11 ? year - 1 : year;
        return {
            year: lastYear,
            month: lastMonth,
            days: getDays(lastYear, lastMonth),
        };
    } else if (type === 'next') {
        const nextMonth = month === 11 ? 0 : month + 1;
        const nextYear = nextMonth === 0 ? year + 1 : year;
        return {
            year: nextYear,
            month: nextMonth,
            days: getDays(nextYear, nextMonth),
        };
    }
};
function generateCalendar(date) {
    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth();
    // 當前月份天數
    const days = getDays(currentYear, currentMonth);
    // 上個月/下個月天數,填補空白
    const { days: lastMonthDays, year: lastMonthYear, month: lastMonth } = getNextOrLastMonthDays(date, 'last');
    const { year: nextMonthYear, month: nextMonth } = getNextOrLastMonthDays(date, 'next');
    // 月份1號為星期幾
    const weekIndex = new Date(`${currentYear}/${currentMonth + 1}/1`).getDay();
    // 計算42宮格剩餘天數
    const trailDays = calendarGrid - weekIndex - days;
    let trailVal = 0;
    const calendarTable = CalendarItem;
    for (let i = 0; i < calendarGrid; i++) {
        // 填入上個月天數
        if (i < weekIndex) {
            calendarTable[i] = {
                year: lastMonthYear,
                month: lastMonth,
                day: lastMonthDays - weekIndex + i + 1,
                isCurrentMonth: false,
                haswork: false
            };
            // 填入下個月天數
        } else if (i >= days + weekIndex) {
            if (trailVal < trailDays) {
                trailVal += 1;
            }
            calendarTable[i] = {
                year: nextMonthYear,
                month: nextMonth,
                day: trailVal,
                isCurrentMonth: false,
                haswork: false
            };
        }
    }
    // 填入當月天數
    for (let d = 1; d <= days; d++) {
        calendarTable[weekIndex + d - 1] = {
            year: currentYear,
            month: currentMonth,
            day: d,
            isCurrentMonth: true,
            haswork: false
        };
    }

    return calendarTable;
};

const date = ref(new Date());
const calendarTable = computed(() => generateCalendar(date.value));
const dateText = computed(() => {
    return `${date.value.getFullYear()}/${date.value.getMonth() + 1}`;
});
// 判斷是否為當天
const isAllTrue = (arr, fn = (p) => Boolean(p)) => arr.every(fn);

const isToday = computed(() => {
    const current = new Date();
    const validArr = [
        date.value.getFullYear() === current.getFullYear(),
        date.value.getMonth() === current.getMonth(),
        date.value.getDay() === current.getDay(),
    ];
    return isAllTrue(validArr);
});

function isActive(item) {
    return isAllTrue([
        item.day === date.value.getDate(),
        item.isCurrentMonth,
        item.month === new Date().getMonth(),
        item.year === new Date().getFullYear(),
    ]);
};
// 切換到當天
function currentDate() {
    date.value = new Date();
};
// 切換上個月/下個月
function changeMonth(type) {
    let month = 0;
    let year = 1970;
    if (type === 'prev') {
        month = date.value.getMonth() === 0 ? 11 : date.value.getMonth() - 1;
        year = month === 11 ? date.value.getFullYear() - 1 : date.value.getFullYear();
    } else if (type === 'next') {
        month = date.value.getMonth() === 11 ? 0 : date.value.getMonth() + 1;
        year = month === 0 ? date.value.getFullYear() + 1 : date.value.getFullYear();
    }
    if (month === new Date().getMonth()) {
        currentDate();
        return;
    }
    date.value.setDate(1);
    date.value.setMonth(month);
    date.value.setFullYear(year);
    date.value = new Date(date.value);
};


onMounted(() => {
    const api = `${import.meta.env.VITE_APP_API}API_App/Calendar/GetApplyActivityDataByMonth`
    const ThisMonth = new Date()
    axios.post(api, {
        "u_id": $cookies.get('u_id'),
        "AuthCode": $cookies.get('AuthCode'),
        "Lang": $cookies.get('Lang'),
        "Year": ThisMonth.getFullYear(),
        "Month": (ThisMonth.getMonth() + 1)
    }).then((res) => {
        monthData.value = res.data.DayDataList
    })
})
</script>





