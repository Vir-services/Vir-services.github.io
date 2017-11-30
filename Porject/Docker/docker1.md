# 二、Docker概述

## 1、什么是docker

* 基于lxc（linux container）内核虚拟化技术的开源应用容器引擎。


## 2、docker 优点

*	持续集成
  > 轻量级容器对项目快速构建，环境打包，发布流程。

*	版本控制
  >	每个镜像就是一个版本，方便管理

*	可移植性
  >	可移动到任意一台docker主机上，不必关注底层系统

*	标准化
  >	环境，依赖，配置不变。

*	隔离性和安全
  > 进程间相互隔离，一个容器故障不会影响其他容器。		

* 性能
  -  资源占用少
  -  秒级启动
  -	 不需要考虑cpu是否支持虚拟化，容器共享宿主机内核。
  -	 没有hypervisor层开销，性能接近物理机。
    > 根据IBM发表的论文给出的数据进行分析。以下的数据均是在IBM x3650 M4服务器测得，其主要的硬件参数是：
    （1）2颗英特尔xeon E5-2655 处理器，主频2.4-3.0 GHz。每颗处理器有8个核，因此总共有16个核。
    （2）256 GB RAM.
    在测试中是通过运算Linpack程序来获得计算能力数据的。结果如下图所示：
    ![ibmshujutu](./pic/ibm.png)
    >  
图中从左往右分别是物理机、docker和虚拟机的计算能力数据。可见docker相对于物理机其计算能力几乎没有损耗，而虚拟机对比物理机则有着非常明显的损耗。虚拟机的计算能力损耗在50%左右。
为什么会有这么大的性能损耗呢？一方面是因为虚拟机增加了一层虚拟硬件层，运行在虚拟机上的应用程序在进行数值计算时是运行在Hypervisor虚拟的CPU上的；另外一方面是由于计算程序本身的特性导致的差异。虚拟机虚拟的cpu架构不同于实际cpu架构，数值计算程序一般针对特定的cpu架构有一定的优化措施，虚拟化使这些措施作废，甚至起到反效果。比如对于本次实验的平台，实际的CPU架构是2块物理CPU，每块CPU拥有16个核，共32个核，采用的是NUMA架构；而虚拟机则将CPU虚拟化成一块拥有32个核的CPU。这就导致了计算程序在进行计算时无法根据实际的CPU架构进行优化，大大减低了计算效率。

## 3、虚拟机和docker区别
- ![dockervsvm](./pic/dockervsvm.png)

* docker Engine :可以简单看成对Linux的NameSpace、Cgroup、镜像管理文件系统操作的封装。docker并没有和虚拟机一样利用一个完全独立的Guest OS实现环境隔离，它利用的是目前Linux内核本身支持的容器方式实现资源和环境隔离。简单的说，docker利用namespace实现系统环境的隔离；利用Cgroup实现资源限制；利用镜像实现根目录环境的隔离。

* Hypervisor: 虚拟机实现资源隔离的方法是利用独立的OS，并利用Hypervisor虚拟化CPU、内存、IO设备等实现的。例如，为了虚拟CPU，Hypervisor会为每个虚拟的CPU创建一个数据结构，模拟CPU的全部寄存器的值，在适当的时候跟踪并修改这些值。需要指出的是在大多数情况下，虚拟机软件代码是直接跑在硬件上的，而不需要Hypervisor介入。只有在一些权限高的请求下，Guest OS需要运行内核态修改CPU的寄存器数据，Hypervisor会介入，修改并维护虚拟的CPU状态。
Hypervisor虚拟化内存的方法是创建一个shadow page table。正常的情况下，一个page table可以用来实现从虚拟内存到物理内存的翻译。在虚拟化的情况下，由于所谓的物理内存仍然是虚拟的，因此shadow page table就要做到：虚拟内存->虚拟的物理内存->真正的物理内存。
对于IO设备虚拟化，当Hypervisor接到page fault，并发现实际上虚拟的物理内存地址对应的是一个I/O设备，Hypervisor就用软件模拟这个设备的工作情况，并返回。比如当CPU想要写磁盘时，Hypervisor就把相应的数据写到一个host OS的文件上，这个文件实际上就模拟了虚拟的磁盘。

