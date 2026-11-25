---
title: "C++ Regular Expressions"
description: "A regular expression is a pattern for matching strings. You can use it to check whether a string contains a certain substring, to replace the matched parts, or to extract…"
date: "2020-06-30T17:13:55"
tags: ["C&C++"]
legacy: true
hexoUrl: "/2020/06/30/C++正则表达式/"
---

A regular expression is a pattern for matching strings. You can use it to check whether a string contains a certain substring, to replace the matched parts, or to extract substrings that meet a condition, and so on.

`Note:` to work with regular expressions in C++, you need to include the header `#include<regex>`

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
