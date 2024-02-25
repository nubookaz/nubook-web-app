import{r as t,j as e}from"./app-eefe6961.js";import{r as oe,i as ae}from"./createSvgIcon-dfa65f32.js";import{f as te,F as k}from"./FormControl-ce05194c.js";import{S as y}from"./Skeleton-35f5ec8d.js";import{_ as J,a as x}from"./toPropertyKey-a23e7eac.js";import{g as A,a as K,s as D,u as G,b as ne,c as Q,d as X,k as ie,e as le,f as ce,h as $}from"./useSlot-a85726b4.js";import{r as de}from"./styleUtils-8a36875c.js";import{T as me}from"./Typography-b234be5c.js";import{C as pe}from"./Checkbox-a60a1855.js";import{F as ge}from"./FormControlContext-3200095e.js";import{f as xe}from"./formLabelClasses-654454ad.js";import"./extendSxProp-d164df09.js";import"./createChainedFunction-0bab83cf.js";import"./debounce-517eeb3c.js";import"./isMuiElement-573e6873.js";import"./useEnhancedEffect-346992f7.js";import"./ownerWindow-09f9bd5f.js";import"./useIsFocusVisible-a86ea076.js";import"./useEventCallback-9096ac69.js";import"./createSvgIcon-55254c0b.js";import"./useSwitch-b2bda0e8.js";function ue(r){return A("MuiFormHelperText",r)}K("MuiFormHelperText",["root"]);const he=["children","component","slots","slotProps"],fe=()=>X({root:["root"]},ue,{}),ve=D("div",{name:"JoyFormHelperText",slot:"Root",overridesResolver:(r,o)=>o.root})(({theme:r})=>({"--Icon-fontSize":"calc(var(--FormHelperText-lineHeight) * 1em)",display:"flex",alignItems:"center",gap:"2px",fontFamily:r.vars.fontFamily.body,fontSize:`var(--FormHelperText-fontSize, ${r.vars.fontSize.sm})`,lineHeight:`var(--FormHelperText-lineHeight, ${r.vars.lineHeight.sm})`,color:`var(--FormHelperText-color, ${r.vars.palette.text.tertiary})`,margin:"var(--FormHelperText-margin, 0px)",[`.${xe.root} + &`]:{"--FormHelperText-margin":"0px"},[`.${te.error} &`]:{"--Icon-color":"currentColor"}})),Pe=t.forwardRef(function(o,a){const s=G({props:o,name:"JoyFormHelperText"}),{children:l,component:c,slots:m={},slotProps:v={}}=s,P=J(s,he),f=t.useRef(null),L=ne(f,a),n=t.useContext(ge),i=n==null?void 0:n.setHelperText;t.useEffect(()=>(i==null||i(f.current),()=>{i==null||i(null)}),[i]);const p=fe(),w=x({},P,{component:c,slots:m,slotProps:v}),[g,j]=Q("root",{ref:L,elementType:ve,externalForwardedProps:w,ownerState:s,additionalProps:{as:c,id:n==null?void 0:n["aria-describedby"]},className:p.root});return e.jsx(g,x({},j,{children:l}))}),T=Pe;var M={},Le=ae;Object.defineProperty(M,"__esModule",{value:!0});var _=M.default=void 0,we=Le(oe()),je=e;_=M.default=(0,we.default)((0,je.jsx)("path",{d:"M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8"}),"InfoOutlined");function Ce(r){return A("MuiLinearProgress",r)}K("MuiLinearProgress",["root","determinate","colorPrimary","colorNeutral","colorDanger","colorSuccess","colorWarning","colorContext","sizeSm","sizeMd","sizeLg","variantPlain","variantOutlined","variantSoft","variantSolid"]);const be=["children","className","component","color","size","variant","thickness","determinate","value","style","slots","slotProps"];let Y=r=>r,B,O;const ye=ie(B||(B=Y`
  0% {
    left: var(--_LinearProgress-progressInset);
    width: var(--LinearProgress-progressMinWidth);
  }

  25% {
    width: var(--LinearProgress-progressMaxWidth);
  }

  50% {
    left: var(--_LinearProgress-progressLeft);
    width: var(--LinearProgress-progressMinWidth);
  }

  75% {
    width: var(--LinearProgress-progressMaxWidth);
  }

  100% {
    left: var(--_LinearProgress-progressInset);
    width: var(--LinearProgress-progressMinWidth);
  }
`)),Te=r=>{const{determinate:o,color:a,variant:s,size:l}=r,c={root:["root",o&&"determinate",a&&`color${$(a)}`,s&&`variant${$(s)}`,l&&`size${$(l)}`]};return X(c,Ce,{})},_e=D("div",{name:"JoyLinearProgress",slot:"Root",overridesResolver:(r,o)=>o.root})(({ownerState:r,theme:o})=>{var a,s,l,c;return x({"--LinearProgress-radius":"var(--LinearProgress-thickness)","--LinearProgress-progressThickness":"var(--LinearProgress-thickness)","--LinearProgress-progressRadius":"max(var(--LinearProgress-radius) - var(--_LinearProgress-padding), min(var(--_LinearProgress-padding) / 2, var(--LinearProgress-radius) / 2))"},r.size==="sm"&&{"--LinearProgress-thickness":"4px"},r.size==="md"&&{"--LinearProgress-thickness":"6px"},r.size==="lg"&&{"--LinearProgress-thickness":"8px"},r.thickness&&{"--LinearProgress-thickness":`${r.thickness}px`},!r.determinate&&{"--LinearProgress-progressMinWidth":"calc(var(--LinearProgress-percent) * 1% / 2)","--LinearProgress-progressMaxWidth":"calc(var(--LinearProgress-percent) * 1%)","--_LinearProgress-progressLeft":"calc(100% - var(--LinearProgress-progressMinWidth) - var(--_LinearProgress-progressInset))","--_LinearProgress-progressInset":"calc(var(--LinearProgress-thickness) / 2 - var(--LinearProgress-progressThickness) / 2)"},{minBlockSize:"var(--LinearProgress-thickness)",boxSizing:"border-box",borderRadius:"var(--LinearProgress-radius)",display:"flex",justifyContent:"center",alignItems:"center",flex:1,padding:"var(--_LinearProgress-padding)",position:"relative"},(a=o.variants[r.variant])==null?void 0:a[r.color],{"--_LinearProgress-padding":"max((var(--LinearProgress-thickness) - 2 * var(--variant-borderWidth, 0px) - var(--LinearProgress-progressThickness)) / 2, 0px)","&::before":{content:'""',display:"block",boxSizing:"inherit",blockSize:"var(--LinearProgress-progressThickness)",borderRadius:"var(--LinearProgress-progressRadius)",backgroundColor:"currentColor",color:"inherit",position:"absolute"}},r.variant==="soft"&&{backgroundColor:o.variants.soft.neutral.backgroundColor,color:(s=o.variants.solid)==null?void 0:s[r.color].backgroundColor},r.variant==="solid"&&{backgroundColor:(l=o.variants.softHover)==null?void 0:l[r.color].backgroundColor,color:(c=o.variants.solid)==null?void 0:c[r.color].backgroundColor})},({ownerState:r})=>r.determinate?{"&::before":{left:"var(--_LinearProgress-padding)",inlineSize:"calc(var(--LinearProgress-percent) * 1% - 2 * var(--_LinearProgress-padding))"}}:le(O||(O=Y`
          &::before {
            animation: ${0}
              var(--LinearProgress-circulation, 2.5s ease-in-out 0s infinite normal none running);
          }
        `),ye),({ownerState:r,theme:o})=>{const{borderRadius:a,height:s}=de({theme:o,ownerState:r},["borderRadius","height"]);return x({},a!==void 0&&{"--LinearProgress-radius":a},s!==void 0&&{"--LinearProgress-thickness":s})}),ke=t.forwardRef(function(o,a){const s=G({props:o,name:"JoyLinearProgress"}),{children:l,className:c,component:m,color:v="primary",size:P="md",variant:f="soft",thickness:L,determinate:n=!1,value:i=n?0:25,style:p,slots:w={},slotProps:g={}}=s,j=J(s,be),C=x({},s,{component:m,color:v,size:P,variant:f,thickness:L,value:i,determinate:n,instanceSize:o.size}),H=Te(C),N=x({},j,{component:m,slots:w,slotProps:g}),[z,S]=Q("root",{ref:a,className:ce(H.root,c),elementType:_e,externalForwardedProps:N,ownerState:C,additionalProps:x({as:m,role:"progressbar",style:x({},{"--LinearProgress-percent":i},p)},typeof i=="number"&&n&&{"aria-valuenow":Math.round(i)})});return e.jsx(z,x({},S,{children:l}))}),U=ke;function Qe({showConsentError:r,formData:o,setFormData:a,errors:s,linkPrivacyPolicy:l,privacyPolicyHref:c,skeleton:m}){const{email:v,password:P,password_confirmation:f,consent:L}=o,[n,i]=t.useState(v),[p,w]=t.useState(P),[g,j]=t.useState(f),[C,H]=t.useState(L),[N,z]=t.useState(!1),[S,I]=t.useState(!1),[Z,W]=t.useState(!1),[ee,E]=t.useState(!1),u=6;t.useEffect(()=>{r&&E(!0)},[r]);const re=h=>{const d=h.target.value;w(d),a(b=>({...b,password:d})),F()||I(!1)},se=h=>{const d=h.target.value;j(d),a(b=>({...b,password_confirmation:d})),R()||W(!1)},V=()=>N&&(n.trim()===""||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(n)),F=()=>S&&(p.trim()===""||p.length<u),R=()=>Z&&(g.trim()===""||g.length<u||p!==g),q=()=>ee&&!C;return e.jsxs("div",{className:"flex flex-col gap-2",children:[e.jsxs("div",{className:"flex flex-col gap-2 h-full",spacing:.5,sx:{"--hue":Math.min(n.length*10,120)},children:[e.jsxs(k,{error:V(),className:"flex flex-col gap-2",children:[e.jsx("label",{htmlFor:"email",value:"email",className:"text-gray-400 text-sm",children:" Email Address * "}),m?e.jsx(y,{variant:"rectangular",sx:{height:"46px",marginBottom:".5rem"}}):e.jsx("input",{id:"email",type:"email",name:"email",placeholder:"indy@indianjones.com",onChange:h=>{i(h.target.value),a(d=>({...d,email:h.target.value}))},onBlur:()=>z(!0),value:n,required:!0})]}),e.jsxs(k,{error:F(),className:"flex flex-col gap-2",children:[e.jsx("label",{htmlFor:"password",value:"password",className:"text-gray-400 text-sm",children:" Password * "}),m?e.jsx(y,{variant:"rectangular",sx:{height:"46px",marginBottom:".5rem"}}):e.jsxs(e.Fragment,{children:[e.jsx("input",{id:"password",type:"password",name:"password",placeholder:"Password",autoComplete:"new-password",className:"-mb-[.15rem]",onChange:re,value:p,required:!0,onBlur:()=>I(!0)}),e.jsx(U,{determinate:!0,size:"sm",className:"mx-1",value:Math.min(p.length/u*100,100),sx:{background:"transparent",color:p.length>=u?"green":"red"}})]})]}),e.jsxs(k,{error:R(),className:"flex flex-col gap-2",children:[e.jsx("label",{htmlFor:"password_confirmation",value:"password_confirmation",className:"text-gray-400 text-sm",children:" Confirm Password * "}),m?e.jsx(y,{variant:"rectangular",sx:{height:"46px",marginBottom:".5rem"}}):e.jsxs(e.Fragment,{children:[e.jsx("input",{id:"password_confirmation",type:"password",name:"password_confirmation",placeholder:"Password Confirmation",autoComplete:"new-password",className:"-mb-[.15rem]",onChange:se,value:g,required:!0,onBlur:()=>W(!0)}),e.jsx(U,{determinate:!0,size:"sm",className:"mx-1",value:Math.min(g.length/u*100,100),sx:{background:"transparent",color:g.length>=u?"green":"red"}})]})]}),e.jsx(k,{size:"sm",error:q(),className:"flex flex-col mt-4",children:m?e.jsxs("div",{className:"flex flex-row gap-2",children:[e.jsx(y,{variant:"rectangular",sx:{height:"18px",width:"22px"}}),e.jsx(me,{fontSize:".80rem",children:e.jsx(y,{children:"I agree to the collection and use of my geolocation data for personalizing content"})})]}):e.jsxs(e.Fragment,{children:[e.jsx(pe,{color:"primary",checked:C||!1,size:"sm",required:!0,label:"I agree to the collection and use of my geolocation data for personalizing content",onChange:h=>{const d=h.target.checked;H(d),a(b=>({...b,consent:d})),E(!d)},sx:{fontSize:".80rem",color:"text-slate-50"}}),e.jsx(T,{children:e.jsxs("span",{className:"font-bold primary-color mt-1",children:["Read our ",e.jsx("a",{className:"cursor-pointer",href:c,onClick:l,children:"privacy policy"}),"."]})})]})})]}),e.jsxs("div",{className:"flex flex-col gap-2 mt-4",children:[(s.email||s.password||s.consent)&&e.jsx("div",{className:"errors text-center p-4 bg-red-50 rounded-xl",style:{color:"red"},children:e.jsxs("p",{children:[s.email&&e.jsxs("span",{className:"text-red-600 text-xs font-bold",children:[s.email," "]}),s.password&&e.jsxs("span",{className:"text-red-600 text-xs font-bold",children:[s.password," "]}),s.consent&&e.jsx("span",{className:"text-red-600 text-xs font-bold",children:s.consent})]})}),V()&&e.jsxs(T,{className:"!text-red-600 !text-xs font-bold",children:[e.jsx(_,{className:"mr-2"})," Opps! Please enter a valid email."]}),F()&&e.jsxs(T,{className:"!text-red-600 !text-xs font-bold",children:[e.jsx(_,{className:"mr-2"})," Oops! Password must be at least ",u," characters."]}),R()&&e.jsxs(T,{className:"!text-red-600 !text-xs font-bold",children:[e.jsx(_,{className:"mr-2"})," Oops! Password confirmation must match the password and be at least ",u," characters."]}),q()&&e.jsxs(T,{className:"!text-red-600 !text-xs font-bold",children:[e.jsx(_,{className:"mr-2"}),"Please agree to the privacy policy to proceed."]})]})]})}export{Qe as default};
