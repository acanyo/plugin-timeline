const N = globalThis, j = N.ShadowRoot && (N.ShadyCSS === void 0 || N.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, D = Symbol(), F = /* @__PURE__ */ new WeakMap();
let rt = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== D) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (j && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = F.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && F.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const lt = (n) => new rt(typeof n == "string" ? n : n + "", void 0, D), ht = (n, ...t) => {
  const e = n.length === 1 ? n[0] : t.reduce(((i, r, o) => i + ((s) => {
    if (s._$cssResult$ === !0) return s.cssText;
    if (typeof s == "number") return s;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + s + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + n[o + 1]), n[0]);
  return new rt(e, n, D);
}, ct = (n, t) => {
  if (j) n.adoptedStyleSheets = t.map(((e) => e instanceof CSSStyleSheet ? e : e.styleSheet));
  else for (const e of t) {
    const i = document.createElement("style"), r = N.litNonce;
    r !== void 0 && i.setAttribute("nonce", r), i.textContent = e.cssText, n.appendChild(i);
  }
}, J = j ? (n) => n : (n) => n instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules) e += i.cssText;
  return lt(e);
})(n) : n;
const { is: dt, defineProperty: mt, getOwnPropertyDescriptor: pt, getOwnPropertyNames: ut, getOwnPropertySymbols: gt, getPrototypeOf: ft } = Object, z = globalThis, K = z.trustedTypes, $t = K ? K.emptyScript : "", vt = z.reactiveElementPolyfillSupport, E = (n, t) => n, M = { toAttribute(n, t) {
  switch (t) {
    case Boolean:
      n = n ? $t : null;
      break;
    case Object:
    case Array:
      n = n == null ? n : JSON.stringify(n);
  }
  return n;
}, fromAttribute(n, t) {
  let e = n;
  switch (t) {
    case Boolean:
      e = n !== null;
      break;
    case Number:
      e = n === null ? null : Number(n);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(n);
      } catch {
        e = null;
      }
  }
  return e;
} }, I = (n, t) => !dt(n, t), Z = { attribute: !0, type: String, converter: M, reflect: !1, useDefault: !1, hasChanged: I };
Symbol.metadata ??= Symbol("metadata"), z.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let y = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = Z) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = Symbol(), r = this.getPropertyDescriptor(t, i, e);
      r !== void 0 && mt(this.prototype, t, r);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: r, set: o } = pt(this.prototype, t) ?? { get() {
      return this[e];
    }, set(s) {
      this[e] = s;
    } };
    return { get: r, set(s) {
      const l = r?.call(this);
      o?.call(this, s), this.requestUpdate(t, l, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Z;
  }
  static _$Ei() {
    if (this.hasOwnProperty(E("elementProperties"))) return;
    const t = ft(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(E("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(E("properties"))) {
      const e = this.properties, i = [...ut(e), ...gt(e)];
      for (const r of i) this.createProperty(r, e[r]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [i, r] of e) this.elementProperties.set(i, r);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, i] of this.elementProperties) {
      const r = this._$Eu(e, i);
      r !== void 0 && this._$Eh.set(r, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const i = new Set(t.flat(1 / 0).reverse());
      for (const r of i) e.unshift(J(r));
    } else t !== void 0 && e.push(J(t));
    return e;
  }
  static _$Eu(t, e) {
    const i = e.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise(((t) => this.enableUpdating = t)), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach(((t) => t(this)));
  }
  addController(t) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(t), this.renderRoot !== void 0 && this.isConnected && t.hostConnected?.();
  }
  removeController(t) {
    this._$EO?.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), e = this.constructor.elementProperties;
    for (const i of e.keys()) this.hasOwnProperty(i) && (t.set(i, this[i]), delete this[i]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return ct(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach(((t) => t.hostConnected?.()));
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    this._$EO?.forEach(((t) => t.hostDisconnected?.()));
  }
  attributeChangedCallback(t, e, i) {
    this._$AK(t, i);
  }
  _$ET(t, e) {
    const i = this.constructor.elementProperties.get(t), r = this.constructor._$Eu(t, i);
    if (r !== void 0 && i.reflect === !0) {
      const o = (i.converter?.toAttribute !== void 0 ? i.converter : M).toAttribute(e, i.type);
      this._$Em = t, o == null ? this.removeAttribute(r) : this.setAttribute(r, o), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const i = this.constructor, r = i._$Eh.get(t);
    if (r !== void 0 && this._$Em !== r) {
      const o = i.getPropertyOptions(r), s = typeof o.converter == "function" ? { fromAttribute: o.converter } : o.converter?.fromAttribute !== void 0 ? o.converter : M;
      this._$Em = r;
      const l = s.fromAttribute(e, o.type);
      this[r] = l ?? this._$Ej?.get(r) ?? l, this._$Em = null;
    }
  }
  requestUpdate(t, e, i) {
    if (t !== void 0) {
      const r = this.constructor, o = this[t];
      if (i ??= r.getPropertyOptions(t), !((i.hasChanged ?? I)(o, e) || i.useDefault && i.reflect && o === this._$Ej?.get(t) && !this.hasAttribute(r._$Eu(t, i)))) return;
      this.C(t, e, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: i, reflect: r, wrapped: o }, s) {
    i && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, s ?? e ?? this[t]), o !== !0 || s !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (e = void 0), this._$AL.set(t, e)), r === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [r, o] of this._$Ep) this[r] = o;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [r, o] of i) {
        const { wrapped: s } = o, l = this[r];
        s !== !0 || this._$AL.has(r) || l === void 0 || this.C(r, void 0, o, l);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), this._$EO?.forEach(((i) => i.hostUpdate?.())), this.update(e)) : this._$EM();
    } catch (i) {
      throw t = !1, this._$EM(), i;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    this._$EO?.forEach(((e) => e.hostUpdated?.())), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Eq &&= this._$Eq.forEach(((e) => this._$ET(e, this[e]))), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
y.elementStyles = [], y.shadowRootOptions = { mode: "open" }, y[E("elementProperties")] = /* @__PURE__ */ new Map(), y[E("finalized")] = /* @__PURE__ */ new Map(), vt?.({ ReactiveElement: y }), (z.reactiveElementVersions ??= []).push("2.1.1");
const B = globalThis, H = B.trustedTypes, G = H ? H.createPolicy("lit-html", { createHTML: (n) => n }) : void 0, nt = "$lit$", f = `lit$${Math.random().toFixed(9).slice(2)}$`, ot = "?" + f, bt = `<${ot}>`, _ = document, C = () => _.createComment(""), P = (n) => n === null || typeof n != "object" && typeof n != "function", q = Array.isArray, _t = (n) => q(n) || typeof n?.[Symbol.iterator] == "function", L = `[ 	
\f\r]`, w = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Q = /-->/g, Y = />/g, v = RegExp(`>|${L}(?:([^\\s"'>=/]+)(${L}*=${L}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), tt = /'/g, et = /"/g, st = /^(?:script|style|textarea|title)$/i, yt = (n) => (t, ...e) => ({ _$litType$: n, strings: t, values: e }), g = yt(1), x = Symbol.for("lit-noChange"), d = Symbol.for("lit-nothing"), it = /* @__PURE__ */ new WeakMap(), b = _.createTreeWalker(_, 129);
function at(n, t) {
  if (!q(n) || !n.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return G !== void 0 ? G.createHTML(t) : t;
}
const xt = (n, t) => {
  const e = n.length - 1, i = [];
  let r, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", s = w;
  for (let l = 0; l < e; l++) {
    const a = n[l];
    let c, m, h = -1, p = 0;
    for (; p < a.length && (s.lastIndex = p, m = s.exec(a), m !== null); ) p = s.lastIndex, s === w ? m[1] === "!--" ? s = Q : m[1] !== void 0 ? s = Y : m[2] !== void 0 ? (st.test(m[2]) && (r = RegExp("</" + m[2], "g")), s = v) : m[3] !== void 0 && (s = v) : s === v ? m[0] === ">" ? (s = r ?? w, h = -1) : m[1] === void 0 ? h = -2 : (h = s.lastIndex - m[2].length, c = m[1], s = m[3] === void 0 ? v : m[3] === '"' ? et : tt) : s === et || s === tt ? s = v : s === Q || s === Y ? s = w : (s = v, r = void 0);
    const u = s === v && n[l + 1].startsWith("/>") ? " " : "";
    o += s === w ? a + bt : h >= 0 ? (i.push(c), a.slice(0, h) + nt + a.slice(h) + f + u) : a + f + (h === -2 ? l : u);
  }
  return [at(n, o + (n[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class O {
  constructor({ strings: t, _$litType$: e }, i) {
    let r;
    this.parts = [];
    let o = 0, s = 0;
    const l = t.length - 1, a = this.parts, [c, m] = xt(t, e);
    if (this.el = O.createElement(c, i), b.currentNode = this.el.content, e === 2 || e === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (r = b.nextNode()) !== null && a.length < l; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const h of r.getAttributeNames()) if (h.endsWith(nt)) {
          const p = m[s++], u = r.getAttribute(h).split(f), U = /([.?@])?(.*)/.exec(p);
          a.push({ type: 1, index: o, name: U[2], strings: u, ctor: U[1] === "." ? At : U[1] === "?" ? wt : U[1] === "@" ? Et : R }), r.removeAttribute(h);
        } else h.startsWith(f) && (a.push({ type: 6, index: o }), r.removeAttribute(h));
        if (st.test(r.tagName)) {
          const h = r.textContent.split(f), p = h.length - 1;
          if (p > 0) {
            r.textContent = H ? H.emptyScript : "";
            for (let u = 0; u < p; u++) r.append(h[u], C()), b.nextNode(), a.push({ type: 2, index: ++o });
            r.append(h[p], C());
          }
        }
      } else if (r.nodeType === 8) if (r.data === ot) a.push({ type: 2, index: o });
      else {
        let h = -1;
        for (; (h = r.data.indexOf(f, h + 1)) !== -1; ) a.push({ type: 7, index: o }), h += f.length - 1;
      }
      o++;
    }
  }
  static createElement(t, e) {
    const i = _.createElement("template");
    return i.innerHTML = t, i;
  }
}
function k(n, t, e = n, i) {
  if (t === x) return t;
  let r = i !== void 0 ? e._$Co?.[i] : e._$Cl;
  const o = P(t) ? void 0 : t._$litDirective$;
  return r?.constructor !== o && (r?._$AO?.(!1), o === void 0 ? r = void 0 : (r = new o(n), r._$AT(n, e, i)), i !== void 0 ? (e._$Co ??= [])[i] = r : e._$Cl = r), r !== void 0 && (t = k(n, r._$AS(n, t.values), r, i)), t;
}
class kt {
  constructor(t, e) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: e }, parts: i } = this._$AD, r = (t?.creationScope ?? _).importNode(e, !0);
    b.currentNode = r;
    let o = b.nextNode(), s = 0, l = 0, a = i[0];
    for (; a !== void 0; ) {
      if (s === a.index) {
        let c;
        a.type === 2 ? c = new T(o, o.nextSibling, this, t) : a.type === 1 ? c = new a.ctor(o, a.name, a.strings, this, t) : a.type === 6 && (c = new St(o, this, t)), this._$AV.push(c), a = i[++l];
      }
      s !== a?.index && (o = b.nextNode(), s++);
    }
    return b.currentNode = _, r;
  }
  p(t) {
    let e = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class T {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, i, r) {
    this.type = 2, this._$AH = d, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = r, this._$Cv = r?.isConnected ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && t?.nodeType === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = k(this, t, e), P(t) ? t === d || t == null || t === "" ? (this._$AH !== d && this._$AR(), this._$AH = d) : t !== this._$AH && t !== x && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : _t(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== d && P(this._$AH) ? this._$AA.nextSibling.data = t : this.T(_.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: i } = t, r = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = O.createElement(at(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === r) this._$AH.p(e);
    else {
      const o = new kt(r, this), s = o.u(this.options);
      o.p(e), this.T(s), this._$AH = o;
    }
  }
  _$AC(t) {
    let e = it.get(t.strings);
    return e === void 0 && it.set(t.strings, e = new O(t)), e;
  }
  k(t) {
    q(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, r = 0;
    for (const o of t) r === e.length ? e.push(i = new T(this.O(C()), this.O(C()), this, this.options)) : i = e[r], i._$AI(o), r++;
    r < e.length && (this._$AR(i && i._$AB.nextSibling, r), e.length = r);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const i = t.nextSibling;
      t.remove(), t = i;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class R {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, i, r, o) {
    this.type = 1, this._$AH = d, this._$AN = void 0, this.element = t, this.name = e, this._$AM = r, this.options = o, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = d;
  }
  _$AI(t, e = this, i, r) {
    const o = this.strings;
    let s = !1;
    if (o === void 0) t = k(this, t, e, 0), s = !P(t) || t !== this._$AH && t !== x, s && (this._$AH = t);
    else {
      const l = t;
      let a, c;
      for (t = o[0], a = 0; a < o.length - 1; a++) c = k(this, l[i + a], e, a), c === x && (c = this._$AH[a]), s ||= !P(c) || c !== this._$AH[a], c === d ? t = d : t !== d && (t += (c ?? "") + o[a + 1]), this._$AH[a] = c;
    }
    s && !r && this.j(t);
  }
  j(t) {
    t === d ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class At extends R {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === d ? void 0 : t;
  }
}
class wt extends R {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== d);
  }
}
class Et extends R {
  constructor(t, e, i, r, o) {
    super(t, e, i, r, o), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = k(this, t, e, 0) ?? d) === x) return;
    const i = this._$AH, r = t === d && i !== d || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, o = t !== d && (i === d || r);
    r && this.element.removeEventListener(this.name, this, i), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class St {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    k(this, t);
  }
}
const Ct = B.litHtmlPolyfillSupport;
Ct?.(O, T), (B.litHtmlVersions ??= []).push("3.3.1");
const Pt = (n, t, e) => {
  const i = e?.renderBefore ?? t;
  let r = i._$litPart$;
  if (r === void 0) {
    const o = e?.renderBefore ?? null;
    i._$litPart$ = r = new T(t.insertBefore(C(), o), o, void 0, e ?? {});
  }
  return r._$AI(n), r;
};
const V = globalThis;
class S extends y {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Pt(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return x;
  }
}
S._$litElement$ = !0, S.finalized = !0, V.litElementHydrateSupport?.({ LitElement: S });
const Ot = V.litElementPolyfillSupport;
Ot?.({ LitElement: S });
(V.litElementVersions ??= []).push("4.2.1");
const Tt = (n) => (t, e) => {
  e !== void 0 ? e.addInitializer((() => {
    customElements.define(n, t);
  })) : customElements.define(n, t);
};
const Ut = { attribute: !0, type: String, converter: M, reflect: !1, hasChanged: I }, Nt = (n = Ut, t, e) => {
  const { kind: i, metadata: r } = e;
  let o = globalThis.litPropertyMetadata.get(r);
  if (o === void 0 && globalThis.litPropertyMetadata.set(r, o = /* @__PURE__ */ new Map()), i === "setter" && ((n = Object.create(n)).wrapped = !0), o.set(e.name, n), i === "accessor") {
    const { name: s } = e;
    return { set(l) {
      const a = t.get.call(this);
      t.set.call(this, l), this.requestUpdate(s, a, n);
    }, init(l) {
      return l !== void 0 && this.C(s, void 0, n, l), l;
    } };
  }
  if (i === "setter") {
    const { name: s } = e;
    return function(l) {
      const a = this[s];
      t.call(this, l), this.requestUpdate(s, a, n);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function W(n) {
  return (t, e) => typeof e == "object" ? Nt(n, t, e) : ((i, r, o) => {
    const s = r.hasOwnProperty(o);
    return r.constructor.createProperty(o, i), s ? Object.getOwnPropertyDescriptor(r, o) : void 0;
  })(n, t, e);
}
function X(n) {
  return W({ ...n, state: !0, attribute: !1 });
}
const Mt = ht`
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
`;
function Ht() {
  const n = [
    "html.dark:not([data-color-scheme='light']):not(.light):not([class*='light'])",
    "html[class~='dark']:not([data-color-scheme='light']):not(.light):not([class*='light'])",
    "html[class*='dark']:not([data-color-scheme='light']):not(.light):not([class*='light'])",
    "html[data-color-scheme='dark']:not([data-color-scheme='light'])",
    "html[data-theme='dark']:not([data-theme='light'])",
    "html[theme='dark']:not([theme='light'])",
    "[data-color-scheme='dark']:not([data-color-scheme='light'])",
    "[data-theme='dark']:not([data-theme='light'])",
    "[theme='dark']:not([theme='light'])"
  ], t = document.documentElement, e = document.body;
  return n.some((r) => {
    try {
      return t.matches(r) || e.matches(r);
    } catch {
      return !1;
    }
  }) || t.classList.contains("dark") || t.getAttribute("data-theme") === "dark" || t.getAttribute("data-color-scheme") === "dark" || t.getAttribute("theme") === "dark";
}
function zt(n) {
  const t = new MutationObserver(n);
  return t.observe(document.documentElement, {
    attributes: !0,
    attributeFilter: ["class", "data-theme", "data-color-scheme", "theme"]
  }), t.observe(document.body, {
    attributes: !0,
    attributeFilter: ["class", "data-theme", "data-color-scheme", "theme"]
  }), t;
}
function Rt() {
  return window.__TIMELINE_API_BASE__ || "/apis/api.timeline.xhhao.com/v1alpha1/timelines";
}
async function Lt(n) {
  if (!n)
    return [];
  const e = `${Rt()}?group=${encodeURIComponent(n)}`, i = await fetch(e);
  if (!i.ok)
    throw new Error(`Failed to fetch timelines: ${i.statusText}`);
  return ((await i.json()).items || []).map((s) => ({
    date: s.spec?.date,
    displayName: s.spec?.displayName,
    image: s.spec?.image,
    active: s.spec?.active || !1,
    relatedLinks: s.spec?.relatedLinks
  })).sort((s, l) => s.date ? l.date ? l.date.localeCompare(s.date) : -1 : 1);
}
var jt = Object.defineProperty, Dt = Object.getOwnPropertyDescriptor, A = (n, t, e, i) => {
  for (var r = i > 1 ? void 0 : i ? Dt(t, e) : t, o = n.length - 1, s; o >= 0; o--)
    (s = n[o]) && (r = (i ? s(t, e, r) : s(r)) || r);
  return i && r && jt(t, e, r), r;
};
let $ = class extends S {
  constructor() {
    super(...arguments), this.groupName = "", this.orientation = "vertical", this.items = [], this.isLoading = !1, this.isDark = !1;
  }
  connectedCallback() {
    super.connectedCallback(), this.detectTheme(), this.observeTheme(), this.groupName && this.fetchTimelines();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.themeObserver && this.themeObserver.disconnect();
  }
  updated(n) {
    super.updated(n), n.has("groupName") && this.groupName && this.fetchTimelines();
  }
  detectTheme() {
    this.isDark = Ht();
  }
  observeTheme() {
    this.themeObserver = zt(() => {
      this.detectTheme();
    });
  }
  async fetchTimelines() {
    if (this.groupName) {
      this.isLoading = !0;
      try {
        this.items = await Lt(this.groupName);
      } catch (n) {
        console.error("Error fetching timelines:", n), this.items = [];
      } finally {
        this.isLoading = !1;
      }
    }
  }
  render() {
    return this.isLoading ? g`
        <div class="timeline-loading">加载中...</div>
      ` : this.items.length === 0 ? g`
        <div class="timeline-empty">暂无时间轴数据</div>
      ` : (this.orientation && this.setAttribute("orientation", this.orientation), g`
      <div class="timeline ${this.isDark ? "dark" : ""}">
        ${this.items.map(
      (n, t) => {
        const e = this.orientation === "alternating", i = t % 2 === 0, r = e ? i ? "timeline-item-right" : "timeline-item-left" : "";
        return g`
            <div class="timeline-item ${n.image ? "has-image" : ""} ${r}">
              <div class="timeline-marker ${n.active ? "active" : ""}"></div>
              <div class="timeline-content">
                ${n.image ? g`
                  <div class="timeline-image-wrapper">
                    <img src="${n.image}" alt="${n.displayName || ""}" class="timeline-image" />
                  </div>
                ` : ""}
                <div class="timeline-content-inner">
                  ${n.date ? g`<div class="timeline-date">${n.date}</div>` : ""}
                  ${n.displayName ? g`<div class="timeline-title">${n.displayName}</div>` : ""}
                  ${n.relatedLinks ? g`
                    <div class="timeline-link">
                      <a href="${n.relatedLinks}" target="_blank" rel="noopener noreferrer">查看关联</a>
                    </div>
                  ` : ""}
                </div>
              </div>
            </div>
          `;
      }
    )}
      </div>
    `);
  }
};
$.styles = Mt;
A([
  W({ type: String, attribute: "group-name" })
], $.prototype, "groupName", 2);
A([
  W({ type: String })
], $.prototype, "orientation", 2);
A([
  X()
], $.prototype, "items", 2);
A([
  X()
], $.prototype, "isLoading", 2);
A([
  X()
], $.prototype, "isDark", 2);
$ = A([
  Tt("timeline-view")
], $);
export {
  $ as Timeline
};
