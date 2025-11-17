(function(p,f){typeof exports=="object"&&typeof module<"u"?f(exports):typeof define=="function"&&define.amd?define(["exports"],f):(p=typeof globalThis<"u"?globalThis:p||self,f(p.TimelineView={}))})(this,(function(p){"use strict";const f=globalThis,L=f.ShadowRoot&&(f.ShadyCSS===void 0||f.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,j=Symbol(),J=new WeakMap;let K=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==j)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(L&&e===void 0){const i=t!==void 0&&t.length===1;i&&(e=J.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&J.set(t,e))}return e}toString(){return this.cssText}};const le=s=>new K(typeof s=="string"?s:s+"",void 0,j),he=(s,...e)=>{const t=s.length===1?s[0]:e.reduce(((i,r,n)=>i+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+s[n+1]),s[0]);return new K(t,s,j)},ce=(s,e)=>{if(L)s.adoptedStyleSheets=e.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet));else for(const t of e){const i=document.createElement("style"),r=f.litNonce;r!==void 0&&i.setAttribute("nonce",r),i.textContent=t.cssText,s.appendChild(i)}},X=L?s=>s:s=>s instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return le(t)})(s):s;const{is:de,defineProperty:me,getOwnPropertyDescriptor:pe,getOwnPropertyNames:ue,getOwnPropertySymbols:fe,getPrototypeOf:ge}=Object,N=globalThis,Z=N.trustedTypes,$e=Z?Z.emptyScript:"",ve=N.reactiveElementPolyfillSupport,E=(s,e)=>s,M={toAttribute(s,e){switch(e){case Boolean:s=s?$e:null;break;case Object:case Array:s=s==null?s:JSON.stringify(s)}return s},fromAttribute(s,e){let t=s;switch(e){case Boolean:t=s!==null;break;case Number:t=s===null?null:Number(s);break;case Object:case Array:try{t=JSON.parse(s)}catch{t=null}}return t}},D=(s,e)=>!de(s,e),G={attribute:!0,type:String,converter:M,reflect:!1,useDefault:!1,hasChanged:D};Symbol.metadata??=Symbol("metadata"),N.litPropertyMetadata??=new WeakMap;let k=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=G){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),r=this.getPropertyDescriptor(e,i,t);r!==void 0&&me(this.prototype,e,r)}}static getPropertyDescriptor(e,t,i){const{get:r,set:n}=pe(this.prototype,e)??{get(){return this[t]},set(o){this[t]=o}};return{get:r,set(o){const l=r?.call(this);n?.call(this,o),this.requestUpdate(e,l,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??G}static _$Ei(){if(this.hasOwnProperty(E("elementProperties")))return;const e=ge(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(E("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(E("properties"))){const t=this.properties,i=[...ue(t),...fe(t)];for(const r of i)this.createProperty(r,t[r])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[i,r]of t)this.elementProperties.set(i,r)}this._$Eh=new Map;for(const[t,i]of this.elementProperties){const r=this._$Eu(t,i);r!==void 0&&this._$Eh.set(r,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const r of i)t.unshift(X(r))}else e!==void 0&&t.push(X(e));return t}static _$Eu(e,t){const i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((e=>this.enableUpdating=e)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((e=>e(this)))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ce(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((e=>e.hostConnected?.()))}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach((e=>e.hostDisconnected?.()))}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){const i=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,i);if(r!==void 0&&i.reflect===!0){const n=(i.converter?.toAttribute!==void 0?i.converter:M).toAttribute(t,i.type);this._$Em=e,n==null?this.removeAttribute(r):this.setAttribute(r,n),this._$Em=null}}_$AK(e,t){const i=this.constructor,r=i._$Eh.get(e);if(r!==void 0&&this._$Em!==r){const n=i.getPropertyOptions(r),o=typeof n.converter=="function"?{fromAttribute:n.converter}:n.converter?.fromAttribute!==void 0?n.converter:M;this._$Em=r;const l=o.fromAttribute(t,n.type);this[r]=l??this._$Ej?.get(r)??l,this._$Em=null}}requestUpdate(e,t,i){if(e!==void 0){const r=this.constructor,n=this[e];if(i??=r.getPropertyOptions(e),!((i.hasChanged??D)(n,t)||i.useDefault&&i.reflect&&n===this._$Ej?.get(e)&&!this.hasAttribute(r._$Eu(e,i))))return;this.C(e,t,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:r,wrapped:n},o){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,o??t??this[e]),n!==!0||o!==void 0)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),r===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[r,n]of this._$Ep)this[r]=n;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[r,n]of i){const{wrapped:o}=n,l=this[r];o!==!0||this._$AL.has(r)||l===void 0||this.C(r,void 0,n,l)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach((i=>i.hostUpdate?.())),this.update(t)):this._$EM()}catch(i){throw e=!1,this._$EM(),i}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach((t=>t.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach((t=>this._$ET(t,this[t]))),this._$EM()}updated(e){}firstUpdated(e){}};k.elementStyles=[],k.shadowRootOptions={mode:"open"},k[E("elementProperties")]=new Map,k[E("finalized")]=new Map,ve?.({ReactiveElement:k}),(N.reactiveElementVersions??=[]).push("2.1.1");const I=globalThis,H=I.trustedTypes,Q=H?H.createPolicy("lit-html",{createHTML:s=>s}):void 0,Y="$lit$",g=`lit$${Math.random().toFixed(9).slice(2)}$`,ee="?"+g,be=`<${ee}>`,b=document,S=()=>b.createComment(""),C=s=>s===null||typeof s!="object"&&typeof s!="function",B=Array.isArray,_e=s=>B(s)||typeof s?.[Symbol.iterator]=="function",V=`[ 	
\f\r]`,T=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,te=/-->/g,ie=/>/g,_=RegExp(`>|${V}(?:([^\\s"'>=/]+)(${V}*=${V}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),re=/'/g,se=/"/g,ne=/^(?:script|style|textarea|title)$/i,ye=s=>(e,...t)=>({_$litType$:s,strings:e,values:t}),$=ye(1),A=Symbol.for("lit-noChange"),c=Symbol.for("lit-nothing"),oe=new WeakMap,y=b.createTreeWalker(b,129);function ae(s,e){if(!B(s)||!s.hasOwnProperty("raw"))throw Error("invalid template strings array");return Q!==void 0?Q.createHTML(e):e}const ke=(s,e)=>{const t=s.length-1,i=[];let r,n=e===2?"<svg>":e===3?"<math>":"",o=T;for(let l=0;l<t;l++){const a=s[l];let d,m,h=-1,u=0;for(;u<a.length&&(o.lastIndex=u,m=o.exec(a),m!==null);)u=o.lastIndex,o===T?m[1]==="!--"?o=te:m[1]!==void 0?o=ie:m[2]!==void 0?(ne.test(m[2])&&(r=RegExp("</"+m[2],"g")),o=_):m[3]!==void 0&&(o=_):o===_?m[0]===">"?(o=r??T,h=-1):m[1]===void 0?h=-2:(h=o.lastIndex-m[2].length,d=m[1],o=m[3]===void 0?_:m[3]==='"'?se:re):o===se||o===re?o=_:o===te||o===ie?o=T:(o=_,r=void 0);const v=o===_&&s[l+1].startsWith("/>")?" ":"";n+=o===T?a+be:h>=0?(i.push(d),a.slice(0,h)+Y+a.slice(h)+g+v):a+g+(h===-2?l:v)}return[ae(s,n+(s[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),i]};class P{constructor({strings:e,_$litType$:t},i){let r;this.parts=[];let n=0,o=0;const l=e.length-1,a=this.parts,[d,m]=ke(e,t);if(this.el=P.createElement(d,i),y.currentNode=this.el.content,t===2||t===3){const h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(r=y.nextNode())!==null&&a.length<l;){if(r.nodeType===1){if(r.hasAttributes())for(const h of r.getAttributeNames())if(h.endsWith(Y)){const u=m[o++],v=r.getAttribute(h).split(g),z=/([.?@])?(.*)/.exec(u);a.push({type:1,index:n,name:z[2],strings:v,ctor:z[1]==="."?xe:z[1]==="?"?we:z[1]==="@"?Ee:R}),r.removeAttribute(h)}else h.startsWith(g)&&(a.push({type:6,index:n}),r.removeAttribute(h));if(ne.test(r.tagName)){const h=r.textContent.split(g),u=h.length-1;if(u>0){r.textContent=H?H.emptyScript:"";for(let v=0;v<u;v++)r.append(h[v],S()),y.nextNode(),a.push({type:2,index:++n});r.append(h[u],S())}}}else if(r.nodeType===8)if(r.data===ee)a.push({type:2,index:n});else{let h=-1;for(;(h=r.data.indexOf(g,h+1))!==-1;)a.push({type:7,index:n}),h+=g.length-1}n++}}static createElement(e,t){const i=b.createElement("template");return i.innerHTML=e,i}}function x(s,e,t=s,i){if(e===A)return e;let r=i!==void 0?t._$Co?.[i]:t._$Cl;const n=C(e)?void 0:e._$litDirective$;return r?.constructor!==n&&(r?._$AO?.(!1),n===void 0?r=void 0:(r=new n(s),r._$AT(s,t,i)),i!==void 0?(t._$Co??=[])[i]=r:t._$Cl=r),r!==void 0&&(e=x(s,r._$AS(s,e.values),r,i)),e}class Ae{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,r=(e?.creationScope??b).importNode(t,!0);y.currentNode=r;let n=y.nextNode(),o=0,l=0,a=i[0];for(;a!==void 0;){if(o===a.index){let d;a.type===2?d=new O(n,n.nextSibling,this,e):a.type===1?d=new a.ctor(n,a.name,a.strings,this,e):a.type===6&&(d=new Se(n,this,e)),this._$AV.push(d),a=i[++l]}o!==a?.index&&(n=y.nextNode(),o++)}return y.currentNode=b,r}p(e){let t=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class O{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,r){this.type=2,this._$AH=c,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=x(this,e,t),C(e)?e===c||e==null||e===""?(this._$AH!==c&&this._$AR(),this._$AH=c):e!==this._$AH&&e!==A&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):_e(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==c&&C(this._$AH)?this._$AA.nextSibling.data=e:this.T(b.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:i}=e,r=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=P.createElement(ae(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===r)this._$AH.p(t);else{const n=new Ae(r,this),o=n.u(this.options);n.p(t),this.T(o),this._$AH=n}}_$AC(e){let t=oe.get(e.strings);return t===void 0&&oe.set(e.strings,t=new P(e)),t}k(e){B(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,r=0;for(const n of e)r===t.length?t.push(i=new O(this.O(S()),this.O(S()),this,this.options)):i=t[r],i._$AI(n),r++;r<t.length&&(this._$AR(i&&i._$AB.nextSibling,r),t.length=r)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const i=e.nextSibling;e.remove(),e=i}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}}class R{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,r,n){this.type=1,this._$AH=c,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=n,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=c}_$AI(e,t=this,i,r){const n=this.strings;let o=!1;if(n===void 0)e=x(this,e,t,0),o=!C(e)||e!==this._$AH&&e!==A,o&&(this._$AH=e);else{const l=e;let a,d;for(e=n[0],a=0;a<n.length-1;a++)d=x(this,l[i+a],t,a),d===A&&(d=this._$AH[a]),o||=!C(d)||d!==this._$AH[a],d===c?e=c:e!==c&&(e+=(d??"")+n[a+1]),this._$AH[a]=d}o&&!r&&this.j(e)}j(e){e===c?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class xe extends R{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===c?void 0:e}}class we extends R{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==c)}}class Ee extends R{constructor(e,t,i,r,n){super(e,t,i,r,n),this.type=5}_$AI(e,t=this){if((e=x(this,e,t,0)??c)===A)return;const i=this._$AH,r=e===c&&i!==c||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,n=e!==c&&(i===c||r);r&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class Se{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){x(this,e)}}const Ce=I.litHtmlPolyfillSupport;Ce?.(P,O),(I.litHtmlVersions??=[]).push("3.3.1");const Te=(s,e,t)=>{const i=t?.renderBefore??e;let r=i._$litPart$;if(r===void 0){const n=t?.renderBefore??null;i._$litPart$=r=new O(e.insertBefore(S(),n),n,void 0,t??{})}return r._$AI(s),r};const q=globalThis;class U extends k{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Te(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return A}}U._$litElement$=!0,U.finalized=!0,q.litElementHydrateSupport?.({LitElement:U});const Pe=q.litElementPolyfillSupport;Pe?.({LitElement:U}),(q.litElementVersions??=[]).push("4.2.1");const Oe=s=>(e,t)=>{t!==void 0?t.addInitializer((()=>{customElements.define(s,e)})):customElements.define(s,e)};const Ue={attribute:!0,type:String,converter:M,reflect:!1,hasChanged:D},Ne=(s=Ue,e,t)=>{const{kind:i,metadata:r}=t;let n=globalThis.litPropertyMetadata.get(r);if(n===void 0&&globalThis.litPropertyMetadata.set(r,n=new Map),i==="setter"&&((s=Object.create(s)).wrapped=!0),n.set(t.name,s),i==="accessor"){const{name:o}=t;return{set(l){const a=e.get.call(this);e.set.call(this,l),this.requestUpdate(o,a,s)},init(l){return l!==void 0&&this.C(o,void 0,s,l),l}}}if(i==="setter"){const{name:o}=t;return function(l){const a=this[o];e.call(this,l),this.requestUpdate(o,a,s)}}throw Error("Unsupported decorator location: "+i)};function W(s){return(e,t)=>typeof t=="object"?Ne(s,e,t):((i,r,n)=>{const o=r.hasOwnProperty(n);return r.constructor.createProperty(n,i),o?Object.getOwnPropertyDescriptor(r,n):void 0})(s,e,t)}function F(s){return W({...s,state:!0,attribute:!1})}const Me=he`
  :host {
    display: block;
    --timeline-font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    
    --timeline-text-color: #374151;
    --timeline-text-color-dark: #e5e7eb;
    --timeline-line-color: #e5e7eb;
    --timeline-line-color-dark: #4b5563;
    --timeline-bg-color: transparent;
    --timeline-bg-color-hover: #f9fafb;
    --timeline-bg-color-dark: transparent;
    --timeline-bg-color-hover-dark: #1f2937;
    --timeline-marker-bg: #fff;
    --timeline-marker-bg-dark: #374151;
    --timeline-marker-border: #9ca3af;
    --timeline-marker-border-dark: #6b7280;
    --timeline-marker-active-bg: #6366f1;
    --timeline-marker-active-bg-dark: #818cf8;
    --timeline-title-color: #111827;
    --timeline-title-color-dark: #f3f4f6;
    --timeline-title-hover-color: #6366f1;
    --timeline-title-hover-color-dark: #818cf8;
    --timeline-date-color: #6b7280;
    --timeline-date-color-dark: #9ca3af;
    --timeline-link-color: #6366f1;
    --timeline-link-color-dark: #818cf8;
    --timeline-link-hover-color: #4f46e5;
    --timeline-link-hover-color-dark: #a5b4fc;
    --timeline-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    --timeline-shadow-dark: 0 1px 2px rgba(0, 0, 0, 0.2);
    --timeline-marker-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
    --timeline-marker-shadow-dark: 0 0 0 3px rgba(129, 140, 248, 0.15);
    --timeline-empty-color: #9ca3af;
    --timeline-empty-color-dark: #6b7280;
    
    font-family: var(--timeline-font-family);
    color: var(--timeline-text-color);
    font-size: 14px;
    line-height: 1.6;
  }

  .timeline-header {
    margin-bottom: 24px;
    padding-left: 36px;
  }

  .timeline-header-title {
    font-size: 18px;
    font-weight: 600;
    color: var(--timeline-text-color);
    margin: 0;
  }

  .timeline {
    position: relative;
    padding: 4px 0;
  }

  .timeline::before {
    content: '';
    position: absolute;
    left: 6px;
    top: 0;
    bottom: 0;
    width: 1px;
    background: var(--timeline-line-color);
  }

  .timeline-item {
    position: relative;
    padding-left: 28px;
    padding-bottom: 20px;
  }

  .timeline-item:last-child {
    padding-bottom: 0;
  }

  .timeline-marker {
    position: absolute;
    left: 0;
    top: 4px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: var(--timeline-marker-bg);
    border: 2px solid var(--timeline-marker-border);
    z-index: 2;
    transition: all 0.2s ease;
    box-sizing: border-box;
  }

  .timeline-marker.active {
    background: var(--timeline-marker-active-bg);
    border-color: var(--timeline-marker-active-bg);
    box-shadow: var(--timeline-marker-shadow);
  }

  .timeline-item:hover .timeline-marker {
    border-color: var(--timeline-title-hover-color);
  }

  .timeline-item:hover .timeline-marker.active {
    box-shadow: var(--timeline-marker-shadow);
  }

  .timeline-content {
    background: transparent;
    border: none;
    border-radius: 4px;
    padding: 12px 14px;
    transition: background 0.2s ease;
    display: flex;
    gap: 12px;
    align-items: flex-start;
    box-shadow: none;
  }

  .timeline-item.has-image .timeline-content {
    padding: 12px;
  }

  .timeline-item:hover .timeline-content {
    background: var(--timeline-bg-color-hover);
  }

  .timeline-image-wrapper {
    flex-shrink: 0;
    width: 120px;
    min-width: 120px;
    overflow: hidden;
    border-radius: 4px;
    background: transparent;
  }

  .timeline-image {
    width: 100%;
    height: 100%;
    min-height: 80px;
    max-height: 120px;
    object-fit: cover;
    display: block;
    border-radius: 4px;
    background: transparent;
    border: none;
    outline: none;
  }

  .timeline-content-inner {
    flex: 1;
    min-width: 0;
  }

  .timeline-date {
    font-size: 12px;
    color: var(--timeline-date-color);
    font-weight: 400;
    margin-bottom: 6px;
    letter-spacing: 0.01em;
  }

  .timeline-title {
    font-size: 15px;
    font-weight: 500;
    color: var(--timeline-title-color);
    margin: 0 0 6px 0;
    line-height: 1.5;
    transition: color 0.2s ease;
  }

  .timeline-item:hover .timeline-title {
    color: var(--timeline-title-hover-color);
  }

  .timeline-description {
    font-size: 13px;
    color: #6b7280;
    line-height: 1.6;
    transition: color 0.3s ease;
  }

  .timeline-loading,
  .timeline-empty {
    padding: 24px;
    text-align: center;
    color: var(--timeline-empty-color);
  }

  .timeline-link {
    margin-top: 8px;
  }

  .timeline-link a {
    font-size: 13px;
    color: var(--timeline-link-color);
    text-decoration: none;
    transition: color 0.2s ease;
  }

  .timeline-link a:hover {
    color: var(--timeline-link-hover-color);
    text-decoration: underline;
  }

  /* 暗色主题 - 通过类名控制 */
  :host .timeline.dark {
    color: var(--timeline-text-color-dark);
  }

  :host .timeline.dark .timeline::before {
    background: var(--timeline-line-color-dark);
  }

  :host .timeline.dark .timeline-content {
    background: transparent;
  }

  :host .timeline.dark .timeline-item:hover .timeline-content {
    background: var(--timeline-bg-color-hover-dark);
    box-shadow: var(--timeline-shadow-dark);
  }

  :host .timeline.dark .timeline-title {
    color: var(--timeline-title-color-dark);
  }

  :host .timeline.dark .timeline-item:hover .timeline-title {
    color: var(--timeline-title-hover-color-dark);
  }

  :host .timeline.dark .timeline-date {
    color: var(--timeline-date-color-dark);
  }

  :host .timeline.dark .timeline-link a {
    color: var(--timeline-link-color-dark);
  }

  :host .timeline.dark .timeline-link a:hover {
    color: var(--timeline-link-hover-color-dark);
  }

  :host .timeline.dark .timeline-marker {
    background: var(--timeline-marker-bg-dark);
    border-color: var(--timeline-marker-border-dark);
  }

  :host .timeline.dark .timeline-marker.active {
    background: var(--timeline-marker-active-bg-dark);
    border-color: var(--timeline-marker-active-bg-dark);
    box-shadow: var(--timeline-marker-shadow-dark);
  }

  :host .timeline.dark .timeline-item:hover .timeline-marker.active {
    box-shadow: var(--timeline-marker-shadow-hover-dark);
  }

  :host .timeline.dark .timeline-loading,
  :host .timeline.dark .timeline-empty {
    color: var(--timeline-empty-color-dark);
  }

  /* 水平布局 */
  :host([orientation="horizontal"]) .timeline {
    display: flex;
    padding: 0 4px;
  }

  :host([orientation="horizontal"]) .timeline::before {
    left: 0;
    right: 0;
    top: 6px;
    bottom: auto;
    width: auto;
    height: 1px;
  }

  :host([orientation="horizontal"]) .timeline-item {
    flex: 1;
    padding-left: 0;
    padding-top: 28px;
    padding-bottom: 0;
    margin-right: 12px;
  }

  :host([orientation="horizontal"]) .timeline-item:last-child {
    margin-right: 0;
  }

  :host([orientation="horizontal"]) .timeline-marker {
    left: 50%;
    top: 0;
    transform: translateX(-50%);
  }

  :host([orientation="horizontal"]) .timeline-item:hover .timeline-marker {
    transform: translateX(-50%);
  }
`;function He(){const s=["html.dark:not([data-color-scheme='light']):not(.light):not([class*='light'])","html[class~='dark']:not([data-color-scheme='light']):not(.light):not([class*='light'])","html[class*='dark']:not([data-color-scheme='light']):not(.light):not([class*='light'])","html[data-color-scheme='dark']:not([data-color-scheme='light'])","html[data-theme='dark']:not([data-theme='light'])","html[theme='dark']:not([theme='light'])","[data-color-scheme='dark']:not([data-color-scheme='light'])","[data-theme='dark']:not([data-theme='light'])","[theme='dark']:not([theme='light'])"],e=document.documentElement,t=document.body;return s.some(r=>{try{return e.matches(r)||t.matches(r)}catch{return!1}})||e.classList.contains("dark")||e.getAttribute("data-theme")==="dark"||e.getAttribute("data-color-scheme")==="dark"||e.getAttribute("theme")==="dark"}function Re(s){const e=new MutationObserver(s);return e.observe(document.documentElement,{attributes:!0,attributeFilter:["class","data-theme","data-color-scheme","theme"]}),e.observe(document.body,{attributes:!0,attributeFilter:["class","data-theme","data-color-scheme","theme"]}),e}function ze(){return window.__TIMELINE_API_BASE__||"/apis/api.timeline.xhhao.com/v1alpha1/timelines"}async function Le(s){if(!s)return[];const t=`${ze()}?group=${encodeURIComponent(s)}`,i=await fetch(t);if(!i.ok)throw new Error(`Failed to fetch timelines: ${i.statusText}`);return((await i.json()).items||[]).map(o=>({date:o.spec?.date,displayName:o.spec?.displayName,image:o.spec?.image,active:o.spec?.active||!1,relatedLinks:o.spec?.relatedLinks})).sort((o,l)=>o.date?l.date?l.date.localeCompare(o.date):-1:1)}var je=Object.defineProperty,De=Object.getOwnPropertyDescriptor,w=(s,e,t,i)=>{for(var r=i>1?void 0:i?De(e,t):e,n=s.length-1,o;n>=0;n--)(o=s[n])&&(r=(i?o(e,t,r):o(r))||r);return i&&r&&je(e,t,r),r};p.Timeline=class extends U{constructor(){super(...arguments),this.groupName="",this.orientation="vertical",this.items=[],this.isLoading=!1,this.isDark=!1}connectedCallback(){super.connectedCallback(),this.detectTheme(),this.observeTheme(),this.groupName&&this.fetchTimelines()}disconnectedCallback(){super.disconnectedCallback(),this.themeObserver&&this.themeObserver.disconnect()}updated(e){super.updated(e),e.has("groupName")&&this.groupName&&this.fetchTimelines()}detectTheme(){this.isDark=He()}observeTheme(){this.themeObserver=Re(()=>{this.detectTheme()})}async fetchTimelines(){if(this.groupName){this.isLoading=!0;try{this.items=await Le(this.groupName)}catch(e){console.error("Error fetching timelines:",e),this.items=[]}finally{this.isLoading=!1}}}render(){return this.isLoading?$`
        <div class="timeline-loading">加载中...</div>
      `:this.items.length===0?$`
        <div class="timeline-empty">暂无时间轴数据</div>
      `:(this.orientation&&this.setAttribute("orientation",this.orientation),$`
      <div class="timeline ${this.isDark?"dark":""}">
        ${this.items.map(e=>$`
            <div class="timeline-item ${e.image?"has-image":""}">
              <div class="timeline-marker ${e.active?"active":""}"></div>
              <div class="timeline-content">
                ${e.image?$`
                  <div class="timeline-image-wrapper">
                    <img src="${e.image}" alt="${e.displayName||""}" class="timeline-image" />
                  </div>
                `:""}
                <div class="timeline-content-inner">
                  ${e.date?$`<div class="timeline-date">${e.date}</div>`:""}
                  ${e.displayName?$`<div class="timeline-title">${e.displayName}</div>`:""}
                  ${e.relatedLinks?$`
                    <div class="timeline-link">
                      <a href="${e.relatedLinks}" target="_blank" rel="noopener noreferrer">查看关联</a>
                    </div>
                  `:""}
                </div>
              </div>
            </div>
          `)}
      </div>
    `)}},p.Timeline.styles=Me,w([W({type:String,attribute:"group-name"})],p.Timeline.prototype,"groupName",2),w([W({type:String})],p.Timeline.prototype,"orientation",2),w([F()],p.Timeline.prototype,"items",2),w([F()],p.Timeline.prototype,"isLoading",2),w([F()],p.Timeline.prototype,"isDark",2),p.Timeline=w([Oe("timeline-view")],p.Timeline),Object.defineProperty(p,Symbol.toStringTag,{value:"Module"})}));
