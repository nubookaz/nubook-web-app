import{u as l,r as t,j as r}from"./app-e454a32c.js";import{P as c}from"./PortalLayout-21f32860.js";import d from"./UploadableProfilePicture-f70c7d40.js";import f from"./PersonalInfo-225ba40c.js";import _ from"./CompanyInfo-966f1a25.js";import{C as i}from"./CardContainer-6cb7a831.js";import"./index.es-372425f6.js";import"./index-af94e81f.js";import"./index-54708238.js";import"./AuthenticatedLayout-4553473c.js";import"./Card-082eb031.js";import"./toPropertyKey-a22241f9.js";import"./useSlot-7faddf1c.js";import"./styleUtils-d305ac7d.js";import"./colorInversionUtils-9e65a708.js";import"./isMuiElement-fba65005.js";import"./Skeleton-55a267a9.js";import"./Modal-03e6d302.js";import"./VerificationProcess-aaf0356d.js";import"./SecondaryButton-a12dea95.js";import"./VerificationStep-065ec25d.js";import"./PrimaryButton-40aba8a0.js";import"./Address-3dede1de.js";import"./Tooltip-be341731.js";import"./useIsFocusVisible-3e69e93a.js";import"./useEventCallback-49b41c49.js";import"./useEnhancedEffect-43c2324b.js";import"./Popper-834fe13e.js";import"./UserName-7eb75d0f.js";import"./Phone-fd7278da.js";import"./ProfilePicture-49b15734.js";import"./ProjectForm-c36574b3.js";import"./ProjectSelector-c55f311c.js";import"./ProjectStepper-5ff8df0d.js";import"./Typography-48b79e4a.js";import"./extendSxProp-70f22bd8.js";import"./VideoStepOne-70db5a19.js";import"./VideoStepTwo-d27dbecc.js";import"./ViewerRating-c06ed4ae.js";import"./createSvgIcon-069ed90c.js";import"./createChainedFunction-0bab83cf.js";import"./debounce-517eeb3c.js";import"./ownerWindow-135fedc8.js";import"./Box-25ca7020.js";import"./variantColorInheritance-0e7a57f6.js";import"./FormControlContext-dfeeca36.js";import"./Chip-037a6e10.js";import"./useSwitch-57a90562.js";import"./MoviePoster-fb686c84.js";import"./index-f17427d6.js";import"./CircularProgress-431e3d65.js";import"./Option-7016ecea.js";import"./ListItemButton-b582df18.js";import"./createSvgIcon-6f7ee0c7.js";import"./Textarea-b1b6024c.js";import"./useForwardedInput-fe782f4f.js";import"./VideoStepThree-57290481.js";import"./CallSheetForm-20e93dad.js";import"./Input-3887f8bc.js";import"./Select-2b2ac5b8.js";import"./Time-f58d8e31.js";import"./GeneralCallTimeForm-f622f116.js";import"./CallSheetProductionSchedule-6142bbbd.js";import"./SceneRow-2f04d50b.js";import"./EditableCell-2584109f.js";import"./EditableSelect-87da7aa7.js";import"./Duration-eb7c63a2.js";import"./BreakRow-1efa832e.js";import"./CompanyMoveRow-9e79e338.js";import"./AddButton-d4e3e0b8.js";import"./CallSheetRecipientForm-b11cbca1.js";import"./Email-e9e6f221.js";import"./ProjectImagePreview-817bab36.js";import"./ImageContainer-868b28f8.js";import"./LogOutForm-f10e7709.js";import"./LocationForm-e6585ccb.js";import"./lodash-ff26d80e.js";import"./Accordion-595a44e0.js";import"./AccordionContent-d0f04001.js";import"./Hospitals-175ed20a.js";import"./IconButton-c8b21cd2.js";import"./AddTaskModal-91a9c815.js";function Oo({onSave:u}){const{user:o}=l(),[p,a]=t.useState({});t.useState(!1);const[n,m]=t.useState({first_name:"",last_name:"",middle_initial:"",tel:"",street_address:"",city:"",state:"",zip_code:""}),[s,e]=t.useState({company_name:"",ein_number:"",job_title:"",number_of_employees:"",referral:""});return t.useEffect(()=>{o&&(m({first_name:o.first_name||"",last_name:o.last_name||"",middle_initial:o.middle_initial||"",tel:o.phone&&o.phone.tel||"",street_address:o.location&&o.location.street_address||"",city:o.location&&o.location.city||"",state:o.location&&o.location.state||"",zip_code:o.location&&o.location.zip_code||""}),e({company_name:o.primary_production_company&&o.primary_production_company.company_name||"",ein_number:o.primary_production_company&&o.primary_production_company.ein_number||"",job_title:o.primary_production_company&&o.primary_production_company.job_title||"",number_of_employees:o.primary_production_company&&o.primary_production_company.number_of_employees||"",referral:o.primary_production_company&&o.primary_production_company.referral||""}))},[o]),r.jsx(c,{breadcrumbs:[{label:"Profile Settings",url:""}],children:{body:r.jsx(r.Fragment,{children:r.jsxs("div",{className:"w-full flex flex-row gap-6 h-full",children:[r.jsxs("div",{className:"flex flex-col gap-6 w-full h-full",children:[r.jsx(i,{header:"Profile Settings",children:r.jsxs("div",{className:"flex flex-row gap-10",children:[r.jsx(d,{isUploadable:!0,className:"!h-[10rem] !w-[10rem] border-red-500"}),r.jsx(f,{onUpdateInfo:m,existingData:n,emptyFields:p,setEmptyFields:a})]})}),r.jsx(i,{header:"Account Settings",className:"h-full"})]}),r.jsxs("div",{className:"flex flex-col gap-6 w-full max-w-[40rem] h-full",children:[r.jsx(i,{header:"Production Company",children:r.jsx(_,{onUpdateInfo:e,existingData:s})}),r.jsx(i,{header:"Subscription Info",className:"h-full"})]})]})})}})}export{Oo as default};