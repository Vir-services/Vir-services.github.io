

## 1.[安装]
###环境ubuntu16.04

* 1.对版本无要求学习使用，使用内置安装。
```
> apt install docker.io
```

* 2.官方脚本安装
```
> curl -fsSL get.docker.com -o get-docker.sh
> sudo sh get-docker.sh
```

* 3.手动安装特定版本.deb包
 > * 简单说明：docker分为社区版（CE）和企业版（EE）。
 > * Ubuntu的Docker是在Ubuntu Linux环境下安装Docker平台的最佳方式。
 > * 下载地址：https://store.docker.com
 > * 官方文档:https://docs.docker.com/engine/installation/

```
1.查看当前版本。
> sudo lsb_release -a
2.下载deb包
wget https://download.docker.com/linux/ubuntu/dists/xenial/pool/stable/amd64/docker-ce_17.03.2~ce-0~ubuntu-xenial_amd64.deb
3.安装包
> sudo dpkg -i /path/to/package.deb
```

## 2.[启动]
systemctl或者service命令启动
```
>  systemctl start docker.service
> /etc/init.d/docker start
```
