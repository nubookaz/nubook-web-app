import{r as s,j as a}from"./app-eefe6961.js";import{F as i}from"./index.es-6f9cfa5f.js";import{a as m}from"./index-1074990b.js";const p=({isOpen:l,onClose:e,children:d,className:t,showCloseButton:n})=>{s.useState(!1);const[r,f]=s.useState(!1),c=o=>{o.stopPropagation(),e()};return a.jsxs("div",{className:` modal p-8 ${l?"modal-open":"modal-closed"}`,children:[a.jsx("div",{className:"modal-overlay overflow-hidden",onClick:c}),a.jsxs("div",{className:` ${t} modal-content overflow-hidden`,onClick:o=>o.stopPropagation(),children:[a.jsx("div",{className:n?"modal-header":"hidden",children:a.jsx("button",{className:"modal-close-button cursor-pointer z-50",onClick:e,children:a.jsx(i,{icon:m})})}),a.jsx("div",{className:`fade-in-delay ${r?"opacity-1":"opacity-0"} modal-body h-full`,children:d})]})]})},v=p;export{v as M};
