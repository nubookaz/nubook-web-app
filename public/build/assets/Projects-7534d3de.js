import{r as W,j as r,u as L,b as A,c as q}from"./app-659a3aa2.js";import K from"./ProjectList-9fb1571c.js";import{P as V}from"./PortalLayout-4dd080df.js";import{C as S}from"./CardContainer-713d9aa9.js";import{r as h,t as D,a as k,g as _,f as w}from"./index-7f71a8ef.js";import z from"./Tasks-b1c1015e.js";import B from"./CreateClient-b24f170f.js";import"./index-84704c9c.js";import"./index.es-6780b8c7.js";import"./index-9e3aa4c7.js";import"./AuthenticatedLayout-a56b9925.js";import"./Modal-cab82769.js";import"./VerificationProcess-0d2b000e.js";import"./SecondaryButton-f759061d.js";import"./PersonalInfo-2c76bf67.js";import"./Address-b2f5ad35.js";import"./Tooltip-a5a4d78a.js";import"./toPropertyKey-61b1ecea.js";import"./useSlot-d43794ee.js";import"./useIsFocusVisible-7ca602c7.js";import"./useControlled-adcd3c46.js";import"./useEventCallback-0c2e09c7.js";import"./useEnhancedEffect-12b0a06e.js";import"./Popper-26c3d1f1.js";import"./UserName-0c92173c.js";import"./Phone-b419726f.js";import"./CompanyInfo-5d71478b.js";import"./VerificationStep-c3c15079.js";import"./PrimaryButton-bfc388c8.js";import"./Skeleton-22ae0279.js";import"./ProfilePicture-95ba5e02.js";import"./CreateProject-e710c587.js";import"./ProjectStepper-a31dfa8b.js";import"./Typography-4dbb1ff2.js";import"./extendSxProp-9e510b8c.js";import"./isMuiElement-3bff42a8.js";import"./ProjectTypeSelector-6f56c21f.js";import"./CorporateProjectTypeSelector-2a85e279.js";import"./FamilyEventsTypeSelector-2cc0fb57.js";import"./DigitalContentTypeSelector-91f38218.js";import"./WeddingDetails-6575ed78.js";import"./Time-ed827f8c.js";import"./LiveBroadcastTypeSelector-c3d16e4b.js";import"./LiveEventDetails-bae22e22.js";import"./CreativeEntertainmentTypeSelector-8a17e34a.js";import"./VideoProjectDetails-40e36ef0.js";import"./ProjectPoster-231b66c4.js";import"./Chip-a964b04e.js";import"./variantColorInheritance-f8d1dad2.js";import"./styleUtils-0df93871.js";import"./VideoAdditionalDetails-b10bcf4c.js";import"./EmptyContent-f0c7321b.js";import"./FormControl-ce9c98b9.js";import"./FormControlContext-dd3b9a17.js";import"./Autocomplete-653e6d3e.js";import"./createSvgIcon-b106def2.js";import"./CircularProgress-af137ff7.js";import"./useForwardedInput-be5dd50b.js";import"./ListItemButton-7a78b6ef.js";import"./RadioGroupContext-96bab4a2.js";import"./CreateCallSheet-51bee10a.js";import"./Input-4561b985.js";import"./Select-a8ef8a22.js";import"./CallSheetDetailsForm-6ed5f5d0.js";import"./UpdateCallSheet-a3e95954.js";import"./GeneralCallTimeForm-c89879f5.js";import"./CallSheetProductionSchedule-246588be.js";import"./SceneRow-4a13cc5d.js";import"./EditableCell-25ac580d.js";import"./EditableSelect-b9b77a41.js";import"./Duration-09a34f40.js";import"./BreakRow-461f466a.js";import"./CompanyMoveRow-462377d3.js";import"./AddButton-1ab2e6ad.js";import"./CreateRecipient-c7fa9deb.js";import"./Email-11da6fc8.js";import"./ProjectImagePreview-534c62c0.js";import"./ImageContainer-307535ce.js";import"./LogOutForm-2b7d1a74.js";import"./LocationForm-600a638c.js";import"./lodash-4de87c17.js";import"./Accordion-a4ba251b.js";import"./AccordionContent-02b996ba.js";import"./Hospitals-fe8d748f.js";import"./IconButton-850b944a.js";import"./AddTaskModal-5b11b501.js";function Y(o,e){h(2,arguments);var t=D(o),a=k(e);return isNaN(a)?new Date(NaN):(a&&t.setDate(t.getDate()+a),t)}function M(o,e){h(2,arguments);var t=D(o),a=k(e);if(isNaN(a))return new Date(NaN);if(!a)return t;var l=t.getDate(),i=new Date(t.getTime());i.setMonth(t.getMonth()+a+1,0);var s=i.getDate();return l>=s?i:(t.setFullYear(i.getFullYear(),i.getMonth(),l),t)}function N(o,e){var t,a,l,i,s,d,c,f;h(1,arguments);var p=_(),u=k((t=(a=(l=(i=e==null?void 0:e.weekStartsOn)!==null&&i!==void 0?i:e==null||(s=e.locale)===null||s===void 0||(d=s.options)===null||d===void 0?void 0:d.weekStartsOn)!==null&&l!==void 0?l:p.weekStartsOn)!==null&&a!==void 0?a:(c=p.locale)===null||c===void 0||(f=c.options)===null||f===void 0?void 0:f.weekStartsOn)!==null&&t!==void 0?t:0);if(!(u>=0&&u<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");var m=D(o),v=m.getDay(),n=(v<u?7:0)+v-u;return m.setDate(m.getDate()-n),m.setHours(0,0,0,0),m}function F(o){h(1,arguments);var e=D(o);return e.setHours(0,0,0,0),e}function P(o,e){h(2,arguments);var t=k(e),a=t*7;return Y(o,a)}function H(o,e){h(2,arguments);var t=F(o),a=F(e);return t.getTime()===a.getTime()}function G(o,e){var t,a,l,i,s,d,c,f;h(1,arguments);var p=D(o),u=p.getFullYear(),m=_(),v=k((t=(a=(l=(i=e==null?void 0:e.firstWeekContainsDate)!==null&&i!==void 0?i:e==null||(s=e.locale)===null||s===void 0||(d=s.options)===null||d===void 0?void 0:d.firstWeekContainsDate)!==null&&l!==void 0?l:m.firstWeekContainsDate)!==null&&a!==void 0?a:(c=m.locale)===null||c===void 0||(f=c.options)===null||f===void 0?void 0:f.firstWeekContainsDate)!==null&&t!==void 0?t:1);if(!(v>=1&&v<=7))throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");var n=new Date(0);n.setFullYear(u+1,0,v),n.setHours(0,0,0,0);var y=N(n,e),g=new Date(0);g.setFullYear(u,0,v),g.setHours(0,0,0,0);var x=N(g,e);return p.getTime()>=y.getTime()?u+1:p.getTime()>=x.getTime()?u:u-1}function J(o,e){var t,a,l,i,s,d,c,f;h(1,arguments);var p=_(),u=k((t=(a=(l=(i=e==null?void 0:e.firstWeekContainsDate)!==null&&i!==void 0?i:e==null||(s=e.locale)===null||s===void 0||(d=s.options)===null||d===void 0?void 0:d.firstWeekContainsDate)!==null&&l!==void 0?l:p.firstWeekContainsDate)!==null&&a!==void 0?a:(c=p.locale)===null||c===void 0||(f=c.options)===null||f===void 0?void 0:f.firstWeekContainsDate)!==null&&t!==void 0?t:1),m=G(o,e),v=new Date(0);v.setFullYear(m,0,u),v.setHours(0,0,0,0);var n=N(v,e);return n}var Q=6048e5;function $(o,e){h(1,arguments);var t=D(o),a=N(t,e).getTime()-J(t,e).getTime();return Math.round(a/Q)+1}function U(o,e){var t,a,l,i,s,d,c,f;h(1,arguments);var p=_(),u=k((t=(a=(l=(i=e==null?void 0:e.weekStartsOn)!==null&&i!==void 0?i:e==null||(s=e.locale)===null||s===void 0||(d=s.options)===null||d===void 0?void 0:d.weekStartsOn)!==null&&l!==void 0?l:p.weekStartsOn)!==null&&a!==void 0?a:(c=p.locale)===null||c===void 0||(f=c.options)===null||f===void 0?void 0:f.weekStartsOn)!==null&&t!==void 0?t:0);if(!(u>=0&&u<=6))throw new RangeError("weekStartsOn must be between 0 and 6");var m=D(o),v=m.getDay(),n=(v<u?-7:0)+6-(v-u);return m.setHours(0,0,0,0),m.setDate(m.getDate()+n),m}function C(o,e){h(2,arguments);var t=k(e);return M(o,-t)}function R(o,e){h(2,arguments);var t=k(e);return P(o,-t)}const X=({showDetailsHandle:o})=>{const[e,t]=W.useState(new Date),[a,l]=W.useState($(e)),[i,s]=W.useState(new Date),d=n=>{n==="prev"&&t(C(e,1)),n==="next"&&t(M(e,1)),n==="today"&&t(new Date)},c=n=>{n==="prev"&&(t(R(e,1)),l($(R(e,1)))),n==="next"&&(t(P(e,1)),l($(P(e,1))))},f=(n,y)=>{s(n),o(y)},p=()=>{const n=w(e,"yyyy"),y=w(C(e,1),"yyyy"),g=w(M(e,1),"yyyy"),x=y!==n?w(C(e,1),"MMMM yyyy"):w(C(e,1),"MMMM"),O=g!==n?w(M(e,1),"MMMM yyyy"):w(M(e,1),"MMMM");return r.jsxs("div",{className:"header pt-2 pb-4 flex-row flex w-full justify-between",children:[r.jsx("div",{className:"justify-start",children:r.jsx("div",{className:"cursor-pointer w-[15rem] text-lg font-semibold",onClick:()=>d("prev"),children:x})}),r.jsx("div",{className:"justify-center w-[20rem] text-center text-xl font-bold",children:r.jsx("span",{children:w(e,"MMM yyyy")})}),r.jsx("div",{className:"justify-end",children:r.jsx("div",{className:"cursor-pointer w-[15rem] text-lg font-semibold text-right",onClick:()=>d("next"),children:O})})]})},u=()=>{const n="EEE",y=[];let g=N(e,{weekStartsOn:1});for(let x=0;x<7;x++)y.push(r.jsx("div",{className:"col col-center",children:w(Y(g,x),n)},x));return r.jsx("div",{className:"days row ",children:y})},m=()=>{const n=N(e,{weekStartsOn:1}),y=U(e,{weekStartsOn:1}),g="d",x=[];let O=[],j=n,b="";for(;j<=y;){for(let E=0;E<7;E++){b=w(j,g);const T=j;O.push(r.jsxs("div",{className:`col cell h-full ${H(j,new Date)?"today":H(j,i)?"selected":""}`,onClick:()=>{const I=w(T,"ccc dd MMM yy");f(T,I)},children:[r.jsx("span",{className:"number",children:b}),r.jsx("span",{className:"bg",children:b})]},j)),j=Y(j,1)}x.push(r.jsx("div",{className:"row h-full",children:O},j)),O=[]}return r.jsx("div",{className:"body h-full",children:x})},v=()=>r.jsxs("div",{className:"flex-row flex px-8 pt-4 justify-between w-full",children:[r.jsx("div",{className:"justify-start",onClick:()=>c("prev"),children:r.jsx("div",{className:"duration-500 transition-all cursor-pointer text-slate-300 hover:text-slate-500 font-bold",children:"Prev. Week"})}),r.jsx("div",{className:"justify-center",onClick:()=>d("today"),children:r.jsx("div",{className:"duration-500 transition-all  cursor-pointer text-slate-300 hover:text-slate-500 font-bold",children:"Today"})}),r.jsx("div",{className:"justify-end",onClick:()=>c("next"),children:r.jsx("div",{className:"duration-500 transition-all  cursor-pointer text-slate-300 hover:text-slate-500 font-bold",children:"Next Week"})})]});return r.jsxs("div",{className:"calendar flex flex-col h-full",children:[p(),u(),m(),v()]})},Z=X;function $t({auth:o}){L();const{projects:e}=A(),{toggleModal:t}=q(),a=()=>{t({type:"projectForm"})},l=e.sort((i,s)=>new Date(s.updated_at)-new Date(i.updated_at)).slice(0,1);return console.log(l),r.jsx(V,{breadcrumbs:[{label:"Projects Overview",url:""}],children:{body:r.jsxs("div",{className:"flex flex-col gap-4 w-full h-full",children:[r.jsxs("div",{className:"flex flex-row gap-4 w-full h-full max-h-[26rem]",children:[r.jsx(S,{header:"Recent Project",className:"h-full w-full max-w-[18rem]",children:l.length>0?r.jsx(K,{bannerClassName:"!bg-slate-600 !text-slate-00",bannerTextColor:"text-white",projects:l,showNewProject:!1,view:"View All",className:"w-full !grid-cols-1 !grid-rows-1 !gap-0"}):r.jsx("div",{onClick:a,className:"cursor-pointer hover:bg-slate-100 duration-500 transition-all flex justify-center items-center p-8 text-center text-slate-400 h-full w-full bg-slate-50 border-2 border-dashed rounded-lg",children:"No projects available. Start a new project now!"})}),r.jsx(S,{header:"Project Calendar",className:"h-full w-full",children:r.jsx(Z,{})})]}),r.jsxs("div",{className:"flex flex-row gap-4 h-full",children:[r.jsx(z,{}),r.jsx(S,{header:"Clients",className:"h-full w-full",children:r.jsx(B,{})})]})]})}})}export{$t as default};
