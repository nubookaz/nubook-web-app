import{e as w,n as b,p as C,r,j as s}from"./app-8b83436b.js";import{C as R}from"./CardContainer-da7ef859.js";import{E as N}from"./EmptyContent-4eb16782.js";import{A as y}from"./Avatar-ef00ce3a.js";import"./index.es-ee268f83.js";import"./index-3b70e7e7.js";import"./index-e6ab5b50.js";import"./SecondaryButton-ae44dfd5.js";import"./toPropertyKey-39201a13.js";import"./useSlot-a2532144.js";import"./createSvgIcon-206f586c.js";function F({callSheet:u,className:h}){const{toggleModal:x}=w(),{currentCallSheet:a}=b(),{callSheetRecipients:o}=C(),f=()=>{x({type:"recipientForm"})},j=e=>{x({type:"editRecipientForm",data:{user:e}})},[p,m]=r.useState([]);r.useEffect(()=>{var l;const e=((l=u.users)==null?void 0:l.filter(n=>n.pivot.role_name!=="Admin"))||[];m(e)},[a.users]),r.useEffect(()=>{const e=a.users||[],l=new Set(p.map(i=>i.id)),n=new Set(e.map(i=>i.id));(e.length!==p.length||[...n].some(i=>!l.has(i)))&&m(e)},[a.users]),r.useEffect(()=>{let e=(a.users||[]).filter(t=>t.pivot.role_name!=="Admin");const n=[...e,...o.filter(t=>t.pivot.role_name!=="Admin"&&!e.some(i=>i.id===t.id))].map(t=>{const i=o.findIndex(d=>d.id===t.id&&d.pivot.role_name!=="Admin");return i!==-1?o[i]:t});m(n)},[a.users,o]);const g=e=>{if(!e)return"";const[l,n]=e.split(":"),t=parseInt(l,10),i=t>=12?"PM":"AM";return`${t%12||12}:${n} ${i}`},c=o.reduce((e,l)=>{if(l.pivot.role_name==="Admin")return e;const n=l.pivot.role_name,t=["Client","Crew","Talent","Extra"].includes(n)?n+"s":"Unassigned";return e[t]||(e[t]=[]),e[t].push(l),e},{}),v=(e,l)=>{var n,t;return s.jsxs("div",{className:"flex flex-row gap-4 items-center py-2 px-4 shadow-sm rounded-lg bg-white justify-between cursor-pointer",onClick:()=>j(e),children:[s.jsx(y,{className:"shrink",slotProps:{root:{sx:{margin:"0 !important"}},fallback:{sx:{color:"red"}}}}),s.jsx("div",{className:"text-left text-sm font-bold flex flex-col w-full justify-start text-slate-500",children:`${e.first_name} ${e.last_name}`}),s.jsxs("div",{className:"leading-[1.15rem] text-sm w-full max-w-[4.5rem] text-left font-bold flex flex-col text-slate-500",children:[s.jsx("span",{className:"text-xs font-normal text-slate-400",children:"Role"}),e.pivot.role_name]}),s.jsxs("div",{className:"leading-[1.15rem] text-sm w-full max-w-[5rem] text-left font-bold flex flex-col text-slate-500",children:[s.jsx("span",{className:"text-xs font-normal text-slate-400",children:"Position"}),e.position||((n=e.pivot)==null?void 0:n.position)]}),s.jsxs("div",{className:"leading-[1.15rem] w-full max-w-[5rem] justify-end text-right text-sm font-bold flex flex-col text-slate-500",children:[s.jsx("span",{className:"text-xs font-normal text-slate-400",children:"Call Time"}),g(e.call_time||((t=e.pivot)==null?void 0:t.call_time))]}),s.jsx("div",{className:"text-emerald-500 justify-end w-full max-w-[6rem] text-right text-sm font-bold flex flex-col",children:"Confirmed"})]},l)};return s.jsx(R,{className:`${h} ${Object.keys(c).length>0?"bg-slate-300":""}`,header:"Recipients",onClick:f,children:s.jsx("div",{className:"h-full",children:Object.keys(c).length>0?Object.entries(c).map(([e,l])=>s.jsxs("div",{children:[s.jsx("h3",{className:"text-sm font-semibold text-slate-500 mb-2",children:e}),s.jsx("div",{className:"mb-4 flex flex-col gap-2",children:l.map(v)})]},e)):s.jsx(N,{className:"saturate-0",imageUrl:"/users.svg",buttonText:"Add a recipient",onClick:f,svgClass:"max-w-[10rem]",children:{description:s.jsx("p",{className:"text-slate-300 max-w-[22rem]",children:"You have not added a recipient yet. Add one now!"})}})})})}export{F as default};
