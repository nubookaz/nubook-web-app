import{b as M,n as B,c as E,r as a,j as e}from"./app-659a3aa2.js";import{P as G}from"./PrimaryButton-bfc388c8.js";import{S as J}from"./SecondaryButton-f759061d.js";import{I as r}from"./Input-4561b985.js";import{S as d}from"./Select-a8ef8a22.js";import{f as z}from"./index-7f71a8ef.js";import K from"./CallSheetDetailsForm-6ed5f5d0.js";import"./index.es-6780b8c7.js";import"./index-9e3aa4c7.js";import"./Tooltip-a5a4d78a.js";import"./toPropertyKey-61b1ecea.js";import"./useSlot-d43794ee.js";import"./useIsFocusVisible-7ca602c7.js";import"./useControlled-adcd3c46.js";import"./useEventCallback-0c2e09c7.js";import"./useEnhancedEffect-12b0a06e.js";import"./Popper-26c3d1f1.js";import"./Time-ed827f8c.js";function ce({roles:u,onClose:n}){const{currentProjectId:h}=M(),{createCallSheet:p}=B();E();const x=a.useRef(null),[o,f]=a.useState(""),[c,C]=a.useState(new Date),[i,S]=a.useState(""),j=t=>{const{name:m,value:H}=t.target;switch(m){case"call_sheet_name":f(H);break}},g=t=>{C(t)},y=t=>{S(t)},v=async()=>{const t=z(c,"yyyy-MM-dd")+" "+i;await p({call_sheet_name:o,call_sheet_date_time:t,project_id:h}),n()},[R,N]=a.useState("Day Rate"),[w,b]=a.useState(""),[s,D]=a.useState(!1),[l,P]=a.useState(""),[T,_]=a.useState(""),[q,A]=a.useState(""),F=t=>{P(t.target.value)},k=t=>{_(t.target.value)},I=t=>{A(t.target.value)};return e.jsxs("div",{className:"p-[4rem] flex flex-col gap-6 h-full w-[55rem]",children:[e.jsxs("div",{children:[e.jsx("h2",{className:"text-center text-2xl text-slate-500",children:"Create a New Call Sheet"}),e.jsx("p",{className:"text-slate-400 text-lg text-center",children:"Add details to the call sheet below "})]}),e.jsx(K,{callSheetName:o,handleChange:j,handleDateChange:g,handleTimeChange:y,generalCallTime:i,startDate:c}),e.jsxs("div",{className:"flex flex-col gap-6",children:[e.jsxs("label",{className:"items-center flex text-slate-400 text-sm cursor-pointer",children:[e.jsx("input",{type:"checkbox",checked:s,onChange:()=>D(!s),className:"mr-4 rounded-sm border-slate-300"})," Add myself as a recipient"]}),s&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"flex flex-row gap-6",children:[e.jsx(d,{ref:x,title:"Role",label:"Role",name:"role",value:l,onChange:F,required:!0,children:u.map(t=>e.jsx("option",{value:t.id,children:t.name},t.id))}),console.log(l),e.jsx(r,{label:l=="5"?"Position":"Name of Role",value:T,onChange:k,placeholder:l=="5"?"Director, Grip, PA, etc":"Indiana Jones"})]}),e.jsxs("div",{className:"flex flex-row gap-6",children:[e.jsxs(d,{title:"Frequency",label:"Frequency",name:"pay_frequency",className:"w-[19rem]",value:R,onChange:t=>N(t.target.value),children:[e.jsx("option",{value:"Day Rate",children:"Day Rate"}),e.jsx("option",{value:"Hourly Rate",children:"Hourly Rate"})]}),e.jsx(r,{label:"Rate",type:"number",min:"0",step:"0.01",className:"w-[42rem]",value:w,onChange:t=>b(t.target.value),placeholder:"Hourly or daily rate"}),e.jsx(r,{label:"Call Time",type:"time",value:q,required:!0,onChange:I})]})]})]}),e.jsxs("div",{className:"flex flex-row justify-between mx-auto items-center w-full max-w-[30rem] gap-4 pt-10",children:[e.jsx(J,{className:"w-full",onClick:n,children:"Cancel"}),e.jsx(G,{className:"w-full",onClick:v,children:"Create"})]})]})}export{ce as default};
