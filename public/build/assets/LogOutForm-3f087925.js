import{e as s,j as e,d as l}from"./app-8b83436b.js";import{F as a}from"./index.es-ee268f83.js";import{b as r}from"./index-e6ab5b50.js";import"./index-3b70e7e7.js";function d(){const{toggleModal:o}=s(),t=()=>{o(!1)};return e.jsxs("div",{className:"flex flex-col gap-8 w-full",children:[e.jsxs("div",{className:"flex flex-row gap-4 px-8 pt-8",children:[e.jsx(a,{className:"flex justify-center my-auto text-2xl text-rose-500",icon:r}),e.jsx("h2",{className:"text-lg text-rose-500 flex font-semibold flex-wrap text-center",children:"Are you sure you want to logout? "})]}),e.jsx("div",{className:"border-[.1rem] border-solid m-0 p-0"}),e.jsxs("div",{className:"flex flex-row gap-2 px-8 pb-8",children:[e.jsx("button",{className:"default-btn w-full bg-white text-slate-400 hover:bg-slate-100 duration-500",onClick:t,children:"Cancel"}),e.jsx(l,{className:"default-btn w-full bg-rose-200 text-rose-500 hover:bg-rose-500 hover:text-white duration-500",onClick:t,method:"post",href:route("logout"),as:"button",children:"Yes, Logout"})]})]})}export{d as default};