
<template>
    <div class="page_course_main">
        <main>
            <div class="page_content avt">
                <div class="PageBreadCrumbs">
                    <ul>
                        <li>首頁</li>
                        <li>></li>
                        <li>活動列表</li>
                    </ul>
                </div>
                <div class="BannerBar">
                    <div class="banner_content">

                        <img src="" alt="">

                    </div>
                </div>
                <div class="Course_titleBar">
                    <div class="Course_title">活動列表</div>
                    <div class="Search_bar"><input type="search" name="" id="" class="Course_Search_bar"></div>
                </div>
                <div class="Course_List_Box">
                    <router-link to="#">
                        <div class="Course_List_Item">
                            <div class="Course_date_left">
                                <div class="CoursedateBox">
                                    <div class="CoursedateMonth"></div>
                                    <div class="CoursedateMonthText">月</div>
                                </div>
                            </div>
                            <div class="Course_date_right">
                                <div class="Course_item_title"></div>
                                <div class="Course_item_location"></div>
                            </div>
                        </div>
                    </router-link>
                </div>
                <div class="pagination">
                    <a href="javascript:;">
                        <div class="pagination_item_previous"> <img src="../assets/img/chevron-left.svg" alt="">
                        </div>
                    </a>
                    <a href="javascript:;">
                        <div class="pagination_item"> 1 </div>
                    </a>
                    <a href="javascript:;">
                        <div class="pagination_item"> 2 </div>
                    </a>
                    <a href="javascript:;">
                        <div class="pagination_item"> 3 </div>
                    </a>
                    <a href="javascript:;">
                        <div class="pagination_item"> 4 </div>
                    </a>
                    <a href="javascript:;">
                        <div class="pagination_item_next"> <img src="../assets/img/chevron-right.svg" alt=""> </div>
                    </a>
                </div>
            </div>
        </main>
    </div>
</template>


