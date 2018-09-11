---
title: JavaScript中手动模拟创建Iterators迭代器(遍历器)
date: 2017-01-29 20:58:35
tags:
  - ES6
  - JavaScript
  - JS
  - ECMAScript6
  - Iterators
---
> &nbsp;&nbsp;&nbsp;Generator函数是ES6提供的一种异步编程解决方案，具体请看[Generator函数教程](http://microzz.com/2017/01/13/generator/)。Generator函数有多种理解角度。从语法上，首先可以把它理解成，Generator函数是一个状态机，封装了多个内部状态。
> &nbsp;&nbsp;&nbsp;执行Generator函数会返回一个遍历器对象，也就是说，Generator函数除了状态机，还是一个遍历器对象生成函数。返回的遍历器对象，可以依次遍历Generator函数内部的每一个状态。

# JavaScript中如何手动模拟创建Iterators迭代器(遍历器)
## 通过代码实现，具体如下

```javascript
/**
 * JavaScript中手动模拟创建Iterators迭代器
 */
function Iterators(args) {
  let i = 0;
  return {
    next() {
      let done = (i >= args.length - 1);
      let value = args[i++];
      return {
        value: value,
        done: done
      }
    }
  }
}

//进行测试验证结果
let test = Iterators(['microzz', '涵月天', 'IT技术分享']);
console.log(test.next()); // { value: 'microzz', done: false }
console.log(test.next()); // { value: '涵月天', done: false }
console.log(test.next()); // { value: 'IT技术分享', done: true }
console.log(test.next()); // { value: undefined, done: true }
```


