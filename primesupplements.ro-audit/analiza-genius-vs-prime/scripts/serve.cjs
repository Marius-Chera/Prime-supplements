// Server static local pentru RAPORT.html (port 8797)
const http = require('http'), fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..'); const T = { '.html': 'text/html; charset=utf-8', '.jpg': 'image/jpeg', '.json': 'application/json', '.csv': 'text/csv; charset=utf-8', '.md': 'text/markdown; charset=utf-8' };
http.createServer((q, r) => { let p = decodeURIComponent(q.url.split('?')[0]); if (p === '/') p = '/RAPORT.html';
  const f = path.join(root, p); if (!f.startsWith(root) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { r.writeHead(404); return r.end('404'); }
  r.writeHead(200, { 'content-type': T[path.extname(f)] || 'application/octet-stream' }); fs.createReadStream(f).pipe(r); }).listen(8797);
