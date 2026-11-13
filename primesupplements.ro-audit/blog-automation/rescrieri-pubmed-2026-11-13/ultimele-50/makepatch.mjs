// Calculează patch-uri pe linii (orig → new) și amprente FNV-1a, ca pagina admin să aplice doar diferențele.
import fs from 'node:fs';
export const fnv = s => { let h = 0x811c9dc5; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0; } return h.toString(16); };
function diff(a, b) {
  const n = a.length, m = b.length, dp = Array.from({ length: n + 1 }, () => new Int32Array(m + 1));
  for (let i = n - 1; i >= 0; i--) for (let j = m - 1; j >= 0; j--) dp[i][j] = a[i] === b[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
  const ops = []; let i = 0, j = 0, cur = null;
  while (i < n || j < m) {
    if (i < n && j < m && a[i] === b[j]) { if (cur) { ops.push(cur); cur = null; } i++; j++; }
    else if (j < m && (i === n || dp[i][j + 1] >= dp[i + 1][j])) { cur = cur || [i, 0, []]; cur[2].push(b[j]); j++; }
    else { cur = cur || [i, 0, []]; cur[1]++; i++; }
  }
  if (cur) ops.push(cur);
  return ops;
}
export const apply = (a, ops) => { const r = a.slice(); for (const [s, d, ins] of [...ops].reverse()) r.splice(s, d, ...ins); return r; };
const M = JSON.parse(fs.readFileSync('meta50.json', 'utf8'));
const S = Object.fromEntries(JSON.parse(fs.readFileSync('scores-new.json', 'utf8')).map(r => [r.h, r]));
fs.mkdirSync('patches', { recursive: true });
let tot = 0;
for (const [id, h] of M) {
  const nz = s => s.replace(/(<\/(?:p|li|h2|h3|h4|div|ul|ol|table|thead|tbody|tr|figure)>)(?=<)/g, '$1\n').split('\n').map(l => l.trim()).filter(Boolean).join('\n');
  const o = nz(fs.readFileSync(`orig/${h}.html`, 'utf8')), nw = nz(fs.readFileSync(`new/${h}.html`, 'utf8'));
  fs.mkdirSync('final', { recursive: true }); fs.writeFileSync(`final/${h}.html`, nw);
  const ops = diff(o.split('\n'), nw.split('\n'));
  if (apply(o.split('\n'), ops).join('\n') !== nw) throw new Error('patch greșit ' + h);
  const over = fs.existsSync(`over/${h}.json`) ? JSON.parse(fs.readFileSync(`over/${h}.json`, 'utf8')) : {};
  const s = S[h];
  const p = { id: 'gid://shopify/Article/' + id, h, ho: fnv(o), hn: fnv(nw), ops, over, seo: s.seo, ai: s.ai, lip: [...s.lipsuri_seo, ...s.lipsuri_ai].join('\n') || '—' };
  fs.writeFileSync(`patches/${h}.json`, JSON.stringify(p)); tot += JSON.stringify(p).length;
}
console.log('total', tot);
