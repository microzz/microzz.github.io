---
title: 为Array对象添加一个去除重复项的方法
date: 2017-04-01 22:34:16
tags:
  - JavaScript
  - ES6
  - ECMAScript6
  - prototype
  - 原型链
---

# 为 Array 对象上添加一个去除重复项的方法
 
## 输入例子

```javascript
[false, true, undefined, null, NaN, 0, 1, {}, {}, 'a', 'a', NaN].uniq()
```

## 输出例子

```javascript
[false, true, undefined, null, NaN, 0, 1, {}, {}, 'a']
```
## 分析
题目要求给 Array 添加方法，所以我们需要用到 `prototype`。数组去重本身算法不是很难，但是在 JavaScript 中很多人会忽视 `NaN` 的存在，因为在 JS 中 `NaN !== NaN` 。但是在去重中我们又不能保留两个 NaN ，所以需要进行一下判断，这是很多人容易忽视的。ES5的实现如下：

## 代码

```javascript
Array.prototype.uniq = function () {
  var arr = [];
  var flag = true;
  this.forEach(function(item) {
    // 排除 NaN (重要！！！)
    if (item != item) {
      flag && arr.indexOf(item) === -1 ? arr.push(item) : '';
      flag = false;
    } else {
      arr.indexOf(item) === -1 ? arr.push(item) : ''
    }

  });
  return arr;
}
```
## 验证
我们只需要在数组上直接调用 `uniq` 方法就可以了，如：

```javascript
[false, true, undefined, null, NaN, 0, 1, {}, {}, 'a', 'a', NaN].uniq()
```
结果为：

```javascript
[false, true, undefined, null, NaN, 0, 1, {}, {}, 'a']
```

## 进阶
### ES6的实现
ES6新增了 `Set` 对象，也就是我们所说的“集合”，它类似于数组，但是成员的值都是唯一的，没有重复的值。所以可以方便去重。
Set本身是一个构造函数，用来生成Set数据结构。(详看👉[Set和Map数据结构](https://microzz.com/2017/01/05/set-map/))

如果用ES6为 Array 对象添加一个去除重复项的方法，则可以如下实现：

```javascript
Array.prototype.uniq = function() {
  return Array.from(new Set(this));
}
```
代码中用 `Array.from` 把 `Set` 结构转换成数组，当然，你也可以用其他方法，这里不深究。这里去重关键代码只需要一行，是不是非常简单？😄
如果你要优雅一点，可以使用 ES6 的扩展运算符。如下：

```javascript
Array.prototype.uniq = function() {
  return [...new Set(this)];
}
```

