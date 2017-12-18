# pip 国内源
阿里云 http://mirrors.aliyun.com/pypi/simple/

中国科技大学 https://pypi.mirrors.ustc.edu.cn/simple/

豆瓣(douban) http://pypi.douban.com/simple/

清华大学 https://pypi.tuna.tsinghua.edu.cn/simple/

中国科学技术大学 http://pypi.mirrors.ustc.edu.cn/simple/

# 指定源
直接 -i 加 url 即可！如下：
pip install web.py -i http://pypi.douban.com/simple --trusted-host pypi.douban.com


如果想配置成默认的源，方法如下：

需要创建或修改配置文件（一般都是创建），

linux的文件在~/.pip/pip.conf，

windows在%HOMEPATH%\pip\pip.ini），

修改内容为：
```
[global]
index-url = http://pypi.douban.com/simple
[install]
trusted-host=pypi.douban.com
```

临时使用其他源安装软件包的python脚本如下：
```
#!/usr/bin/python

import os

package = raw_input("Please input the package which you want to install!\n")
command = "pip install %s -i http://pypi.mirrors.ustc.edu.cn/simple --trusted-host pypi.mirrors.ustc.edu.cn" % package
os.system(command)
```
