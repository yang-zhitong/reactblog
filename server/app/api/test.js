const Router = require('koa-router');

const router = new Router();

router
  .get('/test', async (ctx) => {
    ctx.body = `debug is ${process.env.NODE_ENV}, ${ctx.config.debug}`;
  });

module.exports = router;

