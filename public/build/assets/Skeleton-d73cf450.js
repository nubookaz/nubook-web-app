import{a as o,_ as M}from"./toPropertyKey-39201a13.js";import{r,j as m}from"./app-8b83436b.js";import{g as B,a as K,k as z,s as L,e as c,u as W,c as O,f as V,h,d as q}from"./useSlot-a2532144.js";function D(a){return B("MuiSkeleton",a)}K("MuiSkeleton",["root","variantOverlay","variantCircular","variantRectangular","variantText","variantInline","h1","h2","h3","h4","title-lg","title-md","title-sm","body-lg","body-md","body-sm","body-xs"]);const G=["className","component","children","animation","overlay","loading","variant","level","height","width","sx","slots","slotProps"];let s=a=>a,f,x,_,C,$;const Q=a=>{const{variant:e,level:t}=a,i={root:["root",e&&`variant${h(e)}`,t&&`level${h(t)}`]};return q(i,D,{})},R=z(f||(f=s`
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.8;
    background: var(--unstable_pulse-bg);
  }

  100% {
    opacity: 1;
  }
`)),Y=z(x||(x=s`
  0% {
    transform: translateX(-100%);
  }

  50% {
    /* +0.5s of delay between each loop */
    transform: translateX(100%);
  }

  100% {
    transform: translateX(100%);
  }
`)),Z=L("span",{name:"JoySkeleton",slot:"Root",overridesResolver:(a,e)=>e.root})(({ownerState:a,theme:e})=>a.animation==="pulse"&&a.variant!=="inline"&&c(_||(_=s`
      &::before {
        animation: ${0} 2s ease-in-out 0.5s infinite;
        background: ${0};
      }
    `),R,e.vars.palette.background.level3),({ownerState:a,theme:e})=>a.animation==="pulse"&&a.variant==="inline"&&c(C||(C=s`
      &::after {
        animation: ${0} 2s ease-in-out 0.5s infinite;
        background: ${0};
      }
    `),R,e.vars.palette.background.level3),({ownerState:a,theme:e})=>a.animation==="wave"&&c($||($=s`
      /* Fix bug in Safari https://bugs.webkit.org/show_bug.cgi?id=68196 */
      -webkit-mask-image: -webkit-radial-gradient(white, black);
      background: ${0};

      &::after {
        content: ' ';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: var(--unstable_pseudo-zIndex);
        animation: ${0} 1.6s linear 0.5s infinite;
        background: linear-gradient(
          90deg,
          transparent,
          var(--unstable_wave-bg, rgba(0 0 0 / 0.08)),
          transparent
        );
        transform: translateX(-100%); /* Avoid flash during server-side hydration */
      }
    `),e.vars.palette.background.level3,Y),({ownerState:a,theme:e})=>{var t,i,d,n;const l=((t=e.components)==null||(t=t.JoyTypography)==null||(t=t.defaultProps)==null?void 0:t.level)||"body1";return[{display:"block",position:"relative","--unstable_pseudo-zIndex":9,"--unstable_pulse-bg":e.vars.palette.background.level1,overflow:"hidden",cursor:"default",color:"transparent","& *":{visibility:"hidden"},"&::before":{display:"block",content:'" "',top:0,bottom:0,left:0,right:0,zIndex:"var(--unstable_pseudo-zIndex)",borderRadius:"inherit"},[e.getColorSchemeSelector("dark")]:{"--unstable_wave-bg":"rgba(255 255 255 / 0.1)"}},a.variant==="rectangular"&&o({borderRadius:"min(0.15em, 6px)",height:"auto",width:"100%","&::before":{position:"absolute"}},!a.animation&&{backgroundColor:e.vars.palette.background.level3},a.level!=="inherit"&&o({},e.typography[a.level])),a.variant==="circular"&&o({borderRadius:"50%",width:"100%",height:"100%","&::before":{position:"absolute"}},!a.animation&&{backgroundColor:e.vars.palette.background.level3},a.level!=="inherit"&&o({},e.typography[a.level])),a.variant==="text"&&o({borderRadius:"min(0.15em, 6px)",background:"transparent",width:"100%"},a.level!=="inherit"&&o({},e.typography[a.level||l],{paddingBlockStart:`calc((${((i=e.typography[a.level||l])==null?void 0:i.lineHeight)||1} - 1) * 0.56em)`,paddingBlockEnd:`calc((${((d=e.typography[a.level||l])==null?void 0:d.lineHeight)||1} - 1) * 0.44em)`,"&::before":o({height:"1em"},e.typography[a.level||l],a.animation==="wave"&&{backgroundColor:e.vars.palette.background.level3},!a.animation&&{backgroundColor:e.vars.palette.background.level3}),"&::after":o({height:"1em",top:`calc((${((n=e.typography[a.level||l])==null?void 0:n.lineHeight)||1} - 1) * 0.56em)`},e.typography[a.level||l])})),a.variant==="inline"&&o({display:"inline",position:"initial",borderRadius:"min(0.15em, 6px)"},!a.animation&&{backgroundColor:e.vars.palette.background.level3},a.level!=="inherit"&&o({},e.typography[a.level]),{WebkitMaskImage:"-webkit-radial-gradient(white, black)","&::before":{position:"absolute",zIndex:"var(--unstable_pseudo-zIndex)",backgroundColor:e.vars.palette.background.level3}},a.animation==="pulse"&&{"&::after":{content:'""',position:"absolute",top:0,left:0,right:0,bottom:0,zIndex:"var(--unstable_pseudo-zIndex)",backgroundColor:e.vars.palette.background.level3}}),a.variant==="overlay"&&o({borderRadius:e.vars.radius.xs,position:"absolute",width:"100%",height:"100%",zIndex:"var(--unstable_pseudo-zIndex)"},a.animation==="pulse"&&{backgroundColor:e.vars.palette.background.surface},a.level!=="inherit"&&o({},e.typography[a.level]),{"&::before":{position:"absolute"}})]}),I=r.forwardRef(function(e,t){const i=W({props:e,name:"JoySkeleton"}),{className:d,component:n="span",children:l,animation:P="pulse",overlay:j=!1,loading:v=!0,variant:b="overlay",level:E=b==="text"?"body-md":"inherit",height:g,width:y,sx:p,slots:N={},slotProps:T={}}=i,U=M(i,G),X=o({},U,{component:n,slots:N,slotProps:T,sx:[{width:y,height:g},...Array.isArray(p)?p:[p]]}),k=o({},i,{animation:P,component:n,level:E,loading:v,overlay:j,variant:b,width:y,height:g}),A=Q(k),[F,H]=O("root",{ref:t,className:V(A.root,d),elementType:Z,externalForwardedProps:X,ownerState:k});return v?m.jsx(F,o({},H,{children:l})):m.jsx(r.Fragment,{children:r.Children.map(l,(u,J)=>J===0&&r.isValidElement(u)?r.cloneElement(u,{"data-first-child":""}):u)})});I.muiName="Skeleton";const ea=I;export{ea as S};
