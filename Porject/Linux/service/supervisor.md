#

## 安装

- ```pip install supervisor```


## 配置

  - 生成配置文件
  > mkdir /etc/supervisor

  > echo_supervisord_conf > /etc/supervisor/supervisord.conf

  - 如启动报错 pkg_resources.DistributionNotFound: meld2>=-1.5.4
  > 解决方法：  pip install setuptools --upgrade

  - 写入程序配置
```
[program:monitor_network]
command=/bin/bash /usr/local/src/monitor_network.sh
directory=/usr/local/src
user=root
autostart=true
autorestart=true
startsecs=3
;stdout_logfile=/var/log/supervisor/monitor_network.log
;stdout_logfile_maxbytes=1MB
stderr_logfile=/var/log/supervisor/monitor_network_err.log
stderr_logfile_maxbytes=1MB
```

- mkdir -p /var/log/supervisor

## 启动
- supervisord -c /etc/supervisor/supervisord.conf

## 3.3.2 版本存在漏洞，需要防火墙关闭9001端口，最新3.3.3已修复
