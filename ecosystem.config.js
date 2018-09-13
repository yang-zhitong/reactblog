module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [
    {
      name: 'blog',
      cwd: __dirname, // 项目跟目录
      max_memory_restart: '500M',
      script: './server/bin/pro',
      // out_file : "/logs/nova_out.log",
      // error_file : "/logs/nova_error.log",
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        COMMON_VARIABLE: 'true',
      },
    },
  ],
};
