import{g as n,r as I,o as s,c as a,a as t,F as h,h as u,d as b,n as _,b as x,w as p,t as T,e as L}from"./index.5c6e7b1f.js";const N={class:"page_main"},M={class:"page_content"},y=t("div",{class:"PageBreadCrumbs"},[t("ul",null,[t("li",null,"\u9996\u9801"),t("li",null,">"),t("li",null,"\u6211\u7684\u6D3B\u52D5"),t("li",null,">"),t("li",null,"\u5DF2\u7D50\u675F"),t("li",null,">"),t("li",null,"\u8607\u5DDE\u667A\u6167\u5712\u5340\u958B\u5E55\u5100\u5F0F")])],-1),A={class:"MemberCenterContent"},S={class:"memberNav"},B=["onClick"],F=t("div",{class:"memberNavItemLine"},null,-1),V={class:"memberNavItemtext"},w={class:"navItemSort"},D={class:"navItemSortContent"},O=["onClick"],P=b('<div class="memberCenterRight"><div class="ActiveDirectoryContentBox"><div class="activitiesTitle">\u8607\u5DDE\u667A\u6167\u5712\u5340\u958B\u5E55\u5100\u5F0F</div><div class="itemTitle"><div class="itemTitleLine"></div><div class="itemTitletext">\u5831\u540D\u5834\u6B21</div></div><div class="itemtext">2022/07/26(\u4E8C) 13:00-15:00</div><div class="itemTitle"><div class="itemTitleLine"></div><div class="itemTitletext">\u5831\u540D\u8CC7\u6599</div></div><div class="personalinformation"><div class="itemTr"><div class="itemtextleft">\u59D3\u540D\uFF1A</div><div class="itemtextright">\u674E\u660E\u5049</div></div><div class="itemTr"><div class="itemtextleft">\u624B\u6A5F\u96FB\u8A71\uFF1A</div><div class="itemtextright">09123456789</div></div><div class="itemTr"><div class="itemtextleft">E-mail\uFF1A</div><div class="itemtextright">test@gmail.com</div></div><div class="itemTr"><div class="itemtextleft">\u9910\u9EDE\uFF1A</div><div class="itemtextright">\u8477</div></div><div class="itemTr"><div class="itemtextleft">\u4EA4\u901A\uFF1A</div><div class="itemtextright">\u81EA\u99D5 ABC-1234</div></div><div class="itemTr"><div class="itemtextleft">\u5099\u8A3B\uFF1A</div><div class="itemtextright">\u5C0D\u6D77\u9BAE\u904E\u654F</div></div></div><div class="itemTitle"><div class="itemTitleLine"></div><div class="itemTitletext">\u7968\u5238\u8CC7\u6599</div></div><div class="TicketInformation"><div class="itemTr"><div class="itemtextleft">\u96FB\u5B50\u7968\uFF1A</div><div class="itemtextright">3\u5F35</div></div><div class="itemTr"><div class="itemtextleft">\u7D19\u672C\u7968\uFF1A</div><div class="itemtextright">0\u5F35</div></div><div class="itemTr"><div class="itemtextleft">\u6536\u4EF6\u5730\u5740\uFF1A</div><div class="itemtextright">\u53F0\u5317\u5E02\u4FE1\u7FA9\u5340\u4FE1\u7FA9\u8DEF1\u865F</div></div><div class="itemTr"><div class="itemtextleft">\u5EA7\u4F4D\u865F\u78BC\uFF1A</div><div class="itemtextright">10\u6392 1\u865F\u300010\u6392 2\u865F\u300010\u6392 3\u865F</div></div></div><div class="itemTitle"><div class="itemTitleLine"></div><div class="itemTitletext">\u76F8\u95DC\u8CC7\u8A0A</div></div><div class="relevantinformation"><div class="itemTr"><div class="itemtextleft">\u8CC7\u6599\u4E0B\u8F09\uFF1A</div><div class="itemtextright">\u8AB2\u7A0B\u5167\u5BB9.pdf</div></div><div class="itemTr"><div class="itemtextleft2">\u7DDA\u4E0A\u8996\u8A0A\u9023\u7DDA\uFF1A</div><div class="itemtextright2">https://teams.microsoft.com/</div></div></div></div></div>',1),G={__name:"ActivitiesOver",setup($){const d=n(2),l=n(1),g=n([{name:"SDG\u5E33\u6236",path:"/MemberCenter"},{name:"\u5E33\u865F\u7BA1\u7406",path:"",item:[{name:"\u500B\u4EBA\u8CC7\u6599",path:"/PersonalInformation"},{name:"\u767B\u5165\u8A2D\u5B9A",path:"/LoginSettings"},{name:"\u8B8A\u66F4\u5BC6\u78BC",path:"/ChangePassword"},{name:"\u6703\u54E1\u7BA1\u7406\u8FA6\u6CD5",path:"/MembershipManagementMeasures"}]},{name:"\u6211\u7684\u6D3B\u52D5",path:"",item:[{name:"\u9032\u884C\u4E2D",path:"/ActivityListOngoing"},{name:"\u5DF2\u7D50\u675F",path:"/ActivityListOver"},{name:"\u5DF2\u53D6\u6D88",path:"/ActivityListCancelled"}]},{name:"\u9818\u53D6\u5206\u7968",path:"/VotesTaken"}]),f=i=>{d.value=i},C=i=>{l.value=i},k=()=>{l.value=0,d.value==2&&(l.value=null)};return(i,c)=>{const m=I("router-link");return s(),a("div",N,[t("main",null,[t("div",M,[y,t("section",A,[t("div",S,[(s(!0),a(h,null,u(g.value,(v,o)=>(s(),a("div",{class:_(["memberNavItem",{active:d.value===o}]),key:v.name,onClick:e=>f(o)},[x(m,{to:v.path},{default:p(()=>[t("div",{class:"navItems",onClick:c[0]||(c[0]=e=>k(i.ia))},[F,t("div",V,T(v.name),1)])]),_:2},1032,["to"]),t("div",w,[t("div",D,[(s(!0),a(h,null,u(v.item,(e,r)=>(s(),a("div",{class:_(["navItemSortContentItem",{active:l.value===r}]),key:e.name,onClick:E=>C(r)},[x(m,{to:e.path},{default:p(()=>[L(T(e.name),1)]),_:2},1032,["to"])],10,O))),128))])])],10,B))),128))]),P])])])])}}};export{G as default};