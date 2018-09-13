## 关于代码发布

1. 代码打包到镜像内, 代码版本和镜像tag同步
    + 每次宿主机pull代码, 用Dockerfile创建镜像, cp, npm i
    + 进入已有的容器, 同步代码,npm i, 再commit变成新的镜像
2. 代码不放入镜像，使用volume挂载放入容器。这样镜像只需要维护程序运行的环境，不同的项目运行不同的容器挂载不同的代码。

`docker run -p 9000:9000 -v /c/Users/FEy/Desktop/my/blog:/data -it node:rel /bin/bash`

进入container内的命令行后

进入代码目录, npm run dev 等等即可

### 继续开发

id替换成自己容器的id

```sh
docker container start f99afae99335

docker container exec -it f99afae99335 /bin/bash
```


## 运行一个封装好的容器

注意, 这里其实是自动帮你pull了镜像hello-world, 再运行这个镜像

`docker container run hello-world`

## 开个容器运行一个命令, 运行完毕即退出

`docker container run alpine ls -l`

## 运行后进入容器的shell

`docker container run -it alpine /bin/sh`

-i interactive -t tty 

## 再次进入停止却存在的containner

一定要先启动

`docker container start <container ID>`

再进入 

`docker container exec -it <container ID>`

## 镜像运行容器, 再对容器进行操作, 封装为镜像

```sh
docker container run -ti ubuntu bash 

# 新开容器运行镜像
apt-get update
apt-get install -y figlet
figlet "hello docker"

exit 
# 退出容器

docker container commit CONTAINER_ID
```

再对这个image打一个供我们分辨的tag 如ourfiglet

`docker image tag <IMAGE_ID> ourfiglet`

这样现在这个 ourfiglet 镜像就是一个安装了figlet, 可以直接运行 figlet hello 了

`docker container run ourfiglet figlet hello`

## 用Dockerfile创建镜像

`vim Dockerfile` 创建一个文件

然后输入以下命令

```sh
FROM node

RUN mkdir -p /home

# 工作目录
WORKDIR /home

# 把当前目录里的8000.js复制到容器中
# js是监听在8000端口的http服务返回hello world
COPY ./8000.js /home

# 暴露8000端口
EXPOSE 8000

# 运行
CMD ["node", "8000.js"]
```

构建一个node镜像, tag为v0, 注意有个 .

`sudo docker build -t node:v0 .` 

然后跑起来

`sudo docker run -d -p 8888:8000 node:v0`

访问一下

`curl 0.0.0.0:8888`

## Image layers 的概念

每个image构建,如果都重新开始会相当耗费资源, 所以我们运行的每一步都被缓存起来

这就是 layer, 如果有相同的构建过程, 就直接用缓存起来的 layer 完成这步构建

## 写在集群之前, docker machine
