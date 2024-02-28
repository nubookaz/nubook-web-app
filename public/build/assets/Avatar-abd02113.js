import{a as n,_ as L}from"./toPropertyKey-a22241f9.js";import{j as d,r as v}from"./app-e454a32c.js";import{g as M,a as T,s as p,u as U,c as z,h,d as E}from"./useSlot-7faddf1c.js";import{c as w}from"./createSvgIcon-6f7ee0c7.js";const W=w(d.jsx("path",{d:"M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"}),"Person");function D(r){return M("MuiAvatar",r)}T("MuiAvatar",["root","colorPrimary","colorNeutral","colorDanger","colorSuccess","colorWarning","colorContext","fallback","sizeSm","sizeMd","sizeLg","img","variantOutlined","variantSoft","variantSolid"]);const H=v.createContext(void 0);p("div",{name:"JoyAvatarGroup",slot:"Root",overridesResolver:(r,a)=>a.root})(({ownerState:r,theme:a})=>n({},r.size==="sm"&&{"--AvatarGroup-gap":"-0.375rem","--Avatar-ringSize":"2px"},r.size==="md"&&{"--AvatarGroup-gap":"-0.5rem","--Avatar-ringSize":"2px"},r.size==="lg"&&{"--AvatarGroup-gap":"-0.625rem","--Avatar-ringSize":"4px"},{"--Avatar-ring":`0 0 0 var(--Avatar-ringSize) var(--Avatar-ringColor, ${a.vars.palette.background.surface})`,"--Avatar-marginInlineStart":"var(--AvatarGroup-gap)",display:"flex",marginInlineStart:"calc(-1 * var(--AvatarGroup-gap))"}));const O=["alt","color","size","variant","src","srcSet","children","component","slots","slotProps"],q=r=>{const{size:a,variant:t,color:e,src:o,srcSet:s}=r,l={root:["root",t&&`variant${h(t)}`,e&&`color${h(e)}`,a&&`size${h(a)}`],img:[(o||s)&&"img"],fallback:["fallback"]};return E(l,D,{})},B=p("div",{name:"JoyAvatar",slot:"Root",overridesResolver:(r,a)=>a.root})(({theme:r,ownerState:a})=>{var t;return n({"--Icon-color":a.color!=="neutral"||a.variant==="solid"?"currentColor":r.vars.palette.text.icon},r.typography[`title-${a.size}`],a.size==="sm"&&{width:"var(--Avatar-size, 2rem)",height:"var(--Avatar-size, 2rem)",fontSize:"calc(var(--Avatar-size, 2rem) * 0.4375)"},a.size==="md"&&{width:"var(--Avatar-size, 2.5rem)",height:"var(--Avatar-size, 2.5rem)",fontSize:"calc(var(--Avatar-size, 2.5rem) * 0.4)"},a.size==="lg"&&{width:"var(--Avatar-size, 3rem)",height:"var(--Avatar-size, 3rem)",fontSize:"calc(var(--Avatar-size, 3rem) * 0.375)"},{marginInlineStart:"var(--Avatar-marginInlineStart)",boxShadow:"var(--Avatar-ring)",position:"relative",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,lineHeight:1,overflow:"hidden",borderRadius:"var(--Avatar-radius, 50%)",userSelect:"none"},(t=r.variants[a.variant])==null?void 0:t[a.color])}),K=p("img",{name:"JoyAvatar",slot:"Img",overridesResolver:(r,a)=>a.img})({width:"100%",height:"100%",textAlign:"center",objectFit:"cover",color:"transparent",textIndent:1e4}),Q=p(W,{name:"JoyAvatar",slot:"Fallback",overridesResolver:(r,a)=>a.fallback})({width:"64%",height:"64%"});function V({crossOrigin:r,referrerPolicy:a,src:t,srcSet:e}){const[o,s]=v.useState(!1);return v.useEffect(()=>{if(!t&&!e)return;s(!1);let l=!0;const i=new Image;return i.onload=()=>{l&&s("loaded")},i.onerror=()=>{l&&s("error")},i.crossOrigin=r,i.referrerPolicy=a,t&&(i.src=t),e&&(i.srcset=e),()=>{l=!1}},[r,a,t,e]),o}const X=v.forwardRef(function(a,t){const e=U({props:a,name:"JoyAvatar"}),o=v.useContext(H),{alt:s,color:l="neutral",size:i="md",variant:I="soft",src:g,srcSet:u,children:x,component:S,slots:b={},slotProps:C={}}=e,P=L(e,O),k=a.variant||(o==null?void 0:o.variant)||I,R=a.color||(o==null?void 0:o.color)||l,j=a.size||(o==null?void 0:o.size)||i;let c=null;const m=n({},e,{color:R,size:j,variant:k,grouped:!!o}),f=q(m),A=n({},P,{component:S,slots:b,slotProps:C}),[F,G]=z("root",{ref:t,className:f.root,elementType:B,externalForwardedProps:A,ownerState:m}),[$,y]=z("img",{additionalProps:{alt:s,src:g,srcSet:u},className:f.img,elementType:K,externalForwardedProps:A,ownerState:m}),[N,J]=z("fallback",{className:f.fallback,elementType:Q,externalForwardedProps:A,ownerState:m}),_=V(n({},y,{src:g,srcSet:u}));return(g||u)&&_!=="error"?c=d.jsx($,n({},y)):x!=null?c=x:s?c=s[0]:c=d.jsx(N,n({},J)),d.jsx(F,n({},G,{children:c}))}),oa=X;export{oa as A};