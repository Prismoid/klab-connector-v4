var ne=Object.defineProperty,le=Object.defineProperties;var re=Object.getOwnPropertyDescriptors;var Y=Object.getOwnPropertySymbols;var ue=Object.prototype.hasOwnProperty,ie=Object.prototype.propertyIsEnumerable;var G=(e,g,M)=>g in e?ne(e,g,{enumerable:!0,configurable:!0,writable:!0,value:M}):e[g]=M,E=(e,g)=>{for(var M in g||(g={}))ue.call(g,M)&&G(e,M,g[M]);if(Y)for(var M of Y(g))ie.call(g,M)&&G(e,M,g[M]);return e},$=(e,g)=>le(e,re(g));import{u as oe,a as se,b as ce,c as fe,d as de,e as ge,f as J,g as me}from"./use-key-composition.8087b535.js";import{r as X,w as I,y as K,a4 as ve,c as R,f as he,o as ke,h as q,s as p,g as Me}from"./index.4807e50e.js";import{c as xe}from"./use-align.4d382a04.js";import{a as we}from"./QCard.a6b5ad13.js";const ee={date:"####/##/##",datetime:"####/##/## ##:##",time:"##:##",fulltime:"##:##:##",phone:"(###) ### - ####",card:"#### #### #### ####"},U={"#":{pattern:"[\\d]",negate:"[^\\d]"},S:{pattern:"[a-zA-Z]",negate:"[^a-zA-Z]"},N:{pattern:"[0-9a-zA-Z]",negate:"[^0-9a-zA-Z]"},A:{pattern:"[a-zA-Z]",negate:"[^a-zA-Z]",transform:e=>e.toLocaleUpperCase()},a:{pattern:"[a-zA-Z]",negate:"[^a-zA-Z]",transform:e=>e.toLocaleLowerCase()},X:{pattern:"[0-9a-zA-Z]",negate:"[^0-9a-zA-Z]",transform:e=>e.toLocaleUpperCase()},x:{pattern:"[0-9a-zA-Z]",negate:"[^0-9a-zA-Z]",transform:e=>e.toLocaleLowerCase()}},ae=Object.keys(U);ae.forEach(e=>{U[e].regex=new RegExp(U[e].pattern)});const ye=new RegExp("\\\\([^.*+?^${}()|([\\]])|([.*+?^${}()|[\\]])|(["+ae.join("")+"])|(.)","g"),te=/[.*+?^${}()|[\]\\]/g,h=String.fromCharCode(1),Ce={mask:String,reverseFillMask:Boolean,fillMask:[Boolean,String],unmaskedValue:Boolean};function be(e,g,M,k){let c,x,A,S;const w=X(null),d=X(V());function H(){return e.autogrow===!0||["textarea","text","search","url","tel","password"].includes(e.type)}I(()=>e.type+e.autogrow,z),I(()=>e.mask,t=>{if(t!==void 0)N(d.value,!0);else{const n=F(d.value);z(),e.modelValue!==n&&g("update:modelValue",n)}}),I(()=>e.fillMask+e.reverseFillMask,()=>{w.value===!0&&N(d.value,!0)}),I(()=>e.unmaskedValue,()=>{w.value===!0&&N(d.value)});function V(){if(z(),w.value===!0){const t=D(F(e.modelValue));return e.fillMask!==!1?_(t):t}return e.modelValue}function j(t){if(t<c.length)return c.slice(-t);let n="",r=c;const u=r.indexOf(h);if(u>-1){for(let i=t-r.length;i>0;i--)n+=h;r=r.slice(0,u)+n+r.slice(u)}return r}function z(){if(w.value=e.mask!==void 0&&e.mask.length>0&&H(),w.value===!1){S=void 0,c="",x="";return}const t=ee[e.mask]===void 0?e.mask:ee[e.mask],n=typeof e.fillMask=="string"&&e.fillMask.length>0?e.fillMask.slice(0,1):"_",r=n.replace(te,"\\$&"),u=[],i=[],l=[];let f=e.reverseFillMask===!0,o="",m="";t.replace(ye,(y,a,v,B,P)=>{if(B!==void 0){const b=U[B];l.push(b),m=b.negate,f===!0&&(i.push("(?:"+m+"+)?("+b.pattern+"+)?(?:"+m+"+)?("+b.pattern+"+)?"),f=!1),i.push("(?:"+m+"+)?("+b.pattern+")?")}else if(v!==void 0)o="\\"+(v==="\\"?"":v),l.push(v),u.push("([^"+o+"]+)?"+o+"?");else{const b=a!==void 0?a:P;o=b==="\\"?"\\\\\\\\":b.replace(te,"\\\\$&"),l.push(b),u.push("([^"+o+"]+)?"+o+"?")}});const O=new RegExp("^"+u.join("")+"("+(o===""?".":"[^"+o+"]")+"+)?$"),Z=i.length-1,s=i.map((y,a)=>a===0&&e.reverseFillMask===!0?new RegExp("^"+r+"*"+y):a===Z?new RegExp("^"+y+"("+(m===""?".":m)+"+)?"+(e.reverseFillMask===!0?"$":r+"*")):new RegExp("^"+y));A=l,S=y=>{const a=O.exec(y);a!==null&&(y=a.slice(1).join(""));const v=[],B=s.length;for(let P=0,b=y;P<B;P++){const W=s[P].exec(b);if(W===null)break;b=b.slice(W.shift().length),v.push(...W)}return v.length>0?v.join(""):y},c=l.map(y=>typeof y=="string"?y:h).join(""),x=c.split(h).join(n)}function N(t,n,r){const u=k.value,i=u.selectionEnd,l=u.value.length-i,f=F(t);n===!0&&z();const o=D(f),m=e.fillMask!==!1?_(o):o,O=d.value!==m;u.value!==m&&(u.value=m),O===!0&&(d.value=m),document.activeElement===u&&K(()=>{if(m===x){const s=e.reverseFillMask===!0?x.length:0;u.setSelectionRange(s,s,"forward");return}if(r==="insertFromPaste"&&e.reverseFillMask!==!0){const s=i-1;C.right(u,s,s);return}if(["deleteContentBackward","deleteContentForward"].indexOf(r)>-1){const s=e.reverseFillMask===!0?i===0?m.length>o.length?1:0:Math.max(0,m.length-(m===x?0:Math.min(o.length,l)+1))+1:i;u.setSelectionRange(s,s,"forward");return}if(e.reverseFillMask===!0)if(O===!0){const s=Math.max(0,m.length-(m===x?0:Math.min(o.length,l+1)));s===1&&i===1?u.setSelectionRange(s,s,"forward"):C.rightReverse(u,s,s)}else{const s=m.length-l;u.setSelectionRange(s,s,"backward")}else if(O===!0){const s=Math.max(0,c.indexOf(h),Math.min(o.length,i)-1);C.right(u,s,s)}else{const s=i-1;C.right(u,s,s)}});const Z=e.unmaskedValue===!0?F(m):m;String(e.modelValue)!==Z&&M(Z,!0)}function Q(t,n,r){const u=D(F(t.value));n=Math.max(0,c.indexOf(h),Math.min(u.length,n)),t.setSelectionRange(n,r,"forward")}const C={left(t,n,r,u){const i=c.slice(n-1).indexOf(h)===-1;let l=Math.max(0,n-1);for(;l>=0;l--)if(c[l]===h){n=l,i===!0&&n++;break}if(l<0&&c[n]!==void 0&&c[n]!==h)return C.right(t,0,0);n>=0&&t.setSelectionRange(n,u===!0?r:n,"backward")},right(t,n,r,u){const i=t.value.length;let l=Math.min(i,r+1);for(;l<=i;l++)if(c[l]===h){r=l;break}else c[l-1]===h&&(r=l);if(l>i&&c[r-1]!==void 0&&c[r-1]!==h)return C.left(t,i,i);t.setSelectionRange(u?n:r,r,"forward")},leftReverse(t,n,r,u){const i=j(t.value.length);let l=Math.max(0,n-1);for(;l>=0;l--)if(i[l-1]===h){n=l;break}else if(i[l]===h&&(n=l,l===0))break;if(l<0&&i[n]!==void 0&&i[n]!==h)return C.rightReverse(t,0,0);n>=0&&t.setSelectionRange(n,u===!0?r:n,"backward")},rightReverse(t,n,r,u){const i=t.value.length,l=j(i),f=l.slice(0,r+1).indexOf(h)===-1;let o=Math.min(i,r+1);for(;o<=i;o++)if(l[o-1]===h){r=o,r>0&&f===!0&&r--;break}if(o>i&&l[r-1]!==void 0&&l[r-1]!==h)return C.leftReverse(t,i,i);t.setSelectionRange(u===!0?n:r,r,"forward")}};function L(t){if(ve(t)===!0)return;const n=k.value,r=n.selectionStart,u=n.selectionEnd;if(t.keyCode===37||t.keyCode===39){const i=C[(t.keyCode===39?"right":"left")+(e.reverseFillMask===!0?"Reverse":"")];t.preventDefault(),i(n,r,u,t.shiftKey)}else t.keyCode===8&&e.reverseFillMask!==!0&&r===u?C.left(n,r,u,!0):t.keyCode===46&&e.reverseFillMask===!0&&r===u&&C.rightReverse(n,r,u,!0)}function D(t){if(t==null||t==="")return"";if(e.reverseFillMask===!0)return T(t);const n=A;let r=0,u="";for(let i=0;i<n.length;i++){const l=t[r],f=n[i];if(typeof f=="string")u+=f,l===f&&r++;else if(l!==void 0&&f.regex.test(l))u+=f.transform!==void 0?f.transform(l):l,r++;else return u}return u}function T(t){const n=A,r=c.indexOf(h);let u=t.length-1,i="";for(let l=n.length-1;l>=0&&u>-1;l--){const f=n[l];let o=t[u];if(typeof f=="string")i=f+i,o===f&&u--;else if(o!==void 0&&f.regex.test(o))do i=(f.transform!==void 0?f.transform(o):o)+i,u--,o=t[u];while(r===l&&o!==void 0&&f.regex.test(o));else return i}return i}function F(t){return typeof t!="string"||S===void 0?typeof t=="number"?S(""+t):t:S(t)}function _(t){return x.length-t.length<=0?t:e.reverseFillMask===!0&&t.length>0?x.slice(0,-t.length)+t:t+x.slice(t.length)}return{innerValue:d,hasMask:w,moveCursorForPaste:Q,updateMaskValue:N,onMaskedKeydown:L}}function Fe(e,g){function M(){const k=e.modelValue;try{const c="DataTransfer"in window?new DataTransfer:"ClipboardEvent"in window?new ClipboardEvent("").clipboardData:void 0;return Object(k)===k&&("length"in k?Array.from(k):[k]).forEach(x=>{c.items.add(x)}),{files:c.files}}catch{return{files:void 0}}}return g===!0?R(()=>{if(e.type==="file")return M()}):R(M)}var Te=xe({name:"QInput",inheritAttrs:!1,props:$(E(E(E({},oe),Ce),se),{modelValue:{required:!1},shadowText:String,type:{type:String,default:"text"},debounce:[String,Number],autogrow:Boolean,inputClass:[Array,String,Object],inputStyle:[Array,String,Object]}),emits:[...ce,"paste","change"],setup(e,{emit:g,attrs:M}){const k={};let c=NaN,x,A,S,w;const d=X(null),H=fe(e),{innerValue:V,hasMask:j,moveCursorForPaste:z,updateMaskValue:N,onMaskedKeydown:Q}=be(e,g,f,d),C=Fe(e,!0),L=R(()=>J(V.value)),D=me(l),T=de(),F=R(()=>e.type==="textarea"||e.autogrow===!0),_=R(()=>F.value===!0||["text","search","url","tel","password"].includes(e.type)),t=R(()=>{const a=$(E({},T.splitAttrs.listeners.value),{onInput:l,onPaste:i,onChange:m,onBlur:O,onFocus:p});return a.onCompositionstart=a.onCompositionupdate=a.onCompositionend=D,j.value===!0&&(a.onKeydown=Q),e.autogrow===!0&&(a.onAnimationend=o),a}),n=R(()=>{const a=$(E({tabindex:0,"data-autofocus":e.autofocus===!0||void 0,rows:e.type==="textarea"?6:void 0,"aria-label":e.label,name:H.value},T.splitAttrs.attributes.value),{id:T.targetUid.value,maxlength:e.maxlength,disabled:e.disable===!0,readonly:e.readonly===!0});return F.value===!1&&(a.type=e.type),e.autogrow===!0&&(a.rows=1),a});I(()=>e.type,()=>{d.value&&(d.value.value=e.modelValue)}),I(()=>e.modelValue,a=>{if(j.value===!0){if(A===!0&&(A=!1,String(a)===c))return;N(a)}else V.value!==a&&(V.value=a,e.type==="number"&&k.hasOwnProperty("value")===!0&&(x===!0?x=!1:delete k.value));e.autogrow===!0&&K(o)}),I(()=>e.autogrow,a=>{a===!0?K(o):d.value!==null&&M.rows>0&&(d.value.style.height="auto")}),I(()=>e.dense,()=>{e.autogrow===!0&&K(o)});function r(){we(()=>{const a=document.activeElement;d.value!==null&&d.value!==a&&(a===null||a.id!==T.targetUid.value)&&d.value.focus({preventScroll:!0})})}function u(){d.value!==null&&d.value.select()}function i(a){if(j.value===!0&&e.reverseFillMask!==!0){const v=a.target;z(v,v.selectionStart,v.selectionEnd)}g("paste",a)}function l(a){if(!a||!a.target||a.target.composing===!0)return;if(e.type==="file"){g("update:modelValue",a.target.files);return}const v=a.target.value;if(j.value===!0)N(v,!1,a.inputType);else if(f(v),_.value===!0&&a.target===document.activeElement){const{selectionStart:B,selectionEnd:P}=a.target;B!==void 0&&P!==void 0&&K(()=>{a.target===document.activeElement&&v.indexOf(a.target.value)===0&&a.target.setSelectionRange(B,P)})}e.autogrow===!0&&o()}function f(a,v){w=()=>{e.type!=="number"&&k.hasOwnProperty("value")===!0&&delete k.value,e.modelValue!==a&&c!==a&&(v===!0&&(A=!0),g("update:modelValue",a),K(()=>{c===a&&(c=NaN)})),w=void 0},e.type==="number"&&(x=!0,k.value=a),e.debounce!==void 0?(clearTimeout(S),k.value=a,S=setTimeout(w,e.debounce)):w()}function o(){const a=d.value;if(a!==null){const v=a.parentNode.style;v.marginBottom=a.scrollHeight-1+"px",a.style.height="1px",a.style.height=a.scrollHeight+"px",v.marginBottom=""}}function m(a){D(a),clearTimeout(S),w!==void 0&&w(),g("change",a.target.value)}function O(a){a!==void 0&&p(a),clearTimeout(S),w!==void 0&&w(),x=!1,A=!1,delete k.value,e.type!=="file"&&setTimeout(()=>{d.value!==null&&(d.value.value=V.value!==void 0?V.value:"")})}function Z(){return k.hasOwnProperty("value")===!0?k.value:V.value!==void 0?V.value:""}he(()=>{O()}),ke(()=>{e.autogrow===!0&&o()}),Object.assign(T,{innerValue:V,fieldClass:R(()=>`q-${F.value===!0?"textarea":"input"}`+(e.autogrow===!0?" q-textarea--autogrow":"")),hasShadow:R(()=>e.type!=="file"&&typeof e.shadowText=="string"&&e.shadowText.length>0),inputRef:d,emitValue:f,hasValue:L,floatingLabel:R(()=>L.value===!0||J(e.displayValue)),getControl:()=>q(F.value===!0?"textarea":"input",E(E(E({ref:d,class:["q-field__native q-placeholder",e.inputClass],style:e.inputStyle},n.value),t.value),e.type!=="file"?{value:Z()}:C.value)),getShadowControl:()=>q("div",{class:"q-field__native q-field__shadow absolute-bottom no-pointer-events"+(F.value===!0?"":" text-no-wrap")},[q("span",{class:"invisible"},Z()),q("span",e.shadowText)])});const s=ge(T),y=Me();return Object.assign(y.proxy,{focus:r,select:u,getNativeElement:()=>d.value}),s}});export{Te as Q};
