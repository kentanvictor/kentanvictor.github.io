---
title: C++_正则表达式
title_en: C++ Regular Expressions
date: 2020-06-30 17:13:55
tags: C&C++
categories: C&C++
---

{% zh %}
# 正则表达式

正则表达式是一种字符串匹配的一种模式，可以用于检测一个字符串是否包含某串、将匹配的字符串进行替换或者从一个字符串中提取符合某个条件的的子串等等

`注：`在C++中使用正则表达式进行字符串操作的时候，需要添加头文件 `#include<regex>`
{% endzh %}

{% en %}
# Regular Expressions

A regular expression is a pattern for matching strings. You can use it to check whether a string contains a certain substring, to replace the matched parts, or to extract substrings that meet a condition, and so on.

`Note:` to work with regular expressions in C++, you need to include the header `#include<regex>`
{% enden %}

<!--more-->

{% zh %}
## 正则表达式中匹配的字符

### 特殊字符

| 特别字符 | 描述 |
|  ----  | ----  |
| $  | 匹配输入字符串的结尾位置 |
| ( )  | 标记一个子表达式的开始和结束位置 |
| * | 匹配前面的子表达式零次或多次 |
| + | 匹配前面的子表达式一次或多次 |


### 限定符

| 字符 | 描述 |
|  ----  | ----  |
| * | 匹配前面的子表达式零次或多次。例如，zo* 能匹配 "z" 以及 "zoo"。* 等价于{0,} |
| + | 匹配前面的子表达式一次或多次。例如，'zo+' 能匹配 "zo" 以及 "zoo"，但不能匹配 "z"。+ 等价于 {1,} |
| ? | 匹配前面的子表达式零次或一次。例如，"do(es)?" 可以匹配 "do" 、 "does" 中的 "does" 、 "doxy" 中的 "do" 。? 等价于 {0,1} |
| {n} | n 是一个非负整数。匹配确定的 n 次。例如，'o{2}' 不能匹配 "Bob" 中的 'o'，但是能匹配 "food" 中的两个 o |
| {n,} | n 是一个非负整数。至少匹配n 次。例如，'o{2,}' 不能匹配 "Bob" 中的 'o'，但能匹配 "foooood" 中的所有 o。'o{1,}' 等价于 'o+'。'o{0,}' 则等价于 'o*' |
| {n,m} | m 和 n 均为非负整数，其中n <= m。最少匹配 n 次且最多匹配 m 次。例如，"o{1,3}" 将匹配 "fooooood" 中的前三个 o。'o{0,1}' 等价于 'o?'。请注意在逗号和两个数之间不能有空格 |

## regex_match
+ match为全文匹配，要求整个字符串符合匹配规则。
+ 返回值为bool值，匹配成功返回1。
  
```C++
#include<iosteam>
#include<regrex>
using namespace std;
int main(){
    cout << regex_match("123", regex("\\d")) << endl;		//结果为0
    cout << regex_match("123", regex("\\d+")) << endl;		//结果为1
    return 0;
}
``` 

+ `\d`：匹配一个数字字符
+ `+` ：匹配一次或多次

regex_match函数还有一种重载方式：regex_match(str, result, pattern)。示例如下所示：
```C++
#include<iosteam>
#include<regrex>
using namespace std;
int main(){
    string str = "Hello_2018";
    smatch result;
    regex pattern("(.{5})_(\\d{4})");	//匹配5个任意单字符 + 下划线 + 4个数字

    if (regex_match(str, result, pattern))
    {
	    cout << result[0] << endl;		//完整匹配结果，Hello_2018
	    cout << result[1] << endl;		//第一组匹配的数据，Hello
	    cout << result[2] << endl;		//第二组匹配的数据，2018
	    cout<<"结果显示形式2"<<endl;
	    cout<< result.str() << endl;	//完整结果，Hello_2018
	    cout<< result.str(1) << endl;	//第一组匹配的数据，Hello
	    cout << result.str(2) << endl;	//第二组匹配的数据，2018
    }

    //遍历结果
    for (int i = 0; i < result.size(); ++i)
    {
	    cout << result[i] << endl;
    }
    return 0;
}

```

## regex_search

+ search是搜索匹配，即搜索字符串中存在符合规则的子字符串
具体例子如下所示：
```C++
#include<iosteam>
#include<regrex>
using namespace std;
int main(){
    string str = "Hello 2018, Bye 2017";
    smatch result;
    regex pattern("\\d{4}");	//匹配四个数字

    //迭代器声明
    string::const_iterator iterStart = str.begin();
    string::const_iterator iterEnd = str.end();
    string temp;
    while (regex_search(iterStart, iterEnd, result, pattern))
    {
	    temp = result[0];
	    cout << temp << " ";
	    iterStart = result[0].second;	//更新搜索起始位置,搜索剩下的字符串
    }
    return 0;
}


输出结果：2018 2017
```
## regex_replace

+ replace是替换匹配，即可以将符合匹配规则的子字符串替换为其他字符串
```C++
#include<iosteam>
#include<regrex>
using namespace std;
int main(){
    string str = "Hello_2018!";
    regex pattern("Hello");	
    cout << regex_replace(str, pattern, "") << endl;	//输出：_2018，将Hello替换为""
    cout << regex_replace(str, pattern, "Hi") << endl;	//输出：Hi_2018，将Hello替换为Hi
    return 0;
}

```

