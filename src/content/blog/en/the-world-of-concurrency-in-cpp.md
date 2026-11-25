---
title: "The World of Concurrency in C++"
description: "Main topics: What are concurrency and multithreading? Why use concurrency and multithreading? How do we use concurrency and multithreading?"
date: "2020-07-15T23:33:29"
tags: ["C&C++"]
legacy: true
hexoUrl: "/2020/07/15/C++并发的世界/"
---

Main topics:
+ What are concurrency and multithreading?
+ Why use concurrency and multithreading?
+ How do we use concurrency and multithreading?

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
