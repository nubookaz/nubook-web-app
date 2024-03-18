import{u as l,r as t,j as r}from"./app-659a3aa2.js";import{P as c}from"./PortalLayout-4dd080df.js";import d from"./UploadableProfilePicture-7d32e765.js";import f from"./PersonalInfo-2c76bf67.js";import _ from"./CompanyInfo-5d71478b.js";import{C as i}from"./CardContainer-713d9aa9.js";import"./index.es-6780b8c7.js";import"./index-9e3aa4c7.js";import"./index-84704c9c.js";import"./AuthenticatedLayout-a56b9925.js";import"./Modal-cab82769.js";import"./VerificationProcess-0d2b000e.js";import"./SecondaryButton-f759061d.js";import"./VerificationStep-c3c15079.js";import"./PrimaryButton-bfc388c8.js";import"./Skeleton-22ae0279.js";import"./toPropertyKey-61b1ecea.js";import"./useSlot-d43794ee.js";import"./Address-b2f5ad35.js";import"./Tooltip-a5a4d78a.js";import"./useIsFocusVisible-7ca602c7.js";import"./useControlled-adcd3c46.js";import"./useEventCallback-0c2e09c7.js";import"./useEnhancedEffect-12b0a06e.js";import"./Popper-26c3d1f1.js";import"./UserName-0c92173c.js";import"./Phone-b419726f.js";import"./ProfilePicture-95ba5e02.js";import"./CreateProject-e710c587.js";import"./ProjectStepper-a31dfa8b.js";import"./Typography-4dbb1ff2.js";import"./extendSxProp-9e510b8c.js";import"./isMuiElement-3bff42a8.js";import"./ProjectTypeSelector-6f56c21f.js";import"./CorporateProjectTypeSelector-2a85e279.js";import"./FamilyEventsTypeSelector-2cc0fb57.js";import"./DigitalContentTypeSelector-91f38218.js";import"./WeddingDetails-6575ed78.js";import"./Time-ed827f8c.js";import"./LiveBroadcastTypeSelector-c3d16e4b.js";import"./LiveEventDetails-bae22e22.js";import"./CreativeEntertainmentTypeSelector-8a17e34a.js";import"./VideoProjectDetails-40e36ef0.js";import"./ProjectPoster-231b66c4.js";import"./Chip-a964b04e.js";import"./variantColorInheritance-f8d1dad2.js";import"./styleUtils-0df93871.js";import"./VideoAdditionalDetails-b10bcf4c.js";import"./EmptyContent-f0c7321b.js";import"./FormControl-ce9c98b9.js";import"./FormControlContext-dd3b9a17.js";import"./Autocomplete-653e6d3e.js";import"./createSvgIcon-b106def2.js";import"./CircularProgress-af137ff7.js";import"./useForwardedInput-be5dd50b.js";import"./ListItemButton-7a78b6ef.js";import"./RadioGroupContext-96bab4a2.js";import"./CreateCallSheet-51bee10a.js";import"./Input-4561b985.js";import"./Select-a8ef8a22.js";import"./index-7f71a8ef.js";import"./CallSheetDetailsForm-6ed5f5d0.js";import"./UpdateCallSheet-a3e95954.js";import"./GeneralCallTimeForm-c89879f5.js";import"./CallSheetProductionSchedule-246588be.js";import"./SceneRow-4a13cc5d.js";import"./EditableCell-25ac580d.js";import"./EditableSelect-b9b77a41.js";import"./Duration-09a34f40.js";import"./BreakRow-461f466a.js";import"./CompanyMoveRow-462377d3.js";import"./AddButton-1ab2e6ad.js";import"./CreateRecipient-c7fa9deb.js";import"./Email-11da6fc8.js";import"./ProjectImagePreview-534c62c0.js";import"./ImageContainer-307535ce.js";import"./LogOutForm-2b7d1a74.js";import"./LocationForm-600a638c.js";import"./lodash-4de87c17.js";import"./Accordion-a4ba251b.js";import"./AccordionContent-02b996ba.js";import"./Hospitals-fe8d748f.js";import"./IconButton-850b944a.js";import"./AddTaskModal-5b11b501.js";import"./index-b4698f05.js";function Vo({onSave:u}){const{user:o}=l(),[e,a]=t.useState({});t.useState(!1);const[n,m]=t.useState({first_name:"",last_name:"",middle_initial:"",tel:"",street_address:"",city:"",state:"",zip_code:""}),[s,p]=t.useState({company_name:"",ein_number:"",job_title:"",number_of_employees:"",referral:""});return t.useEffect(()=>{o&&(m({first_name:o.first_name||"",last_name:o.last_name||"",middle_initial:o.middle_initial||"",tel:o.phone&&o.phone.tel||"",street_address:o.location&&o.location.street_address||"",city:o.location&&o.location.city||"",state:o.location&&o.location.state||"",zip_code:o.location&&o.location.zip_code||""}),p({company_name:o.primary_production_company&&o.primary_production_company.company_name||"",ein_number:o.primary_production_company&&o.primary_production_company.ein_number||"",job_title:o.primary_production_company&&o.primary_production_company.job_title||"",number_of_employees:o.primary_production_company&&o.primary_production_company.number_of_employees||"",referral:o.primary_production_company&&o.primary_production_company.referral||""}))},[o]),r.jsx(c,{breadcrumbs:[{label:"Profile Settings",url:""}],children:{body:r.jsx(r.Fragment,{children:r.jsxs("div",{className:"w-full flex flex-row gap-6 h-full",children:[r.jsxs("div",{className:"flex flex-col gap-6 w-full h-full",children:[r.jsx(i,{header:"Profile Settings",children:r.jsxs("div",{className:"flex flex-row gap-10",children:[r.jsx(d,{isUploadable:!0,className:"!h-[10rem] !w-[10rem] border-red-500"}),r.jsx(f,{onUpdateInfo:m,existingData:n,emptyFields:e,setEmptyFields:a})]})}),r.jsx(i,{header:"Account Settings",className:"h-full"})]}),r.jsxs("div",{className:"flex flex-col gap-6 w-full max-w-[40rem] h-full",children:[r.jsx(i,{header:"Production Company",children:r.jsx(_,{onUpdateInfo:p,existingData:s})}),r.jsx(i,{header:"Subscription Info",className:"h-full"})]})]})})}})}export{Vo as default};
