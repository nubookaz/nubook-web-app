import{j as s}from"./app-8b83436b.js";import{F as d}from"./index.es-ee268f83.js";import{Q as l,R as m,S as u,T as p,U as x,V as g}from"./index-e6ab5b50.js";import"./index-3b70e7e7.js";const j=({selectedType:i,onSelectType:t})=>{const o={Concerts:{description:"Capture the energy and excitement of live concerts, ensuring every beat is felt on screen.",icon:l},"Sports Events":{description:"Document the dynamic and fast-paced action of sports events, delivering every moment with precision.",icon:m},"Talk Shows/Podcasts":{description:"Produce engaging talk shows, capturing the essence of dialogue and guest interactions.",icon:u},Conferences:{description:"Stream conferences with clarity, focusing on the key speakers and their messages.",icon:p},Graduations:{description:"Elevate graduation ceremonies with cinematic quality, celebrating each graduate’s moment.",icon:x},"Music Jams":{description:"Record the spontaneity of music jams, mixing audio and visuals for an immersive experience.",icon:g}},r=["Talk Shows/Podcasts","Music Jams","Sports Events"],a=e=>r.includes(e);return s.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-12",children:Object.entries(o).map(([e,{description:n,icon:c}])=>s.jsxs("div",{className:`flex items-center space-x-3 py-4 px-6 border cursor-pointer min-h-[10rem] rounded-xl duration-500 
                                ${i===e?"border-emerald-400 bg-emerald-50":"border-slate-100"}
                                ${a(e)?"opacity-50 cursor-not-allowed":""}`,onClick:()=>!a(e)&&t(e),children:[s.jsx(d,{icon:c,className:`text-2xl mx-8 duration-500 
                        ${i===e?"text-emerald-400":"text-slate-300"}
                        ${a(e)?"opacity-50":""}`}),s.jsxs("div",{children:[s.jsx("h3",{className:`text-lg font-semibold text-slate-500 ${a(e)?"text-slate-400":"text-slate-500"}`,children:e}),s.jsx("p",{className:"text-sm",children:n})]})]},e))})};export{j as default};