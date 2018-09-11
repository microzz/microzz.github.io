---
title: 几行代码了解JS中的柯里化和反柯里化
date: 2018-01-1 11:29:36
tags:
  - curring
  - uncurring
  - 柯里化
  - 反柯里化
---

# 几行代码了解JavaScript中的curring和uncurring

## curry 柯里化
在计算机科学中，柯里化（英语：Currying），又译为卡瑞化或加里化，是把接受多个参数的函数变换成接受一个单一参数（最初函数的第一个参数）的函数，并且返回接受余下的参数而且返回结果的新函数的技术。  -- 维基百科

下面几行代码说明一下：

```javascript
var curry = function(fn) {
  var _args = [];

  return function _f() {
    if (arguments.length) {
      Array.prototype.push.apply(_args, arguments);
      return _f;
    }
    
    return fn.apply(this, _args);
  }
}

// 累加方法
var add = curry(function() {
  return Array.prototype.reduce.call(arguments, function(acc, cur) {
    return acc + cur;
  }, 0);
});

add(1)(2)(3)(); // 6
add(4)(); // 10
```
我们可以看到当参数为空时候就可以求出对应的值，也起到了一个惰性求值(延迟求值)的目的，在某些场景对性能提升有一定的帮助。
这个例子可能大家不太熟悉，下面这个例子大家应该都不陌生：

```javascript
function add(a) {
  return function (b) {
    return a + b;
  }
}

var add5 = add(5);
add5(10); // 15
add5(20); // 25
```

## uncurry 反柯里化

反curring就是把原来已经固定的参数或者this上下文等当作参数延迟到未来传递。

```javascript
Function.prototype.uncurry = function() {
  var _this = this;

  return function() {
    return Function.prototype.call.apply(_this, arguments);
  }
}

var obj = {};
var arr = [];
var push = Array.prototype.push.uncurry();

push(obj, 'hello', 'world'); // obj {0: "hello", 1: "world", length: 2}
push(arr, 'hello', 'world'); // arr ["hello", "world"]
```

## About

个人网站：🔗[microzz-IT技术分享](https://microzz.com/) 

GitHub：🔗[microzz](https://github.com/microzz)