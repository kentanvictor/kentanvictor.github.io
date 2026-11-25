---
title: C++并发的世界
title_en: The World of Concurrency in C++
date: 2020-07-15 23:33:29
tags: C&C++
categories: C&C++
---

{% zh %}
# C++的并发世界

主要内容：
+ 什么是并发和多线程？
+ 为什么用并发和多线程？
+ 如何用并发和多线程？
{% endzh %}

{% en %}
# The World of Concurrency in C++

Main topics:
+ What are concurrency and multithreading?
+ Why use concurrency and multithreading?
+ How do we use concurrency and multithreading?
{% enden %}

<!--more-->

{% zh %}
## 什么是并发？

两个或更多独立的活动同时进行。在计算机领域中表现为：**单个系统中同时执行多个独立的任务。**

### 单核任务切换VS多核硬件并发

+ 单核任务切换

![单核切换](https://github.com/kentanvictor/STUDY/blob/Image/C%2B%2B%E5%B9%B6%E5%8F%91%E7%BC%96%E7%A8%8B%E5%AE%9E%E6%88%98/%E5%8D%95%E6%A0%B8%E4%BB%BB%E5%8A%A1%E5%88%87%E6%8D%A2.png?raw=true)

+ 多核硬件并发

![多核硬件并发](https://github.com/kentanvictor/STUDY/blob/Image/C%2B%2B%E5%B9%B6%E5%8F%91%E7%BC%96%E7%A8%8B%E5%AE%9E%E6%88%98/%E5%A4%9A%E6%A0%B8%E7%A1%AC%E4%BB%B6%E5%B9%B6%E5%8F%91.png?raw=true)

### 多进程并发

独立进程可通过进程间常规的通信渠道传递信息（信号、套接字、文件、管道等等）。

缺点之一：运行进程所需的固定开销：需要时间启动进程，操作系统需要内部资源来管理进程等等。

独立进程实现并发的额外优势：可通过远程连接在不同的机器上运行独立的进程。

### 多线程并发

每个线程相互独立运行，并共享地址空间，因此线程可以通过共享内存进行通信。

**如果数据要被多个线程访问，那么必须保证每个线程所访问到的数据是一致的**
{% endzh %}

{% en %}
## What is concurrency?

Two or more independent activities happening at the same time. In computing, this means: **a single system performing multiple independent tasks at the same time.**

### Task switching on a single core vs. hardware concurrency on multiple cores

+ Task switching on a single core

![Single-core task switching](https://github.com/kentanvictor/STUDY/blob/Image/C%2B%2B%E5%B9%B6%E5%8F%91%E7%BC%96%E7%A8%8B%E5%AE%9E%E6%88%98/%E5%8D%95%E6%A0%B8%E4%BB%BB%E5%8A%A1%E5%88%87%E6%8D%A2.png?raw=true)

+ Hardware concurrency on multiple cores

![Multi-core hardware concurrency](https://github.com/kentanvictor/STUDY/blob/Image/C%2B%2B%E5%B9%B6%E5%8F%91%E7%BC%96%E7%A8%8B%E5%AE%9E%E6%88%98/%E5%A4%9A%E6%A0%B8%E7%A1%AC%E4%BB%B6%E5%B9%B6%E5%8F%91.png?raw=true)

### Concurrency with multiple processes

Separate processes can pass messages to each other through the usual inter-process communication channels (signals, sockets, files, pipes and so on).

One drawback: the fixed overhead of running a process. It takes time to start a process, and the operating system needs internal resources to manage it.

An extra advantage of using separate processes: you can run them on different machines connected over a network.

### Concurrency with multiple threads

Each thread runs independently, and all threads share the same address space, so threads can communicate through shared memory.

**If data is accessed by multiple threads, you must make sure that the data each thread sees is consistent.**
{% enden %}
