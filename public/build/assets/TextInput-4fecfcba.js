import{j as e,r as o}from"./app-659a3aa2.js";import{F as l}from"./index.es-6780b8c7.js";function d({message:t,className:s="",...r}){return t?e.jsx("p",{...r,className:"text-sm text-red-600 "+s,children:t}):null}const j=o.forwardRef(function({type:s="text",className:r="",isFocused:i=!1,icon:n,iconClass:x,placeholder:a,...f},c){const u=c||o.useRef();return o.useEffect(()=>{i&&u.current.focus()},[]),e.jsxs("div",{className:"relative flex flex-row",children:[n&&e.jsx("div",{className:`custom-icon inset-y-0 flex items-center pointer-events-none ${x||""}`,children:e.jsx(l,{icon:n})}),e.jsx("input",{...f,type:s,placeholder:a,className:`custom-input ${n?"pl-[3.5rem]":""} ${r}`,ref:u})]})});export{d as I,j as T};
