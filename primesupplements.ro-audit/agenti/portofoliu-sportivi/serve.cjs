// Server static local pentru folderul portofoliu-sportivi. Doar 127.0.0.1.
const http = require('http'), fs = require('fs'), path = require('path');
const root = path.resolve(__dirname);
const T = { '.html': 'text/html; charset=utf-8', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json', '.webm': 'video/webm', '.svg': 'image/svg+xml', '.md': 'text/plain; charset=utf-8' };
http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]); if (p.endsWith('/')) p += 'index.html';
  const f = path.join(root, p);
  if (!f.startsWith(root) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); return res.end('404'); }
  res.writeHead(200, { 'content-type': T[path.extname(f)] || 'application/octet-stream' });
  fs.createReadStream(f).pipe(res);
}).listen(8800, '127.0.0.1', () => console.log('http://127.0.0.1:8800/'));
