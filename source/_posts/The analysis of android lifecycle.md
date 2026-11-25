---
title: Android生命周期的分析
title_en: The analysis of android lifecycle
date: 2018-09-04 22:11:30
tags: Android
categories: Android
---

{% zh %}
# activity的生命周期分析
* activity的生命周期分为两部分内容
 * 典型情况下的生命周期
 >在有用户参与的情况下，activity所经历过的生命周期的改变

 * 异常情况下的生命周期
 >指activity被系统回收或由于当前设备的Configuration发生改变从而导致activity被销毁重建
{% endzh %}

{% en %}
# The analysis of android lifecycle
* The lifecycle of activity is divided into two parts
 * Typical lifecycle
 >During normal user use, the lifecycle of Android activity will change

 * Lifecycle under abnormal conditions
 >Refers to the activity being recycled by the system or the activity being destroyed and rebuilt due to the current device Configuration change
{% enden %}

<!--more-->

{% zh %}
## 典型情况下的生命周期分析

### 正常生命周期解析

正常情况下，activity会经历如下生命周期

+ onCreate：表示activity正在被创建。

>+ 这是生命周期的第一个方法、在这个方法中，我们可以做一些初始化工作，比如调用setContentView去加载界面布局资源、初始化activity所需要的数据等等
>+ 通过覆盖onCreate(Bundle)方法，activity可以预处理以下UI相关工作：
>+ 实例化组件并将它们放置到屏幕上(调用setContentView(int)方法)
>+ 引用已实例化的组件
>+ 为组件设置监听器以处理用户交互
>+ 访问外部模型数据
* onRestart：表示activity正在启动。
>一般情况下，当当前的activity从不可见重新变为可见的状态时，onRestart就会被调用。**这种情况一般都是用户导致的，当用户按Home键切换到桌面的或者用户打开了一个新的activity，这时当前的activity就会暂停，也就是onPause和onStop被执行，接着用户又回到了这个activity，就会出现这种情况**
* onStart：表示activity正在被启动，即将开始。
>这时activity已经可见了，但是还没有出现在前台，还无法和用户交互。这个时候其实可以理解为activity已经显示出来了，但是我们还看不到
* onResume：表示activity已经可见了，并且出现在前台并开始活动。
>要注意这个和onStart的对比，onStart和onResume都表示activity已经可见，但是onStart的时候activity还在后台，onResume的时候activity才显示到前台。
* onPause：表示activity正在停止，正常情况下，紧接着onStop就会被调用。
>在特殊情况下， 如果这个时候快速地再回到当前activity，那么onResume会被调用。可以理解为这种属于极端的情况，用户操作很难重现这种场景。此时可以做一些存储数据、停止动画等工作，但是注意不能太耗时，因为这会影响到新的activity的显示，onPause必须先执行完，新activity的onPause才会执行。
* onStop：表示activity即将停止，可以做一些稍微重量级的回收工作，同样不能太耗时。
* onDestroy：表示activity即将被销毁。
>这是activity生命周期中的最后的一个回调，在这里，我们可以做一些回收工作和最终的资源释放。

