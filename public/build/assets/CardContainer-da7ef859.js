import{c as g,j as t}from"./app-8b83436b.js";import{F as p}from"./index.es-ee268f83.js";import{f as w}from"./index-e6ab5b50.js";function $({children:r,header:e,className:i="",onClick:s,textClassName:x,childrenClass:c}){const{darkModeSetting:d}=g(),u={light:{background:"bg-white",text:"text-slate-400"},dark:{background:"bg-slate-900",text:"text-white"},midnight:{background:"bg-slate-800",text:"text-white"}},l=(o,a)=>new RegExp(`\\b${o}-\\S+`).test(a)?a:`${u[d][o]} ${a}`,f=l("background",i),n=l("text",x),m={overflowY:"auto"};return t.jsxs("div",{className:`${f} duration-500 px-6 pb-6 shadow-sm rounded-2xl flex flex-col gap-2 ${e?"pt-4":"pt-6 relative"}`,children:[(e||s)&&t.jsxs("div",{className:`${e?"w-full flex flex-row justify-between items-center":"absolute right-6"}`,children:[e&&t.jsx("div",{children:t.jsx("h4",{className:`${n} duration-500 w-full text-sm`,children:e})}),s&&t.jsx("div",{variant:"plain",children:t.jsx(p,{onClick:s,className:`${n} duration-500 w-[1.3rem] cursor-pointer hover:text-slate-500 duration-300 text-2xl`,icon:w})})]}),t.jsx("div",{style:m,className:`${c} flex flex-col h-full`,children:r})]})}export{$ as C};