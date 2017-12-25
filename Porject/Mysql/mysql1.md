# Mysql概述、安装配置、mysql多实例

## Mysql 特性

- mysql是一个关系型数据库管理系统
- 开源
- Client/Server 架构
- 性能高、可靠、可扩展、易于使用
> ![mysql结构](./pic/mysqljg.png)

## 5.7特性

- innodb功能增强
- 安全性增强
- 支持json
- sys模式（性能数据收集）
- 多源复制
- 多线程复制
- 支持在线变更复制方式
- 对于Mysql 5.7.6以后的5.7系列版本，Mysql使用mysqld --initialize或mysqld --initialize-insecure命令来初始化数据库，后者可以不生成随机密码。  但是安装Mysql时默认使用的是前一个命令，这个命令也会生成一个随机密码。改密码保存在了Mysql的日志文件中。
- ...

## mysql 安装

- 三种mysql安装方式

```@text
1.软件包管理器安装(网络好时推荐使用，省时)
2.源码安装（定制化环境需求，优化性能）
3.二进制包安装（推荐使用：可以配置多实例，安装速度较源码安装快）
```

### 一、软件包管理器安装(rpm包形式)

#### CentOS：

```@text
下载地址：https://dev.mysql.com/downloads/repo/yum/
 rpm -Uvh mysql57-community-release-el7-11.noarch.rpm (安装mysql社区yum源)
 yum install mysql-community-server
 systemctl start mysqld.service
 systemctl status mysqld.service
```

#### Ubuntu：

```@bash
#下载地址：https://dev.mysql.com/downloads/repo/apt/
 sudo dpkg -i mysql-apt-config_0.8.8-1_all.deb （安装mysql源）
 sudo apt-get update
 sudo apt-get install mysql-server
 sudo service mysql status
```

#### 获取默认随机密码并更新：

```@bash
 grep 'temporary password' /var/log/mysqld.log
 mysql -uroot –p
 mysql> ALTER USER 'root'@'localhost' IDENTIFIED BY '123';
```

### 二、源码包编译安装(源码编译)

