---
title: "Android Interview Notes"
description: "This was the first interview of my life, and also my first online interview. Honestly, I was really nervous, and I knew I had not prepared enough, but I went ahead anyway. Call it…"
date: "2020-05-13T17:05:23"
tags: ["Android"]
legacy: true
hexoUrl: "/2020/05/13/字节跳动Android一面面经/"
---

## 2020-05-13 ByteDance, first-round interview

> This was the first interview of my life, and also my first online interview. Honestly, I was really nervous, and I knew I had not prepared enough, but I went ahead anyway. Call it a life experience. Below are the questions I was asked in the ByteDance first round. I list them first, then summarize the knowledge behind each one:
> + The concept of deadlock in operating systems
> + How deadlocks happen
> + Sorting: which sorting algorithms do you know, what are their time complexities, and what does "stability" mean for a sort
> + The difference between synchronized and Lock in Java
> + Two ways to implement the singleton pattern, and what to consider with multiple threads
> + The Android lifecycle
> + How the lifecycle changes when navigating between Activities
> + How Handler and Message pass messages between threads in Android
> + Coding question: in a sorted array, find the index of the first occurrence of a target value, e.g. in 111122223334455666, what is the index of the first 6? (No brute force allowed)

**Below is what I studied to prepare for the questions from the interview.**

### Deadlock

A state in which two or more processes are blocked forever, each waiting for the other.

`Main causes`:

+ Not enough system resources
+ Processes run in an invalid order

`Necessary conditions` for a deadlock:

+ 1. Mutual exclusion: a resource can only be used by one process at a time.
+ 2. No preemption: a resource a process holds cannot be forcibly taken away before the process is done with it.
+ 3. Hold and wait: a process that is blocked waiting for a resource keeps holding the resources it already has.
+ 4. Circular wait: several processes form a cycle, each waiting for a resource held by the next.

`Note:` all four conditions are required. A deadlock can only happen when every one of them holds.

So to resolve a deadlock, you only need to break one of these four conditions.

`Solutions`:

+ Break mutual exclusion: allow processes to access some resources at the same time. This depends on the actual scenario, so it is not recommended.
  
+ Break no preemption: allow a process to forcibly take some resources from the process holding them. Put simply: a process that holds resources cannot request others; it must release what it holds before it can request again. Again, it is hard to find a scenario where this fits.
  
+ A process must acquire all its resources before it runs; otherwise it cannot enter the ready state. Drawback: low resource utilization and low concurrency.
  
+ Avoid circular requests: classify and number the resources in advance, and allocate them in order of their numbers. Pros: effectively improves resource utilization and system throughput. Cons: adds system overhead and makes processes hold resources for longer.

`Ways to remove a deadlock`:

+ Restart the system. That is far too costly...

+ Kill processes and take back their resources. Terminate the processes involved in the deadlock and reclaim their resources. There are two ways to do this:
  
  + Kill all the deadlocked processes at once and reclaim all their resources.
  + Kill the deadlocked processes one by one and gradually reclaim the resources they hold.

+ Process rollback: roll the deadlocked processes back to a point before the deadlock happened and continue from there, hoping the deadlock does not happen again.

### synchronized and Lock in detail

#### synchronized

**Purpose:** achieves synchronization through a locking mechanism.

`Properties of the locking mechanism:`

Mutual exclusion: only one thread may hold a given object lock at a time. This is often called atomicity of an operation.

Visibility: changes made to shared variables before the lock is released must be visible to the next thread that acquires the lock (that is, a thread acquiring the lock must see the latest values of the shared variables). Otherwise the other thread might keep working on a stale local copy and cause inconsistencies.

##### Object locks and class locks

+ Object lock: in Java, every object has a monitor, which is the lock of that Java object, also called the intrinsic lock or object lock. Every object has its own independent intrinsic lock, and they do not interfere with each other.

+ Class lock: every class has one class lock.

##### How to use synchronized

+ By what it modifies:
  + A code block
  + A method

+ By which lock it acquires:
  + Acquire an object lock
  + Acquire a class lock

#### synchronized usage in detail




### Sorting algorithms
