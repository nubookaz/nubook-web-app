import{b as v,m as w,r,j as s}from"./app-eefe6961.js";import{C as b}from"./CardContainer-85b3eca7.js";import{E as C}from"./EmptyContent-4e9f737f.js";import{A as R}from"./Avatar-2a2b2d13.js";import"./index.es-6f9cfa5f.js";import"./index-d5199ec3.js";import"./index-1074990b.js";import"./SecondaryButton-70a47f80.js";import"./toPropertyKey-a23e7eac.js";import"./useSlot-a85726b4.js";import"./createSvgIcon-55254c0b.js";function L({callSheet:o,className:u}){const{toggleModal:x}=v(),{currentCallSheet:N,callSheetRecipients:a,setCallSheetRecipients:_}=w(),f=()=>{x({type:"recipientForm"})},h=e=>{x({type:"editRecipientForm",data:{user:e}})},[p,m]=r.useState([]);r.useEffect(()=>{var n;const e=((n=o.users)==null?void 0:n.filter(i=>i.pivot.role_name!=="Admin"))||[];m(e)},[o.users]),r.useEffect(()=>{const e=o.users||[],n=new Set(p.map(l=>l.id)),i=new Set(e.map(l=>l.id));(e.length!==p.length||[...i].some(l=>!n.has(l)))&&m(e)},[o.users]),r.useEffect(()=>{let e=(o.users||[]).filter(t=>t.pivot.role_name!=="Admin");const i=[...e,...a.filter(t=>t.pivot.role_name!=="Admin"&&!e.some(l=>l.id===t.id))].map(t=>{const l=a.findIndex(c=>c.id===t.id&&c.pivot.role_name!=="Admin");return l!==-1?a[l]:t});m(i)},[o.users,a]);const g=e=>{if(!e)return"";const[n,i]=e.split(":"),t=parseInt(n,10),l=t>=12?"PM":"AM";return`${t%12||12}:${i} ${l}`},d=a.reduce((e,n)=>{if(n.pivot.role_name==="Admin")return e;const i=n.pivot.role_name,t=["Client","Crew","Talent","Extra"].includes(i)?i+"s":"Unassigned";return e[t]||(e[t]=[]),e[t].push(n),e},{}),j=(e,n)=>{var i,t;return s.jsxs("div",{className:"flex flex-row gap-4 items-center py-2 px-4 shadow-sm rounded-lg bg-white justify-between cursor-pointer",onClick:()=>h(e),children:[s.jsx(R,{className:"shrink",slotProps:{root:{sx:{margin:"0 !important"}},fallback:{sx:{color:"red"}}}}),s.jsx("div",{className:"text-left text-sm font-bold flex flex-col w-full justify-start text-slate-500",children:`${e.first_name} ${e.last_name}`}),s.jsxs("div",{className:"leading-[1.15rem] text-sm w-full max-w-[4.5rem] text-left font-bold flex flex-col text-slate-500",children:[s.jsx("span",{className:"text-xs font-normal text-slate-400",children:"Role"}),e.pivot.role_name]}),s.jsxs("div",{className:"leading-[1.15rem] text-sm w-full max-w-[5rem] text-left font-bold flex flex-col text-slate-500",children:[s.jsx("span",{className:"text-xs font-normal text-slate-400",children:"Position"}),e.position||((i=e.pivot)==null?void 0:i.position)]}),s.jsxs("div",{className:"leading-[1.15rem] w-full max-w-[5rem] justify-end text-right text-sm font-bold flex flex-col text-slate-500",children:[s.jsx("span",{className:"text-xs font-normal text-slate-400",children:"Call Time"}),g(e.call_time||((t=e.pivot)==null?void 0:t.call_time))]}),s.jsx("div",{className:"text-emerald-500 justify-end w-full max-w-[6rem] text-right text-sm font-bold flex flex-col",children:"Confirmed"})]},n)};return s.jsx(b,{className:`${u} ${Object.keys(d).length>0?"bg-slate-300":""}`,header:"Recipients",onClick:f,children:s.jsx("div",{className:"h-full",children:Object.keys(d).length>0?Object.entries(d).map(([e,n])=>s.jsxs("div",{children:[s.jsx("h3",{className:"text-sm font-semibold text-slate-500 mb-2",children:e}),s.jsx("div",{className:"mb-4 flex flex-col gap-2",children:n.map(j)})]},e)):s.jsx(C,{className:"saturate-0",imageUrl:"/images/svg_images/users.svg",buttonText:"Add a recipient",onClick:f,svgClass:"max-w-[10rem]",children:{description:s.jsx("p",{className:"text-slate-300 max-w-[22rem]",children:"You have not added a recipient yet. Add one now!"})}})})})}export{L as default};