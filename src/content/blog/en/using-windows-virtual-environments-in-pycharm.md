---
title: "Using Windows Virtual Environments in PyCharm"
description: "There are plenty of Anaconda installation tutorials online. Here is the link I followed when I installed it: Introduction, installation and usage of Anaconda (in Chinese)"
date: "2020-05-06T11:09:42"
tags: ["Python"]
legacy: true
hexoUrl: "/2020/05/06/Windows虚拟环境在PyCharm中的使用/"
---

> There are plenty of Anaconda installation tutorials online. Here is the link I followed when I installed it: [Introduction, installation and usage of Anaconda (in Chinese)](https://zhuanlan.zhihu.com/p/32925500)

## Creating a virtual environment in Anaconda (command line)

> How to create a virtual environment in Anaconda:
>
> The following creates an environment with python=3.6, named py36
>
> conda create -n py36 python=3.6
>
>Remove the environment
>
>conda remove -n py36 --all
>
>Activate the environment
>
>source activate py36
>
>Leave the environment
>
>source deactivate

+ While creating virtual environments I ran into a problem: `if I create environments for several Python versions, how do I manage the different packages installed in each, without conflicting with the Python already installed on my machine?`

+ Here is how I kept Anaconda and the machine's own Python apart:
>+ Solution 1:
>
>Python actually ships with a way to handle two versions when you install it.
>
>There is a py.exe in the windows folder on the C drive.
>
>Starting Python through py.exe lets you choose the version.
>
>To run pip for Python 2.7
>
>type this in the cmd window: py -2 -m pip install XXXX
>
>To run pip for Python 3.6
>
>type this in the cmd window: py -3 -m pip install XXXX
>
>+ Solution 2:
>
>Find where Python is installed on your machine (you can see it in Path), find your Python.exe file, and rename it.
>
>For example, I renamed my machine's Python to Python3 and left the Python installed by Anaconda as it was.
>
>Then, to install packages with pip for Anaconda's Python, type:
>
>python -m pip install XXX
>
>And to install packages for the machine's Python, type:
>
>python3 -m pip install XXX

+ How I fixed the conflict between a virtual environment and Anaconda's own Python after entering the environment:
>
>Using the activation command above, we can enter a virtual environment we have created.
>
>Once inside, type:
>
>python -V
>
>to see the Python version of the current virtual environment.
>
>Then type:
>
>pip list
>
>What you see are the packages installed by pip in the current environment.
>
>`If the list is still Anaconda's own list, type:`
>
>`python -m pip list`

## Creating a virtual environment in Anaconda (GUI)

`After installing Anaconda you get Anaconda Navigator. You can also create virtual environments inside it.`

![AnacondaMavigator](https://github.com/kentanvictor/STUDY/blob/Image/old_image/AnacondaNavigator.png?raw=true)


# PyCharm

+ In PyCharm, go to `Settings` -> `Project Interpreter` to choose the Python version.

+ Find the `installation path` of your `Anaconda`.

+ Inside it, find a folder called `envs`.

+ This folder contains all the virtual environments you have created.

+ Pick the virtual environment you want to use, and select its `python.exe`.
