import{k as d,r as l,j as s}from"./app-eefe6961.js";import{l as x}from"./lodash-46568a0d.js";import{C as h}from"./CardContainer-85b3eca7.js";import{T as f}from"./Textarea-05168225.js";import{T as g}from"./Typography-b234be5c.js";import"./index.es-6f9cfa5f.js";import"./index-d5199ec3.js";import"./index-1074990b.js";import"./toPropertyKey-a23e7eac.js";import"./useSlot-a85726b4.js";import"./useForwardedInput-a4d3e062.js";import"./FormControlContext-3200095e.js";import"./ownerWindow-09f9bd5f.js";import"./useEnhancedEffect-346992f7.js";import"./debounce-517eeb3c.js";import"./extendSxProp-d164df09.js";import"./isMuiElement-573e6873.js";function L({callSheet:o,isSave:p=!1}){const{setSnackContent:n,setIsSnackOpen:i}=d(),[a,u]=l.useState(o.bulletin||""),r=365,m=l.useCallback(x.debounce(async e=>{try{const t=await axios.put(route("projects.callSheets.update.bulletin",{id:o.project_id,callSheetId:o.id}),{bulletin:e});if(t.status<200||t.status>=300)throw new Error("Failed to update bulletin");setTimeout(()=>{n("Bulletin updated successfully"),i(!0)},600)}catch(t){console.error(t),n("Failed to update bulletin"),i(!1)}},600),[]),c=e=>{let t=e.target.value;t=t.replace(/\n/g,""),t.length>r&&(t=t.substring(0,r)),u(t),p&&m(t)};return s.jsx(h,{header:"Bulletin",children:s.jsx(f,{name:"bulletin",size:"sm",variant:"soft",minRows:4,maxRows:4,value:a,placeholder:"Type anything…",className:"!bg-slate-100",maxLength:r,onChange:c,onKeyDown:e=>{e.key==="Enter"&&e.preventDefault()},endDecorator:s.jsxs(g,{level:"body-xs",sx:{ml:"auto"},children:[a.length," / ",r," character(s) (",r-a.length," remaining)"]})})})}export{L as default};
