import{z as g,e as u,j as e}from"./app-8b83436b.js";import{P as a}from"./index-3b70e7e7.js";import{C as j}from"./CardContainer-da7ef859.js";import{F as d}from"./index.es-ee268f83.js";import{ad as _,ao as y,ap as C}from"./index-e6ab5b50.js";import{E as k}from"./EmptyContent-4eb16782.js";import"./SecondaryButton-ae44dfd5.js";const h=({callSheet:i})=>{const{currentCallSheetLocation:s}=g(),{toggleModal:m}=u(),p=()=>{m({type:"newLocationForm"})},x=i&&Array.isArray(i.film_locations)?i.film_locations:[],l=5;let n=null;s&&(n={name:s.location.name,location:{street_address:s.location.location.street_address,city:s.location.location.city,state:s.location.location.state,zip_code:s.location.location.zip_code},parking_location:s.parking,hospital_location:s.hospital});const o=[...x];n&&o.push(n);const r=(t,c,f)=>{m({type:"editLocationForm",data:{location:t,callSheetId:c,locationType:f}})};return e.jsx(j,{header:"Location Details",className:`h-full ${o!=null&&o.length?"bg-slate-300":""}`,children:o.length>0?e.jsxs("div",{className:"flex flex-col gap-4",children:[o.map((t,c)=>e.jsxs("div",{className:"p-4 bg-white shadow-sm rounded-xl flex flex-col gap-2",children:[e.jsxs("div",{className:"flex justify-between items-center",children:[e.jsx("h3",{className:"text-slate-500 font-bold text-lg",children:t.name}),e.jsx(d,{onClick:()=>r(t,t.callSheetId,"location"),icon:_,className:"hover:text-emerald-500 duration-500 transition-all cursor-pointer"})]}),e.jsxs("p",{children:[t.location.street_address,", ",t.location.city,", ",t.location.state,", ",t.location.zip_code]}),e.jsxs("div",{className:"flex flex-row gap-6",children:[e.jsx("span",{className:"flex items-center gap-1",children:e.jsx(d,{onClick:()=>t.parking_location&&r(t.parking_location,t.callSheetId,"parking"),icon:y,className:t.parking_location?"text-cyan-500 cursor-pointer":"text-slate-300"})}),e.jsxs("span",{onClick:()=>t.hospital_location&&r(t.hospital_location,t.callSheetId,"hospital"),className:`flex items-center gap-1 ${t.hospital_location?"text-cyan-500 cursor-pointer":"text-slate-300"}`,children:[e.jsx(d,{icon:C,className:"mr-2"}),t.hospital_location&&e.jsx("span",{className:"text-sm text-cyan-500 font-semibold",children:t.hospital_location.name})]})]})]},c)),o.length<l?e.jsx("div",{onClick:p,className:"cursor-pointer px-[4rem] text-sm border-2 border-dashed border-slate-50 duration-500 transition-all hover:bg-slate-400 hover:text-slate-50 rounded-xl flex justify-center items-center bg-slate-200 text-slate-400 font-semibold h-[4rem] text-center",children:o.length>=l?"Maximum number of locations reached.":`Click here to add another location to your project. ${o.length} / ${l} Remaining `}):null]}):e.jsx(k,{className:"saturate-0",imageUrl:"location.svg",buttonText:"Add a Location",onClick:p,svgClass:"max-w-[13rem]",children:{description:e.jsx("p",{className:"text-slate-300",children:"Add a location to your project"})}})})};h.propTypes={callSheet:a.shape({film_locations:a.arrayOf(a.shape({name:a.string,location:a.shape({street_address:a.string,city:a.string,state:a.string,zip_code:a.string}),parking_location:a.object,hospital_location:a.object}))})};const A=h;export{A as default};