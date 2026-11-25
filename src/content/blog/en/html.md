---
title: "HTML"
description: "The basic page skeleton"
date: "2018-08-19T11:52:34"
tags: ["Frontend"]
legacy: true
hexoUrl: "/2018/08/19/HTML/"
---

* The basic page skeleton

```html
<html>
 <head>
 <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
 <!--The title below is the name shown on the browser tab-->
 <title></title>
 </head>
 <body>
   <!--Put what you want to display in here-->
 </body>
</html>
```
* < p >paragraph text< /p >

**Each < p > is one paragraph. Use it to insert paragraph text.**
****
* < hx >heading text< /hx > (x is 1~6)

**The x in hx is the heading size: h1 is the largest and h6 the smallest.**
****
* < em >italic tag< /em >
* < strong >bold tag< /strong >

**Both tags mark text that needs emphasis. They just display the emphasis in different styles, and you can combine the two.**

****
* < span >tag< /span >

**The < span > tag has no meaning of its own. It exists so you can give something its own style, like a custom CSS hook.**
>* aqua: aqua
* black: black
* blue: blue
* fuchsia: fuchsia
* gray: gray
* green: green
* lime: lime
* maroon: maroon
* navy: navy
* olive: olive
* purple: purple
* red: red
* silver: silver
* teal: teal
* white: white
* yellow: yellow

>***For any other color, use a hexadecimal color value.***

**The < em >< /em > and < strong >< /strong > tags highlight the key part of a sentence; their meaning is emphasis.**

**< strong >< /strong > is used the same way as < b >< /b >; its meaning is emphasis.**

****

* The < q > tag, for short quotations
```html
<q>quoted text</q>
```

**When you quote what someone said, you would normally mark it with double quotes, but in HTML you should use < q >< /q > instead.**

**Text quoted this way does not need **double quotes**, because the browser adds them to q tags automatically.**

>Before adding < q >, the browser only sees some text with double quotes in it.
 >>After adding < q >, the browser knows this is a quotation.
 >>>If the browser has its own enhancements (such as enlarging and bolding quotations for older readers), or if you style it in CSS, this starts to matter.

****
* < blockquote >< /blockquote >
>Used for quoting long passages. This tag is rendered with an **indented style**.

**How it differs from < q >< /q > above: first, it is for long quotations; second, it does not add double quotes automatically, but it is indented (< q >< /q > is not indented).**

****
* The < br > tag breaks text onto a new line
>A < br >< /br > works like pressing Enter: it starts a new line.<br/>
><em><strong>This means that pressing Enter or typing spaces in HTML code has no effect. To start a new line in HTML text, you must use < br ></strong></em><br/>
><em><strong>while < pre >< /pre > keeps the spaces and line breaks in the text</strong></em>

****
* Typing & n b s p; displays a space in HTML
****
* Typing < hr/ > adds a horizontal line
****
* The < address > tag adds address information to a page
>Pages often need to show the site's contact information, such as a company address. Use the < address > tag for this. It can also mark an address (such as an email address), a signature, or the author of a document.
****
* Use < code >< /code > to add code
><em><strong>This stops the browser from treating the code as something to execute. With the tag, the browser will not run it.<br/><strong>It only works for a single line of code. For multiple lines, use < pre > instead of < code ></strong>
****
* Use < ul > to add a list of news items
>Template:
```html
<ul>
      <li>item</li>
      <li>item</li>
      <li>item</li>
  ……
</ul>
```
****
* Use < ol > to add a numbered list
><strong>The difference from the one above is that this list is numbered, while the one above only has bullet points</strong><br/>
```html
<ol>
   <li>item</li>
   <li>item</li>
   ......
</ol>
```
****
* What the < div >< /div > tag does for layout
>Think of an HTML page as a home, and each div as a small room in it. A room on its own does not do much, but a home has to be divided into rooms before it can come to life. How each room is decorated is up to you, and the decorating is the job of CSS.
****
* Writing tables with the table tag
>The following code creates a table:
```html
<!DOCTYPE HTML>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Getting to know the table tag</title>
</head>
<body>
<table>
  <tbody>
    <tr>
      <th>Class</th>
      <th>Students</th>
      <th>Average score</th>
    </tr>
    <tr>
      <td>Class 1</td>
      <td>30</td>
      <td>89</td>
    </tr>
    <tr>
      <td>Class 2</td>
      <td>35</td>
      <td>85</td>
    </tr>
<tr>
<td>Class 3</td>
<td>32</td>
<td>80</td>
</tr>
  </tbody>
</table>
</body>
</html>
```
The code above produces a table like this:

![table](https://github.com/kentanvictor/STUDY/blob/Image/old_image/table.png?raw=true)
****
* <h3>You can add a CSS style to change how the table looks</h3>
```html
<title>Add borders to a table</title>
<style type="text/css">
table tr td,th{border:2px solid #342;}
</style>
```
****
* summary and caption add a summary and a title
><strong>< table summary="summary text"></strong><br/>
>The summary above works like a comment in HTML. It is meant for programmers, so they do not edit the wrong table when there are many.<br/>
><strong>< caption >title text< /caption ></strong><br/>
>This adds a title (caption) to the table
****
* Hyperlinks with the < a > tag
>Usage
```html
<a href="target URL" title="text shown on hover">link text</a>
```
><em>href: short for Hypertext Reference.</em><br/>
>The title attribute: its text appears when the mouse hovers over the link.<br/>
><em><strong>Note: once text is wrapped in an a tag, it automatically turns blue (and purple after it has been clicked)</strong></em>