![](https://github.com/kentanvictor/STUDY/blob/Image/old_image/activity.png?raw=true)


`注：`

+ 当一个**activity**第一次启动时，回调程序如下：onCreate()->onStart()->onResume()
+ 用户打开**新的activity**或**切回桌面**时，回调如下：onPause()->onStop()
+ 用户**重新回到原activity**，回调如下；onRestart()->onStart()->onResume()
+ **back键**回退时，回调如下：onPause()->onStop()->onDestroy()
  
`从整个生命周期来说：`onCreate()与onDestroy()配对。

`从activity是否可见来说：`onStart()与onStop()配对。

`从activity是否前台来说：`onResume()和onPause()配对。

*****

`问题：`假设当前是activity A，如果用户这个时候打开一个activity B，那么是B的onResume()先执行还是A的onPause()先执行？

`结论：`旧的activity中onPause()先调用，新的activity中的onResume()才被执行。

## 异常情况下的生命周期分析

### 资源相关的系统配置发生变化导致activity被杀死进行重建

>默认情况下，如果我们不对activity进行特殊处理，那么当系统配置或资源发生变化的时候，activity就会被销毁并重建。如：旋转手机屏幕等。

`注：`
+ activity被异常杀死重建，activity中onPause()、onStop()、onDestroy()都会被调用。
+ 系统会调用 **onSaveInstanceState()** 方法对当前activity的状态进行保存，调用位置位于onStop()之前，**时序与onPause()无关**。
+ 从时序上来说，**onRestoreInstanceState()** 是在onStart()之后。

示例图如图所示：
![](https://github.com/kentanvictor/STUDY/blob/Image/Android%E5%BC%80%E5%8F%91%E6%8E%A2%E7%B4%A2/%E5%BC%82%E5%B8%B8%E6%83%85%E5%86%B5%E4%B8%8Bactivity%E9%87%8D%E5%BB%BA%E8%BF%87%E7%A8%8B.png?raw=true)

+ 在通过onSaveInstanceState和onRestoreInstanceState中进行数据传递时，接收onSaveInstanceState传递过来的参数可以有两个位置：1、onRestoreInstanceState；2、onCreate
  + `注意：`onCreate如果是正常启动的话，**其参数 Bundle savedInstanceState 为 null，** 需要判断 savedInstanceState 是否为空。

### 资源内存不足导致低优先级activity被杀死

>Activity优先级情况，从高到低可分为：

+ 前台activity——正在和用户交互的activity——优先级最高
+ 可见但非前台activity——比如弹出一个Dialog导致activity可见但不可交互
+ 后台activity——已被暂停的activity——优先级最低
{% endzh %}

{% en %}
## Lifecycle Analysis in Typical Scenarios

### Normal life cycle analysis

Under normal circumstances, an activity will go through the following life cycle

+ onCreate: Indicates that the activity is being created.

>+ This is the first method of the life cycle. In this method, we can do some initialization work, such as calling setContentView to load interface layout resources, initialize the data required by activity, etc.
>+ By overriding the onCreate(Bundle) method, the activity can preprocess the following UI related work:
>+ Instantiate components and place them on screen (call setContentView(int) method)
>+ reference to the instantiated component
>+ Set up listeners for components to handle user interactions
>+ access external model data
* onRestart: Indicates that the activity is starting.
>In general, onRestart is called when the current activity is changed from invisible to visible again. **This situation is generally caused by the user. When the user presses the Home button to switch to the desktop or the user opens a new activity, the current activity will be paused, that is, onPause and onStop are executed, and then the user restarts. Back to this activity, this will happen**
* onStart: Indicates that the activity is being started and is about to start.
>At this time, the activity is already visible, but it has not yet appeared in the foreground and cannot interact with the user. At this time, it can actually be understood that the activity has been displayed, but we can't see it yet
* onResume: Indicates that the activity is already visible, and appears in the foreground and starts the activity.
> Pay attention to the contrast between this and onStart. Both onStart and onResume indicate that the activity is already visible, but the activity is still in the background when onStart, and the activity is displayed in the foreground when onResume.
* onPause: Indicates that the activity is being stopped. Under normal circumstances, onStop will be called immediately.
> In special cases, if you quickly return to the current activity at this time, then onResume will be called. It can be understood that this is an extreme situation, and it is difficult for user operations to reproduce this scenario. At this time, you can do some work such as storing data, stopping animation, etc., but be careful not to take too long, because this will affect the display of the new activity, onPause must be executed first, and the onPause of the new activity will be executed.
* onStop: Indicates that the activity is about to stop, you can do some heavyweight recycling work, and it can't be too time-consuming.
* onDestroy: Indicates that the activity is about to be destroyed.
> This is the last callback in the activity's life cycle, where we can do some recycling and final resource release.

![](https://github.com/kentanvictor/STUDY/blob/Image/old_image/activity.png?raw=true)


`Note:`

+ When an **activity** starts for the first time, the callback procedure is as follows: onCreate()->onStart()->onResume()
+ When the user opens a **new activity** or **switches back to the desktop**, the callback is as follows: onPause()->onStop()
+ The user **returns to the original activity**, the callback is as follows; onRestart()->onStart()->onResume()
+ **back key** When going back, the callback is as follows: onPause()->onStop()->onDestroy()
  
`From the whole life cycle: `onCreate() is paired with onDestroy().

`In terms of whether the activity is visible: `onStart() is paired with onStop().

`From whether the activity is in the foreground: `onResume() and onPause() are paired.

*****

`Question: `Assuming that it is currently activity A, if the user opens an activity B at this time, is B's onResume() executed first or A's onPause() executed first?

`Conclusion:`OnPause() in the old activity is called first, and onResume() in the new activity is executed.

## Lifecycle Analysis in Exceptional Situations

### Resource-related system configuration changes cause the activity to be killed and rebuilt

> By default, if we don't do special handling of the activity, then when the system configuration or resources change, the activity will be destroyed and rebuilt. Such as: rotating the phone screen, etc.

`Note:`
+ The activity is killed and rebuilt abnormally, and onPause(), onStop(), and onDestroy() in the activity will be called.
+ The system will call the **onSaveInstanceState()** method to save the state of the current activity. The calling position is before onStop(), **sequence has nothing to do with onPause()**.
+ In terms of timing, **onRestoreInstanceState()** is after onStart().

An example diagram is shown in the figure:
![](https://github.com/kentanvictor/STUDY/blob/Image/Android%E5%BC%80%E5%8F%91%E6%8E%A2%E7%B4%A2/%E5%BC%82%E5%B8%B8%E6%83%85%E5%86%B5%E4%B8%8Bactivity%E9%87%8D%E5%BB%BA%E8%BF%87%E7%A8%8B.png?raw=true)

+ When transferring data through onSaveInstanceState and onRestoreInstanceState, there are two locations for receiving parameters passed by onSaveInstanceState: 1. onRestoreInstanceState; 2. onCreate
   + `Note: If `onCreate is started normally, ** its parameter Bundle savedInstanceState is null, ** you need to judge whether savedInstanceState is empty.

### Insufficient resource memory causes low priority activity to be killed

>Activity priority situation, from high to low, can be divided into:

+ foreground activity - the activity that is interacting with the user - the highest priority
+ Visible but not foreground activity - such as popping up a Dialog causing the activity to be visible but not interactive
+ Background activity - suspended activity - lowest priority
{% enden %}
