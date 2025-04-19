var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// ponyfills/helpers/glob.ts
import { inspect } from "node:util";
import { readdirSync, lstatSync } from "node:fs";
import { readdir, lstat } from "node:fs/promises";
import { join, resolve, basename, isAbsolute, dirname } from "node:path";
import assert from "node:assert";

// https://esm.sh/balanced-match@1.0.2?target=denonext
var balanced_match_1_0_exports = {};
__export(balanced_match_1_0_exports, {
  default: () => z,
  range: () => q
});

// https://esm.sh/balanced-match@1.0.2/denonext/balanced-match.mjs
var v = Object.create;
var u = Object.defineProperty;
var O = Object.getOwnPropertyDescriptor;
var j = Object.getOwnPropertyNames;
var y = Object.getPrototypeOf;
var E = Object.prototype.hasOwnProperty;
var R = (n, e) => () => (e || n((e = { exports: {} }).exports, e), e.exports);
var w = (n, e, i, t) => {
  if (e && typeof e == "object" || typeof e == "function") for (let f of j(e)) !E.call(n, f) && f !== i && u(n, f, { get: () => e[f], enumerable: !(t = O(e, f)) || t.enumerable });
  return n;
};
var M = (n, e, i) => (i = n != null ? v(y(n)) : {}, w(e || !n || !n.__esModule ? u(i, "default", { value: n, enumerable: true }) : i, n));
var m = R((k2, x2) => {
  "use strict";
  x2.exports = s;
  function s(n, e, i) {
    n instanceof RegExp && (n = h(n, i)), e instanceof RegExp && (e = h(e, i));
    var t = d(n, e, i);
    return t && { start: t[0], end: t[1], pre: i.slice(0, t[0]), body: i.slice(t[0] + n.length, t[1]), post: i.slice(t[1] + e.length) };
  }
  function h(n, e) {
    var i = e.match(n);
    return i ? i[0] : null;
  }
  s.range = d;
  function d(n, e, i) {
    var t, f, c, p, o, r2 = i.indexOf(n), l = i.indexOf(e, r2 + 1), a = r2;
    if (r2 >= 0 && l > 0) {
      if (n === e) return [r2, l];
      for (t = [], c = i.length; a >= 0 && !o; ) a == r2 ? (t.push(a), r2 = i.indexOf(n, a + 1)) : t.length == 1 ? o = [t.pop(), l] : (f = t.pop(), f < c && (c = f, p = l), l = i.indexOf(e, a + 1)), a = r2 < l && r2 >= 0 ? r2 : l;
      t.length && (o = [c, p]);
    }
    return o;
  }
});
var g = M(m());
var { range: q } = g;
var z = g.default ?? g;

// https://esm.sh/brace-expansion@2.0.1/denonext/brace-expansion.mjs
var require2 = (n) => {
  const e = (m3) => typeof m3.default < "u" ? m3.default : m3, c = (m3) => Object.assign({ __esModule: true }, m3);
  switch (n) {
    case "balanced-match":
      return e(balanced_match_1_0_exports);
    default:
      console.error('module "' + n + '" not found');
      return null;
  }
};
var F = Object.create;
var P = Object.defineProperty;
var G = Object.getOwnPropertyDescriptor;
var J = Object.getOwnPropertyNames;
var K = Object.getPrototypeOf;
var Q = Object.prototype.hasOwnProperty;
var U = ((r2) => typeof require2 < "u" ? require2 : typeof Proxy < "u" ? new Proxy(r2, { get: (a, e) => (typeof require2 < "u" ? require2 : a)[e] }) : r2)(function(r2) {
  if (typeof require2 < "u") return require2.apply(this, arguments);
  throw Error('Dynamic require of "' + r2 + '" is not supported');
});
var V = (r2, a) => () => (a || r2((a = { exports: {} }).exports, a), a.exports);
var W = (r2, a, e, t) => {
  if (a && typeof a == "object" || typeof a == "function") for (let i of J(a)) !Q.call(r2, i) && i !== e && P(r2, i, { get: () => a[i], enumerable: !(t = G(a, i)) || t.enumerable });
  return r2;
};
var X = (r2, a, e) => (e = r2 != null ? F(K(r2)) : {}, W(a || !r2 || !r2.__esModule ? P(e, "default", { value: r2, enumerable: true }) : e, r2));
var Z = V((er, S) => {
  var A2 = U("balanced-match");
  S.exports = k2;
  var $2 = "\0SLASH" + Math.random() + "\0", E2 = "\0OPEN" + Math.random() + "\0", g2 = "\0CLOSE" + Math.random() + "\0", I2 = "\0COMMA" + Math.random() + "\0", B2 = "\0PERIOD" + Math.random() + "\0";
  function m3(r2) {
    return parseInt(r2, 10) == r2 ? parseInt(r2, 10) : r2.charCodeAt(0);
  }
  function Y(r2) {
    return r2.split("\\\\").join($2).split("\\{").join(E2).split("\\}").join(g2).split("\\,").join(I2).split("\\.").join(B2);
  }
  function _2(r2) {
    return r2.split($2).join("\\").split(E2).join("{").split(g2).join("}").split(I2).join(",").split(B2).join(".");
  }
  function L(r2) {
    if (!r2) return [""];
    var a = [], e = A2("{", "}", r2);
    if (!e) return r2.split(",");
    var t = e.pre, i = e.body, s = e.post, o = t.split(",");
    o[o.length - 1] += "{" + i + "}";
    var f = L(s);
    return s.length && (o[o.length - 1] += f.shift(), o.push.apply(o, f)), a.push.apply(a, o), a;
  }
  function k2(r2) {
    return r2 ? (r2.substr(0, 2) === "{}" && (r2 = "\\{\\}" + r2.substr(2)), h(Y(r2), true).map(_2)) : [];
  }
  function q3(r2) {
    return "{" + r2 + "}";
  }
  function N2(r2) {
    return /^-?0\d/.test(r2);
  }
  function rr(r2, a) {
    return r2 <= a;
  }
  function ar(r2, a) {
    return r2 >= a;
  }
  function h(r2, a) {
    var e = [], t = A2("{", "}", r2);
    if (!t) return [r2];
    var i = t.pre, s = t.post.length ? h(t.post, false) : [""];
    if (/\$$/.test(t.pre)) for (var o = 0; o < s.length; o++) {
      var f = i + "{" + t.body + "}" + s[o];
      e.push(f);
    }
    else {
      var w3 = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(t.body), c = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(t.body), d = w3 || c, z3 = t.body.indexOf(",") >= 0;
      if (!d && !z3) return t.post.match(/,.*\}/) ? (r2 = t.pre + "{" + t.body + g2 + t.post, h(r2)) : [r2];
      var n;
      if (d) n = t.body.split(/\.\./);
      else if (n = L(t.body), n.length === 1 && (n = h(n[0], false).map(q3), n.length === 1)) return s.map(function(T) {
        return t.pre + n[0] + T;
      });
      var l;
      if (d) {
        var j3 = m3(n[0]), y3 = m3(n[1]), D2 = Math.max(n[0].length, n[1].length), M3 = n.length == 3 ? Math.abs(m3(n[2])) : 1, C2 = rr, H2 = y3 < j3;
        H2 && (M3 *= -1, C2 = ar);
        var R3 = n.some(N2);
        l = [];
        for (var u2 = j3; C2(u2, y3); u2 += M3) {
          var p;
          if (c) p = String.fromCharCode(u2), p === "\\" && (p = "");
          else if (p = String(u2), R3) {
            var x2 = D2 - p.length;
            if (x2 > 0) {
              var O2 = new Array(x2 + 1).join("0");
              u2 < 0 ? p = "-" + O2 + p.slice(1) : p = O2 + p;
            }
          }
          l.push(p);
        }
      } else {
        l = [];
        for (var v3 = 0; v3 < n.length; v3++) l.push.apply(l, h(n[v3], false));
      }
      for (var v3 = 0; v3 < l.length; v3++) for (var o = 0; o < s.length; o++) {
        var f = i + l[v3] + s[o];
        (!a || d || f) && e.push(f);
      }
    }
    return e;
  }
});
var b = X(Z());
var nr = b.default ?? b;

