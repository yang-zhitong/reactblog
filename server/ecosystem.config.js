module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [
    {
      name: 'blog',
      cwd: __dirname, // 项目跟目录
      max_memory_restart: '100M',
      script: './bin/www',
      log_file: 'combined.outerr.log',
      out_file: 'out.log',
      error_file: 'err.log',
      instances: '1',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        COMMON_VARIABLE: 'true',
      },
    },
  ],
};
