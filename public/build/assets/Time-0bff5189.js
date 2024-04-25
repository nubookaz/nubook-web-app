import{R as d,r as u,j as s}from"./app-8b83436b.js";const x=d.memo(({initialTime:n,onTimeChange:l,className:h,textColor:a})=>{const[r,c]=u.useState({hours:"8",minutes:"00",ampm:"AM"});u.useEffect(()=>{const e=n==null?void 0:n.match(/(\d{1,2}):(\d{2})\s(AM|PM)/i);if(e){const m=String(parseInt(e[1],10));c({hours:m,minutes:e[2],ampm:e[3].toUpperCase()})}},[n]);const o=u.useCallback((e,m)=>{const t={...r,[e]:m};e==="hours"&&(t.hours=String(parseInt(m,10))),c(t);const p=`${parseInt(t.hours,10)<10?`0${t.hours}`:t.hours}:${t.minutes} ${t.ampm}`;p!==n&&l(p)},[r,n,l]);return s.jsxs("div",{className:`${h} flex flex-row w-full gap-2`,children:[s.jsx("select",{name:"hours",className:`${a||"text-slate-400"} bg-slate-100 w-[8rem] text-md appearance-none outline-none`,value:r.hours,onChange:e=>o("hours",e.target.value),children:[...Array(12).keys()].map(e=>s.jsx("option",{value:e+1,children:e+1},e+1))}),s.jsx("span",{className:`${a||"text-slate-400"} h-[2rem] text-xl mx-[.10rem] my-auto font-bold`,children:":"}),s.jsxs("select",{name:"minutes",className:`bg-slate-100 ${a||"text-slate-400"}  w-[9rem] text-md appearance-none outline-none`,value:r.minutes,onChange:e=>o("minutes",e.target.value),children:[s.jsx("option",{value:"00",children:"00"}),s.jsx("option",{value:"15",children:"15"}),s.jsx("option",{value:"30",children:"30"}),s.jsx("option",{value:"45",children:"45"})]}),s.jsxs("select",{name:"ampm",className:`bg-slate-100 ${a||"text-slate-400"}  w-[11rem] text-md appearance-none outline-none`,value:r.ampm,onChange:e=>o("ampm",e.target.value),children:[s.jsx("option",{value:"AM",children:"AM"}),s.jsx("option",{value:"PM",children:"PM"})]})]})}),j=x;export{j as default};