## LEMP || LNMP
第一步就是搭建开发环境

了解一下过程..之后还是docker吧

在Linux操作系统上, 安装Nginx Web 服务反向代理, 数据存储在Mysql上, 动态处理由PHP处理...简称为LEMP 或者 LNMP， LAMP的A则是apache

> Nginx -> N(E)nginx


## 安装Nginx

centos 则使用yum

```sh
sudo yum install epel-release
sudo yum install nginx
sudo systemctl start nginx
```

注: 如果是unbuntu下...

如果有ufw防火墙, 那么可能需要给一个权限

nginx 在安装时已经注册到了 ufw 的服务列表上, 只要一个命令开启就可以了

现在可以允许http协议80端口通过

```sh
sudo ufw allow 'Nginx HTTP'
```

查看当前防火墙白名单状态

```sh
sudo ufw status
```

你会看到这样的输出

```
Output
Status: active

To                         Action      From
--                         ------      ----
OpenSSH                    ALLOW       Anywhere                  
Nginx HTTP                 ALLOW       Anywhere                  
OpenSSH (v6)               ALLOW       Anywhere (v6)             
Nginx HTTP (v6)            ALLOW       Anywhere (v6)
```

现在访问127.0.0.1, 可以看到 nginx 的欢迎页

如果需要开机启动, systemctl 了解一下

```sh
sudo systemctl enable nginx
```

## 安装 mysql 

去mysql官网, 找到[下载地址](http://dev.mysql.com/downloads/repo/yum/)

比如这里centos7, 我选择了8.0最新的社区版 rpm

> rpm命令是RPM软件包的管理工具。
> rpm原本是Red Hat Linux发行版专门用来管理Linux各项套件的程序，由于它遵循GPL规则且功能强大方便，因而广受欢迎。
> 逐渐受到其他发行版的采用。RPM套件管理方式的出现，让Linux易于安装，升级，间接提升了Linux的适用度

```sh
// 用wget把rpm源下载到本地
wget https://dev.mysql.com/get/mysql80-community-release-el7-1.noarch.rpm

// 添加到 repolist 中 
// -U 就是 升级软件包--Update
sudo rpm -Uvh mysql80-community-release-el7-1.noarch.rpm

// 列出所有可以安装的版本
yum repolist all | grep mysql

// 切换disable和enable来决定安装哪个
sudo yum-config-manager --enable mysql80-community // 允许安装8.0
sudo yum-config-manager --disable mysql57-community // 禁止5.7
```

如果不使用这个命令, 也可以直接去配置文件中修改

同样是修改 disable 和 enable

`vim /etc/yum.repos.d/mysql-community.repo`

最后确认一下要安装的版本, 安装!

```sh
yum repolist enabled | grep mysql

sudo yum install mysql-community-server
```

启动服务与查看状态一套煎饼果子

```sh
sudo systemctl start mysqld.service
sudo systemctl status mysqld.service
```

没有之前熟悉的设置密码的环节

##### mysql 8.0 特殊指出在于安装时会设置一个临时密码

```sh
# 查看临时密码
sudo grep 'temporary password' /var/log/mysqld.log

# 进入mysql
mysql -uroot -p 

# 把刚才看到的临时密码粘贴进来

# 修改root密码
ALTER USER 'root'@'localhost' IDENTIFIED BY 'MyNewPass4!'; 
```

学习机也可以修改一下密码规则, 简单的使用123456等

```sql
// 展示当前密码规则
SHOW VARIABLES LIKE 'validate_password.%';

// 设置新的规则
set global validate_password.special_char_count=0;
```

## 安装php

作为一个前端...为啥要安装php呢..

当然是为了phpadmin...

安装下面两个包就可以正确连接到mysql了

```sh
sudo apt-get install php-fpm php-mysql
sudo yum install php php-mysql php-fpm // centos
```


然后为了安全性..同样可以修改一下php的配置文件

```sh
sudo vi /etc/php/7.0/fpm/php.ini
```

去掉这行前面注释用的`;`, 然后设置为1

```sh
cgi.fix_pathinfo=0
```

关于这个的问题请自行搜索..
顺手贴一个关注这个漏洞的博客[链接](http://www.cnblogs.com/batsing/p/nginx_bug1_attack.html)

设置改好后, 重启一下php

```sh
sudo systemctl restart php7.0-fpm
```

## 测试一下nginx是否可以指向php

创建一个php测试文件

```sh
// touch nano等都可以哦
sudo vi /var/www/html/info.php
```

info.php内容

```php
<?php
phpinfo();
```

编辑nginx的默认配置文件, 我们可以先把默认首页80端口, 指向php页面

配置文件位置可能不同系统略有不同

```sh
sudo vi /etc/nginx/sites-available/default
```

配置文件内容如下

```nginx
server {
    listen 80 default_server;
    listen [::]:80 default_server;

    root /var/www/html;
    index index.php index.html index.htm index.nginx-debian.html;
	
    # 新增 index.php..当然也可以不加...反正我们用不到
    
    server_name server_domain_or_IP; # 这里是自己的域名或者ip

    location / {
        try_files $uri $uri/ =404;
    }

    location ~ \.php$ { # 设置了这里就可以指向.php的文件了
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/run/php/php7.0-fpm.sock;
    }

    location ~ /\.ht { # 出于安全考虑拒绝访问.htaccess文件
        deny all;
    }
}
```

检查nginx配置是否有问题

```sh
sudo nginx -t
```

没问题重启nginx

```sh
sudo systemctl reload nginx
```

访问`127.0.0.1/info.php` 成功输出配置信息


## 安装phpMyAdmin

unbuntu上同样的方法, 直接install 即可

```sh
sudo apt-get update
sudo apt-get install phpmyadmin
```

在安装过程中会有一些提示信息

选择一个web server 进行自动配置, 但是里面的选项里没有 nginx

我们可以按tab enter 跳过

下一个提示是配置`dbconfig-common`数据库的相关信息, 选择 yes 继续

然后新建账号密码, 然后会让你输入数据库的帐号密码

一切都完成后

把phpmyadmin的页面做个快捷方式到默认的nginx指向的html下


```sh
sudo ln -s /usr/share/phpmyadmin /var/www/html
```

最后启动phpMyAdmin依赖的`mcrypt`模块, 重启php进程

```sh
sudo phpenmod mcrypt
sudo systemctl restart php7.0-fpm
```

查看`127.0.0.1/phpmyadmin`, 完成!
