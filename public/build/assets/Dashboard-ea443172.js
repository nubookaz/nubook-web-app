import{j as e,R as i}from"./app-968085fd.js";import{A as c}from"./AuthenticatedLayout-4f11e684.js";import{C as l}from"./CardContainer-3fff5ae6.js";import{I as d}from"./ImageContainer-5604b706.js";import"./index.es-3e6cee57.js";import"./index-f033c28d.js";import"./useSlot-e00659a1.js";import"./createSvgIcon-cb2127eb.js";import"./SecondaryButton-1ee136e4.js";import"./ProjectNavigation-c8d4cccd.js";import"./Tooltip-37a15d1f.js";function u({colSpans:o,withRows:a,children:t}){const m=a.reduce((r,s)=>s?r+1:r,0);return e.jsx("div",{className:"grid grid-cols-4 gap-4 h-full w-full",children:o.map((r,s)=>r>0&&e.jsx("div",{className:`col-span-${r}`,children:i.Children.map(t[`column${s+1}`],n=>i.cloneElement(n,{className:a[s]?`grid grid-rows-${m} gap-4 h-full`:"h-full flex"}))},`column-${s+1}`))})}function y({auth:o}){const a={showGreeting:!0,showProfilePhoto:!0,size:"banner-photo"};return e.jsx(c,{user:o.user,bannerProps:a,children:{surface:e.jsx("div",{className:"relative w-full h-full"}),portalBody:e.jsx("div",{className:"h-full w-full",children:e.jsx(u,{colSpans:[1,1,2,0],withRows:[!1,!1,!0,!1],children:{column1:e.jsx("div",{children:e.jsx(l,{header:"Project Overview"})}),column2:e.jsx("div",{children:e.jsx(l,{header:"Social Activities"})}),column3:e.jsxs("div",{children:[e.jsx(l,{header:"Budget Overview"}),e.jsxs("div",{className:"flex flex-row gap-4",children:[e.jsx(l,{header:"Job Overview"}),e.jsx(d,{overlay:!0,className:"promo-ad",backgroundImage:"./images/cartoon_images/female_professional_filmmaker.png",children:e.jsx("h2",{className:"text-white text-[3rem]",children:"Hollywood Filmmaker"})})]})]}),column4:e.jsx("div",{children:e.jsx(l,{header:"Social Activities"})})}})})}})}export{y as default};
