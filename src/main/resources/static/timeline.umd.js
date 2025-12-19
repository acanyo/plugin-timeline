(function(p,g){typeof exports=="object"&&typeof module<"u"?g(exports):typeof define=="function"&&define.amd?define(["exports"],g):(p=typeof globalThis<"u"?globalThis:p||self,g(p.TimelineView={}))})(this,(function(p){"use strict";const g=globalThis,j=g.ShadowRoot&&(g.ShadyCSS===void 0||g.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,L=Symbol(),F=new WeakMap;let J=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==L)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(j&&e===void 0){const i=t!==void 0&&t.length===1;i&&(e=F.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&F.set(t,e))}return e}toString(){return this.cssText}};const le=r=>new J(typeof r=="string"?r:r+"",void 0,L),he=(r,...e)=>{const t=r.length===1?r[0]:e.reduce(((i,n,o)=>i+(s=>{if(s._$cssResult$===!0)return s.cssText;if(typeof s=="number")return s;throw Error("Value passed to 'css' function must be a 'css' function result: "+s+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+r[o+1]),r[0]);return new J(t,r,L)},ce=(r,e)=>{if(j)r.adoptedStyleSheets=e.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet));else for(const t of e){const i=document.createElement("style"),n=g.litNonce;n!==void 0&&i.setAttribute("nonce",n),i.textContent=t.cssText,r.appendChild(i)}},K=j?r=>r:r=>r instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return le(t)})(r):r;const{is:de,defineProperty:me,getOwnPropertyDescriptor:pe,getOwnPropertyNames:ue,getOwnPropertySymbols:ge,getPrototypeOf:fe}=Object,N=globalThis,Z=N.trustedTypes,$e=Z?Z.emptyScript:"",ve=N.reactiveElementPolyfillSupport,E=(r,e)=>r,M={toAttribute(r,e){switch(e){case Boolean:r=r?$e:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,e){let t=r;switch(e){case Boolean:t=r!==null;break;case Number:t=r===null?null:Number(r);break;case Object:case Array:try{t=JSON.parse(r)}catch{t=null}}return t}},D=(r,e)=>!de(r,e),G={attribute:!0,type:String,converter:M,reflect:!1,useDefault:!1,hasChanged:D};Symbol.metadata??=Symbol("metadata"),N.litPropertyMetadata??=new WeakMap;let k=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=G){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),n=this.getPropertyDescriptor(e,i,t);n!==void 0&&me(this.prototype,e,n)}}static getPropertyDescriptor(e,t,i){const{get:n,set:o}=pe(this.prototype,e)??{get(){return this[t]},set(s){this[t]=s}};return{get:n,set(s){const l=n?.call(this);o?.call(this,s),this.requestUpdate(e,l,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??G}static _$Ei(){if(this.hasOwnProperty(E("elementProperties")))return;const e=fe(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(E("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(E("properties"))){const t=this.properties,i=[...ue(t),...ge(t)];for(const n of i)this.createProperty(n,t[n])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[i,n]of t)this.elementProperties.set(i,n)}this._$Eh=new Map;for(const[t,i]of this.elementProperties){const n=this._$Eu(t,i);n!==void 0&&this._$Eh.set(n,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const n of i)t.unshift(K(n))}else e!==void 0&&t.push(K(e));return t}static _$Eu(e,t){const i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((e=>this.enableUpdating=e)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((e=>e(this)))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ce(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((e=>e.hostConnected?.()))}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach((e=>e.hostDisconnected?.()))}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){const i=this.constructor.elementProperties.get(e),n=this.constructor._$Eu(e,i);if(n!==void 0&&i.reflect===!0){const o=(i.converter?.toAttribute!==void 0?i.converter:M).toAttribute(t,i.type);this._$Em=e,o==null?this.removeAttribute(n):this.setAttribute(n,o),this._$Em=null}}_$AK(e,t){const i=this.constructor,n=i._$Eh.get(e);if(n!==void 0&&this._$Em!==n){const o=i.getPropertyOptions(n),s=typeof o.converter=="function"?{fromAttribute:o.converter}:o.converter?.fromAttribute!==void 0?o.converter:M;this._$Em=n;const l=s.fromAttribute(t,o.type);this[n]=l??this._$Ej?.get(n)??l,this._$Em=null}}requestUpdate(e,t,i){if(e!==void 0){const n=this.constructor,o=this[e];if(i??=n.getPropertyOptions(e),!((i.hasChanged??D)(o,t)||i.useDefault&&i.reflect&&o===this._$Ej?.get(e)&&!this.hasAttribute(n._$Eu(e,i))))return;this.C(e,t,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:n,wrapped:o},s){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,s??t??this[e]),o!==!0||s!==void 0)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),n===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[n,o]of this._$Ep)this[n]=o;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[n,o]of i){const{wrapped:s}=o,l=this[n];s!==!0||this._$AL.has(n)||l===void 0||this.C(n,void 0,o,l)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach((i=>i.hostUpdate?.())),this.update(t)):this._$EM()}catch(i){throw e=!1,this._$EM(),i}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach((t=>t.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach((t=>this._$ET(t,this[t]))),this._$EM()}updated(e){}firstUpdated(e){}};k.elementStyles=[],k.shadowRootOptions={mode:"open"},k[E("elementProperties")]=new Map,k[E("finalized")]=new Map,ve?.({ReactiveElement:k}),(N.reactiveElementVersions??=[]).push("2.1.1");const I=globalThis,H=I.trustedTypes,Q=H?H.createPolicy("lit-html",{createHTML:r=>r}):void 0,Y="$lit$",f=`lit$${Math.random().toFixed(9).slice(2)}$`,ee="?"+f,be=`<${ee}>`,b=document,S=()=>b.createComment(""),C=r=>r===null||typeof r!="object"&&typeof r!="function",B=Array.isArray,_e=r=>B(r)||typeof r?.[Symbol.iterator]=="function",V=`[ 	
\f\r]`,T=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,te=/-->/g,ie=/>/g,_=RegExp(`>|${V}(?:([^\\s"'>=/]+)(${V}*=${V}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ne=/'/g,re=/"/g,oe=/^(?:script|style|textarea|title)$/i,ye=r=>(e,...t)=>({_$litType$:r,strings:e,values:t}),$=ye(1),x=Symbol.for("lit-noChange"),c=Symbol.for("lit-nothing"),se=new WeakMap,y=b.createTreeWalker(b,129);function ae(r,e){if(!B(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return Q!==void 0?Q.createHTML(e):e}const ke=(r,e)=>{const t=r.length-1,i=[];let n,o=e===2?"<svg>":e===3?"<math>":"",s=T;for(let l=0;l<t;l++){const a=r[l];let d,m,h=-1,u=0;for(;u<a.length&&(s.lastIndex=u,m=s.exec(a),m!==null);)u=s.lastIndex,s===T?m[1]==="!--"?s=te:m[1]!==void 0?s=ie:m[2]!==void 0?(oe.test(m[2])&&(n=RegExp("</"+m[2],"g")),s=_):m[3]!==void 0&&(s=_):s===_?m[0]===">"?(s=n??T,h=-1):m[1]===void 0?h=-2:(h=s.lastIndex-m[2].length,d=m[1],s=m[3]===void 0?_:m[3]==='"'?re:ne):s===re||s===ne?s=_:s===te||s===ie?s=T:(s=_,n=void 0);const v=s===_&&r[l+1].startsWith("/>")?" ":"";o+=s===T?a+be:h>=0?(i.push(d),a.slice(0,h)+Y+a.slice(h)+f+v):a+f+(h===-2?l:v)}return[ae(r,o+(r[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),i]};class P{constructor({strings:e,_$litType$:t},i){let n;this.parts=[];let o=0,s=0;const l=e.length-1,a=this.parts,[d,m]=ke(e,t);if(this.el=P.createElement(d,i),y.currentNode=this.el.content,t===2||t===3){const h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(n=y.nextNode())!==null&&a.length<l;){if(n.nodeType===1){if(n.hasAttributes())for(const h of n.getAttributeNames())if(h.endsWith(Y)){const u=m[s++],v=n.getAttribute(h).split(f),R=/([.?@])?(.*)/.exec(u);a.push({type:1,index:o,name:R[2],strings:v,ctor:R[1]==="."?Ae:R[1]==="?"?we:R[1]==="@"?Ee:z}),n.removeAttribute(h)}else h.startsWith(f)&&(a.push({type:6,index:o}),n.removeAttribute(h));if(oe.test(n.tagName)){const h=n.textContent.split(f),u=h.length-1;if(u>0){n.textContent=H?H.emptyScript:"";for(let v=0;v<u;v++)n.append(h[v],S()),y.nextNode(),a.push({type:2,index:++o});n.append(h[u],S())}}}else if(n.nodeType===8)if(n.data===ee)a.push({type:2,index:o});else{let h=-1;for(;(h=n.data.indexOf(f,h+1))!==-1;)a.push({type:7,index:o}),h+=f.length-1}o++}}static createElement(e,t){const i=b.createElement("template");return i.innerHTML=e,i}}function A(r,e,t=r,i){if(e===x)return e;let n=i!==void 0?t._$Co?.[i]:t._$Cl;const o=C(e)?void 0:e._$litDirective$;return n?.constructor!==o&&(n?._$AO?.(!1),o===void 0?n=void 0:(n=new o(r),n._$AT(r,t,i)),i!==void 0?(t._$Co??=[])[i]=n:t._$Cl=n),n!==void 0&&(e=A(r,n._$AS(r,e.values),n,i)),e}class xe{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,n=(e?.creationScope??b).importNode(t,!0);y.currentNode=n;let o=y.nextNode(),s=0,l=0,a=i[0];for(;a!==void 0;){if(s===a.index){let d;a.type===2?d=new O(o,o.nextSibling,this,e):a.type===1?d=new a.ctor(o,a.name,a.strings,this,e):a.type===6&&(d=new Se(o,this,e)),this._$AV.push(d),a=i[++l]}s!==a?.index&&(o=y.nextNode(),s++)}return y.currentNode=b,n}p(e){let t=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class O{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,n){this.type=2,this._$AH=c,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=n,this._$Cv=n?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=A(this,e,t),C(e)?e===c||e==null||e===""?(this._$AH!==c&&this._$AR(),this._$AH=c):e!==this._$AH&&e!==x&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):_e(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==c&&C(this._$AH)?this._$AA.nextSibling.data=e:this.T(b.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:i}=e,n=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=P.createElement(ae(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===n)this._$AH.p(t);else{const o=new xe(n,this),s=o.u(this.options);o.p(t),this.T(s),this._$AH=o}}_$AC(e){let t=se.get(e.strings);return t===void 0&&se.set(e.strings,t=new P(e)),t}k(e){B(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,n=0;for(const o of e)n===t.length?t.push(i=new O(this.O(S()),this.O(S()),this,this.options)):i=t[n],i._$AI(o),n++;n<t.length&&(this._$AR(i&&i._$AB.nextSibling,n),t.length=n)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const i=e.nextSibling;e.remove(),e=i}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}}class z{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,n,o){this.type=1,this._$AH=c,this._$AN=void 0,this.element=e,this.name=t,this._$AM=n,this.options=o,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=c}_$AI(e,t=this,i,n){const o=this.strings;let s=!1;if(o===void 0)e=A(this,e,t,0),s=!C(e)||e!==this._$AH&&e!==x,s&&(this._$AH=e);else{const l=e;let a,d;for(e=o[0],a=0;a<o.length-1;a++)d=A(this,l[i+a],t,a),d===x&&(d=this._$AH[a]),s||=!C(d)||d!==this._$AH[a],d===c?e=c:e!==c&&(e+=(d??"")+o[a+1]),this._$AH[a]=d}s&&!n&&this.j(e)}j(e){e===c?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class Ae extends z{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===c?void 0:e}}class we extends z{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==c)}}class Ee extends z{constructor(e,t,i,n,o){super(e,t,i,n,o),this.type=5}_$AI(e,t=this){if((e=A(this,e,t,0)??c)===x)return;const i=this._$AH,n=e===c&&i!==c||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,o=e!==c&&(i===c||n);n&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class Se{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){A(this,e)}}const Ce=I.litHtmlPolyfillSupport;Ce?.(P,O),(I.litHtmlVersions??=[]).push("3.3.1");const Te=(r,e,t)=>{const i=t?.renderBefore??e;let n=i._$litPart$;if(n===void 0){const o=t?.renderBefore??null;i._$litPart$=n=new O(e.insertBefore(S(),o),o,void 0,t??{})}return n._$AI(r),n};const q=globalThis;class U extends k{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Te(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return x}}U._$litElement$=!0,U.finalized=!0,q.litElementHydrateSupport?.({LitElement:U});const Pe=q.litElementPolyfillSupport;Pe?.({LitElement:U}),(q.litElementVersions??=[]).push("4.2.1");const Oe=r=>(e,t)=>{t!==void 0?t.addInitializer((()=>{customElements.define(r,e)})):customElements.define(r,e)};const Ue={attribute:!0,type:String,converter:M,reflect:!1,hasChanged:D},Ne=(r=Ue,e,t)=>{const{kind:i,metadata:n}=t;let o=globalThis.litPropertyMetadata.get(n);if(o===void 0&&globalThis.litPropertyMetadata.set(n,o=new Map),i==="setter"&&((r=Object.create(r)).wrapped=!0),o.set(t.name,r),i==="accessor"){const{name:s}=t;return{set(l){const a=e.get.call(this);e.set.call(this,l),this.requestUpdate(s,a,r)},init(l){return l!==void 0&&this.C(s,void 0,r,l),l}}}if(i==="setter"){const{name:s}=t;return function(l){const a=this[s];e.call(this,l),this.requestUpdate(s,a,r)}}throw Error("Unsupported decorator location: "+i)};function W(r){return(e,t)=>typeof t=="object"?Ne(r,e,t):((i,n,o)=>{const s=n.hasOwnProperty(o);return n.constructor.createProperty(o,i),s?Object.getOwnPropertyDescriptor(n,o):void 0})(r,e,t)}function X(r){return W({...r,state:!0,attribute:!1})}const Me=he`
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
    left: 6.5px;
    top: 3px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: var(--timeline-marker-bg);
    border: 2px solid var(--timeline-marker-border);
    z-index: 2;
    transition: all 0.2s ease;
    box-sizing: border-box;
    transform: translateX(-50%);
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
    padding: 0 14px 12px 14px;
    transition: background 0.2s ease;
    display: flex;
    gap: 12px;
    align-items: flex-start;
    box-shadow: none;
  }

  .timeline-item.has-image .timeline-content {
    padding: 0 12px 12px 12px;
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
    margin-top: 0;
    letter-spacing: 0.01em;
    line-height: 1.5;
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
    padding-top: 16px;
    padding-bottom: 0;
    margin-right: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  :host([orientation="horizontal"]) .timeline-item:last-child {
    margin-right: 0;
  }

  :host([orientation="horizontal"]) .timeline-marker {
    left: 50%;
    top: 3px;
    transform: translateX(-50%);
  }

  :host([orientation="horizontal"]) .timeline-item:hover .timeline-marker {
    transform: translateX(-50%);
  }

  :host([orientation="horizontal"]) .timeline-content {
    padding: 0;
    margin-top: 0;
    width: 100%;
    text-align: center;
    align-items: center;
    justify-content: center;
  }

  :host([orientation="horizontal"]) .timeline-content-inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  /* 交替布局 */
  :host([orientation="alternating"]) .timeline {
    position: relative;
    padding: 4px 0;
  }

  :host([orientation="alternating"]) .timeline::before {
    left: 50%;
    transform: translateX(-50%);
    top: 0;
    bottom: 0;
    width: 1px;
    background: var(--timeline-line-color);
  }

  :host([orientation="alternating"]) .timeline-item {
    position: relative;
    padding-left: 0;
    padding-right: 0;
    padding-bottom: 20px;
    display: flex;
    align-items: flex-start;
  }

  :host([orientation="alternating"]) .timeline-item:last-child {
    padding-bottom: 0;
  }

  :host([orientation="alternating"]) .timeline-marker {
    position: absolute;
    left: 50%;
    top: 3px;
    transform: translateX(-50%);
    z-index: 2;
  }

  :host([orientation="alternating"]) .timeline-item:hover .timeline-marker {
    transform: translateX(-50%);
  }

  :host([orientation="alternating"]) .timeline-item-right {
    flex-direction: row;
  }

  :host([orientation="alternating"]) .timeline-item-right .timeline-content {
    margin-left: calc(50% + 20px);
    margin-right: 0;
    width: calc(50% - 20px);
    max-width: 400px;
    padding: 0 14px 12px 14px;
    text-align: left;
  }

  :host([orientation="alternating"]) .timeline-item-right.has-image .timeline-content {
    padding: 0 12px 12px 12px;
  }

  /* 左侧内容（奇数索引，1, 3, 5...） */
  :host([orientation="alternating"]) .timeline-item-left {
    flex-direction: row-reverse;
  }

  :host([orientation="alternating"]) .timeline-item-left .timeline-content {
    margin-right: calc(50% + 20px);
    margin-left: 0;
    width: calc(50% - 20px);
    max-width: 400px;
    padding: 0 14px 12px 14px;
    text-align: right;
  }

  :host([orientation="alternating"]) .timeline-item-left.has-image .timeline-content {
    padding: 0 12px 12px 12px;
  }

  /* 交替布局下的图片和内容对齐 */
  :host([orientation="alternating"]) .timeline-item-right .timeline-content {
    justify-content: flex-start;
  }

  :host([orientation="alternating"]) .timeline-item-left .timeline-content {
    justify-content: flex-end;
  }

  :host([orientation="alternating"]) .timeline-item-left .timeline-content-inner {
    text-align: right;
  }

  /* 暗色主题下的交替布局 */
  :host([orientation="alternating"]) .timeline.dark .timeline::before {
    background: var(--timeline-line-color-dark);
  }
`;function He(){const r=["html.dark:not([data-color-scheme='light']):not(.light):not([class*='light'])","html[class~='dark']:not([data-color-scheme='light']):not(.light):not([class*='light'])","html[class*='dark']:not([data-color-scheme='light']):not(.light):not([class*='light'])","html[data-color-scheme='dark']:not([data-color-scheme='light'])","html[data-theme='dark']:not([data-theme='light'])","html[theme='dark']:not([theme='light'])","[data-color-scheme='dark']:not([data-color-scheme='light'])","[data-theme='dark']:not([data-theme='light'])","[theme='dark']:not([theme='light'])"],e=document.documentElement,t=document.body;return r.some(n=>{try{return e.matches(n)||t.matches(n)}catch{return!1}})||e.classList.contains("dark")||e.getAttribute("data-theme")==="dark"||e.getAttribute("data-color-scheme")==="dark"||e.getAttribute("theme")==="dark"}function ze(r){const e=new MutationObserver(r);return e.observe(document.documentElement,{attributes:!0,attributeFilter:["class","data-theme","data-color-scheme","theme"]}),e.observe(document.body,{attributes:!0,attributeFilter:["class","data-theme","data-color-scheme","theme"]}),e}function Re(){return window.__TIMELINE_API_BASE__||"/apis/api.timeline.xhhao.com/v1alpha1/timelines"}async function je(r){if(!r)return[];const t=`${Re()}?group=${encodeURIComponent(r)}`,i=await fetch(t);if(!i.ok)throw new Error(`Failed to fetch timelines: ${i.statusText}`);return((await i.json()).items||[]).map(s=>({date:s.spec?.date,displayName:s.spec?.displayName,image:s.spec?.image,active:s.spec?.active||!1,relatedLinks:s.spec?.relatedLinks})).sort((s,l)=>s.date?l.date?l.date.localeCompare(s.date):-1:1)}var Le=Object.defineProperty,De=Object.getOwnPropertyDescriptor,w=(r,e,t,i)=>{for(var n=i>1?void 0:i?De(e,t):e,o=r.length-1,s;o>=0;o--)(s=r[o])&&(n=(i?s(e,t,n):s(n))||n);return i&&n&&Le(e,t,n),n};p.Timeline=class extends U{constructor(){super(...arguments),this.groupName="",this.orientation="vertical",this.items=[],this.isLoading=!1,this.isDark=!1}connectedCallback(){super.connectedCallback(),this.detectTheme(),this.observeTheme(),this.groupName&&this.fetchTimelines()}disconnectedCallback(){super.disconnectedCallback(),this.themeObserver&&this.themeObserver.disconnect()}updated(e){super.updated(e),e.has("groupName")&&this.groupName&&this.fetchTimelines()}detectTheme(){this.isDark=He()}observeTheme(){this.themeObserver=ze(()=>{this.detectTheme()})}async fetchTimelines(){if(this.groupName){this.isLoading=!0;try{this.items=await je(this.groupName)}catch(e){console.error("Error fetching timelines:",e),this.items=[]}finally{this.isLoading=!1}}}render(){return this.isLoading?$`
        <div class="timeline-loading">加载中...</div>
      `:this.items.length===0?$`
        <div class="timeline-empty">暂无时间轴数据</div>
      `:(this.orientation&&this.setAttribute("orientation",this.orientation),$`
      <div class="timeline ${this.isDark?"dark":""}">
        ${this.items.map((e,t)=>{const i=this.orientation==="alternating",n=t%2===0,o=i?n?"timeline-item-right":"timeline-item-left":"";return $`
            <div class="timeline-item ${e.image?"has-image":""} ${o}">
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
          `})}
      </div>
    `)}},p.Timeline.styles=Me,w([W({type:String,attribute:"group-name"})],p.Timeline.prototype,"groupName",2),w([W({type:String})],p.Timeline.prototype,"orientation",2),w([X()],p.Timeline.prototype,"items",2),w([X()],p.Timeline.prototype,"isLoading",2),w([X()],p.Timeline.prototype,"isDark",2),p.Timeline=w([Oe("timeline-view")],p.Timeline),Object.defineProperty(p,Symbol.toStringTag,{value:"Module"})}));
