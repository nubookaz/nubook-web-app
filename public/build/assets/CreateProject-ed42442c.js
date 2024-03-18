import{b as de,r,j as e}from"./app-d6201cb1.js";import pe from"./ProjectStepper-dd7db97a.js";import{P as R}from"./PrimaryButton-a6b04e33.js";import{S as U}from"./SecondaryButton-ec37e17e.js";import me from"./ProjectTypeSelector-1750e361.js";import ye from"./CorporateProjectTypeSelector-ceab0918.js";import je from"./FamilyEventsTypeSelector-dbef564a.js";import ue from"./DigitalContentTypeSelector-4c2098b9.js";import fe from"./WeddingDetails-d3754357.js";import Se from"./LiveBroadcastTypeSelector-693e3b97.js";import ve from"./LiveEventDetails-cc62624b.js";import Te from"./CreativeEntertainmentTypeSelector-ac41b637.js";import Ce from"./VideoProjectDetails-3a830175.js";import he from"./VideoAdditionalDetails-10f5d3c5.js";import"./index.es-4ddfc134.js";import"./index-cbb8f8c7.js";import"./index-d825d59e.js";import"./toPropertyKey-0671445a.js";import"./useSlot-958e930c.js";import"./Typography-651ae2a6.js";import"./extendSxProp-0a396769.js";import"./isMuiElement-2d2d89c3.js";import"./Time-bb5f7eb2.js";import"./Address-3d862fb7.js";import"./Tooltip-72ad1b91.js";import"./useIsFocusVisible-38d1530f.js";import"./useControlled-565a38ff.js";import"./useEventCallback-4bbe510b.js";import"./useEnhancedEffect-8ef057d9.js";import"./Popper-e501f2f6.js";import"./ProjectPoster-8358dcf3.js";import"./Chip-fc48afba.js";import"./variantColorInheritance-3035274c.js";import"./styleUtils-354e910e.js";import"./EmptyContent-069e6ebe.js";import"./FormControl-bcb6d899.js";import"./FormControlContext-906cd091.js";import"./formLabelClasses-82b26510.js";import"./Autocomplete-a874b033.js";import"./createSvgIcon-ba04faf8.js";import"./CircularProgress-f468e6ba.js";import"./useForwardedInput-ffe731dd.js";import"./ListItemButton-596ed1f7.js";import"./RadioGroupContext-f4fb6991.js";const yt=({onClose:q,resetSignal:D})=>{const{createProject:z}=de(),[H,J]=r.useState(!1),[i,y]=r.useState(0),[T,n]=r.useState({corporateType:"",selectedProjectType:"",selectedCorporateType:"",selectedFamilyEventType:"",selectedCreativeType:"",selectedLiveBroadcastType:"",selectedDigitalContentType:"",weddingDetails:{},liveEventDetails:{},videoProjectDetails:{}}),[P,E]=r.useState({uploadedImage:null}),[xe,C]=r.useState(!1),[a,g]=r.useState(""),[j,w]=r.useState(""),[u,b]=r.useState(""),[d,F]=r.useState(""),[f,k]=r.useState(""),[h,B]=r.useState(""),[L,N]=r.useState({}),[A,I]=r.useState({}),[p,V]=r.useState({}),[x,W]=r.useState({}),[K,M]=r.useState(null),O=t=>{M(t)},[Q,X]=r.useState(""),[$,S]=r.useState("");r.useEffect(()=>{J(!0),D&&G()},[D]),r.useEffect(()=>{console.log("Updated videoProjectDetails:",p)},[p]);const Y=t=>{C(t)},Z=t=>{E({...P,uploadedImage:t})};console.log("projectData",T),console.log("additionalVideoDetails",x);const l=(t,s)=>{let o=i;switch(t){case"selectedProjectType":g(s),n({...T,type:s}),o=1;break;case"selectedCorporateType":w(s),n(c=>({...c,corporateType:s})),o=2;break;case"selectedFamilyEventType":b(s),n(c=>({...c,familyEventType:s})),o=2;break;case"selectedCreativeType":F(s),n(c=>({...c,creativeType:s})),o=2;break;case"selectedLiveBroadcastType":k(s),n(c=>({...c,liveBroadcastType:s})),o=2;break;case"selectedDigitalContentType":B(s),n(c=>({...c,digitalContentType:s})),o=2;break}C(!1),S(""),X(s),y(o)},G=()=>{g(""),w(""),b(""),F(""),k(""),B(""),N({}),I({}),V({}),W({}),n({name:"",description:"",type:""}),E({uploadedImage:null}),C(!1),S(""),y(0),q()},_=async t=>{t.preventDefault();const s={...T,selectedProjectType:a,selectedCorporateType:j,selectedFamilyEventType:u,selectedCreativeType:d,selectedLiveBroadcastType:f,selectedDigitalContentType:h,weddingDetails:L,liveEventDetails:A,videoProjectDetails:p,additionalVideoDetails:x,projectAssets:P};await z(s)},ee=()=>{let t="";switch(i){case 0:a||(t="Please select a project type to continue.");break;case 1:!j&&!u&&!d&&!f&&!h&&(t="Please make a selection to continue.");break;case 2:i===2&&!p.projectName&&(t="Please enter a project name to continue.");break}t?S(t):(S(""),y(i+1))},te=()=>y(i-1),m=t=>typeof t!="string"?"":t.split(" - ")[0],re=()=>{const t=m(a);return{"Corporate & Commercial":e.jsx(ye,{selectedType:j,onSelectType:o=>l("selectedCorporateType",o)}),"Family Events & Celebrations":e.jsx(je,{selectedType:u,onSelectType:o=>l("selectedFamilyEventType",o)}),"Creative & Entertainment":e.jsx(Te,{selectedType:d,onSelectType:o=>l("selectedCreativeType",o)}),"Live Broadcast":e.jsx(Se,{selectedType:f,onSelectType:o=>l("selectedLiveBroadcastType",o)}),"Digital Content":e.jsx(ue,{selectedType:h,onSelectType:o=>l("selectedDigitalContentType",o)})}[t]||e.jsx("div",{children:"Please select a project type to see more details."})},oe=()=>{switch(m(a)){case"Corporate & Commercial":return se();case"Family Events & Celebrations":return ie();case"Live Broadcast":return ae();case"Creative & Entertainment":return ce();default:return e.jsx("div",{children:"Additional details for the selected project type."})}},se=()=>{switch(j){case"Corporate Events":return e.jsx("div",{children:"Content for Corporate Events"});case"Conferences/Seminars":return e.jsx("div",{children:"Content for Conferences/Seminars"});default:return e.jsx("div",{children:"Select a corporate project type to see more details"})}},ie=()=>{switch(u){case"Wedding":return e.jsx(fe,{weddingDetails:L,setWeddingDetails:t=>N({...t,weddingDetails:t})});default:return e.jsx("div",{children:"Select a family event type to see more details"})}},ae=()=>{switch(f){case"Concerts":case"Conferences":case"Graduations":return e.jsx(ve,{liveEventDetails:A,setLiveEventDetails:t=>I({...t,liveEventDetails:t})});default:return e.jsx("div",{children:"Select a live broadcast project type to see more details"})}},ce=()=>{switch(d){case"Documentary Films":case"Short Films":case"Feature Films":return e.jsx(Ce,{videoProjectDetails:p,setVideoProjectDetails:V,setSelectionError:Y,updateProjectAssets:Z,posterImagePreview:K,handlePosterImageChange:O});default:return e.jsx("div",{children:"Select a creative project type to see more details"})}},ne=()=>{if(a.includes("Creative & Entertainment"))switch(d){case"Documentary Films":case"Short Films":case"Feature Films":return e.jsx(he,{additionalVideoDetails:x,setAdditionalVideoDetails:W});default:return e.jsx("div",{children:"Select a detailed project type in Creative & Entertainment to see more details here"})}else return e.jsx("div",{children:"Step 4 content based on other selections"})},v=[{header:"Select Project Type",description:"Choose the type of project you want to create.",content:e.jsx(me,{selectedProjectType:a,onProjectTypeSelect:t=>l("selectedProjectType",t)})},{header:`Select ${i===1?m(a):"Details"}`,description:`Provide more details about your ${i===1?m(a).toLowerCase():"selection"}.`,content:re()},{header:"Additional Details",description:"Provide additional details for the selected project type.",content:oe()},{header:"Step 4: Additional Form",description:"Fill out additional information for your project.",content:ne()}],le=()=>e.jsxs("div",{className:"flex justify-center space-x-4 w-[35rem] mx-auto",children:[i>0&&e.jsx(U,{className:"w-full",onClick:te,children:"Back"}),i===0&&e.jsx(U,{className:"w-full",onClick:G,children:"Cancel"}),i<v.length-1?e.jsx(R,{className:"w-full",onClick:ee,children:"Next"}):e.jsx(R,{className:"w-full",onClick:_,children:"Submit"})]});return e.jsxs("div",{className:`fade-in w-[90rem] h-[55rem] flex flex-col justify-between pt-[2rem] pb-[4rem] px-[6rem] ${H?"opacity-1":"opacity-0"}`,children:[e.jsx(pe,{currentStep:i,activeProject:m(a),selectedDetailTitle:Q}),e.jsxs("div",{children:[e.jsx("h2",{className:"text-[2rem] font-light text-slate-500 text-center mb-2",children:v[i].header}),e.jsx("p",{className:"text-center",children:v[i].description})]}),e.jsx("div",{className:"my-4",children:v[i].content}),e.jsx("div",{className:"h-[2rem]",children:$&&e.jsx("div",{className:"text-red-500 h-full text-center flex justify-center items-center my-auto text-lg font-bold py-2 ",children:$})}),le()]})};export{yt as default};
