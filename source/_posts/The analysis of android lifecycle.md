---
title: The analysis of android lifecycle
date: 2018-09-04 22：11：30
tags: Android
categories: Android
---



# The analysis of android lifecycle
* The lifecycle of activity is divided into two parts
 * Typical lifecycle
 >During normal user use, the lifecycle of Android activity will change

 * Lifecycle under abnormal conditions
 >Refers to the activity being recycled by the system or the activity being destroyed and rebuilt due to the current device Configuration change

 <!--more-->

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