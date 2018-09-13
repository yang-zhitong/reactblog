# 一个用react + koa博客

前端静态页面, 不使用mvc模式渲染(后续更新成同构mvc渲染)

进入server目录运行 `npm run dev`

进入client目录运行 `npm start`

不需要数据库, 把写好的md文件读取到内存中, 处理得到这样一个文章列表

```javascript
{
  tag: '',
  filename: '',
  description: '',
  category: '',
  content: '',
  date: '',
}
```

浏览器请求任何地址, 都返回nginx指向的静态html

js中react-router会进行路由处理, 然后axios请求到后台异步获取数据

根据 query 不同, 比如按 tag, page, category, filename 筛选

# 配置和生产环境一致的开发环境

项目部署可能会碰到平台不同导致依赖的包的一些差异

为了消除这种差异, 可以在开发时就使用线上环境

方法是把node_modules安装在docker中

把项目代码文件用volumes挂载进容器, 正常写代码查看效果

# 部署

在服务端pull代码后, 安装依赖 `npm i`

用docker-compose直接启动服务 `docker-compose up`

第一版配置, 基于node镜像, 应该指定版本号, 这里无所谓了

```yml
version: '3'
services:
  web:
    image: node
    container_name: blog
    environment:
      PORT: 9000
    ports:
      - 9000:9000
    volumes:
      - './server:/data'
    working_dir: /data
    command: npm run pro
```

更新代码后`docker-compose restart` 即可