// https://esm.sh/minimatch@9.0.5/denonext/minimatch.mjs
import __Process$ from "node:process";
var $ = (r2) => {
  if (typeof r2 != "string") throw new TypeError("invalid pattern");
  if (r2.length > 65536) throw new TypeError("pattern is too long");
};
var F2 = { "[:alnum:]": ["\\p{L}\\p{Nl}\\p{Nd}", true], "[:alpha:]": ["\\p{L}\\p{Nl}", true], "[:ascii:]": ["\\x00-\\x7f", false], "[:blank:]": ["\\p{Zs}\\t", true], "[:cntrl:]": ["\\p{Cc}", true], "[:digit:]": ["\\p{Nd}", true], "[:graph:]": ["\\p{Z}\\p{C}", true, true], "[:lower:]": ["\\p{Ll}", true], "[:print:]": ["\\p{C}", true], "[:punct:]": ["\\p{P}", true], "[:space:]": ["\\p{Z}\\t\\r\\n\\v\\f", true], "[:upper:]": ["\\p{Lu}", true], "[:word:]": ["\\p{L}\\p{Nl}\\p{Nd}\\p{Pc}", true], "[:xdigit:]": ["A-Fa-f0-9", false] };
var M2 = (r2) => r2.replace(/[[\]\\-]/g, "\\$&");
var H = (r2) => r2.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
var j2 = (r2) => r2.join("");
var k = (r2, t) => {
  let e = t;
  if (r2.charAt(e) !== "[") throw new Error("not in a brace expression");
  let s = [], i = [], n = e + 1, o = false, h = false, c = false, a = false, l = e, g2 = "";
  t: for (; n < r2.length; ) {
    let f = r2.charAt(n);
    if ((f === "!" || f === "^") && n === e + 1) {
      a = true, n++;
      continue;
    }
    if (f === "]" && o && !c) {
      l = n + 1;
      break;
    }
    if (o = true, f === "\\" && !c) {
      c = true, n++;
      continue;
    }
    if (f === "[" && !c) {
      for (let [S, [E2, O2, T]] of Object.entries(F2)) if (r2.startsWith(S, n)) {
        if (g2) return ["$.", false, r2.length - e, true];
        n += S.length, T ? i.push(E2) : s.push(E2), h = h || O2;
        continue t;
      }
    }
    if (c = false, g2) {
      f > g2 ? s.push(M2(g2) + "-" + M2(f)) : f === g2 && s.push(M2(f)), g2 = "", n++;
      continue;
    }
    if (r2.startsWith("-]", n + 1)) {
      s.push(M2(f + "-")), n += 2;
      continue;
    }
    if (r2.startsWith("-", n + 1)) {
      g2 = f, n += 2;
      continue;
    }
    s.push(M2(f)), n++;
  }
  if (l < n) return ["", false, 0, false];
  if (!s.length && !i.length) return ["$.", false, r2.length - e, true];
  if (i.length === 0 && s.length === 1 && /^\\?.$/.test(s[0]) && !a) {
    let f = s[0].length === 2 ? s[0].slice(-1) : s[0];
    return [H(f), false, l - e, false];
  }
  let p = "[" + (a ? "^" : "") + j2(s) + "]", u2 = "[" + (a ? "" : "^") + j2(i) + "]";
  return [s.length && i.length ? "(" + p + "|" + u2 + ")" : s.length ? p : u2, h, l - e, true];
};
var x = (r2, { windowsPathsNoEscape: t = false } = {}) => t ? r2.replace(/\[([^\/\\])\]/g, "$1") : r2.replace(/((?!\\).|^)\[([^\/\\])\]/g, "$1$2").replace(/\\([^\/])/g, "$1");
var J2 = /* @__PURE__ */ new Set(["!", "?", "+", "*", "@"]);
var C = (r2) => J2.has(r2);
var Z2 = "(?!(?:^|/)\\.\\.?(?:$|/))";
var v2 = "(?!\\.)";
var V2 = /* @__PURE__ */ new Set(["[", "."]);
var X2 = /* @__PURE__ */ new Set(["..", "."]);
var K2 = new Set("().*{}+?[]^$\\!");
var Q2 = (r2) => r2.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
var R2 = "[^/]";
var D = R2 + "*?";
var P2 = R2 + "+?";
var N = class r {
  type;
  #s;
  #i;
  #r = false;
  #t = [];
  #e;
  #o;
  #c;
  #h = false;
  #n;
  #a;
  #u = false;
  constructor(t, e, s = {}) {
    this.type = t, t && (this.#i = true), this.#e = e, this.#s = this.#e ? this.#e.#s : this, this.#n = this.#s === this ? s : this.#s.#n, this.#c = this.#s === this ? [] : this.#s.#c, t === "!" && !this.#s.#h && this.#c.push(this), this.#o = this.#e ? this.#e.#t.length : 0;
  }
  get hasMagic() {
    if (this.#i !== void 0) return this.#i;
    for (let t of this.#t) if (typeof t != "string" && (t.type || t.hasMagic)) return this.#i = true;
    return this.#i;
  }
  toString() {
    return this.#a !== void 0 ? this.#a : this.type ? this.#a = this.type + "(" + this.#t.map((t) => String(t)).join("|") + ")" : this.#a = this.#t.map((t) => String(t)).join("");
  }
  #p() {
    if (this !== this.#s) throw new Error("should only call on root");
    if (this.#h) return this;
    this.toString(), this.#h = true;
    let t;
    for (; t = this.#c.pop(); ) {
      if (t.type !== "!") continue;
      let e = t, s = e.#e;
      for (; s; ) {
        for (let i = e.#o + 1; !s.type && i < s.#t.length; i++) for (let n of t.#t) {
          if (typeof n == "string") throw new Error("string part in extglob AST??");
          n.copyIn(s.#t[i]);
        }
        e = s, s = e.#e;
      }
    }
    return this;
  }
  push(...t) {
    for (let e of t) if (e !== "") {
      if (typeof e != "string" && !(e instanceof r && e.#e === this)) throw new Error("invalid part: " + e);
      this.#t.push(e);
    }
  }
  toJSON() {
    let t = this.type === null ? this.#t.slice().map((e) => typeof e == "string" ? e : e.toJSON()) : [this.type, ...this.#t.map((e) => e.toJSON())];
    return this.isStart() && !this.type && t.unshift([]), this.isEnd() && (this === this.#s || this.#s.#h && this.#e?.type === "!") && t.push({}), t;
  }
  isStart() {
    if (this.#s === this) return true;
    if (!this.#e?.isStart()) return false;
    if (this.#o === 0) return true;
    let t = this.#e;
    for (let e = 0; e < this.#o; e++) {
      let s = t.#t[e];
      if (!(s instanceof r && s.type === "!")) return false;
    }
    return true;
  }
  isEnd() {
    if (this.#s === this || this.#e?.type === "!") return true;
    if (!this.#e?.isEnd()) return false;
    if (!this.type) return this.#e?.isEnd();
    let t = this.#e ? this.#e.#t.length : 0;
    return this.#o === t - 1;
  }
  copyIn(t) {
    typeof t == "string" ? this.push(t) : this.push(t.clone(this));
  }
  clone(t) {
    let e = new r(this.type, t);
    for (let s of this.#t) e.copyIn(s);
    return e;
  }
  static #l(t, e, s, i) {
    let n = false, o = false, h = -1, c = false;
    if (e.type === null) {
      let u2 = s, d = "";
      for (; u2 < t.length; ) {
        let f = t.charAt(u2++);
        if (n || f === "\\") {
          n = !n, d += f;
          continue;
        }
        if (o) {
          u2 === h + 1 ? (f === "^" || f === "!") && (c = true) : f === "]" && !(u2 === h + 2 && c) && (o = false), d += f;
          continue;
        } else if (f === "[") {
          o = true, h = u2, c = false, d += f;
          continue;
        }
        if (!i.noext && C(f) && t.charAt(u2) === "(") {
          e.push(d), d = "";
          let S = new r(f, e);
          u2 = r.#l(t, S, u2, i), e.push(S);
          continue;
        }
        d += f;
      }
      return e.push(d), u2;
    }
    let a = s + 1, l = new r(null, e), g2 = [], p = "";
    for (; a < t.length; ) {
      let u2 = t.charAt(a++);
      if (n || u2 === "\\") {
        n = !n, p += u2;
        continue;
      }
      if (o) {
        a === h + 1 ? (u2 === "^" || u2 === "!") && (c = true) : u2 === "]" && !(a === h + 2 && c) && (o = false), p += u2;
        continue;
      } else if (u2 === "[") {
        o = true, h = a, c = false, p += u2;
        continue;
      }
      if (C(u2) && t.charAt(a) === "(") {
        l.push(p), p = "";
        let d = new r(u2, l);
        l.push(d), a = r.#l(t, d, a, i);
        continue;
      }
      if (u2 === "|") {
        l.push(p), p = "", g2.push(l), l = new r(null, e);
        continue;
      }
      if (u2 === ")") return p === "" && e.#t.length === 0 && (e.#u = true), l.push(p), p = "", e.push(...g2, l), a;
      p += u2;
    }
    return e.type = null, e.#i = void 0, e.#t = [t.substring(s - 1)], a;
  }
  static fromGlob(t, e = {}) {
    let s = new r(null, void 0, e);
    return r.#l(t, s, 0, e), s;
  }
  toMMPattern() {
    if (this !== this.#s) return this.#s.toMMPattern();
    let t = this.toString(), [e, s, i, n] = this.toRegExpSource();
    if (!(i || this.#i || this.#n.nocase && !this.#n.nocaseMagicOnly && t.toUpperCase() !== t.toLowerCase())) return s;
    let h = (this.#n.nocase ? "i" : "") + (n ? "u" : "");
    return Object.assign(new RegExp(`^${e}$`, h), { _src: e, _glob: t });
  }
  get options() {
    return this.#n;
  }
  toRegExpSource(t) {
    let e = t ?? !!this.#n.dot;
    if (this.#s === this && this.#p(), !this.type) {
      let c = this.isStart() && this.isEnd(), a = this.#t.map((u2) => {
        let [d, f, S, E2] = typeof u2 == "string" ? r.#g(u2, this.#i, c) : u2.toRegExpSource(t);
        return this.#i = this.#i || S, this.#r = this.#r || E2, d;
      }).join(""), l = "";
      if (this.isStart() && typeof this.#t[0] == "string" && !(this.#t.length === 1 && X2.has(this.#t[0]))) {
        let d = V2, f = e && d.has(a.charAt(0)) || a.startsWith("\\.") && d.has(a.charAt(2)) || a.startsWith("\\.\\.") && d.has(a.charAt(4)), S = !e && !t && d.has(a.charAt(0));
        l = f ? Z2 : S ? v2 : "";
      }
      let g2 = "";
      return this.isEnd() && this.#s.#h && this.#e?.type === "!" && (g2 = "(?:$|\\/)"), [l + a + g2, x(a), this.#i = !!this.#i, this.#r];
    }
    let s = this.type === "*" || this.type === "+", i = this.type === "!" ? "(?:(?!(?:" : "(?:", n = this.#f(e);
    if (this.isStart() && this.isEnd() && !n && this.type !== "!") {
      let c = this.toString();
      return this.#t = [c], this.type = null, this.#i = void 0, [c, x(this.toString()), false, false];
    }
    let o = !s || t || e || !v2 ? "" : this.#f(true);
    o === n && (o = ""), o && (n = `(?:${n})(?:${o})*?`);
    let h = "";
    if (this.type === "!" && this.#u) h = (this.isStart() && !e ? v2 : "") + P2;
    else {
      let c = this.type === "!" ? "))" + (this.isStart() && !e && !t ? v2 : "") + D + ")" : this.type === "@" ? ")" : this.type === "?" ? ")?" : this.type === "+" && o ? ")" : this.type === "*" && o ? ")?" : `)${this.type}`;
      h = i + n + c;
    }
    return [h, x(n), this.#i = !!this.#i, this.#r];
  }
  #f(t) {
    return this.#t.map((e) => {
      if (typeof e == "string") throw new Error("string type in extglob ast??");
      let [s, i, n, o] = e.toRegExpSource(t);
      return this.#r = this.#r || o, s;
    }).filter((e) => !(this.isStart() && this.isEnd()) || !!e).join("|");
  }
  static #g(t, e, s = false) {
    let i = false, n = "", o = false;
    for (let h = 0; h < t.length; h++) {
      let c = t.charAt(h);
      if (i) {
        i = false, n += (K2.has(c) ? "\\" : "") + c;
        continue;
      }
      if (c === "\\") {
        h === t.length - 1 ? n += "\\\\" : i = true;
        continue;
      }
      if (c === "[") {
        let [a, l, g2, p] = k(t, h);
        if (g2) {
          n += a, o = o || l, h += g2 - 1, e = e || p;
          continue;
        }
      }
      if (c === "*") {
        s && t === "*" ? n += P2 : n += D, e = true;
        continue;
      }
      if (c === "?") {
        n += R2, e = true;
        continue;
      }
      n += Q2(c);
    }
    return [n, x(t), !!e, o];
  }
};
var W2 = (r2, { windowsPathsNoEscape: t = false } = {}) => t ? r2.replace(/[?*()[\]]/g, "[$&]") : r2.replace(/[?*()[\]\\]/g, "\\$&");
var m2 = (r2, t, e = {}) => ($(t), !e.nocomment && t.charAt(0) === "#" ? false : new A(t, e).match(r2));
var tt = /^\*+([^+@!?\*\[\(]*)$/;
var et = (r2) => (t) => !t.startsWith(".") && t.endsWith(r2);
var st = (r2) => (t) => t.endsWith(r2);
var it = (r2) => (r2 = r2.toLowerCase(), (t) => !t.startsWith(".") && t.toLowerCase().endsWith(r2));
var nt = (r2) => (r2 = r2.toLowerCase(), (t) => t.toLowerCase().endsWith(r2));
var rt = /^\*+\.\*+$/;
var ot = (r2) => !r2.startsWith(".") && r2.includes(".");
var ht = (r2) => r2 !== "." && r2 !== ".." && r2.includes(".");
var ct = /^\.\*+$/;
var at = (r2) => r2 !== "." && r2 !== ".." && r2.startsWith(".");
var lt = /^\*+$/;
var ut = (r2) => r2.length !== 0 && !r2.startsWith(".");
var ft = (r2) => r2.length !== 0 && r2 !== "." && r2 !== "..";
var pt = /^\?+([^+@!?\*\[\(]*)?$/;
var gt = ([r2, t = ""]) => {
  let e = q2([r2]);
  return t ? (t = t.toLowerCase(), (s) => e(s) && s.toLowerCase().endsWith(t)) : e;
};
var dt = ([r2, t = ""]) => {
  let e = _([r2]);
  return t ? (t = t.toLowerCase(), (s) => e(s) && s.toLowerCase().endsWith(t)) : e;
};
var mt = ([r2, t = ""]) => {
  let e = _([r2]);
  return t ? (s) => e(s) && s.endsWith(t) : e;
};
var wt = ([r2, t = ""]) => {
  let e = q2([r2]);
  return t ? (s) => e(s) && s.endsWith(t) : e;
};
var q2 = ([r2]) => {
  let t = r2.length;
  return (e) => e.length === t && !e.startsWith(".");
};
var _ = ([r2]) => {
  let t = r2.length;
  return (e) => e.length === t && e !== "." && e !== "..";
};
var B = typeof __Process$ == "object" && __Process$ ? typeof __Process$.env == "object" && __Process$.env && __Process$.env.__MINIMATCH_TESTING_PLATFORM__ || __Process$.platform : "posix";
var z2 = { win32: { sep: "\\" }, posix: { sep: "/" } };
var yt = B === "win32" ? z2.win32.sep : z2.posix.sep;
m2.sep = yt;
var y2 = Symbol("globstar **");
m2.GLOBSTAR = y2;
var St = "[^/]";
var xt = St + "*?";
var Et = "(?:(?!(?:\\/|^)(?:\\.{1,2})($|\\/)).)*?";
var Tt = "(?:(?!(?:\\/|^)\\.).)*?";
var bt = (r2, t = {}) => (e) => m2(e, r2, t);
m2.filter = bt;
var w2 = (r2, t = {}) => Object.assign({}, r2, t);
var Nt = (r2) => {
  if (!r2 || typeof r2 != "object" || !Object.keys(r2).length) return m2;
  let t = m2;
  return Object.assign((s, i, n = {}) => t(s, i, w2(r2, n)), { Minimatch: class extends t.Minimatch {
    constructor(i, n = {}) {
      super(i, w2(r2, n));
    }
    static defaults(i) {
      return t.defaults(w2(r2, i)).Minimatch;
    }
  }, AST: class extends t.AST {
    constructor(i, n, o = {}) {
      super(i, n, w2(r2, o));
    }
    static fromGlob(i, n = {}) {
      return t.AST.fromGlob(i, w2(r2, n));
    }
  }, unescape: (s, i = {}) => t.unescape(s, w2(r2, i)), escape: (s, i = {}) => t.escape(s, w2(r2, i)), filter: (s, i = {}) => t.filter(s, w2(r2, i)), defaults: (s) => t.defaults(w2(r2, s)), makeRe: (s, i = {}) => t.makeRe(s, w2(r2, i)), braceExpand: (s, i = {}) => t.braceExpand(s, w2(r2, i)), match: (s, i, n = {}) => t.match(s, i, w2(r2, n)), sep: t.sep, GLOBSTAR: y2 });
};
m2.defaults = Nt;
var I = (r2, t = {}) => ($(r2), t.nobrace || !/\{(?:(?!\{).)*\}/.test(r2) ? [r2] : nr(r2));
m2.braceExpand = I;
var At = (r2, t = {}) => new A(r2, t).makeRe();
m2.makeRe = At;
var $t = (r2, t, e = {}) => {
  let s = new A(t, e);
  return r2 = r2.filter((i) => s.match(i)), s.options.nonull && !r2.length && r2.push(t), r2;
};
m2.match = $t;
var G2 = /[?*]|[+@!]\(.*?\)|\[|\]/;
var Mt = (r2) => r2.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
var A = class {
  options;
  set;
  pattern;
  windowsPathsNoEscape;
  nonegate;
  negate;
  comment;
  empty;
  preserveMultipleSlashes;
  partial;
  globSet;
  globParts;
  nocase;
  isWindows;
  platform;
  windowsNoMagicRoot;
  regexp;
  constructor(t, e = {}) {
    $(t), e = e || {}, this.options = e, this.pattern = t, this.platform = e.platform || B, this.isWindows = this.platform === "win32", this.windowsPathsNoEscape = !!e.windowsPathsNoEscape || e.allowWindowsEscape === false, this.windowsPathsNoEscape && (this.pattern = this.pattern.replace(/\\/g, "/")), this.preserveMultipleSlashes = !!e.preserveMultipleSlashes, this.regexp = null, this.negate = false, this.nonegate = !!e.nonegate, this.comment = false, this.empty = false, this.partial = !!e.partial, this.nocase = !!this.options.nocase, this.windowsNoMagicRoot = e.windowsNoMagicRoot !== void 0 ? e.windowsNoMagicRoot : !!(this.isWindows && this.nocase), this.globSet = [], this.globParts = [], this.set = [], this.make();
  }
  hasMagic() {
    if (this.options.magicalBraces && this.set.length > 1) return true;
    for (let t of this.set) for (let e of t) if (typeof e != "string") return true;
    return false;
  }
  debug(...t) {
  }
  make() {
    let t = this.pattern, e = this.options;
    if (!e.nocomment && t.charAt(0) === "#") {
      this.comment = true;
      return;
    }
    if (!t) {
      this.empty = true;
      return;
    }
    this.parseNegate(), this.globSet = [...new Set(this.braceExpand())], e.debug && (this.debug = (...n) => console.error(...n)), this.debug(this.pattern, this.globSet);
    let s = this.globSet.map((n) => this.slashSplit(n));
    this.globParts = this.preprocess(s), this.debug(this.pattern, this.globParts);
    let i = this.globParts.map((n, o, h) => {
      if (this.isWindows && this.windowsNoMagicRoot) {
        let c = n[0] === "" && n[1] === "" && (n[2] === "?" || !G2.test(n[2])) && !G2.test(n[3]), a = /^[a-z]:/i.test(n[0]);
        if (c) return [...n.slice(0, 4), ...n.slice(4).map((l) => this.parse(l))];
        if (a) return [n[0], ...n.slice(1).map((l) => this.parse(l))];
      }
      return n.map((c) => this.parse(c));
    });
    if (this.debug(this.pattern, i), this.set = i.filter((n) => n.indexOf(false) === -1), this.isWindows) for (let n = 0; n < this.set.length; n++) {
      let o = this.set[n];
      o[0] === "" && o[1] === "" && this.globParts[n][2] === "?" && typeof o[3] == "string" && /^[a-z]:$/i.test(o[3]) && (o[2] = "?");
    }
    this.debug(this.pattern, this.set);
  }
  preprocess(t) {
    if (this.options.noglobstar) for (let s = 0; s < t.length; s++) for (let i = 0; i < t[s].length; i++) t[s][i] === "**" && (t[s][i] = "*");
    let { optimizationLevel: e = 1 } = this.options;
    return e >= 2 ? (t = this.firstPhasePreProcess(t), t = this.secondPhasePreProcess(t)) : e >= 1 ? t = this.levelOneOptimize(t) : t = this.adjascentGlobstarOptimize(t), t;
  }
  adjascentGlobstarOptimize(t) {
    return t.map((e) => {
      let s = -1;
      for (; (s = e.indexOf("**", s + 1)) !== -1; ) {
        let i = s;
        for (; e[i + 1] === "**"; ) i++;
        i !== s && e.splice(s, i - s);
      }
      return e;
    });
  }
  levelOneOptimize(t) {
    return t.map((e) => (e = e.reduce((s, i) => {
      let n = s[s.length - 1];
      return i === "**" && n === "**" ? s : i === ".." && n && n !== ".." && n !== "." && n !== "**" ? (s.pop(), s) : (s.push(i), s);
    }, []), e.length === 0 ? [""] : e));
  }
  levelTwoFileOptimize(t) {
    Array.isArray(t) || (t = this.slashSplit(t));
    let e = false;
    do {
      if (e = false, !this.preserveMultipleSlashes) {
        for (let i = 1; i < t.length - 1; i++) {
          let n = t[i];
          i === 1 && n === "" && t[0] === "" || (n === "." || n === "") && (e = true, t.splice(i, 1), i--);
        }
        t[0] === "." && t.length === 2 && (t[1] === "." || t[1] === "") && (e = true, t.pop());
      }
      let s = 0;
      for (; (s = t.indexOf("..", s + 1)) !== -1; ) {
        let i = t[s - 1];
        i && i !== "." && i !== ".." && i !== "**" && (e = true, t.splice(s - 1, 2), s -= 2);
      }
    } while (e);
    return t.length === 0 ? [""] : t;
  }
  firstPhasePreProcess(t) {
    let e = false;
    do {
      e = false;
      for (let s of t) {
        let i = -1;
        for (; (i = s.indexOf("**", i + 1)) !== -1; ) {
          let o = i;
          for (; s[o + 1] === "**"; ) o++;
          o > i && s.splice(i + 1, o - i);
          let h = s[i + 1], c = s[i + 2], a = s[i + 3];
          if (h !== ".." || !c || c === "." || c === ".." || !a || a === "." || a === "..") continue;
          e = true, s.splice(i, 1);
          let l = s.slice(0);
          l[i] = "**", t.push(l), i--;
        }
        if (!this.preserveMultipleSlashes) {
          for (let o = 1; o < s.length - 1; o++) {
            let h = s[o];
            o === 1 && h === "" && s[0] === "" || (h === "." || h === "") && (e = true, s.splice(o, 1), o--);
          }
          s[0] === "." && s.length === 2 && (s[1] === "." || s[1] === "") && (e = true, s.pop());
        }
        let n = 0;
        for (; (n = s.indexOf("..", n + 1)) !== -1; ) {
          let o = s[n - 1];
          if (o && o !== "." && o !== ".." && o !== "**") {
            e = true;
            let c = n === 1 && s[n + 1] === "**" ? ["."] : [];
            s.splice(n - 1, 2, ...c), s.length === 0 && s.push(""), n -= 2;
          }
        }
      }
    } while (e);
    return t;
  }
  secondPhasePreProcess(t) {
    for (let e = 0; e < t.length - 1; e++) for (let s = e + 1; s < t.length; s++) {
      let i = this.partsMatch(t[e], t[s], !this.preserveMultipleSlashes);
      if (i) {
        t[e] = [], t[s] = i;
        break;
      }
    }
    return t.filter((e) => e.length);
  }
  partsMatch(t, e, s = false) {
    let i = 0, n = 0, o = [], h = "";
    for (; i < t.length && n < e.length; ) if (t[i] === e[n]) o.push(h === "b" ? e[n] : t[i]), i++, n++;
    else if (s && t[i] === "**" && e[n] === t[i + 1]) o.push(t[i]), i++;
    else if (s && e[n] === "**" && t[i] === e[n + 1]) o.push(e[n]), n++;
    else if (t[i] === "*" && e[n] && (this.options.dot || !e[n].startsWith(".")) && e[n] !== "**") {
      if (h === "b") return false;
      h = "a", o.push(t[i]), i++, n++;
    } else if (e[n] === "*" && t[i] && (this.options.dot || !t[i].startsWith(".")) && t[i] !== "**") {
      if (h === "a") return false;
      h = "b", o.push(e[n]), i++, n++;
    } else return false;
    return t.length === e.length && o;
  }
  parseNegate() {
    if (this.nonegate) return;
    let t = this.pattern, e = false, s = 0;
    for (let i = 0; i < t.length && t.charAt(i) === "!"; i++) e = !e, s++;
    s && (this.pattern = t.slice(s)), this.negate = e;
  }
  matchOne(t, e, s = false) {
    let i = this.options;
    if (this.isWindows) {
      let f = typeof t[0] == "string" && /^[a-z]:$/i.test(t[0]), S = !f && t[0] === "" && t[1] === "" && t[2] === "?" && /^[a-z]:$/i.test(t[3]), E2 = typeof e[0] == "string" && /^[a-z]:$/i.test(e[0]), O2 = !E2 && e[0] === "" && e[1] === "" && e[2] === "?" && typeof e[3] == "string" && /^[a-z]:$/i.test(e[3]), T = S ? 3 : f ? 0 : void 0, b2 = O2 ? 3 : E2 ? 0 : void 0;
      if (typeof T == "number" && typeof b2 == "number") {
        let [L, U2] = [t[T], e[b2]];
        L.toLowerCase() === U2.toLowerCase() && (e[b2] = L, b2 > T ? e = e.slice(b2) : T > b2 && (t = t.slice(T)));
      }
    }
    let { optimizationLevel: n = 1 } = this.options;
    n >= 2 && (t = this.levelTwoFileOptimize(t)), this.debug("matchOne", this, { file: t, pattern: e }), this.debug("matchOne", t.length, e.length);
    for (var o = 0, h = 0, c = t.length, a = e.length; o < c && h < a; o++, h++) {
      this.debug("matchOne loop");
      var l = e[h], g2 = t[o];
      if (this.debug(e, l, g2), l === false) return false;
      if (l === y2) {
        this.debug("GLOBSTAR", [e, l, g2]);
        var p = o, u2 = h + 1;
        if (u2 === a) {
          for (this.debug("** at the end"); o < c; o++) if (t[o] === "." || t[o] === ".." || !i.dot && t[o].charAt(0) === ".") return false;
          return true;
        }
        for (; p < c; ) {
          var d = t[p];
          if (this.debug(`
globstar while`, t, p, e, u2, d), this.matchOne(t.slice(p), e.slice(u2), s)) return this.debug("globstar found match!", p, c, d), true;
          if (d === "." || d === ".." || !i.dot && d.charAt(0) === ".") {
            this.debug("dot detected!", t, p, e, u2);
            break;
          }
          this.debug("globstar swallow a segment, and continue"), p++;
        }
        return !!(s && (this.debug(`
>>> no match, partial?`, t, p, e, u2), p === c));
      }
      let f;
      if (typeof l == "string" ? (f = g2 === l, this.debug("string match", l, g2, f)) : (f = l.test(g2), this.debug("pattern match", l, g2, f)), !f) return false;
    }
    if (o === c && h === a) return true;
    if (o === c) return s;
    if (h === a) return o === c - 1 && t[o] === "";
    throw new Error("wtf?");
  }
  braceExpand() {
    return I(this.pattern, this.options);
  }
  parse(t) {
    $(t);
    let e = this.options;
    if (t === "**") return y2;
    if (t === "") return "";
    let s, i = null;
    (s = t.match(lt)) ? i = e.dot ? ft : ut : (s = t.match(tt)) ? i = (e.nocase ? e.dot ? nt : it : e.dot ? st : et)(s[1]) : (s = t.match(pt)) ? i = (e.nocase ? e.dot ? dt : gt : e.dot ? mt : wt)(s) : (s = t.match(rt)) ? i = e.dot ? ht : ot : (s = t.match(ct)) && (i = at);
    let n = N.fromGlob(t, this.options).toMMPattern();
    return i && typeof n == "object" && Reflect.defineProperty(n, "test", { value: i }), n;
  }
  makeRe() {
    if (this.regexp || this.regexp === false) return this.regexp;
    let t = this.set;
    if (!t.length) return this.regexp = false, this.regexp;
    let e = this.options, s = e.noglobstar ? xt : e.dot ? Et : Tt, i = new Set(e.nocase ? ["i"] : []), n = t.map((c) => {
      let a = c.map((l) => {
        if (l instanceof RegExp) for (let g2 of l.flags.split("")) i.add(g2);
        return typeof l == "string" ? Mt(l) : l === y2 ? y2 : l._src;
      });
      return a.forEach((l, g2) => {
        let p = a[g2 + 1], u2 = a[g2 - 1];
        l !== y2 || u2 === y2 || (u2 === void 0 ? p !== void 0 && p !== y2 ? a[g2 + 1] = "(?:\\/|" + s + "\\/)?" + p : a[g2] = s : p === void 0 ? a[g2 - 1] = u2 + "(?:\\/|" + s + ")?" : p !== y2 && (a[g2 - 1] = u2 + "(?:\\/|\\/" + s + "\\/)" + p, a[g2 + 1] = y2));
      }), a.filter((l) => l !== y2).join("/");
    }).join("|"), [o, h] = t.length > 1 ? ["(?:", ")"] : ["", ""];
    n = "^" + o + n + h + "$", this.negate && (n = "^(?!" + n + ").+$");
    try {
      this.regexp = new RegExp(n, [...i].join(""));
    } catch {
      this.regexp = false;
    }
    return this.regexp;
  }
  slashSplit(t) {
    return this.preserveMultipleSlashes ? t.split("/") : this.isWindows && /^\/\/[^\/]+/.test(t) ? ["", ...t.split(/\/+/)] : t.split(/\/+/);
  }
  match(t, e = this.partial) {
    if (this.debug("match", t, this.pattern), this.comment) return false;
    if (this.empty) return t === "";
    if (t === "/" && e) return true;
    let s = this.options;
    this.isWindows && (t = t.split("\\").join("/"));
    let i = this.slashSplit(t);
    this.debug(this.pattern, "split", i);
    let n = this.set;
    this.debug(this.pattern, "set", n);
    let o = i[i.length - 1];
    if (!o) for (let h = i.length - 2; !o && h >= 0; h--) o = i[h];
    for (let h = 0; h < n.length; h++) {
      let c = n[h], a = i;
      if (s.matchBase && c.length === 1 && (a = [o]), this.matchOne(a, c, e)) return s.flipNegate ? true : !this.negate;
    }
    return s.flipNegate ? false : this.negate;
  }
  static defaults(t) {
    return m2.defaults(t).Minimatch;
  }
};
m2.AST = N;
m2.Minimatch = A;
m2.escape = W2;
m2.unescape = x;

// ponyfills/helpers/glob.ts
function hideStackFrames(fn) {
  const hidden = "__node_internal_" + fn.name;
  Object.defineProperty(fn, "name", { value: hidden });
  return fn;
}
var validateObject = hideStackFrames((value, name, options) => {
  const useDefaultOptions = options == null;
  const allowArray = useDefaultOptions ? false : options.allowArray;
  const allowFunction = useDefaultOptions ? false : options.allowFunction;
  const nullable = useDefaultOptions ? false : options.nullable;
  if (!nullable && value === null || !allowArray && Array.isArray(value) || typeof value !== "object" && (!allowFunction || typeof value !== "function")) {
    throw new Error(name, "Object", value);
  }
});
function validateString(value, name) {
  if (typeof value !== "string") {
    throw new Error(name, "string", value);
  }
}
var validateArray = hideStackFrames(
  (value, name, minLength = 0) => {
    if (!Array.isArray(value)) {
      throw new Error(name, "Array", value);
    }
    if (value.length < minLength) {
      const reason = `must be longer than ${minLength}`;
      throw new Error(name, value, reason);
    }
  }
);
var validateStringArray = hideStackFrames((value, name) => {
  validateArray(value, name);
  for (let i = 0; i < value.length; ++i) {
    if (typeof value[i] !== "string") {
      throw new Error(`${name}[${i}]`, "string", value[i]);
    }
  }
});
var fsConstants = {
  UV_FS_SYMLINK_DIR: 1,
  UV_FS_SYMLINK_JUNCTION: 2,
  O_RDONLY: 0,
  O_WRONLY: 1,
  O_RDWR: 2,
  UV_DIRENT_UNKNOWN: 0,
  UV_DIRENT_FILE: 1,
  UV_DIRENT_DIR: 2,
  UV_DIRENT_LINK: 3,
  UV_DIRENT_FIFO: 4,
  UV_DIRENT_SOCKET: 5,
  UV_DIRENT_CHAR: 6,
  UV_DIRENT_BLOCK: 7,
  S_IFMT: 61440,
  S_IFREG: 32768,
  S_IFDIR: 16384,
  S_IFCHR: 8192,
  S_IFBLK: 24576,
  S_IFIFO: 4096,
  S_IFLNK: 40960,
  S_IFSOCK: 49152,
  O_CREAT: 512,
  O_EXCL: 2048,
  UV_FS_O_FILEMAP: 0,
  O_NOCTTY: 131072,
  O_TRUNC: 1024,
  O_APPEND: 8,
  O_DIRECTORY: 1048576,
  O_NOFOLLOW: 256,
  O_SYNC: 128,
  O_DSYNC: 4194304,
  O_SYMLINK: 2097152,
  O_NONBLOCK: 4,
  S_IRWXU: 448,
  S_IRUSR: 256,
  S_IWUSR: 128,
  S_IXUSR: 64,
  S_IRWXG: 56,
  S_IRGRP: 32,
  S_IWGRP: 16,
  S_IXGRP: 8,
  S_IRWXO: 7,
  S_IROTH: 4,
  S_IWOTH: 2,
  S_IXOTH: 1,
  F_OK: 0,
  R_OK: 4,
  W_OK: 2,
  X_OK: 1,
  UV_FS_COPYFILE_EXCL: 1,
  COPYFILE_EXCL: 1,
  UV_FS_COPYFILE_FICLONE: 2,
  COPYFILE_FICLONE: 2,
  UV_FS_COPYFILE_FICLONE_FORCE: 4,
  COPYFILE_FICLONE_FORCE: 4
};
var kType = Symbol("type");
var kStats = Symbol("stats");
var Dirent = class {
  constructor(name, type, path) {
    this.name = name;
    this.parentPath = path;
    this[kType] = type;
  }
  isDirectory() {
    return this[kType] === fsConstants.UV_DIRENT_DIR;
  }
  isFile() {
    return this[kType] === fsConstants.UV_DIRENT_FILE;
  }
  isBlockDevice() {
    return this[kType] === fsConstants.UV_DIRENT_BLOCK;
  }
  isCharacterDevice() {
    return this[kType] === fsConstants.UV_DIRENT_CHAR;
  }
  isSymbolicLink() {
    return this[kType] === fsConstants.UV_DIRENT_LINK;
  }
  isFIFO() {
    return this[kType] === fsConstants.UV_DIRENT_FIFO;
  }
  isSocket() {
    return this[kType] === fsConstants.UV_DIRENT_SOCKET;
  }
};
var DirentFromStats = class extends Dirent {
  constructor(name, stats, path) {
    super(name, null, path);
    this[kStats] = stats;
  }
};
for (const name of Reflect.ownKeys(Dirent.prototype)) {
  if (name === "constructor") {
    continue;
  }
  DirentFromStats.prototype[name] = function() {
    return this[kStats][name]();
  };
}
var NodeErrorAbstraction = class extends Error {
  code;
  constructor(name, code, message) {
    super(message);
    this.code = code;
    this.name = name;
    this.stack = this.stack && `${name} [${this.code}]${this.stack.slice(this.name.length)}`;
  }
  toString() {
    return `${this.name} [${this.code}]: ${this.message}`;
  }
};
var NodeTypeError = class extends NodeErrorAbstraction {
  constructor(code, message) {
    super(TypeError.prototype.name, code, message);
    Object.setPrototypeOf(this, TypeError.prototype);
    this.toString = function() {
      return `${this.name} [${this.code}]: ${this.message}`;
    };
  }
};
function createInvalidArgType(name, expected) {
  expected = Array.isArray(expected) ? expected : [expected];
  let msg = "The ";
  if (name.endsWith(" argument")) {
    msg += `${name} `;
  } else {
    const type = name.includes(".") ? "property" : "argument";
    msg += `"${name}" ${type} `;
  }
  msg += "must be ";
  const types = [];
  const instances = [];
  const other = [];
  for (const value of expected) {
    if (kTypes.includes(value)) {
      types.push(value.toLocaleLowerCase());
    } else if (classRegExp.test(value)) {
      instances.push(value);
    } else {
      other.push(value);
    }
  }
  if (instances.length > 0) {
    const pos = types.indexOf("object");
    if (pos !== -1) {
      types.splice(pos, 1);
      instances.push("Object");
    }
  }
  if (types.length > 0) {
    if (types.length > 2) {
      const last = types.pop();
      msg += `one of type ${types.join(", ")}, or ${last}`;
    } else if (types.length === 2) {
      msg += `one of type ${types[0]} or ${types[1]}`;
    } else {
      msg += `of type ${types[0]}`;
    }
    if (instances.length > 0 || other.length > 0) {
      msg += " or ";
    }
  }
  if (instances.length > 0) {
    if (instances.length > 2) {
      const last = instances.pop();
      msg += `an instance of ${instances.join(", ")}, or ${last}`;
    } else {
      msg += `an instance of ${instances[0]}`;
      if (instances.length === 2) {
        msg += ` or ${instances[1]}`;
      }
    }
    if (other.length > 0) {
      msg += " or ";
    }
  }
  if (other.length > 0) {
    if (other.length > 2) {
      const last = other.pop();
      msg += `one of ${other.join(", ")}, or ${last}`;
    } else if (other.length === 2) {
      msg += `one of ${other[0]} or ${other[1]}`;
    } else {
      if (other[0].toLowerCase() !== other[0]) {
        msg += "an ";
      }
      msg += `${other[0]}`;
    }
  }
  return msg;
}
function invalidArgTypeHelper(input) {
  if (input == null) {
    return ` Received ${input}`;
  }
  if (typeof input === "function" && input.name) {
    return ` Received function ${input.name}`;
  }
  if (typeof input === "object") {
    if (input.constructor && input.constructor.name) {
      return ` Received an instance of ${input.constructor.name}`;
    }
    return ` Received ${inspect(input, { depth: -1 })}`;
  }
  let inspected = inspect(input, { colors: false });
  if (inspected.length > 25) {
    inspected = `${inspected.slice(0, 25)}...`;
  }
  return ` Received type ${typeof input} (${inspected})`;
}
var NodeRangeError = class extends NodeErrorAbstraction {
  constructor(code, message) {
    super(RangeError.prototype.name, code, message);
    Object.setPrototypeOf(this, RangeError.prototype);
    this.toString = function() {
      return `${this.name} [${this.code}]: ${this.message}`;
    };
  }
};
var ERR_INVALID_ARG_TYPE_RANGE = class extends NodeRangeError {
  constructor(name, expected, actual) {
    const msg = createInvalidArgType(name, expected);
    super("ERR_INVALID_ARG_TYPE", `${msg}.${invalidArgTypeHelper(actual)}`);
  }
};
var ERR_INVALID_ARG_TYPE = class extends NodeTypeError {
  constructor(name, expected, actual) {
    const msg = createInvalidArgType(name, expected);
    super("ERR_INVALID_ARG_TYPE", `${msg}.${invalidArgTypeHelper(actual)}`);
  }
  static RangeError = ERR_INVALID_ARG_TYPE_RANGE;
};
var isWindows = globalThis.Deno?.build?.os === "windows";
var isMacOS = globalThis.Deno?.build?.os === "darwin";
var kEmptyObject = Object.freeze(/* @__PURE__ */ Object.create(null));
var nop = () => {
};
var primordials = {
  ArrayFrom: (...args) => Array.from(...args),
  ArrayIsArray: (thisArg) => Array.isArray(thisArg),
  ArrayPrototypeAt: (thisArg, ...args) => Array.prototype.at.apply(thisArg, args),
  ArrayPrototypeMap: (thisArg, ...args) => Array.prototype.map.apply(thisArg, args),
  ArrayPrototypePop: (thisArg, ...args) => Array.prototype.pop.apply(thisArg, args),
  ArrayPrototypePush: (thisArg, ...args) => Array.prototype.push.apply(thisArg, args),
  ArrayPrototypeSome: (thisArg, ...args) => Array.prototype.some.apply(thisArg, args),
  ArrayPrototypeReduce: (thisArg, ...args) => Array.prototype.reduce.apply(thisArg, args),
  ArrayPrototypeConcat: (thisArg, ...args) => Array.prototype.concat.apply(thisArg, args),
  Promise: globalThis.Promise,
  PromisePrototypeThen: (thisArg, ...args) => Promise2.prototype.then.apply(thisArg, args),
  StringPrototypeEndsWith: (thisArg, ...args) => String.prototype.endsWith.apply(thisArg, args),
  SafeMap: Map,
  SafeSet: Set,
  ReflectApply: (cb, thisArg, args) => Reflect.apply(cb, thisArg, args)
};
var {
  ArrayFrom,
  ArrayIsArray,
  ArrayPrototypeAt,
  // ArrayPrototypeFlatMap, 
  ArrayPrototypeMap,
  ArrayPrototypePop,
  ArrayPrototypePush,
  ArrayPrototypeSome,
  ArrayPrototypeReduce,
  ArrayPrototypeConcat,
  Promise: Promise2,
  PromisePrototypeThen,
  SafeMap,
  SafeSet,
  StringPrototypeEndsWith,
  ReflectApply
} = primordials;
function _flattenArray(arr, depth = 1) {
  if (depth == 0) {
    return ArrayPrototypeConcat(arr);
  }
  return ArrayPrototypeReduce(arr, (flatArray, current) => {
    if (ArrayIsArray(current)) {
      return ArrayPrototypeConcat(flatArray, _flattenArray(current, depth - 1));
    } else {
      return ArrayPrototypeConcat(flatArray, current);
    }
  }, []);
}
function ArrayPrototypeFlatMap(arr, func, thisArg = void 0) {
  return _flattenArray(ArrayPrototypeMap(arr, func, thisArg));
}
function lazyMinimatch() {
  return m2;
}
async function getDirent(path) {
  let stat;
  try {
    stat = await lstat(path);
  } catch (err) {
    return null;
  }
  return new DirentFromStats(basename(path), stat, dirname(path));
}
function getDirentSync(path) {
  const stat = lstatSync(path, { throwIfNoEntry: false });
  if (stat === void 0) {
    return null;
  }
  return new DirentFromStats(basename(path), stat, dirname(path));
}
var validateStringArrayOrFunction = hideStackFrames((value, name) => {
  if (ArrayIsArray(value)) {
    for (let i = 0; i < value.length; ++i) {
      if (typeof value[i] !== "string") {
        throw new ERR_INVALID_ARG_TYPE(`${name}[${i}]`, "string", value[i]);
      }
    }
    return;
  }
  if (typeof value !== "function") {
    throw new ERR_INVALID_ARG_TYPE(name, ["string[]", "function"], value);
  }
});
function createMatcher(pattern, options = kEmptyObject) {
  const opts = {
    __proto__: null,
    nocase: isWindows || isMacOS,
    windowsPathsNoEscape: true,
    nonegate: true,
    nocomment: true,
    optimizationLevel: 2,
    platform: process.platform,
    nocaseMagicOnly: true,
    ...options
  };
  return new (lazyMinimatch()).Minimatch(pattern, opts);
}
var Cache = class {
  #cache = new SafeMap();
  #statsCache = new SafeMap();
  #readdirCache = new SafeMap();
  stat(path) {
    const cached = this.#statsCache.get(path);
    if (cached) {
      return cached;
    }
    const promise = getDirent(path);
    this.#statsCache.set(path, promise);
    return promise;
  }
  statSync(path) {
    const cached = this.#statsCache.get(path);
    if (cached && !(cached instanceof Promise2)) {
      return cached;
    }
    const val = getDirentSync(path);
    this.#statsCache.set(path, val);
    return val;
  }
  addToStatCache(path, val) {
    this.#statsCache.set(path, val);
  }
  async readdir(path) {
    const cached = this.#readdirCache.get(path);
    if (cached) {
      return cached;
    }
    const promise = PromisePrototypeThen(readdir(path, { __proto__: null, withFileTypes: true }), null, () => null);
    this.#readdirCache.set(path, promise);
    return promise;
  }
  readdirSync(path) {
    const cached = this.#readdirCache.get(path);
    if (cached) {
      return cached;
    }
    let val;
    try {
      val = readdirSync(path, { __proto__: null, withFileTypes: true });
    } catch {
      val = [];
    }
    this.#readdirCache.set(path, val);
    return val;
  }
  add(path, pattern) {
    let cache = this.#cache.get(path);
    if (!cache) {
      cache = new SafeSet();
      this.#cache.set(path, cache);
    }
    const originalSize = cache.size;
    pattern.indexes.forEach((index) => cache.add(pattern.cacheKey(index)));
    return cache.size !== originalSize + pattern.indexes.size;
  }
  seen(path, pattern, index) {
    return this.#cache.get(path)?.has(pattern.cacheKey(index));
  }
};
var Pattern = class _Pattern {
  #pattern;
  #globStrings;
  indexes;
  symlinks;
  last;
  constructor(pattern, globStrings, indexes, symlinks) {
    this.#pattern = pattern;
    this.#globStrings = globStrings;
    this.indexes = indexes;
    this.symlinks = symlinks;
    this.last = pattern.length - 1;
  }
  isLast(isDirectory) {
    return this.indexes.has(this.last) || this.at(-1) === "" && isDirectory && this.indexes.has(this.last - 1) && this.at(-2) === lazyMinimatch().GLOBSTAR;
  }
  isFirst() {
    return this.indexes.has(0);
  }
  get hasSeenSymlinks() {
    return ArrayPrototypeSome(ArrayFrom(this.indexes), (i) => !this.symlinks.has(i));
  }
  at(index) {
    return ArrayPrototypeAt(this.#pattern, index);
  }
  child(indexes, symlinks = new SafeSet()) {
    return new _Pattern(this.#pattern, this.#globStrings, indexes, symlinks);
  }
  test(index, path) {
    if (index > this.#pattern.length) {
      return false;
    }
    const pattern = this.#pattern[index];
    if (pattern === lazyMinimatch().GLOBSTAR) {
      return true;
    }
    if (typeof pattern === "string") {
      return pattern === path;
    }
    if (typeof pattern?.test === "function") {
      return pattern.test(path);
    }
    return false;
  }
  cacheKey(index) {
    let key = "";
    for (let i = index; i < this.#globStrings.length; i++) {
      key += this.#globStrings[i];
      if (i !== this.#globStrings.length - 1) {
        key += "/";
      }
    }
    return key;
  }
};
var ResultSet = class extends SafeSet {
  #root = ".";
  #isExcluded = () => false;
  constructor(i = void 0) {
    super(i);
  }
  // eslint-disable-line no-useless-constructor
  setup(root, isExcludedFn) {
    this.#root = root;
    this.#isExcluded = isExcludedFn;
  }
  add(value) {
    if (this.#isExcluded(resolve(this.#root, value))) {
      return false;
    }
    super.add(value);
    return true;
  }
};
var Glob = class {
  #root;
  #exclude;
  #cache = new Cache();
  #results = new ResultSet();
  #queue = [];
  #subpatterns = new SafeMap();
  #patterns;
  #withFileTypes;
  #isExcluded = () => false;
  constructor(pattern, options = kEmptyObject) {
    validateObject(options, "options");
    const { exclude, cwd, withFileTypes } = options;
    this.#root = cwd ?? ".";
    this.#withFileTypes = !!withFileTypes;
    if (exclude != null) {
      validateStringArrayOrFunction(exclude, "options.exclude");
      if (ArrayIsArray(exclude)) {
        assert(typeof this.#root === "string");
        const matchers = exclude.map((pattern2) => resolve(this.#root, pattern2)).map((pattern2) => createMatcher(pattern2));
        this.#isExcluded = (value) => matchers.some((matcher) => matcher.match(value));
        this.#results.setup(this.#root, this.#isExcluded);
      } else {
        this.#exclude = exclude;
      }
    }
    let patterns;
    if (typeof pattern === "object") {
      validateStringArray(pattern, "patterns");
      patterns = pattern;
    } else {
      validateString(pattern, "patterns");
      patterns = [pattern];
    }
    this.matchers = ArrayPrototypeMap(patterns, (pattern2) => createMatcher(pattern2));
    this.#patterns = ArrayPrototypeFlatMap(
      this.matchers,
      (matcher) => ArrayPrototypeMap(
        matcher.set,
        (pattern2, i) => new Pattern(pattern2, matcher.globParts[i], new SafeSet().add(0), new SafeSet())
      )
    );
  }
  globSync() {
    ArrayPrototypePush(this.#queue, { __proto__: null, path: ".", patterns: this.#patterns });
    while (this.#queue.length > 0) {
      const item = ArrayPrototypePop(this.#queue);
      for (let i = 0; i < item.patterns.length; i++) {
        this.#addSubpatterns(item.path, item.patterns[i]);
      }
      this.#subpatterns.forEach((patterns, path) => ArrayPrototypePush(this.#queue, { __proto__: null, path, patterns }));
      this.#subpatterns.clear();
    }
    return ArrayFrom(this.#results, this.#withFileTypes ? (path) => this.#cache.statSync(isAbsolute(path) ? path : join(this.#root, path)) : void 0);
  }
  #addSubpattern(path, pattern) {
    if (this.#isExcluded(path)) {
      return;
    }
    const fullpath = resolve(this.#root, path);
    if (this.#isExcluded(`${fullpath}/`) && this.#cache.statSync(fullpath).isDirectory()) {
      return;
    }
    if (this.#exclude) {
      if (this.#withFileTypes) {
        const stat = this.#cache.statSync(path);
        if (stat !== null) {
          if (this.#exclude(stat)) {
            return;
          }
        }
      } else if (this.#exclude(path)) {
        return;
      }
    }
    if (!this.#subpatterns.has(path)) {
      this.#subpatterns.set(path, [pattern]);
    } else {
      ArrayPrototypePush(this.#subpatterns.get(path), pattern);
    }
  }
  #addSubpatterns(path, pattern) {
    const seen = this.#cache.add(path, pattern);
    if (seen) {
      return;
    }
    const fullpath = resolve(this.#root, path);
    const stat = this.#cache.statSync(fullpath);
    const last = pattern.last;
    const isDirectory = stat?.isDirectory() || stat?.isSymbolicLink() && pattern.hasSeenSymlinks;
    const isLast = pattern.isLast(isDirectory);
    const isFirst = pattern.isFirst();
    if (this.#isExcluded(fullpath)) {
      return;
    }
    if (isFirst && isWindows && typeof pattern.at(0) === "string" && StringPrototypeEndsWith(pattern.at(0), ":")) {
      this.#addSubpattern(`${pattern.at(0)}\\`, pattern.child(new SafeSet().add(1)));
      return;
    }
    if (isFirst && pattern.at(0) === "") {
      this.#addSubpattern("/", pattern.child(new SafeSet().add(1)));
      return;
    }
    if (isFirst && pattern.at(0) === "..") {
      this.#addSubpattern("../", pattern.child(new SafeSet().add(1)));
      return;
    }
    if (isFirst && pattern.at(0) === ".") {
      this.#addSubpattern(".", pattern.child(new SafeSet().add(1)));
      return;
    }
    if (isLast && typeof pattern.at(-1) === "string") {
      const p = pattern.at(-1);
      const stat2 = this.#cache.statSync(join(fullpath, p));
      if (stat2 && (p || isDirectory)) {
        this.#results.add(join(path, p));
      }
      if (pattern.indexes.size === 1 && pattern.indexes.has(last)) {
        return;
      }
    } else if (isLast && pattern.at(-1) === lazyMinimatch().GLOBSTAR && (path !== "." || pattern.at(0) === "." || last === 0 && stat)) {
      this.#results.add(path);
    }
    if (!isDirectory) {
      return;
    }
    let children;
    const firstPattern = pattern.indexes.size === 1 && pattern.at(pattern.indexes.values().next().value);
    if (typeof firstPattern === "string") {
      const stat2 = this.#cache.statSync(join(fullpath, firstPattern));
      if (stat2) {
        stat2.name = firstPattern;
        children = [stat2];
      } else {
        return;
      }
    } else {
      children = this.#cache.readdirSync(fullpath);
    }
    for (let i = 0; i < children.length; i++) {
      const entry = children[i];
      const entryPath = join(path, entry.name);
      this.#cache.addToStatCache(join(fullpath, entry.name), entry);
      const subPatterns = new SafeSet();
      const nSymlinks = new SafeSet();
      for (const index of pattern.indexes) {
        if (this.#cache.seen(entryPath, pattern, index) || this.#cache.seen(entryPath, pattern, index + 1)) {
          return;
        }
        const current = pattern.at(index);
        const nextIndex = index + 1;
        const next = pattern.at(nextIndex);
        const fromSymlink = pattern.symlinks.has(index);
        if (current === lazyMinimatch().GLOBSTAR) {
          if (entry.name[0] === "." || this.#exclude && this.#exclude(this.#withFileTypes ? entry : entry.name)) {
            continue;
          }
          if (!fromSymlink && entry.isDirectory()) {
            subPatterns.add(index);
          } else if (!fromSymlink && index === last) {
            this.#results.add(entryPath);
          }
          const nextMatches = pattern.test(nextIndex, entry.name);
          if (nextMatches && nextIndex === last && !isLast) {
            this.#results.add(entryPath);
          } else if (nextMatches && entry.isDirectory()) {
            subPatterns.add(index + 2);
          }
          if ((nextMatches || pattern.at(0) === ".") && (entry.isDirectory() || entry.isSymbolicLink()) && !fromSymlink) {
            subPatterns.add(nextIndex);
          }
          if (entry.isSymbolicLink()) {
            nSymlinks.add(index);
          }
          if (next === ".." && entry.isDirectory()) {
            const parent = join(path, "..");
            if (nextIndex < last) {
              if (!this.#subpatterns.has(path) && !this.#cache.seen(path, pattern, nextIndex + 1)) {
                this.#subpatterns.set(path, [pattern.child(new SafeSet().add(nextIndex + 1))]);
              }
              if (!this.#subpatterns.has(parent) && !this.#cache.seen(parent, pattern, nextIndex + 1)) {
                this.#subpatterns.set(parent, [pattern.child(new SafeSet().add(nextIndex + 1))]);
              }
            } else {
              if (!this.#cache.seen(path, pattern, nextIndex)) {
                this.#cache.add(path, pattern.child(new SafeSet().add(nextIndex)));
                this.#results.add(path);
              }
              if (!this.#cache.seen(path, pattern, nextIndex) || !this.#cache.seen(parent, pattern, nextIndex)) {
                this.#cache.add(parent, pattern.child(new SafeSet().add(nextIndex)));
                this.#results.add(parent);
              }
            }
          }
        }
        if (typeof current === "string") {
          if (pattern.test(index, entry.name) && index !== last) {
            subPatterns.add(nextIndex);
          } else if (current === "." && pattern.test(nextIndex, entry.name)) {
            if (nextIndex === last) {
              this.#results.add(entryPath);
            } else {
              subPatterns.add(nextIndex + 1);
            }
          }
        }
        if (typeof current === "object" && pattern.test(index, entry.name)) {
          if (index === last) {
            this.#results.add(entryPath);
          } else if (entry.isDirectory()) {
            subPatterns.add(nextIndex);
          }
        }
      }
      if (subPatterns.size > 0) {
        this.#addSubpattern(entryPath, pattern.child(subPatterns, nSymlinks));
      }
    }
  }
  async *glob() {
    ArrayPrototypePush(this.#queue, { __proto__: null, path: ".", patterns: this.#patterns });
    while (this.#queue.length > 0) {
      const item = ArrayPrototypePop(this.#queue);
      for (let i = 0; i < item.patterns.length; i++) {
        yield* this.#iterateSubpatterns(item.path, item.patterns[i]);
      }
      this.#subpatterns.forEach((patterns, path) => ArrayPrototypePush(this.#queue, { __proto__: null, path, patterns }));
      this.#subpatterns.clear();
    }
  }
  async *#iterateSubpatterns(path, pattern) {
    const seen = this.#cache.add(path, pattern);
    if (seen) {
      return;
    }
    const fullpath = resolve(this.#root, path);
    const stat = await this.#cache.stat(fullpath);
    const last = pattern.last;
    const isDirectory = stat?.isDirectory() || stat?.isSymbolicLink() && pattern.hasSeenSymlinks;
    const isLast = pattern.isLast(isDirectory);
    const isFirst = pattern.isFirst();
    if (this.#isExcluded(fullpath)) {
      return;
    }
    if (isFirst && isWindows && typeof pattern.at(0) === "string" && StringPrototypeEndsWith(pattern.at(0), ":")) {
      this.#addSubpattern(`${pattern.at(0)}\\`, pattern.child(new SafeSet().add(1)));
      return;
    }
    if (isFirst && pattern.at(0) === "") {
      this.#addSubpattern("/", pattern.child(new SafeSet().add(1)));
      return;
    }
    if (isFirst && pattern.at(0) === "..") {
      this.#addSubpattern("../", pattern.child(new SafeSet().add(1)));
      return;
    }
    if (isFirst && pattern.at(0) === ".") {
      this.#addSubpattern(".", pattern.child(new SafeSet().add(1)));
      return;
    }
    if (isLast && typeof pattern.at(-1) === "string") {
      const p = pattern.at(-1);
      const stat2 = await this.#cache.stat(join(fullpath, p));
      if (stat2 && (p || isDirectory)) {
        const result = join(path, p);
        if (!this.#results.has(result)) {
          if (this.#results.add(result)) {
            yield this.#withFileTypes ? stat2 : result;
          }
        }
      }
      if (pattern.indexes.size === 1 && pattern.indexes.has(last)) {
        return;
      }
    } else if (isLast && pattern.at(-1) === lazyMinimatch().GLOBSTAR && (path !== "." || pattern.at(0) === "." || last === 0 && stat)) {
      if (!this.#results.has(path)) {
        if (this.#results.add(path)) {
          yield this.#withFileTypes ? stat : path;
        }
      }
    }
    if (!isDirectory) {
      return;
    }
    let children;
    const firstPattern = pattern.indexes.size === 1 && pattern.at(pattern.indexes.values().next().value);
    if (typeof firstPattern === "string") {
      const stat2 = await this.#cache.stat(join(fullpath, firstPattern));
      if (stat2) {
        stat2.name = firstPattern;
        children = [stat2];
      } else {
        return;
      }
    } else {
      children = await this.#cache.readdir(fullpath);
    }
    for (let i = 0; i < children.length; i++) {
      const entry = children[i];
      const entryPath = join(path, entry.name);
      this.#cache.addToStatCache(join(fullpath, entry.name), entry);
      const subPatterns = new SafeSet();
      const nSymlinks = new SafeSet();
      for (const index of pattern.indexes) {
        if (this.#cache.seen(entryPath, pattern, index) || this.#cache.seen(entryPath, pattern, index + 1)) {
          return;
        }
        const current = pattern.at(index);
        const nextIndex = index + 1;
        const next = pattern.at(nextIndex);
        const fromSymlink = pattern.symlinks.has(index);
        if (current === lazyMinimatch().GLOBSTAR) {
          if (entry.name[0] === "." || this.#exclude && this.#exclude(this.#withFileTypes ? entry : entry.name)) {
            continue;
          }
          if (!fromSymlink && entry.isDirectory()) {
            subPatterns.add(index);
          } else if (!fromSymlink && index === last) {
            if (!this.#results.has(entryPath)) {
              if (this.#results.add(entryPath)) {
                yield this.#withFileTypes ? entry : entryPath;
              }
            }
          }
          const nextMatches = pattern.test(nextIndex, entry.name);
          if (nextMatches && nextIndex === last && !isLast) {
            if (!this.#results.has(entryPath)) {
              if (this.#results.add(entryPath)) {
                yield this.#withFileTypes ? entry : entryPath;
              }
            }
          } else if (nextMatches && entry.isDirectory()) {
            subPatterns.add(index + 2);
          }
          if ((nextMatches || pattern.at(0) === ".") && (entry.isDirectory() || entry.isSymbolicLink()) && !fromSymlink) {
            subPatterns.add(nextIndex);
          }
          if (entry.isSymbolicLink()) {
            nSymlinks.add(index);
          }
          if (next === ".." && entry.isDirectory()) {
            const parent = join(path, "..");
            if (nextIndex < last) {
              if (!this.#subpatterns.has(path) && !this.#cache.seen(path, pattern, nextIndex + 1)) {
                this.#subpatterns.set(path, [pattern.child(new SafeSet().add(nextIndex + 1))]);
              }
              if (!this.#subpatterns.has(parent) && !this.#cache.seen(parent, pattern, nextIndex + 1)) {
                this.#subpatterns.set(parent, [pattern.child(new SafeSet().add(nextIndex + 1))]);
              }
            } else {
              if (!this.#cache.seen(path, pattern, nextIndex)) {
                this.#cache.add(path, pattern.child(new SafeSet().add(nextIndex)));
                if (!this.#results.has(path)) {
                  if (this.#results.add(path)) {
                    yield this.#withFileTypes ? this.#cache.statSync(fullpath) : path;
                  }
                }
              }
              if (!this.#cache.seen(path, pattern, nextIndex) || !this.#cache.seen(parent, pattern, nextIndex)) {
                this.#cache.add(parent, pattern.child(new SafeSet().add(nextIndex)));
                if (!this.#results.has(parent)) {
                  if (this.#results.add(parent)) {
                    yield this.#withFileTypes ? this.#cache.statSync(join(this.#root, parent)) : parent;
                  }
                }
              }
            }
          }
        }
        if (typeof current === "string") {
          if (pattern.test(index, entry.name) && index !== last) {
            subPatterns.add(nextIndex);
          } else if (current === "." && pattern.test(nextIndex, entry.name)) {
            if (nextIndex === last) {
              if (!this.#results.has(entryPath)) {
                if (this.#results.add(entryPath)) {
                  yield this.#withFileTypes ? entry : entryPath;
                }
              }
            } else {
              subPatterns.add(nextIndex + 1);
            }
          }
        }
        if (typeof current === "object" && pattern.test(index, entry.name)) {
          if (index === last) {
            if (!this.#results.has(entryPath)) {
              if (this.#results.add(entryPath)) {
                yield this.#withFileTypes ? entry : entryPath;
              }
            }
          } else if (entry.isDirectory()) {
            subPatterns.add(nextIndex);
          }
        }
      }
      if (subPatterns.size > 0) {
        this.#addSubpattern(entryPath, pattern.child(subPatterns, nSymlinks));
      }
    }
  }
};
function matchGlobPattern(path, pattern, windows = isWindows) {
  validateString(path, "path");
  validateString(pattern, "pattern");
  return lazyMinimatch().minimatch(path, pattern, {
    kEmptyObject,
    nocase: isMacOS || isWindows,
    windowsPathsNoEscape: true,
    nonegate: true,
    nocomment: true,
    optimizationLevel: 2,
    platform: windows ? "win32" : "posix",
    nocaseMagicOnly: true
  });
}
var glob_default = {
  Glob,
  matchGlobPattern
};
function makeCallback(cb) {
  return (...args) => ReflectApply(cb, this, args);
}
function ArrayPrototypeFromAsync(asyncIterator) {
  let resolve2, reject;
  const promise = new Promise2((_resolve, _reject) => {
    resolve2 = _resolve;
    reject = _reject;
  });
  const results = [];
  const callNext = () => {
    let nextPromise;
    try {
      nextPromise = asyncIterator.next();
    } catch (error) {
      reject(error);
      return;
    }
    if (nextPromise == null) {
      reject(Error(`When iterating over an async iterator, the .next() returned null/undefined`));
      return;
    }
    if (!(typeof nextPromise.then == "function")) {
      const { value, done } = nextPromise;
      if (done) {
        resolve2(results);
      } else {
        results.push(value);
        callNext();
      }
      return;
    }
    nextPromise.catch(reject);
    nextPromise.then(({ value, done }) => {
      if (done) {
        resolve2(results);
      } else {
        results.push(value);
        callNext();
      }
    });
  };
  try {
    callNext();
  } catch (error) {
    reject(error);
  }
  return promise;
}
function globSync(pattern, options = {}) {
  return new Glob(pattern, options).globSync();
}
function glob(pattern, options, callback = nop) {
  if (typeof options === "function") {
    callback = options;
    options = void 0;
  }
  callback = makeCallback(callback);
  (async () => {
    try {
      const res = await ArrayPrototypeFromAsync(new Glob(pattern, options).glob());
      callback(null, res);
    } catch (err) {
      callback(err);
    }
  })();
}
function globPromise(pattern, options) {
  return new Promise2((resolve2, reject) => {
    glob(pattern, options, (err, files) => {
      if (err) {
        reject(err);
      } else {
        resolve2(files);
      }
    });
  });
}
export {
  Glob,
  glob_default as default,
  glob,
  globPromise,
  globSync,
  matchGlobPattern
};
