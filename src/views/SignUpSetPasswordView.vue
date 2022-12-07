<template>
    <div class="page_main">
        <main>
            <div class="page_content">
                <section class="loginTopIcon">
                    <div class="loginBigIcon"><img src="../assets/img/LoginBigIcon.svg" alt=""></div>
                </section>
                <section class="loginContentBox">
                    <div class="ContentBoxTitle">會員註冊</div>
                    <div class="PageTitle">設定密碼</div>
                    <input type="password" name="singupPW" id="" placeholder="請輸入設定密碼" class="Inputset100">
                    <div class="PageTitle">確認設定密碼</div>
                    <input type="password" name="singupPW" id="" placeholder="請輸入確認設定密碼" class="Inputset100">

                    <div class="page_confirm_input">
                        <label>
                            <input type="checkbox" name="confirm_lre" id="">
                            <span>我已詳細閱讀並同意</span>
                        </label>
                        <span class="pagelabelText">
                            <RouterLink to="">會員條款</RouterLink>
                        </span>

                    </div>
                    <div class="Boxbarbuttem2">
                        <button class="pageButtem">確認送出</button>
                    </div>
                </section>
            </div>
        </main>
    </div>
</template>
