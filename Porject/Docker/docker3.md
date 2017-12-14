# 四、docker 容器管理（mysql篇）


## 1.搜索镜像
> docker search mysql

## 2.下载镜像
> docker pull centos/mysql-57-centos7

## 3.创建网络
> docker network create --subnet=192.168.100.0/24 network_192.168_100

## 4.创建my.cnf
> 主
[mysqld]
user = mysql
port = 3306
server-id=1 #设置唯一ID
log-bin=mysql-bin #开启binlog
 #gtid_mode=ON
 #enforce_gtid_consistency=ON #开启GTID模式
bind-address = 0.0.0.0
character-set-server = utf8mb4
collation-server = utf8mb4_general_ci
max_connections = 1024
log-error = /var/lib/mysql/mysqld.log
!includedir /etc/my.cnf.d

> 从
[mysqld]
user = mysql
port = 3306
server-id=2 #设置唯一ID
 #gtid_mode=ON
 #enforce_gtid_consistency=ON #开启GTID模式
bind-address = 0.0.0.0
character-set-server = utf8mb4
collation-server = utf8mb4_general_ci
max_connections = 1024
log-error = /var/lib/mysql/mysqld.log
!includedir /etc/my.cnf.d

## 5.配置数据库目录权限为777
> [ ! -d "/data/mysql-master1/mysql" ] && chmod -R 777 /data/mysql-master1/mysql
> [ ! -d "/data/mysql-master2/mysql" ] && chmod -R 777 /data/mysql-master2/mysql
> [ ! -d "/data/mysql-slave1/mysql" ] && chmod -R 777 /data/mysql-slave1/mysql
> [ ! -d "/data/mysql-slave2/mysql" ] && chmod -R 777 /data/mysql-slave2/mysql

## 6.启动容器
  - 启动mysql-master1容器
> docker run -h mysql-master1 --dns 114.114.114.114 --name mysql-master1 -p 33006:3306 -v /data/mysql-master1/my.cnf:/etc/my.cnf -v /data/mysql-master1/mysql:/var/lib/mysql --network network_192.168_100 --ip 192.168.100.101 --restart on-failure:3  -e MYSQL_ROOT_PASSWORD=123.com -d centos/mysql-57-centos7:latest

  - 启动mysql-master2容器
> docker run -h mysql-master2 --dns 114.114.114.114 --name mysql-master2 -p 33007:3306 -v /data/mysql-master2/my.cnf:/etc/my.cnf -v /data/mysql-master2/mysql:/var/lib/mysql --network network_192.168_100 --ip 192.168.100.102 --restart on-failure:3  -e MYSQL_ROOT_PASSWORD=123.com -d centos/mysql-57-centos7:latest

  - 启动mysql-slave1容器
> docker run -h mysql-slave1 --dns 114.114.114.114 --name mysql-slave1 -p 33008:3306 -v /data/mysql-slave1/my.cnf:/etc/my.cnf -v /data/mysql-slave1/mysql:/var/lib/mysql --network network_192.168_100 --ip 192.168.100.103 --restart on-failure:3  -e MYSQL_ROOT_PASSWORD=123.com -d centos/mysql-57-centos7:latest

  - 启动mysql-slave2容器
> docker run -h mysql-slave2 --dns 114.114.114.114 --name mysql-slave2 -p 33009:3306 -v /data/mysql-slave2/my.cnf:/etc/my.cnf -v /data/mysql-slave2/mysql:/var/lib/mysql --network network_192.168_100 --ip 192.168.100.104 --restart on-failure:3  -e MYSQL_ROOT_PASSWORD=123.com -d centos/mysql-57-centos7:latest
