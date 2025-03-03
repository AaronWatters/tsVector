function w(t, r) {
  return t + r;
}
function M(t, r) {
  return t - r;
}
function o(t) {
  return Array(t).fill(0);
}
function m(t, r) {
  let n = o(t.length);
  for (let e = 0; e < t.length; e++)
    n[e] = t[e] + r[e];
  return n;
}
function y(t, r) {
  let n = o(t.length);
  for (let e = 0; e < t.length; e++)
    n[e] = Math.min(t[e], r[e]);
  return n;
}
function A(t, r) {
  let n = o(t.length);
  for (let e = 0; e < t.length; e++)
    n[e] = Math.max(t[e], r[e]);
  return n;
}
function g(t, r) {
  let n = o(r.length);
  for (let e = 0; e < r.length; e++)
    n[e] = t * r[e];
  return n;
}
function v(t, r) {
  return m(t, g(-1, r));
}
function d(t) {
  return Math.sqrt(t.reduce((r, n) => r + n * n, 0));
}
function $(t) {
  return g(1 / d(t), t);
}
function p(t, r = 1e-6) {
  return d(t) < r;
}
function j(t, r, n = 1e-6) {
  return p(v(t, r), n);
}
function c(t, r) {
  return Array(t).fill(0).map(() => o(r));
}
function C(t, r) {
  let n = c(4, 4);
  for (let e = 0; e < 3; e++) {
    for (let l = 0; l < 3; l++)
      n[e][l] = t[e][l];
    n[e][3] = r[e];
  }
  return n[3][3] = 1, n;
}
function a(t, r = !1) {
  let n = t.length, e = t[0].length;
  if (r) {
    for (let l = 1; l < n; l++)
      if (t[l].length !== e)
        throw new Error(`Row ${l} has ${t[l].length} columns, expected ${e}`);
  }
  return [t.length, t[0].length];
}
function Z(t) {
  let r = c(t, t);
  for (let n = 0; n < t; n++)
    r[n][n] = 1;
  return r;
}
function x(t, r) {
  let n = o(t.length);
  for (let e = 0; e < t.length; e++)
    for (let l = 0; l < t[e].length; l++)
      n[e] += t[e][l] * r[l];
  return n;
}
function B(t, r) {
  const [n, e] = a(t), [l, h] = a(r);
  if (e !== l)
    throw new Error(`Matrix A has ${e} columns, Matrix B has ${l} rows. Cannot multiply.`);
  let s = c(n, h);
  for (let u = 0; u < n; u++)
    for (let i = 0; i < h; i++)
      for (let f = 0; f < e; f++)
        s[u][i] += t[u][f] * r[f][i];
  return s;
}
function E(t) {
  return t.map((r) => r.slice());
}
function N(t, r = 1e-3) {
  return t.map((n) => n.map((e) => Math.abs(e - Math.round(e)) < r ? Math.round(e) : e));
}
export {
  E as MCopy,
  B as MMProduct,
  N as MTolerate,
  a as Mshape,
  x as MvProduct,
  w as add,
  C as affine3d,
  Z as eye,
  c as mZero,
  M as subtract,
  m as vAdd,
  j as vClose,
  d as vLength,
  A as vMax,
  y as vMin,
  p as vNearlyZero,
  $ as vNormalize,
  g as vScale,
  v as vSub,
  o as vZero
};
