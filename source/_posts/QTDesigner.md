---
title: QTDesigner
title_en: Qt Designer
date: 2018-07-22 12:11:59
tags: QT
categories: QT
---

{% zh %}
## QT的安装

+ 对于QT的安装，个人的推荐是参考[QT5.7+VS2015安装教程](http://blog.csdn.net/liang19890820/article/details/53931813)。这个教程写的很详细，而且也非常的nice。
{% endzh %}

{% en %}
## Installing Qt

+ For installing Qt, I recommend following this [Qt 5.7 + VS2015 installation guide](http://blog.csdn.net/liang19890820/article/details/53931813) (in Chinese). It is very detailed and really helpful.
{% enden %}

<!--more-->

{% zh %}
## QT在VS2015中的使用

+ 现在我们正式在VS2015中去使用QT，使用前，先需要创建一个QT的项目。

+ 使用VS2015中文件——>新建——>项目。点击之后，会出现如下界面：

![](https://github.com/kentanvictor/STUDY/blob/Image/old_image/QTCreate.png?raw=true)

+ 模板选择VisualC++下的Qt，选择QT GUI Application，上方的.NET Framework直接选择默认即可。
+ 选择之后点击下一步，会出现如下界面：

![](https://github.com/kentanvictor/STUDY/blob/Image/old_image/QT1.png?raw=true)

+ 点击next之后会出现如下界面：

![](https://github.com/kentanvictor/STUDY/blob/Image/old_image/QT2.png?raw=true)
**这里根据需要可以自己选择，如果是新手可以先直接下一步。**

+ 点击next之后会出现如下界面：

![](https://github.com/kentanvictor/STUDY/blob/Image/old_image/QT3.png?raw=true)
**这里默认直接finish就可以，如果有什么需要的可以自行设置。**

+ 当创建好之后就会出现如下画面：

![](https://github.com/kentanvictor/STUDY/blob/Image/old_image/QTFinish.png?raw=true)

+ 上面的画面就是我们需要进行操作的界面了。此时，`双击`QTTest.ui【位于:解决方案资源管理器->Form Files】
+ 双击进去之后就是我们需要进行ui设计的界面了（如下图所示）：

![](https://github.com/kentanvictor/STUDY/blob/Image/old_image/QTDesigner.png?raw=true)

+ 在这里，你可以进行控件的拖动，直接拖到方框中去，然后再对象查看器（如下图所示）可以看到你控件所对应的类以及生成的对象。

![](https://github.com/kentanvictor/STUDY/blob/Image/old_image/QTTest1.png?raw=true)

![](https://github.com/kentanvictor/STUDY/blob/Image/old_image/QTTest2.png?raw=true)

+ 创建好对象之后，点击左上角的文件->保存（Ctrl+S）
+ 然后关闭QT Designer，回到VS2015中，`右键QTTest.ui，选择编译（Ctrl+F7）`，如下图所示：

![](https://github.com/kentanvictor/STUDY/blob/Image/old_image/QTTest3.png?raw=true)

+ 编译成功之后（一般情况下都是会编译成功的），`双击打开QTTest.cpp`,里面的代码是这样的：

```
#include "QTTest.h"

QTTest::QTTest(QWidget *parent)
	: QMainWindow(parent)
{
	ui.setupUi(this);
}
```

+ 这个时候，在`ui.setupUi下输入ui.pushButton`即可获取到刚刚创建的button的实例。代码如下所示：

```
#include "QTTest.h"

QTTest::QTTest(QWidget *parent)
	: QMainWindow(parent)
{
	ui.setupUi(this);
	ui.pushButton;
}
```

+ **在QT中，控件与控件之间的数据传输是通过`信号与槽`的方式进行的，下面就演示其中一种的数据传输的方式：（代码如下：）**

```
#include "QTTest.h"

QTTest::QTTest(QWidget *parent)
	: QMainWindow(parent)
{
	ui.setupUi(this);
	connect(ui.pushButton, &QPushButton::clicked, [this] {
		ui.label->setText(ui.label->text().replace(QRegExp("\\d+"), "25"));
	});
}
```

+ 实现之后的效果为：

 + 未点击button之前：

 ![](https://github.com/kentanvictor/STUDY/blob/Image/old_image/ClickBefore.png?raw=true)

 + 点击button之后：

 ![](https://github.com/kentanvictor/STUDY/blob/Image/old_image/ClickAfter.png?raw=true)
{% endzh %}

{% en %}
## Using Qt in VS2015

+ Now let's actually use Qt in VS2015. First, we need to create a Qt project.

+ In VS2015, go to File -> New -> Project. You will see the following window:

![](https://github.com/kentanvictor/STUDY/blob/Image/old_image/QTCreate.png?raw=true)

+ Under the Visual C++ templates choose Qt, then select Qt GUI Application. Leave the .NET Framework option at the top as the default.
+ Click Next and you will see the following window:

![](https://github.com/kentanvictor/STUDY/blob/Image/old_image/QT1.png?raw=true)

+ After clicking Next, you will see:

![](https://github.com/kentanvictor/STUDY/blob/Image/old_image/QT2.png?raw=true)
**Pick whatever modules you need here. If you are a beginner, you can simply click Next.**

+ After clicking Next again, you will see:

![](https://github.com/kentanvictor/STUDY/blob/Image/old_image/QT3.png?raw=true)
**The defaults are fine here, so just click Finish. Change the settings if you need to.**

+ Once the project is created, you will see this:

![](https://github.com/kentanvictor/STUDY/blob/Image/old_image/QTFinish.png?raw=true)

+ This is the workspace we will operate in. Now `double-click` QTTest.ui (under Solution Explorer -> Form Files).
+ This opens the UI design view (shown below):

![](https://github.com/kentanvictor/STUDY/blob/Image/old_image/QTDesigner.png?raw=true)

+ Here you can drag widgets straight onto the form. In the Object Inspector (shown below) you can see the class of each widget and the object generated for it.

![](https://github.com/kentanvictor/STUDY/blob/Image/old_image/QTTest1.png?raw=true)

![](https://github.com/kentanvictor/STUDY/blob/Image/old_image/QTTest2.png?raw=true)

+ After creating the objects, click File -> Save (Ctrl+S) in the top-left corner.
+ Then close Qt Designer, go back to VS2015, and `right-click QTTest.ui and choose Compile (Ctrl+F7)`, as shown below:

![](https://github.com/kentanvictor/STUDY/blob/Image/old_image/QTTest3.png?raw=true)

+ Once it compiles (it normally does), `double-click QTTest.cpp`. The code inside looks like this:

```
#include "QTTest.h"

QTTest::QTTest(QWidget *parent)
	: QMainWindow(parent)
{
	ui.setupUi(this);
}
```

+ Now, `type ui.pushButton below ui.setupUi` to get the instance of the button you just created:

```
#include "QTTest.h"

QTTest::QTTest(QWidget *parent)
	: QMainWindow(parent)
{
	ui.setupUi(this);
	ui.pushButton;
}
```

+ **In Qt, widgets pass data to each other through `signals and slots`. Here is one way to do it:**

```
#include "QTTest.h"

QTTest::QTTest(QWidget *parent)
	: QMainWindow(parent)
{
	ui.setupUi(this);
	connect(ui.pushButton, &QPushButton::clicked, [this] {
		ui.label->setText(ui.label->text().replace(QRegExp("\\d+"), "25"));
	});
}
```

+ The result:

 + Before clicking the button:

 ![](https://github.com/kentanvictor/STUDY/blob/Image/old_image/ClickBefore.png?raw=true)

 + After clicking the button:

 ![](https://github.com/kentanvictor/STUDY/blob/Image/old_image/ClickAfter.png?raw=true)
{% enden %}
