import{j as e,r as o}from"./app-8b83436b.js";import{A as h}from"./ApplicationName-e46a0827.js";import{I as w}from"./ImageContainer-9e560b2e.js";import{F as p}from"./index.es-ee268f83.js";import{_ as N,as as C}from"./index-e6ab5b50.js";import{P as S}from"./PrimaryButton-83478115.js";import{M as F}from"./Modal-16f11f32.js";import k from"./PrivacyPolicy-89a8be4e.js";import{S as r}from"./Skeleton-d73cf450.js";import"./index-3b70e7e7.js";import"./toPropertyKey-39201a13.js";import"./useSlot-a2532144.js";function E({onClick:n}){return e.jsxs("div",{className:"flex flex-col text-center justify-between xl:text-left xl:flex-row p-6",children:[e.jsx("div",{id:"navicon",className:"block text-left xl:hidden",children:e.jsx(p,{className:"text-2xl text-white cursor-pointer",onClick:n,icon:N})}),e.jsx(h,{href:route("website.home"),className:"mt-4 xl:mt-0"}),e.jsx("div",{className:"hidden xl:flex flex-row gap-10 font-bold"})]})}function P({children:n,auth:f}){return e.jsxs("div",{className:"min-h-screen",children:[e.jsx("div",{className:"absolute z-50",children:n.surface}),e.jsx("div",{className:"bg-white relative w-full",children:n.body}),e.jsx("div",{children:n.footer})]})}function H({auth:n,laravelVersion:f,phpVersion:I}){const[M,g]=o.useState(!1),[m,c]=o.useState(!1),[t,L]=o.useState(!1),[j,x]=o.useState(!1),v=()=>{x(!0)},[l,d]=o.useState({first_name:"",last_name:"",middle_initial:"",email:"",company_name:"",job_title:"",number_of_employees:"",referral:""}),s=(a,i)=>{d(_=>({..._,[a]:i}))},u=l.company_name!=="",y=a=>i=>{i.type==="keydown"&&(i.key==="Tab"||i.key==="Shift")||g(a)},b=async a=>{a.preventDefault();try{await axios.post(route("website.beta.register"),{data:l}),c(!0),setTimeout(()=>{c(!1)},4e3),d({first_name:"",last_name:"",middle_initial:"",email:"",company_name:"",job_title:"",number_of_employees:"",referral:""})}catch(i){console.error("Error submitting form:",i)}finally{}};return e.jsx(P,{children:{surface:e.jsx(e.Fragment,{children:e.jsx(F,{show:j,maxWidth:"100%",dialogPanelClass:"h-full !bg-[#f6f4f1]",childrenClassName:"p-[4rem]",onClose:x,showCloseButton:"true",children:e.jsx(k,{})})}),body:e.jsxs(e.Fragment,{children:[e.jsxs(w,{overlay:!0,className:"!rounded-none !shadow-none h-[45rem] xl:h-[60rem] w-full",backgroundImage:"/images/set_images/set_image_3.jpg",childrenClass:"w-full h-full flex flex-col",children:[e.jsx(E,{onClick:y(!0)}),e.jsxs("div",{className:"text-center justify-center items-center m-auto w-full max-w-[90rem] p-4 h-full flex flex-col -mt-[8rem]",children:[e.jsx("h1",{className:"text-white font-bold text-[2.5rem] xl:text-[3rem] mb-4",children:"Welcome to Your Filmmaking Journey"}),e.jsx("p",{className:"text-white font-semibold text-[1.5rem] xl:text-[1.5rem]",children:"Where creativity meets the lens, and every frame tells a story.  Explore, create, and collaborate with a community of passionate filmmakers. From script to screen, we’re here to empower your vision. Start your cinematic adventure today."})]})]}),e.jsx("div",{className:"p-8 absolute z-50",children:e.jsx("img",{className:"w-full 2xl:max-w-[60%] -mt-[6rem] xl:-mt-[16rem] rounded-lg shadow-lg mx-auto ",src:"./images/app_images/dashboard.jpg",alt:""})}),e.jsxs("div",{id:"beta-form",className:"p-8 pb-[8rem] mt-[30rem]",children:[e.jsxs("div",{className:"text-center m-auto p-8 mb-8 max-w-[75rem]",children:[e.jsx("h3",{className:"text-[2.5rem] mb-4",children:"Currently in Development!"}),e.jsx("p",{className:"font-semibold text-[1.65rem]",children:"Exciting News: Our app is very close to being in beta mode! Be among the first to experience it. Sign up below for exclusive access. Invites are limited! Current Beta release is slated for May 2024"})]}),e.jsxs("form",{onSubmit:b,className:"w-full mx-auto relative xl:max-w-[60%] 2xl:max-w-[50%]",children:[m?e.jsx("div",{className:"place-content-center absolute w-full h-full flex",children:e.jsxs("div",{className:"z-10 text-center my-auto p-8 bg-white  m-auto rounded-xl shadow-xl w-[25rem]",children:[e.jsx(p,{icon:C,className:"text-4xl primary-green-color mb-8"}),e.jsx("h2",{className:"mb-2",children:"Registration Complete!"}),e.jsx("p",{children:"Once the app is ready for Beta you will receive an email with your invitation!"})]})}):null,e.jsxs("div",{className:`asolute z-0 flex flex-col gap-6  ${m?"blur-sm pointer-events-none":""}`,children:[e.jsxs("div",{className:"flex flex-row gap-2 w-full",children:[e.jsxs("div",{className:"flex flex-col gap-2 grow",children:[e.jsx("label",{htmlFor:"first_name",value:"first_name",className:"text-gray-400 text-sm",children:" First Name * "}),t?e.jsx(r,{variant:"rectangular",sx:{height:"48px"}}):e.jsx("input",{type:"text",id:"first_name",name:"first_name",placeholder:"Daniel",value:l.first_name,autoComplete:"given-name",onChange:a=>s("first_name",a.target.value),required:!0})]}),e.jsxs("div",{className:"flex flex-col gap-2",children:[e.jsx("label",{htmlFor:"middle_initial",value:"middle_initial",className:"text-gray-400 text-sm",children:" M.I. "}),t?e.jsx(r,{variant:"rectangular",sx:{height:"48px",width:"2.5rem"}}):e.jsx("input",{type:"text",id:"middle_initial",className:"max-w-[2.5rem]",name:"middle_initial",placeholder:"D",value:l.middle_initial,autoComplete:"additional-name",maxLength:1,onChange:a=>s("middle_initial",a.target.value)})]}),e.jsxs("div",{className:"flex flex-col gap-2 grow",children:[e.jsx("label",{htmlFor:"last_name",value:"last_name",className:"text-gray-400 text-sm",children:" Last Name * "}),t?e.jsx(r,{variant:"rectangular",sx:{height:"48px"}}):e.jsx("input",{type:"text",id:"last_name",name:"last_name",placeholder:"Lewis",value:l.last_name,autoComplete:"family-name",onChange:a=>s("last_name",a.target.value),required:!0})]})]}),e.jsxs("div",{className:"flex flex-col gap-2 grow",children:[e.jsx("label",{htmlFor:"email",value:"email",className:"text-gray-400 text-sm",children:" Email Address * "}),t?e.jsx(r,{variant:"rectangular",sx:{height:"48px"}}):e.jsx("input",{type:"email",id:"email",name:"email",placeholder:"indy@indianajones.com",value:l.email,autoComplete:"email",onChange:a=>s("email",a.target.value),required:!0})]}),e.jsxs("div",{className:"flex flex-col gap-2 grow",children:[e.jsx("label",{htmlFor:"company_name",value:"company_name",className:"text-gray-400 text-sm",children:" Company Name "}),t?e.jsx(r,{variant:"rectangular",sx:{height:"48px"}}):e.jsx("input",{type:"text",id:"company_name",name:"company_name",placeholder:"Gopapple",value:l.company_name,onChange:a=>s("company_name",a.target.value)})]}),e.jsxs("div",{className:"flex flex-col gap-2 grow",children:[e.jsxs("label",{htmlFor:"job_title",value:"job_title",className:"text-gray-400 text-sm",children:[" Job Title ",u?"*":""]}),t?e.jsx(r,{variant:"rectangular",sx:{height:"48px"}}):e.jsx("input",{id:"job_title",type:"text",name:"job_title",placeholder:"Director of Laughter Engineering",value:l.job_title,onChange:a=>s("job_title",a.target.value),required:u})]}),e.jsxs("div",{className:"flex flex-col xl:flex-row gap-4 xl:gap-2 w-full",children:[e.jsxs("div",{className:"flex flex-col gap-2 w-full xl:w-1/2",children:[e.jsx("label",{htmlFor:"number_of_employees",value:"number_of_employees",className:"text-gray-400 text-sm",children:" Number  of Employees in Company * "}),t?e.jsx(r,{variant:"rectangular",sx:{height:"48px"}}):e.jsxs("select",{id:"number_of_employees",name:"number_of_employees",value:l.number_of_employees,onChange:a=>s("number_of_employees",a.target.value),required:!0,children:[e.jsx("option",{value:"",disabled:!0,children:"Select Number of Employees"}),e.jsx("option",{value:"1-10",children:"1-10"}),e.jsx("option",{value:"11-50",children:"11-50"}),e.jsx("option",{value:"51-100",children:"51-100"}),e.jsx("option",{value:"101-500",children:"101-500"}),e.jsx("option",{value:"500+",children:"500+"})]})]}),e.jsxs("div",{className:"flex flex-col gap-2 w-full xl:w-1/2",children:[e.jsx("label",{htmlFor:"referral",value:"referral",className:"text-gray-400 text-sm",children:" Referral Source *"}),t?e.jsx(r,{variant:"rectangular",sx:{height:"48px"}}):e.jsxs("select",{id:"referral",name:"referral",value:l.referral,onChange:a=>s("referral",a.target.value),required:!0,children:[e.jsx("option",{value:"",disabled:!0,children:"Select Referral Source"}),e.jsx("option",{value:"Google",children:"Google"}),e.jsx("option",{value:"Social Media",children:"Social Media"}),e.jsx("option",{value:"Friend or Colleague",children:"Friend or Colleague"}),e.jsx("option",{value:"Event or Conference",children:"Event or Conference"}),e.jsx("option",{value:"Other",children:"Other"})]})]})]}),t?e.jsx(r,{variant:"rectangular",sx:{height:"48px"}}):e.jsx(S,{className:"h-[48px]",children:"Submit"})]})]})]})]}),footer:e.jsxs("div",{className:"website-footer flex flex-col gap-4 text-center p-8 bg-slate-600",children:[e.jsx(h,{href:route("website.home")}),e.jsx("div",{children:e.jsx("a",{className:"text-white underline",href:"#privacy-policy",onClick:v,children:"Privacy Link"})})]})}})}export{H as default};
