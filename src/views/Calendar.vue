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
                        <div class="Calendar_dayscontent_item_dayBox" v-for="(item, index) in calendarTable" :key="index">
                            <!-- <div class="daybar"
                                :class="[{ 'non-current': !item.isCurrentMonth }, { today: isActive(item) }, { selectedDay: index === DaySelected }, { Activityday: monthData.some((item2) => item2.Day === item.day) && item.month === ThisMonth.getMonth() && item.year === ThisMonth.getFullYear() }]"
                                @click="selectedDay(item, index)">
                                {{ item.day }}</div>
                            <div class="Activitybar">
                                <div class="Activitybar_item"
                                    :class="{ ate: monthData.some((item2) => item2.Day === item.day) && item.month === ThisMonth.getMonth() && item.year === ThisMonth.getFullYear() }">
                                </div>
                            </div> -->
                            <div class="daybar"
                                :class="[{ selectedDay: index === DaySelected && MonthSelected == item.month }, { 'non-current': !item.isCurrentMonth }, { today: isActive(item) }, { Activityday: monthData.some((item2) => item2.Day === item.day) && item.isCurrentMonth === true }]"
                                @click="selectedDay(item, index)">
                                {{ item.day }}
                            </div>
                            <div class="Activitybar">
                                <div class="Activitybar_item"
                                    :class="{ ate: monthData.some((item2) => item2.Day === item.day) && item.isCurrentMonth === true }">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="CalendarContentBox" v-if="!AllActivityShow">
                    <div class="Activecolumn" v-for="(item, index) in showActivity" :key="index">
                        <div class="RemindDate">{{ item[index].ActSDateTime }}</div>
                        <div class="ReminderMessage">{{ item[index].ActSubject }}</div>
                    </div>
                </div>
                <div class="CalendarContentBox" v-else>
                    <div class="Activecolumn" v-for="(item, index) in showAllActivity" :key="index">
                        <div class="RemindDate">{{ item[0].ActSDateTime }}</div>
                        <div class="ReminderMessage">{{ item[0].ActSubject }}</div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>
<script setup>
import { computed, onMounted, ref } from 'vue';
import { LoginOut } from "../stores/stores";
import { apiGetApplyActivityDataByMonth } from '../utils/api';
const store2 = LoginOut()

const weekMap = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
const calendarGrid = 42;
const MonthSelected = ref(-1)
const DaySelected = ref(-1)
const monthData = ref([])
const showActivity = ref([])
const showAllActivity = ref([])
const ThisMonth = new Date()
const AllActivityShow = ref(true)

let CalendarItem = [
    {
        year: '',
        month: '',
        day: '',
        isCurrentMonth: true,
    }
]
function selectedDay(item, index) {
    MonthSelected.value = item.month
    DaySelected.value = index
    apiGetApplyActivityDataByMonth({
        "u_id": $cookies.get('u_id'),
        "AuthCode": '0',
        "Lang": $cookies.get('Lang'),
        "Year": item.year,
        "Month": item.month + 1
    })
        .then((res) => {
            res.data.DayDataList.forEach((item2, index) => {
                if (item.day === item2.Day) {
                    showActivity.value.push(item2.ApplyActivityDataList)
                }
            })
        })
        .catch((error) => console.log(error));
    showActivity.value = []
    AllActivityShow.value = false
}
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
        };
    }

    return calendarTable;
};
const date = ref(new Date());
const calendarTable = computed(() => generateCalendar(date.value));

const dateText = computed(() => {
    if ($cookies.get("Lang") === "en") {
        switch (date.value.getMonth() + 1) {
            case 1:
                return `${date.value.getFullYear()}/JAN.`
            case 2:
                return `${date.value.getFullYear()}/FEB.`
            case 3:
                return `${date.value.getFullYear()}/MAR.`
            case 4:
                return `${date.value.getFullYear()}/APR.`
            case 5:
                return `${date.value.getFullYear()}/MAY.`
            case 6:
                return `${date.value.getFullYear()}/JUN.`
            case 7:
                return `${date.value.getFullYear()}/JUL.`
            case 8:
                return `${date.value.getFullYear()}/AUG.`
            case 9:
                return `${date.value.getFullYear()}/SEP.`
            case 10:
                return `${date.value.getFullYear()}/OCT.`
            case 11:
                return `${date.value.getFullYear()}/NOV.`
            case 12:
                return `${date.value.getFullYear()}/DEC.`
            default:
                return `${date.value.getFullYear()}/${date.value.getMonth() + 1}`;
        }
    } else {
        return `${date.value.getFullYear()}/${date.value.getMonth() + 1}月`;
    }
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
        getThatMonth(year, month)
        showAllActivity.value = [];
        AllActivityShow.value = true

    } else if (type === 'next') {
        month = date.value.getMonth() === 11 ? 0 : date.value.getMonth() + 1;
        year = month === 0 ? date.value.getFullYear() + 1 : date.value.getFullYear();
        getThatMonth(year, month)
        showAllActivity.value = [];
        AllActivityShow.value = true
    }
    if (month === new Date().getMonth() && year === new Date().getFullYear()) {
        currentDate();
        return;
    }

    date.value.setDate(1);
    date.value.setMonth(month);
    date.value.setFullYear(year);
    date.value = new Date(date.value);
};
function getThatMonth(year, month) {
    apiGetApplyActivityDataByMonth({
        "u_id": $cookies.get('u_id'),
        "AuthCode": '0',
        "Lang": $cookies.get('Lang'),
        "Year": year,
        "Month": month + 1
    })
        .then((res) => {
            monthData.value = res.data.DayDataList
            monthData.value.forEach(item => {
                showAllActivity.value.push(item.ApplyActivityDataList)
            })
            let checkNum = res.data.message.substr(0, 2)
            if (checkNum == '91' || checkNum == '92' || checkNum == '93' || checkNum == '94' || checkNum == '95' || checkNum == '96') {
                store2.Logout()
            }
        })
        .catch((error) => console.log(error));
}


onMounted(() => {
    apiGetApplyActivityDataByMonth({
        "u_id": $cookies.get('u_id'),
        "AuthCode": '0',
        "Lang": $cookies.get('Lang'),
        "Year": ThisMonth.getFullYear(),
        "Month": (ThisMonth.getMonth() + 1)
    })
        .then((res) => {
            monthData.value = res.data.DayDataList
            monthData.value.forEach(item => {
                showAllActivity.value.push(item.ApplyActivityDataList)
            })
            let checkNum = res.data.message.substr(0, 2)
            if (checkNum == '91' || checkNum == '92' || checkNum == '93' || checkNum == '94' || checkNum == '95' || checkNum == '96') {
                store2.Logout()
            }
        })
        .catch((error) => console.log(error));
})

</script>





