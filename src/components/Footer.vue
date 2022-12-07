<template>
    <footer>
        <div class="footer_meunbar">
            <div class="meunbar">
                <div class="meunbar_itembar">
                    <div class="meunbar_itembar_title">關於我們</div>
                    <ul>
                        <li><a href="javascript:;">SDG永續發展網</a></li>
                        <li><a href="javascript:;">明緯</a></li>
                        <li><a href="javascript:;">協緯</a></li>
                        <li><a href="javascript:;">聯源</a></li>
                        <li><a href="javascript:;">公益基金會</a></li>
                    </ul>
                </div>
                <div class="meunbar_itembar">
                    <div class="meunbar_itembar_title">關於共享機</div>
                    <ul>
                        <li><router-link to="/ServiceContent">服務內容</router-link></li>
                        <li><router-link to="/MissionVision">使命願景</router-link></li>
                    </ul>
                </div>
                <div class="meunbar_itembar">
                    <div class="meunbar_itembar_title">服務</div>
                    <ul>
                        <li><router-link to="/MembershipTermsofService">會員服務條款</router-link></li>
                        <li><router-link to="/CommonProblem">常見問題</router-link></li>
                        <li><router-link to="/Questionnaire">問卷調查</router-link></li>
                    </ul>
                </div>
            </div>
            <div class="qrcoderbar">
                <div class="qrcoder_item">
                    <div class="qrcoder_item_photo"><img src="../assets/img/Android_qr.svg" alt=""></div>
                    <div class="qrcoder_item_text">Android</div>
                </div>
                <div class="qrcoder_item">
                    <div class="qrcoder_item_photo"><img src="../assets/img/IOS_qr.svg" alt=""></div>
                    <div class="qrcoder_item_text">IOS</div>
                </div>
            </div>
        </div>
    </footer>
</template>