* 结论：
> -  docker有着比虚拟机更少的抽象层。由于docker不需要Hypervisor实现硬件资源虚拟化，运行在docker容器上的程序直接使用的都是实际物理机的硬件资源。因此在CPU、内存利用率上docker将会在效率上有优势，具体的效率对比在下几个小节里给出。在IO设备虚拟化上，docker的镜像管理有多种方案，比如利用Aufs文件系统或者Device Mapper实现docker的文件管理，各种实现方案的效率略有不同。

  > - docker利用的是宿主机的内核，而不需要Guest OS。因此，当新建一个容器时，docker不需要和虚拟机一样重新加载一个操作系统内核。我们知道，引导、加载操作系统内核是一个比较费时费资源的过程，当新建一个虚拟机时，虚拟机软件需要加载Guest OS，这个新建过程是分钟级别的。而docker由于直接利用宿主机的操作系统，则省略了这个过程，因此新建一个docker容器只需要几秒钟。另外，现代操作系统是复杂的系统，在一台物理机上新增加一个操作系统的资源开销是比较大的，因此，docker对比虚拟机在资源消耗上也占有比较大的优势。事实上，在一台物理机上我们可以很容易建立成百上千的容器，而只能建立几个虚拟机。


## 4、docker架构

* c/s架构

* cgroups（control groups）
	> linux内核提供的进程资源限制机制

* namespace:
	> UTS:
		>> hostname

		>> domain

	> IPC:
		>> 信号

		>> 消息队列

		>> 共享内存		

	> PID：

	> network：
		>> ip

		>> port

	> mount：

	> user：
		>> 用户

		>> 用户组


* 文件系统：		

* docker所支持的文件系统有以下几种：Aufs、devicemapper、btrfs和Vfs，其中前三种是联合文件系统，可以支持分层，VFS 不支持分层。平时用的最多的是aufs 和devicemapper。		

* UFS：unionfs 联合文件系统，支持将不同位置的目录挂载到同一虚拟文件系统。形成一种分层模型：成员目录称为虚拟文件系统的一个分支（branch）

	> AUFS：advanced multi layered unification filesystem（ubuntu,debain）直译过来就是高级分层联合文件系统，做为一种Union FS ，它支持将不同的目录挂载到同一个虚拟文件系统下。AUFS又叫Another UnionFS，后来叫Alternative UnionFS，后来可能觉得不够霸气，叫成Advance UnionFS.把一张CD/DVD和一个硬盘目录给联合 mount在一起，然后，你就可以对这个只读的CD/DVD上的文件进行修改（修改的文件存于硬盘上的目录里）。image layers的内容都存储在Docker hosts filesystem的/var/lib/docker/aufs/diff目录下。而/var/lib/docker/aufs/layers目录则存储着image layer如何堆栈这些layer的metadata。

	> deviemapper	：（centos,fedora）可以从/sys/fs/aufs/si_[id]目录下查看aufs的mount的情况： 最高层读写，其他只读

```bash
			cat /sys/fs/aufs/si_b71b209f85ff8e75/*

			/var/lib/docker/aufs/diff/87315f1367e5703f599168d1e17528a0500bd2e2df7d2fe2aaf9595f3697dbd7=rw

			/var/lib/docker/aufs/diff/87315f1367e5703f599168d1e17528a0500bd2e2df7d2fe2aaf9595f3697dbd7-init=ro+wh

			/var/lib/docker/aufs/diff/d0955f21bf24f5bfffd32d2d0bb669d0564701c271bc3dfc64cfc5adfdec2d07=ro+wh

			/var/lib/docker/aufs/diff/9fec74352904baf5ab5237caa39a84b0af5c593dc7cc08839e2ba65193024507=ro+wh

			/var/lib/docker/aufs/diff/a1a958a248181c9aa6413848cd67646e5afb9797f1a3da5995c7a636f050f537=ro+wh

			/var/lib/docker/aufs/diff/f3c84ac3a0533f691c9fea4cc2ceaaf43baec22bf8d6a479e069f6d814be9b86=ro+wh

			/var/lib/docker/aufs/diff/511136ea3c5a64f264b78b5433614aec563103b4d4702f3ba7d4d2698e22c158=ro+wh
```


### 参考：
http://blog.csdn.net/cbl709/article/details/43955687

http://www.projectatomic.io/docs/filesystems/
