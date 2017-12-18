# Mysql基础

## 1.连接mysql
### mysql -h 192.168.100.101 -u root -p123 --default-character-set=utf8mb4 -N -e "show databases;"

- -h (--host=name)
> mysql主机地址
>> -h 192.168.100.101

- -u (--user=name)
> 用户名
>> -u root

- -p (--password)
> 密码
>> -p123

- --default-character-set=name
> 设置默认字符编码
>> --default-character-set=utf8mb4

- -N
> 不显示字段名
>> -N

-  -e (--execute=name)
> 扩展命令
>> "show databases;"

## 2.mysql连接信息
### mysqladmin processlist -h 192.168.100.101 -u root -p123
- mysqladmin processlist
