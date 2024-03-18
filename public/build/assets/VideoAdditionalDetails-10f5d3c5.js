import{r as g,j as e,i as L}from"./app-d6201cb1.js";import{E as k}from"./EmptyContent-069e6ebe.js";import{F as A}from"./FormControl-bcb6d899.js";import{_ as $,a as h}from"./toPropertyKey-0671445a.js";import{s as C,u as B,c as y,d as U}from"./useSlot-958e930c.js";import{g as O}from"./formLabelClasses-82b26510.js";import{F as R}from"./FormControlContext-906cd091.js";import{A as E,c as D,d as H}from"./Autocomplete-a874b033.js";import"./SecondaryButton-ec37e17e.js";import"./index.es-4ddfc134.js";import"./index-cbb8f8c7.js";import"./useIsFocusVisible-38d1530f.js";import"./createSvgIcon-ba04faf8.js";import"./variantColorInheritance-3035274c.js";import"./CircularProgress-f468e6ba.js";import"./useForwardedInput-ffe731dd.js";import"./ListItemButton-596ed1f7.js";import"./styleUtils-354e910e.js";import"./RadioGroupContext-f4fb6991.js";import"./isMuiElement-2d2d89c3.js";import"./useControlled-565a38ff.js";import"./useEventCallback-4bbe510b.js";import"./useEnhancedEffect-8ef057d9.js";import"./Chip-fc48afba.js";import"./Popper-e501f2f6.js";const _=["children","component","htmlFor","id","slots","slotProps"],J=()=>U({root:["root"],asterisk:["asterisk"]},O,{}),W=C("label",{name:"JoyFormLabel",slot:"Root",overridesResolver:(t,o)=>o.root})(({theme:t})=>({"--Icon-fontSize":"calc(var(--FormLabel-lineHeight) * 1em)",WebkitTapHighlightColor:"transparent",alignSelf:"var(--FormLabel-alignSelf)",display:"flex",gap:"2px",alignItems:"center",flexWrap:"wrap",userSelect:"none",fontFamily:t.vars.fontFamily.body,fontSize:`var(--FormLabel-fontSize, ${t.vars.fontSize.sm})`,fontWeight:t.vars.fontWeight.md,lineHeight:`var(--FormLabel-lineHeight, ${t.vars.lineHeight.sm})`,color:`var(--FormLabel-color, ${t.vars.palette.text.primary})`,margin:"var(--FormLabel-margin, 0px)"})),T=C("span",{name:"JoyFormLabel",slot:"Asterisk",overridesResolver:(t,o)=>o.asterisk})({color:"var(--FormLabel-asteriskColor)"}),q=g.forwardRef(function(o,a){var p,i;const c=B({props:o,name:"JoyFormLabel"}),{children:j,component:m="label",htmlFor:u,id:x,slots:b={},slotProps:r={}}=c,s=$(c,_),l=g.useContext(R),n=(p=(i=o.required)!=null?i:l==null?void 0:l.required)!=null?p:!1,d=h({},c,{required:n}),f=J(),v=h({},s,{component:m,slots:b,slotProps:r}),[F,S]=y("root",{additionalProps:{htmlFor:u??(l==null?void 0:l.htmlFor),id:x??(l==null?void 0:l.labelId)},ref:a,className:f.root,elementType:W,externalForwardedProps:v,ownerState:d}),[w,P]=y("asterisk",{additionalProps:{"aria-hidden":!0},className:f.asterisk,elementType:T,externalForwardedProps:v,ownerState:d});return e.jsxs(F,h({},S,{children:[j,n&&e.jsxs(w,h({},P,{children:[" ","*"]}))]}))}),z=q,G=H(),I=["Planning","Pre-production","Production","Post-production","Completed"],Y=["Active","On Hold","Cancelled","Completed"],K=["USD","EUR","GBP","JPY","AUD","CAD"],M={USD:"$",EUR:"€",GBP:"£",JPY:"¥",AUD:"A$",CAD:"C$"},N=(t,o)=>{let a=t.replace(/\D/g,"");return o==="JPY"?a=a.replace(/\B(?=(\d{3})+(?!\d))/g,","):a=(a/100).toFixed(2).replace(/\d(?=(\d{3})+\.)/g,"$&,"),a},ye=({additionalVideoDetails:t,setAdditionalVideoDetails:o})=>{const{clients:a}=L(),[p,i]=g.useState(null),[c,j]=g.useState("USD"),m=r=>{const{name:s,value:l}=r.target;if(s==="projectBudget"){const n=N(l,c);o(d=>({...d,[s]:n}))}else o(n=>({...n,[s]:l}))},u=r=>{j(r.target.value);const s=N(t.projectBudget,r.target.value);o(l=>({...l,projectBudget:s}))},x=(r,s)=>{if(typeof s=="string")i({name:s});else if(s&&s.inputValue){const l=s.inputValue.replace(/^Add\s"/,"").replace(/"$/,"");i({name:l})}else i(s);o({...t,client:s?s.inputValue?s.inputValue.replace(/^Add\s"/,"").replace(/"$/,""):s.name:""})},b=()=>{let r=[];for(let s=0;s<3;s++)r.push(e.jsx("div",{id:`client-card-${s}`,className:"bg-slate-50 rounded-md w-full px-6 py-4 shadow-sm",children:e.jsxs("div",{className:"flex flex-row gap-4 ",children:[e.jsx("div",{className:"rounded-full w-[6rem] h-[6rem] bg-slate-200 my-auto"}),e.jsx("div",{className:"flex flex-row gap-2",children:e.jsxs("div",{className:"flex flex-col gap-2 h-full justify-center",children:[e.jsxs("div",{className:"",children:[e.jsx("h3",{className:"text-xl text-slate-400",children:"Client Name"}),e.jsx("p",{className:"text-sm",children:"Company Name"}),e.jsx("span",{className:"text-xs",children:"4214 W Google Apple Dr. Glendale, Ca 95623"})]}),e.jsxs("div",{className:"flex flex-row gap-2 text-sm",children:[e.jsx("span",{className:"font-bold text-slate-400",children:"M:"})," ",e.jsx("span",{children:"(480) 773-1753"}),e.jsx("span",{className:"font-bold text-slate-400",children:"O:"})," ",e.jsx("span",{children:"(480) 773-1753"}),e.jsx("span",{className:"font-bold text-slate-400",children:"F:"})," ",e.jsx("span",{children:"(480) 773-1753"})]})]})})]})},s));return r};return e.jsxs("div",{className:"flex flex-row gap-10 w-full",children:[e.jsx("div",{className:"w-1/2 flex flex-col gap-4",children:a&&a.length>0?b():e.jsx(k,{imageUrl:"/images/svg_images/schedule.svg"})}),e.jsxs("div",{className:"flex flex-col gap-4 w-1/2",children:[e.jsx("div",{className:"mb-6",children:e.jsxs(A,{children:[e.jsx(z,{children:"Client"}),e.jsx(E,{value:p,onChange:x,filterOptions:(r,s)=>{const l=G(r,s),{inputValue:n}=s,d=r.some(f=>n===f.name);return n!==""&&!d&&l.push({inputValue:n,name:`Add "${n}"`}),l},selectOnFocus:!0,clearOnBlur:!0,handleHomeEndKeys:!0,options:a,getOptionLabel:r=>typeof r=="string"?r:r.inputValue?r.inputValue:r.name,renderOption:(r,s)=>e.jsx(D,{...r,children:s.name}),freeSolo:!0})]})}),e.jsxs("div",{className:"flex flex-row gap-4 w-full",children:[e.jsxs("div",{className:"w-1/2",children:[e.jsxs("label",{className:"block text-gray-700 text-sm font-bold mb-2",htmlFor:"projectStage",children:["Project Stage ",e.jsx("span",{className:"text-rose-500",children:"*"})]}),e.jsx("select",{name:"projectStage",onChange:m,value:t.projectStage||"",className:"w-full border border-gray-300 rounded-md",children:I.map(r=>e.jsx("option",{value:r,children:r},r))})]}),e.jsxs("div",{className:"w-1/2",children:[e.jsxs("label",{className:"block text-gray-700 text-sm font-bold mb-2",htmlFor:"projectStatus",children:["Project Status ",e.jsx("span",{className:"text-rose-500",children:"*"})]}),e.jsx("select",{name:"projectStatus",onChange:m,value:t.projectStatus||"",className:"w-full border border-gray-300 rounded-md",children:Y.map(r=>e.jsx("option",{value:r,children:r},r))})]})]}),e.jsxs("div",{className:"w-full",children:[e.jsx("label",{className:"block text-gray-700 text-sm font-bold mb-2",htmlFor:"filmingDays",children:"Filming Days"}),e.jsx("input",{type:"number",name:"filmingDays",placeholder:"Filming Days",value:t.filmingDays||"",onChange:m,className:"w-full border border-gray-300 rounded-md"})]}),e.jsxs("div",{className:"w-full flex flex-row gap-2 items-center mb-6",children:[e.jsxs("div",{className:"w-2/3",children:[e.jsx("label",{className:"block text-gray-700 text-sm font-bold mb-2",htmlFor:"projectBudget",children:"Project Budget"}),e.jsxs("div",{className:"flex",children:[e.jsx("span",{className:"items-center w-[3rem] justify-center flex text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md",children:M[c]}),e.jsx("input",{type:"text",name:"projectBudget",placeholder:"2,000,000",value:t.projectBudget||"",onChange:m,className:"w-full border border-rose-300 rounded-r-2xl rounded-l-none"})]})]}),e.jsxs("div",{className:"w-1/3",children:[e.jsx("label",{className:"block text-gray-700 text-sm font-bold mb-2",htmlFor:"currency",children:"Currency"}),e.jsx("select",{name:"currency",value:c,onChange:u,className:"w-full border border-gray-300 rounded-md",children:K.map(r=>e.jsx("option",{value:r,children:r},r))})]})]})]})]})};export{ye as default};
