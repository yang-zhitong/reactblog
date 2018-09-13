/**
 * koa 静态绑定上下文工具
 */

// const mongoose = require('mongoose');
// const { sequelize, Op } = require('../config/db.js');

// const { instances } = require('../model/index.js');

const config = require('../config.js');

module.exports = function context(app) {
  /**
    app.context.model = function (model) {
      return mongoose.model(name);;
    }
  */
  // app.context.model = name => mongoose.model(name);
  // app.context.fail = (msg = 'noop') => {
  //   app.context.body = { msg };
  // };

  // app.context.mysql = name => sequelize.model(name);

  // app.context.sequelize = sequelize;

  // app.context.op = Op;

  app.context.config = config;
};
