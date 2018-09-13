# 博客

先前后分离, 不需要数据库

运行 npm run dev || npm run pro

把写好的md文件读取到内存中, 正则匹配得到这样一个对象

```javascript
{
  tag: '',
  filename: '',
  description: '',
  category: '',
  content: '',
  timestamp: 1111111111,
}
```

浏览器请求任何地址, 都返回nginx指向的静态html, 在js中react-router来处理

js执行后, axios请求到后台api

根据 query 不同, 比如按 tag, page, category, filename 筛选

如果是同构.....

# 配置和生产环境一致的开发环境

在自己的项目中放一份Dockerfile

```sh
FROM node
 
#　设置国内npm
RUN npm config set registry https://registry.npm.taobao.org  

#　暴露端口
EXPOSE 9000
EXPOSE 3000
```

然后执行　`docker build -t node:rel .`

一份用于开发的containner创建完成

然后开启containner开发

`docker run -p 9000:9000 -p 3000:3000 -v /c/Users/FEy/Desktop/my/blog-react:/data -it node:rel /bin/bash`

进入container内的命令行后

进入代码目录, npm run dev 等等即可

### 第二次进入

id替换成自己容器的id

```sh
docker container start f99afae99335

docker container exec -it f99afae99335 /bin/bash
```

# 开发完毕, 准备部署

构建出用于服务器的image

`docker build -t node:rel .`

运行image并运行在后台

`docker run -p 9000:9000 -p 3000:3000 -v /root/blog:/data -it node:rel /bin/bash`