---
title: "Git"
description: "Git是目前世界上最先进的分布式版本控制系统。"
date: "2018-07-23T10:45:46"
tags: ["Git"]
legacy: true
hexoUrl: "/2018/07/23/Git/"
---

## Git是什么？
* Git是目前世界上最先进的分布式版本控制系统。

## SVN(Subversion)和Git有什么区别？
* SVN是集中式版本控制系统，版本库集中存放在中央服务器上。所以干活的时候，必须先从中央服务器下载最新的版本；干完活之后，还得再推送回中央服务器，非常不方便。而且集中式版本控制系统必须联网才能工作。
##### 就像这张图这样

![](https://github.com/kentanvictor/STUDY/blob/Image/old_image/subversion.png?raw=true)

* Git是分布式版本控制系统，它的优点在于没有中央版本库，每台电脑上都是一个完整的版本库，因此不联网也可以工作。
##### 就像这张图这样

![](https://github.com/kentanvictor/STUDY/blob/Image/old_image/git.png?raw=true)

## 一些常用的命令：
* mkdir: XX （创建一个空目录）/*XX指目录名*/
* pwd: （显示当前目录的路径）
* git: init （把当前目录变成Git可以管理的仓库，会生成一个隐藏文件）
* git add XX （把XX文件添加到暂存区）
* git commit -m "XX" （提交并添加说明）/*XX是说明内容*/
* git status （查看仓库状态）
* git log （查看历史记录）
* git diff XX （查看XX文件修改了哪些内容）
* git rm XX （删除XX文件）
* cat XX （查看文件内容）
* git checkout -b A （创建A分支并切换到A分支）
* git checkout master （切回master分支）
* git clone HTTPS （从远程仓库克隆）
* git branch name （创建一个分支）
* git branch -d A （删除A分支）
* git push origin master （把master分支推送到远程仓库）
# 如何使用Git Bash
## 新建
当需要上传一个项目到Github时，这个时候你需要在自己的Github上新建一个项目
New repository
然后在右下角有一个Clone or download
点击之后有一个Clone with HTTPS
Use Git or checkout with SVN using the web URL.
复制地址之后
在需要上传的项目文件中
右键，点击Git Bash Here之后
先输入 git clone + 地址
会出现一个项目名称的文件夹
里面有隐藏文件.git与ReadMe.md
将具有项目名称的文件夹中的全部内容剪切到需要上传的项目的根目录下
之后在Git Bash中输入
git add .
然后在本地执行提交操作
git commit -m "//在这里面输入你的内容，比如：First commit."
最后将提交的内容同步到远程版本库，也就是GitHub上面：
git push origin master
## 更新
当需要更新已经上传的项目时
直接在已经写好的更新过的项目中
右键，点击Git Bash Here
然后在命令行中输入
git pull + 地址
上传跟新过之后，需要在命令行中输入
git add .
之后的步骤又是重复着之前的了
然后在本地执行提交操作
git commit -m "//在这里面输入你的内容，比如：First commit."
最后将提交的内容同步到远程版本库，也就是Github上面：
git push origin master
