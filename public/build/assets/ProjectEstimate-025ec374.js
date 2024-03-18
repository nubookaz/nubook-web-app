import{q as h,r as x,j as t}from"./app-d6201cb1.js";import{A as f}from"./AuthenticatedLayout-ee0d9e09.js";import{P as y}from"./PortalLayout-44ecfb2a.js";import{T as e}from"./Tooltip-72ad1b91.js";import{I as T}from"./Autocomplete-a874b033.js";import{S as v,O as p}from"./Option-8a17d132.js";import{T as g}from"./Textarea-a202688a.js";import"./index.es-4ddfc134.js";import"./index-cbb8f8c7.js";import"./index-d825d59e.js";import"./Modal-aea4b1df.js";import"./VerificationProcess-bd294949.js";import"./SecondaryButton-ec37e17e.js";import"./PersonalInfo-72bd019f.js";import"./Address-3d862fb7.js";import"./toPropertyKey-0671445a.js";import"./useSlot-958e930c.js";import"./useIsFocusVisible-38d1530f.js";import"./useControlled-565a38ff.js";import"./useEventCallback-4bbe510b.js";import"./useEnhancedEffect-8ef057d9.js";import"./Popper-e501f2f6.js";import"./UserName-fe94ada0.js";import"./Phone-0b1027a9.js";import"./CompanyInfo-eaef0058.js";import"./VerificationStep-bfe8ad6f.js";import"./PrimaryButton-a6b04e33.js";import"./Skeleton-7485a0d1.js";import"./ProfilePicture-2cfca26c.js";import"./CreateProject-ed42442c.js";import"./ProjectStepper-dd7db97a.js";import"./Typography-651ae2a6.js";import"./extendSxProp-0a396769.js";import"./isMuiElement-2d2d89c3.js";import"./ProjectTypeSelector-1750e361.js";import"./CorporateProjectTypeSelector-ceab0918.js";import"./FamilyEventsTypeSelector-dbef564a.js";import"./DigitalContentTypeSelector-4c2098b9.js";import"./WeddingDetails-d3754357.js";import"./Time-bb5f7eb2.js";import"./LiveBroadcastTypeSelector-693e3b97.js";import"./LiveEventDetails-cc62624b.js";import"./CreativeEntertainmentTypeSelector-ac41b637.js";import"./VideoProjectDetails-3a830175.js";import"./ProjectPoster-8358dcf3.js";import"./Chip-fc48afba.js";import"./variantColorInheritance-3035274c.js";import"./styleUtils-354e910e.js";import"./VideoAdditionalDetails-10f5d3c5.js";import"./EmptyContent-069e6ebe.js";import"./FormControl-bcb6d899.js";import"./FormControlContext-906cd091.js";import"./formLabelClasses-82b26510.js";import"./createSvgIcon-ba04faf8.js";import"./CircularProgress-f468e6ba.js";import"./useForwardedInput-ffe731dd.js";import"./ListItemButton-596ed1f7.js";import"./RadioGroupContext-f4fb6991.js";import"./CreateCallSheet-f425acd9.js";import"./Input-3545e92a.js";import"./Select-5e1ea401.js";import"./index-18511f95.js";import"./CallSheetDetailsForm-51bbc808.js";import"./UpdateCallSheet-f864231a.js";import"./GeneralCallTimeForm-eab367d2.js";import"./CallSheetProductionSchedule-e0a3f97b.js";import"./SceneRow-fe6cdde4.js";import"./EditableCell-1f4f22ef.js";import"./EditableSelect-fc3f293c.js";import"./Duration-2ada395e.js";import"./BreakRow-cee8321a.js";import"./CompanyMoveRow-73ba05d3.js";import"./AddButton-b3e118f0.js";import"./CreateRecipient-dc07c385.js";import"./Email-8e0a7de6.js";import"./ProjectImagePreview-651409a5.js";import"./ImageContainer-8555b812.js";import"./LogOutForm-5c7f1fd7.js";import"./LocationForm-9fb7b88a.js";import"./lodash-d45ede16.js";import"./Accordion-6eb3061f.js";import"./AccordionContent-45fe2601.js";import"./Hospitals-517bb359.js";import"./IconButton-733615f2.js";import"./AddTaskModal-0c42d99f.js";import"./ownerWindow-8eff4865.js";function rr({auth:m}){const{project:r}=h().props,c={showGreeting:!0},[o,a]=x.useState({projectName:r.projectName||"",projectType:r.projectType||"",projectDescription:r.projectDescription||"",projectBudget:r.projectBudget||0,categoryType:r.categoryType||"",projectStage:r.projectStage||"",projectDays:r.projectDays||0,projectMonths:r.projectMonths||0,projectYears:r.projectYears||0}),s=r,l=r.projectName,n="Create a New Call Sheet",j="Create a New Call Sheet",d="../../images/svg_images/undraw_call_sheets_1.svg",u=route("projects.index");return t.jsx(f,{user:m.user,bannerProps:c,children:{surface:t.jsx("div",{className:"relative z-50 w-full h-full"}),portalBody:t.jsx("div",{className:"w-full h-full",children:t.jsxs(y,{backButtonHref:u,hasData:s,toolbarTitle:l,toolbarCTAText:n,buttonText:j,customSvgPath:d,children:[t.jsx("div",{children:t.jsx(e,{title:"Project Name",placement:"top",children:t.jsx(T,{type:"text",id:"projectName",name:"projectName",value:o.projectName})})}),t.jsx("div",{children:t.jsx(e,{title:"Project Type",placement:"top",children:t.jsxs(v,{placeholder:"Project Type",value:o.projectType,className:"w-full",required:!0,onChange:(N,i)=>{console.log("New Project Type:",i),a({...o,projectType:i})},children:[t.jsx(p,{value:"Commercial",children:"Commercial"}),t.jsx(p,{value:"Independent",children:"Independent"}),t.jsx(p,{value:"Studio-Backed",children:"Studio-Backed"})]})})}),t.jsx("div",{children:t.jsx(e,{title:"Project Description",placement:"top",children:t.jsx(g,{id:"projectDescription",name:"projectDescription",value:o.projectDescription})})})]})})}})}export{rr as default};
