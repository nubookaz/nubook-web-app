import{j as t,r as p}from"./app-659a3aa2.js";import{r as jo,i as Go}from"./createSvgIcon-3cc30708.js";import{B as Vo}from"./Box-d2e1cd8f.js";import{a as s,_ as Q}from"./toPropertyKey-61b1ecea.js";import{a as X,g as Z,s as x,u as w,c as y,h as _,d as oo,f as To}from"./useSlot-d43794ee.js";import{R as eo}from"./RadioGroupContext-96bab4a2.js";import{F as B}from"./FormControlContext-dd3b9a17.js";import{u as No}from"./useControlled-adcd3c46.js";import{a as ao}from"./useIsFocusVisible-7ca602c7.js";import{C as Fo}from"./Chip-a964b04e.js";import{a as Do}from"./Typography-4dbb1ff2.js";import{u as Mo}from"./useSwitch-631d032d.js";import"./extendSxProp-9e510b8c.js";import"./ownerWindow-2a12221f.js";import"./useEnhancedEffect-12b0a06e.js";import"./isMuiElement-3bff42a8.js";import"./useEventCallback-0c2e09c7.js";import"./variantColorInheritance-f8d1dad2.js";import"./styleUtils-0df93871.js";var Y={},Wo=Go;Object.defineProperty(Y,"__esModule",{value:!0});var ro=Y.default=void 0,Eo=Wo(jo()),Jo=t;ro=Y.default=(0,Eo.default)((0,Jo.jsx)("path",{d:"M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"}),"Check");function qo(e){return Z("MuiRadio",e)}const Ao=X("MuiRadio",["root","radio","icon","action","input","label","checked","disabled","focusVisible","colorPrimary","colorDanger","colorNeutral","colorSuccess","colorWarning","colorContext","sizeSm","sizeMd","sizeLg","variantOutlined","variantSoft","variantSolid"]),V=Ao,Lo=["checked","checkedIcon","defaultChecked","disabled","disableIcon","overlay","label","id","name","onBlur","onChange","onFocus","onFocusVisible","readOnly","required","color","variant","size","uncheckedIcon","value","component","slots","slotProps"],Ho=e=>{const{checked:o,disabled:i,disableIcon:a,focusVisible:r,color:l,variant:c,size:u}=e,h={root:["root",o&&"checked",i&&"disabled",r&&"focusVisible",c&&`variant${_(c)}`,l&&`color${_(l)}`,u&&`size${_(u)}`],radio:["radio",o&&"checked",i&&"disabled"],icon:["icon"],action:["action",o&&"checked",a&&i&&"disabled",r&&"focusVisible"],input:["input"],label:["label"]};return oo(h,qo,{})};function Oo(e,o){return typeof o=="object"&&o!==null?e===o:String(e)===String(o)}const So=x("span",{name:"JoyRadio",slot:"Root",overridesResolver:(e,o)=>o.root})(({ownerState:e,theme:o})=>{var i,a,r;return[s({"--Icon-fontSize":"var(--Radio-size)","--Icon-color":"currentColor"},e.size==="sm"&&{"--Radio-size":"1rem","& ~ *":{"--FormHelperText-margin":"0 0 0 1.5rem"},fontSize:o.vars.fontSize.sm,gap:"var(--Radio-gap, 0.5rem)"},e.size==="md"&&{"--Radio-size":"1.25rem","& ~ *":{"--FormHelperText-margin":"0.25rem 0 0 1.875rem"},fontSize:o.vars.fontSize.md,gap:"var(--Radio-gap, 0.625rem)"},e.size==="lg"&&{"--Radio-size":"1.5rem","& ~ *":{"--FormHelperText-margin":"0.375rem 0 0 2.25rem"},fontSize:o.vars.fontSize.lg,gap:"var(--Radio-gap, 0.75rem)"},{position:e.overlay?"initial":"relative",display:"inline-flex",boxSizing:"border-box",minWidth:0,fontFamily:o.vars.fontFamily.body,lineHeight:"var(--Radio-size)",color:o.vars.palette.text.primary,[`&.${V.disabled}`]:{color:(i=o.variants.plainDisabled)==null||(i=i[e.color])==null?void 0:i.color}},e.disableIcon&&{color:(a=o.variants[e.variant])==null||(a=a[e.color])==null?void 0:a.color,[`&.${V.disabled}`]:{color:(r=o.variants[`${e.variant}Disabled`])==null||(r=r[e.color])==null?void 0:r.color}},e["data-parent"]==="RadioGroup"&&e["data-first-child"]===void 0&&{marginInlineStart:e.orientation==="horizontal"?"var(--RadioGroup-gap)":void 0,marginBlockStart:e.orientation==="horizontal"?void 0:"var(--RadioGroup-gap)"})]}),Uo=x("span",{name:"JoyRadio",slot:"Radio",overridesResolver:(e,o)=>o.radio})(({ownerState:e,theme:o})=>{var i,a,r,l,c;const u=(i=o.variants[`${e.variant}`])==null?void 0:i[e.color];return[s({"--Icon-color":e.color!=="neutral"||e.variant==="solid"?"currentColor":o.vars.palette.text.icon,margin:0,boxSizing:"border-box",width:"var(--Radio-size)",height:"var(--Radio-size)",borderRadius:"var(--Radio-size)",display:"inline-flex",justifyContent:"center",alignItems:"center",flexShrink:0},e.disableIcon&&{display:"contents"},{[`&.${V.checked}`]:{"--Icon-color":"currentColor"}}),...e.disableIcon?[]:[s({},u,{backgroundColor:(a=u==null?void 0:u.backgroundColor)!=null?a:o.vars.palette.background.surface}),{"&:hover":{"@media (hover: hover)":(r=o.variants[`${e.variant}Hover`])==null?void 0:r[e.color]}},{"&:active":(l=o.variants[`${e.variant}Active`])==null?void 0:l[e.color]},{[`&.${V.disabled}`]:(c=o.variants[`${e.variant}Disabled`])==null?void 0:c[e.color]}]]}),Bo=x("span",{name:"JoyRadio",slot:"Action",overridesResolver:(e,o)=>o.action})(({theme:e,ownerState:o})=>{var i,a,r,l;return[{position:"absolute",textAlign:"left",borderRadius:`var(--Radio-actionRadius, ${o.overlay?"var(--unstable_actionRadius, inherit)":"inherit"})`,top:"calc(-1 * var(--variant-borderWidth, 0px))",left:"calc(-1 * var(--variant-borderWidth, 0px))",bottom:"calc(-1 * var(--variant-borderWidth, 0px))",right:"calc(-1 * var(--variant-borderWidth, 0px))",zIndex:1,[e.focus.selector]:e.focus.default},...o.disableIcon?[(i=e.variants[o.variant])==null?void 0:i[o.color],{"&:hover":{"@media (hover: hover)":(a=e.variants[`${o.variant}Hover`])==null?void 0:a[o.color]}},{"&:active":(r=e.variants[`${o.variant}Active`])==null?void 0:r[o.color]},{[`&.${V.disabled}`]:(l=e.variants[`${o.variant}Disabled`])==null?void 0:l[o.color]}]:[]]}),Yo=x("input",{name:"JoyRadio",slot:"Input",overridesResolver:(e,o)=>o.input})(()=>({margin:0,opacity:0,position:"absolute",height:"100%",width:"100%",cursor:"pointer"})),Ko=x("label",{name:"JoyRadio",slot:"Label",overridesResolver:(e,o)=>o.label})(({ownerState:e})=>s({flex:1,minWidth:0},e.disableIcon&&{zIndex:1,pointerEvents:"none"})),Qo=x("span",{name:"JoyRadio",slot:"Icon",overridesResolver:(e,o)=>o.icon})(({ownerState:e})=>({width:"calc(var(--Radio-size) / 2)",height:"calc(var(--Radio-size) / 2)",borderRadius:"inherit",color:"inherit",backgroundColor:"currentColor",transform:e.checked?"scale(1)":"scale(0)"})),Xo=p.forwardRef(function(o,i){var a,r,l,c,u,h,z;const f=w({props:o,name:"JoyRadio"}),{checked:v,checkedIcon:m,defaultChecked:A,disabled:L,disableIcon:H=!1,overlay:I=!1,label:P,id:T,name:O,onBlur:S,onChange:N,onFocus:F,onFocusVisible:b,readOnly:k,required:j,color:D,variant:M="outlined",size:U="md",uncheckedIcon:W,value:G,component:R,slots:E={},slotProps:io={}}=f,lo=Q(f,Lo),n=p.useContext(B),K=ao(T??(n==null?void 0:n.htmlFor)),d=p.useContext(eo),no=n!=null&&n.error?"danger":(a=(r=(l=o.color)!=null?l:n==null?void 0:n.color)!=null?r:D)!=null?a:"primary",so=n!=null&&n.error?"danger":(c=(u=(h=o.color)!=null?h:n==null?void 0:n.color)!=null?u:D)!=null?c:"neutral",to=o.size||(n==null?void 0:n.size)||(d==null?void 0:d.size)||U,co=o.name||(d==null?void 0:d.name)||O,J=o.disableIcon||(d==null?void 0:d.disableIcon)||H,uo=o.overlay||(d==null?void 0:d.overlay)||I,vo={checked:typeof v>"u"&&G!=null?Oo(d==null?void 0:d.value,G):v,defaultChecked:A,disabled:o.disabled||(n==null?void 0:n.disabled)||L,onBlur:S,onChange:N,onFocus:F,onFocusVisible:b},{getInputProps:po,checked:q,disabled:mo,focusVisible:bo}=Mo(vo),fo=(z=o.color)!=null?z:q?no:so,g=s({},f,{checked:q,disabled:mo,focusVisible:bo,color:fo,variant:M,size:to,disableIcon:J,overlay:uo,orientation:d==null?void 0:d.orientation}),C=Ho(g),$=s({},lo,{component:R,slots:E,slotProps:io}),[Ro,ho]=y("root",{ref:i,className:C.root,elementType:So,externalForwardedProps:$,ownerState:g}),[go,yo]=y("radio",{className:C.radio,elementType:Uo,externalForwardedProps:$,ownerState:g}),[xo,zo]=y("icon",{className:C.icon,elementType:Qo,externalForwardedProps:$,ownerState:g}),[Co,$o]=y("action",{className:C.action,elementType:Bo,externalForwardedProps:$,ownerState:g}),[_o,Io]=y("input",{additionalProps:{type:"radio",role:void 0,id:K,name:co,readOnly:k,required:j??(n==null?void 0:n.required),value:String(G),"aria-describedby":n==null?void 0:n["aria-describedby"]},className:C.input,elementType:Yo,externalForwardedProps:$,getSlotProps:()=>po({onChange:d==null?void 0:d.onChange}),ownerState:g}),[Po,ko]=y("label",{additionalProps:{htmlFor:K},className:C.label,elementType:Ko,externalForwardedProps:$,ownerState:g});return t.jsxs(Ro,s({},ho,{children:[t.jsxs(go,s({},yo,{children:[q&&!J&&m,!q&&!J&&W,!m&&!W&&!J&&t.jsx(xo,s({},zo)),t.jsx(Co,s({},$o,{children:t.jsx(_o,s({},Io))}))]})),P&&t.jsx(Po,s({},ko,{children:t.jsx(Do.Provider,{value:!0,children:P})}))]}))}),Zo=Xo;function wo(e){return Z("MuiRadioGroup",e)}X("MuiRadioGroup",["root","colorPrimary","colorNeutral","colorDanger","colorSuccess","colorWarning","variantPlain","variantOutlined","variantSoft","variantSolid","sizeSm","sizeMd","sizeLg","horizontal","vertical"]);const oe=["className","component","children","name","defaultValue","disableIcon","overlay","value","onChange","color","variant","size","orientation","role","slots","slotProps"],ee=e=>{const{orientation:o,size:i,variant:a,color:r}=e,l={root:["root",o,a&&`variant${_(a)}`,r&&`color${_(r)}`,i&&`size${_(i)}`]};return oo(l,wo,{})},ae=x("div",{name:"JoyRadioGroup",slot:"Root",overridesResolver:(e,o)=>o.root})(({ownerState:e,theme:o})=>{var i;return s({},e.size==="sm"&&{"--RadioGroup-gap":"0.625rem"},e.size==="md"&&{"--RadioGroup-gap":"0.875rem"},e.size==="lg"&&{"--RadioGroup-gap":"1.25rem"},{display:"flex",margin:"var(--unstable_RadioGroup-margin)",flexDirection:e.orientation==="horizontal"?"row":"column",borderRadius:o.vars.radius.sm},(i=o.variants[e.variant])==null?void 0:i[e.color])}),re=p.forwardRef(function(o,i){const a=w({props:o,name:"JoyRadioGroup"}),{className:r,component:l,children:c,name:u,defaultValue:h,disableIcon:z=!1,overlay:f,value:v,onChange:m,color:A="neutral",variant:L="plain",size:H="md",orientation:I="vertical",role:P="radiogroup",slots:T={},slotProps:O={}}=a,S=Q(a,oe),[N,F]=No({controlled:v,default:h,name:"RadioGroup"}),b=p.useContext(B),k=o.size||(b==null?void 0:b.size)||H,j=s({orientation:I,size:k,variant:L,color:A,role:P},a),D=ee(j),M=ao(u),U=p.useMemo(()=>({disableIcon:z,overlay:f,orientation:I,size:k,name:M,value:N,onChange:R=>{F(R.target.value),m&&m(R)}}),[z,M,m,f,I,F,k,N]),[W,G]=y("root",{ref:i,className:To(D.root,r),elementType:ae,externalForwardedProps:s({},S,{component:l,slots:T,slotProps:O}),ownerState:j,additionalProps:{as:l,role:P,id:b==null?void 0:b.htmlFor,"aria-labelledby":b==null?void 0:b.labelId,"aria-describedby":b==null?void 0:b["aria-describedby"]}});return t.jsx(eo.Provider,{value:U,children:t.jsx(W,s({},G,{children:t.jsx(B.Provider,{value:void 0,children:p.Children.map(c,(R,E)=>p.isValidElement(R)?p.cloneElement(R,s({},E===0&&{"data-first-child":""},E===p.Children.count(c)-1&&{"data-last-child":""},{"data-parent":"RadioGroup"})):R)})}))})}),ie=re;function _e({boxClassName:e,onRatingChange:o,name:i,data:a}){const[r,l]=p.useState(a.viewer_rating||""),c=a.project_type;p.useEffect(()=>{a.viewer_rating!==r&&l(a.viewer_rating)},[a.viewer_rating,r]);const u=v=>{const m=v.target.value;l(m),o&&o(m)},f=c==="TV Show"?["TV-Y","TV-Y7","TV-G","TV-PG","TV-14","TV-MA"]:["G","PG","PG-13","R","NC-17","Not Rated"];return t.jsx(Vo,{sx:{display:"flex",gap:1,alignItems:"center"},className:e,children:t.jsx(ie,{name:i,"aria-labelledby":"viewer_rating",value:r,onChange:u,orientation:"horizontal",sx:{flexWrap:"wrap",gap:1},children:f.map((v,m)=>t.jsx(Fo,{variant:"plain",color:r===v?"primary":"neutral",className:r===v?"!bg-emerald-200":"",startDecorator:r===v&&t.jsx(ro,{className:"!text-emerald-500",sx:{zIndex:1,pointerEvents:"none"}}),children:t.jsx(Zo,{id:`viewer_rating_${m}`,value:v,disableIcon:!0,overlay:!0,label:v,sx:{fontSize:".75rem",color:"rgba(0,0,0,.5)"}})},v))})})}export{_e as default};
