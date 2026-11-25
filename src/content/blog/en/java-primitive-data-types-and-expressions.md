---
title: "Java Primitive Data Types and Expressions"
description: "1.Java has 8 primitive data types: 1) Integer: int (32 bits) 2) Byte: byte (256 integers from -128 to 127, 8 bits) 3) Short integer: short (16 bits) 4) Long integer: long (64 bits)"
date: "2020-05-12T20:41:51"
tags: ["Java"]
legacy: true
hexoUrl: "/2020/05/12/Java原生数据类型/"
---

## Primitive data types

+ 1.Java has 8 primitive data types:

  + 1) Integer: `int` (32 bits)
  
  + 2) Byte: `byte` (256 integers from -128 to 127, 8 bits)
  
  + 3) Short integer: `short` (16 bits)
  
  + 4) Long integer: `long` (64 bits)

+ 5) Single-precision floating point: `float`. Floating-point numbers are decimals, also called real numbers, such as 1.2.
  
  + 6) Double-precision floating point: `double`. A double covers a larger range than a float.
  
  + 7) Character: `char` (short for character). A char holds a single character, such as the letter a or the Chinese character 张, wrapped in single quotes. For example: char a = 'B'; char b = '张';
  
  + 8) Boolean: `boolean`. A boolean has only two possible values: true and false.
  

+ 2.In Java, every floating-point literal is a double by default. You cannot assign a double value to a float variable, even if the value is within the range of float. In short, whether an assignment compiles depends on whether the type of the value on the right matches the type of the variable on the left.

+ 3.How do you assign a double value to a float variable? (1) Use a cast to convert the double value to float. (2) Use the language's own support (for example, the `f` suffix on literals).

`Cast syntax: type variableName = (type) value;`

+ 4.A variable must be assigned before it is used; it must be declared with a type before it is used; and it must be defined before use, and only once.

+ 5.The following code does not compile:

```Java
int a = 1; short b = a;
```

a is an int and b is a short. int covers a larger range than short, and you cannot assign a value of a wider type
to a variable of a narrower type.

+ 6.The following code compiles:

```Java
short a = 1; int b = a;
```

a is a short and b is an int. int covers a larger range than short, so you can assign a value of a narrower type
to a variable of a wider type.

+ 7.Summary: you can assign a value of a narrower type to a variable of a wider type, but you cannot directly assign a value of a wider type to a variable of a narrower type. That only works with a cast.

## Expressions

> Java uses `infix expressions`, which work just like expressions in mathematics.

**Notes:**

+ In `basic arithmetic`, the result has the same data type as the operands.

+ '+', '-', '*' and '/' are all overloaded.

+ Among the `logical operators`, '!' has the highest precedence, then '&&', and finally '||'.

+ Operators with the same precedence are evaluated from left to right.

+ In `type conversion`, if no information is lost, a value is automatically promoted to a higher-ranked type, provided the operation involves an operand of that higher type. When converting to a lower type, the value is **truncated**, not rounded.
