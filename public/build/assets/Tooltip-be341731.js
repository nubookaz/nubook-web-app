import{a as d,_ as Xo}from"./toPropertyKey-a22241f9.js";import{r as n,j as N}from"./app-e454a32c.js";import{g as Yo,a as Ho,s as fo,u as Ko,b as O,f as qo,c as lo,h as z,d as Go}from"./useSlot-7faddf1c.js";import{u as R,a as Qo,b as Zo,c as oe,T as ee}from"./useIsFocusVisible-3e69e93a.js";import{u as io}from"./useEventCallback-49b41c49.js";import{P as te}from"./Popper-834fe13e.js";function re(t){return Yo("MuiTooltip",t)}Ho("MuiTooltip",["root","tooltipArrow","arrow","touch","placementLeft","placementRight","placementTop","placementBottom","colorPrimary","colorDanger","colorNeutral","colorSuccess","colorWarning","colorContext","sizeSm","sizeMd","sizeLg","variantPlain","variantOutlined","variantSoft","variantSolid"]);const ae=["children","className","component","arrow","describeChild","disableFocusListener","disableHoverListener","disableInteractive","disableTouchListener","enterDelay","enterNextDelay","enterTouchDelay","followCursor","id","leaveDelay","leaveTouchDelay","onClose","onOpen","open","disablePortal","direction","keepMounted","modifiers","placement","title","color","variant","size","slots","slotProps"],se=t=>{const{arrow:e,variant:a,color:l,size:s,placement:r,touch:k}=t,f={root:["root",e&&"tooltipArrow",k&&"touch",s&&`size${z(s)}`,l&&`color${z(l)}`,a&&`variant${z(a)}`,`tooltipPlacement${z(r.split("-")[0])}`],arrow:["arrow"]};return Go(f,re,{})},ne=fo("div",{name:"JoyTooltip",slot:"Root",overridesResolver:(t,e)=>e.root})(({ownerState:t,theme:e})=>{var a,l,s;const r=(a=e.variants[t.variant])==null?void 0:a[t.color];return d({},t.size==="sm"&&{"--Icon-fontSize":e.vars.fontSize.md,"--Tooltip-arrowSize":"8px",padding:e.spacing(.25,.625)},t.size==="md"&&{"--Icon-fontSize":e.vars.fontSize.lg,"--Tooltip-arrowSize":"10px",padding:e.spacing(.5,.75)},t.size==="lg"&&{"--Icon-fontSize":e.vars.fontSize.xl,"--Tooltip-arrowSize":"12px",padding:e.spacing(.75,1)},{zIndex:e.vars.zIndex.tooltip,borderRadius:e.vars.radius.sm,boxShadow:e.shadow.sm,wordWrap:"break-word",position:"relative"},t.disableInteractive&&{pointerEvents:"none"},e.typography[`body-${{sm:"xs",md:"sm",lg:"md"}[t.size]}`],r,!r.backgroundColor&&{backgroundColor:e.vars.palette.background.surface},{"&::before":{content:'""',display:"block",position:"absolute",width:(l=t.placement)!=null&&l.match(/(top|bottom)/)?"100%":"calc(10px + var(--variant-borderWidth, 0px))",height:(s=t.placement)!=null&&s.match(/(top|bottom)/)?"calc(10px + var(--variant-borderWidth, 0px))":"100%"},'&[data-popper-placement*="bottom"]::before':{top:0,left:0,transform:"translateY(-100%)"},'&[data-popper-placement*="left"]::before':{top:0,right:0,transform:"translateX(100%)"},'&[data-popper-placement*="right"]::before':{top:0,left:0,transform:"translateX(-100%)"},'&[data-popper-placement*="top"]::before':{bottom:0,left:0,transform:"translateY(100%)"}})}),le=fo("span",{name:"JoyTooltip",slot:"Arrow",overridesResolver:(t,e)=>e.arrow})(({theme:t,ownerState:e})=>{var a,l,s;const r=(a=t.variants[e.variant])==null?void 0:a[e.color];return{"--unstable_Tooltip-arrowRotation":0,width:"var(--Tooltip-arrowSize)",height:"var(--Tooltip-arrowSize)",boxSizing:"border-box","&::before":{content:'""',display:"block",position:"absolute",width:0,height:0,border:"calc(var(--Tooltip-arrowSize) / 2) solid",borderLeftColor:"transparent",borderBottomColor:"transparent",borderTopColor:(l=r==null?void 0:r.backgroundColor)!=null?l:t.vars.palette.background.surface,borderRightColor:(s=r==null?void 0:r.backgroundColor)!=null?s:t.vars.palette.background.surface,borderRadius:"0px 2px 0px 0px",boxShadow:`var(--variant-borderWidth, 0px) calc(-1 * var(--variant-borderWidth, 0px)) 0px 0px ${r.borderColor}`,transformOrigin:"center center",transform:"rotate(calc(-45deg + 90deg * var(--unstable_Tooltip-arrowRotation)))"},'[data-popper-placement*="bottom"] &':{top:"calc(0.5px + var(--Tooltip-arrowSize) * -1 / 2)"},'[data-popper-placement*="top"] &':{"--unstable_Tooltip-arrowRotation":2,bottom:"calc(0.5px + var(--Tooltip-arrowSize) * -1 / 2)"},'[data-popper-placement*="left"] &':{"--unstable_Tooltip-arrowRotation":1,right:"calc(0.5px + var(--Tooltip-arrowSize) * -1 / 2)"},'[data-popper-placement*="right"] &':{"--unstable_Tooltip-arrowRotation":3,left:"calc(0.5px + var(--Tooltip-arrowSize) * -1 / 2)"}}});let C=!1;const co=new ee;let T={x:0,y:0};function po(t,e){return a=>{e&&e(a),t(a)}}function uo(t,e){return a=>{e&&e(a),t(a)}}const ie=n.forwardRef(function(e,a){var l;const s=Ko({props:e,name:"JoyTooltip"}),{children:r,className:k,component:f,arrow:W=!1,describeChild:mo=!1,disableFocusListener:bo=!1,disableHoverListener:B=!1,disableInteractive:ho=!1,disableTouchListener:vo=!1,enterDelay:U=100,enterNextDelay:A=0,enterTouchDelay:To=700,followCursor:P=!1,id:yo,leaveDelay:V=0,leaveTouchDelay:go=1500,onClose:j,onOpen:J,open:xo,disablePortal:wo,direction:So,keepMounted:zo,modifiers:X,placement:Y="bottom",title:u,color:Ro="neutral",variant:Co="solid",size:ko="md",slots:Po={},slotProps:Mo={}}=s,H=Xo(s,ae),[m,K]=n.useState(),[M,Eo]=n.useState(null),y=n.useRef(!1),E=ho||P,q=R(),L=R(),g=R(),G=R(),[Lo,Q]=Qo({controlled:xo,default:!1,name:"Tooltip",state:"open"});let c=Lo;const F=Zo(yo),b=n.useRef(),x=io(()=>{b.current!==void 0&&(document.body.style.WebkitUserSelect=b.current,b.current=void 0),G.clear()});n.useEffect(()=>x,[x]);const Z=o=>{co.clear(),C=!0,Q(!0),J&&!c&&J(o)},w=io(o=>{co.start(800+V,()=>{C=!1}),Q(!1),j&&c&&j(o),q.start(150,()=>{y.current=!1})}),S=o=>{y.current&&o.type!=="touchstart"||(m&&m.removeAttribute("title"),L.clear(),g.clear(),U||C&&A?L.start(C?A:U,()=>{Z(o)}):Z(o))},_=o=>{L.clear(),g.start(V,()=>{w(o)})},{isFocusVisibleRef:oo,onBlur:Fo,onFocus:_o,ref:Io}=oe(),[,eo]=n.useState(!1),to=o=>{Fo(o),oo.current===!1&&(eo(!1),_(o))},ro=o=>{m||K(o.currentTarget),_o(o),oo.current===!0&&(eo(!0),S(o))},ao=o=>{y.current=!0;const p=r.props;p.onTouchStart&&p.onTouchStart(o)},$o=o=>{ao(o),g.clear(),q.clear(),x(),b.current=document.body.style.WebkitUserSelect,document.body.style.WebkitUserSelect="none",G.start(To,()=>{document.body.style.WebkitUserSelect=b.current,S(o)})},Do=o=>{r.props.onTouchEnd&&r.props.onTouchEnd(o),x(),g.start(go,()=>{w(o)})};n.useEffect(()=>{if(!c)return;function o(p){(p.key==="Escape"||p.key==="Esc")&&w(p)}return document.addEventListener("keydown",o),()=>{document.removeEventListener("keydown",o)}},[w,c]);const No=O(K,a),Oo=O(Io,No),Wo=O(r.ref,Oo);typeof u!="number"&&!u&&(c=!1);const I=n.useRef(null),Bo=o=>{const p=r.props;p.onMouseMove&&p.onMouseMove(o),T={x:o.clientX,y:o.clientY},I.current&&I.current.update()},h={},$=typeof u=="string";mo?(h.title=!c&&$&&!B?u:null,h["aria-describedby"]=c?F:null):(h["aria-label"]=$?u:null,h["aria-labelledby"]=c&&!$?F:null);const i=d({},h,H,{component:f},r.props,{className:qo(k,r.props.className),onTouchStart:ao,ref:Wo},P?{onMouseMove:Bo}:{}),v={};vo||(i.onTouchStart=$o,i.onTouchEnd=Do),B||(i.onMouseOver=po(S,i.onMouseOver),i.onMouseLeave=po(_,i.onMouseLeave),E||(v.onMouseOver=S,v.onMouseLeave=_)),bo||(i.onFocus=uo(ro,i.onFocus),i.onBlur=uo(to,i.onBlur),E||(v.onFocus=ro,v.onBlur=to));const D=d({},s,{arrow:W,disableInteractive:E,placement:Y,touch:y.current,color:Ro,variant:Co,size:ko}),so=se(D),no=d({},H,{component:f,slots:Po,slotProps:Mo}),Uo=n.useMemo(()=>[{name:"arrow",enabled:!!M,options:{element:M,padding:6}},{name:"offset",options:{offset:[0,10]}},...X||[]],[M,X]),[Ao,Vo]=lo("root",{additionalProps:d({id:F,popperRef:I,placement:Y,anchorEl:P?{getBoundingClientRect:()=>({top:T.y,left:T.x,right:T.x,bottom:T.y,width:0,height:0})}:m,open:m?c:!1,disablePortal:wo,keepMounted:zo,direction:So,modifiers:Uo},v),ref:null,className:so.root,elementType:ne,externalForwardedProps:no,ownerState:D}),[jo,Jo]=lo("arrow",{ref:Eo,className:so.arrow,elementType:le,externalForwardedProps:no,ownerState:D});return N.jsxs(n.Fragment,{children:[n.isValidElement(r)&&n.cloneElement(r,i),N.jsxs(Ao,d({},Vo,!((l=s.slots)!=null&&l.root)&&{as:te,slots:{root:f||"div"}},{children:[u,W?N.jsx(jo,d({},Jo)):null]}))]})}),be=ie;export{be as T};