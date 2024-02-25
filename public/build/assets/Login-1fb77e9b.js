import{j as e,W as p,r as x,d as o}from"./app-968085fd.js";import{G as g}from"./GuestLayout-7285c431.js";import{S as h}from"./SecondaryButton-1ee136e4.js";import{C as f}from"./CardContainer-3fff5ae6.js";import{I as m}from"./ImageContainer-5604b706.js";import{I as n}from"./Input-271e9293.js";import"./index.es-3e6cee57.js";import"./index-f033c28d.js";import"./useSlot-e00659a1.js";function j({className:r="",...a}){return e.jsx("input",{...a,type:"checkbox",className:"rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500 "+r})}function _({status:r,canResetPassword:a}){const{data:t,setData:i,post:l,processing:c,errors:b,reset:d}=p({email:"",password:"",remember:!1});x.useEffect(()=>()=>{d("password")},[]);const u=s=>{s.preventDefault(),l(route("login"))};return e.jsx(g,{children:e.jsx("div",{className:"absolute inset-0 bg-cover bg-center z-0",style:{backgroundImage:'url("./images/background_images/guest_image_1.jpg")'},children:e.jsx("div",{className:"overlay",children:e.jsxs("div",{className:"floating-form flex flex-row justify-center items-center h-full",children:[e.jsxs(m,{isPoster:!0,className:"my-auto",children:[e.jsx("h2",{className:"mb-4",children:"Did you know?"}),e.jsx(m,{isPoster:!1,className:"mb-4 !h-[28rem]",backgroundImage:"./images/background_images/bg_image_2.jpg"}),e.jsx("h3",{children:"TARS, the AI machine in Interstellar, is real."}),e.jsx("p",{className:"p-base mt-2",children:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos beatae fugiat doloribus, provident aperiam, atque qui optio illum earum vel quasi molestiae est veniam mollitia fuga et, ipsum dicta sunt!"})]}),e.jsxs(f,{className:"form-container flex flex-col justify-between",children:[e.jsx("h2",{className:"logo-name",children:"Nubook"}),e.jsx("p",{className:"secondary-color text-base mb-14",children:"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ullam, aliquam tenetur consequuntur earum dignissimos corporis voluptates tempore perferendis laborum, rem iste at, eligendi totam doloremque tempora esse illum perspiciatis autem."}),e.jsx("h1",{className:"primary-color mb-4 text-4xl",children:"Welcome! Sign up for an account."}),r&&e.jsx("div",{className:"mb-4 font-medium text-sm text-green-600",children:r}),e.jsxs("form",{onSubmit:u,children:[e.jsx("div",{children:e.jsx(n,{id:"email",type:"email",name:"email",value:t.email,autoComplete:"username",onChange:s=>i("email",s.target.value),sx:{"--Input-focusedThickness":"1px","--Input-minHeight":"56px","--Input-paddingInline":"26px"}})}),e.jsx("div",{className:"mt-4",children:e.jsx(n,{id:"password",type:"password",name:"password",value:t.password,autoComplete:"current-password",onChange:s=>i("password",s.target.value)})}),e.jsxs("div",{className:"block mt-4 flex justify-between items-center",children:[e.jsx("div",{className:"flex items-center",children:e.jsxs("label",{className:"flex items-center",children:[e.jsx(j,{name:"remember",checked:t.remember,onChange:s=>i("remember",s.target.checked)}),e.jsx("span",{className:"ml-2 text-sm text-gray-600",children:"Remember me"})]})}),a&&e.jsx("div",{className:"text-right secondary-color",children:e.jsx(o,{href:route("password.request"),className:"underline text-sm hover:primary-color rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",children:"Forgot your password?"})})]}),e.jsx("div",{className:"flex items-center justify-start my-16",children:e.jsx(h,{className:"ml-4",disabled:c,children:"Log in"})}),e.jsx("div",{children:e.jsx(o,{href:route("register"),className:"text-sm secondary-color",children:"Don’t have an account? Sign up!"})})]})]})]})})})})}export{_ as default};