[源码包下载地址](https://dev.mysql.com/downloads/mysql)

系统要求：

1.安装GCC编译

2.安装CMake构建框架

3.安装Boost C++库1.59.0版本（必须此版本）

#### 2.1 安装依赖包

CentOS：

```@bash
 yum install -y gcc gcc-c++ cmake bison ncurses-devel
```

Ubuntu：

```@bash
 apt-get install -y gcc cmake bison ncurses-dev
```

#### 2.2 安装MySQL

```@bash
 tar zxvf mysql-boost-5.7.20.tar.gz
 tar zxvf mysql-5.7.20.tar.gz
 cd mysql-5.7.20
 cmake \
-DCMAKE_INSTALL_PREFIX=/usr/local/mysql/mysql_by \
-DSYSCONFDIR=/usr/local/mysql/mysql_by \
-DMYSQL_DATADIR=/usr/local/mysql/mysql_by/data \
-DMYSQL_TCP_PORT=3306 \
-DDEFAULT_CHARSET=utf8 \
-DDEFAULT_COLLATION=utf8_general_ci \
-DMYSQL_UNIX_ADDR=/tmp/mysql_by.sock \
-DWITH_BOOST=./boost \
-DWITH_SYSTEMD=1
 make -j 8
 make install
```

#### 2.3 创建配置文件

> vi my.cnf

```@text
[mysqld]
daemonize = on
user = mysql
port = 3306
basedir = /usr/local/mysql/mysql_by
datadir = /usr/local/mysql/mysql_by/data
socket = /tmp/mysql_by.sock
pid-file = /usr/local/mysql/mysql_by/mysqld.pid
character-set-server = utf8
collation-server = utf8_general_ci
max_connections = 1024
log-error = /usr/local/mysql/mysql_by/mysqld.log
```

#### 2.4 初始化数据

- 初始化报错：Bootstarp and daemon options are incompatible.
  > 初始化目录时 daemonize = on 和bin/mysqld不能同时使用，需要注释 daemonize = on

- 初始化密码问题
  > --initialize-insecure 空密码
  > --initialize 创建默认mysql数据库并退出，创建管理员用户和随机密码（密码在mysql日志中）

```@bash
 useradd -M -s /sbin/nologin mysql
 cd /usr/local/mysql/mysql_by
 bin/mysqld --initialize-insecure --basedir=/usr/local/mysql/mysql_by --datadir=/usr/local/mysql/mysql_by/data --user=mysql
 chown -R mysql.mysql .
```

#### 2.5 启动mysql

```@bash
 cd /usr/local/mysql/mysql_by
 ./bin/mysqld --defaults-file=./my.cnf
```

#### 2.6 获取默认随机密码并更新

```@bash
 grep 'temporary password' /usr/local/mysql/mysql_by/mysqld.log
 mysql -uroot –p
 mysql> ALTER USER 'root'@'localhost' IDENTIFIED BY '123';
```

### 三、二进制包安装（通用二进制形式）

[二进制包下载地址](https://dev.mysql.com/downloads/mysql)

#### 3.1 安装依赖包

源码包跟免编译包安装唯一不好的地方是要解决依赖关系，如果没有解决，在安装的时候会报错。

##### 3.1.1 CentOS：

```@bash
 yum install libaio
```

##### 3.1.1 Ubuntu：

```@bash
 apt-get install libaio1
```

#### 3.2 创建配置文件

> vi my.cnf

```@bash
[mysqld]
daemonize = on
user = mysql
port = 3306
basedir = /usr/local/mysql/mysql_ejz
datadir = /usr/local/mysql/mysql_ejz/data
socket = /tmp/mysql_ejz.sock
pid-file = /usr/local/mysql/mysql_ejz/mysqld.pid
character-set-server = utf8
collation-server = utf8_general_ci
max_connections = 1024
log-error = /usr/local/mysql/mysql_ejz/mysqld.log
```

#### 3.3 初始化数据

- 初始化报错：Bootstarp and daemon options are incompatible.
> 初始化目录时 daemonize = on 和bin/mysqld不能同时使用，需要注释 daemonize = on

- 初始化密码问题
  > --initialize-insecure 空密码
  > --initialize 创建默认mysql数据库并退出，创建管理员用户和随机密码（密码在mysql日志中）

```@bash
 useradd -M -s /sbin/nologin mysql
 tar zxvf mysql-5.7.20-linux-glibc2.12-x86_64.tar.gz
 mv mysql-5.7.20-linux-glibc2.12-x86_64 /usr/local/mysql/mysql_ejz
 cd /usr/local/mysql/mysql_ejz
 bin/mysqld --initialize --basedir=/usr/local/mysql/mysql_ejz --datadir=/usr/local/mysql/mysql_ejz/data --user=mysql
 chown -R mysql.mysql .
```

#### 3.4 启动mysql

```@bash
 cd /usr/local/mysql/mysql_by
 ./bin/mysqld --defaults-file=./my.cnf
```

#### 3.5 systemd管理MySQL服务

```@text
# vi /usr/lib/systemd/system/mysqld.service
[Unit]
Description=MySQL Server
Documentation=man:mysqld(8)
Documentation=http://dev.mysql.com/doc/refman/en/using-systemd.html
After=network.target
After=syslog.target
[Service]
User=mysql
Group=mysql
Type=forking
TimeoutSec=0
PermissionsStartOnly=true
ExecStart=/usr/local/mysql/bin/mysqld --defaults-file=/usr/local/mysql/mysql_ejz/my.cnf
LimitNOFILE = 5000
Restart=on-failure
RestartPreventExitStatus=1
PrivateTmp=false
[Install]
WantedBy=multi-user.target
# systemctl start mysqld
# systemctl status mysqld
```

#### 3.6 获取默认随机密码并更新

```@bash
 grep 'temporary password' /usr/local/mysql/mysql_ejz/mysqld.log
 mysql -uroot –p
 mysql> ALTER USER 'root'@'localhost' IDENTIFIED BY '123';
```

## mysql 多实例

### 1.用处

1.1 提高服务器资源利用率

1.2 测试环境

### 2.mysql多实例不同之处

2.1 数据目录

2.2 端口

2.3 Socket文件

2.4 Pid文件

### 1.安装MySQL

  > 使用源码和二进制包安装方式安装。

### 2.初始化多个目录

- 初始化报错：Bootstarp and daemon options are incompatible.
> 初始化目录时 daemonize = on 和bin/mysqld不能同时使用，需要注释 daemonize = on

- 初始化密码问题
  > --initialize-insecure 空密码
  > --initialize 创建默认mysql数据库并退出，创建管理员用户和随机密码（密码在mysql日志中）

```@text
# 二进制包初始化时默认使用/var/log/mysql路径作为默认日志路径，需要创建
 mkdir /var/log/mysql
 chown -R mysql.mysql /var/log/mysql
#初始化
for i in {1..3};do bin/mysqld --initialize-insecure --user=mysql --basedir=/usr/local/mysql/mysql_ejz --datadir=/usr/local/mysql/mysql_ejz/data${i};done
或者
 bin/mysqld --initialize-insecure --basedir=/usr/local/mysql/mysql_ejz --datadir=/usr/local/mysql/mysql_ejz/data1 --user=mysql
 bin/mysqld --initialize-insecure --basedir=/usr/local/mysql/mysql_ejz --datadir=/usr/local/mysql/mysql_ejz/data2 --user=mysql
 bin/mysqld --initialize-insecure --basedir=/usr/local/mysql/mysql_ejz --datadir=/usr/local/mysql/mysql_ejz/data3 --user=mysql
chown -R mysql.mysql ./
```

### 3.myslq多实例管理

管理方式：
1.mysql官方提供的mysqld_multi工具管理
2.配置文件形式管理

#### 3.1 使用mysqld_multi工具集中管理

##### 3.1.1 配置mysqld_multi配置文件

> vi /usr/local/mysql/mysql_ejz/my.cnf

```@bash
[mysqld_multi]
mysqld = /usr/local/mysql/mysql_ejz/bin/mysqld_safe
mysqladmin = /usr/local/mysql/mysql_ejz/bin/mysqladmin
user = multi_admin
password = multi_password
log = /usr/local/mysql/mysql_ejz/mysql_multi.log
#
[mysqld1]
server-id=1
bind-address=0.0.0.0
socket = /tmp/mysql_ejz1.sock
port = 3307
pid-file = /usr/local/mysql/mysql_ejz/data1/mysql1.pid
datadir = /usr/local/mysql/mysql_ejz/data1
user = mysql
character-set-server = utf8
collation-server = utf8_general_ci
max_connections = 1024
log-error = /usr/local/mysql/mysql_ejz/data1/mysql1.log
#
[mysqld2]
server-id=2
bind-address=0.0.0.0
socket = /tmp/mysql_ejz2.sock
port = 3308
pid-file = /usr/local/mysql/mysql_ejz/data2/mysql2.pid
datadir = /usr/local/mysql/mysql_ejz/data2
user = mysql
character-set-server = utf8
collation-server = utf8_general_ci
max_connections = 1024
log-error = /usr/local/mysql/mysql_ejz/data2/mysql2.log
#
[mysqld3]
server-id=3
bind-address=0.0.0.0
socket = /tmp/mysql_ejz3.sock
port = 3309
pid-file = /usr/local/mysql/mysql_ejz/data3/mysql3.pid
datadir = /usr/local/mysql/mysql_ejz/data3
user = mysql
character-set-server = utf8
collation-server = utf8_general_ci
max_connections = 1024
log-error = /usr/local/mysql/mysql_ejz/data3/mysql3.log
```

#### 3.1.3 管理多实例服务

先启动mysql多实例，为每个实例配置multi管理账号。

```@bash
 cd /usr/local/mysql/mysql_ejz
 bin/mysqld_multi start/stop
 bin/mysqld_multi start/stop 1
 bin/mysqld_multi start/stop 2
 bin/mysqld_multi start/stop 2,3
 bin/mysqld_multi report 1,2
```

#### 3.1.4 为每个MySQL实例创建一个公共账户，用于关闭实例，确保该账户有SHUTDOWN权限

```@bash
#设置具有shutdown权限公共账号
mysql -u root -S /tmp/mysql_ejz1.sock -N -e "grant shutdown on *.* to 'multi_admin'@'%' identified by 'multi123'"

#设置root密码
mysql -u root -S /tmp/mysql_ejz1.sock -N -e "alter user root@localhost identified by '123'"
```

### 3.2 配置文件管理mysql多实例

#### 3.2.1 创建配置文件

> vim my1.cnf

```@text
[mysqld]
daemonize = on
socket = /tmp/mysql_ejz1.sock
port = 3306
pid-file = /usr/local/mysql/mysql_ejz/data1/mysql1.pid
datadir = /usr/local/mysql/mysql_ejz/data1
user = mysql
character-set-server = utf8
collation-server = utf8_general_ci
max_connections = 1024
log-error = /usr/local/mysql/mysql_ejz/mysql1.log
```

> vim my2.cnf

```@text
[mysqld]
daemonize = on
socket = /tmp/mysql_ejz2.sock
port = 3307
pid-file = /usr/local/mysql/mysql_ejz/data2/mysql2.pid
datadir = /usr/local/mysql/mysql_ejz/data2
user = mysql
character-set-server = utf8
collation-server = utf8_general_ci
max_connections = 1024
log-error = /usr/local/mysql/mysql_ejz/mysql2.log
```

> vim my3.cnf

```@text
[mysqld]
daemonize = on
socket = /tmp/mysql_ejz3.sock
port = 3308
pid-file = /usr/local/mysql/mysql_ejz/data3/mysql3.pid
datadir = /usr/local/mysql/mysql_ejz/data3
user = mysql
character-set-server = utf8
collation-server = utf8_general_ci
max_connections = 1024
log-error = /usr/local/mysql/mysql_ejz/mysql3.log
```

#### 3.2.2 启动mysql多实例

```@bash
 cd /usr/local/mysql/mysql_ejz
 bin/mysqld --defaults-file=my1.cnf
 bin/mysqld --defaults-file=my2.cnf
 bin/mysqld --defaults-file=my3.cnf
```
