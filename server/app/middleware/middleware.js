/**
 * koa 挂在中间件方法
 */
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const cors = require('@koa/cors');

// const log = require('../middleware/log');
const error = require('./error');

module.exports = function middle(app) {
  app.use(error());

  if (process.env.NODE_ENV === 'development') {
    app.use(logger()); //  log当前请求
  }

  app.use(cors({
    credentials: true, // 返回true浏览器才会解析
  }));

  app.use(bodyparser()); // 在请求正式进入, 对请求的body进行解析
};
