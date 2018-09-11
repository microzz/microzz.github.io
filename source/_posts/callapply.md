---
title: JS中的call和apply应用
date: 2017-05-04 20:38:49
tags:
  - JavaScript
  - JS
  - call
  - apply
---

# JavaScript中的call和apply应用

> ECMAScript3给`Function`的原型定义了两个方法，他们是`Function.prototype.call` 和 `Function.prototype.apply`. 在实际开发中，特别是在一些函数式风格的代码编写中，`call`和`apply`方法尤为有用。

## call和apply区别
其实他们的作用是一样的，只是传递的参数不一样而已。
apply： 接受2个参数，第一个参数指定了函数体内this对象的指向，第二个参数为数组或者一个类数组。apply传入的是一个参数数组，也就是将多个参数组合成为一个数组传入，而call则作为call的参数传入（从第二个参数开始）。

举个栗子：

```javascript
const obj1 = {
    name: 'microzz',
    getName: function() {
        return this.name;
    }
};

const obj2 = {
    name: 'Zhaohui'
}

console.log(obj1.getName());  // "microzz"
console.log(obj1.getName.call(obj2));  // "Zhaohui"
console.log(obj1.getName.apply(obj2));  // "Zhaohui"
```

## call和apply的用途

### 改变this指向
call和apply可以改变`this`的指向，这点我们从上面这个例子中可以看出。我们还可以举一个实际当中可以遇到的情况：

有的时候我们会觉得 document.getElementById这个方法太长了，我们会尝试用一个短函数来代替它，如同prototype.js等一些框架所做过的事情，下面用代码说明：

```javascript
const getId = function(id) {
  return document.getElementById(id);
}

getId('id');
```
在Chrome、Firefox、IE10中执行会发现抛出异常，这是因为很多引擎的 document.getElementById 的方法内部需要用到this，这个this本来被期望指向document，但直接普通函数调用就指向了window。我们可以利用apply“修正” `this`：

```javascript
document.getElementById = (function(func) {
  return function() {
    return func.apply(document, arguments);
  }
})(document.getElement);

const getId = document.getElementById;
```

### Function.prototype.bind
在大部分高级浏览器已经实现了内置的`Function.prototype.bind`，用来指定函数内部的this指向，如果没有原生的`Function.prototype.bind`,我们也可以模拟一个，代码如下：

```javascript
Function.prototype.bind = function(context) {
  var self = this;
  return function() {
    return self.apply(context, arguments);
  }
}

var obj = {
  name: 'microzz'
};

var func = function() {
  console.log(this.name); // microzz
}.bind(obj);

func();
```
这是一个简化版的，通常我们会实现得稍微复杂一点：

```javascript

Function.prototype.bind = function() {
  var self = this;
  
  // 需要绑定的this上下文
  var context = [].shift.call(arguments);
  
  // 剩余的参数转成数组
  var args = [].slice.call(arguments);
  
  return function() {
    return self.apply(context, [].concat.call(args, [].slice.call(arguments)));
  }
}

var obj = {
  name: 'microzz'
};

var func = function(a, b, c, d) {
  console.log(this.name); // microzz
  console.log([a, b, c, d]); // [1, 2, 3, 4]
}.bind(obj, 1, 2);

func(3, 4);
```

### 借用其他对象的方法

#### 借用构造函数
借用方法的第一种场景是“借用构造函数”，可以实现类似继承的效果：

```javascript
var A = function(name) {
  this.name = name;
}

var B = function() {
  A.apply(this, arguments);
}

B.prototype.getName = function() {
  return this.name;
}

var b = new B('microzz');
console.log(b.getName()); // microzz

```

#### 类数组
函数参数列表`arguments`是一个类数组对象，虽然它有下标，但是并不是真正的数组。为了能使用数组的一些方法，我们常常会借用`Array.prototype`对象上的方法。
比如想往`arguments`中添加新元素，通常会借用`Array.prototype.push` 
想把`arguments`转成真正数组的时候，可以借用`Array.prototype.slice`或者也可以使用ES6的`Array.from`

## About
GitHub：👉https://github.com/microzz
个人网站：👉https://microzz.com/

