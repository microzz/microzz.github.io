---
title: JS中的高阶函数和偏函数
date: 2017-03-05 19:49:42
tags:
  - JS
  - JavaScript
  - 函数
---

# JS中的高阶函数和偏函数
## 高阶函数
### 什么是高阶函数
高阶函数是异步编程的基础，那么什么是高阶函数呢?

高阶二字听起来有点高大上的感觉，其实不然，高阶函数与普通函数不同的地方是高阶函数可以把函数作为参数，或者是将函数作为返回值，请看如下示例。

### 示例：

```javascript
function test(v){
  return function(){
    return v;
  }
}
```

示例中是一个最简单的高阶函数，如你所见，高阶函数test的返回值是一个匿名函数。
### 现实中的应用
虽然有可能是第一次真正的去了解什么是高阶函数，但是其实我们在日常开发中经常会用到它，只是我们没有去留意或者说不知道它的称谓而已。

示例：数组的排序(sort)函数

```javascript
var arr = [23,54,3,12,78];
arr.sort(function(a,b){
  return a-b;
});
```

## 偏函数
### 什么是偏函数

假设有一个参数或变量已经预置的函数A，我们通过调用A来产生一个新的函数B，函数B就是我们说的偏函数。下面可以看一个示例。

### 示例

```javascript
// 判断类型的小demo
var isType = function(type){
  return function(obj){
    return toString.call(obj)=='[object '+type+']';
  }
};

// 定制新的函数
var isString = isType('String');
var isArray = isType('Array');
var isFunction = isType('Function');

// 测试偏函数
console.log(isString('abc')); // true
console.log(isArray([1, 2])); // true
console.log(isFunction('abc')); // false
```

isType函数中预置了判断类型的方法，只指定部分参数来产生的新的定制的函数isString、isArray和isFunction就是偏函数。


