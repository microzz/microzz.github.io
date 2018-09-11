---
title: ES6中嵌套的对象如何解构(Destructuring)
date: 2017-01-24 19:17:51
tags:
  - ES6
  - ECMAScript6
  - JS
  - JavaScript
  - Destructuring
---
# ES6中嵌套的对象如何解构

> 对于普通对象的解构大家应该没什么问题(详细学习ES6的解构知识请看这里👉 [变量的解构赋值(Destructuring)](http://microzz.com/2016/11/13/destructuring/) )，但是遇到复杂对象结构的应该如何处理呢？可以看下面的示例。

```javascript
//声明一个对象保存信息
let jsonData = {
  name: 'Zhao',
  age: 22,
  score: {
    Chinese: 77,
    math: 99
  }
}

//对嵌套结构的对象进行解构1
let {name, age, score:{Chinese, math}} = jsonData;

console.log(`name is ${name}`); //name is Zhao
console.log(`age is ${age}`); //age is 22
console.log(`Chinese score is ${Chinese}`); //Chinese score is 77
console.log(`math score is ${math}`);  //math score is 99

//另外一个例子😄
let obj = {
  p: [
    'Hello',
    { y: 'World' }
  ]
};

//对嵌套结构的对象进行解构2
let { p: [x, { y }] } = obj;
console.log(`x is ${x}`); // x is Hello
console.log(`y is ${y}`); // y is World
```


