import{k as P,r as u,j as e}from"./app-8b83436b.js";import{E as U}from"./EmptyContent-4eb16782.js";import B from"./UserName-733c8280.js";import{F as O}from"./FormControl-23721afc.js";import{A as T,c as D,d as J}from"./Autocomplete-f1ff51db.js";import"./SecondaryButton-ae44dfd5.js";import"./index.es-ee268f83.js";import"./index-3b70e7e7.js";import"./Tooltip-1f0ef08d.js";import"./toPropertyKey-39201a13.js";import"./useSlot-a2532144.js";import"./useIsFocusVisible-97f68d26.js";import"./useControlled-9031fbe1.js";import"./useEventCallback-96e4a742.js";import"./useEnhancedEffect-99238f73.js";import"./Popper-794acb7d.js";import"./FormControlContext-c38d435b.js";import"./createSvgIcon-206f586c.js";import"./variantColorInheritance-d3e3e626.js";import"./CircularProgress-4f3ac99e.js";import"./useForwardedInput-a35c5661.js";import"./ListItemButton-cd345c19.js";import"./styleUtils-b870bb2a.js";import"./isMuiElement-db9e5794.js";import"./Chip-33927dbc.js";const R=J(),Y=["Planning","Pre-production","Production","Post-production","Completed"],q=["Active","On Hold","Cancelled","Completed"],z=["USD","EUR","GBP","JPY","AUD","CAD"],h={USD:"$",EUR:"€",GBP:"£",JPY:"¥",AUD:"A$",CAD:"C$"},y=(n,m)=>{let c=n.replace(/\D/g,"");return m==="JPY"?c=c.replace(/\B(?=(\d{3})+(?!\d))/g,","):c=(c/100).toFixed(2).replace(/\d(?=(\d{3})+\.)/g,"$&,"),c},he=({additionalVideoDetails:n,setAdditionalVideoDetails:m,selectedClientIds:c,setSelectedClientIds:N})=>{const{clients:i}=P(),[g,p]=u.useState(null),[x,v]=u.useState("USD"),[b,f]=u.useState(!1),[w,C]=u.useState({first_name:!1,last_name:!1}),_=t=>{N(r=>r.includes(t)?r.filter(l=>l!==t):[...r,t])};u.useEffect(()=>{m(t=>({...t,selectedClientIds:c}))},[c,m]);const d=t=>{const{name:r,value:l}=t.target;if(r==="projectBudget"){const s=y(l,x||"USD");m(o=>({...o,[r]:s,currencySymbol:h[x]||h.USD}))}else m(s=>({...s,[r]:l}))},$=t=>{const r=t.target.value||"USD";v(r);const l=y(n.projectBudget||"0",r);m(s=>({...s,projectBudget:l,currencySymbol:h[r]}))},S=(t,r,l)=>{r&&r.inputValue?(f(!0),p(r.inputValue)):l==="clear"?(f(!1),p("")):(f(!1),p(r?`${r.first_name} ${r.last_name}`:""),m(s=>({...s,client:r?`${r.first_name} ${r.last_name}`:""})))},F=()=>{if(b||!i||i.length===0)return null;const t=[...i].sort((o,a)=>{const j=o.first_name||o.company||"",k=a.first_name||a.company||"";return j.localeCompare(k)}),r=t.slice(0,4),l=t.slice(4),s=o=>o.map((a,j)=>e.jsx("div",{children:e.jsx("div",{className:`w-full cursor-pointer px-4 py-[.5rem] rounded-xl duration-500 transition-all ${c.includes(a.id)?"border-emerald-500 border-2 shadow-md bg-emerald-50":"border-2 border-white bg-slate-50"}`,onClick:()=>_(a.id),children:e.jsxs("div",{className:"flex flex-row gap-8",children:[e.jsx("div",{className:"rounded-full shadow-sm w-[4.2rem] h-[3rem] bg-white my-auto",children:e.jsx("span",{className:"font-light text-lg flex justify-center items-center text-center h-full",children:"JD"})}),e.jsx("div",{className:"flex flex-row gap-2 w-full my-auto",children:e.jsxs("div",{className:"w-full",children:[e.jsx("h3",{className:`text-lg font-semibold ${c.includes(a.id)?"text-emerald-500":"text-slate-400"}`,children:a.first_name?`${a.first_name} ${a.last_name}`:a.company}),a.first_name&&e.jsx("p",{className:"text-sm",children:a.company})]})})]})})},a.id||j));return e.jsxs("div",{className:"relative",children:[e.jsxs("div",{className:"text-center mb-6 ",children:[e.jsx("h2",{className:"text-slate-500 text-xl",children:"Add a Client to your project"}),e.jsx("p",{children:"Choose clients below to attach this project to"})]}),e.jsx("div",{className:"mb-2 text-center",children:r.length>0&&e.jsx("h2",{className:"text-slate-500 font-semibold",children:"Recently Added Clients"})}),e.jsx("div",{className:"grid grid-cols-2 gap-2 px-2 pb-2",children:s(r)}),l.length>0&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"mb-2 text-center mt-4",children:e.jsx("h2",{className:"text-slate-500 font-semibold",children:"Existing Clients"})}),e.jsx("div",{className:"w-full h-[3rem] bottom-0 absolute z-10 bg-gradient-to-t from-white to transparent"}),e.jsx("div",{className:"max-h-[26rem] overflow-scroll grid grid-cols-2 gap-2 px-2 pb-[2.5rem]",children:s(l)})]})]})},A=t=>{const r=l=>{m(s=>({...s,client:l.first_name}))};return t?e.jsxs("div",{className:" w-full h-full relative",children:[e.jsx("div",{className:"rounded-full w-[7.5rem] h-[7.5rem] bg-slate-200 mx-auto absolute z-40 left-[50%] -translate-x-2/4 -top-[4rem] border-4 shadow-md border-white"}),e.jsxs("div",{className:"bg-white shadow-2xl flex flex-col gap-4 pt-[5rem] h-full w-full max-w-[30rem] mx-auto rounded-2xl px-6 py-2 mt-[3rem]",children:[e.jsx(B,{data:{first_name:t,middle_initial:"",last_name:""},onNameChange:r,emptyFields:w,setEmptyFields:C,inputClassName:"!py-[.5rem]"}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-gray-700 text-sm font-bold mb-2",htmlFor:"company",children:"Company"}),e.jsx("input",{type:"text",name:"company",placeholder:"Company",value:n.clientTitle||"",onChange:d,className:"w-full border border-gray-300 rounded-md !py-[.5rem]"})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-gray-700 text-sm font-bold mb-2",htmlFor:"title",children:"Title"}),e.jsx("input",{type:"text",name:"title",placeholder:"Title",value:n.clientTitle||"",onChange:d,className:"w-full border border-gray-300 rounded-md !py-[.5rem]"})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-gray-700 text-sm font-bold mb-2",htmlFor:"email",children:"Email Address"}),e.jsx("input",{type:"text",name:"email",placeholder:"Email Address",value:n.clientEmail||"",onChange:d,className:"w-full border border-gray-300 rounded-md !py-[.5rem]"})]}),e.jsx("div",{children:e.jsx("button",{children:"Cancel"})})]})]}):null},E=t=>t.inputValue?`Add "${t.inputValue}"`:t.first_name&&t.last_name?`${t.first_name} ${t.last_name}`:typeof t=="string"?t:"Unknown";return e.jsxs("div",{className:"flex flex-row gap-10 w-full h-full",children:[e.jsx("div",{className:"w-[55%] my-auto",children:b?A(g):i&&i.length>0?F():e.jsx(U,{className:"saturate-0",imageUrl:"/client.svg",svgClass:"max-w-[12rem]",children:{description:e.jsx("p",{className:"text-slate-300 max-w-[22rem]",children:"You have not entered a production schedule yet. Add one now!"})}})}),e.jsxs("div",{className:"flex flex-col gap-6 w-[45%] justify-center",children:[e.jsx("div",{className:"mb-6",children:e.jsxs(O,{children:[e.jsx("label",{className:"block text-gray-700 text-sm font-bold",htmlFor:"clients",children:"Client"}),e.jsx("p",{className:"text-sm mb-2 text-slate-400",children:"Type a clients name to associate this project to a client or add a new one!"}),e.jsx(T,{value:g,onChange:S,placeholder:"Steve Jobs - Apple, Inc",filterOptions:(t,r)=>{const l=R(t,r),{inputValue:s}=r,o=t.some(a=>`${a.first_name} ${a.last_name}`===s);return s!==""&&!o&&l.push({inputValue:s,first_name:"Add",last_name:`"${s}"`,id:`add-${s}`}),l},selectOnFocus:!0,clearOnBlur:!0,handleHomeEndKeys:!0,options:i,getOptionLabel:E,renderOption:(t,r)=>u.createElement(D,{...t,key:r.id},r.first_name&&r.last_name?`${r.first_name} ${r.last_name}`:"Unknown"),freeSolo:!0})]})}),e.jsxs("div",{className:"flex flex-row gap-4 w-full",children:[e.jsxs("div",{className:"w-1/2",children:[e.jsxs("label",{className:"block text-gray-700 text-sm font-bold mb-2",htmlFor:"project_stage",children:["Project Stage ",e.jsx("span",{className:"text-rose-500",children:"*"})]}),e.jsxs("select",{name:"project_stage",onChange:d,value:n.project_stage||"",className:"w-full border border-gray-300 rounded-md",required:!0,children:[e.jsx("option",{value:"",disabled:!0,children:"Select a Project Stage"}),Y.map(t=>e.jsx("option",{value:t,children:t},t))]})]}),e.jsxs("div",{className:"w-1/2",children:[e.jsxs("label",{className:"block text-gray-700 text-sm font-bold mb-2",htmlFor:"project_status",children:["Project Status ",e.jsx("span",{className:"text-rose-500",children:"*"})]}),e.jsxs("select",{name:"project_status",onChange:d,value:n.project_status||"",className:"w-full border border-gray-300 rounded-md",required:!0,children:[e.jsx("option",{value:"",disabled:!0,children:"Select a Project Status"}),q.map(t=>e.jsx("option",{value:t,children:t},t))]})]})]}),e.jsxs("div",{className:"w-full",children:[e.jsx("label",{className:"block text-gray-700 text-sm font-bold mb-2",htmlFor:"filmingDays",children:"Filming Days"}),e.jsx("input",{type:"number",name:"filmingDays",placeholder:"Filming Days",value:n.filmingDays||"",onChange:d,className:"w-full border border-gray-300 rounded-md"})]}),e.jsxs("div",{className:"w-full flex flex-row gap-2 items-center mb-6",children:[e.jsxs("div",{className:"w-2/3",children:[e.jsx("label",{className:"block text-gray-700 text-sm font-bold mb-2",htmlFor:"projectBudget",children:"Project Budget"}),e.jsxs("div",{className:"flex",children:[e.jsx("span",{className:"items-center w-[3rem] justify-center flex text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md",children:h[x]}),e.jsx("input",{type:"text",name:"projectBudget",placeholder:"2,000,000",value:n.projectBudget||"",onChange:d,className:"w-full border border-rose-300 rounded-r-2xl rounded-l-none"})]})]}),e.jsxs("div",{className:"w-1/3",children:[e.jsx("label",{className:"block text-gray-700 text-sm font-bold mb-2",htmlFor:"currency",children:"Currency"}),e.jsx("select",{name:"currency",value:x,onChange:$,className:"w-full border border-gray-300 rounded-md",children:z.map(t=>e.jsx("option",{value:t,children:t},t))})]})]})]})]})};export{he as default};
