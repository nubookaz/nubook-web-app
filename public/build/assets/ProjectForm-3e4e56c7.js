import{j as e,d as W,u as H,r as o}from"./app-eefe6961.js";import{F as M}from"./index.es-6f9cfa5f.js";import{r as Y,s as q,t as J}from"./index-1074990b.js";import K from"./ProjectSelector-3675d423.js";import Q from"./ProjectStepper-9fb63089.js";import X from"./VideoStepOne-5658bfee.js";import Z from"./VideoStepTwo-4f139bfb.js";import ee from"./VideoStepThree-e80c09ab.js";function S({active:_=!1,activeClass:w="",className:j,icon:u,size:h,href:m,onClick:x,children:a,inText:n,iconPosition:r="left"}){const l=`page-button px-[1rem] bg-white ${{small:"page-button-small",medium:"page-button-medium",large:"page-button-large"}[h]||""} ${_?w:""} ${j}`,p=u&&e.jsx(M,{className:r==="left"?"mr-4":"ml-4",icon:u}),f=n&&e.jsx("span",{className:"button-text my-auto",children:n});return m?e.jsxs("div",{className:"flex flex-row gap-2",children:[e.jsxs(W,{href:m,className:l,children:[r==="left"&&p,f,r==="right"&&p]}),a&&e.jsx("span",{className:"button-text",children:a})]}):e.jsxs("div",{className:"flex flex-row gap-2",children:[e.jsxs("button",{onClick:x,className:l,children:[r==="left"&&p,f,r==="right"&&p]}),a&&e.jsx("span",{className:"button-text",children:a})]})}function te({customClasses:_}){const{user:w,fetchUserData:j}=H(),[u,h]=o.useState(!1),[m,x]=o.useState(!1);o.useEffect(()=>{h(!0),x(!0)},[]),o.useEffect(()=>{j()},[]);const[a,n]=o.useState(0),[r,c]=o.useState({}),l=4,[p,f]=o.useState(!1),[N,I]=o.useState(null),[D,P]=o.useState(!1),[y,T]=o.useState({width:0,height:0}),V=t=>{T(t)},[F,ae]=o.useState({}),[g,k]=o.useState({project_name:"",project_description:"",primary_genre:"",secondary_genre:"",viewer_rating:"",movie_poster:""}),[b,z]=o.useState({project_stage:"",project_status:"",filming_days:"",project_budget:""}),[E,se]=o.useState({}),[s,C]=o.useState({project_type:"",video_type:""}),A=t=>{k(t)},$=t=>{z(t)},O=t=>{t.active&&(C(i=>({...i,project_type:t.name})),n(1))},B=t=>{t.active&&(C(i=>({...i,video_type:t.name})),n(2))},G=()=>{a>0&&(n(t=>t-1),c({}))},L=()=>{if(a===1&&s.project_type==="Video Production"&&!s.video_type){c({...r,video_type:!0});return}if(a===2&&!g.project_name.trim()){c({...r,project_name:!0});return}if(a===3){let t={...r};if(s.project_stage||(t.project_stage=!0),s.project_status||(t.project_status=!0),c(t),Object.values(t).some(i=>i===!0))return}a<l-1&&n(t=>t+1)},v=[{step:1,header:"Choose a Project Type",description:"Choose a project type below"},{step:2,header:s.project_type,description:"What type of project are you working on?"},{step:3,header:s.video_type,description:"Provide some information about your project below. You must fill out all fields if you want to create an AI generated poster."},{step:4,header:s.video_type,description:"Lets add additional details for your project"}],R=async()=>{var i;const t=new FormData;Object.entries({...s,...F,...g,...b,...E}).forEach(([d,U])=>{t.append(d,U)}),t.append("isImageAIGenerated",D),N&&t.append("uploadedImage",N),y&&(t.append("posterWidth",y.width),t.append("posterHeight",y.height));try{const d=await axios.post(route("projects.create"),t,{headers:{"Content-Type":"multipart/form-data"}});(i=d.data)!=null&&i.url&&(window.location.href=d.data.url)}catch(d){console.error("Error saving project:",d)}};return e.jsxs("div",{className:`fade-in w-[80rem] py-[4rem] px-[8rem] ${u?"opacity-1":"opacity-0"}`,children:[e.jsx("div",{className:`fade-in w-full max-w-[56rem] mx-auto ${u?"opacity-1":"opacity-0"}`,children:e.jsx(Q,{currentStep:a,activeProject:s.project_type})}),e.jsx("div",{className:"my-auto mx-auto h-full w-full max-w-[85rem] pt-[3rem]",children:e.jsx("div",{className:"h-full",children:e.jsxs("div",{className:`fade-in-delay flex flex-col gap-8 h-full ${m?"opacity-1":"opacity-0"}`,children:[a>=0&&a<v.length&&e.jsxs("div",{className:"flex flex-col justify-start",children:[e.jsx("h2",{className:"text-lg font-bold text-center",children:v[a].header}),e.jsx("p",{className:"text-center text-sm",children:v[a].description})]}),e.jsx("div",{className:"flex flex-row gap-4 justify-center h-full py-6 ",children:e.jsxs("div",{className:`fade-in-delay w-full h-full ${m?"opacity-1":"opacity-0"}`,children:[a===0&&e.jsx("div",{className:"w-full",children:e.jsx(K,{onProjectClick:O,activeProject:s.project_type})}),a===1&&s.project_type==="Video Production"&&e.jsx("div",{className:"w-full",children:e.jsx(X,{onVideoTypeClick:B,showError:r.video_type,activeVideoType:s.video_type})}),a===2&&s.project_type==="Video Production"&&e.jsx("div",{className:"w-full",children:e.jsx(Z,{data:g,projectData:s,onDataChange:A,emptyFields:r,setEmptyFields:c,isCustomImage:p,setIsCustomImage:f,setUploadedImage:I,setImageIsAIGenerated:P,onPosterSizeChange:V})}),a===3&&s.project_type==="Video Production"&&e.jsx("div",{className:"w-full",children:e.jsx(ee,{data:b,onDataChange:$,emptyFields:r})})]})}),e.jsxs("div",{className:"flex flex-row justify-end justify-evenly",children:[a>0&&e.jsx(S,{className:"!my-auto !bg-transparent duration-500 ease-in-out py-2 hover:bg-emerald-100",size:"small",icon:Y,inText:"Back",onClick:G}),a===0&&s.project_type||a>0&&a<l-1?e.jsx(S,{iconPosition:"right",className:"!my-auto !bg-transparent duration-500 ease-in-out py-2 hover:bg-emerald-100",size:"small",icon:q,inText:"Next",onClick:L}):null,a===l-1&&e.jsx(S,{className:"!my-auto duration-500 ease-in-out py-2 hover:bg-emerald-100",size:"small",icon:J,inText:"Submit",onClick:R})]})]})})})]})}const ue=Object.freeze(Object.defineProperty({__proto__:null,default:te},Symbol.toStringTag,{value:"Module"}));export{te as P,S as a,ue as b};
