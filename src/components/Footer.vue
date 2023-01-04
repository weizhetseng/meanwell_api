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
                    <div class="qrcoder_item_photo"><img src="../assets/img/Android_qr.svg" alt=""></div>
                    <div class="qrcoder_item_img">
                        <a href="#">
                            <img src="../assets/img/qrcode-icon-and.png" alt="">
                        </a>
                    </div>
                </div>
                <div class="qrcoder_item">
                    <div class="qrcoder_item_photo"><img src="../assets/img/IOS_qr.svg" alt=""></div>
                    <div class="qrcoder_item_img">
                        <a href="#">
                            <img src="../assets/img/qrcode-icon-ios.png" alt="">
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>