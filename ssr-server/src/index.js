require('dotenv').load();

const Koa = require('koa');
const Router = require('koa-router');
const koaStatic = require('koa-static');
const path = require('path');
const fs = require('fs');

const app = new Koa();

const port = process.env.PORT || 5000;

const router = new Router();
router.get('/api/ping', ctx => {
  ctx.body = {
    message: 'pong',
  };
});

app.use(router.routes());
app.use(router.allowedMethods());

const publicPath = path.join(__dirname, '../../build');
app.use(koaStatic(publicPath));

const indexPath = path.join(publicPath, 'index.html');
const indexHtml = fs.readFileSync(indexPath);

app.use(ctx => {
  if (ctx.status !== 404 && !ctx.body) return;
  ctx.status = 200;
  ctx.set('Content-Type', 'text/html; charset=utf-8');
  ctx.body = indexHtml;
});

app.listen(port, () => {
  console.log('Server is listening to port ' + port);
});
