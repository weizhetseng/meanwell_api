import{C as _,y as C,s as f,r as k,o as a,c,a as s,b as A,w as r,i as d,F as u,h as v,d as B,z as p,n as h,t as l,A as S,x as L}from"./index.5c6e7b1f.js";import{_ as x,a as y}from"./chevron-right.f4e7120e.js";import{S as D,a as b}from"./swiper.min.1ba9d282.js";const j={class:"page_course_main"},w={class:"page_content avt"},I=s("div",{class:"PageBreadCrumbs"},[s("ul",null,[s("li",null,"\u9996\u9801"),s("li",null,">"),s("li",null,"\u6D3B\u52D5\u5217\u8868")])],-1),M={class:"BannerBar"},P={class:"banner_content"},T=["src"],$=s("div",{class:"Course_titleBar"},[s("div",{class:"Course_title"},"\u6D3B\u52D5\u5217\u8868"),s("div",{class:"Search_bar"},[s("input",{type:"search",name:"",id:"",class:"Course_Search_bar"})])],-1),E={class:"Course_List_Box"},F={class:"Course_List_Item"},N={class:"Course_date_left"},V={class:"CoursedateMonth"},z=s("div",{class:"CoursedateMonthText"},"\u6708",-1),O={class:"Course_item_title"},H={class:"Course_item_location"},K=B('<div class="pagination"><a href="javascript:;"><div class="pagination_item_previous"><img src="'+x+'" alt=""></div></a><a href="javascript:;"><div class="pagination_item"> 1 </div></a><a href="javascript:;"><div class="pagination_item"> 2 </div></a><a href="javascript:;"><div class="pagination_item"> 3 </div></a><a href="javascript:;"><div class="pagination_item"> 4 </div></a><a href="javascript:;"><div class="pagination_item_next"><img src="'+y+'" alt=""></div></a></div>',1),Q={__name:"Course_Educate",setup(R){function m(e){L.push(`/Course/CourseContent/${e}`)}const i=_([{}]),o=_([{}]);return C(()=>{const e="https://demo18.e-giant.com.tw/API_App/HomePage/ActivityList";f.post(e,{u_id:$cookies.get("u_id"),AuthCode:$cookies.get("AuthCode"),Lang:$cookies.get("Lang"),ModClass:2,SDateTime:"",EDateTime:"",Keywords:""}).then(n=>{i.value=n.data.ActivityDataList,o.value=n.data.BannerList,console.log(i.value),console.log(o.value)})}),(e,n)=>{const g=k("router-link");return a(),c("div",j,[s("main",null,[s("div",w,[I,s("div",M,[s("div",P,[A(d(b),null,{default:r(()=>[(a(!0),c(u,null,v(o.value,t=>(a(),p(d(D),{key:t.PicLink},{default:r(()=>[s("img",{src:t.PicLink,alt:""},null,8,T)]),_:2},1024))),128))]),_:1})])]),$,s("div",E,[(a(!0),c(u,null,v(i.value,t=>(a(),p(g,{to:"#",key:t.ActId,onClick:S(U=>m(t.ActId),["prevent"])},{default:r(()=>[s("div",F,[s("div",N,[s("div",{class:h(["CoursedateBox",{toTop:t.IsTop}])},[s("div",V,l(t.ActSDateTime.substr(5,2)),1),z],2)]),s("div",{class:h(["Course_date_right",{OpenForRegistration:t.IsOpenSignUp}])},[s("div",O,l(t.ActSubject),1),s("div",H,l(t.ActPlace),1)],2)])]),_:2},1032,["onClick"]))),128))]),K])])])}}};export{Q as default};
