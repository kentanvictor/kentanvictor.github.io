---
title: "Android Custom Views"
description: "View Animation (tweened) Drawable Animation (frame-by-frame) Property Animation (new in Android 3.0)"
date: "2018-07-23T10:45:23"
tags: ["Android"]
legacy: true
hexoUrl: "/2018/07/23/Android自定义控件/"
---

### Types of Android animation
+ View Animation (tweened)
+ Drawable Animation (frame-by-frame)
+ Property Animation (new in Android 3.0)

#### View Animation
+ Tweened animation on a view. It only changes how the view is drawn; the actual property values do not change.
+ For example: if you animate a button to a new position, the area you actually click on stays where it was.
+ To define the animation in code, see the `AnimationSet` class and the subclasses of `Animation`.
+ If you use XML, you can define XML files in the res/anim/ folder.
+ Here is an example
```java
TranslateAnimation animation = new TranslateAnimation(0,iv_animation.getWidth(),0,iv_animation.getHight());
/*
iv_animation is the id of the image to move
The TranslateAnimation constructor moves the image from 0 (its original position) by the image's width (iv_animation.getWidth);
the vertical movement works the same way
*/
animation.setDuration(3000);//set the duration
animation.setFillAfter(true);//keep the view where it ends instead of resetting it
iv_animation.startAnimation(animation);//start moving
```

#### Drawable Animation
+ Loads a series of Drawable resources to create an animation. This traditional kind of animation is basically a sequence of images played in order, like a film reel.
+ To define the frames in code, use the `AnimationDrawable` class.
+ XML makes it easier to put frames together: in the `res/drawable` folder, use `<animation-list>` with `<item>` elements to define each frame.
+ Note: it seems the only property you can set is the interval between frames.

#### Property Animation
+ Besides traditional view objects, the animated target can be any Object. After the animation, the Object's property values really have changed.
+ Property Animation animates a view by changing the view object's actual properties.
+ Whenever a view property changes, the view automatically calls invalidate() to refresh.
+ Here is an example
```java
ObjectAnimator animator = ObjectAnimator.ofFloat(iv_animation,"translationX",0,iv_animation.getWidth());
/*
Use ObjectAnimator.ofFloat to translate
ofFloat(target, "how to move, e.g. horizontally -> translationX", start position, distance);
*/
ObjectAnimator animator2 = ObjectAnimator.ofFloat(iv_animation,"translationY",0,iv_animation.getHight());
AnimatorSet animatorSet = new AnimatorSet();
AnimatorSet.setDuration(2000);
AnimatorSet.setInterpolator(new BounceInterpolator());
//play both animations together
animatorSet.playTogether(animator,animator2);
//start playing
animatorSet.start();
```
+ Another way to write it
```java
iv_animation.animate()
            .translationXBy(iv_animation.getWidth())
            .translationYBy(iv_animation.getHight())
            .setDuration(2000)
            .setInterpolator(new BounceInterpolator())
            .start();
```
### ViewPager (banner effect)
+ Using ViewPager
+ Basic features of a banner
+ Extending ViewPager
+ Turning it into an onboarding screen

#### Using ViewPager
+ First: define `android.support.v4.view.ViewPager` in the layout file
+ Second: instantiate the ViewPager in code
+ Third: prepare the data
+ Fourth: set the adapter (PagerAdapter) - item - layout - bind the data
