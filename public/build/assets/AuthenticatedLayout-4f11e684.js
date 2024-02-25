import{j as i,d as or,r as p,R as Sr,q as Fr}from"./app-968085fd.js";import{F as ee,P as g}from"./index.es-3e6cee57.js";import{r as kr,s as Ir,t as Pr,u as ir,v as sr,w as lr,x as cr,y as _r,d as Cr,z as zr}from"./index-f033c28d.js";import{a as Rr,g as Tr,s as me,_,u as Nr,b as Lr,c as $r,d as Ee,f as Oe,h as Mr}from"./useSlot-e00659a1.js";import{c as Ur}from"./createSvgIcon-cb2127eb.js";import{S as Br}from"./SecondaryButton-1ee136e4.js";import{P as X,a as Se}from"./ProjectNavigation-c8d4cccd.js";function Z({active:e=!1,activeClass:r="",className:t="",icon:n,children:o,href:a}){const l=`fa-icon ${e?r:""} ${t}`;return i.jsxs(or,{href:a,children:[i.jsx(ee,{icon:n,className:l}),o]})}function Kr(){return i.jsx("div",{className:"application-logo",children:i.jsx(ee,{icon:kr,className:"logo-icon"})})}function He({active:e=!1,className:r="",children:t,...n}){return i.jsx(or,{...n,className:"links",children:t})}function Y(e,r,t,n){function o(a){return a instanceof t?a:new t(function(l){l(a)})}return new(t||(t=Promise))(function(a,l){function c(d){try{u(n.next(d))}catch(m){l(m)}}function v(d){try{u(n.throw(d))}catch(m){l(m)}}function u(d){d.done?a(d.value):o(d.value).then(c,v)}u((n=n.apply(e,r||[])).next())})}function V(e,r){var t={label:0,sent:function(){if(a[0]&1)throw a[1];return a[1]},trys:[],ops:[]},n,o,a,l;return l={next:c(0),throw:c(1),return:c(2)},typeof Symbol=="function"&&(l[Symbol.iterator]=function(){return this}),l;function c(u){return function(d){return v([u,d])}}function v(u){if(n)throw new TypeError("Generator is already executing.");for(;l&&(l=0,u[0]&&(t=0)),t;)try{if(n=1,o&&(a=u[0]&2?o.return:u[0]?o.throw||((a=o.return)&&a.call(o),0):o.next)&&!(a=a.call(o,u[1])).done)return a;switch(o=0,a&&(u=[u[0]&2,a.value]),u[0]){case 0:case 1:a=u;break;case 4:return t.label++,{value:u[1],done:!1};case 5:t.label++,o=u[1],u=[0];continue;case 7:u=t.ops.pop(),t.trys.pop();continue;default:if(a=t.trys,!(a=a.length>0&&a[a.length-1])&&(u[0]===6||u[0]===2)){t=0;continue}if(u[0]===3&&(!a||u[1]>a[0]&&u[1]<a[3])){t.label=u[1];break}if(u[0]===6&&t.label<a[1]){t.label=a[1],a=u;break}if(a&&t.label<a[2]){t.label=a[2],t.ops.push(u);break}a[2]&&t.ops.pop(),t.trys.pop();continue}u=r.call(e,t)}catch(d){u=[6,d],o=0}finally{n=a=0}if(u[0]&5)throw u[1];return{value:u[0]?u[1]:void 0,done:!0}}}function qe(e,r){var t=typeof Symbol=="function"&&e[Symbol.iterator];if(!t)return e;var n=t.call(e),o,a=[],l;try{for(;(r===void 0||r-- >0)&&!(o=n.next()).done;)a.push(o.value)}catch(c){l={error:c}}finally{try{o&&!o.done&&(t=n.return)&&t.call(n)}finally{if(l)throw l.error}}return a}function Je(e,r,t){if(t||arguments.length===2)for(var n=0,o=r.length,a;n<o;n++)(a||!(n in r))&&(a||(a=Array.prototype.slice.call(r,0,n)),a[n]=r[n]);return e.concat(a||Array.prototype.slice.call(r))}var Wr=new Map([["aac","audio/aac"],["abw","application/x-abiword"],["arc","application/x-freearc"],["avif","image/avif"],["avi","video/x-msvideo"],["azw","application/vnd.amazon.ebook"],["bin","application/octet-stream"],["bmp","image/bmp"],["bz","application/x-bzip"],["bz2","application/x-bzip2"],["cda","application/x-cdf"],["csh","application/x-csh"],["css","text/css"],["csv","text/csv"],["doc","application/msword"],["docx","application/vnd.openxmlformats-officedocument.wordprocessingml.document"],["eot","application/vnd.ms-fontobject"],["epub","application/epub+zip"],["gz","application/gzip"],["gif","image/gif"],["heic","image/heic"],["heif","image/heif"],["htm","text/html"],["html","text/html"],["ico","image/vnd.microsoft.icon"],["ics","text/calendar"],["jar","application/java-archive"],["jpeg","image/jpeg"],["jpg","image/jpeg"],["js","text/javascript"],["json","application/json"],["jsonld","application/ld+json"],["mid","audio/midi"],["midi","audio/midi"],["mjs","text/javascript"],["mp3","audio/mpeg"],["mp4","video/mp4"],["mpeg","video/mpeg"],["mpkg","application/vnd.apple.installer+xml"],["odp","application/vnd.oasis.opendocument.presentation"],["ods","application/vnd.oasis.opendocument.spreadsheet"],["odt","application/vnd.oasis.opendocument.text"],["oga","audio/ogg"],["ogv","video/ogg"],["ogx","application/ogg"],["opus","audio/opus"],["otf","font/otf"],["png","image/png"],["pdf","application/pdf"],["php","application/x-httpd-php"],["ppt","application/vnd.ms-powerpoint"],["pptx","application/vnd.openxmlformats-officedocument.presentationml.presentation"],["rar","application/vnd.rar"],["rtf","application/rtf"],["sh","application/x-sh"],["svg","image/svg+xml"],["swf","application/x-shockwave-flash"],["tar","application/x-tar"],["tif","image/tiff"],["tiff","image/tiff"],["ts","video/mp2t"],["ttf","font/ttf"],["txt","text/plain"],["vsd","application/vnd.visio"],["wav","audio/wav"],["weba","audio/webm"],["webm","video/webm"],["webp","image/webp"],["woff","font/woff"],["woff2","font/woff2"],["xhtml","application/xhtml+xml"],["xls","application/vnd.ms-excel"],["xlsx","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"],["xml","application/xml"],["xul","application/vnd.mozilla.xul+xml"],["zip","application/zip"],["7z","application/x-7z-compressed"],["mkv","video/x-matroska"],["mov","video/quicktime"],["msg","application/vnd.ms-outlook"]]);function te(e,r){var t=Gr(e);if(typeof t.path!="string"){var n=e.webkitRelativePath;Object.defineProperty(t,"path",{value:typeof r=="string"?r:typeof n=="string"&&n.length>0?n:e.name,writable:!1,configurable:!1,enumerable:!0})}return t}function Gr(e){var r=e.name,t=r&&r.lastIndexOf(".")!==-1;if(t&&!e.type){var n=r.split(".").pop().toLowerCase(),o=Wr.get(n);o&&Object.defineProperty(e,"type",{value:o,writable:!1,configurable:!1,enumerable:!0})}return e}var Hr=[".DS_Store","Thumbs.db"];function qr(e){return Y(this,void 0,void 0,function(){return V(this,function(r){return fe(e)&&Jr(e.dataTransfer)?[2,Xr(e.dataTransfer,e.type)]:Yr(e)?[2,Vr(e)]:Array.isArray(e)&&e.every(function(t){return"getFile"in t&&typeof t.getFile=="function"})?[2,Qr(e)]:[2,[]]})})}function Jr(e){return fe(e)}function Yr(e){return fe(e)&&fe(e.target)}function fe(e){return typeof e=="object"&&e!==null}function Vr(e){return ke(e.target.files).map(function(r){return te(r)})}function Qr(e){return Y(this,void 0,void 0,function(){var r;return V(this,function(t){switch(t.label){case 0:return[4,Promise.all(e.map(function(n){return n.getFile()}))];case 1:return r=t.sent(),[2,r.map(function(n){return te(n)})]}})})}function Xr(e,r){return Y(this,void 0,void 0,function(){var t,n;return V(this,function(o){switch(o.label){case 0:return e.items?(t=ke(e.items).filter(function(a){return a.kind==="file"}),r!=="drop"?[2,t]:[4,Promise.all(t.map(Zr))]):[3,2];case 1:return n=o.sent(),[2,Ye(ur(n))];case 2:return[2,Ye(ke(e.files).map(function(a){return te(a)}))]}})})}function Ye(e){return e.filter(function(r){return Hr.indexOf(r.name)===-1})}function ke(e){if(e===null)return[];for(var r=[],t=0;t<e.length;t++){var n=e[t];r.push(n)}return r}function Zr(e){if(typeof e.webkitGetAsEntry!="function")return Ve(e);var r=e.webkitGetAsEntry();return r&&r.isDirectory?fr(r):Ve(e)}function ur(e){return e.reduce(function(r,t){return Je(Je([],qe(r),!1),qe(Array.isArray(t)?ur(t):[t]),!1)},[])}function Ve(e){var r=e.getAsFile();if(!r)return Promise.reject("".concat(e," is not a File"));var t=te(r);return Promise.resolve(t)}function et(e){return Y(this,void 0,void 0,function(){return V(this,function(r){return[2,e.isDirectory?fr(e):rt(e)]})})}function fr(e){var r=e.createReader();return new Promise(function(t,n){var o=[];function a(){var l=this;r.readEntries(function(c){return Y(l,void 0,void 0,function(){var v,u,d;return V(this,function(m){switch(m.label){case 0:if(c.length)return[3,5];m.label=1;case 1:return m.trys.push([1,3,,4]),[4,Promise.all(o)];case 2:return v=m.sent(),t(v),[3,4];case 3:return u=m.sent(),n(u),[3,4];case 4:return[3,6];case 5:d=Promise.all(c.map(et)),o.push(d),a(),m.label=6;case 6:return[2]}})})},function(c){n(c)})}a()})}function rt(e){return Y(this,void 0,void 0,function(){return V(this,function(r){return[2,new Promise(function(t,n){e.file(function(o){var a=te(o,e.fullPath);t(a)},function(o){n(o)})})]})})}var tt=function(e,r){if(e&&r){var t=Array.isArray(r)?r:r.split(","),n=e.name||"",o=(e.type||"").toLowerCase(),a=o.replace(/\/.*$/,"");return t.some(function(l){var c=l.trim().toLowerCase();return c.charAt(0)==="."?n.toLowerCase().endsWith(c):c.endsWith("/*")?a===c.replace(/\/.*$/,""):o===c})}return!0};function Qe(e){return ot(e)||at(e)||dr(e)||nt()}function nt(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function at(e){if(typeof Symbol<"u"&&e[Symbol.iterator]!=null||e["@@iterator"]!=null)return Array.from(e)}function ot(e){if(Array.isArray(e))return Ie(e)}function Xe(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter(function(o){return Object.getOwnPropertyDescriptor(e,o).enumerable})),t.push.apply(t,n)}return t}function Ze(e){for(var r=1;r<arguments.length;r++){var t=arguments[r]!=null?arguments[r]:{};r%2?Xe(Object(t),!0).forEach(function(n){pr(e,n,t[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):Xe(Object(t)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))})}return e}function pr(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function re(e,r){return lt(e)||st(e,r)||dr(e,r)||it()}function it(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function dr(e,r){if(e){if(typeof e=="string")return Ie(e,r);var t=Object.prototype.toString.call(e).slice(8,-1);if(t==="Object"&&e.constructor&&(t=e.constructor.name),t==="Map"||t==="Set")return Array.from(e);if(t==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return Ie(e,r)}}function Ie(e,r){(r==null||r>e.length)&&(r=e.length);for(var t=0,n=new Array(r);t<r;t++)n[t]=e[t];return n}function st(e,r){var t=e==null?null:typeof Symbol<"u"&&e[Symbol.iterator]||e["@@iterator"];if(t!=null){var n=[],o=!0,a=!1,l,c;try{for(t=t.call(e);!(o=(l=t.next()).done)&&(n.push(l.value),!(r&&n.length===r));o=!0);}catch(v){a=!0,c=v}finally{try{!o&&t.return!=null&&t.return()}finally{if(a)throw c}}return n}}function lt(e){if(Array.isArray(e))return e}var ct="file-invalid-type",ut="file-too-large",ft="file-too-small",pt="too-many-files",dt=function(r){r=Array.isArray(r)&&r.length===1?r[0]:r;var t=Array.isArray(r)?"one of ".concat(r.join(", ")):r;return{code:ct,message:"File type must be ".concat(t)}},er=function(r){return{code:ut,message:"File is larger than ".concat(r," ").concat(r===1?"byte":"bytes")}},rr=function(r){return{code:ft,message:"File is smaller than ".concat(r," ").concat(r===1?"byte":"bytes")}},mt={code:pt,message:"Too many files"};function mr(e,r){var t=e.type==="application/x-moz-file"||tt(e,r);return[t,t?null:dt(r)]}function gr(e,r,t){if($(e.size))if($(r)&&$(t)){if(e.size>t)return[!1,er(t)];if(e.size<r)return[!1,rr(r)]}else{if($(r)&&e.size<r)return[!1,rr(r)];if($(t)&&e.size>t)return[!1,er(t)]}return[!0,null]}function $(e){return e!=null}function gt(e){var r=e.files,t=e.accept,n=e.minSize,o=e.maxSize,a=e.multiple,l=e.maxFiles,c=e.validator;return!a&&r.length>1||a&&l>=1&&r.length>l?!1:r.every(function(v){var u=mr(v,t),d=re(u,1),m=d[0],b=gr(v,n,o),S=re(b,1),I=S[0],D=c?c(v):null;return m&&I&&!D})}function pe(e){return typeof e.isPropagationStopped=="function"?e.isPropagationStopped():typeof e.cancelBubble<"u"?e.cancelBubble:!1}function ue(e){return e.dataTransfer?Array.prototype.some.call(e.dataTransfer.types,function(r){return r==="Files"||r==="application/x-moz-file"}):!!e.target&&!!e.target.files}function tr(e){e.preventDefault()}function vt(e){return e.indexOf("MSIE")!==-1||e.indexOf("Trident/")!==-1}function ht(e){return e.indexOf("Edge/")!==-1}function yt(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:window.navigator.userAgent;return vt(e)||ht(e)}function k(){for(var e=arguments.length,r=new Array(e),t=0;t<e;t++)r[t]=arguments[t];return function(n){for(var o=arguments.length,a=new Array(o>1?o-1:0),l=1;l<o;l++)a[l-1]=arguments[l];return r.some(function(c){return!pe(n)&&c&&c.apply(void 0,[n].concat(a)),pe(n)})}}function bt(){return"showOpenFilePicker"in window}function xt(e){if($(e)){var r=Object.entries(e).filter(function(t){var n=re(t,2),o=n[0],a=n[1],l=!0;return vr(o)||(console.warn('Skipped "'.concat(o,'" because it is not a valid MIME type. Check https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types for a list of valid MIME types.')),l=!1),(!Array.isArray(a)||!a.every(hr))&&(console.warn('Skipped "'.concat(o,'" because an invalid file extension was provided.')),l=!1),l}).reduce(function(t,n){var o=re(n,2),a=o[0],l=o[1];return Ze(Ze({},t),{},pr({},a,l))},{});return[{description:"Files",accept:r}]}return e}function jt(e){if($(e))return Object.entries(e).reduce(function(r,t){var n=re(t,2),o=n[0],a=n[1];return[].concat(Qe(r),[o],Qe(a))},[]).filter(function(r){return vr(r)||hr(r)}).join(",")}function Dt(e){return e instanceof DOMException&&(e.name==="AbortError"||e.code===e.ABORT_ERR)}function At(e){return e instanceof DOMException&&(e.name==="SecurityError"||e.code===e.SECURITY_ERR)}function vr(e){return e==="audio/*"||e==="video/*"||e==="image/*"||e==="text/*"||/\w+\/[-+.\w]+/g.test(e)}function hr(e){return/^.*\.[\w]+$/.test(e)}var wt=["children"],Et=["open"],Ot=["refKey","role","onKeyDown","onFocus","onBlur","onClick","onDragEnter","onDragOver","onDragLeave","onDrop"],St=["refKey","onChange","onClick"];function Ft(e){return Pt(e)||It(e)||yr(e)||kt()}function kt(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function It(e){if(typeof Symbol<"u"&&e[Symbol.iterator]!=null||e["@@iterator"]!=null)return Array.from(e)}function Pt(e){if(Array.isArray(e))return Pe(e)}function Fe(e,r){return zt(e)||Ct(e,r)||yr(e,r)||_t()}function _t(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function yr(e,r){if(e){if(typeof e=="string")return Pe(e,r);var t=Object.prototype.toString.call(e).slice(8,-1);if(t==="Object"&&e.constructor&&(t=e.constructor.name),t==="Map"||t==="Set")return Array.from(e);if(t==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return Pe(e,r)}}function Pe(e,r){(r==null||r>e.length)&&(r=e.length);for(var t=0,n=new Array(r);t<r;t++)n[t]=e[t];return n}function Ct(e,r){var t=e==null?null:typeof Symbol<"u"&&e[Symbol.iterator]||e["@@iterator"];if(t!=null){var n=[],o=!0,a=!1,l,c;try{for(t=t.call(e);!(o=(l=t.next()).done)&&(n.push(l.value),!(r&&n.length===r));o=!0);}catch(v){a=!0,c=v}finally{try{!o&&t.return!=null&&t.return()}finally{if(a)throw c}}return n}}function zt(e){if(Array.isArray(e))return e}function nr(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter(function(o){return Object.getOwnPropertyDescriptor(e,o).enumerable})),t.push.apply(t,n)}return t}function h(e){for(var r=1;r<arguments.length;r++){var t=arguments[r]!=null?arguments[r]:{};r%2?nr(Object(t),!0).forEach(function(n){_e(e,n,t[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):nr(Object(t)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))})}return e}function _e(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function de(e,r){if(e==null)return{};var t=Rt(e,r),n,o;if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)n=a[o],!(r.indexOf(n)>=0)&&Object.prototype.propertyIsEnumerable.call(e,n)&&(t[n]=e[n])}return t}function Rt(e,r){if(e==null)return{};var t={},n=Object.keys(e),o,a;for(a=0;a<n.length;a++)o=n[a],!(r.indexOf(o)>=0)&&(t[o]=e[o]);return t}var ze=p.forwardRef(function(e,r){var t=e.children,n=de(e,wt),o=xr(n),a=o.open,l=de(o,Et);return p.useImperativeHandle(r,function(){return{open:a}},[a]),Sr.createElement(p.Fragment,null,t(h(h({},l),{},{open:a})))});ze.displayName="Dropzone";var br={disabled:!1,getFilesFromEvent:qr,maxSize:1/0,minSize:0,multiple:!0,maxFiles:0,preventDropOnDocument:!0,noClick:!1,noKeyboard:!1,noDrag:!1,noDragEventsBubbling:!1,validator:null,useFsAccessApi:!0,autoFocus:!1};ze.defaultProps=br;ze.propTypes={children:g.func,accept:g.objectOf(g.arrayOf(g.string)),multiple:g.bool,preventDropOnDocument:g.bool,noClick:g.bool,noKeyboard:g.bool,noDrag:g.bool,noDragEventsBubbling:g.bool,minSize:g.number,maxSize:g.number,maxFiles:g.number,disabled:g.bool,getFilesFromEvent:g.func,onFileDialogCancel:g.func,onFileDialogOpen:g.func,useFsAccessApi:g.bool,autoFocus:g.bool,onDragEnter:g.func,onDragLeave:g.func,onDragOver:g.func,onDrop:g.func,onDropAccepted:g.func,onDropRejected:g.func,onError:g.func,validator:g.func};var Ce={isFocused:!1,isFileDialogActive:!1,isDragActive:!1,isDragAccept:!1,isDragReject:!1,acceptedFiles:[],fileRejections:[]};function xr(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},r=h(h({},br),e),t=r.accept,n=r.disabled,o=r.getFilesFromEvent,a=r.maxSize,l=r.minSize,c=r.multiple,v=r.maxFiles,u=r.onDragEnter,d=r.onDragLeave,m=r.onDragOver,b=r.onDrop,S=r.onDropAccepted,I=r.onDropRejected,D=r.onFileDialogCancel,P=r.onFileDialogOpen,M=r.useFsAccessApi,U=r.autoFocus,C=r.preventDropOnDocument,B=r.noClick,A=r.noKeyboard,z=r.noDrag,F=r.noDragEventsBubbling,R=r.onError,T=r.validator,N=p.useMemo(function(){return jt(t)},[t]),ne=p.useMemo(function(){return xt(t)},[t]),K=p.useMemo(function(){return typeof P=="function"?P:ar},[P]),W=p.useMemo(function(){return typeof D=="function"?D:ar},[D]),x=p.useRef(null),w=p.useRef(null),Re=p.useReducer(Tt,Ce),ge=Fe(Re,2),ve=ge[0],E=ge[1],Dr=ve.isFocused,Te=ve.isFileDialogActive,ae=p.useRef(typeof window<"u"&&window.isSecureContext&&M&&bt()),Ne=function(){!ae.current&&Te&&setTimeout(function(){if(w.current){var f=w.current.files;f.length||(E({type:"closeDialog"}),W())}},300)};p.useEffect(function(){return window.addEventListener("focus",Ne,!1),function(){window.removeEventListener("focus",Ne,!1)}},[w,Te,W,ae]);var G=p.useRef([]),Le=function(f){x.current&&x.current.contains(f.target)||(f.preventDefault(),G.current=[])};p.useEffect(function(){return C&&(document.addEventListener("dragover",tr,!1),document.addEventListener("drop",Le,!1)),function(){C&&(document.removeEventListener("dragover",tr),document.removeEventListener("drop",Le))}},[x,C]),p.useEffect(function(){return!n&&U&&x.current&&x.current.focus(),function(){}},[x,U,n]);var L=p.useCallback(function(s){R?R(s):console.error(s)},[R]),$e=p.useCallback(function(s){s.preventDefault(),s.persist(),le(s),G.current=[].concat(Ft(G.current),[s.target]),ue(s)&&Promise.resolve(o(s)).then(function(f){if(!(pe(s)&&!F)){var y=f.length,j=y>0&&gt({files:f,accept:N,minSize:l,maxSize:a,multiple:c,maxFiles:v,validator:T}),O=y>0&&!j;E({isDragAccept:j,isDragReject:O,isDragActive:!0,type:"setDraggedFiles"}),u&&u(s)}}).catch(function(f){return L(f)})},[o,u,L,F,N,l,a,c,v,T]),Me=p.useCallback(function(s){s.preventDefault(),s.persist(),le(s);var f=ue(s);if(f&&s.dataTransfer)try{s.dataTransfer.dropEffect="copy"}catch{}return f&&m&&m(s),!1},[m,F]),Ue=p.useCallback(function(s){s.preventDefault(),s.persist(),le(s);var f=G.current.filter(function(j){return x.current&&x.current.contains(j)}),y=f.indexOf(s.target);y!==-1&&f.splice(y,1),G.current=f,!(f.length>0)&&(E({type:"setDraggedFiles",isDragActive:!1,isDragAccept:!1,isDragReject:!1}),ue(s)&&d&&d(s))},[x,d,F]),oe=p.useCallback(function(s,f){var y=[],j=[];s.forEach(function(O){var Q=mr(O,N),J=Fe(Q,2),ye=J[0],be=J[1],xe=gr(O,l,a),ce=Fe(xe,2),je=ce[0],De=ce[1],Ae=T?T(O):null;if(ye&&je&&!Ae)y.push(O);else{var we=[be,De];Ae&&(we=we.concat(Ae)),j.push({file:O,errors:we.filter(function(Or){return Or})})}}),(!c&&y.length>1||c&&v>=1&&y.length>v)&&(y.forEach(function(O){j.push({file:O,errors:[mt]})}),y.splice(0)),E({acceptedFiles:y,fileRejections:j,type:"setFiles"}),b&&b(y,j,f),j.length>0&&I&&I(j,f),y.length>0&&S&&S(y,f)},[E,c,N,l,a,v,b,S,I,T]),ie=p.useCallback(function(s){s.preventDefault(),s.persist(),le(s),G.current=[],ue(s)&&Promise.resolve(o(s)).then(function(f){pe(s)&&!F||oe(f,s)}).catch(function(f){return L(f)}),E({type:"reset"})},[o,oe,L,F]),H=p.useCallback(function(){if(ae.current){E({type:"openDialog"}),K();var s={multiple:c,types:ne};window.showOpenFilePicker(s).then(function(f){return o(f)}).then(function(f){oe(f,null),E({type:"closeDialog"})}).catch(function(f){Dt(f)?(W(f),E({type:"closeDialog"})):At(f)?(ae.current=!1,w.current?(w.current.value=null,w.current.click()):L(new Error("Cannot open the file picker because the https://developer.mozilla.org/en-US/docs/Web/API/File_System_Access_API is not supported and no <input> was provided."))):L(f)});return}w.current&&(E({type:"openDialog"}),K(),w.current.value=null,w.current.click())},[E,K,W,M,oe,L,ne,c]),Be=p.useCallback(function(s){!x.current||!x.current.isEqualNode(s.target)||(s.key===" "||s.key==="Enter"||s.keyCode===32||s.keyCode===13)&&(s.preventDefault(),H())},[x,H]),Ke=p.useCallback(function(){E({type:"focus"})},[]),We=p.useCallback(function(){E({type:"blur"})},[]),Ge=p.useCallback(function(){B||(yt()?setTimeout(H,0):H())},[B,H]),q=function(f){return n?null:f},he=function(f){return A?null:q(f)},se=function(f){return z?null:q(f)},le=function(f){F&&f.stopPropagation()},Ar=p.useMemo(function(){return function(){var s=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},f=s.refKey,y=f===void 0?"ref":f,j=s.role,O=s.onKeyDown,Q=s.onFocus,J=s.onBlur,ye=s.onClick,be=s.onDragEnter,xe=s.onDragOver,ce=s.onDragLeave,je=s.onDrop,De=de(s,Ot);return h(h(_e({onKeyDown:he(k(O,Be)),onFocus:he(k(Q,Ke)),onBlur:he(k(J,We)),onClick:q(k(ye,Ge)),onDragEnter:se(k(be,$e)),onDragOver:se(k(xe,Me)),onDragLeave:se(k(ce,Ue)),onDrop:se(k(je,ie)),role:typeof j=="string"&&j!==""?j:"presentation"},y,x),!n&&!A?{tabIndex:0}:{}),De)}},[x,Be,Ke,We,Ge,$e,Me,Ue,ie,A,z,n]),wr=p.useCallback(function(s){s.stopPropagation()},[]),Er=p.useMemo(function(){return function(){var s=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},f=s.refKey,y=f===void 0?"ref":f,j=s.onChange,O=s.onClick,Q=de(s,St),J=_e({accept:N,multiple:c,type:"file",style:{display:"none"},onChange:q(k(j,ie)),onClick:q(k(O,wr)),tabIndex:-1},y,w);return h(h({},J),Q)}},[w,t,c,ie,n]);return h(h({},ve),{},{isFocused:Dr&&!n,getRootProps:Ar,getInputProps:Er,rootRef:x,inputRef:w,open:q(H)})}function Tt(e,r){switch(r.type){case"focus":return h(h({},e),{},{isFocused:!0});case"blur":return h(h({},e),{},{isFocused:!1});case"openDialog":return h(h({},Ce),{},{isFileDialogActive:!0});case"closeDialog":return h(h({},e),{},{isFileDialogActive:!1});case"setDraggedFiles":return h(h({},e),{},{isDragActive:r.isDragActive,isDragAccept:r.isDragAccept,isDragReject:r.isDragReject});case"setFiles":return h(h({},e),{},{acceptedFiles:r.acceptedFiles,fileRejections:r.fileRejections});case"reset":return h({},Ce);default:return e}}function ar(){}const Nt=Ur(i.jsx("path",{d:"M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"}),"Person");function Lt(e){return Rr("MuiAvatar",e)}Tr("MuiAvatar",["root","colorPrimary","colorNeutral","colorDanger","colorSuccess","colorWarning","colorContext","fallback","sizeSm","sizeMd","sizeLg","img","variantOutlined","variantSoft","variantSolid"]);const $t=p.createContext(void 0);me("div",{name:"JoyAvatarGroup",slot:"Root",overridesResolver:(e,r)=>r.root})(({ownerState:e,theme:r})=>_({},e.size==="sm"&&{"--AvatarGroup-gap":"-0.375rem","--Avatar-ringSize":"2px"},e.size==="md"&&{"--AvatarGroup-gap":"-0.5rem","--Avatar-ringSize":"2px"},e.size==="lg"&&{"--AvatarGroup-gap":"-0.625rem","--Avatar-ringSize":"4px"},{"--Avatar-ring":`0 0 0 var(--Avatar-ringSize) var(--Avatar-ringColor, ${r.vars.palette.background.surface})`,"--Avatar-marginInlineStart":"var(--AvatarGroup-gap)",display:"flex",marginInlineStart:"calc(-1 * var(--AvatarGroup-gap))"}));const Mt=["alt","color","size","variant","src","srcSet","children","component","slots","slotProps"],Ut=e=>{const{size:r,variant:t,color:n,src:o,srcSet:a}=e,l={root:["root",t&&`variant${Oe(t)}`,n&&`color${Oe(n)}`,r&&`size${Oe(r)}`],img:[(o||a)&&"img"],fallback:["fallback"]};return Mr(l,Lt,{})},Bt=me("div",{name:"JoyAvatar",slot:"Root",overridesResolver:(e,r)=>r.root})(({theme:e,ownerState:r})=>{var t;return _({"--Icon-color":r.color!=="neutral"||r.variant==="solid"?"currentColor":e.vars.palette.text.icon},e.typography[`title-${r.size}`],r.size==="sm"&&{width:"var(--Avatar-size, 2rem)",height:"var(--Avatar-size, 2rem)",fontSize:"calc(var(--Avatar-size, 2rem) * 0.4375)"},r.size==="md"&&{width:"var(--Avatar-size, 2.5rem)",height:"var(--Avatar-size, 2.5rem)",fontSize:"calc(var(--Avatar-size, 2.5rem) * 0.4)"},r.size==="lg"&&{width:"var(--Avatar-size, 3rem)",height:"var(--Avatar-size, 3rem)",fontSize:"calc(var(--Avatar-size, 3rem) * 0.375)"},{marginInlineStart:"var(--Avatar-marginInlineStart)",boxShadow:"var(--Avatar-ring)",position:"relative",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,lineHeight:1,overflow:"hidden",borderRadius:"var(--Avatar-radius, 50%)",userSelect:"none"},(t=e.variants[r.variant])==null?void 0:t[r.color])}),Kt=me("img",{name:"JoyAvatar",slot:"Img",overridesResolver:(e,r)=>r.img})({width:"100%",height:"100%",textAlign:"center",objectFit:"cover",color:"transparent",textIndent:1e4}),Wt=me(Nt,{name:"JoyAvatar",slot:"Fallback",overridesResolver:(e,r)=>r.fallback})({width:"64%",height:"64%"});function Gt({crossOrigin:e,referrerPolicy:r,src:t,srcSet:n}){const[o,a]=p.useState(!1);return p.useEffect(()=>{if(!t&&!n)return;a(!1);let l=!0;const c=new Image;return c.onload=()=>{l&&a("loaded")},c.onerror=()=>{l&&a("error")},c.crossOrigin=e,c.referrerPolicy=r,t&&(c.src=t),n&&(c.srcset=n),()=>{l=!1}},[e,r,t,n]),o}const Ht=p.forwardRef(function(r,t){const n=Nr({props:r,name:"JoyAvatar"}),o=p.useContext($t),{alt:a,color:l="neutral",size:c="md",variant:v="soft",src:u,srcSet:d,children:m,component:b,slots:S={},slotProps:I={}}=n,D=Lr(n,Mt),P=r.variant||(o==null?void 0:o.variant)||v,{getColor:M}=$r(P),U=r.color||(o==null?void 0:o.color),C=U!=="context"?M(U,l):l,B=r.size||(o==null?void 0:o.size)||c;let A=null;const z=_({},n,{color:C,size:B,variant:P,grouped:!!o}),F=Ut(z),R=_({},D,{component:b,slots:S,slotProps:I}),[T,N]=Ee("root",{ref:t,className:F.root,elementType:Bt,externalForwardedProps:R,ownerState:z}),[ne,K]=Ee("img",{additionalProps:{alt:a,src:u,srcSet:d},className:F.img,elementType:Kt,externalForwardedProps:R,ownerState:z}),[W,x]=Ee("fallback",{className:F.fallback,elementType:Wt,externalForwardedProps:R,ownerState:z}),w=Gt(_({},K,{src:u,srcSet:d}));return(u||d)&&w!=="error"?A=i.jsx(ne,_({},K)):m!=null?A=m:a?A=a[0]:A=i.jsx(W,_({},x)),i.jsx(T,_({},N,{children:A}))}),qt=Ht,Jt={display:"inline-flex",borderRadius:2,border:"1px solid #eaeaea",marginBottom:8,marginRight:8,width:100,height:100,padding:4,boxSizing:"border-box"},Yt={display:"flex",minWidth:0,overflow:"hidden"},Vt={display:"block",width:"auto",height:"100%"};function jr({onClick:e,className:r,isUploadable:t}){const o=()=>Math.floor(Math.random()*12)+1;let a=localStorage.getItem("imageIndex");a||(a=o(),localStorage.setItem("imageIndex",a));const l=`/images/profile_images/profile_image_${a}.svg`,[c,v]=p.useState([]),{getRootProps:u,getInputProps:d}=xr({accept:{"image/*":[]},onDrop:b=>{v(b.map(S=>Object.assign(S,{preview:URL.createObjectURL(S)})))}});c.map(b=>i.jsx("div",{style:Jt,children:i.jsx("div",{style:Yt,children:i.jsx("img",{src:b.preview,style:Vt,onLoad:()=>{URL.revokeObjectURL(b.preview)}})})},b.name));const m=c.map(b=>b.preview);return p.useEffect(()=>()=>c.forEach(b=>URL.revokeObjectURL(b.preview)),[]),t?i.jsx("div",{className:`${r} profile-photo ${m.length>0?"has-image":""} profile-upload-state`,...u(),style:{backgroundImage:`url(${m.join(", ")})`,backgroundPosition:"center",backgroundSize:"cover",backgroundRepeat:"no-repeat"},children:i.jsxs("div",{...u(),className:`dropzone uploaded-state ${m.length>0?"has-image":""}`,children:[i.jsx("input",{...d()}),i.jsx("p",{children:"Drag 'n' drop some files here, or click to select files"})]})}):i.jsx("div",{className:r,onClick:e,children:i.jsx(qt,{size:"lg",alt:"Remy Sharp",src:l})})}function Qt({text:e,links:r,children:t,customClassName:n}){const[o,a]=p.useState(!1);return i.jsx("div",{className:n,onMouseLeave:()=>a(!1),children:i.jsx("div",{className:"tooltip tooltip-content",children:t})})}function Xt({toggleSearch:e,isOpen:r}){const[t,n]=p.useState(!1),o=()=>{n(!t)};return i.jsxs("div",{className:"sidebar shadow-md",onMouseLeave:()=>{setTimeout(()=>{n(!1)},800)},children:[i.jsx(Kr,{}),i.jsx("div",{className:"sidebar-content",children:i.jsx("nav",{className:"nav-links",children:i.jsxs("ul",{children:[i.jsx("li",{className:`search-btn ${r?"open":""}`,children:i.jsx("button",{onClick:()=>{e()},children:i.jsx(ee,{icon:Ir})})}),i.jsx("li",{children:i.jsx(Z,{href:route("dashboard"),active:route().current("dashboard"),activeClass:"active-link",icon:Pr})}),i.jsx("li",{children:i.jsx(Z,{href:route("projects.index"),active:route().current("projects.*"),activeClass:"active-link",icon:ir})}),i.jsx("li",{children:i.jsx(Z,{href:"/social",icon:sr})}),i.jsx("li",{children:i.jsx(Z,{href:"/budget",icon:lr})}),i.jsx("li",{children:i.jsx(Z,{href:"/jobs",icon:cr})})]})})}),i.jsxs("div",{className:"sidebar-footer",children:[i.jsx(jr,{alt:"User's Profile",onClick:o}),t&&i.jsx(Qt,{customClassName:"account-tooltip",children:i.jsxs("ul",{children:[i.jsx(He,{href:route("profile.edit"),as:"button",children:"Account Settings"}),i.jsx(He,{method:"post",href:route("logout"),as:"button",children:"Log Out"})]})})]})]})}const Zt=({isOpen:e,onClose:r})=>{const t=o=>{o.key==="Escape"&&e&&r()};p.useEffect(()=>(document.addEventListener("keydown",t),()=>{document.removeEventListener("keydown",t)}),[e,r]);const n=o=>{e&&(o.target.closest(".overlay")?r():(o.preventDefault(),o.stopPropagation()))};return i.jsx("div",{className:"relative",children:i.jsxs("div",{className:`search z-40 ${e?"open":""}`,children:[i.jsx("div",{className:`overlay ${e?"open":""}`,onClick:n}),i.jsx("div",{className:`search-content ${e?"open":""}`,children:i.jsxs("div",{className:`input-container ${e?"open":""}`,children:[i.jsx("button",{className:"search-filter",children:i.jsx(ee,{icon:_r,className:"filter-icon"})}),i.jsx("input",{type:"text",placeholder:"Search..."}),i.jsx("button",{className:"search-button",children:i.jsx(ee,{icon:Cr})})]})})]})})},en=Zt;function rn({project:e,backgroundImage:r,size:t,showGreeting:n,showProfilePhoto:o}){const{auth:a}=Fr().props,l="/images/background_images/bg_image_%d.jpg",c=16,u=(()=>new Date().getDay()%c+1)(),d=r||l.replace("%d",u),m=new Date,b=m.toLocaleDateString("en-US",{weekday:"short"}),S=m.toLocaleDateString("en-US",{month:"long"}),I=m.getFullYear(),D=m.getDate(),P=D+(D%10===1&&D!==11?"st":D%10===2&&D!==12?"nd":D%10===3&&D!==13?"rd":"th"),M=`${b}, ${S} ${P} ${I}`,C=(()=>{const A=new Date().getHours();return A>=0&&A<12?"Good Morning":A>=12&&A<18?"Good Afternoon":"Good Evening"})();let B={};return i.jsxs("div",{className:`banner relative ${t}-height`,style:{backgroundImage:`url(${d})`},children:[i.jsx("div",{className:"overlay"}),i.jsxs("div",{className:"banner-content flex flex-col h-full",style:B,children:[i.jsxs("div",{className:"top-bar flex flex-row justify-between w-full",children:[i.jsx("div",{className:"flex left-content justify-start",children:n&&i.jsx("div",{className:"greeting",children:i.jsxs("h1",{children:[C," ",a.user.first_name," ",a.user.last_name]})})}),i.jsxs("div",{className:"right-content",children:[i.jsx("p",{className:"text-lg font-semibold",children:M}),i.jsx(Br,{children:"Your Subscription"})]})]}),t==="banner-photo"&&o&&i.jsxs("div",{className:"banner-footer -mb-[5rem]",children:[i.jsxs("div",{className:"flex left-content",children:[i.jsx(jr,{alt:"User Profile",width:200,height:200,isUploadable:!0}),i.jsx("div",{className:"w-4/6 mantra-text",children:i.jsx("p",{children:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque quaerat et cupiditate cumque, fugiat voluptatibus dolorum pariatur tenetur?"})})]}),i.jsx("div",{className:"w-full -mb-20 justify-end pr-[10rem] right-content",children:i.jsxs("ul",{className:"flex gap-20 text-center dashboard-navlinks",children:[i.jsxs("li",{children:[i.jsx(X,{icon:zr,size:"medium"}),i.jsx("span",{className:"mt-4 block",children:"Tasks"})]}),i.jsxs("li",{children:[i.jsx(X,{href:route("projects.index"),active:route().current("projects.index"),activeClass:"active-link",icon:ir,size:"medium"}),i.jsx("span",{className:"mt-4 block",children:"Projects"})]}),i.jsxs("li",{children:[i.jsx(X,{icon:sr,to:"/settings",size:"medium"}),i.jsx("span",{className:"mt-4 block",children:"Social"})]}),i.jsxs("li",{children:[i.jsx(X,{icon:lr,to:"/settings",size:"medium"}),i.jsx("span",{className:"mt-4 block",children:"Budget"})]}),i.jsxs("li",{children:[i.jsx(X,{icon:cr,to:"/settings",size:"medium"}),i.jsx("span",{className:"mt-4 block",children:"Jobs"})]})]})})]}),t==="small-banner-buttons"&&i.jsx(Se,{project:e}),t==="chapter-banner"&&i.jsx("div",{className:"banner-footer",children:i.jsx(Se,{project:e})}),t==="page-banner"&&i.jsx(Se,{project:e})]})]})}function un({user:e,bannerProps:r,children:t,project:n}){const[o,a]=p.useState(!1),l=()=>{a(!o)},c=()=>{a(!1)};return i.jsxs("div",{className:"min-h-screen tertiary-color relative",children:[i.jsxs("div",{id:"surface-layer",className:"absolute z-50 w-full",children:[i.jsx(en,{isOpen:o,onClose:c}),t.surface,i.jsx(Xt,{toggleSearch:l,isOpen:o,closeSearch:c})]}),i.jsxs("main",{className:"flex flex-col w-full h-screen overflow-hidden",children:[i.jsx(rn,{project:n,...r}),i.jsx("div",{className:"portal-body w-full h-full py-8 pl-[14rem] pr-[8.5rem]",children:t.portalBody})]})]})}export{un as A,rn as B,Z as N};
