import{b as A,j as e,d as O}from"./app-eefe6961.js";import{T as C,U as F}from"./index-1074990b.js";import{F as p}from"./index.es-6f9cfa5f.js";import"./index-d5199ec3.js";function L({projects:l,className:h,view:c,maxProjects:j=16,showNewProject:u=!0,bannerClassName:g,bannerTextColor:n}){const{toggleModal:f}=A(),N=()=>{f({type:"projectForm"})},w=`grid grid-cols-6 grid-rows-2 gap-4 h-full ${h}`,v=t=>{const i={Production:1,"Post-Production":2,"Pre-Production":3,"Creative Developement":4,Estimate:5,Completed:6},a=t.map(s=>({...s,statusOrder:i[s.project_stage]}));return a.sort((s,r)=>s.statusOrder!==r.statusOrder?s.statusOrder-r.statusOrder:new Date(r.updatedAt)-new Date(s.updatedAt)),a};console.log(l);const b=c==="View All"?l:l.filter(t=>t.project_stage===c),y=v(b).slice(0,j);return e.jsxs("div",{className:w,children:[y.map(t=>{const{project_name:i,project_stage:a,project_status:s,project_description:r,video_type:_,project_type:P,project_budget:D,is_favorite:k}=t,{filming_days:E,movie_poster:o,primary_genre:d,secondary_genre:x,viewer_rating:m}=t.video_production;return console.log(t),e.jsxs("div",{className:"card",children:[e.jsx("div",{className:"poster",children:e.jsx("img",{src:(o==null?void 0:o.url)||"/images/movie_posters/coming_soon_poster.jpg",alt:"Location Unknown"})}),e.jsx("div",{className:"overlay"}),e.jsxs("div",{className:` ${g} absolute top-0 w-full flex flex-col text-center shadow-lg bg-white py-2 uppercase`,children:[k?e.jsx(p,{className:"absolute top-0 left-[1.5rem] h-[4rem] w-[2rem] scale-y-[1.75] text-rose-500",icon:C}):null,e.jsx("span",{className:` ${n||"text-slate-400"} text-[.70rem]`,children:_}),e.jsx("span",{className:` ${n||"text-slate-400"} text-xs font-bold`,children:a||null})]}),e.jsx(O,{className:"edit-icon mt-[3rem]",href:a==="Estimate"?route("projects.estimate",{id:t.id}):route("projects.details",{id:t.id}),children:e.jsx(p,{className:" text-white text-xs",icon:F})}),e.jsxs("div",{className:"details",children:[e.jsxs("div",{className:"flex flex-row gap-2",children:[e.jsx("span",{className:"block font-normal mb-2 text-xs text-white bg-slate-600 px-4 py-1 rounded w-fit",children:s}),e.jsx("span",{className:"block font-normal mb-2 text-xs text-white bg-slate-600 px-4 py-1 rounded w-fit",children:P})]}),e.jsx("a",{className:"font-bold text-2xl hover:text-emerald-500 duration-500",href:a==="Estimate"?route("projects.estimate",{id:t.id}):route("projects.details",{id:t.id}),children:i}),e.jsxs("h2",{className:"text-white",children:["2023 • ",m?m+" •":null," 1hr 38min"]}),e.jsxs("div",{className:"tags",children:[d?e.jsx("span",{className:"tag text-xs",children:d}):null,x?e.jsx("span",{className:"tag text-xs",children:x}):null]}),e.jsx("div",{className:"my-4",children:r?e.jsx("p",{className:"text-white text-sm py-2",children:r.length>100?`${r.slice(0,200)}...`:r}):e.jsx("p",{className:"text-center py-[2rem] px-4 bg-slate-500 rounded-md  text-black",children:"No Project Description Added"})}),e.jsxs("div",{className:"cast",children:[e.jsx("h3",{className:"text-white",children:"Cast"}),e.jsxs("ul",{children:[e.jsx("li",{children:e.jsx("img",{src:"https://i.postimg.cc/jqgkqhSb/cast-11.jpg",alt:"Marco Andrews",title:"Marco Andrews"})}),e.jsx("li",{children:e.jsx("img",{src:"https://i.postimg.cc/8P7X7r7r/cast-12.jpg",alt:"Rebecca Floyd",title:"Rebecca Floyd"})}),e.jsx("li",{children:e.jsx("img",{src:"https://i.postimg.cc/2SvHwRFk/cast-13.jpg",alt:"Antonio Herrera",title:"Antonio Herrera"})})]})]})]})]},t.id)}),u?e.jsx("div",{onClick:N,className:"border-4 border-dashed border-slate-300 duration-500 bg-slate-200 cursor-pointer px-[4rem] text-center text-xl text-slate-300 rounded-lg h-full w-full flex justify-center items-center m-auto hover:bg-slate-300 hover:text-slate-400",children:"Click here to start a new project!"}):null]})}export{L as default};