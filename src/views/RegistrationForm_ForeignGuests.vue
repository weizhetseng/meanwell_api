<template>
    <div class="page_main">
        <main>
            <div class="page_content avt">
                <div class="PageBreadCrumbs">
                    <ul>
                        <li>{{ $t('IndexText') }}</li>
                        <li>></li>
                        <li>活動列表</li>
                        <li>></li>
                        <li>蘇州智慧園區開幕儀式</li>
                        <li>></li>
                        <li>活動報名</li>
                    </ul>
                </div>
                <div class="CourseContentBox">
                    <div class="CourseinfTitle">蘇州智慧園區開幕儀式</div>
                    <div class="activitiesSubtitle">報名資料</div>
                    <div class="itemTitle">
                        <div class="itemTitleLine"></div>
                        <div class="itemTitletext">參與身分</div>
                    </div>
                    <div class="memberinfTextinput">
                        <input id="identity01" type="radio" name="identity">
                        <label for="identity01">員工</label>
                        <input id="identity02" type="radio" name="identity" checked>
                        <label for="identity02">外賓</label>
                    </div>
                    <div class="itemTitle">
                        <div class="itemTitleLine"></div>
                        <div class="itemTitletext">與會方式</div>
                    </div>
                    <div class="memberinfTextinput">
                        <input id="mode01" type="radio" name="mode" checked>
                        <label for="mode01">親臨</label>
                        <input id="mode02" type="radio" name="mode">
                        <label for="mode02">線上zoom meeting</label>
                    </div>
                    <div class="itemTitle">
                        <div class="itemTitleLine"></div>
                        <div class="itemTitletext">姓名</div>
                    </div>
                    <div class="memberinfTextinput">
                        <input type="text" name="" id="" class="memberinfinput" placeholder="請輸入您的姓名">
                    </div>
                    <div class="itemTitle">
                        <div class="itemTitleLine"></div>
                        <div class="itemTitletext">性別</div>
                    </div>
                    <div class="memberinfTextinput">
                        <input id="gender01" type="radio" name="gender" checked>
                        <label for="gender01">男</label>
                        <input id="gender02" type="radio" name="gender">
                        <label for="gender02">女</label>
                    </div>
                    <div class="itemTitle">
                        <div class="itemTitleLine"></div>
                        <div class="itemTitletext">手機號碼</div>
                    </div>
                    <div class="memberinfTextinput">
                        <input type="text" name="" id="" class="memberinfinput" placeholder="請輸入手機號碼">
                    </div>
                    <div class="itemTitle">
                        <div class="itemTitleLine"></div>
                        <div class="itemTitletext">任職公司</div>
                    </div>
                    <div class="memberinfTextinput">
                        <input type="text" name="" id="" class="memberinfinput" placeholder="請輸入任職公司">
                    </div>
                    <div class="itemTitle">
                        <div class="itemTitleLine"></div>
                        <div class="itemTitletext">職稱</div>
                    </div>
                    <div class="memberinfTextinput">
                        <input type="text" name="" id="" class="memberinfinput" placeholder="請輸入職稱">
                    </div>
                    <div class="itemTitle">
                        <div class="itemTitleLine"></div>
                        <div class="itemTitletext">證件類別</div>
                    </div>
                    <div class="memberinfTextinput">
                        <select class="memberinfinput">
                            <option selected disabled>身分證 / 台胞證 / 居留證 / 護照</option>
                            <option>身分證</option>
                            <option>台胞證</option>
                            <option>居留證</option>
                            <option>護照</option>
                        </select>
                    </div>
                    <div class="itemTitle">
                        <div class="itemTitleLine"></div>
                        <div class="itemTitletext">證件號碼</div>
                    </div>
                    <div class="memberinfTextinput">
                        <input type="text" name="" id="" class="memberinfinput" placeholder="請輸入證件號碼">
                    </div>
                    <div class="Boxbarbuttem">
                        <router-link to="/Course/RegistrationFormNext"><button
                                class="pageButtem">下一步</button></router-link>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>