+ 除了直接替换以外，还有可以用来调整字符串内容（缩短、顺序等）

```C++
#include<iosteam>
#include<regrex>
using namespace std;
int main(){
    string str = "Hello_2018!";	
    regex pattern2("(.{3})(.{2})_(\\d{4})");				//匹配3个任意字符+2个任意字符+下划线+4个数字
    cout << regex_replace(str, pattern2, "$1$3") << endl;	//输出：Hel2018，将字符串替换为第一个和第三个表达式匹配的内容
    cout << regex_replace(str, pattern2, "$1$3$2") << endl;	//输出：Hel2018lo，交换位置顺序
    return 0;
}
```
`注：` $n用于表示第n组匹配数据
{% endzh %}

{% en %}
## Characters matched in regular expressions

### Special characters

| Special character | Description |
|  ----  | ----  |
| $  | Matches the end of the input string |
| ( )  | Marks the start and end of a subexpression |
| * | Matches the preceding subexpression zero or more times |
| + | Matches the preceding subexpression one or more times |


### Quantifiers

| Character | Description |
|  ----  | ----  |
| * | Matches the preceding subexpression zero or more times. For example, zo* matches "z" and "zoo". * is equivalent to {0,} |
| + | Matches the preceding subexpression one or more times. For example, 'zo+' matches "zo" and "zoo", but not "z". + is equivalent to {1,} |
| ? | Matches the preceding subexpression zero or one time. For example, "do(es)?" matches "do", the "does" in "does", and the "do" in "doxy". ? is equivalent to {0,1} |
| {n} | n is a non-negative integer. Matches exactly n times. For example, 'o{2}' does not match the 'o' in "Bob", but matches the two o's in "food" |
| {n,} | n is a non-negative integer. Matches at least n times. For example, 'o{2,}' does not match the 'o' in "Bob", but matches all the o's in "foooood". 'o{1,}' is equivalent to 'o+', and 'o{0,}' is equivalent to 'o*' |
| {n,m} | m and n are non-negative integers with n <= m. Matches at least n and at most m times. For example, "o{1,3}" matches the first three o's in "fooooood". 'o{0,1}' is equivalent to 'o?'. Note that there must be no spaces between the comma and the two numbers |

## regex_match
+ match is a full match: the whole string must match the pattern.
+ It returns a bool; a successful match returns 1.
  
```C++
#include<iosteam>
#include<regrex>
using namespace std;
int main(){
    cout << regex_match("123", regex("\\d")) << endl;		//result: 0
    cout << regex_match("123", regex("\\d+")) << endl;		//result: 1
    return 0;
}
``` 

+ `\d`: matches one digit
+ `+` : matches one or more times

regex_match has another overload: regex_match(str, result, pattern). For example:
```C++
#include<iosteam>
#include<regrex>
using namespace std;
int main(){
    string str = "Hello_2018";
    smatch result;
    regex pattern("(.{5})_(\\d{4})");	//matches any 5 characters + underscore + 4 digits

    if (regex_match(str, result, pattern))
    {
	    cout << result[0] << endl;		//full match, Hello_2018
	    cout << result[1] << endl;		//first group, Hello
	    cout << result[2] << endl;		//second group, 2018
	    cout<<"Another way to show the results"<<endl;
	    cout<< result.str() << endl;	//full match, Hello_2018
	    cout<< result.str(1) << endl;	//first group, Hello
	    cout << result.str(2) << endl;	//second group, 2018
    }

    //iterate over the results
    for (int i = 0; i < result.size(); ++i)
    {
	    cout << result[i] << endl;
    }
    return 0;
}

```

## regex_search

+ search looks for a match anywhere: it finds substrings in the string that match the pattern
For example:
```C++
#include<iosteam>
#include<regrex>
using namespace std;
int main(){
    string str = "Hello 2018, Bye 2017";
    smatch result;
    regex pattern("\\d{4}");	//matches four digits

    //declare the iterators
    string::const_iterator iterStart = str.begin();
    string::const_iterator iterEnd = str.end();
    string temp;
    while (regex_search(iterStart, iterEnd, result, pattern))
    {
	    temp = result[0];
	    cout << temp << " ";
	    iterStart = result[0].second;	//move the search start forward to search the rest of the string
    }
    return 0;
}


Output: 2018 2017
```
## regex_replace

+ replace substitutes matches: it replaces the substrings that match the pattern with another string
```C++
#include<iosteam>
#include<regrex>
using namespace std;
int main(){
    string str = "Hello_2018!";
    regex pattern("Hello");	
    cout << regex_replace(str, pattern, "") << endl;	//output: _2018, replaces Hello with ""
    cout << regex_replace(str, pattern, "Hi") << endl;	//output: Hi_2018, replaces Hello with Hi
    return 0;
}

```

+ Besides plain replacement, you can also use it to rearrange the string (shorten it, reorder it, etc.)

```C++
#include<iosteam>
#include<regrex>
using namespace std;
int main(){
    string str = "Hello_2018!";	
    regex pattern2("(.{3})(.{2})_(\\d{4})");				//matches 3 any characters + 2 any characters + underscore + 4 digits
    cout << regex_replace(str, pattern2, "$1$3") << endl;	//output: Hel2018, keeps only what groups 1 and 3 matched
    cout << regex_replace(str, pattern2, "$1$3$2") << endl;	//output: Hel2018lo, swaps the order
    return 0;
}
```
`Note:` $n refers to the n-th matched group
{% enden %}
