import{a as _}from"./toPropertyKey-61b1ecea.js";import{r as a}from"./app-659a3aa2.js";import{u as w}from"./useControlled-adcd3c46.js";import{b as y}from"./useIsFocusVisible-7ca602c7.js";import{b as E}from"./useSlot-d43794ee.js";function j(k){const{checked:u,defaultChecked:i,disabled:s,onBlur:f,onChange:d,onFocus:h,onFocusVisible:p,readOnly:b,required:m}=k,[B,g]=w({controlled:u,default:!!i,name:"Switch",state:"checked"}),C=n=>e=>{var l;e.nativeEvent.defaultPrevented||(g(e.target.checked),d==null||d(e),(l=n.onChange)==null||l.call(n,e))},{isFocusVisibleRef:o,onBlur:V,onFocus:R,ref:I}=y(),[c,r]=a.useState(!1);s&&c&&r(!1),a.useEffect(()=>{o.current=c},[c,o]);const t=a.useRef(null),x=n=>e=>{var l;t.current||(t.current=e.currentTarget),R(e),o.current===!0&&(r(!0),p==null||p(e)),h==null||h(e),(l=n.onFocus)==null||l.call(n,e)},S=n=>e=>{var l;V(e),o.current===!1&&r(!1),f==null||f(e),(l=n.onBlur)==null||l.call(n,e)},F=E(I,t);return{checked:B,disabled:!!s,focusVisible:c,getInputProps:(n={})=>_({checked:u,defaultChecked:i,disabled:s,readOnly:b,ref:F,required:m,type:"checkbox",role:"switch","aria-checked":u},n,{onChange:C(n),onFocus:x(n),onBlur:S(n)}),inputRef:F,readOnly:!!b}}export{j as u};
