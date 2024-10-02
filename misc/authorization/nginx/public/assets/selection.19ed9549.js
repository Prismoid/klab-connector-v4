import{f as Y,X as q,w as x,o as W,g as z,y as M,j as m,S as d,x as $,Y as k,Z as B}from"./index.4807e50e.js";import{v as F}from"./QBtn.a19a244d.js";import{b as j,a as _,h as I}from"./scroll.baa07e36.js";function N(e,o,r){let l;function i(){l!==void 0&&(q.remove(l),l=void 0)}return Y(()=>{e.value===!0&&i()}),{removeFromHistory:i,addToHistory(){l={condition:()=>r.value===!0,handler:o},q.add(l)}}}const Q={modelValue:{type:Boolean,default:null},"onUpdate:modelValue":[Function,Array]},ee=["before-show","show","before-hide","hide"];function oe({showing:e,canShow:o,hideOnRouteChange:r,handleShow:l,handleHide:i,processOnMount:p}){const s=z(),{props:n,emit:a,proxy:V}=s;let u;function R(t){e.value===!0?g(t):L(t)}function L(t){if(n.disable===!0||t!==void 0&&t.qAnchorHandled===!0||o!==void 0&&o(t)!==!0)return;const c=n["onUpdate:modelValue"]!==void 0;c===!0&&(a("update:modelValue",!0),u=t,M(()=>{u===t&&(u=void 0)})),(n.modelValue===null||c===!1)&&S(t)}function S(t){e.value!==!0&&(e.value=!0,a("before-show",t),l!==void 0?l(t):a("show",t))}function g(t){if(n.disable===!0)return;const c=n["onUpdate:modelValue"]!==void 0;c===!0&&(a("update:modelValue",!1),u=t,M(()=>{u===t&&(u=void 0)})),(n.modelValue===null||c===!1)&&E(t)}function E(t){e.value!==!1&&(e.value=!1,a("before-hide",t),i!==void 0?i(t):a("hide",t))}function P(t){n.disable===!0&&t===!0?n["onUpdate:modelValue"]!==void 0&&a("update:modelValue",!1):t===!0!==e.value&&(t===!0?S:E)(u)}x(()=>n.modelValue,P),r!==void 0&&F(s)===!0&&x(()=>V.$route.fullPath,()=>{r.value===!0&&e.value===!0&&g()}),p===!0&&W(()=>{P(n.modelValue)});const H={show:L,hide:g,toggle:R};return Object.assign(V,H),H}let v=0,h,b,w,T=!1,A,C,f;function K(e){O(e)&&$(e)}function O(e){if(e.target===document.body||e.target.classList.contains("q-layout__backdrop"))return!0;const o=k(e),r=e.shiftKey&&!e.deltaX,l=!r&&Math.abs(e.deltaX)<=Math.abs(e.deltaY),i=r||l?e.deltaY:e.deltaX;for(let p=0;p<o.length;p++){const s=o[p];if(I(s,l))return l?i<0&&s.scrollTop===0?!0:i>0&&s.scrollTop+s.clientHeight===s.scrollHeight:i<0&&s.scrollLeft===0?!0:i>0&&s.scrollLeft+s.clientWidth===s.scrollWidth}return!0}function U(e){e.target===document&&(document.scrollingElement.scrollTop=document.scrollingElement.scrollTop)}function y(e){T!==!0&&(T=!0,requestAnimationFrame(()=>{T=!1;const{height:o}=e.target,{clientHeight:r,scrollTop:l}=document.scrollingElement;(w===void 0||o!==window.innerHeight)&&(w=r-o,document.scrollingElement.scrollTop=l),l>w&&(document.scrollingElement.scrollTop-=Math.ceil((l-w)/8))}))}function X(e){const o=document.body,r=window.visualViewport!==void 0;if(e==="add"){const{overflowY:l,overflowX:i}=window.getComputedStyle(o);h=j(window),b=_(window),A=o.style.left,C=o.style.top,o.style.left=`-${h}px`,o.style.top=`-${b}px`,i!=="hidden"&&(i==="scroll"||o.scrollWidth>window.innerWidth)&&o.classList.add("q-body--force-scrollbar-x"),l!=="hidden"&&(l==="scroll"||o.scrollHeight>window.innerHeight)&&o.classList.add("q-body--force-scrollbar-y"),o.classList.add("q-body--prevent-scroll"),document.qScrollPrevented=!0,m.is.ios===!0&&(r===!0?(window.scrollTo(0,0),window.visualViewport.addEventListener("resize",y,d.passiveCapture),window.visualViewport.addEventListener("scroll",y,d.passiveCapture),window.scrollTo(0,0)):window.addEventListener("scroll",U,d.passiveCapture))}m.is.desktop===!0&&m.is.mac===!0&&window[`${e}EventListener`]("wheel",K,d.notPassive),e==="remove"&&(m.is.ios===!0&&(r===!0?(window.visualViewport.removeEventListener("resize",y,d.passiveCapture),window.visualViewport.removeEventListener("scroll",y,d.passiveCapture)):window.removeEventListener("scroll",U,d.passiveCapture)),o.classList.remove("q-body--prevent-scroll"),o.classList.remove("q-body--force-scrollbar-x"),o.classList.remove("q-body--force-scrollbar-y"),document.qScrollPrevented=!1,o.style.left=A,o.style.top=C,window.scrollTo(h,b),w=void 0)}function Z(e){let o="add";if(e===!0){if(v++,f!==void 0){clearTimeout(f),f=void 0;return}if(v>1)return}else{if(v===0||(v--,v>0))return;if(o="remove",m.is.ios===!0&&m.is.nativeMobile===!0){clearTimeout(f),f=setTimeout(()=>{X(o),f=void 0},100);return}}X(o)}function te(){let e;return{preventBodyScroll(o){o!==e&&(e!==void 0||o===!0)&&(e=o,Z(o))}}}function le(){let e;return Y(()=>{clearTimeout(e)}),{registerTimeout(o,r){clearTimeout(e),e=setTimeout(o,r)},removeTimeout(){clearTimeout(e)}}}function re(){if(window.getSelection!==void 0){const e=window.getSelection();e.empty!==void 0?e.empty():e.removeAllRanges!==void 0&&(e.removeAllRanges(),B.is.mobile!==!0&&e.addRange(document.createRange()))}else document.selection!==void 0&&document.selection.empty()}export{ee as a,le as b,re as c,oe as d,N as e,te as f,Q as u};
