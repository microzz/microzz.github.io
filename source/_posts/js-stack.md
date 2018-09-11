---
title: 用JS实现栈的数据结构
date: 2017-07-31 19:04:29
tags:
  - JS
  - JavaScript
  - 栈
  - 数据结构与算法
---

# 用JavaScript实现栈的数据结构

> &nbsp;&nbsp;&nbsp;&nbsp;堆栈（英语：stack），也可直接称栈，在计算机科学中，是一种特殊的串列形式的数据结构，它的特殊之处在于只能允许在链接串列或阵列的一端（称为堆叠顶端指标，英语：top）进行加入数据（push）和输出数据（pop）的运算。另外栈也可以用一维数组或连结串列的形式来完成。
> &nbsp;&nbsp;&nbsp;&nbsp;由于堆叠数据结构只允许在一端进行操作，因而按照后进先出（LIFO, Last In First Out）的原理运作。      -- 维基百科

上面是维基百科对**栈**的解读。下面我们用**JavaScript**(ES6)代码对栈的数据结构进行实现

## 实现一个Stack类

```javascript
/**
* Stack 类
*/
class Stack {
  constructor() {
    this.data = []; // 对数据初始化
    this.top = 0; // 初始化栈顶位置
  }
  
  // 入栈方法
  push() {
    const args = [...arguments];
    args.forEach(arg => this.data[this.top++] = arg);
    return this.top;
  }

  // 出栈方法
  pop() {
    if (this.top === 0) throw new Error('The stack is already empty!');
    const peek = this.data[--this.top];
    this.data = this.data.slice(0, -1);
    return peek;
  }
  
  // 返回栈顶元素
  peek() {
    return this.data[this.top - 1];
  }
  
  // 返回栈内元素个数
  length() {
    return this.top;
  }

  // 清除栈内所有元素
  clear() {
    this.top = 0;
    return this.data = [];
  }

  // 判断栈是否为空
  isEmpty() {
    return this.top === 0;
  }
}

// 实例化
const stack = new Stack();

stack.push(1);
stack.push(2, 3);
console.log(stack.data); // [1, 2, 3]
console.log(stack.peek()); // 3
console.log(stack.pop()); // 3, now data is [1, 2]
stack.push(3);
console.log(stack.length()); // 3
stack.clear(); // now data is []
```

## 用栈的思想将数字转换为二进制和八进制

```javascript
/**
 * 将数字转换为二进制和八进制
 */
const numConvert = (num, base) => {
  const stack = new Stack();
  let converted = '';
  
  while(num > 0) {
    stack.push(num % base);
    num = Math.floor(num / base);
  }

  while(stack.length() > 0) {
    converted += stack.pop(); 
  }

  return +converted;
}

console.log(numConvert(10, 2)); // 1010
```

## 用栈的思想判断给定字符串或者数字是否是回文

```javascript
/**
 * 判断给定字符串或者数字是否是回文
 */
const isPalindrome = words => {
  const stack = new Stack();
  let wordsCopy = '';
  words = words.toString();

  Array.prototype.forEach.call(words, word => stack.push(word));

  while(stack.length() > 0) {
    wordsCopy += stack.pop();
  }

  return words === wordsCopy;
}

console.log(isPalindrome('1a121a1')); // true
console.log(isPalindrome(2121)); // false
```

上面就是用JavaScript对栈的数据结构的实现，有些算法可能欠妥，但是仅仅是为了演示JS对栈的实现😄


