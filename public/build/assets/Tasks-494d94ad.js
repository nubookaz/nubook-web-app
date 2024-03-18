import{s as h,c as m,r as p,j as e}from"./app-d6201cb1.js";import{E as g}from"./EmptyContent-069e6ebe.js";import{C as j}from"./CardContainer-99e0037a.js";import{F as u}from"./index.es-4ddfc134.js";import{a9 as y}from"./index-d825d59e.js";import"./SecondaryButton-ec37e17e.js";import"./index-cbb8f8c7.js";function v(){const{tasks:t,removeTask:d}=h(),{toggleModal:n}=m(),[a,r]=p.useState([]),o=s=>{r(l=>l.includes(s)?l.filter(x=>x!==s):[...l,s])},i=async()=>{await Promise.all(a.map(s=>d(s))),r([])},c=()=>{n({type:"addTask"})};return e.jsxs(j,{header:"Task List",className:`h-full w-full ${t.length>0?"bg-slate-200":""}`,onClick:c,children:[e.jsx("div",{className:"flex justify-between items-center p-4 mb-4 text-lg text-white h-[3rem]",children:a.length>0&&e.jsx("div",{children:e.jsx("button",{onClick:i,className:"bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded",children:e.jsx(u,{className:"text-sm",icon:y})})})}),t.length>0?e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"w-full text-sm text-left text-gray-500 dark:text-gray-400",children:[e.jsx("thead",{className:"text-xs uppercase dark:text-gray-400",children:e.jsxs("tr",{children:[e.jsx("th",{scope:"col",className:"px-6 py-3",children:e.jsx("input",{type:"checkbox",disabled:!0})}),e.jsx("th",{scope:"col",className:"px-6 py-3",children:"Task Name"}),e.jsx("th",{scope:"col",className:"px-6 py-3",children:"Description"}),e.jsx("th",{scope:"col",className:"px-6 py-3",children:"Status"}),e.jsx("th",{scope:"col",className:"text-right px-6 py-3",children:"Assigned To"})]})}),e.jsx("tbody",{children:t.map(s=>e.jsxs("tr",{className:" dark:bg-gray-800 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700",children:[e.jsx("td",{className:"px-6 py-4",children:e.jsx("input",{type:"checkbox",checked:a.includes(s.id),onChange:()=>o(s.id)})}),e.jsx("td",{className:"px-6 py-4 font-bold",children:s.name}),e.jsx("td",{className:"px-6 py-4",children:s.description}),e.jsx("td",{className:"px-6 py-4",children:s.status}),e.jsx("td",{className:"text-right px-6 py-4",children:s.user?s.user.name:"Unassigned"})]},s.id))})]})}):e.jsx(g,{buttonText:"Add New Task",onClick:c,svgClass:"svg-class-names",imageUrl:"undraw_tasks.svg",children:{header:e.jsx(e.Fragment,{children:"No Tasks Found"}),description:e.jsx(e.Fragment,{children:"Add your first task to get started!"})}})]})}export{v as default};
