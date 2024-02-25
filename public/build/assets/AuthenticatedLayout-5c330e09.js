import{j as e,u as I,r as n,R as V,b as O,h as F,d as D,y as z}from"./app-eefe6961.js";import{F as x}from"./index.es-6f9cfa5f.js";import{c as W,d as L,e as C,g as B,h as H,i as A,j as U,k as q,l as Q,m as T,n as G,o as J}from"./index-1074990b.js";import{C as K}from"./Card-526e725c.js";import{S as u}from"./Skeleton-35f5ec8d.js";import{M as X}from"./Modal-f577344b.js";import Y from"./VerificationProcess-0cec860e.js";function Z({className:i}){return e.jsx("div",{className:`${i} application-logo`,children:e.jsx(x,{icon:W,className:"logo-icon"})})}const ee=({project:i,isVisible:d,activePage:s,onLinkClick:v})=>{const{createNewProject:N}=I(),l=i==null?void 0:i.id,h={"projects.callSheets.index":s.startsWith("projects.callSheets.details.page")},[c,p]=n.useState(h),j="text-2xl text-slate-400",m=a=>!!(s.startsWith(a)||a==="projects.callSheets.index"&&s.startsWith("projects.callSheets.details.page")),f="font-bold text-emerald-500",b=a=>{p(t=>({...t,[a]:!t[a]}))},w=[{label:"Overview",routeName:"projects.index",icon:L},{label:"Projects",routeName:"projects.list",icon:H}],S=[{label:"Details",routeName:"projects.details",icon:L},{label:"Call Sheets",routeName:"projects.callSheets.index",icon:C,subitems:l&&s.startsWith("projects.callSheets.details.page")?[{label:"Subitem 1",routeName:`projects.callSheets.details.${l}.subitem1`,icon:C},{label:"Subitem 2",routeName:`projects.callSheets.details.${l}.subitem2`,icon:C}]:[]}],k=[{label:"Profile Settings",routeName:"profile.settings",icon:A},{label:"Account Settings",routeName:"settings.account",icon:A}],r=a=>a.map((t,M)=>{let $={};(t.routeName.startsWith("projects.details")||t.routeName==="projects.callSheets.index")&&($={id:l});const y=t.subitems&&t.subitems.length>0,_=c[t.routeName];return e.jsxs(V.Fragment,{children:[e.jsxs("li",{className:`cursor-pointer justify-between w-full ${y?"flex flex-row":""} ${m(t.routeName)?f:""}`,children:[e.jsxs("div",{className:"flex flex-row gap-4",onClick:g=>{g.preventDefault(),y||v(g,route(t.routeName,$))},children:[e.jsx(x,{className:"my-auto text-xl",icon:t.icon}),e.jsx("span",{className:`w-full flex text-left shrink text-xl ${m(t.routeName)?f:""}`,children:t.label})]}),y&&e.jsx(x,{icon:B,style:{transform:_?"rotate(-90deg)":"rotate(0deg)",transition:"transform 0.5s ease"},className:"my-auto text-xl cursor-pointer",onClick:()=>b(t.routeName)})]}),y&&e.jsx("ul",{className:`pl-4 flex flex-col gap-6 mt-4 transition-all duration-500 ${_?"opacity-1":"opacity-0"}`,children:t.subitems.map((g,R)=>e.jsx("li",{className:`cursor-pointer flex flex-row gap-8 justify-between w-full ${m(g.routeName)?f:""}`,onClick:P=>{P.preventDefault(),v(P,route(g.routeName,$))},children:e.jsx("span",{className:"pl-4",children:g.label})},R))})]},M)}),o=s.includes("projects.details")||s.includes("projects.callSheets");return e.jsx("div",{className:`page-navigation transition-all duration-300 h-full  bg-white shadow-xl rounded-2xl ${d?"opacity-1 pointer-events-auto":"opacity-0 pointer-events-none"}`,children:e.jsxs("div",{className:`p-8 w-full delay-300 duration-500 h-full ${d?"opacity-1":"opacity-0"}`,children:[e.jsx("div",{className:`fade-in ${s==="dashboard"?"":"hidden"}`,children:e.jsx("h2",{className:j,children:"Dashboard"})}),e.jsxs("div",{className:`fade-in flex flex-col h-full justify-between ${s.includes("projects")&&!o?"":"hidden"}`,children:[e.jsx("h2",{className:j,children:"Projects"}),e.jsx("ul",{className:"my-8 flex flex-col gap-6 ml-4 justify-start grow",children:r(w)}),e.jsx("button",{onClick:N,children:"New Project"}),s==="projects.list"&&e.jsxs("div",{className:"filters flex flex-col gap-4 pr-8 justify-end",children:[e.jsxs("select",{className:"bg-slate-200 text-sm px-2 py-1",children:[e.jsx("option",{value:"",children:"View All"}),e.jsx("option",{value:"",children:"Published"})]}),e.jsxs("select",{className:"bg-slate-200 text-sm px-2 py-1",children:[e.jsx("option",{value:"",children:"View All"}),e.jsx("option",{value:"",children:"Published"})]})]})]}),e.jsxs("div",{className:`fade-in ${o?"":"hidden"}`,children:[e.jsx("h2",{className:j,children:"Production Book"}),e.jsx("ul",{className:"my-8 flex flex-col gap-6 ml-4",children:r(S)}),s==="projects.callSheets.details.page"&&e.jsx("div",{className:"filters flex flex-col gap-4 pr-8 justify-end"})]}),e.jsxs("div",{className:`fade-in ${s==="profile.settings"?"":"hidden"}`,children:[e.jsx("h2",{className:j,children:"Settings"}),e.jsx("ul",{className:"my-8 flex flex-col gap-6 ml-4",children:r(k)})]})]})})},se=ee;function te({project:i}){const{toggleModal:d}=O(),{isDarkMode:s,toggleDarkMode:v}=F(),N=()=>{d({type:"projectForm"})},l=()=>{d({type:"logOut"})},h=s?"!text-emerald-500 !bg-slate-700 duration-500":"!text-emerald-500 !bg-slate-50 duration-500",c=n.useMemo(()=>(r,o,a)=>`${route().current(r)?a:""} ${o}`,[]),[p,j]=n.useState(""),[m,f]=n.useState(!1),b=n.useRef(),w=n.useRef(),S=()=>{const r=route().current();j(r),f(o=>!o)};n.useEffect(()=>{function r(a){b.current&&!b.current.contains(a.target)&&!w.current.contains(a.target)&&f(!1)}function o(a){a.key==="Escape"&&f(!1)}return document.addEventListener("mousedown",r),document.addEventListener("keydown",o),()=>{document.removeEventListener("mousedown",r),document.removeEventListener("keydown",o)}},[]);const k=(r,o)=>{r.preventDefault(),f(!1),setTimeout(()=>{z.visit(o)},200)};return e.jsxs("div",{id:"sidebar",className:` fixed left-[1rem] top-[1rem] h-[97%] flex flex-row ${m?"max-w-[25rem] gap-4":"gap-0"} duration-500`,children:[e.jsxs("div",{className:`py-6 z-50 rounded-2xl ${s?"duration-800 bg-slate-800":"bg-white"} w-[4rem] flex flex-col gap-4 justify-between`,children:[e.jsx(Z,{className:"text-emerald-500"}),e.jsx("div",{ref:w,className:"open-nav cursor-pointer flex flex-col gap-6 justify-start justify-center items-center py-8",onClick:S,children:e.jsx(x,{icon:U,className:`rounded-lg duration-500 rotate-90 h-[1.2rem] w-[1.2rem] p-[.75rem]
                            ${m?"bg-slate-100 text-emerald-500":`${s?"duration-800 text-slate-400 bg-slate-600 hover:bg-slate-50 hover:text-slate-500":"bg-slate-100 text-slate-400 hover:bg-slate-400 hover:text-white"}`} 
                        `})}),e.jsxs("div",{className:"sidebar-content grow justify-center flex flex-col gap-[8rem] mt-[5rem]",children:[e.jsxs("nav",{className:"nav-links cursor-pointer flex flex-col gap-4",children:[e.jsx(D,{href:route("dashboard"),className:"cursor-pointer",children:e.jsx(x,{icon:q,className:c("dashboard",`${s?"duration-800 hover:bg-slate-600 hover:text-slate-300 text-slate-500":"text-slate-300 hover:bg-slate-100 hover:text-slate-500"} duration-500 h-[1.2rem] w-[1.2rem] p-[.75rem]`,h)})}),e.jsx(D,{href:route("projects.index"),children:e.jsx(x,{icon:Q,className:c("projects.*",`${s?"duration-800 hover:bg-slate-600 hover:text-slate-300 text-slate-500":"text-slate-300 hover:bg-slate-100 hover:text-slate-500"} duration-500 h-[1.2rem] w-[1.2rem] p-[.75rem]`,h)})})]}),e.jsx("div",{className:"w-full flex justify-center items-center",children:e.jsx(x,{onClick:N,icon:T,className:`${s?"":"bg-white"} cursor-pointer hover:bg-white text-emerald-400 hover:text-emerald-600 rounded-full duration-500 drop-shadow-[0_0_5px_rgb(16,185,129,1)] flex justify-center text-[2.7rem] text-center`})})]}),e.jsxs("div",{className:"w-full flex flex-col gap-10 justify-end items-center ",children:[e.jsx(x,{icon:G,onClick:l,className:`${s?"duration-800 text-slate-700 hover:bg-slate-600":"text-slate-200 hover:bg-slate-50"} hover:text-rose-500 cursor-pointer duration-500 rounded-md h-[1.2rem] w-[1.2rem] p-[.75rem]`}),e.jsx(x,{icon:J,className:`${s?"duration-800 text-slate-700 ":"text-slate-200"} hover:text-blue-500 cursor-pointer duration-500 ease-in-out w-full text-2xl `})]})]}),e.jsx("div",{ref:b,className:`page-nav-container ${m?"visible":""}`,children:e.jsx(se,{project:i,activePage:p,isVisible:m,onLinkClick:k})})]})}function E(){const i=window.location.href;return e.jsxs(e.Fragment,{children:[e.jsx("div",{id:"surface-layer",className:"absolute z-50 w-full",children:e.jsx(K,{variant:"outlined",sx:{margin:"1.3rem 0rem 0rem 1.5rem",height:"96vh",width:"4.5rem",borderRadius:"10px"},children:e.jsxs("div",{className:"flex flex-col gap-4 justify-between h-full",children:[e.jsx(u,{variant:"rectangular",width:40,height:40}),e.jsxs("div",{className:"flex flex-col gap-8",children:[e.jsx(u,{variant:"rectangular",width:40,height:40}),e.jsx(u,{variant:"rectangular",width:40,height:40}),e.jsx(u,{variant:"rectangular",width:40,height:40})]}),e.jsx(u,{variant:"circular",width:40,height:40})]})})}),e.jsx("div",{className:"flex flex-col w-full h-screen overflow-hidden",children:i.includes("/dashboard")?e.jsx(d,{}):null})]});function d(){return e.jsx("div",{className:"portal-body w-full h-full pt-6 pb-8 pl-[12.5rem] pr-[7rem]",children:e.jsxs("div",{id:"dashboard-skeleton",className:"flex flex-col w-full h-full gap-4",children:[e.jsx(u,{variant:"rectangular",className:"rouned-xl",sx:{width:"100%",height:"250px"}}),e.jsxs("div",{className:"flex flex-row gap-6 h-full",children:[e.jsx(u,{variant:"rectangular",sx:{height:"100%"}}),e.jsx(u,{variant:"rectangular",sx:{height:"100%"}}),e.jsx(u,{variant:"rectangular",sx:{height:"100%"}})]})]})})}}function de({children:i,project:d}){const{user:s,fetchUserData:v}=I();n.useEffect(()=>{v()},[]);const[N,l]=n.useState(!1),[h,c]=n.useState("");n.useEffect(()=>{s&&s.is_password_temporary?(c("changePassword"),l(!0)):s&&!s.email_verified?(c("verification"),l(!0)):s&&!s.personal_info_completed?(c("personalInfo"),l(!0)):s&&!s.company_info_completed?(c("companyInfo"),l(!0)):s&&!s.registration_complete&&l(!1)},[s]);const p=s&&(s.is_password_temporary||!s.email_verified||!s.personal_info_completed||!s.company_info_completed);return e.jsx("div",{className:"min-h-screen tertiary-color relative bg-slate-50",children:s===null||p?e.jsx(e.Fragment,{children:p?e.jsxs("div",{className:"absolute z-40 w-full",children:[e.jsx(X,{isOpen:N,className:"!max-w-[70rem]",children:e.jsx(Y,{currentStep:h,setCurrentStep:c,setIsModalOpen:l})}),e.jsx(E,{})]}):e.jsx(E,{})}):e.jsxs("div",{className:"bg-slate-100",children:[e.jsx("div",{className:"absolute z-50 w-full",children:e.jsx(te,{project:d})}),e.jsx("main",{className:"flex flex-col w-full h-screen overflow-hidden",children:i.portal})]})})}export{de as A};
