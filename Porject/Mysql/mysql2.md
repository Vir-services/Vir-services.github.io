# Mysql基础

## 1.连接mysql
```
mysql -h 192.168.100.101 -u root -p123  --default-character-set=utf8mb4 mysql -N -e "show tables;"
```
- -h (--host=name)
> mysql主机地址
>> -h 192.168.100.101

- -u (--user=name)
> 用户名
>> -u root

- -p (--password)
> 密码
>> -p123

- -P (--port)
> 端口
>> -P3306

- -S (--socket)
> socket文件方式连接，自定义socket位置后本地连接时需要指定socket文件
>> -S /tmp/mysql.sock

- --default-character-set=name
> 设置默认字符编码
>> --default-character-set=utf8mb4

- 最后一位传参写数据库名，登陆后直接进入指定数据库

- -N
> 不显示字段名
>> -N

-  -e (--execute=name)
> 扩展命令
>> "show databases;"

## 2.mysql连接信息
```
mysqladmin processlist -h 192.168.100.101 -u root -p123
```
- mysqladmin processlist


## 3.mysql默认数据库
- information_schema

存储其他数据库信息。没有数据库目录。

- mysql

系统自身的一些数据，账户授权、事件、用户定义函数、插件信息、时区、帮助文档和复制表。

- performance_schema

v5.5新增的一个性能监控引擎，用于收集实例运行时内部情况。

- sys

收集实例性能数据，以便调试和诊断问题。

### 3.1 mysql库
- mysql.user
登陆验证使用，存放账号、密码和权限信息
```
部分字段：
user: 用户名
host: 允许登陆远程主机  （% 任意ip登陆，192.168.1.% 指定网段允许登陆，localhost 通过localhost登陆）
```

### 3.2 information_schema库

### 3.3 performance_schema库

### 3.4 sys库



## 4.mysql命令行
### 4.1 数据库级操作
- clear     (\c) Clear the current input statement.

- connect   (\r) Reconnect to the server. Optional arguments are db and host.
> 重连数据库
>> connect
>> connect mysql

- resetconnect   (\x)
> 重置连接
> resetconnect

- delimiter (\d) Set statement delimiter.
> 设置语句分隔符
>> delimiter ;

- edit      (\e) Edit command with $EDITOR.
> 以文件编辑器形式编辑语句，保存后输入;执行

- ego       (\G) Send command to mysql server, display result vertically.
> 垂直显示字段
>> show tables \G ;

- go        (\g) Send command to mysql server.

- help      (\h) Display this help.
> 显示帮助
>> help

- nopager   (\n) Disable pager, print to stdout.

- notee     (\t) Don't write into outfile.
> 不输出到文件

- pager     (\P) Set PAGER [to_pager]. Print the query results via PAGER.

- print     (\p) Print current command.
> 打印

- prompt    (\R) Change your mysql prompt.
> 设置开头的提示符
> prompt mytest>

- quit      (\q) Quit mysql.
> 退出mysql
>> quit

- exit      (\q) Exit mysql. Same as quit.
> 退出mysql
>> exit

