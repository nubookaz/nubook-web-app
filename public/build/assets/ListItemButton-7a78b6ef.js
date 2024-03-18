import{a as o,_ as H}from"./toPropertyKey-61b1ecea.js";import{r as l,j as m}from"./app-659a3aa2.js";import{a as u,g as C,s as L,u as X,c as E,f as G,h as g,d as M}from"./useSlot-d43794ee.js";import{r as T}from"./styleUtils-0df93871.js";import{R as S}from"./RadioGroupContext-96bab4a2.js";function U(i){return C("MuiList",i)}const V=u("MuiList",["root","nesting","scoped","sizeSm","sizeMd","sizeLg","colorPrimary","colorNeutral","colorDanger","colorSuccess","colorWarning","colorContext","variantPlain","variantOutlined","variantSoft","variantSolid","horizontal","vertical"]),vt=V,Y=l.createContext(!1),z=Y,J=l.createContext(void 0),O=J,F=l.createContext(void 0),q=F,K=l.createContext(!1),Q=K,Z=l.createContext(!1),w=Z,Lt={"--NestedList-marginRight":"0px","--NestedList-marginLeft":"0px","--NestedListItem-paddingLeft":"var(--ListItem-paddingX)","--ListItemButton-marginBlock":"0px","--ListItemButton-marginInline":"0px","--ListItem-marginBlock":"0px","--ListItem-marginInline":"0px"};function tt(i){const{children:t,nested:n,row:s=!1,wrap:e=!1}=i,d=m.jsx(Q.Provider,{value:s,children:m.jsx(w.Provider,{value:e,children:l.Children.map(t,(r,a)=>l.isValidElement(r)?l.cloneElement(r,o({},a===0&&{"data-first-child":""},a===l.Children.count(t)-1&&{"data-last-child":""})):r)})});return n===void 0?d:m.jsx(z.Provider,{value:n,children:d})}const it=["component","className","children","size","orientation","wrap","variant","color","role","slots","slotProps"],rt=i=>{const{variant:t,color:n,size:s,nesting:e,orientation:d,instanceSize:r}=i,a={root:["root",d,t&&`variant${g(t)}`,n&&`color${g(n)}`,!r&&!e&&s&&`size${g(s)}`,r&&`size${g(r)}`,e&&"nesting"]};return M(a,U,{})},at=L("ul")(({theme:i,ownerState:t})=>{var n;const{p:s,padding:e,borderRadius:d}=T({theme:i,ownerState:t},["p","padding","borderRadius"]);function r(a){return a==="sm"?{"--ListDivider-gap":"0.25rem","--ListItem-minHeight":"2rem","--ListItem-paddingY":"3px","--ListItem-paddingX":t.marker?"3px":"0.5rem","--ListItem-gap":"0.5rem","--ListItemDecorator-size":t.orientation==="horizontal"?"1.5rem":"2rem","--Icon-fontSize":i.vars.fontSize.lg}:a==="md"?{"--ListDivider-gap":"0.375rem","--ListItem-minHeight":"2.25rem","--ListItem-paddingY":"0.25rem","--ListItem-paddingX":t.marker?"0.25rem":"0.75rem","--ListItem-gap":"0.625rem","--ListItemDecorator-size":t.orientation==="horizontal"?"1.75rem":"2.5rem","--Icon-fontSize":i.vars.fontSize.xl}:a==="lg"?{"--ListDivider-gap":"0.5rem","--ListItem-minHeight":"2.75rem","--ListItem-paddingY":"0.375rem","--ListItem-paddingX":t.marker?"0.5rem":"1rem","--ListItem-gap":"0.75rem","--ListItemDecorator-size":t.orientation==="horizontal"?"2.25rem":"3rem","--Icon-fontSize":i.vars.fontSize.xl2}:{}}return[t.nesting&&o({},r(t.instanceSize),{"--ListItem-paddingRight":"var(--ListItem-paddingX)","--ListItem-paddingLeft":"var(--NestedListItem-paddingLeft)","--ListItemButton-marginBlock":"0px","--ListItemButton-marginInline":"0px","--ListItem-marginBlock":"0px","--ListItem-marginInline":"0px",padding:0},t.marker&&{paddingInlineStart:"calc(3ch - var(--_List-markerDeduct, 0px))"},{marginInlineStart:"var(--NestedList-marginLeft)",marginInlineEnd:"var(--NestedList-marginRight)",marginBlockStart:"var(--List-gap)",marginBlockEnd:"initial"}),!t.nesting&&o({},r(t.size),{"--List-gap":"0px","--List-nestedInsetStart":"0px","--ListItem-paddingLeft":"var(--ListItem-paddingX)","--ListItem-paddingRight":"var(--ListItem-paddingX)"},t.marker&&{"--_List-markerDeduct":"1ch"},{"--unstable_List-childRadius":"calc(max(var(--List-radius) - var(--List-padding), min(var(--List-padding) / 2, var(--List-radius) / 2)) - var(--variant-borderWidth, 0px))","--ListItem-radius":"var(--unstable_List-childRadius)","--ListItem-startActionTranslateX":"calc(0.5 * var(--ListItem-paddingLeft))","--ListItem-endActionTranslateX":"calc(-0.5 * var(--ListItem-paddingRight))",margin:"initial"},i.typography[`body-${t.size}`],t.orientation==="horizontal"?o({},t.wrap?{padding:"var(--List-padding)",marginInlineStart:"calc(-1 * var(--List-gap))",marginBlockStart:"calc(-1 * var(--List-gap))"}:{paddingInline:"var(--List-padding, var(--ListDivider-gap))",paddingBlock:"var(--List-padding)"}):{paddingBlock:"var(--List-padding, var(--ListDivider-gap))",paddingInline:"var(--List-padding)"},t.marker&&{paddingInlineStart:"3ch"}),o({boxSizing:"border-box",borderRadius:"var(--List-radius)",listStyle:"none",display:"flex",flexDirection:t.orientation==="horizontal"?"row":"column"},t.wrap&&{flexWrap:"wrap"},t.marker&&{"--_List-markerDisplay":"list-item","--_List-markerType":t.marker,lineHeight:"calc(var(--ListItem-minHeight) - 2 * var(--ListItem-paddingY))"},{flexGrow:1,position:"relative"},(n=i.variants[t.variant])==null?void 0:n[t.color],{"--unstable_List-borderWidth":"var(--variant-borderWidth, 0px)"},d!==void 0&&{"--List-radius":d},s!==void 0&&{"--List-padding":s},e!==void 0&&{"--List-padding":e})]}),et=L(at,{name:"JoyList",slot:"Root",overridesResolver:(i,t)=>t.root})({}),ut=l.forwardRef(function(t,n){var s;const e=l.useContext(z),d=l.useContext(q),r=l.useContext(S),a=X({props:t,name:"JoyList"}),{component:p,className:b,children:$,size:k,orientation:I="vertical",wrap:x=!1,variant:y="plain",color:B="neutral",role:f,slots:R={},slotProps:_={}}=a,P=H(a,it),D=k||((s=t.size)!=null?s:"md");let c;d&&(c="group"),r&&(c="presentation"),f&&(c=f);const h=o({},a,{instanceSize:t.size,size:D,nesting:e,orientation:I,wrap:x,variant:y,color:B,role:c}),W=rt(h),N=o({},P,{component:p,slots:R,slotProps:_}),[A,j]=E("root",{ref:n,className:G(W.root,b),elementType:et,externalForwardedProps:N,ownerState:h,additionalProps:{as:p,role:c,"aria-labelledby":typeof e=="string"?e:void 0}});return m.jsx(A,o({},j,{children:m.jsx(O.Provider,{value:`${typeof p=="string"?p:""}:${c||""}`,children:m.jsx(tt,{row:I==="horizontal",wrap:x,children:$})})}))});function It(i){return C("MuiListItem",i)}const nt=u("MuiListItem",["root","startAction","endAction","nested","nesting","sticky","colorPrimary","colorNeutral","colorDanger","colorSuccess","colorWarning","colorContext","variantPlain","variantSoft","variantOutlined","variantSolid"]),st=nt,ot=u("MuiListItemButton",["root","horizontal","vertical","colorPrimary","colorNeutral","colorDanger","colorSuccess","colorWarning","colorContext","focusVisible","disabled","selected","variantPlain","variantSoft","variantOutlined","variantSolid"]),v=ot,lt=L("div")(({theme:i,ownerState:t})=>{var n,s,e,d,r,a;return o({"--Icon-margin":"initial","--Icon-color":t.color!=="neutral"||t.variant==="solid"?"currentColor":i.vars.palette.text.icon,WebkitTapHighlightColor:"transparent",boxSizing:"border-box",position:"relative",font:"inherit",display:"flex",flexDirection:"row",alignItems:"center",alignSelf:"stretch",gap:"var(--ListItem-gap)"},t.orientation==="vertical"&&{flexDirection:"column",justifyContent:"center"},{textAlign:"initial",textDecoration:"initial",backgroundColor:"initial",cursor:"pointer",marginInline:"var(--ListItemButton-marginInline)",marginBlock:"var(--ListItemButton-marginBlock)"},t["data-first-child"]===void 0&&{marginInlineStart:t.row?"var(--List-gap)":void 0,marginBlockStart:t.row?void 0:"var(--List-gap)"},{paddingBlock:"calc(var(--ListItem-paddingY) - var(--variant-borderWidth, 0px))",paddingInlineStart:"calc(var(--ListItem-paddingLeft) + var(--ListItem-startActionWidth, var(--unstable_startActionWidth, 0px)))",paddingInlineEnd:"calc(var(--ListItem-paddingRight) + var(--ListItem-endActionWidth, var(--unstable_endActionWidth, 0px)))",minBlockSize:"var(--ListItem-minHeight)",border:"1px solid transparent",borderRadius:"var(--ListItem-radius)",flex:"var(--unstable_ListItem-flex, none)",fontSize:"inherit",lineHeight:"inherit",minInlineSize:0,[i.focus.selector]:o({},i.focus.default,{zIndex:1})},(n=i.variants[t.variant])==null?void 0:n[t.color],{"&:active":(s=i.variants[`${t.variant}Active`])==null?void 0:s[t.color],[`.${st.root} > &`]:{"--unstable_ListItem-flex":"1 0 0%"},[`&.${v.selected}`]:o({},(e=i.variants[`${t.variant}Active`])==null?void 0:e[t.color],{"--Icon-color":"currentColor"}),[`&:not(.${v.selected}, [aria-selected="true"])`]:{"&:hover":(d=i.variants[`${t.variant}Hover`])==null?void 0:d[t.color],"&:active":(r=i.variants[`${t.variant}Active`])==null?void 0:r[t.color]},[`&.${v.disabled}`]:o({},(a=i.variants[`${t.variant}Disabled`])==null?void 0:a[t.color])})});L(lt,{name:"JoyListItemButton",slot:"Root",overridesResolver:(i,t)=>t.root})(({ownerState:i,theme:t})=>o({},!i.row&&{[`&.${v.selected}`]:{fontWeight:t.vars.fontWeight.md}}));export{O as C,q as G,tt as L,z as N,Q as R,at as S,w as W,vt as a,lt as b,ut as c,It as g,st as l,Lt as s};
