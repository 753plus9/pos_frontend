const { createServer } = require('http');
const next = require('next');

const port = parseInt(process.env.PORT || '3000', 10);
const dev = false; // 本番環境なのでfalse
const app = next({ dev, dir: '.' });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    handle(req, res);
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on ${process.env.NEXT_PUBLIC_API_ENDPOINT}:${port}`);
  });
});
