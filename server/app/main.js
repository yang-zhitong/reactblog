const Koa = require('koa');

// const serve = require('koa-static');

const router = require('./router'); // 加载路由

const app = new Koa();

// 加载模型
// require('./model/index');
require('./upload/post'); // 把所有文章加载到内存中

require('./middleware/middleware')(app); // 传入app,  给app use 中间件

require('./middleware/context')(app); // 传入app, 或者给ctx挂在全局方法

app.use(router.routes()).use(router.allowedMethods()); // 挂载路由

// 404
app.use((ctx) => {
  ctx.status = 404;
  ctx.body = { code: 404, message: 'Not Found' };
});

module.exports = app;
