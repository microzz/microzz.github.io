---
title: 你真的知道JS吗？
date: 2017-04-30 18:08:44
tags:
  - JavaScript
  - JS
  - ECMAScript6
  - ES6
---

# 你真的知道JavaScript吗

> &nbsp;&nbsp;&nbsp;&nbsp;JavaScript是一门**奇怪**的语言，要真正掌握并不容易。废话不多说，来一个快速测试，5道题目，看看你对JavaScript是否真正掌握。准备好了吗？开始咯😄


## 题目

### No.1

```javascript
if (!("a" in window)) {
    var a = 1;
}

console.log(a);
```

### No.2

```javascript
var a = 1,
    b = function a(x) {
        x && a(--x);
    };
console.log(a);
```

### No.3

```javascript
function a(x) {
    return x * 2;
}
var a;
console.log(a);
```

### No.4

```javascript
function b(x, y, a) {
    arguments[2] = 10;
    console.log(a);
}
b(1, 2, 3);
```

### No.5

```javascript
function a() {
    console.log(this);
}
a.call(null);
```

## 解析
### No.1
&nbsp;&nbsp;&nbsp;&nbsp;在浏览器环境中，全局变量都是`window`的一个属性，即
`var a = 1` 等价于 `window.a = 1`。`in`操作符用来判断某个属性属于某个对象，可以是对象的直接属性，也可以是通过`prototype`继承的属性。
&nbsp;&nbsp;&nbsp;&nbsp;再看题目，在浏览器中，如果没有全局变量 `a` ，则声明一个全局变量 `a` (ES5没有块级作用域)，并且赋值为1。很多人会认为打印的是1。非也，大家不要忘了变量声明会被前置！什么意思呢？题目也就等价于

```javascript
var a;

if (!("a" in window)) {
    a = 1;
}

console.log(a);
```
所以其实已经声明了变量`a`，只不过`if`语句之前值是`undefined`，所以`if`语句压根不会执行。
最后答案就是 `undefined` 

### No.2
这道题有几个需要注意的地方：

1. 变量声明、函数声明会被前置，但是函数表达式并不会，准确说类似变量声明前置，举个栗子：

```javascript
console.log('b', b); // b undefined
var b = function() {}
console.log('b', b); // b function () {}
```
2.具名的函数表达式的名字只能在该函数内部取到，举个例子(排除老的IE😂)：

```javascript
var foo = function bar () {}

console.log('foo', foo); 
// foo function bar(){}

console.log('bar', bar);
// Uncaught ReferenceError: bar is not defined
```

&nbsp;&nbsp;&nbsp;&nbsp;综合这两点，再看题目，最后输出的内容就为 1

### No.3


函数声明会覆盖变量声明，但不会覆盖变量赋值，举个栗子简单粗暴：

```javascript
function foo(){
    return 1;
}
var foo;
console.log(typeof foo);    // "function"
```
函数声明的优先级高于变量声明的优先级，但如果该变量`foo`赋值了，那结果就完全不一样了：

```javascript
function foo(){
    return 1;
}
var foo = 1;
console.log(typeof foo);    // "number"
```
变量`foo`赋值以后，变量赋值初始化就覆盖了函数声明。这个需要注意
再看题目

```javascript
function a(x) {
    return x * 2;
}
var a;
console.log(a); // function a(x) {...}
```

### No.4


这题考察 `arguments` 对象的用法(详看👉[JavaScript中的arguments对象](https://microzz.com/2017/04/28/arguments/))
**一般情况**，`arguments`与函数参数是动态绑定关系(为什么说是一般稍后会解释)，所以很好理解，最后输出的是10

但是但是但是，我们不要忘了一个特殊情况--严格模式，在严格模式中 `arguments` 与相当于函数参数的一个拷贝，并没有动态绑定关系，举个栗子：

```javascript
'use strict'
// 严格模式！！

function b(x, y, a) {
    arguments[2] = 10;
    console.log(a);
}
b(1, 2, 3); // 3
```

### No.5

```javascript
function a() {
    console.log(this);
}
a.call(null);
```
关于 `a.call(null);` 根据ECMAScript262规范规定：
如果第一个参数传入的对象调用者是`null`或者`undefined`的话，`call`方法将把全局对象（浏览器上是`window`对象）作为this的值。所以，不管你什么时候传入`null`或者 `undefined`，其`this`都是全局对象`window`。所以，在浏览器上答案是输出 `window` 对象。

但是但是但是，我们依旧不能忘记一个特殊情况--严格模式，在严格模式中，`null` 就是 `null`，`undefined` 就是 `undefined` ，举个栗子：

```javascript
'use strict';
// 严格模式！！

function a() {
    console.log(this);
}
a.call(null); // null
a.call(undefined); // undefined
```
## 提醒

1. 在浏览器中的全局对象是`window`，Node.js中是`global`;
2. 为了使代码更加严谨与健壮，建议写JS都加上严格模式`'use strict';`
3. ES6已经成为前端必备技能，呼吁大家都使用ES6，方便高效，可以使用babel把ES6转成ES5甚至ES3，尽量使用ES6推动前端的发展👍

## About
GitHub: 👉https://github.com/microzz
个人网站: 👉https://microzz.com/



