import{r as c,j as r}from"./app-eefe6961.js";import{T as f}from"./Tooltip-6de05098.js";import"./toPropertyKey-a23e7eac.js";import"./useSlot-a85726b4.js";import"./useIsFocusVisible-a86ea076.js";import"./useEventCallback-9096ac69.js";import"./useEnhancedEffect-346992f7.js";import"./Popper-e61842d4.js";const C=({data:o,required:n,onPhoneNumberChange:i,emptyFields:s,setEmptyFields:a})=>{const[u,l]=c.useState("");c.useEffect(()=>{l(o?m(o):"")},[o]);const m=t=>{if(!t)return t;const e=t.replace(/[^\d]/g,""),p=e.length;return p<4?e:p<7?`(${e.slice(0,3)}) ${e.slice(3)}`:`(${e.slice(0,3)}) ${e.slice(3,6)}-${e.slice(6,10)}`},h=t=>{const e=m(t);l(e),i(e),a({...s,phone_number:!e})};return r.jsxs("div",{className:"flex flex-col gap-2 w-full",children:[r.jsxs("label",{htmlFor:"phone_number",className:"text-gray-400 text-sm",children:["Phone Number ",n?r.jsx("span",{className:"text-rose-500 ml-1",children:"*"}):""]}),r.jsx(f,{title:"Phone number is required",open:s.phone_number??!1,placement:"top",children:r.jsx("input",{type:"tel",required:n,value:u,onChange:t=>h(t.target.value),placeholder:"(123) 456-7890",autoComplete:"tel"})})]})};export{C as default};
