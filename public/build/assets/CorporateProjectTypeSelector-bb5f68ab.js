import{j as r}from"./app-8b83436b.js";import{F as i}from"./index.es-ee268f83.js";import{A as c,F as l,G as d,H as m,I as u}from"./index-e6ab5b50.js";import"./index-3b70e7e7.js";const f=({selectedType:o,onSelectType:s})=>{const t={"Corporate Events":"Showcase your event's energy and professionalism with our dynamic photo and video coverage","Conferences/Seminars":"Document every insightful moment with our expert visual storytelling","Training Videos":"Elevate your training with engaging, impactful video content","Product Launches":"Highlight your product's innovation with compelling launch coverage","Commercials/Advertisements":"Strengthen brand connections with our stunning, effective production"},n={"Corporate Events":c,"Conferences/Seminars":l,"Training Videos":d,"Product Launches":m,"Commercials/Advertisements":u};return r.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",children:Object.entries(t).map(([e,a])=>r.jsxs("div",{className:`flex items-center space-x-3 py-4 px-6 border cursor-pointer min-h-[8rem] rounded-xl duration-500 ${o===e?"border-emerald-400 bg-emerald-50":"border-slate-100"}`,onClick:()=>s(e),children:[r.jsx(i,{icon:n[e],className:`text-2xl mx-8 duration-500 ${o===e?"text-emerald-400":"text-slate-300"}`}),r.jsxs("div",{children:[r.jsx("h3",{className:"text-lg font-semibold text-slate-500",children:e}),r.jsx("p",{className:"text-sm",children:a})]})]},e))})};export{f as default};