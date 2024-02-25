import{r as e,j as o}from"./app-eefe6961.js";import C from"./AccordionContent-809c9c43.js";import v from"./Hospitals-f58e28ef.js";import{F as f}from"./index.es-6f9cfa5f.js";import{g as x}from"./index-1074990b.js";import"./Input-f63195bf.js";import"./Tooltip-6de05098.js";import"./toPropertyKey-a23e7eac.js";import"./useSlot-a85726b4.js";import"./useIsFocusVisible-a86ea076.js";import"./useEventCallback-9096ac69.js";import"./useEnhancedEffect-346992f7.js";import"./Popper-e61842d4.js";import"./Address-9a2ab9e4.js";import"./index-d5199ec3.js";const G=e.forwardRef(({callSheet:a,locationType:c="location",onAccordionDataChange:g,onAccordionInfoChange:u,resetSignal:d},k)=>{var w;const[s,j]=e.useState(c),[r,l]=e.useState({location:{address:{}},parking:{address:{}},hospital:{address:{}}});console.log(r);const[y,b]=e.useState({location:"",parking:"",hospital:""});e.useEffect(()=>{l({location:{},parking:{},hospital:{}}),b({location:"",parking:"",hospital:""})},[d]);const h=e.useCallback((t,i)=>{l(n=>({...n,[t]:i}))},[]),N=e.useCallback((t,i)=>{b(n=>({...n,[t]:i}))},[]),_=t=>{let i=t;(!t.address||!t.address.place_id)&&(i={name:t.name,address:{place_id:t.place_id,city:"",latitude:t.geometry.location.lat,longitude:t.geometry.location.lng,state:"",street_address:t.vicinity,zip_code:""},information:""}),l(n=>({...n,hospital:i}))};e.useEffect(()=>{a&&l(t=>({...t,location:a.location?a.location:{address:{}},parking:a.parking_location?a.parking_location:{address:{}},hospital:a.hospital_location?a.hospital_location:{address:{}}}))},[a]);const p=t=>{j(i=>i===t?null:t)},m=t=>({maxHeight:s===t?"500px":"0px",overflow:"hidden",transition:"max-height 0.5s ease-in-out, padding 0.5s ease-in-out",padding:s===t?"20px":"0px"});return e.useEffect(()=>{g(r),u(y)},[r,y,g,u]),e.useEffect(()=>{j(c)},[c]),o.jsxs("div",{className:"flex flex-col gap-2",children:[o.jsxs("div",{className:"flex flex-col gap-2",children:[o.jsxs("button",{onClick:()=>p("location"),className:`${s==="location"?"bg-slate-300 font-semibold shadow-sm":""} bg-slate-100 py-4 px-6 rounded-lg text-slate-500 flex flex-row justify-between items-center`,children:["Primary Location Details",o.jsx(f,{icon:x,className:`${s==="location"?"rotate-90":""}`,style:{transform:s==="location"?"rotate(-90deg)":"",transition:"transform 0.3s ease-in-out"}})]}),o.jsx("div",{style:m("location"),children:o.jsx(C,{callSheet:a,dataType:"location",title:"Location Name",label:"Location",onFormDataChange:t=>h("location",t),onInformationChange:t=>N("location",t),ref:k,resetSignal:d})})]}),o.jsxs("div",{className:"flex flex-col gap-2",children:[o.jsxs("button",{onClick:()=>p("parking"),className:`${s==="parking"?"bg-slate-200":""} bg-slate-100 py-4 px-6 rounded-lg text-slate-500 flex flex-row justify-between items-center`,children:["Parking Details",o.jsx(f,{icon:x,className:`${s==="parking"?"rotate-90":""}`,style:{transform:s==="parking"?"rotate(-90deg)":"",transition:"transform 0.3s ease-in-out"}})]}),o.jsx("div",{style:m("parking"),children:o.jsx(C,{callSheet:a,dataType:"parking",title:"Parking Name",label:"Location",onFormDataChange:t=>h("parking",t),onInformationChange:t=>N("parking",t),ref:k,resetSignal:d})})]}),o.jsxs("div",{className:"flex flex-col gap-2",children:[o.jsxs("button",{onClick:()=>p("hospital"),className:`${s==="hospital"?"bg-slate-200":""} bg-slate-100 py-4 px-6 rounded-lg text-slate-500 flex flex-row justify-between items-center`,children:["Nearby Hospital Locations",o.jsx(f,{icon:x,className:`${s==="hospital"?"rotate-90":""}`,style:{transform:s==="hospital"?"rotate(-90deg)":"",transition:"transform 0.3s ease-in-out"}})]}),o.jsx("div",{style:m("hospital"),children:o.jsx(v,{existingHospitalData:a.hospital_location,locationAddress:(w=r.location)==null?void 0:w.address,onSelectHospital:_})})]})]})});export{G as default};
