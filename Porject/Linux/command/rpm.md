# rpm

RPM 命令详细介绍
一、RPM介绍
1.什么是rpm ？
rpm 即RedHat Package Management，是RedHat的发明之一
2.为什么需要rpm ？
在一个操作系统下，需要安装实现各种功能的软件包。这些软件包一般都有各自的程序,
但是同时也有错综复杂的依赖关系。同时还需要解决软件包的版本，以及安装，配置，
卸载的自动化问题。为了解决这些问题，RedHat针对自己的系统提出了一个较好的办法
来管理成千上万的软件。这就是RPM管理系统。在系统中安装了rpm管理系统以后，
只要是符合rpm文件标准的打包程序都可以方便地安装、升级、卸载。
3.是不是所有的linux都使用rpm ？
任何系统都需要包管理系统，因此很多linux都使用rpm系统。 rpm系统是Redhat Linux和Fedora Core的软件包管理器，但是Mandriva、SuSE等Linux发行版也都使用rpm。由于rpm的源程序可以在别的系统上进行编译，所以有可能在别的系统上也使用rpm。除rpm
其他一些系统也有自己的软件包管理程序， 例如 debian的deb包。
4.rpm包的文件名为什么那么长 ？
rpm包的文件名中包含了这个软件包的版本信息，操作系统信息，硬件要求等等。
比如mypackage-1.1-2RH.i386.rpm，其中mypackage是在系统中登记的软件包的名字,1.1
是软件的版本号，2是发行号，RH表示用于RH操作系统。i386表示用于intel x86平台。
5.软件包文件名中的i386,i686是什么意思
rpm软件包的文件名中，不仅包含了软件名称，版本信息，还包括了适用的硬件架构的信息。
i386指这个软件包适用于intel 80386以上的x86架构的计算机(AI32)
i686指这个软件包适用于intel 80686以上(奔腾pro以上)的x86架构的计算机(IA32)
noarch指这个软件包与硬件架构无关，可以通用。
i686软件包通常针对CPU进行了优化，现在通常配置的机器都可以使用i686软件包。
6.不同操作系统发行的rpm包可否混用？
对于已经编译成二进制的rpm包，由于操作系统环境不同，一般不能混用。
对于以src.rpm发行的软件包，由于需要安装时进行本地编译，所以通常可以在不同系统下安装。
二、RPM包管理的用途
1、可以安装、删除、升级和管理以rpm包形式发布的软件；
2、可以查询某个rpm包中包含哪些文件，以及某个指定文件属于哪个rpm包；
3、可以在查询系统中的某个rpm包是否已安装以及其版本；
4、作为开发者可以把自己开发的软件打成rpm包发布；
5、依赖性的检查，查询安装某个rpm包时，需要哪些其它的rpm包。
注：RPM软件的安装、删除、更新只有root权限才能使用；
    对于查询功能任何用户都可以操作。
三、rpm 的一点简单用法
rpm的一般格式：
rpm [选项] [rpm软件包]
1、初始化rpm 数据库（可以省略）
rpm --initdb
rpm --rebuilddb  注：这个要花好长时间
注：有时rpm 系统出了问题，不能安装和查询，大多是这里出了问题。
2、RPM软件包管理的查询功能：
rpm -q [select-options] [query-options]
RPM的查询功能是极为强大，是极为重要的功能之一；这里举几个常用的例子，更为详细的具体的，请参考 man rpm
对系统中已安装软件的查询
1）查询系统已安装的软件
语法：rpm -q 软件名
例：rpm -q mplayer
-q就是 --query，此选项表示询问系统是不是安装了mplayer软件包；
如果已安装会有信息输出；如果没有安装，会输出mplayer没有安装的信息；
查看系统中所有已经安装的包，要加 -a 参数
rpm -qa
如果分页查看，再加一个管道 |和more命令
rpm -qa |more
如果要查找某个软件包，可以用 grep 抽取出来
rpm -qa |grep mplayer
2）查询一个已经安装的文件属于哪个软件包；
语法: rpm -qf 文件名
注：文件名所在的绝对路径要指出
例：rpm -qf /usr/lib/libacl.la
3）查询已安装软件包都安装到何处；
语法：rpm -ql 软件包名
例：rpm -ql mplayer
4）查询一个已安装软件包的信息
语法： rpm -qi 软件包名
例：rpm -qi mplayer
5）查看一下已安装软件的配置文件；
语法格式：rpm -qc 软件名
例：rpm -qc mplayer
6）查看一个已经安装软件的文档安装位置：
语法格式： rpm -qd 软件名
例：rpm -qd mplayer
7）查看一下已安装软件所依赖的软件包及文件；
语法格式： rpm -qR 软件名
例：rpm -qR mplayer
注：可以把几个参数组合起来用，如 rpm -qil mplayer
对于未安装的软件包的查看 :查看的前提是当前目录下已存在一个.rpm文件。
1）查看一个软件包的用途、版本等信息；
语法： rpm -qpi file.rpm
例：rpm -qpi mplayer-1.0pre7try2-2.i386.rpm
2）查看一件软件包所包含的文件；
语法： rpm -qpl file.rpm
例：rpm -qpl mplayer-1.0pre7try2-2.i386.rpm
3）查看软件包的文档所在的位置；
语法： rpm -qpd file.rpm
例：rpm -qpd mplayer-1.0pre7try2-2.i386.rpm
4）查看一个软件包的配置文件；
语法： rpm -qpc file.rpm
例：rpm -qpc mplayer-1.0pre7try2-2.i386.rpm
5）查看一个软件包的依赖关系
语法： rpm -qpR file.rpm
例：rpm -qpR mplayer-1.0pre7try2-2.i386.rpm
3、软件包的安装、升级、删除等； 安装和升级一个rpm 包
语法：
  rpm -ivh file.rpm   这个是用来安装一个新的rpm 包
  rpm -Uvh file.rpm   这是用来升级一个rpm 包
如果有依赖关系的，需解决依赖关系。
如果找不到依赖关系的包，可以用下面的命令强制安装：
  rpm -ivh --nodeps --force file.rpm
  rpm -Uvh --nodeps --force file.rpm
例：
rpm -ivh --test mplayer-1.0pre7try2-2.i386.rpm
 --test表示测试，并不真正安装。
rpm -ivh --relocate /=/usr/local/mplayer mplayer-1.0pre7try2-2.i386.rpm
为软件包指定安装目录：要加 --relocate 参数
安装在指定目录中的程序如何调用呢？
通常可执行程序都放在安装目录下的bin或者sbin目录中。
删除一个rpm 包
首先查出需要删除的rpm包，然后用下面的命令来卸载：
rpm -e 软件包名
例：rpm -e mplayer    卸载mplayer
如果有其它的rpm依赖于该rpm包，系统会出现警告。
%如果一定要卸载，可以用选项 --nodeps 忽略依赖关系。但最好不要这么做。
四、RPM管理包管理器支持网络安装和查询
rpm  [选项]  rpm包的http或者ftp的地址
比如我们想通过163的开源镜像查询、安装软件包。
查询
rpm -qpi http://mirrors.163.com/centos/5.5/os/i386/CentOS/samba-3.0.33-3.28.el5.i386.rpm
安装
rpm -ivh http://mirrors.163.com/centos/5.5/os/i386/CentOS/samba-3.0.33-3.28.el5.i386.rpm
五、对已安装rpm包查询的一点补充
可以用 locate来查询一些软件的安装位置,可能需要先运行updatedb来更新已安装软件库
六、从rpm软件包抽取文件
mkdir xxx
cd xxx
rpm2cpio ../xxx.rpm | cpio -ivduc
