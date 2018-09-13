/**
 * 全局配置文件
 */
/* eslint global-require: 0 */

const { join } = require('path');

const { name, version } = require('../package.json');

const env = process.env.NODE_ENV || 'development';

const dbConfig = {
  local: {
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: '123',
    database: 'blog',
  },
  remote: {
    host: '192.168.11.13',
    port: '3306',
    user: 'root',
    password: '123456',
    database: 'tm_test',
  },
  server: {

  },
};

const config = {
  env,
  /** 应用名称 */
  name,
  /** 版本 */
  version,

  /** 应用目录 */
  path: {
    app: __dirname,
    project: join(__dirname, '..'),
  },
  /** 绑定IPv4 */
  hostname: '0.0.0.0',
  /** 端口 */
  port: process.env.PORT || 9000,

  /** 调试模式 */
  debug: env === 'development',

  db: process.env.SYS_NAME === 'windows' ? dbConfig.remote : dbConfig.local,
};

module.exports = config;
