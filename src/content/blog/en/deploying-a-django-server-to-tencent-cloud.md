---
title: "Deploying a Django Server to Tencent Cloud"
description: "Set up the Tencent Cloud server"
date: "2018-08-06T23:42:30"
tags: ["Backend"]
legacy: true
hexoUrl: "/2018/08/06/Django服务器部署/"
---

+ Set up the Tencent Cloud server

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
