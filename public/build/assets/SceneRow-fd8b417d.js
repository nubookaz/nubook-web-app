import{r as u,j as n}from"./app-eefe6961.js";import{F as i}from"./index.es-6f9cfa5f.js";import{D as h,u as x}from"./index-1074990b.js";import p from"./Time-41d0d5cf.js";import l from"./EditableCell-d73227b4.js";import o from"./EditableSelect-b1b3adb2.js";import j from"./Duration-6b844811.js";import"./index-d5199ec3.js";const E=({callSheet:f,row:t,updateRowContent:a,deleteRow:c})=>{const r=[{label:"N/A",value:"N/A"},"Day","Night","Afternoon","Evening","Morning","Dawn","Dusk","Noon","Midnight","Twilight","Sunset","Sunrise"].map(e=>typeof e=="object"?e:{label:e,value:e}),m=["Location A","Location B","Location C"].map(e=>({label:e,value:e})),s=u.useCallback((e,d)=>{a(t.id,e,d)},[t.id,a]);return n.jsxs(n.Fragment,{children:[n.jsx("td",{children:n.jsx(i,{icon:h})}),n.jsx("td",{children:n.jsx(l,{content:t.columns.sceneNumber,placeholder:"2,5,9",onContentChange:e=>s("sceneNumber",e)})}),n.jsx("td",{children:n.jsx(o,{value:t.columns.setting,onChange:e=>s("setting",e),options:[{label:"N/A",value:"N/A"},{label:"INT",value:"INT"},{label:"EXT",value:"EXT"}]})}),n.jsx("td",{children:n.jsx(o,{value:t.columns.timeOfDay,onChange:e=>s("timeOfDay",e),options:r})}),n.jsx("td",{className:"w-full max-w-[4rem]",children:n.jsx(l,{className:"!text-left",content:t.columns.description,placeholder:"Scene description",onContentChange:e=>s("description",e)})}),n.jsx("td",{children:n.jsx(o,{value:t.columns.shootLocation,className:"text-xs",onChange:e=>s("shootLocation",e),options:m})}),n.jsx("td",{children:n.jsx(p,{initialTime:t.columns.startTime,onTimeChange:e=>s("startTime",e)})}),n.jsx("td",{children:n.jsx(j,{duration:t.columns.duration,handleDurationChange:e=>s("duration",e)})}),n.jsx("td",{onClick:()=>c(t.id),className:"cursor-pointer",children:n.jsx(i,{icon:x,className:"cursor-pointer"})})]})};export{E as default};