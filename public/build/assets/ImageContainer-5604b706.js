import{j as e}from"./app-968085fd.js";import{F as l}from"./index.es-3e6cee57.js";function h({children:r,header:s,className:o,backgroundImage:c,isPoster:t,overlay:n,icon:a}){const m=c?{backgroundImage:`url(${c})`}:{},i=t?"secondary-color container-header":"light-color container-header",d=n?{padding:0}:{},x=t?`container-base poster-container ${o}`:`container-base image-container ${o}`;return e.jsxs("div",{loading:"eager",rel:"preload",className:x,style:{...m,...d},children:[n&&e.jsxs("div",{className:"image-overlay",children:[s&&e.jsxs("h3",{className:i,children:[a&&e.jsx(l,{icon:a,className:"icon mr-2"})," ",s]}),r]}),!n&&e.jsxs("div",{className:"flex flex-col items-center",children:[s&&e.jsxs("h3",{className:i,children:[a&&e.jsx(l,{icon:a,className:"icon mr-2"})," ",s]}),r]})]})}export{h as I};
