# 三、docker 容器管理（常用命令篇）

``docker --help`` ：查看帮助
> [``man docker``](./man/dockerman.md)

## 1.获取docker镜像
> ``docker search [image name]``,搜索相关镜像。

>> 如果下载镜像速度慢，可以考虑更换源。

>> ``curl -sSL https://get.daocloud.io/daotools/set_mirror.sh |sh -s http://04be47cf.m.daocloud.io``

> ``docker pull [image name]``,下载指定镜像。

## 2.查看本地镜像
>  ``docker images``

## 3.创建|启动容器(docker create --help|docker run --help)
> [``man docker run``](./man/dockerrunman.md)

* docker create 创建后不会启动
> ``docker create [OPTIONS] IMAGE [COMMAND] [ARG...]``

* docker run 创建后启动容器
> ``docker run [OPTIONS] IMAGE [COMMAND] [ARG...]``


* OPTIONS 容器的常用参数 (docker create 和docker run 创建时参数相同。)

  - 数据持久化 ``-v``
    - 数据卷（将外部存储挂载到容器内。）
      - 相当于nfs挂载的效果,可以多容器共享使用。
    > ``docker run -v [image name]``

  > ``--name`` 指定容器名
    >> ``docker run --name myfirstdocker [image name] ``
  > ``-h （--hostname）`` 指定主机名
    >>
  > ``--net`` 指定网络

  > ``--ip`` 分配指定网络中的ip

  > ``-- restart on-failure=3`` 当容器停止时自动重启，重启3次。

  > ``--ulimit nproc=9999 nofile=9999``
    >> 用户打开最大进程数/最大打开文件数。




## 4.查看运行中容器
> ``docker ps -a``

## 5.查看所有运行中容器id
> ``docker ps -a -q``

## 6.删除镜像
> ``docker rmi [REPOSITORY|image id]``

## 7.删除容器
- 删除未运行容器。
> ``docker rm [CONTAINER ID|NAMES]``

- 删除运行中的容器
> ``docker rm -f [CONTAINER ID|NAMES]``
>> ``docker rm -f $(docker ps -a -q)``

## 8.进入容器
1.使用ssh登陆进容器
  - 需要在容器中启动sshd，存在开销和攻击面增大的问题。同时也违反了Docker所倡导
的一个容器一个进程的原则。

2.使用nsenter、nsinit等第三方工具。
 - 需要额外学习使用第三方工具。

3.``使用docker本身提供的工具(常用)``
  - ``docker attach [CONTAINER ID|NAMES]``
    - Docker attach可以attach到一个已经运行的容器的stdin，然后进行命令执行的动作。
但是需要注意的是，如果从这个stdin中exit，会导致容器的停止。
  - ``docker exec [CONTAINER ID|NAMES] [COMMAND]``
    - docker exec执行后，会命令执行返回值。
    > ``docker exec [CONTAINER ID|NAMES] [COMMAND]``

    - 关于-i、-t参数.
      - 只用-i时，由于没有分配伪终端，看起来像pipe执行一样。但是执行结果、命令.返回值都可以正确获取。
      - 如果只使用-t参数，则可以看到一个console窗口，但是执行命令会发现由于没有获得stdin 的输出，无法看到命令执行情况。
      -  使用-it时，则和我们平常操作console界面类似。而且也不会像attach方式因为退出，导致整个容器退出。这种方式可以替代ssh或者nsenter、nsinit方式，在容器内进行操作。
        - ``docker exec -it [CONTAINER ID|NAMES] [COMMAND]``相当于将容器执行效果反馈到当前终端。
    - 关于-d参数
      - 在后台执行一个进程。可以看出，如果一个命令需要长时间进程，使用-d参数会很快返回。 程序在后台运行。
      - 如果不使用-d参数，由于命令需要长时间执行，docker exec会卡住，一直等命令执行完成才返回。

## 9.退出容器
> ``ctrl+p --> ctrl+q``

> ``exit`` 会停止容器

## 10.显示更底层的容器或image信息
> ``docker inspect [CONTAINER ID|NAMES]``

- 显示实例ip：
  > ``sudo docker inspect --format='{{.NetworkSettings.IPAddress}}' $INSTANCE_ID``

- 列出绑定端口：
  > ``sudo docker inspect --format='{{range $p, $conf := .NetworkSettings.Ports}} {{$p}} -> {{(index $conf 0).HostPort}} {{end}}' $INSTANCE_ID``

- 获取特殊端口映射
  > ``sudo docker inspect --format='{{(index (index .NetworkSettings.Ports "8787/tcp") 0).HostPort}}' $INSTANCE_ID``

- 获取配置信息：
  > ``sudo docker inspect --format='{{json .config}}' $INSTANCE_ID``

## 11.docker网络管理
> ``docker network [options]``

>> ``docker network create [options]`` 创建网络

>> ``docker network create --subnet=192.168.100.0/24 network_192.168_100`` 创建名称为‘network_192.168_100’ 网络范围为192.168.100.0/24的网络。

>> ![docker network create](./pic/dockernetworkcreate.png)

>> ``docker network ls`` 查看网络

>> ``docker network connect [networkname] [CONTAINER ID|NAMES]`` 将容器加入到网络中

>> ``docker network disconnect [option](-f 强制) [networkname] [CONTAINER ID|NAMES]`` 将容器从网络中断开。

![docke network](./pic/dockernetwork.png)

## 12.docker拷贝
- 拷贝容器内的文件到宿主
> ``docker cp [CONTAINER ID|NAMES]:$path $path ``

- 拷贝宿主文件到容器中
> ``docker cp $path [CONTAINER ID|NAMES]:$path ``

## 13.docker对比
> ``docker diff [CONTAINER ID|NAMES]``

## 14.docker容器重命名
> ``docker rename [CONTAINER ID|NAMES]``

## 15.docker获取容器终端日志
> ``docker logs [CONTAINER ID|NAMES]``

## 16.docker动态获取容器负载情况
> ``docker top [CONTAINER ID|NAMES]``

## 17.docker动态获取容器性能使用情况
> ``docker status [CONTAINER ID |NAMES]``

## 18.docker获取映射端口信息
> ``docker port [CONTAINER ID|NAMES]``

## 19.更新docker资源和参数限制
> ``docker update [OPTIONS] [CONTAINER ID|NAMES]``
- ![docker update](./pic/dockerupdate.png)

## 20.docker整体事件日志
> ``docker events [OPTIONS] ``

- 事件过滤。

- 事件日志格式化输出

- ![docker events](./pic/dockerevent.png)
