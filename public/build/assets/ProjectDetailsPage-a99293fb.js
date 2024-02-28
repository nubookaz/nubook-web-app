import{u as _,c as j,r as o,j as e}from"./app-e454a32c.js";import{C as a}from"./CardContainer-6cb7a831.js";import{P as h}from"./PortalLayout-21f32860.js";import{I as v}from"./ImageContainer-868b28f8.js";import{F as p}from"./index.es-372425f6.js";import{T as N,X as f}from"./index-54708238.js";import"./AuthenticatedLayout-4553473c.js";import"./Card-082eb031.js";import"./toPropertyKey-a22241f9.js";import"./useSlot-7faddf1c.js";import"./styleUtils-d305ac7d.js";import"./colorInversionUtils-9e65a708.js";import"./isMuiElement-fba65005.js";import"./Skeleton-55a267a9.js";import"./Modal-03e6d302.js";import"./VerificationProcess-aaf0356d.js";import"./SecondaryButton-a12dea95.js";import"./PersonalInfo-225ba40c.js";import"./Address-3dede1de.js";import"./Tooltip-be341731.js";import"./useIsFocusVisible-3e69e93a.js";import"./useEventCallback-49b41c49.js";import"./useEnhancedEffect-43c2324b.js";import"./Popper-834fe13e.js";import"./UserName-7eb75d0f.js";import"./Phone-fd7278da.js";import"./CompanyInfo-966f1a25.js";import"./VerificationStep-065ec25d.js";import"./PrimaryButton-40aba8a0.js";import"./index-af94e81f.js";import"./ProfilePicture-49b15734.js";import"./ProjectForm-c36574b3.js";import"./ProjectSelector-c55f311c.js";import"./ProjectStepper-5ff8df0d.js";import"./Typography-48b79e4a.js";import"./extendSxProp-70f22bd8.js";import"./VideoStepOne-70db5a19.js";import"./VideoStepTwo-d27dbecc.js";import"./ViewerRating-c06ed4ae.js";import"./createSvgIcon-069ed90c.js";import"./createChainedFunction-0bab83cf.js";import"./debounce-517eeb3c.js";import"./ownerWindow-135fedc8.js";import"./Box-25ca7020.js";import"./variantColorInheritance-0e7a57f6.js";import"./FormControlContext-dfeeca36.js";import"./Chip-037a6e10.js";import"./useSwitch-57a90562.js";import"./MoviePoster-fb686c84.js";import"./index-f17427d6.js";import"./CircularProgress-431e3d65.js";import"./Option-7016ecea.js";import"./ListItemButton-b582df18.js";import"./createSvgIcon-6f7ee0c7.js";import"./Textarea-b1b6024c.js";import"./useForwardedInput-fe782f4f.js";import"./VideoStepThree-57290481.js";import"./CallSheetForm-20e93dad.js";import"./Input-3887f8bc.js";import"./Select-2b2ac5b8.js";import"./Time-f58d8e31.js";import"./GeneralCallTimeForm-f622f116.js";import"./CallSheetProductionSchedule-6142bbbd.js";import"./SceneRow-2f04d50b.js";import"./EditableCell-2584109f.js";import"./EditableSelect-87da7aa7.js";import"./Duration-eb7c63a2.js";import"./BreakRow-1efa832e.js";import"./CompanyMoveRow-9e79e338.js";import"./AddButton-d4e3e0b8.js";import"./CallSheetRecipientForm-b11cbca1.js";import"./Email-e9e6f221.js";import"./ProjectImagePreview-817bab36.js";import"./LogOutForm-f10e7709.js";import"./LocationForm-e6585ccb.js";import"./lodash-ff26d80e.js";import"./Accordion-595a44e0.js";import"./AccordionContent-d0f04001.js";import"./Hospitals-175ed20a.js";import"./IconButton-c8b21cd2.js";import"./AddTaskModal-91a9c815.js";function Ve({project:t}){const{updateCurrentProject:n}=_(),{toggleModal:u}=j(),g=()=>{u({type:"projectImage",imageUrl:r.movie_poster.url})},[y,c]=o.useState(!0),[l,d]=o.useState(t.is_favorite),i=async()=>{try{const s=!l;d(s),await axios.post(route("projects.favorite",{id:t.id}),{isFavorite:s})}catch(s){console.error("Error updating favorite status:",s),d(l)}},[r,x]=o.useState({id:"",is_favorite:"",project_type:"",video_type:"",project_name:"",project_description:"",primary_genre:"",secondary_genre:"",viewer_rating:"",movie_poster:"",project_stage:"",project_status:"",filming_days:"",project_budget:""});o.useEffect(()=>{t&&(x({...t}),n(t),c(!1))},[t]),o.useEffect(()=>{t&&(x({id:t.id||"",is_favorite:t.is_favorite||!1,project_type:t.project_type||"",video_type:t.video_type||"",project_name:t.project_name||"",project_description:t.project_description||"",primary_genre:t.video_production.primary_genre||"",secondary_genre:t.video_production.secondary_genre||"",viewer_rating:t.video_production.viewer_rating||"",movie_poster:t.video_production.movie_poster||"",project_stage:t.project_stage||"",project_status:t.project_status||"",filming_days:t.video_production.filming_days||"",project_budget:t.project_budget||""}),n(t),c(!1))},[t]);const m=s=>Number(s).toFixed(2).replace(/\d(?=(\d{3})+\.)/g,"$&,");return e.jsx(h,{breadcrumbs:[{label:"Overview",url:route("projects.index")},{label:"Project List",url:route("projects.list")},{label:"Project Details",url:""}],project:t,children:{body:e.jsxs("div",{className:"w-full h-full flex flex-row gap-4",children:[e.jsxs("div",{className:"flex flex-col gap-4 h-full w-full",children:[e.jsx(a,{className:"w-full h-full max-h-[24rem]",onClick:i,children:e.jsxs("div",{className:"flex flex-row gap-6 w-full h-full",children:[e.jsx(v,{backgroundImage:r.movie_poster.url?r.movie_poster.url:"/images/movie_posters/coming_soon_poster.jpg",className:"cursor-pointer w-full max-w-[15rem] h-full",overlayOpacity:"0",enableHover:!0,onClick:g}),e.jsxs("div",{className:"flex flex-col gap-2 h-full w-full justify-between max-h-[20rem] my-auto",children:[e.jsxs("div",{className:"flex flex-col gap-2",children:[e.jsxs("div",{className:"flex flex-row gap-2",children:[e.jsx("span",{className:"text-xs py-1 px-4 text-slate-400  bg-slate-100 rounded-md",children:r.project_status}),e.jsx("span",{className:"text-xs py-1 px-4 text-slate-400  bg-slate-100 rounded-md",children:r.project_stage})]}),e.jsxs("div",{className:"flex flex-row gap-6",children:[e.jsx("h2",{className:"text-[2.5rem] text-slate-600",children:r.project_name}),e.jsx(p,{icon:N,className:`text-2xl my-auto cursor-pointer duration-500 ${l?"text-red-500 drop-shadow-[0_1px_3px_rgba(253,164,175,0.75)]":"text-gray-300"}`,onClick:i})]}),e.jsxs("div",{className:"flex flex-row gap-4",children:[r.primary_genre?e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"text-sm",children:r.primary_genre}),e.jsx(p,{icon:f,className:"text-[.5rem] my-auto"})]}):null,r.secondary_genre?e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"text-sm",children:r.secondary_genre}),e.jsx(p,{icon:f,className:"text-[.5rem] my-auto"})]}):null,e.jsx("span",{className:"text-sm",children:r.video_type})]})]}),e.jsx("div",{className:"text-sm h-full w-full",children:r.project_description?e.jsx("p",{className:" text-slate-400 h-full w-full",children:r.project_description}):e.jsx("p",{className:"bg-slate-50 text-slate-300 h-full w-full rounded-md p-4 items-center flex justify-center",children:"This project does not have a decription."})}),e.jsxs("div",{className:"flex flex-row gap-4",children:[e.jsxs("div",{className:"flex flex-col gap-2",children:[e.jsx("span",{className:"text-xs text-slate-400 font-bold",children:"Movie Rating"}),e.jsx("p",{className:"text-2xl font-bold text-center",children:r.viewer_rating?r.viewer_rating:"NR"})]}),e.jsxs("div",{className:"flex flex-col gap-2",children:[e.jsx("span",{className:"text-xs text-slate-400 font-bold",children:"RMNG Filming Days"}),e.jsx("p",{className:"text-2xl font-bold text-center",children:r.filming_days})]})]})]})]})}),e.jsx(a,{header:"Tasks",className:"h-full",onClick:i})]}),e.jsxs("div",{className:"flex flex-col h-full w-full max-w-[28rem] gap-4",children:[e.jsxs(a,{header:"Budget",onClick:i,children:[e.jsxs("div",{className:"flex flex-col text-center py-[3rem]",children:[e.jsx("span",{className:"text-slate-400 font-semibold",children:"Project Budget"}),e.jsxs("span",{className:"text-[2rem] text-emerald-500 font-bold",children:["$",m(r.project_budget)]})]}),e.jsxs("div",{className:"flex flex-row gap-2 justify-between",children:[e.jsxs("div",{className:"flex flex-col gap-2 text-center bg-slate-100 rounded-md p-4 w-full",children:[e.jsx("span",{className:"text-slate-400 font-semibold",children:"Total Expenses"}),e.jsxs("span",{className:"text-[1rem] text-rose-500 font-bold",children:["$",m(r.project_budget)]})]}),e.jsxs("div",{className:"flex flex-col gap-2 text-center bg-slate-100 rounded-md p-4 w-full",children:[e.jsx("span",{className:"text-slate-400 font-semibold",children:"Remaining Budget"}),e.jsxs("span",{className:"text-[1rem] text-emerald-500 font-bold",children:["$",m(r.project_budget)]})]})]})]}),e.jsx(a,{header:"Activity",className:"h-full"})]})]})}})}export{Ve as default};