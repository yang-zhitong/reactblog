const Router = require('koa-router');

const router = new Router();

const fs = require('fs');
const { join } = require('path');
const { path } = require('./config');

const apiPath = join(path.app, 'api');


fs.readdirSync(apiPath)
  .forEach((it) => {
    if (/\.js$/.test(it)) {
      const api = require(`./api/${it}`);
      router.use('', api.routes(), api.allowedMethods());
    }
  });

module.exports = router;
