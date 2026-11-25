---
title: Django服务器部署到腾讯云
title_en: Deploying a Django Server to Tencent Cloud
date: 2018-08-06 23:42:30
tags: 后端
categories: 后端
---

{% zh %}
# Django服务器部署到腾讯云
+ 配置腾讯云的服务器
{% endzh %}

{% en %}
# Deploying a Django Server to Tencent Cloud
+ Set up the Tencent Cloud server
{% enden %}

<!--more-->

{% zh %}
 + 配置的系统是Ubuntu Server 16.04.1 LTS 64位
 + 登录后界面如图：
  - ![](https://github.com/kentanvictor/STUDY/blob/Image/old_image/TencentServerLogin.png?raw=true)
  - 之后进行django的安装**注意版本号要和你在本地开发的一致**
  - 使用screen进行后台的django项目的运行。**注意runserver后设置：0.0.0.0:端口号**

+ 使用PyCharm进行远程连接腾讯云服务器
 + Tools-->Deployment-->config呈现下面的界面
  - ![](https://github.com/kentanvictor/STUDY/blob/Image/old_image/PyCharmAddServer.png?raw=true)
  -
  选择**sftp**
  - ![](https://github.com/kentanvictor/STUDY/blob/Image/old_image/PyCharmDeployment.png?raw=true)
  - 在这里设置你的IP地址，然后点击`Test SFTP connection`
  - ![](https://github.com/kentanvictor/STUDY/blob/Image/old_image/PyCharmTestConnection.png?raw=true)
  - 在这里设置你的`用户名`和`密码`**用户名与密码可以在腾讯云的更多中重置与设置**
  - 然后这个时候就连接上了
 + 此时，在你的PyCharm的右边，会出现服务器上的树目录结构(如图所示)
  - ![](https://github.com/kentanvictor/STUDY/blob/Image/old_image/PyCharmAdmin.png?raw=true)
  - 进入到home-->ubuntu下，在这里面，你具有权限，此时就可以将你的整个项目拖进去，然后在服务器端进入到项目中**创建screen后台**，运行**manage.py runserver 0.0.0.0:端口号**就可以使你的django一直保持运行的状态了。
{% endzh %}

{% en %}
 + The system I chose is Ubuntu Server 16.04.1 LTS 64-bit
 + After logging in, the screen looks like this:
  - ![](https://github.com/kentanvictor/STUDY/blob/Image/old_image/TencentServerLogin.png?raw=true)
  - Then install Django. **Make sure the version matches the one you use for local development.**
  - Use screen to keep the Django project running in the background. **Note: run runserver with 0.0.0.0:port**

+ Connect to the Tencent Cloud server remotely from PyCharm
 + Go to Tools --> Deployment --> Configuration, and you will see the window below
  - ![](https://github.com/kentanvictor/STUDY/blob/Image/old_image/PyCharmAddServer.png?raw=true)
  -
  Choose **SFTP**
  - ![](https://github.com/kentanvictor/STUDY/blob/Image/old_image/PyCharmDeployment.png?raw=true)
  - Enter your IP address here, then click `Test SFTP connection`
  - ![](https://github.com/kentanvictor/STUDY/blob/Image/old_image/PyCharmTestConnection.png?raw=true)
  - Enter your `username` and `password` here. **You can reset and set the username and password under "More" in the Tencent Cloud console.**
  - The connection is now established
 + Now the server's directory tree appears on the right side of PyCharm (as shown below)
  - ![](https://github.com/kentanvictor/STUDY/blob/Image/old_image/PyCharmAdmin.png?raw=true)
  - Go to home --> ubuntu. You have permissions here, so you can drag your whole project into this folder. Then, on the server, go into the project, **create a screen session**, and run **manage.py runserver 0.0.0.0:port**. Your Django site will keep running.
{% enden %}
