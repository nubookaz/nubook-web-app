import{j as a}from"./app-8b83436b.js";import{F as n}from"./index.es-ee268f83.js";import{G as c,X as l,ar as m}from"./index-e6ab5b50.js";import"./index-3b70e7e7.js";const p=({onProjectClick:t,activeProject:r})=>{const o=[{name:"Video Production",icon:c,active:!0},{name:"Photography",icon:l,active:!1},{name:"TV Production",icon:m,active:!1}],s=e=>r===e.name;return a.jsx("div",{className:"flex flex-row gap-4 text-slate-500 justify-center ",children:o.map((e,i)=>a.jsx("div",{className:"flex flex-col items-center",children:a.jsxs("div",{className:`w-[10rem] h-[10rem] p-4 border bg-white border-slate-100 rounded-md flex items-center justify-center flex-col 
                            ${e.active?"cursor-pointer hover:shadow-2xl hover:bg-primary-green-color transition-all duration-300":"opacity-50"}
                            ${s(e)?"!bg-emerald-50 shadow-2xl !border-emerald-400 border-2 shadow-emerald-200 text-emerald-500":""}
                        `,onClick:()=>t(e),children:[a.jsx(n,{className:"text-2xl",icon:e.icon}),a.jsx("span",{className:"text-sm text-center mt-2",children:e.name}),!e.active&&a.jsx("span",{className:"text-xs text-center mt-1 italic",children:"Coming Soon"})]})},i))})};export{p as default};
