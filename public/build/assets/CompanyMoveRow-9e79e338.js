import{j as t}from"./app-e454a32c.js";import{F as n}from"./index.es-372425f6.js";import{D as m,u as c}from"./index-54708238.js";import d from"./EditableCell-2584109f.js";import x from"./EditableSelect-87da7aa7.js";import h from"./Time-f58d8e31.js";import p from"./Duration-eb7c63a2.js";import"./index-af94e81f.js";const b=({callSheet:j,row:o,updateRowContent:s,deleteRow:i})=>{const r=["Location A","Location B","Location C"].map(e=>({label:e,value:e})),a=(e,l)=>{s(o.id,e,l)};return t.jsxs(t.Fragment,{children:[t.jsx("td",{children:t.jsx(n,{icon:m})}),t.jsx("td",{colSpan:"3",className:"w-[35rem] text-white font-bold text-center text-md",children:"Company Move"}),t.jsx("td",{className:"w-1/3",children:t.jsx(d,{className:"!text-left !text-white placeholder:text-white",placeholder:"Notes...",content:o.columns.description,onContentChange:e=>a("description",e)})}),t.jsx("td",{className:"w-[8rem]",children:t.jsx(x,{className:"!text-white",value:o.columns.shootLocation,onChange:e=>a("shootLocation",e),options:r})}),t.jsx("td",{className:"w-[12rem]",children:t.jsx(h,{textColor:"text-white",initialTime:o.columns.startTime,onTimeChange:e=>a("startTime",e)})}),t.jsx("td",{className:"w-[15rem]",children:t.jsx(p,{textColor:"text-white",duration:o.columns.duration,handleDurationChange:e=>a("duration",e)})}),t.jsx("td",{onClick:()=>i(o.id),children:t.jsx(n,{icon:c,className:"cursor-pointer"})})]})};export{b as default};