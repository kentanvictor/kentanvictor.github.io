---
title: "Ubuntu+Windows Dual System Installation Guide"
description: "A note before we start: I am very grateful to Linux Discovery Tour for the installation guide that got me started. I followed that tutorial to install a dual-boot system, and it…"
date: "2020-05-05T22:54:18"
tags: ["Linux"]
legacy: true
hexoUrl: "/2020/05/05/Ubuntu-Windows双系统安装指南/"
---

>A note before we start: I am very grateful to [Linux Discovery Tour](https://www.jianshu.com/c/01390ac22fa9) for the installation guide that got me started. I followed that tutorial to install a dual-boot system, and it took me nearly a month. Along the way I even broke Windows... so I reinstalled everything, and now I can use Ubuntu and Windows side by side reliably.

---

- [The difference between Windows and Linux](#the-difference-between-windows-and-linux)
   - [Philosophy](#philosophy)
   - [Distribution](#distribution)
   - [Kernel API](#kernel-api)
- [Installing Ubuntu](#installing-ubuntu)
   - [Download](#download)
   - [Write the USB drive](#write-the-usb-drive)
   - [Install from USB](#install-from-usb)

---

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
