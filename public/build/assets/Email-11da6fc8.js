import{r as i,j as a}from"./app-659a3aa2.js";import{T as u}from"./Tooltip-a5a4d78a.js";import"./toPropertyKey-61b1ecea.js";import"./useSlot-d43794ee.js";import"./useIsFocusVisible-7ca602c7.js";import"./useControlled-adcd3c46.js";import"./useEventCallback-0c2e09c7.js";import"./useEnhancedEffect-12b0a06e.js";import"./Popper-26c3d1f1.js";const b=({data:r,required:o,onEmailChange:c,emptyFields:t,setEmptyFields:m})=>{const[p,n]=i.useState(""),[l,x]=i.useState(!0);i.useEffect(()=>{n(r||"")},[r]);const d=e=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e),f=e=>{const s=d(e);n(e),x(s),t.email===void 0?m({...t,email:!1}):m({...t,email:!e||!s}),s&&c(e)},h=t.email!==void 0?t.email:!1;return a.jsxs("div",{className:"flex flex-col gap-2 w-full",children:[a.jsxs("label",{htmlFor:"email",className:"text-gray-400 text-sm",children:["Email Address ",o?a.jsx("span",{className:"text-rose-500 ml-1",children:"*"}):""]}),a.jsx(u,{title:l?"Email is required":"Invalid email format",open:h,placement:"right",children:a.jsx("input",{type:"email",value:p,onChange:e=>f(e.target.value),placeholder:"example@email.com",className:l?"":"border-red-500",required:o})}),!l&&a.jsx("p",{className:"text-red-500 text-xs",children:"Invalid email format"})]})};export{b as default};
