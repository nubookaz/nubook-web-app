import{j as s,d as x}from"./app-968085fd.js";import{F as n}from"./index.es-3e6cee57.js";import{i as h,u as f,A as u,B as p,C as b,D as N,E as g,F as v,x as z,G as P,H as C,y}from"./index-f033c28d.js";import{T as c}from"./Tooltip-37a15d1f.js";function e({active:a=!1,activeClass:d="",className:o="",icon:l,size:m,href:t,onClick:j,text:i}){const r=`page-button ${{small:"page-button-small",medium:"page-button-medium",large:"page-button-large"}[m]||""} ${a?d:""} ${o}`;return t?s.jsxs(x,{href:t,className:r,children:[l&&s.jsx(n,{icon:l}),i&&s.jsx("span",{className:"button-text",children:i})]}):s.jsxs("button",{onClick:j,className:r,children:[" ",l&&s.jsx(n,{icon:l}),i&&s.jsx("span",{className:"button-text",children:i})]})}function S({project:a}){return s.jsxs("div",{className:"flex flex-row w-full",children:[s.jsxs("div",{className:"left-content w-full",children:[s.jsx("h1",{className:"text-3xl mb-2",children:a.projectName}),s.jsxs("h3",{className:"light-color",children:[a.projectType," :: ",a.categoryType]})]}),s.jsx("div",{className:"right-content justify-end w-full pr-[2rem]",children:s.jsxs("ul",{className:"dashboard-navlinks text-center flex gap-6",children:[s.jsx("li",{children:s.jsx(c,{placement:"top",title:"Project Overview",variant:"plain",children:s.jsx("div",{children:s.jsx(e,{href:route("projects.edit",{id:a.id}),active:route().current("projects.edit"),activeClass:"active-link",icon:h,size:"small"})})})}),s.jsx("li",{children:s.jsx(e,{className:"disabled",icon:f,size:"small"})}),s.jsx("li",{children:s.jsx(e,{className:"disabled",icon:u,size:"small"})}),s.jsx("li",{children:s.jsx(e,{className:"disabled",icon:p,size:"small"})}),s.jsx("li",{children:s.jsx(e,{className:"disabled",icon:b,size:"small"})}),s.jsx("li",{children:s.jsx(c,{placement:"top",title:"Call Sheets",variant:"plain",children:s.jsx("div",{children:s.jsx(e,{href:route("projects.callSheets.index",{id:a.id}),active:route().current("projects.callSheets.*"),activeClass:"active-link",icon:N,size:"small"})})})}),s.jsx("li",{children:s.jsx(e,{className:"disabled",icon:g,size:"small"})}),s.jsx("li",{children:s.jsx(e,{className:"disabled",icon:v,size:"small"})}),s.jsx("li",{children:s.jsx(e,{className:"disabled",icon:z,size:"small"})}),s.jsx("li",{children:s.jsx(e,{className:"disabled",icon:P,size:"small"})}),s.jsx("li",{children:s.jsx(e,{className:"disabled",icon:C,size:"small"})}),s.jsx("li",{children:s.jsx(e,{className:"disabled",icon:y,size:"small"})})]})})]})}const $=Object.freeze(Object.defineProperty({__proto__:null,default:S},Symbol.toStringTag,{value:"Module"}));export{e as P,S as a,$ as b};
