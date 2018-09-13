function errorHandleMiddle() {
  return async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      ctx.status = err.status || 500;
      ctx.body = { error_msg: err.message };
      ctx.app.emit('error', err, ctx);
    }
  };
}

module.exports = errorHandleMiddle;
