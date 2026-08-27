// vite preview does not do SPA history fallback for nested paths like
// /ruleset-guide/:id, but Vercel does. Serve dist/ the way production does so
// the tests reflect real behavior.
import http from 'http'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const dist = path.join(path.dirname(fileURLToPath(import.meta.url)), '../../dist')
const MIME = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.ttf': 'font/ttf'
}

http.createServer((req, res) => {
  const url = decodeURIComponent(req.url.split('?')[0])
  let file = path.join(dist, url)
  if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) {
    file = path.join(dist, 'index.html') // SPA fallback, as Vercel does
  }
  res.writeHead(200, { 'content-type': MIME[path.extname(file)] || 'application/octet-stream' })
  fs.createReadStream(file).pipe(res)
}).listen(50005, () => console.log('serving dist on http://localhost:50005'))
