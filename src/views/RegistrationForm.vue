<template>
    <div class="page_main">
        <main>
            <div class="page_content avt">
                <div class="PageBreadCrumbs">
                    <ul>
                        <li>首頁</li>
                        <li>></li>
                        <li>活動列表</li>
                        <li>></li>
                        <li>蘇州智慧園區開幕儀式</li>
                        <li>></li>
                        <li>活動報名</li>
                    </ul>
                </div>
                <div class="CourseContentBox">
                    <div class="CourseinfTitle">{{ $t("eventR.eventtitle") }}</div>
                    <div class="activitiesSubtitle">{{ $t("eventR.RegistrationInformation") }}</div>
                    <div class="itemTitle">
                        <div class="itemTitleLine"></div>
                        <div class="itemTitletext">{{ $t("eventR.participatingStatus") }}</div>
                    </div>
                    <div class="memberinfTextinput">
                        <div class="inputitem" v-for="(identity, checkedide) in fromdata.eventR.position"
                            :key="identity.id" @click="chooseidentity(checkedide)">
                            <input :id="identity.name" type="radio" :name="identity.position" :value="identity.values"
                                v-model="chooseide">
                            <label :for="identity.name">{{ identity.thisname }}</label>
                        </div>
                    </div>
                    <div class="itemTitle">
                        <div class="itemTitleLine"></div>
                        <div class="itemTitletext">{{ $t("eventR.ParticipationMethod") }}</div>
                    </div>
                    <div class="memberinfTextinput">
                        <div class="inputitem" v-for="(Method, checkedMet) in fromdata.eventR.RFMethods" :key="Method.id"
                            @click="chooseMethod(checkedMet)">
                            <input :id="Method.name" type="radio" :name="Method.position" :value="Method.values"
                                v-model="chooseMet">
                            <label :for="Method.name">{{ Method.thisname }}</label>
                        </div>
                    </div>
                    <div class="itemTitle">
                        <div class="itemTitleLine"></div>
                        <div class="itemTitletext">{{ fromdata.eventR.CMname }}</div>
                    </div>
                    <div class="memberinfTextinput">
                        <input type="text" name="" id="" class="memberinfinput" :placeholder="fromdata.eventR.PlCMname"
                            v-model="entername">
                    </div>
                    <div class="itemTitle">
                        <div class="itemTitleLine"></div>
                        <div class="itemTitletext">{{ fromdata.eventR.gender }}</div>
                    </div>
                    <div class="memberinfTextinput">
                        <div class="inputitem" v-for="(gender, checkedGen) in fromdata.eventR.sex" :key="gender.id"
                            @click="choosegender(checkedGen)">
                            <input :id="gender.name" type="radio" :name="gender.position" :value="gender.values"
                                v-model="chooseGen">
                            <label :for="gender.name">{{ gender.thisname }}</label>
                        </div>
                    </div>
                    <div class="itemTitle">
                        <div class="itemTitleLine"></div>
                        <div class="itemTitletext">{{ fromdata.eventR.cellphonenumber }}</div>
                    </div>
                    <div class="memberinfTextinput">
                        <input type="text" name="" id="" class="memberinfinput"
                            :placeholder="fromdata.eventR.cellphoneinput" v-model="cellphone">
                    </div>
                    <div class="itemTitle">
                        <div class="itemTitleLine"></div>
                        <div class="itemTitletext">{{ fromdata.eventR.EmployedCompany }}</div>
                    </div>
                    <div class="memberinfTextinput">
                        <input type="text" name="" id="" class="memberinfinput"
                            :placeholder="fromdata.eventR.EmpCompInput" v-model="companyname">
                    </div>
                    <div class="itemTitle">
                        <div class="itemTitleLine"></div>
                        <div class="itemTitletext">{{ fromdata.eventR.JobTitle }}</div>
                    </div>
                    <div class="memberinfTextinput">
                        <input type="text" name="" id="" class="memberinfinput"
                            :placeholder="fromdata.eventR.JobTitleInput" v-model="JTname">
                    </div>
                    <div class="Boxbarbuttem">
                        <button class="pageButtem" @click="NextStep">{{ fromdata.eventR.NextStep }}</button>
                        {{ mamberdata.Uid }}
                    </div>
                </div>
            </div>

        </main>
    </div>
</template>
<script setup>
import axios from 'axios';
import { ref, onMounted } from "vue"
import { storeToRefs } from "pinia";
import formDatas from '../lang/tw.json'
import { useLogin } from '../stores/counter.js';
const store = useLogin();
const { mamberdata, EventRFintor } = storeToRefs(store);
const fromdata = ref(formDatas)
const usid = ref($cookies.get("u_id"))
const actid = ref($cookies.get("AuthCode"))
const Lang = ref($cookies.get("Lang"))
const entername = ref('')
const chooseide = ref(0)
const chooseMet = ref(0)
const chooseGen = ref(0)
const cellphone = ref('')
const companyname = ref('')
const JTname = ref('')

onMounted(() => {
    axios.post('https://demo18.e-giant.com.tw/API_App/MemberData/GetData', { "u_id": usid.value, "AuthCode": actid.value, "Lang": Lang.value })
        .then((res) => {
            store.mamberdata = res.data
            entername.value = store.mamberdata.Name
            chooseGen.value = store.mamberdata.Sex
            cellphone.value = store.mamberdata.Mobile
            console.log(entername.value, chooseGen.value, store.mamberdata.Mobile)
        })

})

const chooseidentity = (checkedide) => {
    chooseide.value = checkedide;
    store.EventRFintor.Identity = checkedide;
}
const chooseMethod = (checkedMet) => {
    chooseMet.value = checkedMet
    store.EventRFintor.JoinWay = checkedMet;
}
const choosegender = (checkedGen) => {
    chooseGen.value = checkedGen
    store.EventRFintor.Sex = checkedGen;
}

const NextStep = () => {
    store.EventRFintor.u_id = usid.value;
    store.EventRFintor.ActId = actid.value;
    store.EventRFintor.Lang = Lang.value;
    store.EventRFintor.Identity = chooseide.value;
    store.EventRFintor.JoinWay = chooseMet.value;
    store.EventRFintor.Name = entername.value;
    store.EventRFintor.Sex = chooseGen.value;
    store.EventRFintor.Mobile = cellphone.value;
    store.EventRFintor.Email = usid.value;
    store.EventRFintor.CompanyName = companyname.value;
    store.EventRFintor.JobTitle = JTname.value;
    console.log(store.EventRFintor)
    store.nextsp();

}

</script>
