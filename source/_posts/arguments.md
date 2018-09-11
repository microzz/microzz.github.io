---
title: JavaScript中的arguments对象
date: 2017-04-28 15:55:02
tags:
  - JavaScrip
  - JS
  - arguments
---

# JavaScript中的arguments对象

**arguments** 是一个类似数组的对象, 对应于传递给函数的参数。

## 语法

`arguments`

## 描述
arguments对象是所有函数中可用的局部变量。你可以使用arguments对象在函数中引用函数的参数。此对象包含传递给函数的每个参数的条目，第一个条目的索引从0开始。例如，如果一个函数传递了三个参数，你可以参考它们如下：

`arguments[0]`
`arguments[1]`
`arguments[2]`
参数也可以被设置:

```javascript
arguments[1] = 'new value';
```

`arguments`对象**不是**一个 `Array` 。它类似于数组，但除了 长度之外没有任何数组属性。例如，它没有 `pop` 方法。但是它可以被转换为一个真正的数组：：

```javascript
let args = Array.prototype.slice.call(arguments); 

let args = [].slice.call(arguments);
```

你还可以使用  `Array.from()`方法或 `spread` 运算符将 arguments 转换为真正的数组：

```javascript
let args = Array.from(arguments);
let args = [...arguments];
```

对参数使用slice会阻止某些JavaScript引擎中的优化 (比如 V8 引擎)。

如果你关心它们，尝试通过遍历arguments对象来构造一个新的数组。

另一种方法是使用 被忽视的/鄙视/轻视,/看不起 Array构造函数作为一个函数：

```javascript
let args = (
arguments.length === 1 ? 
[arguments[0]] : 
Array.apply(null, arguments)
);
```

如果 Array generics 可用的话，下面的代码可以作为替代:

```javascript
var args = Array.slice(arguments);
```
* arguments 对象仅在函数内部有效，在函数外部调用 arguments 对象会出现一个错误。

* arguments的typeof返回'**object**'。

* `console.log(typeof arguments);  // 'object'`

* 可以使用索引来确定各个arguments的类型。

```javascript
console.log(typeof arguments[0]); 
//这将返回单个参数的typeof。
```

如果你调用一个函数，当这个函数的参数数量比它显式声明的参数数量更多的时候，你就可以使用 arguments 对象。这个技术对于参数数量是一个可变量的函数来说比较有用。 你可以用 arguments.length 来得到参数的数量，然后可以用 arguments object 来对每个参数进行处理。 (想要得到函数签名的参数数量, 请使用 Function.length 属性。)

## 属性

```javascript
arguments.callee
// 指向当前执行的函数。

arguments.caller 
// 指向调用当前函数的函数。

arguments.length
// 指向传递给当前函数的参数数量。
```

## 例子
### 定义一个连接几个字符串的函数

这个例子定义了一个函数来连接字符串。这个函数唯一正式声明了的参数是一个字符串，该参数指定一个字符作为衔接点来连接字符串。该函数定义如下：

```javascript
function myConcat(separator) {
  var args = Array.prototype.slice.call(arguments, 1);
  return args.join(separator);
}
```

你可以传递任意数量的参数到该函数，然后该函数会将每个参数作为一个条目来创建一个列表。

```javascript
myConcat(", ", "red", "orange", "blue");
// returns "red, orange, blue"

myConcat("; ", "elephant", "giraffe", "lion", "cheetah");
// returns "elephant; giraffe; lion; cheetah"

myConcat(". ", "sage", "basil", "oregano", "pepper", "parsley");
// returns "sage. basil. oregano. pepper. parsley"
```

### 定义一个创建HTML列表的方法

这个例子定义了一个函数通过一个字符串来创建HTML列表。这个函数唯一正式声明了的参数是一个字符。当该参数为 "u" 时，创建一个无序列表 (项目列表)；当该参数为 "o" 时，则创建一个有序列表 (编号列表)。该函数定义如下：

```javascript
function list(type) {
  var result = "<" + type + "l><li>";
  var args = Array.prototype.slice.call(arguments, 1);
  result += args.join("</li><li>");
  result += "</li></" + type + "l>"; // end list

  return result;
}
```
你可以传递任意数量的参数到该函数，然后该函数会将每个参数作为一个条目添加到第一个参数指定类型的列表当中。

```javascript
var listHTML = list("u", "One", "Two", "Three");

/* listHTML is:

"<ul><li>One</li><li>Two</li><li>Three</li></ul>"

*/
```

## 注意
ES6中的箭头函数没有自己的 `arguments` 对象，不过在大多数情形下，`rest`参数可以给出一个解决方案：

```javascript
let a;
const fn = (...rest) => Array.prototype.slice.call(rest, 1);
a = fn(1, 2); // [2]
```

## 关于
GitHub：👉https://github.com/microzz
个人网站：👉https://microzz.com/


