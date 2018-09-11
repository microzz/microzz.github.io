---
title: 【面试题】创建长度为100的数组
date: 2017-03-24 18:57:25
tags:
  - ES6
  - ECMAScrpt6
  - JavaScript
  - JS
  - Array
---

# 不用循环创建一个长度为100的数组，并且每个元素的值等于它的下标

先来说一下最直接的解法...

```javascript
var arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99];
```
...

接下来转入正题。。。

## 传统for循环
来说一下传统的for循环：

```javascript
var arr = new Array(100)
for (var i = 0; i < arr.length; i++) {
  arr[i] = i;
}
arr; // [0, 1, ..., 99]
```
想必大家都没什么问题👍

## 不用for循环

但是如何不用`for`循环实现呢？

### ES5的实现

```javascript
Object.keys(Array.from({ length: 100 }));  
// ["0", "1", "2", ..., "98", "99"]
```

什么？`Array.from`是ES6的？没事，我们可以换成ES5的😄

```javascrript
Object.keys(
Array.apply(null,{ length: 100 }));
```

这样似乎的确完成了功能，但是还有一个问题，此时值是字符串类型，所以我们可以用ES5的`map`方法进行处理一下：

```javascript
Object.keys(Array.from({ length: 100 })).map(function(item) {
	return +item;
}); 
```


这里用了一个小技巧，字符串前面加一个 "+" 就可以转成数字。如果你不喜欢这样，可以使用parseInt，也是一样的效果。

### ES6的实现

#### 普通实现

ES6中数组实例有`keys`、`values`、`entries`方法，分别用于遍历数组的索引、键值、键值对，它们都返回**遍历器对象**（详细👉[Iterator和for...of循环](https://microzz.com/2017/01/12/iterator/)）

因此我们可以用ES6的`Array.from`转成数组：

```javascript
Array.from(new Array(100).keys());  
```

`Array.from`其实还有一个回调函数，可以很方便遍历处理每一个数据

```javascript
Array.from({ length: 100 }, (v, i) => i);
Array.from(Array(100), (v, i) => i);
// [0, 1, 2, ..., 98, 99]
```

#### 优雅进阶 - 扩展运算符

ES6新增 `...` **扩展运算符**，极大方便了相关操作(详见👉[函数的扩展](https://microzz.com/2016/12/10/function/)里面的扩展运算符)

因此我们可以更加优雅地实现：

```javascript
[...Array(100).keys()]
```
或者

```javascript
[...Array.from({ length: 100 }).keys()]
```
思路就是这样，当然我们还可以混合搭配出各种解法，甚至ES5、ES6混合😂有可能还有各种奇妙解法，每个人去细细专研吧😊



