import{u as v,r as t,W as S,j as r,d as P}from"./app-659a3aa2.js";import{G as b}from"./GuestLayout-4bd9a40b.js";import k from"./EmailStep-291cb9d9.js";import{P as w}from"./PrimaryButton-bfc388c8.js";import{S as i}from"./Skeleton-22ae0279.js";import"./CardContainer-713d9aa9.js";import"./index.es-6780b8c7.js";import"./index-9e3aa4c7.js";import"./index-84704c9c.js";import"./ImageContainer-307535ce.js";import"./ApplicationName-99bb4d02.js";import"./PrivacyPolicy-c1c17d0c.js";import"./Modal-cab82769.js";import"./createSvgIcon-3cc30708.js";import"./toPropertyKey-61b1ecea.js";import"./useSlot-d43794ee.js";import"./extendSxProp-9e510b8c.js";import"./ownerWindow-2a12221f.js";import"./useEnhancedEffect-12b0a06e.js";import"./isMuiElement-3bff42a8.js";import"./useIsFocusVisible-7ca602c7.js";import"./useControlled-adcd3c46.js";import"./useEventCallback-0c2e09c7.js";import"./FormControl-ce9c98b9.js";import"./FormControlContext-dd3b9a17.js";import"./styleUtils-0df93871.js";import"./Typography-4dbb1ff2.js";import"./Checkbox-66b75973.js";import"./createSvgIcon-b106def2.js";import"./useSwitch-631d032d.js";function or(){const{checkAuthStatus:a,fetchUserData:m}=v(),[e,o]=t.useState(!1),[n,p]=t.useState(!1),[c,l]=t.useState(!1),d=()=>{p(!0)},{data:s,setData:u,post:f,processing:E,errors:x,reset:h}=S({email:"",password:"",password_confirmation:""});t.useEffect(()=>()=>{h("password","password_confirmation")},[]);const g=j=>{if(j.preventDefault(),!s.consent){l(!0);return}f(route("register"),{onStart:()=>o(!0),onFinish:()=>o(!1),onSuccess:()=>{a(),m()}})},y=["Speed Up",r.jsx("br",{},"linebreak"),"Production!"];return r.jsx(b,{greeting:y,imgUrl:"/images/background_images/bg_image_6.jpg",isModalOpen:n,children:{body:r.jsxs("div",{className:"flex flex-col gap-8 justify-between h-full",children:[r.jsx("div",{className:"",children:r.jsx(k,{formData:s,setFormData:u,errors:x,linkPrivacyPolicy:d,skeleton:e,privacyPolicyHref:"#privacy-policy",showConsentError:c})}),e?r.jsxs("div",{children:[r.jsx(i,{variant:"rectangular",sx:{height:"38px",width:"106px",marginTop:"1rem"}}),r.jsx(i,{variant:"text",level:"body-sm",sx:{width:"118px",marginTop:"1.2rem"}})]}):r.jsxs("div",{children:[r.jsx(w,{className:"block mb-4",onClick:g,children:"Register"}),r.jsx(P,{href:route("login"),className:"text-sm secondary-color",children:"Already registered?"})]})]})}})}export{or as default};
