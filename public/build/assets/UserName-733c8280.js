import{r,j as e}from"./app-8b83436b.js";import{T as _}from"./Tooltip-1f0ef08d.js";import"./toPropertyKey-39201a13.js";import"./useSlot-a2532144.js";import"./useIsFocusVisible-97f68d26.js";import"./useControlled-9031fbe1.js";import"./useEventCallback-96e4a742.js";import"./useEnhancedEffect-99238f73.js";import"./Popper-794acb7d.js";const E=({data:a,onNameChange:n,emptyFields:m,setEmptyFields:o,inputClassName:c})=>{const[h,x]=r.useState({first_name:"",middle_initial:"",last_name:""});r.useEffect(()=>{a&&x({first_name:a.first_name||"",middle_initial:a.middle_initial||"",last_name:a.last_name||""})},[a]);const p=(t,s)=>{const l={...a,[t]:s};n(l),(t==="first_name"||t==="last_name")&&o({...m,[t]:!s})},i=(t,s,l,d)=>e.jsx(_,{title:`${s} is required`,open:m[t]??!1,placement:"top",children:e.jsx("input",{type:"text",value:a[t],onChange:f=>p(t,f.target.value),placeholder:s,maxLength:l,autoComplete:d,"aria-label":s,className:c})});return e.jsxs("div",{className:"flex flex-row gap-4",children:[e.jsxs("div",{className:"flex flex-col gap-2 w-full",children:[e.jsx("label",{htmlFor:"first_name",className:"text-gray-400 text-sm",children:"First Name *"}),i("first_name","First Name",void 0,"given-name")]}),e.jsxs("div",{className:"flex flex-col gap-2",children:[e.jsx("label",{htmlFor:"middle_initial",className:"text-gray-400 text-sm",children:"M.I."}),i("middle_initial","M.I.",1,"additional-name")]}),e.jsxs("div",{className:"flex flex-col gap-2 w-full",children:[e.jsx("label",{htmlFor:"last_name",className:"text-gray-400 text-sm",children:"Last Name *"}),i("last_name","Last Name",void 0,"family-name")]})]})};export{E as default};