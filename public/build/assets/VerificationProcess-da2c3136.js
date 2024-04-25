import{r as d,R as k,W as F,j as e}from"./app-8b83436b.js";import{S as q}from"./SecondaryButton-ae44dfd5.js";import z from"./PersonalInfo-ae18a3d1.js";import R from"./CompanyInfo-5174c0f0.js";import U from"./VerificationStep-37877f48.js";import{P as y}from"./PrimaryButton-83478115.js";import{S as u}from"./Skeleton-d73cf450.js";import"./index.es-ee268f83.js";import"./index-3b70e7e7.js";import"./Address-c975a121.js";import"./Tooltip-1f0ef08d.js";import"./toPropertyKey-39201a13.js";import"./useSlot-a2532144.js";import"./useIsFocusVisible-97f68d26.js";import"./useControlled-9031fbe1.js";import"./useEventCallback-96e4a742.js";import"./useEnhancedEffect-99238f73.js";import"./Popper-794acb7d.js";import"./UserName-733c8280.js";import"./Phone-63595ab8.js";function te({currentStep:n,setCurrentStep:i,setIsModalOpen:w}){const[g,x]=d.useState({first_name:!1,last_name:!1,phone_number:!1,street_address:!1,city:!1,state:!1,zip_code:!1}),[c,m]=d.useState(""),[p,j]=k.useState(!1),{data:f,setData:h,post:T,processing:S,errors:Y,reset:B}=F({password:"",password_confirmation:""}),[a,v]=d.useState({phoneNumber:"",name:{first_name:"",middle_initial:"",last_name:""},address:{street_address:"",city:"",state:"",zip_code:""}}),[_,N]=d.useState({company_name:"",ein_number:"",job_title:"",number_of_employees:"",referral:""}),b=s=>{v(t=>({...t,...s}))},o=(s,t)=>{const r=s.message||t;throw m(`Error: ${r}`),console.error(`Error: ${r}`),s},l=(s,t)=>{try{if(s&&s.data)if(s.data.success)m(""),t();else if(s.data.error)o(new Error(s.data.error),s.data.error);else throw new Error("Unexpected response structure");else throw new Error("Unexpected response structure")}catch(r){o(r,"Unexpected response structure")}},I=async()=>{j(!0);try{const s=await axios.post(route("verification.updatePassword"),{data:f});l(s,()=>{s.data.success&&i("verification")})}catch(s){o(s,"Error during verification")}},E=async()=>{const s={first_name:!a.name.first_name,last_name:!a.name.last_name};if(x(s),!Object.values(s).some(r=>r))try{const r={firstName:a.name.first_name,lastName:a.name.last_name,middleInitial:a.name.middle_initial,phoneNumber:a.phoneNumber,address:{streetAddress:a.address.street_address,city:a.address.city,state:a.address.state,zipCode:a.address.zip_code,latitude:a.address.latitude,longitude:a.address.longitude}},C=await axios.post(route("verification.personal.store"),r);l(C,()=>{i("companyInfo")})}catch(r){o(r,"Error saving personal information")}},P=async()=>{try{const s=await axios.post(route("verification.production.company.store"),_);l(s,()=>{i("completed"),w(!1),window.location.reload()})}catch(s){o(s,"Error during company info request")}};return e.jsxs("div",{className:"py-8 px-[4rem] w-full !max-w-[80rem] h-[45rem]",children:[n==="changePassword"&&e.jsxs("div",{className:"flex flex-row gap-8 h-full",children:[e.jsx("div",{className:"w-1/2 h-full flex flex-col justify-center",children:e.jsx("img",{className:"mx-auto max-w-[15rem]",src:"./images/svg_images/undraw_password.svg",alt:""})}),e.jsxs("div",{className:"w-1/2 my-auto h-full justify-center flex flex-col gap-6",children:[e.jsx("h2",{children:"Create a Password"}),e.jsx("p",{children:" Welcome to our platform! For your account security, we kindly request you to create a unique and strong password. Please proceed to set up your password to ensure a secure and personalized experience on our platform. Thank you for choosing us!"}),e.jsxs("div",{className:"flex flex-col gap-4",children:[e.jsxs("div",{className:"flex flex-col gap-2",children:[e.jsx("label",{htmlFor:"password",value:"password",className:"text-gray-400 text-sm",children:" Password * "}),p?e.jsx(u,{variant:"rectangular",sx:{height:"48px"}}):e.jsx("input",{type:"password",id:"password",name:"password",placeholder:"xxxxxxxxx",autoComplete:"new-password",value:f.password,onChange:s=>h("password",s.target.value),required:!0})]}),e.jsxs("div",{className:"flex flex-col gap-2",children:[e.jsx("label",{htmlFor:"password_confirmation",value:"password_confirmation",className:"text-gray-400 text-sm",children:" Confirm Password * "}),p?e.jsx(u,{variant:"rectangular",sx:{height:"48px"}}):e.jsx("input",{id:"password_confirmation",type:"password",name:"password_confirmation",placeholder:"xxxxxxxxx",autoComplete:"new-password",value:f.password_confirmation,onChange:s=>h("password_confirmation",s.target.value),required:!0})]}),c&&e.jsx("div",{style:{color:"red"},children:c})]}),p?e.jsx(u,{variant:"rectangular",sx:{height:"30px",borderRadius:"10px"}}):e.jsx(q,{onClick:I,children:"Update Password"})]})]}),n==="verification"&&e.jsx(U,{error:c,handleError:o,handleResponse:l,setError:m,setCurrentStep:i}),n==="personalInfo"&&e.jsxs("div",{className:"flex flex-row gap-8 h-full",children:[e.jsx("div",{className:"w-[30rem] h-full flex flex-col justify-center",children:e.jsx("img",{className:"mx-auto max-w-[20rem]",src:"/images/svg_images/undraw_personal_info.svg",alt:""})}),e.jsxs("div",{className:"w-1/2 py-6 px-6 my-auto h-full justify-center flex flex-col gap-6",children:[e.jsx("h2",{className:"text-2xl text-slate-500",children:"Tell us about yourself..."}),e.jsx("p",{children:"Please complete the personal information form by providing your first and last name, phone number, and address. Your details are important for us to enhance your experience and ensure accurate communication. Thank you for providing this information."}),e.jsx(z,{onUpdateInfo:b,emptyFields:g,setEmptyFields:x}),e.jsx(y,{onClick:E,children:"Next"})]})]}),n==="companyInfo"&&e.jsxs("div",{className:"flex flex-row gap-8 h-full",children:[e.jsx("div",{className:"w-1/2 h-full flex flex-col justify-center",children:e.jsx("img",{className:"mx-auto max-w-[20rem]",src:"./images/svg_images/undraw_logo_design.svg",alt:""})}),e.jsxs("div",{className:"w-1/2 my-auto h-full justify-center flex flex-col gap-6",children:[e.jsx("h2",{className:"text-2xl text-slate-500",children:"Your Company Info"}),e.jsx("p",{children:"Please complete the company information form by providing essential details about your organization. Your input helps us better tailor our services to your business needs and provide you with the best support. Thank you for sharing this information with us."}),e.jsx("span",{className:"text-sm font-semibold",children:"* If you enter a Company Name then the EIN Number and Job Title will be required"}),e.jsx("div",{className:"my-6",children:e.jsx(R,{onUpdateInfo:N})}),e.jsx(y,{onClick:P,children:"Complete Registration"})]})]})]})}export{te as default};
