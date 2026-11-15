const http=require("http"),fs=require("fs"),path=require("path");
const root="D:/Proiecte Claude/Prime Supplements/Prime-supplements/primesupplements.ro-audit/pagina-produs-vizuala/poze";
const t={".html":"text/html; charset=utf-8",".jpg":"image/jpeg",".png":"image/png",".json":"application/json"};
http.createServer((q,s)=>{let p=decodeURIComponent(q.url.split("?")[0]);if(p==="/")p="/galerie.html";const f=path.join(root,p);if(!f.startsWith(path.normalize(root))||!fs.existsSync(f)){s.writeHead(404);return s.end();}s.writeHead(200,{"Content-Type":t[path.extname(f)]||"application/octet-stream"});fs.createReadStream(f).pipe(s);}).listen(8795);
