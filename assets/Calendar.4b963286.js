import{g as I,k as y,o as d,c as h,a as s,t as g,i as C,F as D,h as p,n as x}from"./index.5c6e7b1f.js";const N="/meanwell_api/assets/Left.3007be7b.svg",P="/meanwell_api/assets/right.ec54c500.svg",R={class:"page_main"},V={class:"page_content"},W={class:"CalendarContentBox"},z={class:"Calendar_top"},E=s("img",{src:N,alt:""},null,-1),O=[E],j={class:"Monthbutton_text"},q=s("img",{src:P,alt:""},null,-1),H=[q],J={class:"Calendar_dayscontent"},K={class:"Calendar_dayscontent"},Q={class:"Activitybar"},U=s("div",{class:"CalendarContentBox"},[s("div",{class:"Activecolumn"},[s("div",{class:"RemindDate"},"07 / 02"),s("div",{class:"ReminderMessage"},"\u6703\u8B70")])],-1),et={__name:"Calendar",setup(X){const Y=["Su","Mo","Tu","We","Th","Fr","Sa"];let F=[{year:"",month:"",day:"",isCurrentMonth:!0}];function b(t){return t%4===0&&t%100!==0||t%400===0}function v(t,n){return[31,b(t)?29:28,31,30,31,30,31,31,30,31,30,31][n]}function M(t,n){const e=t.getMonth(),o=t.getFullYear();if(n==="last"){const r=e===0?11:e-1,c=r===11?o-1:o;return{year:c,month:r,days:v(c,r)}}else if(n==="next"){const r=e===11?0:e+1,c=r===0?o+1:o;return{year:c,month:r,days:v(c,r)}}}function w(t){const n=t.getFullYear(),e=t.getMonth(),o=v(n,e),{days:r,year:c,month:$}=M(t,"last"),{year:L,month:G}=M(t,"next"),i=new Date(`${n}/${e+1}/1`).getDay(),S=42-i-o;let _=0;const u=F;for(let l=0;l<42;l++)l<i?u[l]={year:c,month:$,day:r-i+l+1,isCurrentMonth:!1}:l>=o+i&&(_<S&&(_+=1),u[l]={year:L,month:G,day:_,isCurrentMonth:!1});for(let l=1;l<=o;l++)u[i+l-1]={year:n,month:e,day:l,isCurrentMonth:!0};return u}const a=I(new Date),k=y(()=>w(a.value)),A=y(()=>`${a.value.getFullYear()}/${a.value.getMonth()+1}`),f=(t,n=e=>Boolean(e))=>t.every(n);y(()=>{const t=new Date,n=[a.value.getFullYear()===t.getFullYear(),a.value.getMonth()===t.getMonth(),a.value.getDay()===t.getDay()];return f(n)});function B(t){return f([t.day===a.value.getDate(),t.isCurrentMonth,t.month===new Date().getMonth(),t.year===new Date().getFullYear()])}function T(){a.value=new Date}function m(t){let n=0,e=1970;if(t==="prev"?(n=a.value.getMonth()===0?11:a.value.getMonth()-1,e=n===11?a.value.getFullYear()-1:a.value.getFullYear()):t==="next"&&(n=a.value.getMonth()===11?0:a.value.getMonth()+1,e=n===0?a.value.getFullYear()+1:a.value.getFullYear()),n===new Date().getMonth()){T();return}a.value.setDate(1),a.value.setMonth(n),a.value.setFullYear(e),a.value=new Date(a.value)}return(t,n)=>(d(),h("div",R,[s("main",null,[s("div",V,[s("div",W,[s("div",z,[s("div",{class:"Monthbutton",onClick:n[0]||(n[0]=e=>m("prev"))},O),s("div",j,g(C(A)),1),s("div",{class:"Monthbutton",onClick:n[1]||(n[1]=e=>m("next"))},H)]),s("div",J,[(d(),h(D,null,p(Y,(e,o)=>s("div",{class:"Calendar_dayscontent_item_Week",key:o},g(e),1)),64))]),s("div",K,[(d(!0),h(D,null,p(C(k),(e,o)=>(d(),h("div",{class:"Calendar_dayscontent_item_dayBox",key:o},[s("div",{class:x(["daybar",[{"non-current":!e.isCurrentMonth},{today:B(e)},{Activityday:e.day===2}]])},g(e.day),3),s("div",Q,[s("div",{class:x(["Activitybar_item",{ate:e.day===2}])},null,2)])]))),128))])]),U])])]))}};export{et as default};