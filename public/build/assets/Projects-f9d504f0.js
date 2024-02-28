import{r as W,j as r,u as L,b as A,c as q}from"./app-e454a32c.js";import K from"./ProjectList-6ab74586.js";import{P as U}from"./PortalLayout-21f32860.js";import{C as S}from"./CardContainer-6cb7a831.js";import{r as h,t as D,a as k,g as C,f as w}from"./CallSheetForm-20e93dad.js";import V from"./Tasks-e92bd127.js";import"./index-54708238.js";import"./index.es-372425f6.js";import"./index-af94e81f.js";import"./AuthenticatedLayout-4553473c.js";import"./Card-082eb031.js";import"./toPropertyKey-a22241f9.js";import"./useSlot-7faddf1c.js";import"./styleUtils-d305ac7d.js";import"./colorInversionUtils-9e65a708.js";import"./isMuiElement-fba65005.js";import"./Skeleton-55a267a9.js";import"./Modal-03e6d302.js";import"./VerificationProcess-aaf0356d.js";import"./SecondaryButton-a12dea95.js";import"./PersonalInfo-225ba40c.js";import"./Address-3dede1de.js";import"./Tooltip-be341731.js";import"./useIsFocusVisible-3e69e93a.js";import"./useEventCallback-49b41c49.js";import"./useEnhancedEffect-43c2324b.js";import"./Popper-834fe13e.js";import"./UserName-7eb75d0f.js";import"./Phone-fd7278da.js";import"./CompanyInfo-966f1a25.js";import"./VerificationStep-065ec25d.js";import"./PrimaryButton-40aba8a0.js";import"./ProfilePicture-49b15734.js";import"./ProjectForm-c36574b3.js";import"./ProjectSelector-c55f311c.js";import"./ProjectStepper-5ff8df0d.js";import"./Typography-48b79e4a.js";import"./extendSxProp-70f22bd8.js";import"./VideoStepOne-70db5a19.js";import"./VideoStepTwo-d27dbecc.js";import"./ViewerRating-c06ed4ae.js";import"./createSvgIcon-069ed90c.js";import"./createChainedFunction-0bab83cf.js";import"./debounce-517eeb3c.js";import"./ownerWindow-135fedc8.js";import"./Box-25ca7020.js";import"./variantColorInheritance-0e7a57f6.js";import"./FormControlContext-dfeeca36.js";import"./Chip-037a6e10.js";import"./useSwitch-57a90562.js";import"./MoviePoster-fb686c84.js";import"./index-f17427d6.js";import"./CircularProgress-431e3d65.js";import"./Option-7016ecea.js";import"./ListItemButton-b582df18.js";import"./createSvgIcon-6f7ee0c7.js";import"./Textarea-b1b6024c.js";import"./useForwardedInput-fe782f4f.js";import"./VideoStepThree-57290481.js";import"./GeneralCallTimeForm-f622f116.js";import"./Time-f58d8e31.js";import"./CallSheetProductionSchedule-6142bbbd.js";import"./SceneRow-2f04d50b.js";import"./EditableCell-2584109f.js";import"./EditableSelect-87da7aa7.js";import"./Duration-eb7c63a2.js";import"./BreakRow-1efa832e.js";import"./CompanyMoveRow-9e79e338.js";import"./AddButton-d4e3e0b8.js";import"./CallSheetRecipientForm-b11cbca1.js";import"./Email-e9e6f221.js";import"./Input-3887f8bc.js";import"./Select-2b2ac5b8.js";import"./ProjectImagePreview-817bab36.js";import"./ImageContainer-868b28f8.js";import"./LogOutForm-f10e7709.js";import"./LocationForm-e6585ccb.js";import"./lodash-ff26d80e.js";import"./Accordion-595a44e0.js";import"./AccordionContent-d0f04001.js";import"./Hospitals-175ed20a.js";import"./IconButton-c8b21cd2.js";import"./AddTaskModal-91a9c815.js";import"./EmptyContent-e38e0959.js";function Y(o,e){h(2,arguments);var t=D(o),a=k(e);return isNaN(a)?new Date(NaN):(a&&t.setDate(t.getDate()+a),t)}function M(o,e){h(2,arguments);var t=D(o),a=k(e);if(isNaN(a))return new Date(NaN);if(!a)return t;var n=t.getDate(),l=new Date(t.getTime());l.setMonth(t.getMonth()+a+1,0);var s=l.getDate();return n>=s?l:(t.setFullYear(l.getFullYear(),l.getMonth(),n),t)}function N(o,e){var t,a,n,l,s,d,c,f;h(1,arguments);var p=C(),u=k((t=(a=(n=(l=e==null?void 0:e.weekStartsOn)!==null&&l!==void 0?l:e==null||(s=e.locale)===null||s===void 0||(d=s.options)===null||d===void 0?void 0:d.weekStartsOn)!==null&&n!==void 0?n:p.weekStartsOn)!==null&&a!==void 0?a:(c=p.locale)===null||c===void 0||(f=c.options)===null||f===void 0?void 0:f.weekStartsOn)!==null&&t!==void 0?t:0);if(!(u>=0&&u<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");var m=D(o),v=m.getDay(),i=(v<u?7:0)+v-u;return m.setDate(m.getDate()-i),m.setHours(0,0,0,0),m}function F(o){h(1,arguments);var e=D(o);return e.setHours(0,0,0,0),e}function P(o,e){h(2,arguments);var t=k(e),a=t*7;return Y(o,a)}function H(o,e){h(2,arguments);var t=F(o),a=F(e);return t.getTime()===a.getTime()}function z(o,e){var t,a,n,l,s,d,c,f;h(1,arguments);var p=D(o),u=p.getFullYear(),m=C(),v=k((t=(a=(n=(l=e==null?void 0:e.firstWeekContainsDate)!==null&&l!==void 0?l:e==null||(s=e.locale)===null||s===void 0||(d=s.options)===null||d===void 0?void 0:d.firstWeekContainsDate)!==null&&n!==void 0?n:m.firstWeekContainsDate)!==null&&a!==void 0?a:(c=m.locale)===null||c===void 0||(f=c.options)===null||f===void 0?void 0:f.firstWeekContainsDate)!==null&&t!==void 0?t:1);if(!(v>=1&&v<=7))throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");var i=new Date(0);i.setFullYear(u+1,0,v),i.setHours(0,0,0,0);var y=N(i,e),g=new Date(0);g.setFullYear(u,0,v),g.setHours(0,0,0,0);var x=N(g,e);return p.getTime()>=y.getTime()?u+1:p.getTime()>=x.getTime()?u:u-1}function B(o,e){var t,a,n,l,s,d,c,f;h(1,arguments);var p=C(),u=k((t=(a=(n=(l=e==null?void 0:e.firstWeekContainsDate)!==null&&l!==void 0?l:e==null||(s=e.locale)===null||s===void 0||(d=s.options)===null||d===void 0?void 0:d.firstWeekContainsDate)!==null&&n!==void 0?n:p.firstWeekContainsDate)!==null&&a!==void 0?a:(c=p.locale)===null||c===void 0||(f=c.options)===null||f===void 0?void 0:f.firstWeekContainsDate)!==null&&t!==void 0?t:1),m=z(o,e),v=new Date(0);v.setFullYear(m,0,u),v.setHours(0,0,0,0);var i=N(v,e);return i}var G=6048e5;function $(o,e){h(1,arguments);var t=D(o),a=N(t,e).getTime()-B(t,e).getTime();return Math.round(a/G)+1}function J(o,e){var t,a,n,l,s,d,c,f;h(1,arguments);var p=C(),u=k((t=(a=(n=(l=e==null?void 0:e.weekStartsOn)!==null&&l!==void 0?l:e==null||(s=e.locale)===null||s===void 0||(d=s.options)===null||d===void 0?void 0:d.weekStartsOn)!==null&&n!==void 0?n:p.weekStartsOn)!==null&&a!==void 0?a:(c=p.locale)===null||c===void 0||(f=c.options)===null||f===void 0?void 0:f.weekStartsOn)!==null&&t!==void 0?t:0);if(!(u>=0&&u<=6))throw new RangeError("weekStartsOn must be between 0 and 6");var m=D(o),v=m.getDay(),i=(v<u?-7:0)+6-(v-u);return m.setHours(0,0,0,0),m.setDate(m.getDate()+i),m}function _(o,e){h(2,arguments);var t=k(e);return M(o,-t)}function R(o,e){h(2,arguments);var t=k(e);return P(o,-t)}const Q=({showDetailsHandle:o})=>{const[e,t]=W.useState(new Date),[a,n]=W.useState($(e)),[l,s]=W.useState(new Date),d=i=>{i==="prev"&&t(_(e,1)),i==="next"&&t(M(e,1)),i==="today"&&t(new Date)},c=i=>{i==="prev"&&(t(R(e,1)),n($(R(e,1)))),i==="next"&&(t(P(e,1)),n($(P(e,1))))},f=(i,y)=>{s(i),o(y)},p=()=>{const i=w(e,"yyyy"),y=w(_(e,1),"yyyy"),g=w(M(e,1),"yyyy"),x=y!==i?w(_(e,1),"MMMM yyyy"):w(_(e,1),"MMMM"),O=g!==i?w(M(e,1),"MMMM yyyy"):w(M(e,1),"MMMM");return r.jsxs("div",{className:"header pt-2 pb-4 flex-row flex w-full justify-between",children:[r.jsx("div",{className:"justify-start",children:r.jsx("div",{className:"cursor-pointer w-[15rem] text-lg font-semibold",onClick:()=>d("prev"),children:x})}),r.jsx("div",{className:"justify-center w-[20rem] text-center text-xl font-bold",children:r.jsx("span",{children:w(e,"MMM yyyy")})}),r.jsx("div",{className:"justify-end",children:r.jsx("div",{className:"cursor-pointer w-[15rem] text-lg font-semibold text-right",onClick:()=>d("next"),children:O})})]})},u=()=>{const i="EEE",y=[];let g=N(e,{weekStartsOn:1});for(let x=0;x<7;x++)y.push(r.jsx("div",{className:"col col-center",children:w(Y(g,x),i)},x));return r.jsx("div",{className:"days row ",children:y})},m=()=>{const i=N(e,{weekStartsOn:1}),y=J(e,{weekStartsOn:1}),g="d",x=[];let O=[],j=i,b="";for(;j<=y;){for(let E=0;E<7;E++){b=w(j,g);const T=j;O.push(r.jsxs("div",{className:`col cell h-full ${H(j,new Date)?"today":H(j,l)?"selected":""}`,onClick:()=>{const I=w(T,"ccc dd MMM yy");f(T,I)},children:[r.jsx("span",{className:"number",children:b}),r.jsx("span",{className:"bg",children:b})]},j)),j=Y(j,1)}x.push(r.jsx("div",{className:"row h-full",children:O},j)),O=[]}return r.jsx("div",{className:"body h-full",children:x})},v=()=>r.jsxs("div",{className:"flex-row flex px-8 pt-4 justify-between w-full",children:[r.jsx("div",{className:"justify-start",onClick:()=>c("prev"),children:r.jsx("div",{className:"duration-500 transition-all cursor-pointer text-slate-300 hover:text-slate-500 font-bold",children:"Prev. Week"})}),r.jsx("div",{className:"justify-center",onClick:()=>d("today"),children:r.jsx("div",{className:"duration-500 transition-all  cursor-pointer text-slate-300 hover:text-slate-500 font-bold",children:"Today"})}),r.jsx("div",{className:"justify-end",onClick:()=>c("next"),children:r.jsx("div",{className:"duration-500 transition-all  cursor-pointer text-slate-300 hover:text-slate-500 font-bold",children:"Next Week"})})]});return r.jsxs("div",{className:"calendar flex flex-col h-full",children:[p(),u(),m(),v()]})},X=Q;function bt({auth:o}){L();const{projects:e}=A(),{toggleModal:t}=q(),a=()=>{t({type:"projectForm"})},n=e.sort((l,s)=>new Date(s.updated_at)-new Date(l.updated_at)).slice(0,1);return r.jsx(U,{breadcrumbs:[{label:"Projects Overview",url:""}],children:{body:r.jsxs("div",{className:"flex flex-col gap-4 w-full h-full",children:[r.jsxs("div",{className:"flex flex-row gap-4 w-full h-full max-h-[26rem]",children:[r.jsx(S,{header:"Recent Updated Project",className:"h-full w-full max-w-[18rem]",children:n.length>0?r.jsx(K,{bannerClassName:"!bg-slate-600 !text-slate-00",bannerTextColor:"text-white",projects:n,showNewProject:!1,view:"View All",className:"w-full !grid-cols-1 !grid-rows-1"}):r.jsx("div",{onClick:a,className:"cursor-pointer hover:bg-slate-100 duration-500 transition-all flex justify-center items-center p-8 text-center text-slate-400 h-full w-full bg-slate-50 border-2 border-dashed rounded-lg",children:"No projects available. Start a new project now!"})}),r.jsx(S,{header:"Project Calendar",className:"h-full w-full",children:r.jsx(X,{})})]}),r.jsxs("div",{className:"flex flex-row gap-4 h-full",children:[r.jsx(V,{}),r.jsx(S,{header:"",className:"h-full w-full"})]})]})}})}export{bt as default};