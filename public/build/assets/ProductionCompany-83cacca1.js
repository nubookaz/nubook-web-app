import{j as n}from"./app-e454a32c.js";import{C as p}from"./CardContainer-6cb7a831.js";import"./index.es-372425f6.js";import"./index-af94e81f.js";import"./index-54708238.js";function l({user:i,className:t}){const r=(o=>{if(!o||!o.production_companies||!o.primary_production_company_id)return null;const a=o.production_companies.find(m=>m.id===o.primary_production_company_id);return a?a.company_name:null})(i);return n.jsx(p,{className:`${t}`,header:"Production Company",children:r?n.jsx("h2",{className:"text-2xl text-slate-500",children:r}):n.jsx("div",{children:"Assign a Production Company"})})}export{l as default};