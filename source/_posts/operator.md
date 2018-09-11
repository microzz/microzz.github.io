---
title: JS中一个运算符优先级问题引发的思考
date: 2017-03-25 19:32:46
tags:
  - JavaScript
  - JS
  - Boolean
---

# JavaScript中一个运算符优先级问题引发的思考

## 题目

> 假设 `val` 已经声明,可定义为任何值。则下面js代码有可能输出的结果为:

```javascript
console.log('Value is ' + (val != '0') ? 'define' : 'undefine');
```

A. _Value is define_
B. _Value is undefine_
C. _define_
D. _undefine_
E. _Value is define 或者 Value is undefine_
F. _define 或者 undefine_
G. _其它选项都有可能_


如果是你，你会选什么呢？

-------

可以说，大部分人都会在A、B、E中选择，以为重点在后面的三目运算符，前面字符串原样输出就是了。但是答案是 **C** 。

-------

## 分析

因为我们忽略了运算符的优先级。要知道，加号 `+` 优先级高于三目运算 `? :`，低于括号 `()`。不管 `(val != '0')` 的真假，`'Value is ' + (val != '0')` 是一个字符串并且转换成布尔值一定是 `true` ！

-------

下面我们来具体分析里面的每一部分。

先来看看括号里面的情况，题目已经说了：
> 假设 `val` 已经声明,可定义为任何值。

所以，`(val != '0')` 的值可以是 `true` 或者 `false` ，那么这个就涉及到JavaScript的一些隐式转换逻辑。

众所周知， 

```javascript
0 == '0'  // true
null == undefined  // true
false == '0'  // true
```

## 常用的隐式转换逻辑

```javascript
x+""  //等价于String（x）

+x  //等价于Number（x），也可以写成x-0

!!x  //等价于Boolean(x)
```

## 附录 - Javascript类型转换

| 值 | 转换为：字符串 | 数字 | 布尔值 | 对象 |
| :-: | :-: | :-: | :-: | :-: |
| undefined | "undefined" | NaN | false | throws TypeError |
| null | "null" | 0 | false | TypeError |
| true | "true" | 1 | new Boolean(true) |  |
| false | "false" | 0 | new Boolean(false) |  |
| ""空字符串 |   | 0 | false | new String(“”) |
| "1.2"（非空，数字） |   | 1.2 | true | new String(“1.2”) |
| "one"（非空，非数字） |  | NaN | true | new String(“one”) |
| 0 | "0" |  | false | Number(0) |
| -0 | "0" |  | false | Number(-0) |
| NaN | "NaN" |  | false | new Number(NaN) |
| Infinity | "Infinity" |  | true | new Number(Infinity) |
| -Infinity | "-Infinity" |  | true | new Number(-Infinity) |
| 1（无穷大，非零） |  "1"  |  | true | new Number(1) |
| {}（任意对象） |  |  | true |  |
| []（任意数组） | "" | 0 | true |  |
| [9]（1个数字对象） | "9" | 9 | true |  |
| ['a']（其他数组） | 使用join（）方法 | NaN | true |  |
| function（）｛｝（任意函数） |  | NaN | true  | | |

回到本题条件永远为真，并且只输出 `'define'`

## Boolean

还有一个需要注意的地方

下面程序的显示结果是？

```javascript
var x = new Boolean(false);
if (x) {
  alert('hi');
}
var y = Boolean(0);
if (y) {
  alert('hello'); 
}
```
x为Boolean对象，在if语句里的判断为true，虽然x的值为false，但是作为对象，if会直接判断为true。y为Boolean值，在if里的判断就是false值。所以会显示 `'hi'`。


