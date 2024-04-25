import{j as a}from"./app-8b83436b.js";import{F as l}from"./index.es-ee268f83.js";import{N as c,F as m,O as g,P as p,G as u}from"./index-e6ab5b50.js";import"./index-3b70e7e7.js";const b=({selectedType:s,onSelectType:o})=>{const t={"Social Media Content":{description:"Craft compelling narratives for various social media platforms, tailored to engage and grow your following.",icon:c},"Educational Videos":{description:"Develop informative and educational content that makes learning accessible and engaging.",icon:m},"Real Estate Showcases":{description:"Create immersive and visually stunning virtual tours for properties, highlighting key selling points.",icon:g},Podcasts:{description:"Produce and edit podcast episodes that captivate with clear audio and engaging visuals.",icon:p},"Tutorial Videos":{description:"Share your expertise by creating step-by-step tutorial videos that educate and inspire.",icon:u}},r=["Podcasts","Tutorial Videos"],i=e=>r.includes(e);return a.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-12",children:Object.entries(t).map(([e,{description:n,icon:d}])=>a.jsxs("div",{className:`flex items-center space-x-3 py-4 px-6 border cursor-pointer min-h-[10rem] rounded-xl duration-500 
                                ${s===e?"border-emerald-400 bg-emerald-50":"border-slate-100"}
                                ${i(e)?"opacity-50 cursor-not-allowed":""}`,onClick:()=>!i(e)&&o(e),children:[a.jsx(l,{icon:d,className:`text-2xl mx-8 duration-500 
                        ${s===e?"text-emerald-400":"text-slate-300"}
                        ${i(e)?"opacity-50":""}`}),a.jsxs("div",{children:[a.jsx("h3",{className:`text-lg font-semibold ${i(e)?"text-gray-400":"text-slate-500"}`,children:e}),a.jsx("p",{className:"text-sm",children:n})]})]},e))})};export{b as default};