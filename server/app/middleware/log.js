const path = require('path');
const bunyan = require('bunyan');
const config = require('../config');

const logger = bunyan.createLogger({
  name: 'yang-blog',
  serializers: {
    req: bunyan.stdSerializers.req,
    res: bunyan.stdSerializers.res,
    err: bunyan.stdSerializers.err,
  },
  streams: [
    {
      level: 'info',
      stream: process.stdout,
    },
    {
      level: 'trace',
      stream: process.stdout,
    },
    {
      level: 'debug',
      stream: process.stderr,
    },
    {
      type: 'rotating-file',
      level: 'error',
      path: path.join(config.appPath, `logs/${config.env}-error.log`),
      period: '1d',
      count: 7,
    },
  ],
});

module.exports = logger;
