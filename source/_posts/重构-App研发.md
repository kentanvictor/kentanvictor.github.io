---
title: 重构-App研发
title_en: Refactoring - App Development
date: 2020-09-28 22:33:35
tags: Android
categories: Android
---

{% zh %}
# 重构，夜未眠

## 为Activity定义新的生命周期

重点：`单一职责`->一个类或者方法，只做一件事情
{% endzh %}

{% en %}
# Refactoring, Sleepless Nights

## Defining a new lifecycle for Activity

Key point: `single responsibility` -> a class or a method should do only one thing
{% enden %}

<!--more-->

{% zh %}
### 重构一：

+ 原来的代码结构：

```java

public class LoginActivity extends Activity implements View.onClickListener{
    @Override
    protected void onCreate(Bundle saveInstanceState){
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        Bundle bundle = getIntent().getExtras();
        String strEmail = bundle.getString(AppConstants.Email);

        etEmail = (EditText) findViewById(R.id.email);
        etEmail.setText(strEmail);
        etPassword = (EditText) findViewById(R.id.password);

        //登录事件
        Button btnLogin = (Button) findViewById(R.id.sign_in_button);
        btnLogin.setOnClickListener(this);

        //获取2个MobileAPI，获取天气数据，获取城市数据
        loadWeatherData();
        loadCityData();
    }
}

```

从上面的Oncreate()方法中，可以看出，需要做的事情太多了，其实可以简化成三块：

+ initVariables

+ initViews

+ loadData

代码如下：

```java

public abstract class BaseActivity extends Activity{
    @Override
    protected void onCreate(Bundle saveInstanceState){
        super.onCreate(savedInstanceState);

        initVariables();
        initViews(savedInstanceState);
        loadData();
    }

    protected abstract void initVariables();
    protected abstract void initViews(Bundle savedInstanceState);
    protected abstract void loadData();
}

```

### 重构二：

一般的，对点击事件的监听方式可以有以下两种：

+ 第一种：

```java

public class LoginActivity extends Activity implements View.OnClickListener{

    @Override
    protected void onCreate(Bundle savedInstanceState){
        //省略代码

        Button btnLogin = (Button)findViewById(R.id.sign_in_button);
        btnLogin.setOnClickListener(this);
    }

    @Override
    public void onClick(View v){
        switch(v.getId()){
            case R.id.sign_in_button:
                Intent intent = new Intent(LoginActivity.this,PersonCenterActivity.class);
                startActivity(intent);
        }
    }
}

```

+ 第二种：

```java

//登录事件
btnLogin = (Button) findViewById(R.id.sign_in_button);
btnLogin.setOnClickListener(new View.OnClickListener{
    @Override
    public void onClick(View v){
        getoLoginActivity();
    }
});

```

书中更推荐使用`第二种`方式进行实现，其给出的原因是：

第二种相比较于第一种：
+ 直接在btnLogin这个按钮对象上增加点击事件，是面向对象的写法。
+ 将onClick方面的实现，封装成一个gotoLoginActivity方法。

## 实体化编程
{% endzh %}

{% en %}
### Refactoring 1:

+ The original code:

```java

public class LoginActivity extends Activity implements View.onClickListener{
    @Override
    protected void onCreate(Bundle saveInstanceState){
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        Bundle bundle = getIntent().getExtras();
        String strEmail = bundle.getString(AppConstants.Email);

        etEmail = (EditText) findViewById(R.id.email);
        etEmail.setText(strEmail);
        etPassword = (EditText) findViewById(R.id.password);

        //Login event
        Button btnLogin = (Button) findViewById(R.id.sign_in_button);
        btnLogin.setOnClickListener(this);

        //Call 2 MobileAPIs: fetch weather data and fetch city data
        loadWeatherData();
        loadCityData();
    }
}

```

The onCreate() method above clearly does too many things. It can be simplified into three parts:

+ initVariables

+ initViews

+ loadData

The code:

```java

public abstract class BaseActivity extends Activity{
    @Override
    protected void onCreate(Bundle saveInstanceState){
        super.onCreate(savedInstanceState);

        initVariables();
        initViews(savedInstanceState);
        loadData();
    }

    protected abstract void initVariables();
    protected abstract void initViews(Bundle savedInstanceState);
    protected abstract void loadData();
}

```

### Refactoring 2:

There are generally two ways to listen for click events:

+ Option 1:

```java

public class LoginActivity extends Activity implements View.OnClickListener{

    @Override
    protected void onCreate(Bundle savedInstanceState){
        //Code omitted

        Button btnLogin = (Button)findViewById(R.id.sign_in_button);
        btnLogin.setOnClickListener(this);
    }

    @Override
    public void onClick(View v){
        switch(v.getId()){
            case R.id.sign_in_button:
                Intent intent = new Intent(LoginActivity.this,PersonCenterActivity.class);
                startActivity(intent);
        }
    }
}

```

+ Option 2:

```java

//Login event
btnLogin = (Button) findViewById(R.id.sign_in_button);
btnLogin.setOnClickListener(new View.OnClickListener{
    @Override
    public void onClick(View v){
        getoLoginActivity();
    }
});

```

The book recommends `option 2`, for these reasons.

Compared with option 1, option 2:
+ Adds the click listener directly on the btnLogin button object, which is the object-oriented way to write it.
+ Wraps the onClick logic in its own gotoLoginActivity method.

## Entity-based programming
{% enden %}
