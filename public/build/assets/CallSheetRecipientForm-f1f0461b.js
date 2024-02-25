import{m as E,k as P,r as d,j as s}from"./app-eefe6961.js";import A from"./Time-41d0d5cf.js";import k from"./Phone-25a8577d.js";import M from"./Email-76d91ed6.js";import{I as q}from"./Input-f63195bf.js";import{S as $}from"./Select-ac02434c.js";import B from"./UserName-76c3168f.js";import{P as H}from"./PrimaryButton-7fd1b638.js";import{F as G}from"./index.es-6f9cfa5f.js";import{u as O}from"./index-1074990b.js";import{S as U}from"./SecondaryButton-70a47f80.js";import"./Tooltip-6de05098.js";import"./toPropertyKey-a23e7eac.js";import"./useSlot-a85726b4.js";import"./useIsFocusVisible-a86ea076.js";import"./useEventCallback-9096ac69.js";import"./useEnhancedEffect-346992f7.js";import"./Popper-e61842d4.js";import"./index-d5199ec3.js";const de=({project:c,callSheet:n,recipient:t,roles:u,onClose:f})=>{const{addRecipientToCallSheet:C,removeRecipientFromCallSheet:S}=E(),{setSnackContent:x,setIsSnackOpen:v}=P(),h={first_name:"",middle_initial:"",last_name:"",email:"",tel:"",position:"",role:""},[l,i]=d.useState(h),[p,r]=d.useState({phone_number:!1,first_name:!1,middle_initial:!1,last_name:!1});d.useEffect(()=>{if(t){const e=u.find(o=>o.name===t.user.pivot.role_name),a={first_name:t.user.first_name||"",middle_initial:t.user.middle_initial||"",last_name:t.user.last_name||"",email:t.user.email||"",tel:t.user.phone?t.user.phone.tel:"",position:t.user.pivot?t.user.pivot.position:"",role:e?e.id:""};i(a)}else i(h)},[t,u]);const[g,j]=d.useState("8:00 AM"),y=e=>{if(!e)return"8:00 AM";const[a,o]=e.split(":"),m=parseInt(a,10),D=m>=12?"PM":"AM";return`${m%12||12}:${o} ${D}`},_=e=>{const{name:a,value:o}=e.target;i(m=>({...m,[a]:o}))},b=e=>{i(a=>({...a,...e}))},w=e=>{i(a=>({...a,tel:e}))},N=e=>{i(a=>({...a,email:e}))},R=e=>{j(e)},T=async()=>{try{let e;t?e=route("projects.callSheets.update.recipient",{id:c.id,callSheetId:n.id,recipientId:t.user.id}):e=route("projects.callSheets.recipient",{id:c.id,callSheetId:n.id});const a={...l,call_time:g};console.log("submissionData:",a);const o=await axios.post(e,a,{headers:{"Content-Type":"application/json"}});console.log("Success:",o.data),i(h),j("8:00 AM"),r({phone_number:!1}),setTimeout(()=>{x(t?"Receipient updated successfully!":"Receipient added successfully!"),v(!0)},600),f(),console.log("addRecipientToCallSheet:",n.id,o.data),C(n.id,o.data)}catch(e){console.error("Error during save:",e.response||e.message)}},F=e=>{e.preventDefault(),T()},I=async()=>{if(!t||!window.confirm("Are you sure you want to remove this recipient from the call sheet?"))return;const a=t.user.id;try{const o=route("projects.callSheets.delete.recipient",{id:c.id,callSheetId:n.id,recipientId:t.user.id});await axios.delete(o),S(a),console.log("Recipient removed successfully from the call sheet"),f()}catch(o){console.error("Error during deletion:",o.response||o.message)}};return s.jsxs("form",{onSubmit:F,className:"flex flex-col gap-4 px-8 py-8",children:[s.jsxs("div",{className:"text-center mb-6",children:[s.jsx("h2",{className:"text-slate-400 text-2xl",children:t?"Edit Recipient":"Add a Recipient to your call sheet"}),s.jsxs("p",{children:["Fill out the details below to ",t?"edit":"add"," a recipient."]})]}),s.jsx(B,{data:{first_name:l.first_name,middle_initial:l.middle_initial,last_name:l.last_name},onNameChange:b,emptyFields:p,setEmptyFields:r}),s.jsxs("div",{className:"flex flex-row gap-4 w-full",children:[s.jsx(M,{data:l.email,required:!0,onEmailChange:N,emptyFields:p,setEmptyFields:r}),s.jsx(k,{data:l.tel,onPhoneNumberChange:w,emptyFields:p,setEmptyFields:r})]}),s.jsxs("div",{className:"flex flex-row gap-4",children:[s.jsx($,{label:"Role",name:"role",value:l.role,onChange:_,required:!0,title:"Role",children:u.map(e=>s.jsx("option",{value:e.id,children:e.name},e.id))}),s.jsx(q,{label:"Position",name:"position",value:l.position,onChange:_,required:!0,title:"Position",placeholder:"Director, Grip, PA, etc"})]}),s.jsxs("div",{className:"flex flex-col gap-2",children:[s.jsx("label",{htmlFor:"call_time",className:"text-gray-400 text-sm",children:"Call Time"}),s.jsx(A,{initialTime:y(t==null?void 0:t.user.pivot.call_time)||g,onTimeChange:R})]}),s.jsxs("div",{className:"flex flex-row gap-4 w-full mt-8 justify-center",children:[t&&s.jsx("button",{type:"button",className:"bg-slate-50 hover:bg-red-700 text-rose-200 hover:text-white duration-500 transition-all font-bold py-2 px-4 rounded",onClick:I,children:s.jsx(G,{icon:O})}),s.jsx(U,{children:"Cancel"}),s.jsx(H,{type:"submit",children:"Submit"})]})]})};export{de as default};
