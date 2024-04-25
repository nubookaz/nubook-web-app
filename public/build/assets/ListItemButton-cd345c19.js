import{a as l,_ as H}from"./toPropertyKey-39201a13.js";import{r as n,j as m}from"./app-8b83436b.js";import{a as u,g as C,s as L,u as X,c as E,f as G,h as g,d as M}from"./useSlot-a2532144.js";import{r as T}from"./styleUtils-b870bb2a.js";function S(i){return C("MuiList",i)}const U=u("MuiList",["root","nesting","scoped","sizeSm","sizeMd","sizeLg","colorPrimary","colorNeutral","colorDanger","colorSuccess","colorWarning","colorContext","variantPlain","variantOutlined","variantSoft","variantSolid","horizontal","vertical"]),vt=U,V=n.createContext(!1),z=V,Y=n.createContext(void 0),J=Y,O=n.createContext(void 0),F=O,q=n.createContext(!1),K=q,Q=n.createContext(!1),Z=Q,Lt={"--NestedList-marginRight":"0px","--NestedList-marginLeft":"0px","--NestedListItem-paddingLeft":"var(--ListItem-paddingX)","--ListItemButton-marginBlock":"0px","--ListItemButton-marginInline":"0px","--ListItem-marginBlock":"0px","--ListItem-marginInline":"0px"};function w(i){const{children:t,nested:s,row:o=!1,wrap:a=!1}=i,d=m.jsx(K.Provider,{value:o,children:m.jsx(Z.Provider,{value:a,children:n.Children.map(t,(e,r)=>n.isValidElement(e)?n.cloneElement(e,l({},r===0&&{"data-first-child":""},r===n.Children.count(t)-1&&{"data-last-child":""})):e)})});return s===void 0?d:m.jsx(z.Provider,{value:s,children:d})}const tt=n.createContext(void 0),it=tt,et=["component","className","children","size","orientation","wrap","variant","color","role","slots","slotProps"],rt=i=>{const{variant:t,color:s,size:o,nesting:a,orientation:d,instanceSize:e}=i,r={root:["root",d,t&&`variant${g(t)}`,s&&`color${g(s)}`,!e&&!a&&o&&`size${g(o)}`,e&&`size${g(e)}`,a&&"nesting"]};return M(r,S,{})},at=L("ul")(({theme:i,ownerState:t})=>{var s;const{p:o,padding:a,borderRadius:d}=T({theme:i,ownerState:t},["p","padding","borderRadius"]);function e(r){return r==="sm"?{"--ListDivider-gap":"0.25rem","--ListItem-minHeight":"2rem","--ListItem-paddingY":"3px","--ListItem-paddingX":t.marker?"3px":"0.5rem","--ListItem-gap":"0.5rem","--ListItemDecorator-size":t.orientation==="horizontal"?"1.5rem":"2rem","--Icon-fontSize":i.vars.fontSize.lg}:r==="md"?{"--ListDivider-gap":"0.375rem","--ListItem-minHeight":"2.25rem","--ListItem-paddingY":"0.25rem","--ListItem-paddingX":t.marker?"0.25rem":"0.75rem","--ListItem-gap":"0.625rem","--ListItemDecorator-size":t.orientation==="horizontal"?"1.75rem":"2.5rem","--Icon-fontSize":i.vars.fontSize.xl}:r==="lg"?{"--ListDivider-gap":"0.5rem","--ListItem-minHeight":"2.75rem","--ListItem-paddingY":"0.375rem","--ListItem-paddingX":t.marker?"0.5rem":"1rem","--ListItem-gap":"0.75rem","--ListItemDecorator-size":t.orientation==="horizontal"?"2.25rem":"3rem","--Icon-fontSize":i.vars.fontSize.xl2}:{}}return[t.nesting&&l({},e(t.instanceSize),{"--ListItem-paddingRight":"var(--ListItem-paddingX)","--ListItem-paddingLeft":"var(--NestedListItem-paddingLeft)","--ListItemButton-marginBlock":"0px","--ListItemButton-marginInline":"0px","--ListItem-marginBlock":"0px","--ListItem-marginInline":"0px",padding:0},t.marker&&{paddingInlineStart:"calc(3ch - var(--_List-markerDeduct, 0px))"},{marginInlineStart:"var(--NestedList-marginLeft)",marginInlineEnd:"var(--NestedList-marginRight)",marginBlockStart:"var(--List-gap)",marginBlockEnd:"initial"}),!t.nesting&&l({},e(t.size),{"--List-gap":"0px","--List-nestedInsetStart":"0px","--ListItem-paddingLeft":"var(--ListItem-paddingX)","--ListItem-paddingRight":"var(--ListItem-paddingX)"},t.marker&&{"--_List-markerDeduct":"1ch"},{"--unstable_List-childRadius":"calc(max(var(--List-radius) - var(--List-padding), min(var(--List-padding) / 2, var(--List-radius) / 2)) - var(--variant-borderWidth, 0px))","--ListItem-radius":"var(--unstable_List-childRadius)","--ListItem-startActionTranslateX":"calc(0.5 * var(--ListItem-paddingLeft))","--ListItem-endActionTranslateX":"calc(-0.5 * var(--ListItem-paddingRight))",margin:"initial"},i.typography[`body-${t.size}`],t.orientation==="horizontal"?l({},t.wrap?{padding:"var(--List-padding)",marginInlineStart:"calc(-1 * var(--List-gap))",marginBlockStart:"calc(-1 * var(--List-gap))"}:{paddingInline:"var(--List-padding, var(--ListDivider-gap))",paddingBlock:"var(--List-padding)"}):{paddingBlock:"var(--List-padding, var(--ListDivider-gap))",paddingInline:"var(--List-padding)"},t.marker&&{paddingInlineStart:"3ch"}),l({boxSizing:"border-box",borderRadius:"var(--List-radius)",listStyle:"none",display:"flex",flexDirection:t.orientation==="horizontal"?"row":"column"},t.wrap&&{flexWrap:"wrap"},t.marker&&{"--_List-markerDisplay":"list-item","--_List-markerType":t.marker,lineHeight:"calc(var(--ListItem-minHeight) - 2 * var(--ListItem-paddingY))"},{flexGrow:1,position:"relative"},(s=i.variants[t.variant])==null?void 0:s[t.color],{"--unstable_List-borderWidth":"var(--variant-borderWidth, 0px)"},d!==void 0&&{"--List-radius":d},o!==void 0&&{"--List-padding":o},a!==void 0&&{"--List-padding":a})]}),nt=L(at,{name:"JoyList",slot:"Root",overridesResolver:(i,t)=>t.root})({}),ut=n.forwardRef(function(t,s){var o;const a=n.useContext(z),d=n.useContext(F),e=n.useContext(it),r=X({props:t,name:"JoyList"}),{component:p,className:b,children:$,size:k,orientation:I="vertical",wrap:x=!1,variant:y="plain",color:B="neutral",role:f,slots:R={},slotProps:_={}}=r,P=H(r,et),D=k||((o=t.size)!=null?o:"md");let c;d&&(c="group"),e&&(c="presentation"),f&&(c=f);const h=l({},r,{instanceSize:t.size,size:D,nesting:a,orientation:I,wrap:x,variant:y,color:B,role:c}),W=rt(h),N=l({},P,{component:p,slots:R,slotProps:_}),[A,j]=E("root",{ref:s,className:G(W.root,b),elementType:nt,externalForwardedProps:N,ownerState:h,additionalProps:{as:p,role:c,"aria-labelledby":typeof a=="string"?a:void 0}});return m.jsx(A,l({},j,{children:m.jsx(J.Provider,{value:`${typeof p=="string"?p:""}:${c||""}`,children:m.jsx(w,{row:I==="horizontal",wrap:x,children:$})})}))});function It(i){return C("MuiListItem",i)}const st=u("MuiListItem",["root","startAction","endAction","nested","nesting","sticky","colorPrimary","colorNeutral","colorDanger","colorSuccess","colorWarning","colorContext","variantPlain","variantSoft","variantOutlined","variantSolid"]),ot=st,lt=u("MuiListItemButton",["root","horizontal","vertical","colorPrimary","colorNeutral","colorDanger","colorSuccess","colorWarning","colorContext","focusVisible","disabled","selected","variantPlain","variantSoft","variantOutlined","variantSolid"]),v=lt,dt=L("div")(({theme:i,ownerState:t})=>{var s,o,a,d,e,r;return l({"--Icon-margin":"initial","--Icon-color":t.color!=="neutral"||t.variant==="solid"?"currentColor":i.vars.palette.text.icon,WebkitTapHighlightColor:"transparent",boxSizing:"border-box",position:"relative",font:"inherit",display:"flex",flexDirection:"row",alignItems:"center",alignSelf:"stretch",gap:"var(--ListItem-gap)"},t.orientation==="vertical"&&{flexDirection:"column",justifyContent:"center"},{textAlign:"initial",textDecoration:"initial",backgroundColor:"initial",cursor:"pointer",marginInline:"var(--ListItemButton-marginInline)",marginBlock:"var(--ListItemButton-marginBlock)"},t["data-first-child"]===void 0&&{marginInlineStart:t.row?"var(--List-gap)":void 0,marginBlockStart:t.row?void 0:"var(--List-gap)"},{paddingBlock:"calc(var(--ListItem-paddingY) - var(--variant-borderWidth, 0px))",paddingInlineStart:"calc(var(--ListItem-paddingLeft) + var(--ListItem-startActionWidth, var(--unstable_startActionWidth, 0px)))",paddingInlineEnd:"calc(var(--ListItem-paddingRight) + var(--ListItem-endActionWidth, var(--unstable_endActionWidth, 0px)))",minBlockSize:"var(--ListItem-minHeight)",border:"1px solid transparent",borderRadius:"var(--ListItem-radius)",flex:"var(--unstable_ListItem-flex, none)",fontSize:"inherit",lineHeight:"inherit",minInlineSize:0,[i.focus.selector]:l({},i.focus.default,{zIndex:1})},(s=i.variants[t.variant])==null?void 0:s[t.color],{"&:active":(o=i.variants[`${t.variant}Active`])==null?void 0:o[t.color],[`.${ot.root} > &`]:{"--unstable_ListItem-flex":"1 0 0%"},[`&.${v.selected}`]:l({},(a=i.variants[`${t.variant}Active`])==null?void 0:a[t.color],{"--Icon-color":"currentColor"}),[`&:not(.${v.selected}, [aria-selected="true"])`]:{"&:hover":(d=i.variants[`${t.variant}Hover`])==null?void 0:d[t.color],"&:active":(e=i.variants[`${t.variant}Active`])==null?void 0:e[t.color]},[`&.${v.disabled}`]:l({},(r=i.variants[`${t.variant}Disabled`])==null?void 0:r[t.color])})});L(dt,{name:"JoyListItemButton",slot:"Root",overridesResolver:(i,t)=>t.root})(({ownerState:i,theme:t})=>l({},!i.row&&{[`&.${v.selected}`]:{fontWeight:t.vars.fontWeight.md}}));export{J as C,F as G,w as L,z as N,K as R,at as S,Z as W,vt as a,dt as b,ut as c,It as g,ot as l,Lt as s};
