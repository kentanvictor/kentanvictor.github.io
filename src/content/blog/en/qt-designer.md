---
title: "Qt Designer"
description: "For installing Qt, I recommend following this Qt 5.7 + VS2015 installation guide (in Chinese). It is very detailed and really helpful."
date: "2018-07-22T12:11:59"
tags: ["Qt"]
legacy: true
hexoUrl: "/2018/07/22/QTDesigner/"
---

## Installing Qt

+ For installing Qt, I recommend following this [Qt 5.7 + VS2015 installation guide](http://blog.csdn.net/liang19890820/article/details/53931813) (in Chinese). It is very detailed and really helpful.

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
