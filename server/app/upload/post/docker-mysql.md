# docker内文件修改tip与mysql相关问题处理

在配置mysql容器中, 碰到要修改容器内配置文件的情况, 来说说几种修改方法

原文引用[一篇博客](http://www.bleachlei.site/blog/2017/10/10/Docker%E4%B8%8BMysql-cnf%E6%96%87%E4%BB%B6%E4%BF%AE%E6%94%B9%E5%B0%8F%E8%B4%B4%E5%A3%AB/)


## 使用镜像运行单独的容器
`docker run -d --name myMysql -v /data/mysql:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=123456 -p 3306:3306 mysql`

>-d : --detach，后台运行。
--name : 为你的镜像创建一个别名，该别名用于更好操作。
-p : 映射端口，一般我们会将默认端口进行更改，避免与本机的mysql端口冲突，如果你宿主机有mysql，请更改端口，如 -p 33060:3306。
-e : 环境变量。为mysql的root用户设置密码为123456。
-v : 指定数据卷，意思就是将mysql容器中的/var/lib/mysql（这个是数据库所有数据信息文件）映射到宿主机/data/mysql里面。 windows则是 d:/data

## 文件修改方法

1. 在容器启动之前就做好映射, 这样修改host宿主机的文件即可

比如mysql的配置, 启动时多加一个参数, 这也是镜像home页推荐做法

`-v /my/custom/:etc/mysql/conf.d`

2. 进入bash手动改

```shell
# 进入容器
docker exec -it <containerid> bash
# 更新列表
apt-get update
# 安装vim
apt-get install vim
# 修改文件
vi /etc/mysql/my.cnf
```

另: powershell的默认配色使用vim真是会让眼睛瞎掉

3. 把文件复制出来, 改好再复制进去

看代码, 以及[官网用法](https://docs.docker.com/engine/reference/commandline/container_cp/)

```
docker cp CONTAINER:FILEPATH LOCALFILEPATH
vi LOCALFILEPATH
docker cp LOCALFILEPATH CONTAINER:FILEPATH
```

## 解决navicat等客户端老版本链接时的协议不支持

错误提示为: Client does not support authentication protocol requested by server; consider upgrading MySQL client

1. 先进入容器

`docker exec -t -i myMysql /bin/bash`

2. 登录, 输入密码

`mysql -uroot -p `

3. 更改协议

```sql
SELECT plugin FROM mysql.user WHERE User = 'root';
ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY '123456';
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '123456';
SELECT plugin FROM mysql.user WHERE User = 'root';
```

4. 查看ip登录

`docker inspect myMysql | grep "IPAddress"`


