---
title: "Refactoring - App Development"
description: "Key point: single responsibility -> a class or a method should do only one thing"
date: "2020-09-28T22:33:35"
tags: ["Android"]
legacy: true
hexoUrl: "/2020/09/28/重构-App研发/"
---

## Defining a new lifecycle for Activity

Key point: `single responsibility` -> a class or a method should do only one thing

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
