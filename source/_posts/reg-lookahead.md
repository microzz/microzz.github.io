---
title: JS正则表达式之前瞻
date: 2017-05-22 22:08:21
tags:
  - JavaScript
  - 正则表达式
  - RegExp
---

# JavaScript正则表达式之前瞻

## 概念

&nbsp;&nbsp;&nbsp;&nbsp;正则表达式从文本头部向尾部开始解析，文本尾部称为“前”。
&nbsp;&nbsp;&nbsp;&nbsp;**前瞻**就是在正则表达式匹配到规则的时候，向前检查是否符合断言。后顾/后瞻方向相反。

`exp(?=assert)`：**正向前瞻** 
`exp(?!assert)`：**负向前瞻** 
`exp(?<=assert)`：**正向后顾** * 
`exp(?<!assert)`：**负向后顾** *

***JS不支持后顾。**

## 示例

```javascript
// 判断一个单词字符之后是否是数字（正向前瞻），
// 是的话，则符合匹配，进行替换
var str = "a2*3";
var reg = /\w(?=\d)/g;
str.replace(reg,"X"); //'X2*3'
```

```javascript
//判断一个单词字符之后是否是非数字（负向前瞻），
// 是的话，则符合匹配，进行替换
var str = "a2*3";
var reg = /\w(?!\d)/g;
str.replace(reg,"X"); // 'aX*X'
```

## About
GitHub: 👉https://github.com/microzz
个人网站: 👉https://microzz.com/

