import{r as s,j as o}from"./app-e454a32c.js";import u from"./Address-3dede1de.js";import N from"./UserName-7eb75d0f.js";import j from"./Phone-fd7278da.js";import"./Tooltip-be341731.js";import"./toPropertyKey-a22241f9.js";import"./useSlot-7faddf1c.js";import"./useIsFocusVisible-3e69e93a.js";import"./useEventCallback-49b41c49.js";import"./useEnhancedEffect-43c2324b.js";import"./Popper-834fe13e.js";const C=({existingData:e,onUpdateInfo:t,emptyFields:a,setEmptyFields:m})=>{const[d,l]=s.useState(""),[n,h]=s.useState({first_name:"",middle_initial:"",last_name:""}),[c,_]=s.useState({street_address:"",city:"",state:"",zip_code:""});console.log(e),s.useEffect(()=>{e&&(l(e.tel||""),h({first_name:e.first_name||"",middle_initial:e.middle_initial||"",last_name:e.last_name||""}),_({street_address:e.street_address||"",city:e.city||"",state:e.state||"",zip_code:e.zip_code||""}))},[e]);const p=r=>{l(r),t({phoneNumber:r,name:n,address:c})},f=r=>{h(r),t({phoneNumber:d,name:r,address:c})},i=r=>{_(r),t({phoneNumber:d,name:n,address:r})};return o.jsxs("div",{className:"flex flex-col gap-4 grow",children:[o.jsx(N,{data:n,onNameChange:f,emptyFields:a,setEmptyFields:m}),o.jsx(j,{data:d,onPhoneNumberChange:p,emptyFields:a,setEmptyFields:m}),o.jsx(u,{data:c,onAddressChange:i,emptyFields:a,setEmptyFields:m})]})},x=C;export{x as default};