import{a as t,_ as Q}from"./toPropertyKey-a23e7eac.js";import{r as X,j as g}from"./app-eefe6961.js";import{a as Y,g as Z,s as l,u as rr,c as h,h as f,d as or}from"./useSlot-a85726b4.js";import{u as tr}from"./useForwardedInput-a4d3e062.js";import{I as nr}from"./colorInversionUtils-4d37075b.js";function ar(o){return Z("MuiInput",o)}const er=Y("MuiInput",["root","input","formControl","focused","disabled","error","adornedStart","adornedEnd","colorPrimary","colorNeutral","colorDanger","colorSuccess","colorWarning","colorContext","sizeSm","sizeMd","sizeLg","variantPlain","variantOutlined","variantSoft","variantSolid","fullWidth","startDecorator","endDecorator"]),D=er,ir=["propsToForward","rootStateClasses","inputStateClasses","getRootProps","getInputProps","formControl","focused","error","disabled","fullWidth","size","color","variant","startDecorator","endDecorator","component","slots","slotProps"],lr=o=>{const{disabled:r,fullWidth:d,variant:a,color:e,size:i}=o,s={root:["root",r&&"disabled",d&&"fullWidth",a&&`variant${f(a)}`,e&&`color${f(e)}`,i&&`size${f(i)}`],input:["input"],startDecorator:["startDecorator"],endDecorator:["endDecorator"]};return or(s,ar,{})},sr=l("div")(({theme:o,ownerState:r})=>{var d,a,e,i,s,c;const p=(d=o.variants[`${r.variant}`])==null?void 0:d[r.color];return[t({"--Input-radius":o.vars.radius.sm,"--Input-gap":"0.5rem","--Input-placeholderColor":"inherit","--Input-placeholderOpacity":.64,"--Input-decoratorColor":o.vars.palette.text.icon,"--Input-focused":"0","--Input-focusedThickness":o.vars.focus.thickness,"--Input-focusedHighlight":(a=o.vars.palette[r.color==="neutral"?"primary":r.color])==null?void 0:a[500],[`&:not([${nr}])`]:t({},r.instanceColor&&{"--_Input-focusedHighlight":(e=o.vars.palette[r.instanceColor==="neutral"?"primary":r.instanceColor])==null?void 0:e[500]},{"--Input-focusedHighlight":`var(--_Input-focusedHighlight, ${o.vars.palette.focusVisible})`})},r.size==="sm"&&{"--Input-minHeight":"2rem","--Input-paddingInline":"0.5rem","--Input-decoratorChildHeight":"min(1.5rem, var(--Input-minHeight))","--Icon-fontSize":o.vars.fontSize.xl},r.size==="md"&&{"--Input-minHeight":"2.25rem","--Input-paddingInline":"0.75rem","--Input-decoratorChildHeight":"min(1.75rem, var(--Input-minHeight))","--Icon-fontSize":o.vars.fontSize.xl2},r.size==="lg"&&{"--Input-minHeight":"2.75rem","--Input-paddingInline":"1rem","--Input-gap":"0.75rem","--Input-decoratorChildHeight":"min(2.25rem, var(--Input-minHeight))","--Icon-fontSize":o.vars.fontSize.xl2},{"--Input-decoratorChildOffset":"min(calc(var(--Input-paddingInline) - (var(--Input-minHeight) - 2 * var(--variant-borderWidth, 0px) - var(--Input-decoratorChildHeight)) / 2), var(--Input-paddingInline))","--_Input-paddingBlock":"max((var(--Input-minHeight) - 2 * var(--variant-borderWidth, 0px) - var(--Input-decoratorChildHeight)) / 2, 0px)","--Input-decoratorChildRadius":"max(var(--Input-radius) - var(--variant-borderWidth, 0px) - var(--_Input-paddingBlock), min(var(--_Input-paddingBlock) + var(--variant-borderWidth, 0px), var(--Input-radius) / 2))","--Button-minHeight":"var(--Input-decoratorChildHeight)","--Button-paddingBlock":"0px","--IconButton-size":"var(--Input-decoratorChildHeight)","--Button-radius":"var(--Input-decoratorChildRadius)","--IconButton-radius":"var(--Input-decoratorChildRadius)",boxSizing:"border-box"},r.variant!=="plain"&&{boxShadow:o.shadow.xs},{minWidth:0,minHeight:"var(--Input-minHeight)"},r.fullWidth&&{width:"100%"},{cursor:"text",position:"relative",display:"flex",paddingInline:"var(--Input-paddingInline)",borderRadius:"var(--Input-radius)"},o.typography[`body-${r.size}`],p,{backgroundColor:(i=p==null?void 0:p.backgroundColor)!=null?i:o.vars.palette.background.surface,"&::before":{boxSizing:"border-box",content:'""',display:"block",position:"absolute",pointerEvents:"none",top:0,left:0,right:0,bottom:0,zIndex:1,borderRadius:"inherit",margin:"calc(var(--variant-borderWidth, 0px) * -1)",boxShadow:"var(--Input-focusedInset, inset) 0 0 0 calc(var(--Input-focused) * var(--Input-focusedThickness)) var(--Input-focusedHighlight)"}}),{"&:hover":t({},(s=o.variants[`${r.variant}Hover`])==null?void 0:s[r.color],{backgroundColor:null}),[`&.${D.disabled}`]:(c=o.variants[`${r.variant}Disabled`])==null?void 0:c[r.color],"&:focus-within::before":{"--Input-focused":"1"}}]}),dr=l("input")(({ownerState:o})=>({border:"none",minWidth:0,outline:0,padding:0,flex:1,color:"inherit",backgroundColor:"transparent",fontFamily:"inherit",fontSize:"inherit",fontStyle:"inherit",fontWeight:"inherit",lineHeight:"inherit",textOverflow:"ellipsis","&:-webkit-autofill":t({paddingInline:"var(--Input-paddingInline)"},!o.startDecorator&&{marginInlineStart:"calc(-1 * var(--Input-paddingInline))",paddingInlineStart:"var(--Input-paddingInline)",borderTopLeftRadius:"calc(var(--Input-radius) - var(--variant-borderWidth, 0px))",borderBottomLeftRadius:"calc(var(--Input-radius) - var(--variant-borderWidth, 0px))"},!o.endDecorator&&{marginInlineEnd:"calc(-1 * var(--Input-paddingInline))",paddingInlineEnd:"var(--Input-paddingInline)",borderTopRightRadius:"calc(var(--Input-radius) - var(--variant-borderWidth, 0px))",borderBottomRightRadius:"calc(var(--Input-radius) - var(--variant-borderWidth, 0px))"}),"&::-webkit-input-placeholder":{color:"var(--Input-placeholderColor)",opacity:"var(--Input-placeholderOpacity)"},"&::-moz-placeholder":{color:"var(--Input-placeholderColor)",opacity:"var(--Input-placeholderOpacity)"},"&:-ms-input-placeholder":{color:"var(--Input-placeholderColor)",opacity:"var(--Input-placeholderOpacity)"},"&::-ms-input-placeholder":{color:"var(--Input-placeholderColor)",opacity:"var(--Input-placeholderOpacity)"}})),pr=l("div")({"--Button-margin":"0 0 0 calc(var(--Input-decoratorChildOffset) * -1)","--IconButton-margin":"0 0 0 calc(var(--Input-decoratorChildOffset) * -1)","--Icon-margin":"0 0 0 calc(var(--Input-paddingInline) / -4)",display:"inherit",alignItems:"center",paddingBlock:"var(--unstable_InputPaddingBlock)",flexWrap:"wrap",marginInlineEnd:"var(--Input-gap)",color:"var(--Input-decoratorColor)",cursor:"initial"}),cr=l("div")({"--Button-margin":"0 calc(var(--Input-decoratorChildOffset) * -1) 0 0","--IconButton-margin":"0 calc(var(--Input-decoratorChildOffset) * -1) 0 0","--Icon-margin":"0 calc(var(--Input-paddingInline) / -4) 0 0",display:"inherit",alignItems:"center",marginInlineStart:"var(--Input-gap)",color:"var(--Input-decoratorColor)",cursor:"initial"}),ur=l(sr,{name:"JoyInput",slot:"Root",overridesResolver:(o,r)=>r.root})({}),Ir=l(dr,{name:"JoyInput",slot:"Input",overridesResolver:(o,r)=>r.input})({}),vr=l(pr,{name:"JoyInput",slot:"StartDecorator",overridesResolver:(o,r)=>r.startDecorator})({}),gr=l(cr,{name:"JoyInput",slot:"EndDecorator",overridesResolver:(o,r)=>r.endDecorator})({}),hr=X.forwardRef(function(r,d){var a,e,i,s,c,p;const b=rr({props:r,name:"JoyInput"}),C=tr(t({},b,{disabledInProp:r.disabled}),D),{propsToForward:z,rootStateClasses:S,inputStateClasses:H,getRootProps:R,getInputProps:_,formControl:n,focused:$,error:P=!1,disabled:W,fullWidth:k=!1,size:B="md",color:O="neutral",variant:T="outlined",startDecorator:y,endDecorator:x,component:E,slots:F={},slotProps:j={}}=C,N=Q(C,ir),m=(a=(e=r.error)!=null?e:n==null?void 0:n.error)!=null?a:P,J=(i=(s=r.size)!=null?s:n==null?void 0:n.size)!=null?i:B,L=(c=r.color)!=null?c:m?"danger":(p=n==null?void 0:n.color)!=null?p:O,u=t({instanceColor:m?"danger":r.color},b,{fullWidth:k,color:L,disabled:W,error:m,focused:$,size:J,variant:T}),I=lr(u),v=t({},N,{component:E,slots:F,slotProps:j}),[U,M]=h("root",{ref:d,className:[I.root,S],elementType:ur,getSlotProps:R,externalForwardedProps:v,ownerState:u}),[V,A]=h("input",t({},n&&{additionalProps:{id:n.htmlFor,"aria-describedby":n["aria-describedby"]}},{className:[I.input,H],elementType:Ir,getSlotProps:_,internalForwardedProps:z,externalForwardedProps:v,ownerState:u})),[q,w]=h("startDecorator",{className:I.startDecorator,elementType:vr,externalForwardedProps:v,ownerState:u}),[G,K]=h("endDecorator",{className:I.endDecorator,elementType:gr,externalForwardedProps:v,ownerState:u});return g.jsxs(U,t({},M,{children:[y&&g.jsx(q,t({},w,{children:y})),g.jsx(V,t({},A)),x&&g.jsx(G,t({},K,{children:x}))]}))}),xr=hr;export{xr as I,sr as S,dr as a,pr as b,cr as c};
