<template>
    <footer>
        <div class="footer_meunbar">
            <div class="meunbar">
                <div class="meunbar_itembar">
                    <div class="meunbar_itembar_title">{{ $t('AboutUs') }}</div>
                    <ul>
                        <li><a href="javascript:;">{{ $t('AboutUs1') }}</a></li>
                        <li><a href="javascript:;">{{ $t('AboutUs2') }}</a></li>
                        <li><a href="javascript:;">{{ $t('AboutUs3') }}</a></li>
                        <li><a href="javascript:;">{{ $t('AboutUs4') }}</a></li>
                        <li><a href="javascript:;">{{ $t('AboutUs5') }}</a></li>
                    </ul>
                </div>
                <div class="meunbar_itembar">
                    <div class="meunbar_itembar_title">{{ $t('AboutSDG') }}</div>
                    <ul>
                        <li><router-link to="/ServiceContent">{{ $t('AboutSDG1') }}</router-link></li>
                        <li><router-link to="/MissionVision">{{ $t('AboutSDG2') }}</router-link></li>
                    </ul>
                </div>
                <div class="meunbar_itembar">
                    <div class="meunbar_itembar_title">{{ $t('Serve') }}</div>
                    <ul>
                        <li><router-link to="/MembershipTermsofService">{{ $t('Serve1') }}</router-link></li>
                        <li><router-link to="/CommonProblem">{{ $t('Serve2') }}</router-link></li>
                    </ul>
                </div>
            </div>
            <div class="qrcoderbar">
                <div class="qrcoder_item">
                    <div class="qrcoder_item_photo">
                        <div class="qrbox1"></div>
                        <div class="qrbox2"></div>
                        <div class="qrbox3"></div>
                        <div class="qrbox4"></div>
                        <img src="../assets/img/AndroidQR.png" alt="">
                    </div>
                    <div class="qrcoder_item_img">
                        <a href="https://play.google.com/store/apps/details?id=com.giant.meanwellShare&hl=zh-TW"
                            target="_blank">
                            <img src="../assets/img/qrcode-icon-and.png" alt="">
                        </a>
                    </div>
                </div>
                <div class="qrcoder_item">
                    <div class="qrcoder_item_photo">
                        <div class="qrbox1"></div>
                        <div class="qrbox2"></div>
                        <div class="qrbox3"></div>
                        <div class="qrbox4"></div>
                        <img src="../assets/img/AppleQR.png" alt="">
                    </div>
                    <div class="qrcoder_item_img">
                        <a href="https://apps.apple.com/tw/app/sdg-share/id6443496461" target="_blank">
                            <img src="../assets/img/qrcode-icon-ios.png" alt="">
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>


