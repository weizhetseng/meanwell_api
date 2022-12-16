<template>
    <div id="app" v-cloak>
        <h1>{{ calendar.year }} 年 {{ calendar.month + 1 }} 月</h1>
        <div>
            <button @click="adjustYear(-1)">上一年</button>
            <button @click="adjustMonth(-1)">上個月</button>
            <button @click="setToday">今天</button>
            <button @click="adjustMonth(1)">下個月</button>
            <button @click="adjustYear(1)">下一年</button>
        </div>
        <div class="calendar">
            <div class="weekDay">
                <div>日</div>
                <div>一</div>
                <div>二</div>
                <div>三</div>
                <div>四</div>
                <div>五</div>
                <div>六</div>
            </div>
            <div class="week" v-for="i in 6">
                <div class="day" v-for="j in 7" :data-date="calendarMonth[(i - 1) * 7 + j - 1].date" :class="{
                    today: calendarMonth[(i - 1) * 7 + j - 1].year === today.year && calendarMonth[(i - 1) * 7 + j - 1].month === today.month && calendarMonth[(i - 1) * 7 + j - 1].date === today.date,
                    other: calendarMonth[(i - 1) * 7 + j - 1].month !== calendar.month
                }">

                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
export default ({
    data() {
        return {
            today: {
                year: 0,
                month: 0,
                date: 0,
                day: 0
            },
            calendar: {
                year: 0,
                month: 0,
                date: 0,
                day: 0
            }
        };
    },
    mounted() {
        this.setToday()
    },
    methods: {
        setToday() {
            const date = new Date()
            this.today.year = this.calendar.year = date.getFullYear()
            this.today.month = this.calendar.month = date.getMonth() // 0~11
            this.today.date = this.calendar.date = date.getDate()
            this.today.day = this.calendar.day = date.getDay()
        },
        adjustYear(fix) {
            this.calendar.year += fix
        },
        adjustMonth(fix) {
            // this.calendar.month += fix 範圍
            let month = this.calendar.month + fix
            if (month > 11) {
                this.adjustYear(1)
                this.calendar.month = 0
            } else if (month < 0) {
                this.adjustYear(-1)
                this.calendar.month = 11
            } else {
                this.calendar.month = month
            }

        }
    },
    computed: {
        // monthFirstDay(){
        //   const date = new Date(this.calendar.year,this.calendar.month,1)
        //   return {
        //     year:date.getFullYear(),// this.calendar.year
        //     month:date.getMonth(),// this.calendar.month
        //     date:date.getDate(),// 1
        //     day:date.getDay(),
        //   }
        // },
        calendarFirstDay() {
            const mDate = new Date(this.calendar.year, this.calendar.month, 1)
            const date = new Date(this.calendar.year, this.calendar.month, 1 - mDate.getDay())
            return {
                year: date.getFullYear(),
                month: date.getMonth(),
                date: date.getDate(),
                day: date.getDay(),
            }
        },
        calendarMonth() {
            const data = []
            let date
            for (let i = 0; i < 42; i++) {
                date = new Date(this.calendarFirstDay.year, this.calendarFirstDay.month, this.calendarFirstDay.date + i)
                data.push({
                    year: date.getFullYear(),
                    month: date.getMonth(),
                    date: date.getDate(),
                    day: date.getDay()
                })
            }
            return data
        }

    }
})
</script>
  
<style>
[v-cloak] {
    display: none;
}

html {
    text-align: center;
}

.calendar {
    margin: 30px 0;
}

.weekDay,
.week {
    display: flex;
    border-bottom: 1px solid #ddd;
}

.weekDay>div {
    flex: 1 1 0%;
    line-height: 30px;
}

.week {
    border-right: 1px solid #ddd;
}

.week>div {
    position: relative;
    flex: 1 1 0%;
    height: 90px;
    line-height: 30px;
    border-left: 1px solid #ddd;
}

.week>div:before {
    position: absolute;
    content: attr(data-date);
    top: 0;
    right: 0;
    display: block;
    width: 30px;
    border-left: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
}

.today:before {
    color: #fff;
    background-color: #000;
}

.other {
    color: #bbb;
    background-color: #ddd;
}
</style>