- rehash    (\#) Rebuild completion hash.
> 命令提示符
>> tab 使用

- source    (\.) Execute an SQL script file. Takes a file name as an argument.
> 执行sql语句文件
>> source /home/test.sql

- status    (\s) Get status information from the server.
> 输出数据库状态信息
>> status

- system    (\!) Execute a system shell command.
> 执行系统shell命令
>> system ls /home

- tee       (\T) Set outfile [to_outfile]. Append everything into given outfile.
> 记录语句和结果，输出到给定的文件中。
>> tee /home/123.log (之后执行的命令和结果都会记录到文件中)

- use       (\u) Use another database. Takes database name as argument.
> 使用指定数据库
>> use mysql

- charset   (\C) Switch to another charset. Might be needed for processing binlog
with multi-byte charsets.
> 更改默认字符集
>> charset utf8
>> \C utf8

- warnings  (\W) Show warnings after every statement.


- nowarning (\w) Don't show warnings after every statement.


### 4.2数据库表级操作

### 4.3 show 命令
  - 显示当前数据库中所有表的名称。
  > show tables或show tables from database_name;

  - 显示mysql中所有数据库的名称。

  > show databases;

  - 显示表中列名称。

  > show columns from table_name from database_name; 或show columns from
database_name.table_name;

  - 显示一个用户的权限，显示结果类似于grant 命令。

  > show grants for user_name;

  - 显示表的索引。

  > show index from table_name;

  - 显示一些系统特定资源的信息，例如，正在运行的线程数量。

  > show status;

  - 显示系统变量的名称和值。

  > show variables;

  - 显示系统中正在运行的所有进程，也就是当前正在执行的查询。大多数用户可以查看他们自己的进程，但是如果他们拥有process权限，就可以查看所有人的进程，包括密码。

  > show processlist;

  - 显示当前使用或者指定的database中的每个表的信息。信息包括表类型和表的最新更新时间。

  > show table status;

  - 显示服务器所支持的不同权限。

  > show privileges;

  - 显示create database 语句是否能够创建指定的数据库。

  > show create database database_name;

  - 显示create database 语句是否能够创建指定的数据库。

  > show create table table_name;

  - 显示安装以后可用的存储引擎和默认引擎。

  > show engies;

  - 显示innoDB存储引擎的状态。

  > show innodb status;

  - 显示BDB存储引擎的日志。

  > show logs;

  - 显示最后一个执行的语句所产生的错误、警告和通知。

  > show warnings;

  - 只显示最后一个执行语句所产生的错误。

  > show errors;

  - 显示安装后的可用存储引擎和默认引擎。

  > show [storage] engines;

## 5.数据库常用操作
- 创建数据库
> create database [DB NAME];
>> create database mytest;

- 删除数据库
> drop database [DB NAME];
>> drop database mytest;

- 使用(进入)数据库
> use [DB NAME];
> use mysql;

- 查看表结构
> describe [tabl name];
>> describe user;

## 6.变量

系统变量

全局变量：作用域整个实例。使用SET GLOBAL VAR_NAME=VALUE语句更改变量值。

会话变量：作用于客户端会话。使用SET SESSION VAR_NAME=VALUE语句更改变量值。

系统变量表：https://dev.mysql.com/doc/refman/4.6/en/server-system-variables.html

动态系统变量表：https://dev.mysql.com/doc/refman/4.6/en/dynamic-system-variables.html

- 系统变量
> SHOW [GLOBAL | SESSION] STATUS

- mysql系统变量
> SHOW VARIABLES;
> SHOW VARIABLES LIKE 'character_set%'; (模糊匹配)

状态变量
查看服务器状态变量：
mysql> SHOW GLOBAL STATUS;

## 7.日志类型
- Error log

  错误日志：实例启动、运行或关闭的问题
```
err-log=/var/log/mysql/error.log
```

- General query log

  查询日志：建立客户端连接和从客户端接收的语句（所有接收的语句）
```
log-output=FILE
general_log=1
general_log_file=/var/log/mysql/general_query.log
```
- Binary log

  二进制日志：更改数据的语句（也用于复制）
```
server_id=1
log-bin=mysql-bin
```
- Relay log

  主从-从库日志：从复制的主服务器接收到的数据更改的语句

- Slow query log

  慢查询日志：查询花费了超过long_query_time（秒）执行的语句
```
slow_query_log=1
long_query_time=10
slow_query_log_file=/var/log/mysql/slow_query.log
```

## 8.字符集：Unicode
编码：GB2312、GBK、UTF-8

更改数据库字符集：

> set global character_set_database=utf8;

更改数据库客户端字符集：

> set global character_set_client=utf8;

更改连接默认字符集：

> set global character_set_connection=utf8;

更改存在数据库的字符集：

> alter database mydb character set utf-8;

更改存在表的字符集：

>alter table mytable default character set utf8;

更改存在表字段字符集：

> alter table mytable change old_column new_column varchar(255) character set utf8;


## 9.存储引擎
### 9.1 InnoDB
InnoDB是一种高可靠和高性能的存储引擎，使用最为广泛。MySQL5.5版本之后的默认存储引擎。

#### 9.1.1 InnoDB主要特点：
- 支持事务
- 行级锁
- 支持外键约束
- 自维护缓冲池，缓存索引和数据
- 支持全文索引
- 如果服务器软硬件故障，能自动恢复崩溃之前未提交完成的更改
- 已经设计在处理大数据时能发挥CPU最大性能

#### 9.1.2 物理结构:
- 表结构文件扩展名.frm

- 数据文件扩展名.ibd

- 表空间ibdata1

- 日志文件ib_logfileN

启动选项/系统变量
> show variables like 'innodb%';


### 9.2 MyISAM
MySQL5.5版本之前的默认存储引擎。

#### 9.2.1 特点和innodb区别:
不支持事物
不支持外键
支持表级锁
物理结构不同

#### 9.2.2 物理结构:
表结构文件扩展名.frm
数据文件扩展名.MYD
索引文件扩展名.MYI

### 9.3 其他存储引擎
MEMORY
基于hash存储到内存中，临时存储（会话状态）

CSV
文本形式存储

ARCHIVE
插入性能好

BLACKHOLE
不保存数据，（从库使用）只保存二进制文件时使用

MRG_MYISAM（MERGE）
增强版myisam，分布式访问提高性能。

NDB
并行集群引擎。

### 9.4 设置存储引擎
9.4.1 配置文件设置引擎
9.4.2 命令行设置引擎

### 9.5 ACID

### 9.6 锁机制
