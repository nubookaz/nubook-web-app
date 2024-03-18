import{u as l,b as c,j as r}from"./app-659a3aa2.js";import{I as d}from"./ImageContainer-307535ce.js";import{C as p}from"./CardContainer-713d9aa9.js";import{P as g}from"./PortalLayout-4dd080df.js";import"./index.es-6780b8c7.js";import"./index-9e3aa4c7.js";import"./index-84704c9c.js";import"./AuthenticatedLayout-a56b9925.js";import"./Modal-cab82769.js";import"./VerificationProcess-0d2b000e.js";import"./SecondaryButton-f759061d.js";import"./PersonalInfo-2c76bf67.js";import"./Address-b2f5ad35.js";import"./Tooltip-a5a4d78a.js";import"./toPropertyKey-61b1ecea.js";import"./useSlot-d43794ee.js";import"./useIsFocusVisible-7ca602c7.js";import"./useControlled-adcd3c46.js";import"./useEventCallback-0c2e09c7.js";import"./useEnhancedEffect-12b0a06e.js";import"./Popper-26c3d1f1.js";import"./UserName-0c92173c.js";import"./Phone-b419726f.js";import"./CompanyInfo-5d71478b.js";import"./VerificationStep-c3c15079.js";import"./PrimaryButton-bfc388c8.js";import"./Skeleton-22ae0279.js";import"./ProfilePicture-95ba5e02.js";import"./CreateProject-e710c587.js";import"./ProjectStepper-a31dfa8b.js";import"./Typography-4dbb1ff2.js";import"./extendSxProp-9e510b8c.js";import"./isMuiElement-3bff42a8.js";import"./ProjectTypeSelector-6f56c21f.js";import"./CorporateProjectTypeSelector-2a85e279.js";import"./FamilyEventsTypeSelector-2cc0fb57.js";import"./DigitalContentTypeSelector-91f38218.js";import"./WeddingDetails-6575ed78.js";import"./Time-ed827f8c.js";import"./LiveBroadcastTypeSelector-c3d16e4b.js";import"./LiveEventDetails-bae22e22.js";import"./CreativeEntertainmentTypeSelector-8a17e34a.js";import"./VideoProjectDetails-40e36ef0.js";import"./ProjectPoster-231b66c4.js";import"./Chip-a964b04e.js";import"./variantColorInheritance-f8d1dad2.js";import"./styleUtils-0df93871.js";import"./VideoAdditionalDetails-b10bcf4c.js";import"./EmptyContent-f0c7321b.js";import"./FormControl-ce9c98b9.js";import"./FormControlContext-dd3b9a17.js";import"./Autocomplete-653e6d3e.js";import"./createSvgIcon-b106def2.js";import"./CircularProgress-af137ff7.js";import"./useForwardedInput-be5dd50b.js";import"./ListItemButton-7a78b6ef.js";import"./RadioGroupContext-96bab4a2.js";import"./CreateCallSheet-51bee10a.js";import"./Input-4561b985.js";import"./Select-a8ef8a22.js";import"./index-7f71a8ef.js";import"./CallSheetDetailsForm-6ed5f5d0.js";import"./UpdateCallSheet-a3e95954.js";import"./GeneralCallTimeForm-c89879f5.js";import"./CallSheetProductionSchedule-246588be.js";import"./SceneRow-4a13cc5d.js";import"./EditableCell-25ac580d.js";import"./EditableSelect-b9b77a41.js";import"./Duration-09a34f40.js";import"./BreakRow-461f466a.js";import"./CompanyMoveRow-462377d3.js";import"./AddButton-1ab2e6ad.js";import"./CreateRecipient-c7fa9deb.js";import"./Email-11da6fc8.js";import"./ProjectImagePreview-534c62c0.js";import"./LogOutForm-2b7d1a74.js";import"./LocationForm-600a638c.js";import"./lodash-4de87c17.js";import"./Accordion-a4ba251b.js";import"./AccordionContent-02b996ba.js";import"./Hospitals-fe8d748f.js";import"./IconButton-850b944a.js";import"./AddTaskModal-5b11b501.js";function Vr(){const{userData:o}=l(),{projects:s}=c();console.log("User Data:",o);const a=(()=>{const t=new Date().getHours();return t>=0&&t<12?"Good Morning":t>=12&&t<18?"Good Afternoon":"Good Evening"})(),i=o==null?void 0:o.first_name,m=o==null?void 0:o.last_name,e=t=>t&&t!=="Placeholder"&&t!=="Name",n=`${a} ${e(i)&&e(m)?`${i} ${m}`:""}!`;return r.jsx(g,{breadcrumbs:[{label:n,url:"",className:"!text-3xl"}],children:{body:r.jsxs("div",{className:"flex flex-col gap-4 h-full",children:[r.jsx(d,{backgroundImage:"/images/background_images/bg_image_6.jpg",className:"h-[20rem]"}),r.jsxs("div",{className:"flex flex-row gap-4 h-full",children:[r.jsx(p,{header:"Project Overview",className:"w-full",children:r.jsx("div",{className:"flex flex-col",children:s.map(t=>r.jsxs("div",{className:"p-4 border rounded shadow mb-4",children:[r.jsx("h3",{className:"text-lg font-semibold",children:t.project_name}),r.jsxs("p",{children:[r.jsx("strong",{children:"Stage:"})," ",t.project_stage]}),r.jsxs("p",{children:[r.jsx("strong",{children:"Status:"})," ",t.project_status]}),r.jsxs("p",{children:[r.jsx("strong",{children:"Type:"})," ",t.project_type]}),r.jsxs("p",{children:[r.jsx("strong",{children:"Budget:"})," ",t.project_budget||"N/A"]}),r.jsxs("p",{children:[r.jsx("strong",{children:"Description:"})," ",t.project_description||"No description available"]})]},t.id))})}),r.jsx(p,{header:"Budget Overview",className:"w-full h-full"})]})]})}})}export{Vr as default};
