import{u as z,r as a,j as e}from"./app-e454a32c.js";import{A}from"./AuthenticatedLayout-4553473c.js";import{C as n}from"./CardContainer-6cb7a831.js";import{S as $,P as k}from"./PortalLayout-21f32860.js";import"./index.es-372425f6.js";import{M as L}from"./Modal-03e6d302.js";import{T as F}from"./Tooltip-be341731.js";import{T as M}from"./Textarea-b1b6024c.js";import{T as O}from"./Typography-48b79e4a.js";import"./index-54708238.js";import"./Card-082eb031.js";import"./toPropertyKey-a22241f9.js";import"./useSlot-7faddf1c.js";import"./styleUtils-d305ac7d.js";import"./colorInversionUtils-9e65a708.js";import"./isMuiElement-fba65005.js";import"./Skeleton-55a267a9.js";import"./VerificationProcess-aaf0356d.js";import"./SecondaryButton-a12dea95.js";import"./PersonalInfo-225ba40c.js";import"./Address-3dede1de.js";import"./useIsFocusVisible-3e69e93a.js";import"./useEventCallback-49b41c49.js";import"./useEnhancedEffect-43c2324b.js";import"./Popper-834fe13e.js";import"./UserName-7eb75d0f.js";import"./Phone-fd7278da.js";import"./CompanyInfo-966f1a25.js";import"./VerificationStep-065ec25d.js";import"./PrimaryButton-40aba8a0.js";import"./index-af94e81f.js";import"./ProfilePicture-49b15734.js";import"./ProjectForm-c36574b3.js";import"./ProjectSelector-c55f311c.js";import"./ProjectStepper-5ff8df0d.js";import"./extendSxProp-70f22bd8.js";import"./VideoStepOne-70db5a19.js";import"./VideoStepTwo-d27dbecc.js";import"./ViewerRating-c06ed4ae.js";import"./createSvgIcon-069ed90c.js";import"./createChainedFunction-0bab83cf.js";import"./debounce-517eeb3c.js";import"./ownerWindow-135fedc8.js";import"./Box-25ca7020.js";import"./variantColorInheritance-0e7a57f6.js";import"./FormControlContext-dfeeca36.js";import"./Chip-037a6e10.js";import"./useSwitch-57a90562.js";import"./MoviePoster-fb686c84.js";import"./index-f17427d6.js";import"./CircularProgress-431e3d65.js";import"./Option-7016ecea.js";import"./ListItemButton-b582df18.js";import"./createSvgIcon-6f7ee0c7.js";import"./useForwardedInput-fe782f4f.js";import"./VideoStepThree-57290481.js";import"./CallSheetForm-20e93dad.js";import"./Input-3887f8bc.js";import"./Select-2b2ac5b8.js";import"./Time-f58d8e31.js";import"./GeneralCallTimeForm-f622f116.js";import"./CallSheetProductionSchedule-6142bbbd.js";import"./SceneRow-2f04d50b.js";import"./EditableCell-2584109f.js";import"./EditableSelect-87da7aa7.js";import"./Duration-eb7c63a2.js";import"./BreakRow-1efa832e.js";import"./CompanyMoveRow-9e79e338.js";import"./AddButton-d4e3e0b8.js";import"./CallSheetRecipientForm-b11cbca1.js";import"./Email-e9e6f221.js";import"./ProjectImagePreview-817bab36.js";import"./ImageContainer-868b28f8.js";import"./LogOutForm-f10e7709.js";import"./LocationForm-e6585ccb.js";import"./lodash-ff26d80e.js";import"./Accordion-595a44e0.js";import"./AccordionContent-d0f04001.js";import"./Hospitals-175ed20a.js";import"./IconButton-c8b21cd2.js";import"./AddTaskModal-91a9c815.js";function vt({project:t}){var f;const{updateCurrentProject:j}=z(),_={showTopBar:!1,showRightContent:!1,size:"page-banner"},v=t,y="Save Project Settings",[s,c]=a.useState({id:"",project_type:"",video_type:"",project_name:"",project_description:"",primary_genre:"",secondary_genre:"",viewer_rating:"",movie_poster:"",project_stage:"",project_status:"",filming_days:"",project_budget:""}),[w,m]=a.useState(t!=null&&t.project_name?`${t.project_name} : Project Settings`:"Project Settings"),[q,b]=a.useState(!1),[d,U]=a.useState(null),[S,u]=a.useState(!1),[x,J]=a.useState({width:0,height:0}),[K,N]=a.useState(!0);a.useState("");const i=730,[P,p]=a.useState(((f=s.project_description)==null?void 0:f.length.toString())||"0"),[C,W]=a.useState({}),[T,h]=a.useState(!1);a.useEffect(()=>{t&&(c({id:t.id||"",project_type:t.project_type||"",video_type:t.video_type||"",project_name:t.project_name||"",project_description:t.project_description||"",primary_genre:t.video_production.primary_genre||"",secondary_genre:t.video_production.secondary_genre||"",viewer_rating:t.video_production.viewer_rating||"",movie_poster:t.video_production.movie_poster||"",project_stage:t.project_stage||"",project_status:t.project_status||"",filming_days:t.video_production.filming_days||"",project_budget:t.project_budget||""}),N(!1),m(`${t.project_name} : Project Settings`))},[t]),console.log(s),a.useEffect(()=>{var o;const r=!!t.video_production.movie_poster;b(r),p(((o=s.project_description)==null?void 0:o.length.toString())||"0")},[t]);const g=(r,o)=>{const l={...s,[r]:o};c(l)},D=r=>{const o=r.target.value.slice(0,i);p(o.length.toString()),g("project_description",o)};function I(r){setTimeout(()=>{s.project_description;let o=r.target.value;o.length>i&&(o=o.substring(0,i)),o=o.replace(/\r?\n|\r/g," "),c({...s,project_description:o}),p(o.length.toString())},0)}const E=async()=>{let r=new FormData;Object.keys(s).forEach(o=>{o!=="movie_poster"&&r.append(o,s[o])}),r.append("poster_width",x.width),r.append("poster_height",x.height),d&&r.append("uploadedImage",d);try{const o={headers:{"Content-Type":"multipart/form-data"}},l=await axios.post(route("projects.update",{id:t.id}),r,o);console.log("Project data received from save:",l.data),m(`${s.project_name} : Project Settings`),j(l.data.project),u(!0),setTimeout(()=>{u(!1)},3e3)}catch(o){console.error("Error updating project:",o)}},B=r=>Number(r).toFixed(2).replace(/\d(?=(\d{3})+\.)/g,"$&,"),R=async()=>{if(!t.id){console.error("No project ID available for deletion");return}try{const r=route("projects.delete",{id:t.id}),o=await axios.delete(r);console.log("Delete response:",o),window.location.href="/projects"}catch(r){console.error("Error deleting project:",r)}};return console.log(s),e.jsx(A,{project:t,showBanner:!0,bannerProps:_,children:{surface:e.jsxs("div",{className:"relative z-50 w-full h-full",children:[e.jsx($,{color:"success",size:"lg",variant:"solid",open:S,className:"w-full max-w-[30rem]",children:"Saved! Project Settings Saved!"}),e.jsx(L,{show:T,maxWidth:"100%",dialogPanelClass:"!max-w-[30rem]",onClose:h,showCloseButton:"true",children:e.jsxs("div",{className:"p-8 text-center h-full flex flex-col justify-center my-auto",children:[e.jsx("h3",{className:"text-xl font-bold mb-4",children:"Delete Project"}),e.jsxs("p",{className:"mb-6",children:["Are you sure you want to delete this project? ",e.jsx("br",{})," This action cannot be undone."]}),e.jsxs("div",{className:"flex justify-center gap-4",children:[e.jsx("button",{onClick:()=>h(!1),className:"bg-slate-200 duration-500 hover:bg-slate-500 hover:text-white text-slate-500 py-2 px-4 rounded",children:"Cancel"}),e.jsx("button",{onClick:R,className:"bg-rose-200 duration-500 hover:bg-rose-500 text-white font-bold py-2 px-4 rounded",children:"Delete Project"})]})]})})]}),portalBody:e.jsx("div",{className:"w-full h-full",children:e.jsx(k,{hasData:v,toolbarTitle:w,toolbarCTAText:y,onPrimaryToolbarButtonClick:E,pageType:"Call Sheets",children:{content:e.jsxs("div",{className:"w-full h-full flex flex-row gap-4",children:[e.jsx("div",{className:"flex flex-col gap-4 w-full h-full max-w-[18rem]"}),e.jsxs("div",{className:"flex flex-col gap-4 w-[185rem]",children:[e.jsx("div",{className:"flex flex-row gap-4",children:e.jsx(n,{header:"Project Title",showButtonIcon:!0,children:e.jsx(F,{arrow:!0,sx:{fontSize:".75rem"},title:"Project Name is Required",open:C.project_name||!1,color:"danger",placement:"top",variant:"outlined",children:e.jsx("input",{type:"text",name:"project_name",placeholder:"Indiana Jones and Raiders of the Lost Ark",value:s.project_name,required:!0,onChange:r=>g("project_name",r.target.value),className:"p-2 border border-gray-300 rounded-md font-bold !text-lg"})})})}),e.jsx(n,{header:"Project Description",className:"",children:e.jsx(M,{minRows:7,maxRows:7,name:"project_description",placeholder:"Epic tale in which an intrepid archaeologist...",value:s.project_description||"",onChange:D,maxLength:i,className:"!text-slate-500 !bg-slate-100",onPaste:I,onKeyDown:r=>{r.key==="Enter"&&r.preventDefault()},endDecorator:e.jsxs(O,{level:"body-xs",sx:{ml:"auto"},children:[P,"/",i," Characters Remaining"]}),sx:{fontSize:".90rem"}})}),e.jsx(n,{header:"Tasks",className:"h-full"})]}),e.jsxs("div",{className:"w-full flex flex-col gap-4",children:[e.jsxs(n,{header:"Budget",children:[e.jsxs("div",{className:"my-8",children:[e.jsx("h2",{className:"text-center !text-sm",children:"Total Budget"}),e.jsxs("p",{className:"text-center font-bold text-4xl text-emerald-500",children:["$",B(s.project_budget)]})]}),e.jsxs("div",{className:"flex flex-row gap-4 justify-between w-full text-center bg-slate-50 py-8",children:[e.jsxs("div",{className:"flex flex-col gap-2 w-full",children:[e.jsx("span",{className:"text-sm text-slate-400",children:"Total Expenses"}),e.jsx("p",{className:"text-2xl font-bold text-slate-600",children:"$500000"})]}),e.jsxs("div",{className:"flex flex-col gap-2 w-full",children:[e.jsx("span",{className:"text-sm text-slate-400",children:"Remaining Budget"}),e.jsx("p",{className:"text-2xl font-bold text-rose-400",children:"-$500000"})]})]})]}),e.jsx(n,{header:"Activity",className:"h-full"})]})]})}})})}})}export{vt as default};