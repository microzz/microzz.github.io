---
title: JavaScript自定义方法实现复杂对象的深拷贝
date: 2017-01-26 19:11:02
tags:
  - ES6
  - JavaScript
  - JS
  - ECMAScript6
  - 深拷贝
---
# JavaScript自定义方法实现复杂对象的深拷贝
### ES6中的Object.assign方法
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ES6中新增Object.assign方法用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target）。

-------

#### ❗️注意点:
> &nbsp;&nbsp;&nbsp;&nbsp;Object.assign方法实行的是浅拷贝，而不是深拷贝。也就是说，如果源对象某个属性的值是对象，那么目标对象拷贝得到的是这个对象的引用。

-------


# 实现
所以我们可以自己动手来手工实现复杂对象的深拷贝方法，具体实现有如下两种方法：

## 方法1⃣️



```javascript
/**
 * 自定义方法实现复杂对象的深拷贝
 */
function deepCopy(obj) {
  let copy = {};

  // 如果是基本类型直接赋值，
  // 如果是数组则拷贝，
  // 其他对象则递归调用deepCopy方法
    Object.keys(obj).forEach(key => {

      if (obj[key] instanceof Array) {
        copy[key] = Array.from(obj[key]);
      }
      else if (typeof obj[key] === 'object') {
        copy[key] = deepCopy(obj[key]);
      }
      else {
        copy[key] = obj[key];
      }
    })

  return copy;
}
```
## 方法2⃣️

```javascript
function deepCopy(obj) {
  return JSON.parse(JSON.stringify(obj));
}
```


-------

# 验证

&nbsp;&nbsp;以上通过两种方法实现了对象的深拷贝，下面通过数据进行简单验证:

```javascript
//自定义一个复杂数据对象
let data = {
  name: 'Zhao',
  age: 22,
  url: 'https://microzz.com',
  scores:{
    math: 66,
    java: 88,
    test: [1, 2, 3]
  },
  skills: ['Node.js', 'ReactJS', 'ES6'],
  say() {
    console.log(`My name is ${this.name}`)
  }
}

//进行深拷贝，把数据保存在copyData
let copyData = deepCopy(data);

//对copyData进行修改，看是否对原数据有影响
copyData.name = 'Hui';
copyData.scores.math = 99;
copyData.scores.test[1] = 100;
copyData.skills[2] = 'ES5';
copyData.say = function () {
  console.log(`Copy: My name is ${this.name}`);
}

//打印输出查看结果进行验证
console.log(data);
/*
{ name: 'Zhao',
age: 22,
url: 'http://microzz.com',
scores: { math: 66, java: 88, test: [ 1, 2, 3 ] },
skills: [ 'Node.js', 'ReactJS', 'ES6' ],
say: [Function: say] }
 */
 
console.log(copyData);
/*
{ name: 'Hui',
age: 22,
url: 'http://microzz.com',
scores: { math: 99, java: 88, test: [ 1, 100, 3 ] },
skills: [ 'Node.js', 'ReactJS', 'ES5' ],
say: [Function] }
 */
 
data.say(); // My name is Zhao
copyData.say(); // Copy: My name is Hui
```


-------
> &nbsp;&nbsp;&nbsp;&nbsp;两种方法的结果均一致，实现了对象的深拷贝，但是第二种方法通过原生的JSON.parse和JSON.stringify方法更为简单易懂。



