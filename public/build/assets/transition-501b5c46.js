import{r as l,R as y,e as ae}from"./app-eefe6961.js";var we=Object.defineProperty,Ce=(e,t,r)=>t in e?we(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,W=(e,t,r)=>(Ce(e,typeof t!="symbol"?t+"":t,r),r);let Oe=class{constructor(){W(this,"current",this.detect()),W(this,"handoffState","pending"),W(this,"currentId",0)}set(t){this.current!==t&&(this.handoffState="pending",this.currentId=0,this.current=t)}reset(){this.set(this.detect())}nextId(){return++this.currentId}get isServer(){return this.current==="server"}get isClient(){return this.current==="client"}detect(){return typeof window>"u"||typeof document>"u"?"server":"client"}handoff(){this.handoffState==="pending"&&(this.handoffState="complete")}get isHandoffComplete(){return this.handoffState==="complete"}},U=new Oe,L=(e,t)=>{U.isServer?l.useEffect(e,t):l.useLayoutEffect(e,t)};function j(e){let t=l.useRef(e);return L(()=>{t.current=e},[e]),t}let F=function(e){let t=j(e);return y.useCallback((...r)=>t.current(...r),[t])};function Ne(e){typeof queueMicrotask=="function"?queueMicrotask(e):Promise.resolve().then(e).catch(t=>setTimeout(()=>{throw t}))}function k(){let e=[],t={addEventListener(r,n,i,f){return r.addEventListener(n,i,f),t.add(()=>r.removeEventListener(n,i,f))},requestAnimationFrame(...r){let n=requestAnimationFrame(...r);return t.add(()=>cancelAnimationFrame(n))},nextFrame(...r){return t.requestAnimationFrame(()=>t.requestAnimationFrame(...r))},setTimeout(...r){let n=setTimeout(...r);return t.add(()=>clearTimeout(n))},microTask(...r){let n={current:!0};return Ne(()=>{n.current&&r[0]()}),t.add(()=>{n.current=!1})},style(r,n,i){let f=r.style.getPropertyValue(n);return Object.assign(r.style,{[n]:i}),this.add(()=>{Object.assign(r.style,{[n]:f})})},group(r){let n=k();return r(n),this.add(()=>n.dispose())},add(r){return e.push(r),()=>{let n=e.indexOf(r);if(n>=0)for(let i of e.splice(n,1))i()}},dispose(){for(let r of e.splice(0))r()}};return t}function ue(){let[e]=l.useState(k);return l.useEffect(()=>()=>e.dispose(),[e]),e}function Re(){let e=typeof document>"u";return"useSyncExternalStore"in ae?(t=>t.useSyncExternalStore)(ae)(()=>()=>{},()=>!1,()=>!e):!1}function ce(){let e=Re(),[t,r]=l.useState(U.isHandoffComplete);return t&&U.isHandoffComplete===!1&&r(!1),l.useEffect(()=>{t!==!0&&r(!0)},[t]),l.useEffect(()=>U.handoff(),[]),e?!1:t}function E(e,t,...r){if(e in t){let i=t[e];return typeof i=="function"?i(...r):i}let n=new Error(`Tried to handle "${e}" but there is no handler defined. Only defined handlers are: ${Object.keys(t).map(i=>`"${i}"`).join(", ")}.`);throw Error.captureStackTrace&&Error.captureStackTrace(n,E),n}let $e=Symbol();function fe(...e){let t=l.useRef(e);l.useEffect(()=>{t.current=e},[e]);let r=F(n=>{for(let i of t.current)i!=null&&(typeof i=="function"?i(n):i.current=n)});return e.every(n=>n==null||(n==null?void 0:n[$e]))?void 0:r}function I(...e){return Array.from(new Set(e.flatMap(t=>typeof t=="string"?t.split(" "):[]))).filter(Boolean).join(" ")}var de=(e=>(e[e.None=0]="None",e[e.RenderStrategy=1]="RenderStrategy",e[e.Static=2]="Static",e))(de||{}),C=(e=>(e[e.Unmount=0]="Unmount",e[e.Hidden=1]="Hidden",e))(C||{});function me({ourProps:e,theirProps:t,slot:r,defaultTag:n,features:i,visible:f=!0,name:m,mergeRefs:c}){c=c??xe;let a=pe(t,e);if(f)return M(a,r,n,m,c);let s=i??0;if(s&2){let{static:o=!1,...g}=a;if(o)return M(g,r,n,m,c)}if(s&1){let{unmount:o=!0,...g}=a;return E(o?0:1,{0(){return null},1(){return M({...g,hidden:!0,style:{display:"none"}},r,n,m,c)}})}return M(a,r,n,m,c)}function M(e,t={},r,n,i){let{as:f=r,children:m,refName:c="ref",...a}=_(e,["unmount","static"]),s=e.ref!==void 0?{[c]:e.ref}:{},o=typeof m=="function"?m(t):m;"className"in a&&a.className&&typeof a.className=="function"&&(a.className=a.className(t));let g={};if(t){let v=!1,h=[];for(let[d,p]of Object.entries(t))typeof p=="boolean"&&(v=!0),p===!0&&h.push(d);v&&(g["data-headlessui-state"]=h.join(" "))}if(f===l.Fragment&&Object.keys(se(a)).length>0){if(!l.isValidElement(o)||Array.isArray(o)&&o.length>1)throw new Error(['Passing props on "Fragment"!',"",`The current component <${n} /> is rendering a "Fragment".`,"However we need to passthrough the following props:",Object.keys(a).map(p=>`  - ${p}`).join(`
`),"","You can apply a few solutions:",['Add an `as="..."` prop, to ensure that we render an actual element instead of a "Fragment".',"Render a single element as the child so that we can forward the props onto that element."].map(p=>`  - ${p}`).join(`
`)].join(`
`));let v=o.props,h=typeof(v==null?void 0:v.className)=="function"?(...p)=>I(v==null?void 0:v.className(...p),a.className):I(v==null?void 0:v.className,a.className),d=h?{className:h}:{};return l.cloneElement(o,Object.assign({},pe(o.props,se(_(a,["ref"]))),g,s,{ref:i(o.ref,s.ref)},d))}return l.createElement(f,Object.assign({},_(a,["ref"]),f!==l.Fragment&&s,f!==l.Fragment&&g),o)}function xe(...e){return e.every(t=>t==null)?void 0:t=>{for(let r of e)r!=null&&(typeof r=="function"?r(t):r.current=t)}}function pe(...e){if(e.length===0)return{};if(e.length===1)return e[0];let t={},r={};for(let n of e)for(let i in n)i.startsWith("on")&&typeof n[i]=="function"?(r[i]!=null||(r[i]=[]),r[i].push(n[i])):t[i]=n[i];if(t.disabled||t["aria-disabled"])return Object.assign(t,Object.fromEntries(Object.keys(r).map(n=>[n,void 0])));for(let n in r)Object.assign(t,{[n](i,...f){let m=r[n];for(let c of m){if((i instanceof Event||(i==null?void 0:i.nativeEvent)instanceof Event)&&i.defaultPrevented)return;c(i,...f)}}});return t}function ee(e){var t;return Object.assign(l.forwardRef(e),{displayName:(t=e.displayName)!=null?t:e.name})}function se(e){let t=Object.assign({},e);for(let r in t)t[r]===void 0&&delete t[r];return t}function _(e,t=[]){let r=Object.assign({},e);for(let n of t)n in r&&delete r[n];return r}let te=l.createContext(null);te.displayName="OpenClosedContext";var T=(e=>(e[e.Open=1]="Open",e[e.Closed=2]="Closed",e[e.Closing=4]="Closing",e[e.Opening=8]="Opening",e))(T||{});function he(){return l.useContext(te)}function je({value:e,children:t}){return y.createElement(te.Provider,{value:e},t)}function re(){let e=l.useRef(!1);return L(()=>(e.current=!0,()=>{e.current=!1}),[]),e}function Pe(e=0){let[t,r]=l.useState(e),n=re(),i=l.useCallback(a=>{n.current&&r(s=>s|a)},[t,n]),f=l.useCallback(a=>!!(t&a),[t]),m=l.useCallback(a=>{n.current&&r(s=>s&~a)},[r,n]),c=l.useCallback(a=>{n.current&&r(s=>s^a)},[r]);return{flags:t,addFlag:i,hasFlag:f,removeFlag:m,toggleFlag:c}}function Le(e){let t={called:!1};return(...r)=>{if(!t.called)return t.called=!0,e(...r)}}function J(e,...t){e&&t.length>0&&e.classList.add(...t)}function X(e,...t){e&&t.length>0&&e.classList.remove(...t)}function ke(e,t){let r=k();if(!e)return r.dispose;let{transitionDuration:n,transitionDelay:i}=getComputedStyle(e),[f,m]=[n,i].map(a=>{let[s=0]=a.split(",").filter(Boolean).map(o=>o.includes("ms")?parseFloat(o):parseFloat(o)*1e3).sort((o,g)=>g-o);return s}),c=f+m;if(c!==0){r.group(s=>{s.setTimeout(()=>{t(),s.dispose()},c),s.addEventListener(e,"transitionrun",o=>{o.target===o.currentTarget&&s.dispose()})});let a=r.addEventListener(e,"transitionend",s=>{s.target===s.currentTarget&&(t(),a())})}else t();return r.add(()=>t()),r.dispose}function Ae(e,t,r,n){let i=r?"enter":"leave",f=k(),m=n!==void 0?Le(n):()=>{};i==="enter"&&(e.removeAttribute("hidden"),e.style.display="");let c=E(i,{enter:()=>t.enter,leave:()=>t.leave}),a=E(i,{enter:()=>t.enterTo,leave:()=>t.leaveTo}),s=E(i,{enter:()=>t.enterFrom,leave:()=>t.leaveFrom});return X(e,...t.base,...t.enter,...t.enterTo,...t.enterFrom,...t.leave,...t.leaveFrom,...t.leaveTo,...t.entered),J(e,...t.base,...c,...s),f.nextFrame(()=>{X(e,...t.base,...c,...s),J(e,...t.base,...c,...a),ke(e,()=>(X(e,...t.base,...c),J(e,...t.base,...t.entered),m()))}),f.dispose}function He({immediate:e,container:t,direction:r,classes:n,onStart:i,onStop:f}){let m=re(),c=ue(),a=j(r);L(()=>{e&&(a.current="enter")},[e]),L(()=>{let s=k();c.add(s.dispose);let o=t.current;if(o&&a.current!=="idle"&&m.current)return s.dispose(),i.current(a.current),s.add(Ae(o,n.current,a.current==="enter",()=>{s.dispose(),f.current(a.current)})),s.dispose},[r])}function w(e=""){return e.split(/\s+/).filter(t=>t.length>1)}let B=l.createContext(null);B.displayName="TransitionContext";var qe=(e=>(e.Visible="visible",e.Hidden="hidden",e))(qe||{});function De(){let e=l.useContext(B);if(e===null)throw new Error("A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.");return e}function Me(){let e=l.useContext(V);if(e===null)throw new Error("A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.");return e}let V=l.createContext(null);V.displayName="NestingContext";function Y(e){return"children"in e?Y(e.children):e.current.filter(({el:t})=>t.current!==null).filter(({state:t})=>t==="visible").length>0}function ve(e,t){let r=j(e),n=l.useRef([]),i=re(),f=ue(),m=F((h,d=C.Hidden)=>{let p=n.current.findIndex(({el:u})=>u===h);p!==-1&&(E(d,{[C.Unmount](){n.current.splice(p,1)},[C.Hidden](){n.current[p].state="hidden"}}),f.microTask(()=>{var u;!Y(n)&&i.current&&((u=r.current)==null||u.call(r))}))}),c=F(h=>{let d=n.current.find(({el:p})=>p===h);return d?d.state!=="visible"&&(d.state="visible"):n.current.push({el:h,state:"visible"}),()=>m(h,C.Unmount)}),a=l.useRef([]),s=l.useRef(Promise.resolve()),o=l.useRef({enter:[],leave:[],idle:[]}),g=F((h,d,p)=>{a.current.splice(0),t&&(t.chains.current[d]=t.chains.current[d].filter(([u])=>u!==h)),t==null||t.chains.current[d].push([h,new Promise(u=>{a.current.push(u)})]),t==null||t.chains.current[d].push([h,new Promise(u=>{Promise.all(o.current[d].map(([R,$])=>$)).then(()=>u())})]),d==="enter"?s.current=s.current.then(()=>t==null?void 0:t.wait.current).then(()=>p(d)):p(d)}),v=F((h,d,p)=>{Promise.all(o.current[d].splice(0).map(([u,R])=>R)).then(()=>{var u;(u=a.current.shift())==null||u()}).then(()=>p(d))});return l.useMemo(()=>({children:n,register:c,unregister:m,onStart:g,onStop:v,wait:s,chains:o}),[c,m,n,g,v,o,s])}function Ue(){}let Ie=["beforeEnter","afterEnter","beforeLeave","afterLeave"];function oe(e){var t;let r={};for(let n of Ie)r[n]=(t=e[n])!=null?t:Ue;return r}function Be(e){let t=l.useRef(oe(e));return l.useEffect(()=>{t.current=oe(e)},[e]),t}let Ve="div",ge=de.RenderStrategy;function Ye(e,t){var r,n;let{beforeEnter:i,afterEnter:f,beforeLeave:m,afterLeave:c,enter:a,enterFrom:s,enterTo:o,entered:g,leave:v,leaveFrom:h,leaveTo:d,...p}=e,u=l.useRef(null),R=fe(u,t),$=(r=p.unmount)==null||r?C.Unmount:C.Hidden,{show:b,appear:O,initial:ne}=De(),[N,z]=l.useState(b?"visible":"hidden"),ie=Me(),{register:A,unregister:H}=ie;l.useEffect(()=>A(u),[A,u]),l.useEffect(()=>{if($===C.Hidden&&u.current){if(b&&N!=="visible"){z("visible");return}return E(N,{hidden:()=>H(u),visible:()=>A(u)})}},[N,u,A,H,b,$]);let G=j({base:w(p.className),enter:w(a),enterFrom:w(s),enterTo:w(o),entered:w(g),leave:w(v),leaveFrom:w(h),leaveTo:w(d)}),q=Be({beforeEnter:i,afterEnter:f,beforeLeave:m,afterLeave:c}),K=ce();l.useEffect(()=>{if(K&&N==="visible"&&u.current===null)throw new Error("Did you forget to passthrough the `ref` to the actual DOM node?")},[u,N,K]);let ye=ne&&!O,le=O&&b&&ne,Ee=(()=>!K||ye?"idle":b?"enter":"leave")(),P=Pe(0),Te=F(S=>E(S,{enter:()=>{P.addFlag(T.Opening),q.current.beforeEnter()},leave:()=>{P.addFlag(T.Closing),q.current.beforeLeave()},idle:()=>{}})),Fe=F(S=>E(S,{enter:()=>{P.removeFlag(T.Opening),q.current.afterEnter()},leave:()=>{P.removeFlag(T.Closing),q.current.afterLeave()},idle:()=>{}})),D=ve(()=>{z("hidden"),H(u)},ie),Q=l.useRef(!1);He({immediate:le,container:u,classes:G,direction:Ee,onStart:j(S=>{Q.current=!0,D.onStart(u,S,Te)}),onStop:j(S=>{Q.current=!1,D.onStop(u,S,Fe),S==="leave"&&!Y(D)&&(z("hidden"),H(u))})});let x=p,Se={ref:R};return le?x={...x,className:I(p.className,...G.current.enter,...G.current.enterFrom)}:Q.current&&(x.className=I(p.className,(n=u.current)==null?void 0:n.className),x.className===""&&delete x.className),y.createElement(V.Provider,{value:D},y.createElement(je,{value:E(N,{visible:T.Open,hidden:T.Closed})|P.flags},me({ourProps:Se,theirProps:x,defaultTag:Ve,features:ge,visible:N==="visible",name:"Transition.Child"})))}function ze(e,t){let{show:r,appear:n=!1,unmount:i=!0,...f}=e,m=l.useRef(null),c=fe(m,t);ce();let a=he();if(r===void 0&&a!==null&&(r=(a&T.Open)===T.Open),![!0,!1].includes(r))throw new Error("A <Transition /> is used but it is missing a `show={true | false}` prop.");let[s,o]=l.useState(r?"visible":"hidden"),g=ve(()=>{o("hidden")}),[v,h]=l.useState(!0),d=l.useRef([r]);L(()=>{v!==!1&&d.current[d.current.length-1]!==r&&(d.current.push(r),h(!1))},[d,r]);let p=l.useMemo(()=>({show:r,appear:n,initial:v}),[r,n,v]);l.useEffect(()=>{if(r)o("visible");else if(!Y(g))o("hidden");else{let b=m.current;if(!b)return;let O=b.getBoundingClientRect();O.x===0&&O.y===0&&O.width===0&&O.height===0&&o("hidden")}},[r,g]);let u={unmount:i},R=F(()=>{var b;v&&h(!1),(b=e.beforeEnter)==null||b.call(e)}),$=F(()=>{var b;v&&h(!1),(b=e.beforeLeave)==null||b.call(e)});return y.createElement(V.Provider,{value:g},y.createElement(B.Provider,{value:p},me({ourProps:{...u,as:l.Fragment,children:y.createElement(be,{ref:c,...u,...f,beforeEnter:R,beforeLeave:$})},theirProps:{},defaultTag:l.Fragment,features:ge,visible:s==="visible",name:"Transition"})))}function Ge(e,t){let r=l.useContext(B)!==null,n=he()!==null;return y.createElement(y.Fragment,null,!r&&n?y.createElement(Z,{ref:t,...e}):y.createElement(be,{ref:t,...e}))}let Z=ee(ze),be=ee(Ye),Ke=ee(Ge),_e=Object.assign(Z,{Child:Ke,Root:Z});export{_e as q};
