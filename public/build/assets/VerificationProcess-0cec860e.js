import{u as F,r as n,R as U,W as q,j as e}from"./app-eefe6961.js";import{S as z}from"./SecondaryButton-70a47f80.js";import R from"./PersonalInfo-34ecd222.js";import T from"./CompanyInfo-dbe97dc0.js";import S from"./VerificationStep-0fa84667.js";import{P as w}from"./PrimaryButton-7fd1b638.js";import{S as u}from"./Skeleton-35f5ec8d.js";import"./index.es-6f9cfa5f.js";import"./index-d5199ec3.js";import"./Address-9a2ab9e4.js";import"./Tooltip-6de05098.js";import"./toPropertyKey-a23e7eac.js";import"./useSlot-a85726b4.js";import"./useIsFocusVisible-a86ea076.js";import"./useEventCallback-9096ac69.js";import"./useEnhancedEffect-346992f7.js";import"./Popper-e61842d4.js";import"./UserName-76c3168f.js";import"./Phone-25a8577d.js";function ie({currentStep:i,setCurrentStep:l,setIsModalOpen:g}){const{user:D,fetchUserData:x}=F();n.useEffect(()=>{x()},[]);const[j,h]=n.useState({first_name:!1,last_name:!1,phone_number:!1,street_address:!1,city:!1,state:!1,zip_code:!1}),[d,m]=n.useState(""),[p,v]=U.useState(!1),{data:f,setData:y,post:Y,processing:A,errors:B,reset:L}=q({password:"",password_confirmation:""}),[a,_]=n.useState({phoneNumber:"",name:{first_name:"",middle_initial:"",last_name:""},address:{street_address:"",city:"",state:"",zip_code:""}}),[N,b]=n.useState({company_name:"",ein_number:"",job_title:"",number_of_employees:"",referral:""}),I=s=>{_(t=>({...t,...s}))},o=(s,t)=>{const r=s.message||t;throw m(`Error: ${r}`),console.error(`Error: ${r}`),s},c=(s,t)=>{try{if(s&&s.data)if(s.data.success)m(""),t();else if(s.data.error)o(new Error(s.data.error),s.data.error);else throw new Error("Unexpected response structure");else throw new Error("Unexpected response structure")}catch(r){o(r,"Unexpected response structure")}},E=async()=>{v(!0);try{const s=await axios.post(route("verification.updatePassword"),{data:f});c(s,()=>{s.data.success&&(l("verification"),console.log("response",s.data),x())})}catch(s){o(s,"Error during verification")}},P=async()=>{const s={first_name:!a.name.first_name,last_name:!a.name.last_name};if(h(s),!Object.values(s).some(r=>r))try{const r={firstName:a.name.first_name,lastName:a.name.last_name,middleInitial:a.name.middle_initial,phoneNumber:a.phoneNumber,address:{streetAddress:a.address.street_address,city:a.address.city,state:a.address.state,zipCode:a.address.zip_code,latitude:a.address.latitude,longitude:a.address.longitude}},k=await axios.post(route("verification.personal.store"),r);c(k,()=>{l("companyInfo")})}catch(r){o(r,"Error saving personal information")}},C=async()=>{try{const s=await axios.post(route("verification.production.company.store"),N);c(s,()=>{l("completed"),g(!1),window.location.reload()})}catch(s){o(s,"Error during company info request")}};return e.jsxs("div",{className:"p-8 w-full !max-w-[80rem] h-[45rem]",children:[i==="changePassword"&&e.jsxs("div",{className:"flex flex-row gap-8 h-full",children:[e.jsx("div",{className:"w-1/2 h-full flex flex-col justify-center",children:e.jsx("img",{className:"mx-auto max-w-[15rem]",src:"./images/svg_images/undraw_password.svg",alt:""})}),e.jsxs("div",{className:"w-1/2 my-auto h-full justify-center flex flex-col gap-6",children:[e.jsx("h2",{children:"Create a Password"}),e.jsx("p",{children:"Welcome to our platform! For your account security, we kindly request you to create a unique and strong password. Please proceed to set up your password to ensure a secure and personalized experience on our platform. Thank you for choosing us!"}),e.jsxs("div",{className:"flex flex-col gap-4",children:[e.jsxs("div",{className:"flex flex-col gap-2",children:[e.jsx("label",{htmlFor:"password",value:"password",className:"text-gray-400 text-sm",children:" Password * "}),p?e.jsx(u,{variant:"rectangular",sx:{height:"48px"}}):e.jsx("input",{type:"password",id:"password",name:"password",placeholder:"xxxxxxxxx",autoComplete:"new-password",value:f.password,onChange:s=>y("password",s.target.value),required:!0})]}),e.jsxs("div",{className:"flex flex-col gap-2",children:[e.jsx("label",{htmlFor:"password_confirmation",value:"password_confirmation",className:"text-gray-400 text-sm",children:" Confirm Password * "}),p?e.jsx(u,{variant:"rectangular",sx:{height:"48px"}}):e.jsx("input",{id:"password_confirmation",type:"password",name:"password_confirmation",placeholder:"xxxxxxxxx",autoComplete:"new-password",value:f.password_confirmation,onChange:s=>y("password_confirmation",s.target.value),required:!0})]}),d&&e.jsx("div",{style:{color:"red"},children:d})]}),p?e.jsx(u,{variant:"rectangular",sx:{height:"30px",borderRadius:"10px"}}):e.jsx(z,{onClick:E,children:"Update Password"})]})]}),i==="verification"&&e.jsx(S,{error:d,handleError:o,handleResponse:c,setError:m,setCurrentStep:l}),i==="personalInfo"&&e.jsxs("div",{className:"flex flex-row gap-8 h-full",children:[e.jsx("div",{className:"w-[30rem] h-full flex flex-col justify-center",children:e.jsx("img",{className:"mx-auto max-w-[20rem]",src:"/images/svg_images/undraw_personal_info.svg",alt:""})}),e.jsxs("div",{className:"w-1/2 py-6 px-6 my-auto h-full justify-center flex flex-col gap-6",children:[e.jsx("h2",{className:"text-2xl text-slate-500",children:"Tell us about yourself..."}),e.jsx("p",{children:"Please complete the personal information form by providing your first and last name, phone number, and address. Your details are important for us to enhance your experience and ensure accurate communication. Thank you for providing this information."}),e.jsx(R,{onUpdateInfo:I,emptyFields:j,setEmptyFields:h}),e.jsx(w,{onClick:P,children:"Next"})]})]}),i==="companyInfo"&&e.jsxs("div",{className:"flex flex-row gap-8 h-full",children:[e.jsx("div",{className:"w-1/2 h-full flex flex-col justify-center",children:e.jsx("img",{className:"mx-auto max-w-[20rem]",src:"./images/svg_images/undraw_logo_design.svg",alt:""})}),e.jsxs("div",{className:"w-1/2 my-auto h-full justify-center flex flex-col gap-6",children:[e.jsx("h2",{className:"text-2xl text-slate-500",children:"Your Company Info"}),e.jsx("p",{children:"Please complete the company information form by providing essential details about your organization. Your input helps us better tailor our services to your business needs and provide you with the best support. Thank you for sharing this information with us."}),e.jsx("span",{className:"text-sm font-semibold",children:"* If you enter a Company Name then the EIN Number and Job Title will be required"}),e.jsx("div",{className:"my-6",children:e.jsx(T,{onUpdateInfo:b})}),e.jsx(w,{onClick:C,children:"Complete Registration"})]})]})]})}export{ie as default};