# **Markdown学习笔记**
####  作者：CK
##### *部分资料来源：*
&#8195;[认识与入门 Markdown](https://sspai.com/post/25137)

&#8195;[Markdown 语法说明 (简体中文版)](http://www.appinn.com/markdown/)

&#8195;[[简明版]有道云笔记Markdown指南](http://note.youdao.com/iyoudao/?p=2411&vendor=unsilent14)


### 一、排版

1.【行缩进】：

* 不断行的空白&\#160;

* 半方大的空白&\#8194;

* 全方大的空白&\#8195;

    > 效果：

    > ###&#160;### &\#160;

    > ###&#8194;### &\#8194;

    > ###&#8195;### &\#8195;


2.【换行】：

* Markdown换行：两个空格一个回车，或空一行达到换行效果。

3.【标题】：

* Markdown标题共有6级，随着#的增加字显示减小。
    > 写法效果：
    > # # 一级标题
    > ## ## 二级标题
    > ### ### 三级标题
    > #### #### 四级标题
    > ......

4.【字体】
* 粗体:使用前后各两个*包裹

    >写法: \*\*粗体\*\*  

    > **粗体**

* 斜体:使用前后各一个*包裹

    >写法: \*斜体\*

    > *斜体*

5.【引用】：
* 1.引用文字前加上 > 并与文字保留一个字符的空格

    > \> 引用

    > \>> 二级引用

* 2.使用 ` ` 包裹代码内容
    > \`Hello\`  `Hello`

* 3.使用至少4个空格或制表符缩进。

* 4.高亮\取消高亮
  * 指定语言

    > \`\`\`bash

    > 高亮内容

    > \`\`\`

    >> ```bash
    >> echo text
    >> ```

  * 取消高亮

    > \`\`\`nohighlight

    > 代码语法 ``` 书写

    > \`\`\`

    >> ```nohighlight
    >> echo text
    >> ```

* 5.列表里代码段：

    \`\`\`

    代码语法 ``` 书写

    \`\`\`

        或者直接空八个，引入代码块

6.【列表】：
* 无序列表：在文字前使用*、+、-用空格分隔。

    >写法: \* 无序列表1.1  

    > - 无序列表:
* 有序列表: 在文字前直接使用数字加.。
    > 1.有序列表

7.【插入图片、插入链接】：
* 插入链接：中括号括起来显示信息，小括号内填写链接地址
    > 写法:\[eailoo](www.eailoo.com)  

    >> [eailoo](www.eailoo.com)

    > 用方括号包起来，Markdown就会自动把它转成链接

    >> <https://www.eailoo.com>
* 插入图片：！开头，中括号括起来显示信息，小括号内填写链接地址
    > 写法: \![eailoo]\(http://www.eailoo.com/PIC/E.png)

   ![eailoo](http://www.eailoo.com/PIC/E.png)

9.【分割线】：
*  分割线：单独一行输入3个或以上的短横线、星号、下划线，短横线和星号之间可以输入任意空格。
    > \***
    >> * * *

    > \---
    >> ---

    > \_ _ _
    >> _ _ _

10.【表格】：

* 表格：使用 '|' 分隔列，第二行使用横线

		> 姓名|年龄|班级
		> :----:|:---:|:---
		> 张三|李四|王五

		> 姓名|年龄|班级
		> ----|----|----
		> 张三|李四|王五


姓名|年龄|班级
----|----|----
张三|李四|王五


11.【待办事项】：
* 待办事项：使用 - [x]

    > \- [x] aaa

    >>   \- [x] bbb

    >>   \- [x] ccc

- [x] aaa
    - [x] bbb
    - [x] ccc


12.【高效绘制 流程图、序列图、甘特图】：

详见&#8195;[[简明版]有道云笔记Markdown指南](http://note.youdao.com/iyoudao/?p=2411&vendor=unsilent14)

13.【注释】
  * 直接使用 html 注释兼容大部分 markdown 解析器. <!-- 注释 -->
  > <\!\-\- 注释 \-\-\>

# 【经验】
 1.如何快捷的使用github pages部署静态网页？  
 > 推荐使用atom，支持gitbub markdown预览，便捷提交。

 > 官方手册 <http://flight-manual.atom.io>

 - 使用atom markdown预览（有道云笔记也支持哦。）
 > 输入 markdown preview toggle(可以偷懒只输入mdpt，跟Sublime Text一样支持模糊匹配)

 > 输入快捷键 ctrl + shift + M

 - 如何上传？
  > 保存好修改后，输入快捷键 ctrl + 9，点击stage all，输入commit message，点击commit，点击上下箭头提交、合并。

 - 如何安装插件?
   1.菜单栏点击文件-设置-安装 搜索需要的插件。
    * 菜单栏找不到或消失怎么办？
      > 输入快捷键 alt + v 点击切换菜单栏

   2.国内可能安装会遇到问题，可以进入github下载插件放到C:\Users\Administrator\.atom\packages ,使用apm install 手动安装。
    * 如何找到.atom目录？
      * 点击菜单栏文件-设置-打开插件源码目录-右键点击show in explorer 找到.atom
    * apm install 由于网络问题失败怎么办?
      * 更换apm源。
      > apm config set registry npm_mirror_url
      > apm config set registry http://registry.npm.taobao.org

  - 推荐使用的插件？
    * atom-python-run
      > F5,F6 调试python脚本，避免windwos出现中文乱码问题。

    * autocomplete-python
      > python函数提示

    * atom-simplified-chinese-menu
      > 简体中文

    * activate-power-mode
      > 炫酷的输入体验。
  ![pic](https://i.github-camo.com/b1d03b9b7a9d7dc9a32d1eab307b5378f8c59a7b/68747470733a2f2f636c6f75642e67697468756275736572636f6e74656e742e636f6d2f6173736574732f3638383431352f31313631353536352f31306631363435362d396336352d313165352d386166342d3236356630316663383361302e676966)


 2.windwos写github上传上去后无法显示为正常markdown页面、乱码。
 > 创建的文件类型需要为LF或unix格式，编码为utf-8。
