const Router = require('koa-router');

const router = new Router();

router
  .get('/test', async (ctx) => {
    ctx.body = `debug is ${process.env.NODE_ENV}, ${ctx.config.debug}`;
  });

router
  .get('/test/error', async (ctx) => {
    // 这里有个错误，params 是 undefined
    // process.exit(1);
    // const a = ctx.aaa.bbb;

    ctx.body = 'Hello World\n';
  });

module.exports = router;

