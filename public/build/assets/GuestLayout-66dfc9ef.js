import{r as a,j as e}from"./app-e454a32c.js";import{C as d}from"./CardContainer-6cb7a831.js";import{I as u}from"./ImageContainer-868b28f8.js";import{A as f}from"./ApplicationName-4b218fbc.js";import x from"./PrivacyPolicy-290426f0.js";import{M as h}from"./Modal-03e6d302.js";function v({children:s,greeting:r,status:l,imgUrl:t="/images/background_images/bg_image_4.jpg",isModalOpen:i,closeModal:g}){const[o,m]=a.useState(!1),[n,c]=a.useState(!1);return a.useEffect(()=>{m(!0),c(!0)},[]),e.jsxs("div",{className:"min-h-screen",children:[e.jsxs("div",{className:"absolute z-50",children:[e.jsx(h,{isOpen:i,shouldShowCloseButton:!0,className:"p-10 max-w-[65rem]",children:e.jsx(x,{})}),s.surface]}),e.jsxs("div",{className:`fade-in ${o?"opacity-1":"opacity-0"} absolute inset-0 bg-cover bg-center z-0`,style:{backgroundImage:'url("/images/background_images/bg_image_14.jpg")'},children:[e.jsx("div",{className:"absolute h-full w-full z-40 bg-black/25 backdrop-blur-sm "}),e.jsx("div",{className:`fade-in-delay ${n?"opacity-1":"opacity-0"} shadow-xl relative z-50 flex justify-center items-center m-auto  h-full w-full`,children:e.jsxs("div",{className:" h-full rounded-xl overflow-hidden max-h-[50rem] w-full max-w-[85rem] flex flex-row",children:[e.jsx(u,{backgroundImage:t,overlayOpacity:"25",childrenClass:"flex flex-row w-full items-center p-[6rem] justify-end",className:"h-full w-full rounded-none",children:e.jsx("h2",{className:"text-[6rem] drop-shadow-lg--md text-white text-right font-extralight",children:r})}),e.jsxs(d,{childrenClass:"gap-8",className:"p-[2rem] h-full justify-between rounded-none w-full max-w-[30rem]",children:[e.jsx(f,{className:"text-left"}),l&&e.jsx("div",{className:"mb-4 font-medium text-sm text-green-600",children:l}),s.body]})]})})]})]})}export{v as G};
