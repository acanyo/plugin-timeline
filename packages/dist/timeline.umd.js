(function(p,f){typeof exports=="object"&&typeof module<"u"?f(exports):typeof define=="function"&&define.amd?define(["exports"],f):(p=typeof globalThis<"u"?globalThis:p||self,f(p.TimelineView={}))})(this,(function(p){"use strict";const f=globalThis,L=f.ShadowRoot&&(f.ShadyCSS===void 0||f.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,j=Symbol(),X=new WeakMap;let Y=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==j)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(L&&e===void 0){const i=t!==void 0&&t.length===1;i&&(e=X.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&X.set(t,e))}return e}toString(){return this.cssText}};const le=s=>new Y(typeof s=="string"?s:s+"",void 0,j),he=(s,...e)=>{const t=s.length===1?s[0]:e.reduce(((i,r,o)=>i+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+s[o+1]),s[0]);return new Y(t,s,j)},ce=(s,e)=>{if(L)s.adoptedStyleSheets=e.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet));else for(const t of e){const i=document.createElement("style"),r=f.litNonce;r!==void 0&&i.setAttribute("nonce",r),i.textContent=t.cssText,s.appendChild(i)}},J=L?s=>s:s=>s instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return le(t)})(s):s;const{is:de,defineProperty:me,getOwnPropertyDescriptor:pe,getOwnPropertyNames:ue,getOwnPropertySymbols:fe,getPrototypeOf:$e}=Object,N=globalThis,K=N.trustedTypes,ge=K?K.emptyScript:"",ve=N.reactiveElementPolyfillSupport,E=(s,e)=>s,M={toAttribute(s,e){switch(e){case Boolean:s=s?ge:null;break;case Object:case Array:s=s==null?s:JSON.stringify(s)}return s},fromAttribute(s,e){let t=s;switch(e){case Boolean:t=s!==null;break;case Number:t=s===null?null:Number(s);break;case Object:case Array:try{t=JSON.parse(s)}catch{t=null}}return t}},D=(s,e)=>!de(s,e),Z={attribute:!0,type:String,converter:M,reflect:!1,useDefault:!1,hasChanged:D};Symbol.metadata??=Symbol("metadata"),N.litPropertyMetadata??=new WeakMap;let k=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=Z){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),r=this.getPropertyDescriptor(e,i,t);r!==void 0&&me(this.prototype,e,r)}}static getPropertyDescriptor(e,t,i){const{get:r,set:o}=pe(this.prototype,e)??{get(){return this[t]},set(n){this[t]=n}};return{get:r,set(n){const l=r?.call(this);o?.call(this,n),this.requestUpdate(e,l,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??Z}static _$Ei(){if(this.hasOwnProperty(E("elementProperties")))return;const e=$e(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(E("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(E("properties"))){const t=this.properties,i=[...ue(t),...fe(t)];for(const r of i)this.createProperty(r,t[r])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[i,r]of t)this.elementProperties.set(i,r)}this._$Eh=new Map;for(const[t,i]of this.elementProperties){const r=this._$Eu(t,i);r!==void 0&&this._$Eh.set(r,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const r of i)t.unshift(J(r))}else e!==void 0&&t.push(J(e));return t}static _$Eu(e,t){const i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((e=>this.enableUpdating=e)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((e=>e(this)))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ce(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((e=>e.hostConnected?.()))}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach((e=>e.hostDisconnected?.()))}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){const i=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,i);if(r!==void 0&&i.reflect===!0){const o=(i.converter?.toAttribute!==void 0?i.converter:M).toAttribute(t,i.type);this._$Em=e,o==null?this.removeAttribute(r):this.setAttribute(r,o),this._$Em=null}}_$AK(e,t){const i=this.constructor,r=i._$Eh.get(e);if(r!==void 0&&this._$Em!==r){const o=i.getPropertyOptions(r),n=typeof o.converter=="function"?{fromAttribute:o.converter}:o.converter?.fromAttribute!==void 0?o.converter:M;this._$Em=r;const l=n.fromAttribute(t,o.type);this[r]=l??this._$Ej?.get(r)??l,this._$Em=null}}requestUpdate(e,t,i){if(e!==void 0){const r=this.constructor,o=this[e];if(i??=r.getPropertyOptions(e),!((i.hasChanged??D)(o,t)||i.useDefault&&i.reflect&&o===this._$Ej?.get(e)&&!this.hasAttribute(r._$Eu(e,i))))return;this.C(e,t,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:r,wrapped:o},n){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,n??t??this[e]),o!==!0||n!==void 0)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),r===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[r,o]of this._$Ep)this[r]=o;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[r,o]of i){const{wrapped:n}=o,l=this[r];n!==!0||this._$AL.has(r)||l===void 0||this.C(r,void 0,o,l)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach((i=>i.hostUpdate?.())),this.update(t)):this._$EM()}catch(i){throw e=!1,this._$EM(),i}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach((t=>t.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach((t=>this._$ET(t,this[t]))),this._$EM()}updated(e){}firstUpdated(e){}};k.elementStyles=[],k.shadowRootOptions={mode:"open"},k[E("elementProperties")]=new Map,k[E("finalized")]=new Map,ve?.({ReactiveElement:k}),(N.reactiveElementVersions??=[]).push("2.1.1");const I=globalThis,H=I.trustedTypes,G=H?H.createPolicy("lit-html",{createHTML:s=>s}):void 0,Q="$lit$",$=`lit$${Math.random().toFixed(9).slice(2)}$`,ee="?"+$,be=`<${ee}>`,b=document,S=()=>b.createComment(""),C=s=>s===null||typeof s!="object"&&typeof s!="function",B=Array.isArray,_e=s=>B(s)||typeof s?.[Symbol.iterator]=="function",V=`[ 	
\f\r]`,T=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,te=/-->/g,ie=/>/g,_=RegExp(`>|${V}(?:([^\\s"'>=/]+)(${V}*=${V}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),re=/'/g,se=/"/g,oe=/^(?:script|style|textarea|title)$/i,ye=s=>(e,...t)=>({_$litType$:s,strings:e,values:t}),g=ye(1),A=Symbol.for("lit-noChange"),c=Symbol.for("lit-nothing"),ne=new WeakMap,y=b.createTreeWalker(b,129);function ae(s,e){if(!B(s)||!s.hasOwnProperty("raw"))throw Error("invalid template strings array");return G!==void 0?G.createHTML(e):e}const ke=(s,e)=>{const t=s.length-1,i=[];let r,o=e===2?"<svg>":e===3?"<math>":"",n=T;for(let l=0;l<t;l++){const a=s[l];let d,m,h=-1,u=0;for(;u<a.length&&(n.lastIndex=u,m=n.exec(a),m!==null);)u=n.lastIndex,n===T?m[1]==="!--"?n=te:m[1]!==void 0?n=ie:m[2]!==void 0?(oe.test(m[2])&&(r=RegExp("</"+m[2],"g")),n=_):m[3]!==void 0&&(n=_):n===_?m[0]===">"?(n=r??T,h=-1):m[1]===void 0?h=-2:(h=n.lastIndex-m[2].length,d=m[1],n=m[3]===void 0?_:m[3]==='"'?se:re):n===se||n===re?n=_:n===te||n===ie?n=T:(n=_,r=void 0);const v=n===_&&s[l+1].startsWith("/>")?" ":"";o+=n===T?a+be:h>=0?(i.push(d),a.slice(0,h)+Q+a.slice(h)+$+v):a+$+(h===-2?l:v)}return[ae(s,o+(s[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),i]};class P{constructor({strings:e,_$litType$:t},i){let r;this.parts=[];let o=0,n=0;const l=e.length-1,a=this.parts,[d,m]=ke(e,t);if(this.el=P.createElement(d,i),y.currentNode=this.el.content,t===2||t===3){const h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(r=y.nextNode())!==null&&a.length<l;){if(r.nodeType===1){if(r.hasAttributes())for(const h of r.getAttributeNames())if(h.endsWith(Q)){const u=m[n++],v=r.getAttribute(h).split($),R=/([.?@])?(.*)/.exec(u);a.push({type:1,index:o,name:R[2],strings:v,ctor:R[1]==="."?we:R[1]==="?"?xe:R[1]==="@"?Ee:z}),r.removeAttribute(h)}else h.startsWith($)&&(a.push({type:6,index:o}),r.removeAttribute(h));if(oe.test(r.tagName)){const h=r.textContent.split($),u=h.length-1;if(u>0){r.textContent=H?H.emptyScript:"";for(let v=0;v<u;v++)r.append(h[v],S()),y.nextNode(),a.push({type:2,index:++o});r.append(h[u],S())}}}else if(r.nodeType===8)if(r.data===ee)a.push({type:2,index:o});else{let h=-1;for(;(h=r.data.indexOf($,h+1))!==-1;)a.push({type:7,index:o}),h+=$.length-1}o++}}static createElement(e,t){const i=b.createElement("template");return i.innerHTML=e,i}}function w(s,e,t=s,i){if(e===A)return e;let r=i!==void 0?t._$Co?.[i]:t._$Cl;const o=C(e)?void 0:e._$litDirective$;return r?.constructor!==o&&(r?._$AO?.(!1),o===void 0?r=void 0:(r=new o(s),r._$AT(s,t,i)),i!==void 0?(t._$Co??=[])[i]=r:t._$Cl=r),r!==void 0&&(e=w(s,r._$AS(s,e.values),r,i)),e}class Ae{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,r=(e?.creationScope??b).importNode(t,!0);y.currentNode=r;let o=y.nextNode(),n=0,l=0,a=i[0];for(;a!==void 0;){if(n===a.index){let d;a.type===2?d=new O(o,o.nextSibling,this,e):a.type===1?d=new a.ctor(o,a.name,a.strings,this,e):a.type===6&&(d=new Se(o,this,e)),this._$AV.push(d),a=i[++l]}n!==a?.index&&(o=y.nextNode(),n++)}return y.currentNode=b,r}p(e){let t=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class O{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,r){this.type=2,this._$AH=c,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=w(this,e,t),C(e)?e===c||e==null||e===""?(this._$AH!==c&&this._$AR(),this._$AH=c):e!==this._$AH&&e!==A&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):_e(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==c&&C(this._$AH)?this._$AA.nextSibling.data=e:this.T(b.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:i}=e,r=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=P.createElement(ae(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===r)this._$AH.p(t);else{const o=new Ae(r,this),n=o.u(this.options);o.p(t),this.T(n),this._$AH=o}}_$AC(e){let t=ne.get(e.strings);return t===void 0&&ne.set(e.strings,t=new P(e)),t}k(e){B(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,r=0;for(const o of e)r===t.length?t.push(i=new O(this.O(S()),this.O(S()),this,this.options)):i=t[r],i._$AI(o),r++;r<t.length&&(this._$AR(i&&i._$AB.nextSibling,r),t.length=r)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const i=e.nextSibling;e.remove(),e=i}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}}class z{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,r,o){this.type=1,this._$AH=c,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=o,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=c}_$AI(e,t=this,i,r){const o=this.strings;let n=!1;if(o===void 0)e=w(this,e,t,0),n=!C(e)||e!==this._$AH&&e!==A,n&&(this._$AH=e);else{const l=e;let a,d;for(e=o[0],a=0;a<o.length-1;a++)d=w(this,l[i+a],t,a),d===A&&(d=this._$AH[a]),n||=!C(d)||d!==this._$AH[a],d===c?e=c:e!==c&&(e+=(d??"")+o[a+1]),this._$AH[a]=d}n&&!r&&this.j(e)}j(e){e===c?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class we extends z{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===c?void 0:e}}class xe extends z{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==c)}}class Ee extends z{constructor(e,t,i,r,o){super(e,t,i,r,o),this.type=5}_$AI(e,t=this){if((e=w(this,e,t,0)??c)===A)return;const i=this._$AH,r=e===c&&i!==c||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,o=e!==c&&(i===c||r);r&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class Se{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){w(this,e)}}const Ce=I.litHtmlPolyfillSupport;Ce?.(P,O),(I.litHtmlVersions??=[]).push("3.3.1");const Te=(s,e,t)=>{const i=t?.renderBefore??e;let r=i._$litPart$;if(r===void 0){const o=t?.renderBefore??null;i._$litPart$=r=new O(e.insertBefore(S(),o),o,void 0,t??{})}return r._$AI(s),r};const q=globalThis;class U extends k{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Te(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return A}}U._$litElement$=!0,U.finalized=!0,q.litElementHydrateSupport?.({LitElement:U});const Pe=q.litElementPolyfillSupport;Pe?.({LitElement:U}),(q.litElementVersions??=[]).push("4.2.1");const Oe=s=>(e,t)=>{t!==void 0?t.addInitializer((()=>{customElements.define(s,e)})):customElements.define(s,e)};const Ue={attribute:!0,type:String,converter:M,reflect:!1,hasChanged:D},Ne=(s=Ue,e,t)=>{const{kind:i,metadata:r}=t;let o=globalThis.litPropertyMetadata.get(r);if(o===void 0&&globalThis.litPropertyMetadata.set(r,o=new Map),i==="setter"&&((s=Object.create(s)).wrapped=!0),o.set(t.name,s),i==="accessor"){const{name:n}=t;return{set(l){const a=e.get.call(this);e.set.call(this,l),this.requestUpdate(n,a,s)},init(l){return l!==void 0&&this.C(n,void 0,s,l),l}}}if(i==="setter"){const{name:n}=t;return function(l){const a=this[n];e.call(this,l),this.requestUpdate(n,a,s)}}throw Error("Unsupported decorator location: "+i)};function W(s){return(e,t)=>typeof t=="object"?Ne(s,e,t):((i,r,o)=>{const n=r.hasOwnProperty(o);return r.constructor.createProperty(o,i),n?Object.getOwnPropertyDescriptor(r,o):void 0})(s,e,t)}function F(s){return W({...s,state:!0,attribute:!1})}const Me=he`
  :host {
    display: block;
    --timeline-font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    --timeline-text-color: #111827;
    --timeline-text-color-dark: #f9fafb;
    --timeline-line-color: #d1d5db;
    --timeline-line-color-dark: #4b5563;
    --timeline-bg-color: #fafafa;
    --timeline-bg-color-hover: #fff;
    --timeline-bg-color-dark: #1a1f2e;
    --timeline-bg-color-hover-dark: #1f2937;
    --timeline-marker-bg: #fff;
    --timeline-marker-bg-dark: #1f2937;
    --timeline-marker-border: #3b82f6;
    --timeline-marker-border-dark: #60a5fa;
    --timeline-marker-active-bg: #3b82f6;
    --timeline-marker-active-bg-dark: #60a5fa;
    --timeline-title-color: #111827;
    --timeline-title-color-dark: #f9fafb;
    --timeline-title-hover-color: #3b82f6;
    --timeline-title-hover-color-dark: #60a5fa;
    --timeline-date-color: #3b82f6;
    --timeline-date-color-dark: #60a5fa;
    --timeline-link-color: #3b82f6;
    --timeline-link-color-dark: #60a5fa;
    --timeline-link-hover-color: #2563eb;
    --timeline-link-hover-color-dark: #93c5fd;
    --timeline-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    --timeline-shadow-dark: 0 4px 12px rgba(0, 0, 0, 0.4);
    --timeline-marker-shadow: 0 0 0 4px rgba(59, 130, 246, 0.15);
    --timeline-marker-shadow-dark: 0 0 0 4px rgba(96, 165, 250, 0.2);
    --timeline-marker-shadow-hover: 0 0 0 6px rgba(59, 130, 246, 0.2);
    --timeline-marker-shadow-hover-dark: 0 0 0 6px rgba(96, 165, 250, 0.3);
    --timeline-empty-color: #6b7280;
    --timeline-empty-color-dark: #9ca3af;
    
    font-family: var(--timeline-font-family);
    color: var(--timeline-text-color);
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
    padding: 8px 0;
  }

  .timeline::before {
    content: '';
    position: absolute;
    left: 7px;
    top: 0;
    bottom: 0;
    width: 1.5px;
    background: var(--timeline-line-color);
  }

  .timeline-item {
    position: relative;
    padding-left: 36px;
    padding-bottom: 24px;
    animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) backwards;
  }

  .timeline-item:nth-child(1) { animation-delay: 0.05s; }
  .timeline-item:nth-child(2) { animation-delay: 0.1s; }
  .timeline-item:nth-child(3) { animation-delay: 0.15s; }
  .timeline-item:nth-child(4) { animation-delay: 0.2s; }
  .timeline-item:nth-child(5) { animation-delay: 0.25s; }
  .timeline-item:nth-child(6) { animation-delay: 0.3s; }

  .timeline-item:last-child {
    padding-bottom: 0;
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(16px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .timeline-marker {
    position: absolute;
    left: 0;
    top: 2px;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: var(--timeline-marker-bg);
    border: 2px solid var(--timeline-marker-border);
    z-index: 2;
    transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .timeline-marker.active {
    background: var(--timeline-marker-active-bg);
    border-color: var(--timeline-marker-active-bg);
    transform: scale(1.2);
    box-shadow: var(--timeline-marker-shadow);
  }

  .timeline-item:hover .timeline-marker {
    transform: scale(1.15);
    border-color: var(--timeline-title-hover-color);
  }

  .timeline-item:hover .timeline-marker.active {
    transform: scale(1.25);
    box-shadow: var(--timeline-marker-shadow-hover);
  }

  .timeline-content {
    background: var(--timeline-bg-color);
    border-radius: 8px;
    padding: 14px 16px;
    transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .timeline-item:hover .timeline-content {
    background: var(--timeline-bg-color-hover);
    box-shadow: var(--timeline-shadow);
    transform: translateX(4px);
  }

  .timeline-image {
    width: 100%;
    max-height: 180px;
    object-fit: cover;
    border-radius: 6px;
    margin-bottom: 12px;
    display: block;
    transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .timeline-item:hover .timeline-image {
    transform: scale(1.02);
  }

  .timeline-date {
    font-size: 11px;
    color: var(--timeline-date-color);
    font-weight: 500;
    margin-bottom: 8px;
    opacity: 0;
    animation: fadeIn 0.6s ease-out forwards;
    animation-delay: 0.3s;
  }

  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }

  .timeline-title {
    font-size: 15px;
    font-weight: 600;
    color: var(--timeline-title-color);
    margin-bottom: 8px;
    line-height: 1.4;
    transition: color 0.3s ease;
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
    transition: color 0.3s ease;
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
    background: var(--timeline-bg-color-dark);
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
    padding: 0 8px;
  }

  :host([orientation="horizontal"]) .timeline::before {
    left: 0;
    right: 0;
    top: 7px;
    bottom: auto;
    width: auto;
    height: 1.5px;
  }

  :host([orientation="horizontal"]) .timeline-item {
    flex: 1;
    padding-left: 0;
    padding-top: 36px;
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
    transform: translateX(-50%) scale(1.15);
  }

  :host([orientation="horizontal"]) .timeline-item:hover .timeline-content {
    transform: translateY(-4px);
  }
`;function He(){const s=["html.dark:not([data-color-scheme='light']):not(.light):not([class*='light'])","html[class~='dark']:not([data-color-scheme='light']):not(.light):not([class*='light'])","html[class*='dark']:not([data-color-scheme='light']):not(.light):not([class*='light'])","html[data-color-scheme='dark']:not([data-color-scheme='light'])","html[data-theme='dark']:not([data-theme='light'])","html[theme='dark']:not([theme='light'])","[data-color-scheme='dark']:not([data-color-scheme='light'])","[data-theme='dark']:not([data-theme='light'])","[theme='dark']:not([theme='light'])"],e=document.documentElement,t=document.body;return s.some(r=>{try{return e.matches(r)||t.matches(r)}catch{return!1}})||e.classList.contains("dark")||e.getAttribute("data-theme")==="dark"||e.getAttribute("data-color-scheme")==="dark"||e.getAttribute("theme")==="dark"}function ze(s){const e=new MutationObserver(s);return e.observe(document.documentElement,{attributes:!0,attributeFilter:["class","data-theme","data-color-scheme","theme"]}),e.observe(document.body,{attributes:!0,attributeFilter:["class","data-theme","data-color-scheme","theme"]}),e}function Re(){return window.__TIMELINE_API_BASE__||"/apis/api.timeline.xhhao.com/v1alpha1/timelines"}async function Le(s){if(!s)return[];const t=`${Re()}?group=${encodeURIComponent(s)}`,i=await fetch(t);if(!i.ok)throw new Error(`Failed to fetch timelines: ${i.statusText}`);return((await i.json()).items||[]).map(n=>({date:n.spec?.date,displayName:n.spec?.displayName,image:n.spec?.image,active:n.spec?.active||!1,relatedLinks:n.spec?.relatedLinks})).sort((n,l)=>n.date?l.date?l.date.localeCompare(n.date):-1:1)}var je=Object.defineProperty,De=Object.getOwnPropertyDescriptor,x=(s,e,t,i)=>{for(var r=i>1?void 0:i?De(e,t):e,o=s.length-1,n;o>=0;o--)(n=s[o])&&(r=(i?n(e,t,r):n(r))||r);return i&&r&&je(e,t,r),r};p.Timeline=class extends U{constructor(){super(...arguments),this.groupName="",this.orientation="vertical",this.items=[],this.isLoading=!1,this.isDark=!1}connectedCallback(){super.connectedCallback(),this.detectTheme(),this.observeTheme(),this.groupName&&this.fetchTimelines()}disconnectedCallback(){super.disconnectedCallback(),this.themeObserver&&this.themeObserver.disconnect()}updated(e){super.updated(e),e.has("groupName")&&this.groupName&&this.fetchTimelines()}detectTheme(){this.isDark=He()}observeTheme(){this.themeObserver=ze(()=>{this.detectTheme()})}async fetchTimelines(){if(this.groupName){this.isLoading=!0;try{this.items=await Le(this.groupName)}catch(e){console.error("Error fetching timelines:",e),this.items=[]}finally{this.isLoading=!1}}}render(){return this.isLoading?g`
        <div class="timeline-loading">加载中...</div>
      `:this.items.length===0?g`
        <div class="timeline-empty">暂无时间轴数据</div>
      `:(this.orientation&&this.setAttribute("orientation",this.orientation),g`
      <div class="timeline ${this.isDark?"dark":""}">
        ${this.items.map(e=>g`
            <div class="timeline-item">
              <div class="timeline-marker ${e.active?"active":""}"></div>
              <div class="timeline-content">
                ${e.image?g`<img src="${e.image}" alt="${e.displayName||""}" class="timeline-image" />`:""}
                ${e.date?g`<div class="timeline-date">${e.date}</div>`:""}
                ${e.displayName?g`<div class="timeline-title">${e.displayName}</div>`:""}
                ${e.relatedLinks?g`
                  <div class="timeline-link">
                    <a href="${e.relatedLinks}" target="_blank" rel="noopener noreferrer">查看详情</a>
                  </div>
                `:""}
              </div>
            </div>
          `)}
      </div>
    `)}},p.Timeline.styles=Me,x([W({type:String,attribute:"group-name"})],p.Timeline.prototype,"groupName",2),x([W({type:String})],p.Timeline.prototype,"orientation",2),x([F()],p.Timeline.prototype,"items",2),x([F()],p.Timeline.prototype,"isLoading",2),x([F()],p.Timeline.prototype,"isDark",2),p.Timeline=x([Oe("timeline-view")],p.Timeline),Object.defineProperty(p,Symbol.toStringTag,{value:"Module"})}));
