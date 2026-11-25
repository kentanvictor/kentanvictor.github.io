---
title: Ubuntu+Windows双系统安装指南
title_en: Ubuntu+Windows Dual System Installation Guide
date: 2020-05-05 22:54:18
tags: Linux
categories: Linux
---

{% zh %}
# Ubuntu+Windows双系统安装指南

>写在前面：非常感谢[Linux探索之旅](https://www.jianshu.com/c/01390ac22fa9)在最初的时候给我的安装教程的指南，自己按照这篇教程安装双系统折腾了将近一个月，期间更是将Windows也给装炸了。。。于是乎重装系统，直到现在可以稳定的使用Ubuntu和Windows双系统。

---

- [Windows和Linux的区别](#Windows和Linux的区别)
  - [观念](#观念)
  - [发布](#发布)
  - [内核API](#内核API)
- [Ubuntu系统安装](#Ubuntu系统安装)
  - [下载](#下载)
  - [烧录](#烧录)
  - [使用USB方式进行安装](#使用USB方式进行安装)

---
{% endzh %}

{% en %}
# Ubuntu+Windows dual system installation guide

>A note before we start: I am very grateful to [Linux Discovery Tour](https://www.jianshu.com/c/01390ac22fa9) for the installation guide that got me started. I followed that tutorial to install a dual-boot system, and it took me nearly a month. Along the way I even broke Windows... so I reinstalled everything, and now I can use Ubuntu and Windows side by side reliably.

---

- [The difference between Windows and Linux](#The-difference-between-Windows-and-Linux)
   - [Philosophy](#Philosophy)
   - [Distribution](#Distribution)
   - [Kernel API](#Kernel-API)
- [Installing Ubuntu](#Installing-Ubuntu)
   - [Download](#Download)
   - [Write the USB drive](#Write-the-USB-drive)
   - [Install from USB](#Install-from-USB)

---
{% enden %}

<!--more-->

{% zh %}
## Windows 和 Linux 的区别

对于 Windows 和 Linux 的区别，我在这里先使用一张直观的图让大家看一下。

![内核区别](https://github.com/kentanvictor/STUDY/blob/Image/Unix_Windows.jpg?raw=true)

从上图中可以看到，Linux 与苹果的 Mac OS 是基于 Unix 系统下的操作系统，而 Windows 是基于MS-DOS的操作系统。下面的几个部分的内容，将分析 Windows 和 Linux 系统的区别。

### 观念

商业模式与开源运作：

众所周知，Windows 是一款商业级的操作系统，它的源代码是保密的，这也就导致想要看到Windows的源代码变成了一件十分困难的事情。这使得微软授权过的《WINDOWS INTERNALS》一书变得十分的畅销，因为这里面涉及到了部分 Windows 操作系统内部的构建细节。

相对于 Linux 来说，Linux 是开源的,代码随时可见. 这对刚从 Windows 世界转过来的我是十分震撼的. 虽然我一直都知道这个事实, 但是当你发现了以前需要用尽各种方法,采用各种手段才可以得到只言片语的信息现在完全呈献在你面前的时候,你才能真正体会开源确实是一件伟大的工程。

### 发布

2进制与源代码：

这里所指的2进制与源代码是集中在两者操作系统中在安装程序中的不同之处。

在 Windows 世界，安装程序几乎全部都是以二进制形式发布的。也就是说，用户下载了一个程序，然后双击，一路 next 就可以了。这个方法很适合初学者。

在 Linux 世界也有类似的机制，比如 YUM , APT-GET 等。不过 YUM 和 APT-GET 都是比较晚才出现的，在那之前，在 Linux 世界安装程序要更麻烦些。

### 内核API

固定与非固定：

 Windows 内核有一套固定的 API ，而且向后兼容。这使得 Windows 驱动的开发人员在不同版本之间移植时变得很容易。

而 Linux 没有固定的内核API。2.4版本的内核模块在2.6几乎很大可能是不能兼容的。

- 下面展示的是基于开源的 Linux 所分化出来的不同的分支系统。

![Linux分支](https://github.com/kentanvictor/STUDY/blob/Image/LinuxBranch.jpg?raw=true)

---

## Ubuntu系统安装

### 下载

Ubuntu的英文下载页面：[Ubuntu](http://www.ubuntu.com/download)

Ubuntu的中文下载页面：[Ubuntu国内官网](https://cn.ubuntu.com/)

优麒麟的下载页面：[优麒麟](http://www.ubuntukylin.com/downloads/)

在这里，能够下载到的最新版本是18.04.2LTS(Long Term Support)版本。
![Ubuntu18.04下载](https://github.com/kentanvictor/STUDY/blob/Image/UbuntuDownLoad.png?raw=true)

### 烧录

在电脑中插入一个空白的U盘（不空白也行，反正之后要格式化的），大小至少8GB。

Universal USB Installer：[下载](https://www.pendrivelinux.com/universal-usb-installer-easy-as-1-2-3/)

下载好Universal USB Installer之后，打开它，在"Device"下拉菜单中选择你的U盘。然后点击创建。`对于右侧NTFS格式和Fat32格式，个人建议选择FAT32。`

![选择ISOs和Drive](https://github.com/kentanvictor/STUDY/blob/Image/Universal_Installer.png?raw=true)


### 使用USB方式进行安装

>前提：你需要先进入你的Boot Menu中，选择USB Storage Device。如下图所示：
![USB Storage Device](https://github.com/kentanvictor/STUDY/blob/Image/USB_Storage_Device.jpg?raw=true)
>
>如果发现没有USB Storage Device，那么选择Setup进入BIOS，或者重启按F2进入BIOS。切换到Boot，选择Secure Boot Control回车，改成Disabled，USB Boot Support设置成Enabled，Boot Mode改成Legacy。如下图所示：
>
>![Secure Boot Control](https://github.com/kentanvictor/STUDY/blob/Image/SecureBootControl.jpg?raw=true)

在进入到下图所示界面的时候（pure EFI Boot），这里就出现了一个坑。

![EFIBoot](https://github.com/kentanvictor/STUDY/blob/Image/EFIBoot.jpg?raw=true)

在这个时候，可以选择第一项，你可以先体验一下Ubuntu，也可不体验，直接Install Ubuntu。但是，在具有`独立显卡`的笔记本或者是台式机上，你会发现界面是能够进去的，但是很快就会卡死。这是因为独立显卡与Ubuntu的集成显卡不兼容所产生的问题。

这个时候，你需要再次回到pure EFI Boot界面，然后在`按E`进入到如图所示的界面：

![UbuntuNoModeSet](https://github.com/kentanvictor/STUDY/blob/Image/UbuntuNoModeSet.jpg?raw=true)

将原本`quiet splash`后面的内容修改为`nomodeset`。然后再`按F10`进入到安装界面安装即可。

在到 `安装类型` 这一步骤时，如果你在上一步压缩完分区后，没有新建简单卷（保持未分配状态），那么就只需选择 安装 Ubuntu，与 Windows boot manager 共存 这一选项，将分区相关事宜交由 Ubuntu 处理。
{% endzh %}

{% en %}
## The difference between Windows and Linux

To start, here is a picture that shows the difference between Windows and Linux at a glance.

![Kernel differences](https://github.com/kentanvictor/STUDY/blob/Image/Unix_Windows.jpg?raw=true)

As the picture shows, Linux and Apple's Mac OS are operating systems based on Unix, while Windows is based on MS-DOS. The following sections look at how Windows and Linux differ.

### Philosophy

Commercial model vs. open source:

As we all know, Windows is a commercial operating system and its source code is kept secret, which makes it very hard to see. That is why the Microsoft-authorized book *Windows Internals* sells so well: it covers some of the internal details of how Windows is built.

Linux, on the other hand, is open source, and its code is available to anyone at any time. Coming from the Windows world, this really amazed me. I had always known it, but only when the information you used to scrape together in bits and pieces, by every means possible, is suddenly laid out in front of you do you truly appreciate what a great undertaking open source is.

### Distribution

Binaries vs. source code:

Binaries vs. source code here refers to how the two operating systems differ in the way programs are installed.

In the Windows world, almost every program is distributed as a binary. The user downloads a program, double-clicks it and keeps clicking Next. This suits beginners well.

The Linux world has similar mechanisms, such as YUM and APT-GET. But YUM and APT-GET came along fairly late. Before them, installing programs on Linux was more troublesome.

### Kernel API

Stable vs. unstable:

 The Windows kernel has a stable API that stays backward compatible. This makes it easy for Windows driver developers to port drivers between versions.

Linux has no stable kernel API. A kernel module written for 2.4 is very likely to be incompatible with 2.6.

- Below are the different distributions that branched off from open-source Linux.

![Linux distributions](https://github.com/kentanvictor/STUDY/blob/Image/LinuxBranch.jpg?raw=true)

---

## Installing Ubuntu

### Download

Ubuntu download page (English): [Ubuntu](http://www.ubuntu.com/download)

Ubuntu download page (Chinese): [Ubuntu China official site](https://cn.ubuntu.com/)

Ubuntu Kylin download page: [Ubuntu Kylin](http://www.ubuntukylin.com/downloads/)

At the time of writing, the latest version available is 18.04.2 LTS (Long Term Support).
![Ubuntu 18.04 download](https://github.com/kentanvictor/STUDY/blob/Image/UbuntuDownLoad.png?raw=true)

### Write the USB drive

Plug an empty USB drive of at least 8GB into your computer (it does not have to be empty, since it will be formatted anyway).

Universal USB Installer: [Download](https://www.pendrivelinux.com/universal-usb-installer-easy-as-1-2-3/)

After downloading Universal USB Installer, open it and choose your USB drive from the "Device" drop-down menu. Then click Create. `For the NTFS or FAT32 option on the right, I recommend FAT32.`

![Choose the ISO and drive](https://github.com/kentanvictor/STUDY/blob/Image/Universal_Installer.png?raw=true)


### Install from USB

>Before you start: enter your Boot Menu and choose USB Storage Device, as shown below:
![USB Storage Device](https://github.com/kentanvictor/STUDY/blob/Image/USB_Storage_Device.jpg?raw=true)
>
>If there is no USB Storage Device option, choose Setup to enter the BIOS, or restart and press F2 to enter the BIOS. Go to Boot, select Secure Boot Control and press Enter, change it to Disabled, set USB Boot Support to Enabled, and change Boot Mode to Legacy, as shown below:
>
>![Secure Boot Control](https://github.com/kentanvictor/STUDY/blob/Image/SecureBootControl.jpg?raw=true)

When you reach the screen shown below (pure EFI Boot), there is a trap.

![EFIBoot](https://github.com/kentanvictor/STUDY/blob/Image/EFIBoot.jpg?raw=true)

Here you can choose the first option to try Ubuntu first, or skip that and go straight to Install Ubuntu. However, on a laptop or desktop with a `dedicated graphics card`, you will find that the screen loads but soon freezes. This happens because the dedicated graphics card is not compatible with Ubuntu's default graphics driver.

When this happens, go back to the pure EFI Boot screen and `press E` to open the screen shown below:

![UbuntuNoModeSet](https://github.com/kentanvictor/STUDY/blob/Image/UbuntuNoModeSet.jpg?raw=true)

Change what comes after `quiet splash` to `nomodeset`. Then `press F10` to enter the installer and install as usual.

When you reach the `Installation type` step, if you did not create a new simple volume after shrinking the partition in the previous step (leaving the space unallocated), simply choose the option to install Ubuntu alongside Windows Boot Manager and let Ubuntu take care of the partitioning.
{% enden %}
