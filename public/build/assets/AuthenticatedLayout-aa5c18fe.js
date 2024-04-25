import{j as e,b as F,u as R,c as D,r as i,R as T,e as q,d as I,y as B}from"./app-8b83436b.js";import{F as o}from"./index.es-ee268f83.js";import{e as H,g as O,h as M,i as Q,j as G,k as V,l as J,m as K,n as U,o as X,p as Y,q as Z,r as _,s as ee}from"./index-e6ab5b50.js";import{M as te}from"./Modal-16f11f32.js";import se from"./VerificationProcess-da2c3136.js";import{C as ae}from"./CircularProgress-4f3ac99e.js";function re({className:f}){return e.jsx("div",{className:`${f} application-logo`,children:e.jsx(o,{icon:H,className:"logo-icon"})})}const le=({project:f,isVisible:m,activePage:t,onLinkClick:x})=>{const{currentProjectId:v}=F(),{createNewProject:w}=R(),{darkModeSetting:p}=D(),a=v,j={"projects.callSheets.index":t.startsWith("callSheet.details.page")},[k,g]=i.useState(j),n=p==="light"?"bg-white":"bg-slate-800",d=`text-2xl ${p==="light"?"text-slate-500":"text-white"}`,b=h=>!!(t.startsWith(h)||h==="projects.callSheets.index"&&t.startsWith("callSheet.details.page")),y="font-bold text-emerald-500",C=h=>{g(s=>({...s,[h]:!s[h]}))},r=[{label:"Overview",routeName:"projects.index",icon:O},{label:"Project Overview",routeName:"projects.list",icon:G}],l=[{label:"Details",routeName:"project.details",icon:O},{label:"Call Sheets",routeName:"projects.callSheets.index",icon:M,subitems:a&&t.startsWith("callSheet.details.page")?[{label:"Subitem 1",routeName:`projects.callSheets.details.${a}.subitem1`,icon:M},{label:"Subitem 2",routeName:`projects.callSheets.details.${a}.subitem2`,icon:M}]:[]}],u=[{label:"Profile Settings",routeName:"profile.settings",icon:V},{label:"Account Settings",routeName:"settings.account",icon:V}],$=h=>h.map((s,W)=>{let P={};(s.routeName.startsWith("project.details")||s.routeName==="projects.callSheets.index")&&(P={projectId:a});const S=s.subitems&&s.subitems.length>0,A=k[s.routeName];return e.jsxs(T.Fragment,{children:[e.jsxs("li",{className:`cursor-pointer justify-between w-full ${S?"flex flex-row":""} ${b(s.routeName)?y:""}`,children:[e.jsxs("div",{className:"flex flex-row gap-4",onClick:N=>{N.preventDefault(),S||x(N,route(s.routeName,P))},children:[e.jsx(o,{className:"my-auto text-xl",icon:s.icon}),e.jsx("span",{className:`w-full flex text-left shrink text-xl ${b(s.routeName)?y:""}`,children:s.label})]}),S&&e.jsx(o,{icon:Q,style:{transform:A?"rotate(-90deg)":"rotate(0deg)",transition:"transform 0.5s ease"},className:"my-auto text-xl cursor-pointer",onClick:()=>C(s.routeName)})]}),S&&e.jsx("ul",{className:`pl-4 flex flex-col gap-6 mt-4 transition-all duration-500 ${A?"opacity-1":"opacity-0"}`,children:s.subitems.map((N,z)=>e.jsx("li",{className:`cursor-pointer flex flex-row gap-8 justify-between w-full ${b(N.routeName)?y:""}`,onClick:E=>{E.preventDefault(),x(E,route(N.routeName,P))},children:e.jsx("span",{className:"pl-4",children:N.label})},z))})]},W)}),L=t.includes("project.details")||t.includes("projects.callSheets");return e.jsx("div",{className:`page-navigation transition-all duration-300 h-full ${n} shadow-xl rounded-2xl ${m?"opacity-1 pointer-events-auto":"opacity-0 pointer-events-none"}`,children:e.jsxs("div",{className:`p-8 w-full delay-300 duration-500 h-full ${m?"opacity-1":"opacity-0"}`,children:[e.jsx("div",{className:`fade-in ${t==="dashboard"?"":"hidden"}`,children:e.jsx("h2",{className:d,children:"Dashboard"})}),e.jsxs("div",{className:`fade-in flex flex-col h-full justify-between ${t.includes("projects")&&!L?"":"hidden"}`,children:[e.jsx("h2",{className:d,children:"Projects"}),e.jsx("ul",{className:"my-8 flex flex-col gap-6 ml-4 justify-start grow",children:$(r)}),e.jsx("button",{onClick:w,children:"New Project"}),t==="projects.list"&&e.jsxs("div",{className:"filters flex flex-col gap-4 pr-8 justify-end",children:[e.jsxs("select",{className:"bg-slate-200 text-sm px-2 py-1",children:[e.jsx("option",{value:"",children:"View All"}),e.jsx("option",{value:"",children:"Published"})]}),e.jsxs("select",{className:"bg-slate-200 text-sm px-2 py-1",children:[e.jsx("option",{value:"",children:"View All"}),e.jsx("option",{value:"",children:"Published"})]})]})]}),e.jsxs("div",{className:`fade-in ${L?"":"hidden"}`,children:[e.jsx("h2",{className:d,children:"Production Book"}),e.jsx("ul",{className:"my-8 flex flex-col gap-6 ml-4",children:$(l)}),t==="callSheet.details.page"&&e.jsx("div",{className:"filters flex flex-col gap-4 pr-8 justify-end"})]}),e.jsxs("div",{className:`fade-in ${t==="profile.settings"?"":"hidden"}`,children:[e.jsx("h2",{className:d,children:"Settings"}),e.jsx("ul",{className:"my-8 flex flex-col gap-6 ml-4",children:$(u)})]})]})})},oe=le;function ie({project:f}){const{toggleModal:m}=q(),{darkModeSetting:t,setDarkModeSetting:x}=D(),v=()=>{m({type:"projectForm"})},w=()=>{m({type:"logOut"})},p=()=>{x(t==="light"?"dark":"light")},a=t==="dark"?"!text-emerald-500 !bg-slate-900 duration-500":"!text-emerald-500 !bg-slate-50 duration-500",j=i.useMemo(()=>(r,l,u)=>`${route().current(r)?u:""} ${l}`,[]),[k,g]=i.useState(""),[n,c]=i.useState(!1),d=i.useRef(),b=i.useRef(),y=()=>{const r=route().current();g(r),c(l=>!l)};i.useEffect(()=>{function r(u){d.current&&!d.current.contains(u.target)&&!b.current.contains(u.target)&&c(!1)}function l(u){u.key==="Escape"&&c(!1)}return document.addEventListener("mousedown",r),document.addEventListener("keydown",l),()=>{document.removeEventListener("mousedown",r),document.removeEventListener("keydown",l)}},[]);const C=(r,l)=>{r.preventDefault(),c(!1),setTimeout(()=>{B.visit(l)},200)};return e.jsxs("div",{id:"sidebar",className:` fixed left-[1rem] top-[1rem] h-[97%] flex flex-row ${n?"max-w-[25rem] gap-4":"gap-0"} duration-500`,children:[e.jsxs("div",{className:`py-6 z-50 rounded-2xl duration-500 ${t==="dark"?"bg-slate-900":"bg-white"} w-[4rem] flex flex-col gap-4 justify-between`,children:[e.jsx(re,{className:"text-emerald-500"}),e.jsx("div",{ref:b,className:"open-nav cursor-pointer flex flex-col justify-start justify-center items-center py-8",onClick:y,children:e.jsx(o,{icon:J,className:`rounded-lg duration-500 rotate-90 h-[1.2rem] w-[1.2rem] p-[.75rem]
                            ${n?"bg-slate-100 text-emerald-500":`${t==="dark"?"duration-800 text-white bg-rose-600 hover:bg-white hover:text-rose-500":"bg-rose-400 text-white hover:bg-rose-600 hover:text-white"}`} 
                        `})}),e.jsx("div",{className:"w-full py-[2rem] flex justify-center items-center",children:e.jsx("div",{onClick:v,className:"p-[.7rem] border-white border-[.15rem] bg-emerald-500 hover:border-emerald-500 hover:bg-white duration-500 shadow-md rounded-full cursor-pointer group",children:e.jsx(o,{icon:K,className:" h-[1.2rem] w-[1.2rem] text-white group-hover:text-emerald-500 rounded-full duration-500 flex justify-center text-center"})})}),e.jsx("div",{className:"sidebar-content grow justify-center pb-[8rem] flex flex-col gap-[8rem]",children:e.jsxs("nav",{className:"nav-links cursor-pointer flex flex-col gap-4",children:[e.jsx(I,{href:route("dashboard"),className:"cursor-pointer",children:e.jsx(o,{icon:U,className:j("dashboard",`${t==="dark"?"duration-800 hover:bg-slate-600 hover:text-slate-300 text-slate-500":"text-slate-300 hover:bg-slate-100 hover:text-slate-500"} duration-500 h-[1.2rem] w-[1.2rem] p-[.75rem]`,a)})}),e.jsx(I,{href:route("projects.index"),children:e.jsx(o,{icon:X,className:j("projects.*",`${t==="dark"?"duration-800 hover:bg-slate-600 hover:text-slate-300 text-slate-500":"text-slate-300 hover:bg-slate-100 hover:text-slate-500"} duration-500 h-[1.2rem] w-[1.2rem] p-[.75rem]`,a)})})]})}),e.jsxs("div",{className:"w-full flex flex-col gap-6 justify-end items-center ",children:[e.jsx(o,{icon:t==="dark"?Y:Z,onClick:p,className:`${t==="dark"?"text-rose-200":"text-slate-300 hover:text-slate-600"} cursor-pointer duration-500 rounded-md h-[1.2rem] w-[1.2rem] p-[.75rem]`}),e.jsx(o,{icon:_,onClick:w,className:`${t==="dark"?"duration-800 text-slate-700 hover:bg-slate-600":"text-slate-200 hover:bg-slate-50"} hover:text-rose-500 cursor-pointer duration-500 rounded-md h-[1.2rem] w-[1.2rem] p-[.75rem]`}),e.jsx(o,{icon:ee,className:`${t==="dark"?"duration-800 text-slate-700 ":"text-slate-200"} hover:text-blue-500 cursor-pointer duration-500 ease-in-out w-full text-2xl `})]})]}),e.jsx("div",{ref:d,className:`page-nav-container ${n?"visible":""}`,children:e.jsx(oe,{project:f,activePage:k,isVisible:n,onLinkClick:C})})]})}function he({children:f,project:m}){const{darkModeSetting:t}=D(),{isModalOpen:x,currentStep:v,setIsModalOpen:w,setCurrentStep:p,isLoading:a}=R(),[j,k]=i.useState(!1);i.useEffect(()=>{let c;return a||(c=setTimeout(()=>k(!0),600)),()=>clearTimeout(c)},[a]);const g={light:"bg-slate-100",dark:"bg-slate-700",midnight:"bg-slate-900"},n=g[t]||g.light;return a||!j?e.jsx("div",{className:"w-full min-h-screen bg-white text-rose-500 text-center flex justify-center items-center ",children:e.jsx(ae,{variant:"soft",color:"neutral",thickness:4})}):e.jsxs("div",{className:"min-h-screen tertiary-color relative bg-slate-50",children:[x&&e.jsx("div",{className:"absolute z-40 w-full",children:e.jsx(te,{isOpen:x,shouldCloseOnOverlayClick:!1,className:"!w-[70rem]",children:e.jsx(se,{currentStep:v,setCurrentStep:p,setIsModalOpen:w})})}),e.jsxs("div",{className:`duration-500 ${n}`,children:[e.jsx("div",{className:"absolute z-30 w-full",children:e.jsx(ie,{project:m})}),e.jsx("main",{className:"flex flex-col w-full h-screen overflow-hidden",children:f.portal})]})]})}export{he as A};