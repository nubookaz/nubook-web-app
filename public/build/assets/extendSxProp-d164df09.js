import{_ as a,a as i}from"./toPropertyKey-a23e7eac.js";import{y as c,o as f}from"./useSlot-a85726b4.js";const x=["sx"],m=t=>{var s,n;const o={systemProps:{},otherProps:{}},r=(s=t==null||(n=t.theme)==null?void 0:n.unstable_sxConfig)!=null?s:c;return Object.keys(t).forEach(e=>{r[e]?o.systemProps[e]=t[e]:o.otherProps[e]=t[e]}),o};function y(t){const{sx:s}=t,n=a(t,x),{systemProps:o,otherProps:r}=m(n);let e;return Array.isArray(s)?e=[o,...s]:typeof s=="function"?e=(...u)=>{const l=s(...u);return f(l)?i({},o,l):o}:e=i({},o,s),i({},r,{sx:e})}export{y as e};
