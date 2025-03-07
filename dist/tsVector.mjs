function x(t, r) {
  return t + r;
}
function C(t, r) {
  return t - r;
}
function c(t) {
  return Array(t).fill(0);
}
function p(t, r) {
  let n = c(t.length);
  for (let e = 0; e < t.length; e++)
    n[e] = t[e] + r[e];
  return n;
}
function b(t, r) {
  let n = c(t.length);
  for (let e = 0; e < t.length; e++)
    n[e] = Math.min(t[e], r[e]);
  return n;
}
function L(t, r) {
  let n = c(t.length);
  for (let e = 0; e < t.length; e++)
    n[e] = Math.max(t[e], r[e]);
  return n;
}
function M(t, r) {
  let n = c(r.length);
  for (let e = 0; e < r.length; e++)
    n[e] = t * r[e];
  return n;
}
function v(t, r) {
  return p(t, M(-1, r));
}
function R(t, r) {
  return t.reduce((n, e, l) => n + e * r[l], 0);
}
function g(t) {
  return Math.sqrt(t.reduce((r, n) => r + n * n, 0));
}
function Z(t) {
  return M(1 / g(t), t);
}
function y(t, r = 1e-6) {
  return g(t) < r;
}
function q(t, r, n = 1e-6) {
  return y(v(t, r), n);
}
function B(t, r) {
  const [n, e, l] = t, [o, f, i] = r;
  return [
    e * i - l * f,
    l * o - n * i,
    n * f - e * o
  ];
}
function a(t, r) {
  return Array(t).fill(0).map(() => c(r));
}
function N(t, r = [0, 0, 0]) {
  t === null && (t = w(3));
  let n = a(4, 4);
  for (let e = 0; e < 3; e++) {
    for (let l = 0; l < 3; l++)
      n[e][l] = t[e][l];
    n[e][3] = r[e];
  }
  return n[3][3] = 1, n;
}
function s(t, r = !1) {
  let n = t.length, e = t[0].length;
  if (r) {
    for (let l = 1; l < n; l++)
      if (t[l].length !== e)
        throw new Error(`Row ${l} has ${t[l].length} columns, expected ${e}`);
  }
  return [t.length, t[0].length];
}
function w(t) {
  let r = a(t, t);
  for (let n = 0; n < t; n++)
    r[n][n] = 1;
  return r;
}
function $(t, r) {
  let n = c(t.length);
  for (let e = 0; e < t.length; e++)
    for (let l = 0; l < t[e].length; l++)
      n[e] += t[e][l] * r[l];
  return n;
}
function P(t, r) {
  const [n, e] = s(t), [l, o] = s(r);
  if (e !== l)
    throw new Error(`Matrix A has ${e} columns, Matrix B has ${l} rows. Cannot multiply.`);
  let f = a(n, o);
  for (let i = 0; i < n; i++)
    for (let u = 0; u < o; u++)
      for (let h = 0; h < e; h++)
        f[i][u] += t[i][h] * r[h][u];
  return f;
}
function d(t) {
  return t.map((r) => r.slice());
}
function S(t, r = 1e-3) {
  return t.map((n) => n.map((e) => Math.abs(e - Math.round(e)) < r ? Math.round(e) : e));
}
function k(t, r) {
  return $(t, r.concat(1)).slice(0, 3);
}
function z(t) {
  return t.reduce((r, n) => r.concat(n), []);
}
function D(t, r, n) {
  if (t.length !== r * n)
    throw new Error(`List length ${t.length} does not match ${r}x${n} matrix`);
  let e = a(r, n);
  for (let l = 0; l < r; l++)
    for (let o = 0; o < n; o++)
      e[l][o] = t[l * n + o];
  return e;
}
function m(t, r, n, e = !1) {
  let l = t;
  e || (l = d(t));
  let o = l[r];
  return l[r] = l[n], l[n] = o, l;
}
function A(t, r) {
  const [n, e] = s(t), [l, o] = s(r);
  if (n !== l)
    throw new Error(`Matrix M1 has ${n} rows, Matrix M2 has ${l} rows. Cannot adjoin.`);
  let f = a(n, e + o);
  for (let i = 0; i < n; i++) {
    for (let u = 0; u < e; u++)
      f[i][u] = t[i][u];
    for (let u = 0; u < o; u++)
      f[i][e + u] = r[i][u];
  }
  return f;
}
function j(t, r, n, e, l) {
  let o = a(n - r, l - e);
  for (let f = r; f < n; f++)
    for (let i = e; i < l; i++)
      o[f - r][i - e] = t[f][i];
  return o;
}
function E(t) {
  let r = d(t), [n, e] = s(r), l = 0;
  for (let o = 0; o < n; o++) {
    if (e <= l)
      return r;
    let f = o;
    for (; r[f][l] === 0; )
      if (f++, n === f && (f = o, l++, e === l))
        return r;
    r = m(r, f, o);
    let i = r[o][l];
    r[o] = r[o].map((u) => u / i);
    for (let u = 0; u < n; u++)
      u !== o && (i = r[u][l], r[u] = v(r[u], M(i, r[o])));
    l++;
  }
  return r;
}
function I(t) {
  let [r, n] = s(t);
  if (r !== n)
    throw new Error("Matrix is not square, cannot invert.");
  let e = A(t, w(r));
  return e = E(e), j(e, 0, r, r, 2 * r);
}
function T(t) {
  var r = Math.cos(t), n = Math.sin(t), e = [
    [r, -n, 0],
    [n, r, 0],
    [0, 0, 1]
  ];
  return e;
}
function F(t) {
  var r = Math.cos(t), n = Math.sin(t), e = [
    [1, 0, 0],
    [0, r, n],
    [0, -n, r]
  ];
  return e;
}
function G(t) {
  var r = Math.cos(t), n = Math.sin(t), e = [
    [r, 0, n],
    [0, 1, 0],
    [-n, 0, r]
  ];
  return e;
}
export {
  A as MAdjoin,
  z as MAsList,
  d as MCopy,
  I as MInverse,
  P as MMProduct,
  E as MRowEchelon,
  S as MTolerate,
  G as Mpitch,
  T as Mroll,
  s as Mshape,
  j as Mslice,
  m as MswapRows,
  $ as MvProduct,
  F as Myaw,
  x as add,
  N as affine3d,
  k as applyAffine3d,
  w as eye,
  D as listAsM,
  a as mZero,
  C as subtract,
  p as vAdd,
  q as vClose,
  B as vCross,
  R as vDot,
  g as vLength,
  L as vMax,
  b as vMin,
  y as vNearlyZero,
  Z as vNormalize,
  M as vScale,
  v as vSub,
  c as vZero
};
