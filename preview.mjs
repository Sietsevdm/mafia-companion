import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const root=path.resolve(fileURLToPath(new URL('./web/',import.meta.url)));
const types={'.html':'text/html','.css':'text/css','.mjs':'application/javascript','.json':'application/json','.svg':'image/svg+xml'};
const server=http.createServer(async(req,res)=>{try{const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);if(pathname==='/health'){res.writeHead(200,{'Content-Type':'text/plain'});res.end('ok');return;}const file=path.resolve(root,'.'+(pathname==='/'?'/index.html':pathname));if(!file.startsWith(root+path.sep)){res.writeHead(403);res.end();return;}const body=await readFile(file);res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream','Cache-Control':'no-cache'});res.end(body);}catch{res.writeHead(404);res.end('Not found');}});
server.listen(Number(process.env.PORT)||4173,'127.0.0.1',()=>console.log('The Ledger preview: http://127.0.0.1:'+server.address().port));
